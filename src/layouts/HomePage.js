import React, { useState, useEffect, useRef } from "react";

/* ════════════════════════════════════════════════════════════
   SHARED STYLE TOKENS
════════════════════════════════════════════════════════════ */
const FONT   = "'Montserrat', sans-serif";
const SCRIPT = "'Zeyada', cursive";

const T = {
  eyebrow : { fontFamily: FONT, fontSize: "0.48rem", letterSpacing: "0.38em", textTransform: "uppercase" },
  label   : { fontFamily: FONT, fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase" },
  small   : { fontFamily: FONT, fontSize: "0.7rem",  letterSpacing: "0.06em" },
  body    : { fontFamily: FONT, fontSize: "0.82rem", fontWeight: 300, lineHeight: 1.9, letterSpacing: "0.02em" },
  cta     : { fontFamily: FONT, fontSize: "0.5rem",  letterSpacing: "0.22em", textTransform: "uppercase" },
};

/* ════════════════════════════════════════════════════════════
   SHARED HOOK — scroll-triggered reveal
════════════════════════════════════════════════════════════ */
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

/* ════════════════════════════════════════════════════════════
   DATA
════════════════════════════════════════════════════════════ */
const NAV_CATEGORIES = [
  { id: "visual",      label: "Visual Arts",     subs: [
    { label: "Painting", hue: 22 },
    { label: "Sculpture", hue: 45, src: "/images/HumanNature-Morton-Arboretum.jpg" },
    { label: "Photography", hue: 195 }, { label: "Digital", hue: 260 },
    { label: "Print", hue: 340, src: "/images/Bak-ChicagoRiviera.png" },
    { label: "Mural", hue: 80, src: "/images/Yehimi-mural.png" },
  ]},
  { id: "performance", label: "Performance Art", subs: [
    { label: "Music", hue: 210 }, { label: "TV & Film", hue: 30 },
    { label: "Theater", hue: 320 }, { label: "Dance", hue: 160 },
  ]},
  { id: "literary",    label: "Literary Art",    subs: [
    { label: "Poetry", hue: 55 }, { label: "Books", hue: 12 },
    { label: "Plays", hue: 290 }, { label: "Journalism", hue: 185 },
  ]},
  { id: "culinary",    label: "Culinary Arts",   subs: [
    { label: "Savory", hue: 28 }, { label: "Pastry", hue: 42 },
    { label: "Libations", hue: 355 }, { label: "Story on a Plate", hue: 90 },
  ]},
  { id: "applied",     label: "Applied Arts",    subs: [
    { label: "Architecture", hue: 200 },
    { label: "Fashion", hue: 330, src: "/images/purrking.jpg" },
    { label: "Woodworking", hue: 28 }, { label: "Metal", hue: 220 },
    { label: "Glass", hue: 175 }, { label: "Tattoo", hue: 170 },
  ]},
  { id: "community",   label: "Community",       subs: [
    { label: "Initiatives", hue: 170 }, { label: "Arts & Culture Nonprofits", hue: 245 },
    { label: "Grants", hue: 75 }, { label: "Resource Sharing", hue: 310 },
  ]},
  { id: "events",      label: "Events",          subs: [
    { label: "Atlanta Events", hue: 5 }, { label: "New York Events", hue: 215 },
    { label: "Chicago Events", hue: 150 },
  ]},
  { id: "about",   label: "About",   subs: null },
  { id: "contact", label: "Contact", subs: null },
];

const CAROUSEL_ITEMS = [
  { id: 1, href: "#", accent: "#5BB8D4", eyebrow: "Newsletter",           title: "Art Archives",
    description: "A curated journey through art history — stories, movements, and masterworks delivered straight to your inbox.",
    cta: "Subscribe Now",           src: "/images/artarchives.png" },
  { id: 2, href: "#", accent: "#a8c5da", eyebrow: "Monthly Feature",      title: "Artist Spotlight",
    description: "Every month we shine a light on one extraordinary artist — their process, their story, their vision.",
    cta: "Meet This Month's Artist", src: "https://images.unsplash.com/photo-1572947650440-e8a97ef053b2?w=1200&q=85" },
  { id: 3, href: "#", accent: "#d4a5c9", eyebrow: "Nonprofit Initiative", title: "Dreamer Heart Fund",
    description: "Supporting artists in need. Every contribution keeps a creative voice alive — donate or nominate someone today.",
    cta: "Give & Support",          src: "/images/Dreamer.jpg" },
];

const MISSION_IMAGES = [
  { src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80", alt: "Painting" },
  { src: "https://images.unsplash.com/photo-1510081887155-56fe96846e71?w=600&q=80", alt: "Photography" },
  { src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80", alt: "Abstract" },
  { src: "https://images.unsplash.com/photo-1680986188636-6e83847e7e2d?w=600&q=80", alt: "Digital Art" },
];

const MISSION_PARAGRAPHS = [
  "Art District's mission is to create a space for art lovers and creatives to connect and learn the stories of emerging and established underrepresented artists.",
  "We emphasize the importance of arts and culture to help us understand one another, tell our histories, and imagine new possibilities for our communities. Ensuring accessibility in the arts means making space for everyone so that people of all abilities, backgrounds, and lived experiences can participate, create, and be heard.",
  "Connection is at the heart of creative communities. When accessibility and equity guide our cultural spaces, the arts become not only a reflection of our society, but a powerful way to bring people together and build a more understanding and vibrant world.",
];

const TOOLS_DATA = [
  { id: "wall",      href: "/wall",               eyebrow: "Community",            index: "01", accent: "#5BB8D4", bg: "#fff",     visual: "wall",
    title: "Collaborative\n Art Wall",       cta: "Visit The Wall",
    description: "Add your voice. Tell us what art means to you, who or what inspires you or a cherished art memory — and watch a living wall of language grow with the community." },
  { id: "journey",  href: "/art-journey",        eyebrow: "Explore",           index: "02", accent: "#111",    bg: "#f7f6f4", visual: "lines",
    title: "Art\nJourney Map",   cta: "Subscribe Now",
    description: "A curated journey through art history and present — stories, movements, and the masterworks that shaped culture." },
  { id: "spotlight", href: "/artist-spotlight",    eyebrow: "Monthly Feature",      index: "03", accent: "#111",    bg: "#fff",     visual: "circle",
    title: "Artist\nSpotlight", cta: "Meet This Month's Artist",
    description: "Every month one artist — emerging or established, always underrepresented. Their process, their world, their words." },
  { id: "studio",   href: "/inspo-studio",  eyebrow: "Personal", index: "04", accent: "#d4a5c9", bg: "#f7f6f4", visual: "heart",
    title: "Inspiration\nStudio", cta: "Get Inspired",
    description: "Creatives rejoice! Explore our Inspiration Studio and get inspired to create or learn more with customized prompts and recommendations. " },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/></svg> },
  { label: "Facebook",  href: "#", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
  { label: "X",         href: "#", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { label: "TikTok",    href: "#", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34l-.01-8.83a8.18 8.18 0 0 0 4.78 1.52V4.55a4.85 4.85 0 0 1-1-.14z"/></svg> },
  { label: "YouTube",   href: "#", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/></svg> },
  { label: "Pinterest", href: "#", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.64 1.267 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.137-1.868 3.137-4.561 0-2.386-1.714-4.054-4.163-4.054-2.836 0-4.5 2.127-4.5 4.326 0 .856.33 1.775.741 2.276a.3.3 0 0 1 .069.286c-.076.313-.244.995-.277 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg> },
];

const FOOTER_LINKS = [
  { label: "About",              href: "#" },
  { label: "Contact",            href: "#" },
  { label: "Art Archives",       href: "#" },
  { label: "Artist Spotlight",   href: "#" },
  { label: "Dreamer Heart Fund", href: "#" },
  { label: "Privacy Policy",     href: "#" },
];

const VIVID_COLORS = ["#FF6B6B","#FF9F43","#FECA57","#48DBFB","#FF9FF3","#54A0FF","#5F27CD","#00D2D3","#1DD1A1","#C44569","#F8B739","#EE5A24","#009432","#0652DD","#9980FA"];

const WALL_WORDS = ["healing","resistance","memory","freedom","identity","joy","loss","power","beauty","truth","longing","becoming","witness","roots","breath","home"];
const WALL_SIZES   = ["0.75rem","0.95rem","1.1rem","1.4rem","1.8rem","2.3rem"];
const WALL_WEIGHTS = [300, 400, 500, 700];
const WALL_OPS     = [0.18, 0.3, 0.45, 0.65, 0.85, 1];

/* ════════════════════════════════════════════════════════════
   PURE HELPERS
════════════════════════════════════════════════════════════ */
const randomVivid = () => VIVID_COLORS[Math.floor(Math.random() * VIVID_COLORS.length)];

function wallWordStyle(word, i) {
  let h = 0;
  for (const c of word + i) h = (h * 31 + c.charCodeAt(0)) % 9999;
  return {
    fontSize:      WALL_SIZES[h % WALL_SIZES.length],
    fontWeight:    WALL_WEIGHTS[(h * 7) % WALL_WEIGHTS.length],
    opacity:       WALL_OPS[(h * 3) % WALL_OPS.length],
    color:         h % 5 === 0 ? "#5BB8D4" : h % 7 === 0 ? "#d4a5c9" : "#222",
    letterSpacing: h % 3 === 0 ? "0.14em" : "0.04em",
    textTransform: h % 4 === 0 ? "uppercase" : "lowercase",
  };
}

const fade = (vis, delay = 0) => ({
  opacity:    vis ? 1 : 0,
  transition: `opacity 0.8s ease ${delay}s`,
});

const fadeUp = (vis, delay = 0) => ({
  opacity:    vis ? 1 : 0,
  transform:  vis ? "translateY(0)" : "translateY(14px)",
  transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
});

const slideIn = (vis, delay = 0) => ({
  opacity:    vis ? 1 : 0,
  transform:  vis ? "translateX(0)" : "translateX(-16px)",
  transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
});

/* ════════════════════════════════════════════════════════════
   1. HERO
════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <div style={{ overflow: "hidden", maxWidth: "100%", position: "relative" }}>
      {/* 16:9 full-bleed iframe trick */}
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, paddingTop: "25px", width: "300%", left: "-100%" }}>
        <iframe
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -2, border: "none" }}
          src="https://www.youtube.com/embed/zcA2B41Wym8?version=3&autoplay=1&start=4140&controls=0&loop=1&rel=0&mute=1&vq=hd1080&playlist=zcA2B41Wym8"
          title="Art District hero video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        {/* Overlay label */}
        <div style={{ position: "absolute", bottom: "12%", left: "50%", transform: "translateX(-50%)", zIndex: 2, textAlign: "center", color: "#fff", ...T.small, letterSpacing: "0.35em", textTransform: "uppercase", opacity: 0.85 }}>
          Art District
        </div>
      </div>
      {/* Logo */}
      <div style={{ position: "absolute", top: "5px", left: "1%", zIndex: 2 }}>
        <img src="https://placehold.co/80x80/ffffff/000000?text=AD" alt="Art District Logo"
          style={{ width: "8%", minWidth: "52px", maxWidth: "88px", height: "auto", display: "block" }} />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   2. CAROUSEL
