import { useState, useEffect, useRef } from "react";

const FONT = "'Montserrat', sans-serif";

function useReveal(threshold = 0.25) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

const STATS = [
  { value: "2019", label: "Founded" },
  { value: "50+",  label: "Cities" },
  { value: "300+", label: "Artists" },
  { value: "6",    label: "Disciplines" },
];

const VALUES = [
  { title: "Equity",    body: "Every artist deserves visibility, regardless of who they are or where they come from. Representation is the foundation." },
  { title: "Access",    body: "Art belongs to everyone. We tear down the gatekeeping that has kept diverse voices out of mainstream art spaces." },
  { title: "Community", body: "Connection is at the heart of what we do. When artists and art-lovers find each other, something remarkable happens." },
  { title: "Story",     body: "Behind every work is a life. We are obsessed with the stories and human experiences that make art matter." },
];

const TEAM = [
  { name: "Founder",    role: "Creative Director",  initial: "F" },
  { name: "Co-founder", role: "Community Lead",      initial: "C" },
  { name: "Partner",    role: "Editorial Director",  initial: "P" },
  { name: "Partner",    role: "Technology Lead",     initial: "P" },
];

const MISSION_BLOCKS = [
  { heading: "Why We Started", body: "We started Art District with the desire to create a space for underrepresented and emerging artists, curators, and creatives to connect — and for anyone who loves art to learn the stories of unique artists, new and established." },
  { heading: "What We Do",     body: "The focus of Art District is to give exposure to the stories, experiences and masterpieces of artists from all different backgrounds. We allow the public to engage with, learn about, and directly support diverse artists across every discipline." },
  { heading: "Why It Matters", body: "The legacies of many artists who didn't fit the mold of the status quo have been pushed aside throughout history. The world of art has consistently grappled with inclusivity — and the importance of removing these barriers is paramount." },
  { heading: "Our Promise",    body: "Our mission is to serve the vibrant art community and celebrate the diversity that makes art so important. We are not a gallery. We are a living, breathing platform built by and for the community." },
];

