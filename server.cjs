const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = Number(process.env.PORT || 10000);
const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const DATA_PATH = "src/data/adminData.json";
const REPO = process.env.GITHUB_REPO || "beehomecreators-lang/bhome";
const BRANCH = process.env.GITHUB_BRANCH || "main";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || crypto.randomBytes(32).toString("hex");

function json(res, status, body) {
  const out = JSON.stringify(body);
  res.writeHead(status, {"Content-Type":"application/json","Cache-Control":"no-store"});
  res.end(out);
}
function cookieValue(req, name) {
  const raw = req.headers.cookie || "";
  const part = raw.split(";").map(x=>x.trim()).find(x=>x.startsWith(name+"="));
  return part ? decodeURIComponent(part.slice(name.length+1)) : "";
}
function sign(value) {
  return crypto.createHmac("sha256", SESSION_SECRET).update(value).digest("hex");
}
function validSession(req) {
  const value = cookieValue(req, "bee_admin");
  if (!value) return false;
  const [user, exp, sig] = value.split(".");
  if (!user || !exp || !sig || Number(exp) < Date.now()) return false;
  const expected = sign(user+"."+exp);
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}
async function body(req) {
  return await new Promise((resolve,reject)=>{
    let data="";
    req.on("data", c=>{ data += c; if(data.length > 25_000_000) req.destroy(); });
    req.on("end",()=>{ try{ resolve(JSON.parse(data || "{}")); }catch(e){reject(e)} });
    req.on("error",reject);
  });
}
function githubHeaders() {
  if (!GITHUB_TOKEN) throw new Error("GITHUB_TOKEN is not configured");
  return {
    "Accept":"application/vnd.github+json",
    "Authorization":"Bearer "+GITHUB_TOKEN,
    "X-GitHub-Api-Version":"2026-03-10",
    "Content-Type":"application/json"
  };
}
async function githubGet(filePath) {
  const r = await fetch("https://api.github.com/repos/"+REPO+"/contents/"+filePath+"?ref="+encodeURIComponent(BRANCH), {headers:githubHeaders()});
  if(!r.ok) throw new Error("GitHub GET failed: "+r.status);
  return await r.json();
}
async function githubPut(filePath, contentBase64, sha, message) {
  const r = await fetch("https://api.github.com/repos/"+REPO+"/contents/"+filePath, {
    method:"PUT", headers:githubHeaders(),
    body:JSON.stringify({message,content:contentBase64,sha,branch:BRANCH})
  });
  if(!r.ok) throw new Error("GitHub PUT failed: "+r.status+" "+await r.text());
  return await r.json();
}
async function githubDelete(filePath, sha, message) {
  const r = await fetch("https://api.github.com/repos/"+REPO+"/contents/"+filePath, {
    method:"DELETE", headers:githubHeaders(),
    body:JSON.stringify({message,sha,branch:BRANCH})
  });
  if(!r.ok) throw new Error("GitHub DELETE failed: "+r.status+" "+await r.text());
}
async function readAdminData() {
  const local = path.join(ROOT, DATA_PATH);
  if (fs.existsSync(local)) return JSON.parse(fs.readFileSync(local,"utf8"));
  const remote = await githubGet(DATA_PATH);
  return JSON.parse(Buffer.from(remote.content,"base64").toString("utf8"));
}
function safeImagePath(p) {
  return typeof p === "string" && /^public\/images\/admin\/[a-zA-Z0-9._/-]+$/.test(p) && !p.includes("..");
}

async function handle(req,res) {
  const url = new URL(req.url, "http://localhost");
  if (url.pathname === "/api/admin/login" && req.method === "POST") {
    const b = await body(req);
    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) return json(res,500,{error:"Admin credentials are not configured on Render."});
    if (b.username !== ADMIN_USERNAME || b.password !== ADMIN_PASSWORD) return json(res,401,{error:"Invalid credentials"});
    const exp = Date.now()+1000*60*60*12;
    const value = ADMIN_USERNAME+"."+exp;
    const token = value+"."+sign(value);
    res.writeHead(200,{"Content-Type":"application/json","Set-Cookie":"bee_admin="+encodeURIComponent(token)+"; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=43200"});
    return res.end(JSON.stringify({ok:true}));
  }
  if (url.pathname.startsWith("/api/admin/")) {
    if (!validSession(req)) return json(res,401,{error:"Not authenticated"});
    try {
      if (url.pathname === "/api/admin/content" && req.method === "GET") return json(res,200,await readAdminData());
      if (url.pathname === "/api/admin/content" && req.method === "PUT") {
        const next = await body(req);
        if (!next || !Array.isArray(next.projects) || !next.site) return json(res,400,{error:"Invalid content payload"});
        const current = await githubGet(DATA_PATH);
        await githubPut(DATA_PATH, Buffer.from(JSON.stringify(next,null,2)+"\n").toString("base64"), current.sha, "Update website content from Bee Home Creators Admin");
        return json(res,200,{ok:true});
      }
      if (url.pathname === "/api/admin/image" && req.method === "POST") {
        const b = await body(req);
        if (!safeImagePath(b.path) || typeof b.content !== "string") return json(res,400,{error:"Invalid image"});
        await githubPut(b.path, b.content, undefined, "Add image from Bee Home Creators Admin");
        return json(res,200,{ok:true,path:"/"+b.path.replace(/^public\//,"")});
      }
      if (url.pathname === "/api/admin/image" && req.method === "DELETE") {
        const b = await body(req);
        if (!safeImagePath(b.path) || !b.sha) return json(res,400,{error:"Invalid image"});
        await githubDelete(b.path,b.sha,"Delete image from Bee Home Creators Admin");
        return json(res,200,{ok:true});
      }
    } catch(e) {
      console.error(e);
      return json(res,500,{error:e.message});
    }
  }

  let file = decodeURIComponent(url.pathname);
  if (file === "/" || file === "/admin" || file === "/admin/") file = "/index.html";
  const target = path.join(DIST, file.replace(/^\//,""));
  if (target.startsWith(DIST) && fs.existsSync(target) && fs.statSync(target).isFile()) {
    const ext=path.extname(target);
    const types={".html":"text/html",".js":"text/javascript",".css":"text/css",".json":"application/json",".svg":"image/svg+xml",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".webp":"image/webp",".ico":"image/x-icon"};
    res.writeHead(200,{"Content-Type":types[ext]||"application/octet-stream"});
    return fs.createReadStream(target).pipe(res);
  }
  const index=path.join(DIST,"index.html");
  if(fs.existsSync(index)){res.writeHead(200,{"Content-Type":"text/html"});return fs.createReadStream(index).pipe(res);}
  json(res,404,{error:"Not found"});
}
http.createServer((req,res)=>handle(req,res).catch(e=>{console.error(e);json(res,500,{error:"Server error"})})).listen(PORT,"0.0.0.0",()=>console.log("Bee Home Creators server listening on "+PORT));