════════════════════════════════════════════════════════════ */
function Carousel() {
  const [active, setActive]     = useState(0);
  const [paused, setPaused]     = useState(false);
  const [animating, setAnim]    = useState(false);
  const total = CAROUSEL_ITEMS.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => goTo(p => (p + 1) % total), 5000);
    return () => clearInterval(id);
  }, [paused, total]);

  const goTo = (fn) => {
    setAnim(true);
    setTimeout(() => { setActive(fn); setAnim(false); }, 320);
  };

  const item = CAROUSEL_ITEMS[active];
  const aStyle = { opacity: animating ? 0 : 1, transform: animating ? "scale(1.03)" : "scale(1)", transition: "opacity 0.55s ease, transform 0.55s ease" };

  return (
    <section style={{ position: "relative", background: "#0a0a0a", overflow: "hidden" }}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>

      {/* Background image */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${item.src})`, backgroundSize: "cover", backgroundPosition: "center", zIndex: 0, ...aStyle }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(0,0,0,0.82) 0%,rgba(0,0,0,0.45) 55%,rgba(0,0,0,0.15) 100%)", zIndex: 1 }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "4px", background: item.accent, zIndex: 3, ...fade(!animating) }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "680px", padding: "80px 64px 80px 68px", opacity: animating ? 0 : 1, transform: animating ? "translateY(12px)" : "translateY(0)", transition: "opacity 0.45s ease, transform 0.45s ease" }}>
        <p style={{ ...T.eyebrow, color: item.accent, marginBottom: "14px" }}>{item.eyebrow}</p>
        <h2 style={{ fontFamily: SCRIPT, fontSize: "clamp(2.8rem,5vw,4.2rem)", fontWeight: 400, color: "#fff", lineHeight: 1.1, marginBottom: "20px" }}>{item.title}</h2>
        <p style={{ ...T.body, color: "rgba(255,255,255,0.78)", maxWidth: "440px", marginBottom: "36px" }}>{item.description}</p>
        <a href={item.href}
          style={{ display: "inline-block", padding: "13px 32px", border: `1px solid ${item.accent}`, color: item.accent, ...T.cta, textDecoration: "none", borderRadius: "2px", background: "transparent", transition: "background 0.25s, color 0.25s" }}
          onMouseEnter={e => { e.currentTarget.style.background = item.accent; e.currentTarget.style.color = "#0a0a0a"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = item.accent; }}>
          {item.cta}
        </a>
      </div>

      {/* Prev / Next arrows */}
      {[{ fn: () => { setPaused(true); goTo(p => (p - 1 + total) % total); }, label: "‹", side: "left" },
        { fn: () => { setPaused(true); goTo(p => (p + 1) % total); },         label: "›", side: "right" }
      ].map(({ fn, label, side }) => (
        <button key={side} onClick={fn} aria-label={side}
          style={{ position: "absolute", top: "50%", [side]: "24px", transform: "translateY(-50%)", zIndex: 4, width: "44px", height: "44px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.35)", background: "rgba(0,0,0,0.35)", color: "#fff", fontSize: "1.5rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s, background 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.borderColor = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.35)";        e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}>
          {label}
        </button>
      ))}

      {/* Dot indicators */}
      <div style={{ position: "absolute", bottom: "28px", right: "48px", zIndex: 4, display: "flex", gap: "10px" }}>
        {CAROUSEL_ITEMS.map((c, i) => (
          <button key={c.id} onClick={() => { setPaused(true); goTo(() => i); }} aria-label={`Slide ${i + 1}`}
            style={{ width: active === i ? "48px" : "8px", height: "8px", borderRadius: "4px", border: "none", background: active === i ? c.accent : "rgba(255,255,255,0.35)", cursor: "pointer", padding: 0, transition: "width 0.35s, background 0.35s" }} />
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "rgba(255,255,255,0.1)", zIndex: 4 }}>
        <div key={`${active}-${paused}`} style={{ height: "100%", background: item.accent, width: paused ? "0%" : "100%", transition: paused ? "none" : "width 5s linear" }} />
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   3. NAVBAR
════════════════════════════════════════════════════════════ */
function NavBar({ active, setActive }) {
  const [hovered, setHovered] = useState(null);
  return (
    <nav style={{ background: "#fff", borderBottom: "1px solid #e8e8e8", position: "sticky", top: 0, zIndex: 100 }}>
      <ul style={{ display: "flex", listStyle: "none", margin: 0, padding: "0 32px", justifyContent: "center", flexWrap: "wrap" }}>
        {NAV_CATEGORIES.map(cat => {
          const on = active === cat.id || hovered === cat.id;
          return (
            <li key={cat.id}>
              <button
                onClick={() => cat.subs ? setActive(active === cat.id ? null : cat.id) : setActive(null)}
                onMouseEnter={() => setHovered(cat.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ ...T.label, fontWeight: active === cat.id ? 500 : 400, color: on ? "#fff" : "#1a1a1a", background: on ? "#1a1a1a" : "transparent", border: "none", padding: "18px 22px", cursor: "pointer", transition: "background 0.2s, color 0.2s", whiteSpace: "nowrap" }}>
                {cat.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ════════════════════════════════════════════════════════════
   4. SUBCATEGORY GRID
════════════════════════════════════════════════════════════ */
function SubGrid({ categoryId }) {
  const [hov, setHov] = useState(null);
  const cat = NAV_CATEGORIES.find(c => c.id === categoryId);
  if (!cat?.subs) return null;

  return (
    <div style={{ background: "#fafafa", borderBottom: "1px solid #e8e8e8", padding: "44px 40px 52px" }}>
      <p style={{ ...T.label, color: "#aaa", textAlign: "center", marginBottom: "28px" }}>{cat.label}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "20px", maxWidth: "1400px", margin: "0 auto" }}>
        {cat.subs.map(sub => {
          const isHov = hov === sub.label;
          return (
            <a key={sub.label} href={`#${sub.label.toLowerCase().replace(/\s+/g, "-")}`}
              onMouseEnter={() => setHov(sub.label)} onMouseLeave={() => setHov(null)}
              style={{ textDecoration: "none", display: "block", aspectRatio: "3/2", borderRadius: "4px", overflow: "hidden", position: "relative", background: sub.src ? "transparent" : `hsl(${sub.hue},32%,${isHov ? 52 : 64}%)`, transform: isHov ? "translateY(-4px)" : "translateY(0)", boxShadow: isHov ? "0 14px 36px rgba(0,0,0,0.18)" : "0 2px 10px rgba(0,0,0,0.08)", transition: "transform 0.28s, box-shadow 0.28s, background 0.28s" }}>
              {sub.src && <img src={sub.src} alt={sub.label} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: isHov ? "scale(1.06)" : "scale(1)", transition: "transform 0.5s" }} />}
              <div style={{ position: "absolute", inset: 0, background: isHov ? "linear-gradient(to top,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0.08) 100%)" : "linear-gradient(to top,rgba(0,0,0,0.25) 0%,transparent 60%)", transition: "background 0.28s" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 18px" }}>
                <p style={{ ...T.label, color: "#fff", fontWeight: isHov ? 500 : 400, transform: isHov ? "translateY(-2px)" : "translateY(0)", transition: "transform 0.28s" }}>{sub.label}</p>
                <div style={{ marginTop: "6px", height: "1px", background: "rgba(255,255,255,0.7)", width: isHov ? "32px" : "0px", transition: "width 0.3s" }} />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   5. MISSION SECTION
════════════════════════════════════════════════════════════ */
function MissionSection() {
  const [ref, vis] = useReveal();
  const [hovImg, setHovImg] = useState(null);

  return (
    <section ref={ref} style={{ background: "#fff", borderBottom: "1px solid #ebebeb", padding: "64px 48px 72px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>

        {/* 2×2 image grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", ...fade(vis) }}>
          {MISSION_IMAGES.map((img, i) => {
            const isHov = hovImg === i;
            return (
              <div key={i} onMouseEnter={() => setHovImg(i)} onMouseLeave={() => setHovImg(null)}
                style={{ aspectRatio: "1/1", borderRadius: "4px", overflow: "hidden", position: "relative", cursor: "pointer", transform: isHov ? "scale(1.03)" : "scale(1)", boxShadow: isHov ? "0 16px 40px rgba(0,0,0,0.18)" : "0 4px 16px rgba(0,0,0,0.08)", transition: "transform 0.32s, box-shadow 0.32s" }}>
                <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: isHov ? "scale(1.07)" : "scale(1)", transition: "transform 0.5s" }} />
                <div style={{ position: "absolute", inset: 0, background: isHov ? "rgba(0,0,0,0.22)" : "rgba(0,0,0,0.04)", transition: "background 0.32s" }} />
              </div>
            );
          })}
        </div>

        {/* Text */}
        <div>
          <p style={{ ...T.eyebrow, color: "#6a6a6a", marginBottom: "18px", ...fade(vis, 0.1) }}>Our Mission</p>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.4rem,2.8vw,2.1rem)", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#1a1a1a", lineHeight: 1.15, marginBottom: "28px", ...fadeUp(vis, 0.15) }}>
            A space for every creative voice
          </h2>
          <div style={{ width: "40px", height: "2px", background: "#5BB8D4", marginBottom: "28px", ...fade(vis, 0.25) }} />
          {MISSION_PARAGRAPHS.map((para, i) => (
            <p key={i} style={{ ...T.body, fontWeight: i === 0 ? 400 : 300, color: i === 0 ? "#2a2a2a" : "#666", marginBottom: i < 2 ? "18px" : 0, ...fade(vis, 0.3 + i * 0.12) }}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   6. INTERACTIVE TOOLS
════════════════════════════════════════════════════════════ */
function WallVisual({ accent, vis }) {
  const [hovWord, setHovWord] = useState(null);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px", alignItems: "baseline", maxWidth: "380px", ...fade(vis, 0.7) }}>
      {WALL_WORDS.map((w, i) => {
        const s = wallWordStyle(w, i);
        const isHov = hovWord === w;
        return (
          <span key={w} onMouseEnter={() => setHovWord(w)} onMouseLeave={() => setHovWord(null)}
            style={{ fontFamily: "'Georgia',serif", fontSize: s.fontSize, fontWeight: s.fontWeight, color: isHov ? accent : s.color, opacity: isHov ? 1 : s.opacity, letterSpacing: s.letterSpacing, textTransform: s.textTransform, lineHeight: 1.2, display: "inline-block", cursor: "default", transform: isHov ? "scale(1.1)" : "scale(1)", transition: "opacity 0.2s, color 0.2s, transform 0.2s" }}>
            {w}
          </span>
        );
      })}
    </div>
  );
}

function ToolVisual({ type, accent, vis }) {
  if (type === "wall") return <WallVisual accent={accent} vis={vis} />;

  if (type === "lines") return (
    <div style={{ width: "280px", ...fade(vis, 0.7) }}>
      {["Art History", "Cultural Movements", "Forgotten Artists", "Weekly Editions", "Free to All"].map((t, i) => (
        <div key={t} style={{ ...T.label, color: i === 0 ? "#111" : "#ccc", fontWeight: i === 0 ? 600 : 300, padding: "14px 0", borderBottom: "1px solid #ebebeb", ...slideIn(vis, 0.6 + i * 0.1) }}>{t}</div>
      ))}
    </div>
  );

  if (type === "circle") return (
    <div style={{ position: "relative", width: "220px", height: "220px", ...fade(vis, 0.7) }}>
      {[0, 20, 40, 60].map((inset, i) => (
        <div key={i} style={{ position: "absolute", inset: `${inset}px`, borderRadius: "50%", border: `1px solid ${i === 3 ? "#111" : "#e8e8e8"}`, background: i === 3 ? "#111" : "transparent", transform: vis ? "scale(1)" : "scale(0.7)", transition: `transform 0.9s ease ${0.6 + i * 0.1}s`, display: i === 3 ? "flex" : "block", alignItems: "center", justifyContent: "center" }}>
          {i === 3 && <span style={{ ...T.eyebrow, color: "#fff" }}>Artist</span>}
        </div>
      ))}
    </div>
  );

  if (type === "heart") return (
    <div style={{ textAlign: "center", ...fade(vis, 0.7) }}>
      <svg width="140" height="126" viewBox="0 0 24 22" fill="none">
        <path d="M12 21C12 21 2 13.5 2 7a5 5 0 0 1 10 0 5 5 0 0 1 10 0c0 6.5-10 14-10 14z"
          stroke={accent} strokeWidth="0.5" strokeDasharray="65" strokeDashoffset={vis ? "0" : "65"}
          style={{ transition: "stroke-dashoffset 1.8s ease 0.8s" }} />
      </svg>
      <p style={{ ...T.eyebrow, color: "#ccc", marginTop: "18px", ...fade(vis, 1.4) }}>Supporting Artists Since 2024</p>
    </div>
  );

  return null;
}

function SingleToolSection({ tool }) {
  const [ref, vis] = useReveal(0.3);
  return (
    <div ref={ref} style={{ minHeight: "100vh", display: "flex", alignItems: "center", background: tool.bg, padding: "8vh 10vw", borderTop: "1px solid #ebebeb", position: "relative" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>

        {/* Text */}
        <div>
          <p style={{ ...T.eyebrow, color: "#bbb", marginBottom: "20px", ...fade(vis, 0.1) }}>{tool.eyebrow}</p>
          <h2 style={{ fontFamily: FONT, fontWeight: 200, fontSize: "clamp(2rem,5vw,4.5rem)", letterSpacing: "0.14em", textTransform: "uppercase", color: "#111", lineHeight: 1.05, margin: 0 }}>
            {tool.title.split("\n").map((line, i) => (
              <span key={i} style={{ display: "block", ...slideIn(vis, 0.2 + i * 0.12) }}>{line}</span>
            ))}
          </h2>
          <div style={{ width: "24px", height: "1px", background: tool.accent, margin: "26px 0", ...fade(vis, 0.45) }} />
          <p style={{ ...T.body, color: "#888", maxWidth: "380px", ...fade(vis, 0.55) }}>{tool.description}</p>
          <a href={tool.href} style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginTop: "32px", ...T.cta, textDecoration: "none", color: tool.accent, borderBottom: `1px solid ${tool.accent}`, paddingBottom: "2px", ...fade(vis, 0.65) }}>
            {tool.cta} <span style={{ fontSize: "0.75rem" }}>→</span>
          </a>
        </div>

        {/* Visual */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ToolVisual type={tool.visual} accent={tool.accent} vis={vis} />
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "28px", right: "3rem", ...T.small, fontSize: "0.46rem", letterSpacing: "0.2em", color: "#ddd" }}>{tool.index}</div>
    </div>
  );
}

function InteractiveTools() {
  const [ref, vis] = useReveal(0.3);
  return (
    <>
      <div ref={ref} style={{ background: "#fff", padding: "80px 10vw 72px", borderTop: "1px solid #ebebeb" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ ...T.eyebrow, color: "#bbb", marginBottom: "20px", ...fade(vis) }}>Interactive</p>
          <h2 style={{ fontFamily: FONT, fontWeight: 200, fontSize: "clamp(2rem,5vw,4.5rem)", letterSpacing: "0.14em", textTransform: "uppercase", color: "#111", lineHeight: 1.05, ...fadeUp(vis, 0.15) }}>
            Art District<br />Tools
          </h2>
          <div style={{ width: "24px", height: "1px", background: "#5BB8D4", marginTop: "28px", ...fade(vis, 0.35) }} />
          <p style={{ ...T.body, color: "#aaa", maxWidth: "400px", marginTop: "20px", ...fade(vis, 0.45) }}>
            Explore, connect, and participate — These interactive spaces are where the Art District community comes alive. 
          </p>
        </div>
      </div>
      {TOOLS_DATA.map(tool => <SingleToolSection key={tool.id} tool={tool} />)}
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   7. FOOTER
════════════════════════════════════════════════════════════ */
function RainbowBrand() {
  const text = "Art District";
  const [colors, setColors] = useState(() => Array(text.length).fill("#e8e0d0"));
  const [on, setOn] = useState(false);
  const interval = useRef(null);

  const start = () => { setOn(true);  interval.current = setInterval(() => setColors(Array(text.length).fill(null).map(randomVivid)), 120); };
  const stop  = () => { setOn(false); clearInterval(interval.current); setColors(Array(text.length).fill("#e8e0d0")); };

  return (
    <span onMouseEnter={start} onMouseLeave={stop} style={{ cursor: "default" }}>
      {text.split("").map((ch, i) => (
        <span key={i} style={{ color: colors[i], transition: on ? "color 0.1s" : "color 0.4s", display: "inline-block", whiteSpace: ch === " " ? "pre" : "normal" }}>{ch}</span>
      ))}
    </span>
  );
}

function Footer() {
  const [hovSocial, setHovSocial] = useState(null);
  const [hovLink,   setHovLink]   = useState(null);

  return (
    <footer style={{ background: "#0d0d0d", color: "#fff", padding: "40px 48px 24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1.4fr", gap: "40px", maxWidth: "1100px", margin: "0 auto 28px", alignItems: "start" }}>

        {/* Brand + socials */}
        <div>
          <p style={{ fontFamily: FONT, fontSize: "2rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", lineHeight: 1, marginBottom: "10px" }}>
            <RainbowBrand />
          </p>
          <p style={{ ...T.body, color: "rgba(255,255,255,0.38)", maxWidth: "230px", marginBottom: "18px" }}>A home for every art form.</p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {SOCIAL_LINKS.map(s => (
              <a key={s.label} href={s.href} aria-label={s.label}
                onMouseEnter={() => setHovSocial(s.label)} onMouseLeave={() => setHovSocial(null)}
                style={{ color: hovSocial === s.label ? "#e8e0d0" : "rgba(255,255,255,0.38)", textDecoration: "none", display: "flex", transform: hovSocial === s.label ? "translateY(-2px)" : "translateY(0)", transition: "color 0.2s, transform 0.2s" }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <p style={{ ...T.label, color: "rgba(255,255,255,0.28)", marginBottom: "14px" }}>Quick Links</p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {FOOTER_LINKS.map(link => (
              <li key={link.label} style={{ marginBottom: "9px" }}>
                <a href={link.href}
                  onMouseEnter={() => setHovLink(link.label)} onMouseLeave={() => setHovLink(null)}
                  style={{ ...T.label, textDecoration: "none", color: hovLink === link.label ? "#e8e0d0" : "rgba(255,255,255,0.42)", transition: "color 0.2s" }}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <p style={{ ...T.label, color: "rgba(255,255,255,0.28)", marginBottom: "14px" }}>Stay in the Loop</p>
          <p style={{ ...T.body, color: "rgba(255,255,255,0.42)", marginBottom: "14px" }}>
            Art history, stories & monthly spotlights — straight to your inbox.
          </p>
          <div style={{ display: "flex" }}>
            <input type="email" placeholder="your@email.com"
              style={{ flex: 1, padding: "10px 14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", borderRight: "none", borderRadius: "2px 0 0 2px", color: "#fff", fontFamily: FONT, fontSize: "0.7rem", outline: "none" }} />
            <button
              style={{ padding: "10px 18px", background: "#5BB8D4", border: "none", borderRadius: "0 2px 2px 0", color: "#0d0d0d", ...T.cta, cursor: "pointer", whiteSpace: "nowrap", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#3FA5C4"}
              onMouseLeave={e => e.currentTarget.style.background = "#5BB8D4"}>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto 18px", height: "1px", background: "rgba(255,255,255,0.07)" }} />
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
        <p style={{ ...T.small, color: "rgba(255,255,255,0.2)" }}>© {new Date().getFullYear()} Art District. All rights reserved.</p>
        <p style={{ ...T.label, color: "rgba(255,255,255,0.18)" }}>Everyone speaks art</p>
      </div>
    </footer>
  );
}

/* ════════════════════════════════════════════════════════════
   8. PAGE ROOT
════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zeyada&family=Montserrat:wght@200;300;400;500;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fafafa; }
      `}</style>

      <Hero />
      <Carousel />
      <NavBar active={activeCategory} setActive={setActiveCategory} />
      {activeCategory ? <SubGrid categoryId={activeCategory} /> : <MissionSection />}
      {!activeCategory && <InteractiveTools />}
      <Footer />
    </>
  );
}