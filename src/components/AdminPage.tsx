import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, ImagePlus, LogIn, Plus, Save, Trash2, Upload, X } from "lucide-react";

type Project = {
  id: string;
  name: string;
  type: string;
  price: string;
  location: string;
  mapsUrl: string;
  image: string;
  images: string[];
  whatsappMessage: string;
  offers?: string[];
  landmarks: string[];
};

type TeamMember = { id: string; name: string; designation: string; mobile: string };
type Career = { id:string; title:string; location:string; description:string; responsibilities:string[]; requirements:string[]; active:boolean };
type Application = { id:number; name:string; phone:string; email:string; message:string; job_title:string; created_at:string };

type Data = {
  site: {
    phone: string; phoneDisplay: string; email: string; address: string[];
    instagramUrl: string; facebookUrl: string; complianceText: string;
    heroKicker: string; heroTitleLine1: string; heroTitleLine2: string;
    heroDescription: string; heroImage: string;
    aboutKicker: string; aboutTitle: string; aboutDescription: string;
    aboutBody: string[]; vision: string; mission: string;
    ownerName: string; ownerTitle: string; companyLocation: string;
  };
  projects: Project[];
  teamMembers: TeamMember[];\n  careers: Career[];
};

const emptyProject: Project = {
  id: "", name: "", type: "Residential Plots", price: "", location: "",
  mapsUrl: "", image: "", images: [], whatsappMessage: "",
  offers: [], landmarks: []
};

export function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState<Data | null>(null);
  const [tab, setTab] = useState<"home" | "projects" | "about" | "team" | "contact" | "careers" | "applications">("projects");
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);\n  const [applications, setApplications] = useState<Application[]>([]);

  const load = async () => {
    const r = await fetch("/api/admin/content", { credentials: "include" });
    if (r.ok) {
      setData(await r.json());
      setLoggedIn(true);
    } else setLoggedIn(false);
  };

  useEffect(() => { load().catch(() => setLoggedIn(false)); }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setStatus("");
    const r = await fetch("/api/admin/login", {
      method: "POST", headers: { "Content-Type": "application/json" },
      credentials: "include", body: JSON.stringify({ username, password })
    });
    if (!r.ok) { setStatus("Invalid admin login."); setBusy(false); return; }
    setPassword(""); await load(); setBusy(false);
  };

  const save = async () => {
    if (!data) return;
    setBusy(true); setStatus("");
    const r = await fetch("/api/admin/content", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      credentials: "include", body: JSON.stringify(data)
    });
    setStatus(r.ok ? "Saved. Render will redeploy the website from the commit." : "Save failed.");
    setBusy(false);
  };

  if (!loggedIn || !data) {
    return (
      <div style={styles.page}>
        <form style={styles.login} onSubmit={login}>
          <div style={styles.logo}>🐝</div>
          <h1>Bee Home Creators</h1><p>Admin Panel</p>
          <input style={styles.input} placeholder="Admin username" value={username} onChange={e=>setUsername(e.target.value)} />
          <input style={styles.input} placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button style={styles.primary} disabled={busy}><LogIn size={17}/> {busy ? "Signing in..." : "Sign in"}</button>
          {status && <div style={styles.error}>{status}</div>}
        </form>
      </div>
    );
  }

  const project = data.projects.find(p => p.id === selected);

  return (
    <div style={styles.shell}>
      <aside style={styles.sidebar}>
        <div style={styles.brand}><span>🐝</span><div><strong>Bee Home</strong><small>Creators Admin</small></div></div>
        {(["home","projects","about","team","careers","applications","contact"] as const).map(x =>
          <button key={x} onClick={()=>{setTab(x);setSelected(null)}} style={tab===x?styles.navActive:styles.nav}>
            {x === "home" ? "🏠 Home" : x === "projects" ? "🏘️ Projects" : x === "about" ? "ℹ️ About Us" : x === "team" ? "👥 Team" : x === "careers" ? "💼 Careers" : x === "applications" ? "📋 Applications" : "📞 Contact"}
          </button>
        )}
        <a href="/" style={styles.back}><ArrowLeft size={16}/> View website</a>
      </aside>
      <main style={styles.main}>
        <header style={styles.header}>
          <div><span style={styles.kicker}>BEE HOME CREATORS</span><h1>{tab === "projects" ? "Projects" : tab === "home" ? "Homepage" : tab === "about" ? "About Us" : tab === "team" ? "Team" : tab === "careers" ? "Careers" : tab === "applications" ? "Job Applications" : "Contact & Footer"}</h1></div>
          <button onClick={save} disabled={busy} style={styles.primary}><Save size={17}/> {busy ? "Saving..." : "Save changes"}</button>
        </header>
        {status && <div style={styles.success}><Check size={16}/> {status}</div>}
        {tab === "home" && <HomeEditor data={data} setData={setData} onImage={async (file)=>uploadImage(file,setData,data,setBusy,setStatus)} />}
        {tab === "about" && <AboutEditor data={data} setData={setData} />}
        {tab === "contact" && <ContactEditor data={data} setData={setData} />}
        {tab === "team" && <TeamEditor data={data} setData={setData} />}\n        {tab === "careers" && <CareersEditor data={data} setData={setData} />}\n        {tab === "applications" && <ApplicationsEditor applications={applications} />}
        {tab === "projects" && (
          project
            ? <ProjectEditor project={project} data={data} setData={setData} onBack={()=>setSelected(null)} onImage={async (file)=>uploadImage(file,setData,data,setBusy,setStatus)} />
            : <ProjectList data={data} setData={setData} onSelect={setSelected} />
        )}
      </main>
    </div>
  );
}

