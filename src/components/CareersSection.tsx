import { useState } from "react";
import type { FormEvent } from "react";
import { BriefcaseBusiness, CheckCircle2, Send } from "lucide-react";
import { careers } from "../data/content";

export function CareersSection() {
  const [selected, setSelected] = useState(careers[0]?.id || "");
  const [form, setForm] = useState({name:"",phone:"",email:"",message:""});
  const [status,setStatus]=useState("");
  const job=careers.find(c=>c.id===selected) || careers[0];

  if(!job) return null;

  const submit=async(e:FormEvent)=>{
    e.preventDefault(); setStatus("Submitting...");
    try{
      const r=await fetch("/api/applications",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,jobId:job.id,jobTitle:job.title})});
      if(!r.ok) throw new Error();
      setForm({name:"",phone:"",email:"",message:""}); setStatus("Application submitted successfully.");
    }catch{setStatus("Unable to submit right now. Please try again later.");}
  };

  return <section id="careers" style={{padding:"96px 6vw",background:"#f5f3ee"}}>
    <div style={{maxWidth:1200,margin:"0 auto"}}>
      <div style={{maxWidth:700,marginBottom:35}}>
        <div style={{fontSize:12,letterSpacing:2,fontWeight:800,color:"#9a7b40"}}>CAREER OPPORTUNITIES</div>
        <h2 style={{fontSize:"clamp(36px,5vw,64px)",margin:"10px 0"}}>Build your career with Bee Home Creators.</h2>
        <p style={{fontSize:17,lineHeight:1.7,color:"#666"}}>We are growing our team in Trichy. Explore current openings and apply directly.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:18}}>
        <div style={{display:"grid",gap:12,alignContent:"start"}}>
          {careers.filter(c=>c.active).map(c=><button key={c.id} onClick={()=>setSelected(c.id)} style={{textAlign:"left",padding:20,borderRadius:14,border:selected===c.id?"2px solid #b38b4a":"1px solid #ddd8ce",background:"#fff",cursor:"pointer"}}>
            <div style={{display:"flex",gap:10,alignItems:"center"}}><BriefcaseBusiness size={20}/><strong>{c.title}</strong></div>
            <div style={{marginTop:7,color:"#777"}}>{c.location}</div>
          </button>)}
        </div>
        <div style={{background:"#fff",padding:28,borderRadius:18}}>
          <h3 style={{fontSize:28,marginTop:0}}>{job.title}</h3>
          <p style={{color:"#666"}}>{job.description}</p>
          <strong>Responsibilities</strong>
          <ul>{job.responsibilities.map(x=><li key={x}>{x}</li>)}</ul>
          <strong>Requirements</strong>
          <ul>{job.requirements.map(x=><li key={x}>{x}</li>)}</ul>
          <form onSubmit={submit} style={{display:"grid",gap:10,marginTop:22}}>
            <input required placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={inputStyle}/>
            <input required placeholder="Phone number" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} style={inputStyle}/>
            <input type="email" placeholder="Email address" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={inputStyle}/>
            <textarea placeholder="Message / experience" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} style={{...inputStyle,minHeight:90}}/>
            <button type="submit" style={buttonStyle}><Send size={16}/> Apply Now</button>
            {status && <div style={{display:"flex",gap:7,alignItems:"center",fontSize:14}}><CheckCircle2 size={16}/>{status}</div>}
          </form>
        </div>
      </div>
    </div>
  </section>
}
const inputStyle={width:"100%",boxSizing:"border-box" as const,padding:"12px 13px",border:"1px solid #ddd8ce",borderRadius:9,font:"inherit"};
const buttonStyle={display:"inline-flex",justifyContent:"center",alignItems:"center",gap:8,padding:"12px 16px",border:0,borderRadius:9,background:"#1f241f",color:"#fff",fontWeight:700,cursor:"pointer"};