function HeroSection() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "80px 5vw 60px" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {[25,50,75].map(p => <div key={p} style={{ position:"absolute", left:`${p}%`, top:0, bottom:0, width:"1px", background:"rgba(255,255,255,0.04)" }} />)}
        {[33,66].map(p => <div key={p} style={{ position:"absolute", top:`${p}%`, left:0, right:0, height:"1px", background:"rgba(255,255,255,0.04)" }} />)}
      </div>
      <div style={{ position:"absolute", top:"20%", left:"50%", transform:"translate(-50%,-50%)", width:"500px", height:"500px", borderRadius:"50%", background:"radial-gradient(circle, rgba(91,184,212,0.07) 0%, transparent 70%)", pointerEvents:"none" }} />

      <div style={{ position:"relative", zIndex:2, textAlign:"center", maxWidth:"800px", width:"100%" }}>
        <p style={{ fontFamily:FONT, fontSize:"0.5rem", letterSpacing:"0.42em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:"24px", opacity:vis?1:0, transition:"opacity 0.8s ease 0.2s" }}>
          Art District — Est. 2019
        </p>

        <h1 style={{ fontFamily:FONT, fontWeight:200, fontSize:"clamp(3rem,10vw,7rem)", letterSpacing:"0.22em", textTransform:"uppercase", color:"#fff", lineHeight:1, margin:0, opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(28px)", transition:"opacity 1s ease 0.35s, transform 1s ease 0.35s" }}>
          About
        </h1>

        <div style={{ width:"48px", height:"1px", background:"#5BB8D4", margin:"28px auto", opacity:vis?1:0, transition:"opacity 0.8s ease 0.7s" }} />

        <p style={{ fontFamily:FONT, fontWeight:300, fontSize:"clamp(0.85rem,1.6vw,1rem)", letterSpacing:"0.04em", lineHeight:1.9, color:"rgba(255,255,255,0.5)", maxWidth:"520px", margin:"0 auto", opacity:vis?1:0, transition:"opacity 0.9s ease 0.85s" }}>
          A platform built for the artists history overlooked — and the people ready to discover them.
        </p>

        <div style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", marginTop:"56px", opacity:vis?1:0, transition:"opacity 0.8s ease 1.1s" }}>
          {STATS.map((s,i) => (
            <div key={s.label} style={{ padding:"20px 28px", borderLeft:i>0?"1px solid rgba(255,255,255,0.08)":"none", textAlign:"center" }}>
              <p style={{ fontFamily:FONT, fontSize:"clamp(1.4rem,3vw,2.2rem)", fontWeight:200, color:"#fff", letterSpacing:"0.08em", margin:0 }}>{s.value}</p>
              <p style={{ fontFamily:FONT, fontSize:"0.46rem", letterSpacing:"0.28em", textTransform:"uppercase", color:"rgba(255,255,255,0.28)", marginTop:"5px" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position:"absolute", bottom:"28px", left:"50%", transform:"translateX(-50%)", zIndex:2, opacity:vis?1:0, transition:"opacity 1s ease 1.5s" }}>
        <div style={{ width:"1px", height:"40px", background:"rgba(255,255,255,0.18)", margin:"0 auto", animation:"scrollPulse 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

function MissionSection() {
  const [ref, vis] = useReveal(0.15);
  return (
    <section ref={ref} style={{ background:"#fff", padding:"100px 8vw" }}>
      <div style={{ maxWidth:"1100px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:"64px", alignItems:"start" }}>
        <div>
          <p style={{ fontFamily:FONT, fontSize:"0.48rem", letterSpacing:"0.38em", textTransform:"uppercase", color:"#bbb", marginBottom:"18px", opacity:vis?1:0, transition:"opacity 0.7s ease 0.1s" }}>Our Mission</p>
          <h2 style={{ fontFamily:FONT, fontWeight:200, fontSize:"clamp(1.8rem,3.5vw,3rem)", letterSpacing:"0.12em", textTransform:"uppercase", color:"#111", lineHeight:1.1, opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(16px)", transition:"opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s" }}>
            Art for<br />Everyone.
          </h2>
          <div style={{ width:"28px", height:"1px", background:"#5BB8D4", margin:"24px 0", opacity:vis?1:0, transition:"opacity 0.8s ease 0.4s" }} />
          <div style={{ width:"100%", maxWidth:"220px", aspectRatio:"3/1", background:"#111", display:"flex", alignItems:"center", justifyContent:"center", opacity:vis?0.9:0, transition:"opacity 0.8s ease 0.6s" }}>
            <span style={{ fontFamily:FONT, fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.32em", textTransform:"uppercase", color:"#fff" }}>Art District</span>
          </div>
        </div>

        <div style={{ paddingTop:"4px" }}>
          {MISSION_BLOCKS.map((block, i) => (
            <div key={block.heading} style={{ marginBottom:"44px", opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(20px)", transition:`opacity 0.8s ease ${0.3+i*0.12}s, transform 0.8s ease ${0.3+i*0.12}s` }}>
              <p style={{ fontFamily:FONT, fontSize:"0.48rem", letterSpacing:"0.3em", textTransform:"uppercase", color:"#5BB8D4", marginBottom:"10px" }}>{block.heading}</p>
              <p style={{ fontFamily:FONT, fontWeight:300, fontSize:"0.88rem", color:"#666", lineHeight:1.95, letterSpacing:"0.02em" }}>{block.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueCard({ value, delay, vis }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background:hov?"#111":"#fff", padding:"40px 32px 44px", cursor:"default", transition:"background 0.35s", opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(24px)", transitionProperty:"background,opacity,transform", transitionDuration:"0.35s,0.8s,0.8s", transitionDelay:`0s,${delay}s,${delay}s` }}>
      <div style={{ width:"20px", height:"1px", background:hov?"#5BB8D4":"#ddd", marginBottom:"24px", transition:"background 0.35s" }} />
      <h3 style={{ fontFamily:FONT, fontWeight:600, fontSize:"0.6rem", letterSpacing:"0.28em", textTransform:"uppercase", color:hov?"#fff":"#111", marginBottom:"14px", transition:"color 0.35s" }}>{value.title}</h3>
      <p style={{ fontFamily:FONT, fontWeight:300, fontSize:"0.8rem", color:hov?"rgba(255,255,255,0.5)":"#888", lineHeight:1.85, transition:"color 0.35s" }}>{value.body}</p>
    </div>
  );
}

function ValuesSection() {
  const [ref, vis] = useReveal(0.1);
  return (
    <section ref={ref} style={{ background:"#f4f4f2", padding:"90px 8vw", borderTop:"1px solid #ebebeb" }}>
      <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
        <p style={{ fontFamily:FONT, fontSize:"0.48rem", letterSpacing:"0.38em", textTransform:"uppercase", color:"#bbb", marginBottom:"16px", opacity:vis?1:0, transition:"opacity 0.7s" }}>What We Stand For</p>
        <h2 style={{ fontFamily:FONT, fontWeight:200, fontSize:"clamp(1.8rem,3.5vw,3rem)", letterSpacing:"0.12em", textTransform:"uppercase", color:"#111", marginBottom:"56px", lineHeight:1.05, opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(16px)", transition:"opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s" }}>
          Our Values
        </h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:"2px" }}>
          {VALUES.map((v,i) => <ValueCard key={v.title} value={v} delay={0.2+i*0.1} vis={vis} />)}
        </div>
      </div>
    </section>
  );
}

function TeamCard({ member, delay, vis }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(20px)", transition:`opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`, cursor:"default" }}>
      <div style={{ width:"100%", aspectRatio:"1/1", background:hov?"#111":"#f0f0f0", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"14px", transition:"background 0.35s" }}>
        <span style={{ fontFamily:FONT, fontSize:"2.2rem", fontWeight:200, color:hov?"rgba(255,255,255,0.12)":"#ccc", transition:"color 0.35s" }}>{member.initial}</span>
      </div>
      <p style={{ fontFamily:FONT, fontSize:"0.48rem", letterSpacing:"0.26em", textTransform:"uppercase", color:"#5BB8D4", marginBottom:"4px" }}>{member.role}</p>
      <p style={{ fontFamily:FONT, fontWeight:500, fontSize:"0.7rem", letterSpacing:"0.14em", textTransform:"uppercase", color:"#111" }}>{member.name}</p>
    </div>
  );
}

function TeamSection() {
  const [ref, vis] = useReveal(0.1);
  return (
    <section ref={ref} style={{ background:"#fff", padding:"90px 8vw", borderTop:"1px solid #ebebeb" }}>
      <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
        <p style={{ fontFamily:FONT, fontSize:"0.48rem", letterSpacing:"0.38em", textTransform:"uppercase", color:"#bbb", marginBottom:"16px", opacity:vis?1:0, transition:"opacity 0.7s" }}>The People</p>
        <h2 style={{ fontFamily:FONT, fontWeight:200, fontSize:"clamp(1.8rem,3.5vw,3rem)", letterSpacing:"0.12em", textTransform:"uppercase", color:"#111", marginBottom:"56px", lineHeight:1.05, opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(16px)", transition:"opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s" }}>
          Meet the Team
        </h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"28px" }}>
          {TEAM.map((m,i) => <TeamCard key={i} member={m} delay={0.2+i*0.1} vis={vis} />)}
        </div>

        <div style={{ marginTop:"72px", padding:"44px", background:"#f4f4f2", opacity:vis?1:0, transition:"opacity 0.8s ease 0.7s" }}>
          <p style={{ fontFamily:FONT, fontSize:"0.48rem", letterSpacing:"0.3em", textTransform:"uppercase", color:"#bbb", marginBottom:"14px" }}>Join the Movement</p>
          <p style={{ fontFamily:FONT, fontWeight:300, fontSize:"0.88rem", color:"#666", lineHeight:1.85, maxWidth:"500px" }}>
            Art District is more than a team — it's a community. If you're an artist, curator, writer, or someone who believes in the power of representation in the arts, we want to hear from you.
          </p>
          <a href="#contact" style={{ display:"inline-block", marginTop:"22px", fontFamily:FONT, fontSize:"0.5rem", letterSpacing:"0.22em", textTransform:"uppercase", textDecoration:"none", color:"#111", borderBottom:"1px solid #111", paddingBottom:"2px" }}>
            Get in Touch →
          </a>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div style={{ fontFamily: FONT }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes scrollPulse {
          0%,100% { opacity:0.2; transform:scaleY(0.6) translateY(-4px); }
          50%      { opacity:0.7; transform:scaleY(1) translateY(4px); }
        }
      `}</style>
      <HeroSection />
      <MissionSection />
      <ValuesSection />
      <TeamSection />
    </div>
  );
}