function HomeEditor({data,setData,onImage}:{data:Data;setData:React.Dispatch<React.SetStateAction<Data|null>>;onImage:(f:File)=>Promise<string>}) {
  const s=data.site;
  const set=(k:keyof Data["site"],v:string)=>setData(d=>d?({...d,site:{...d.site,[k]:v}}):d);
  return <section style={styles.card}>
    <Field label="Kicker" value={s.heroKicker} onChange={v=>set("heroKicker",v)}/>
    <Field label="Hero title — line 1" value={s.heroTitleLine1} onChange={v=>set("heroTitleLine1",v)}/>
    <Field label="Hero title — line 2" value={s.heroTitleLine2} onChange={v=>set("heroTitleLine2",v)}/>
    <TextArea label="Hero description" value={s.heroDescription} onChange={v=>set("heroDescription",v)}/>
    <ImageField label="Hero image" value={s.heroImage} onChange={async f=>set("heroImage",await onImage(f))}/>
  </section>;
}

function AboutEditor({data,setData}:{data:Data;setData:React.Dispatch<React.SetStateAction<Data|null>>}) {
  const s=data.site; const set=(k:keyof Data["site"],v:string)=>setData(d=>d?({...d,site:{...d.site,[k]:v}}):d);
  return <section style={styles.card}>
    <Field label="Section label" value={s.aboutKicker} onChange={v=>set("aboutKicker",v)}/>
    <Field label="Title" value={s.aboutTitle} onChange={v=>set("aboutTitle",v)}/>
    <TextArea label="Intro" value={s.aboutDescription} onChange={v=>set("aboutDescription",v)}/>
    {s.aboutBody.map((v,i)=><TextArea key={i} label={"Paragraph "+(i+1)} value={v} onChange={x=>setData(d=>d?({...d,site:{...d.site,aboutBody:d.site.aboutBody.map((p,j)=>j===i?x:p)}}):d)}/>)}
    <Field label="Owner name" value={s.ownerName} onChange={v=>set("ownerName",v)}/>
    <Field label="Owner title" value={s.ownerTitle} onChange={v=>set("ownerTitle",v)}/>
    <TextArea label="Vision" value={s.vision} onChange={v=>set("vision",v)}/>
    <TextArea label="Mission" value={s.mission} onChange={v=>set("mission",v)}/>
    <TextArea label="Company location" value={s.companyLocation} onChange={v=>set("companyLocation",v)}/>
  </section>;
}

function ContactEditor({data,setData}:{data:Data;setData:React.Dispatch<React.SetStateAction<Data|null>>}) {
  const s=data.site; const set=(k:keyof Data["site"],v:string)=>setData(d=>d?({...d,site:{...d.site,[k]:v}}):d);
  return <section style={styles.card}>
    <Field label="Phone (digits)" value={s.phone} onChange={v=>set("phone",v)}/>
    <Field label="Phone display" value={s.phoneDisplay} onChange={v=>set("phoneDisplay",v)}/>
    <Field label="Email" value={s.email} onChange={v=>set("email",v)}/>
    <Field label="Address line 1" value={s.address[0]} onChange={v=>setData(d=>d?({...d,site:{...d.site,address:[v,d.site.address[1]]}}):d)}/>
    <Field label="Address line 2" value={s.address[1]} onChange={v=>setData(d=>d?({...d,site:{...d.site,address:[d.site.address[0],v]}}):d)}/>
    <Field label="Instagram URL" value={s.instagramUrl} onChange={v=>set("instagramUrl",v)}/>
    <Field label="Facebook URL" value={s.facebookUrl} onChange={v=>set("facebookUrl",v)}/>
    <Field label="Compliance text" value={s.complianceText} onChange={v=>set("complianceText",v)}/>
  </section>;
}

function TeamEditor({data,setData}:{data:Data;setData:React.Dispatch<React.SetStateAction<Data|null>>}) {
  return <section style={styles.card}>
    {data.teamMembers.map((m,i)=><div key={m.id} style={styles.row}>
      <Field label="Name" value={m.name} onChange={v=>setData(d=>d?({...d,teamMembers:d.teamMembers.map((x,j)=>j===i?{...x,name:v}:x)}):d)}/>
      <Field label="Designation" value={m.designation} onChange={v=>setData(d=>d?({...d,teamMembers:d.teamMembers.map((x,j)=>j===i?{...x,designation:v}:x)}):d)}/>
      <Field label="Mobile" value={m.mobile} onChange={v=>setData(d=>d?({...d,teamMembers:d.teamMembers.map((x,j)=>j===i?{...x,mobile:v}:x)}):d)}/>
      <button style={styles.danger} onClick={()=>setData(d=>d?({...d,teamMembers:d.teamMembers.filter(x=>x.id!==m.id)}):d)}><Trash2 size={15}/></button>
    </div>)}
    <button style={styles.secondary} onClick={()=>setData(d=>d?({...d,teamMembers:[...d.teamMembers,{id:"EMP-"+Date.now(),name:"",designation:"",mobile:""}]}):d)}><Plus size={16}/> Add team member</button>
  </section>;
}

function ProjectList({data,setData,onSelect}:{data:Data;setData:React.Dispatch<React.SetStateAction<Data|null>>;onSelect:(id:string)=>void}) {
  return <section>
    <div style={styles.grid}>{data.projects.map(p=><button key={p.id} style={styles.project} onClick={()=>onSelect(p.id)}>
      <img src={p.image} alt="" style={styles.thumb}/><div><strong>{p.name}</strong><small>{p.price} / sq.ft · {p.location}</small></div>
    </button>)}</div>
    <button style={styles.add} onClick={()=>{const p={...emptyProject,id:"project-"+Date.now()};setData(d=>d?({...d,projects:[...d.projects,p]}):d);onSelect(p.id)}}><Plus size={18}/> Add new project</button>
  </section>;
}

function ProjectEditor({project,data,setData,onBack,onImage}:{project:Project;data:Data;setData:React.Dispatch<React.SetStateAction<Data|null>>;onBack:()=>void;onImage:(f:File)=>Promise<string>}) {
  const update=(patch:Partial<Project>)=>setData(d=>d?({...d,projects:d.projects.map(p=>p.id===project.id?{...p,...patch}:p)}):d);
  return <section style={styles.card}>
    <button style={styles.backBtn} onClick={onBack}><ArrowLeft size={16}/> Projects</button>
    <Field label="Project ID (keep stable)" value={project.id} onChange={v=>update({id:v})}/>
    <Field label="Project name" value={project.name} onChange={v=>update({name:v})}/>
    <Field label="Type" value={project.type} onChange={v=>update({type:v})}/>
    <Field label="Price" value={project.price} onChange={v=>update({price:v})}/>
    <Field label="Location" value={project.location} onChange={v=>update({location:v})}/>
    <Field label="Google Maps URL" value={project.mapsUrl} onChange={v=>update({mapsUrl:v})}/>
    <Field label="WhatsApp message" value={project.whatsappMessage} onChange={v=>update({whatsappMessage:v})}/>
    <ImageField label="Main image" value={project.image} onChange={async f=>update({image:await onImage(f)})}/>
    <div style={styles.subhead}>Gallery</div>
    {project.images.map((img,i)=><div key={img+i} style={styles.galleryRow}><img src={img} style={styles.galleryThumb}/><input style={styles.input} value={img} onChange={e=>update({images:project.images.map((x,j)=>j===i?e.target.value:x)})}/><button style={styles.danger} onClick={()=>update({images:project.images.filter((_,j)=>j!==i)})}><Trash2 size={15}/></button></div>)}
    <button style={styles.secondary} onClick={async()=>{const input=document.createElement("input");input.type="file";input.accept="image/*";input.onchange=async()=>{if(input.files?.[0])update({images:[...project.images,await onImage(input.files[0])]})};input.click();}}><ImagePlus size={16}/> Add image</button>
    <TextArea label="Offers (one per line)" value={(project.offers||[]).join("\n")} onChange={v=>update({offers:v.split("\n").map(x=>x.trim()).filter(Boolean)})}/>
    <TextArea label="Landmarks (one per line)" value={project.landmarks.join("\n")} onChange={v=>update({landmarks:v.split("\n").map(x=>x.trim()).filter(Boolean)})}/>
    <div style={{display:"flex",justifyContent:"flex-end",marginTop:18}}><button style={styles.danger} onClick={()=>{if(confirm("Delete this project?")){setData(d=>d?({...d,projects:d.projects.filter(x=>x.id!==project.id)}):d);onBack();}}}><Trash2 size={16}/> Delete project</button></div>
  </section>;
}

function Field({label,value,onChange}:{label:string;value:string;onChange:(v:string)=>void}) {
  return <label style={styles.field}><span>{label}</span><input style={styles.input} value={value} onChange={e=>onChange(e.target.value)}/></label>;
}
function TextArea({label,value,onChange}:{label:string;value:string;onChange:(v:string)=>void}) {
  return <label style={styles.field}><span>{label}</span><textarea style={{...styles.input,minHeight:100,resize:"vertical"}} value={value} onChange={e=>onChange(e.target.value)}/></label>;
}
function ImageField({label,value,onChange}:{label:string;value:string;onChange:(f:File)=>Promise<void>}) {
  return <div style={styles.field}><span>{label}</span><div style={styles.imageBox}>{value && <img src={value} alt="" style={styles.preview}/>}<label style={styles.upload}><Upload size={16}/> Replace image<input type="file" accept="image/*" hidden onChange={e=>e.target.files?.[0]&&onChange(e.target.files[0])}/></label></div></div>;
}

async function uploadImage(file:File,setData:React.Dispatch<React.SetStateAction<Data|null>>,data:Data,setBusy:React.Dispatch<React.SetStateAction<boolean>>,setStatus:React.Dispatch<React.SetStateAction<string>>) {
  setBusy(true); setStatus("Uploading image...");
  const base64=await new Promise<string>((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(String(r.result).split(",")[1]);r.onerror=reject;r.readAsDataURL(file)});
  const safe=file.name.replace(/[^a-zA-Z0-9._-]/g,"-").toLowerCase();
  const path="public/images/admin/"+Date.now()+"-"+safe;
  const r=await fetch("/api/admin/image",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({path,content:base64})});
  if(!r.ok){setBusy(false);setStatus("Image upload failed.");throw new Error("upload failed")}
  setBusy(false);setStatus("Image uploaded. Save changes to publish the content.");
  return "/images/admin/"+path.split("/").pop();
}

const styles:Record<string,React.CSSProperties>={
  page:{minHeight:"100vh",background:"#f5f3ee",display:"grid",placeItems:"center",fontFamily:"Inter,system-ui,sans-serif"},
  login:{width:"min(420px,90vw)",background:"#fff",padding:36,borderRadius:20,boxShadow:"0 20px 60px rgba(0,0,0,.1)",display:"grid",gap:12},
  logo:{fontSize:38}, shell:{minHeight:"100vh",background:"#f5f3ee",display:"flex",fontFamily:"Inter,system-ui,sans-serif",color:"#1f241f"},
  sidebar:{width:240,background:"#1f241f",color:"#fff",padding:22,display:"flex",flexDirection:"column",gap:8},
  brand:{display:"flex",gap:10,alignItems:"center",paddingBottom:24,marginBottom:8,borderBottom:"1px solid #3a3f39"},
  nav:{background:"transparent",border:0,color:"#d8ddd7",padding:"12px 10px",textAlign:"left",borderRadius:10,cursor:"pointer",fontSize:14},
  navActive:{background:"#c7a66a",border:0,color:"#171b17",padding:"12px 10px",textAlign:"left",borderRadius:10,cursor:"pointer",fontWeight:700,fontSize:14},
  back:{marginTop:"auto",color:"#fff",textDecoration:"none",display:"flex",gap:8,alignItems:"center",padding:"12px 10px"},
  main:{flex:1,padding:"32px clamp(18px,4vw,56px)",maxWidth:1200},
  header:{display:"flex",justifyContent:"space-between",alignItems:"center",gap:20,marginBottom:26},
  kicker:{fontSize:11,letterSpacing:2,color:"#9a7b40",fontWeight:800}, h1:{margin:"5px 0 0",fontSize:32},
  primary:{display:"inline-flex",alignItems:"center",gap:8,background:"#1f241f",color:"#fff",border:0,borderRadius:10,padding:"12px 18px",cursor:"pointer",fontWeight:700},
  secondary:{display:"inline-flex",alignItems:"center",gap:8,background:"#fff",border:"1px solid #d9d6cf",borderRadius:10,padding:"10px 14px",cursor:"pointer"},
  danger:{display:"inline-flex",alignItems:"center",gap:7,background:"#fff0ee",color:"#a33a2e",border:"1px solid #e5b6b0",borderRadius:9,padding:"9px 12px",cursor:"pointer"},
  success:{background:"#eaf5eb",border:"1px solid #b8d8bc",padding:12,borderRadius:10,marginBottom:18,display:"flex",gap:8,alignItems:"center"},
  error:{color:"#a33a2e",fontSize:13}, card:{background:"#fff",borderRadius:16,padding:24,boxShadow:"0 8px 30px rgba(0,0,0,.05)",display:"grid",gap:16},
  field:{display:"grid",gap:7,fontSize:13,fontWeight:700}, input:{width:"100%",boxSizing:"border-box",border:"1px solid #ddd9d0",borderRadius:9,padding:"11px 12px",font:"inherit",background:"#fff"},
  grid:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:14},
  project:{textAlign:"left",background:"#fff",border:"1px solid #e2dfd7",borderRadius:14,padding:10,display:"flex",gap:12,alignItems:"center",cursor:"pointer"},
  thumb:{width:80,height:70,objectFit:"cover",borderRadius:9,background:"#eee"}, add:{marginTop:16,border:"1px dashed #b8ae9c",background:"transparent",borderRadius:12,padding:14,cursor:"pointer",display:"inline-flex",gap:8,alignItems:"center"},
  "backBtn":{border:0,background:"transparent",display:"flex",gap:7,alignItems:"center",cursor:"pointer",padding:0,color:"#6d675d"},
  "subhead":{fontWeight:800,marginTop:8},
  galleryRow:{display:"grid",gridTemplateColumns:"70px 1fr auto",gap:8,alignItems:"center"}, galleryThumb:{width:70,height:55,objectFit:"cover",borderRadius:7},
  imageBox:{border:"1px dashed #cfc9bd",borderRadius:12,padding:12,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}, preview:{width:180,height:110,objectFit:"cover",borderRadius:8}, upload:{display:"inline-flex",gap:7,alignItems:"center",background:"#f1eee8",padding:"10px 12px",borderRadius:9,cursor:"pointer"}
};
