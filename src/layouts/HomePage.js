import React, { useState, useEffect } from "react";

/* ══════════════════════════════════════════════
   NAV DATA
   ══════════════════════════════════════════════ */
const NAV_CATEGORIES = [
  {
    id: "visual",
    label: "Visual Arts",
    subs: [
      { label: "Painting",    hue: 22  },
      { label: "Sculpture",   hue: 45  },
      { label: "Photography", hue: 195 },
      { label: "Digital",     hue: 260 },
      { label: "Print",       hue: 340 },
      { label: "Mural",       hue: 80  },
    ],
  },
  {
    id: "performance",
    label: "Performance Art",
    subs: [
      { label: "Music",    hue: 210 },
      { label: "TV & Film",hue: 30  },
      { label: "Theater",  hue: 320 },
      { label: "Dance",    hue: 160 },
    ],
  },
  {
    id: "literary",
    label: "Literary Art",
    subs: [
      { label: "Poetry",     hue: 55  },
      { label: "Books",      hue: 12  },
      { label: "Plays",      hue: 290 },
      { label: "Journalism", hue: 185 },
    ],
  },
  {
    id: "culinary",
    label: "Culinary Arts",
    subs: [
      { label: "Savory",           hue: 28  },
      { label: "Pastry",           hue: 42  },
      { label: "Libations",        hue: 355 },
      { label: "Story on a Plate", hue: 90  },
    ],
  },
  {
    id: "nonprofit",
    label: "Nonprofits",
    subs: [
      { label: "Initiatives",               hue: 170 },
      { label: "Arts & Culture Nonprofits", hue: 245 },
      { label: "Grants",                    hue: 75  },
      { label: "Resource Sharing",          hue: 310 },
    ],
  },
  {
    id: "events",
    label: "Events",
    subs: [
      { label: "Atlanta Events",  hue: 5   },
      { label: "New York Events", hue: 215 },
      { label: "Chicago Events",  hue: 150 },
    ],
  },
  { id: "about",   label: "About",   subs: null },
  { id: "contact", label: "Contact", subs: null },
];

/* ══════════════════════════════════════════════
   NAVBAR
   ══════════════════════════════════════════════ */
function NavBar({ active, setActive }) {
  const [hovered, setHovered] = useState(null);

  return (
    <nav style={{
      background: "#fff",
      borderBottom: "1px solid #e8e8e8",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <ul style={{
        display: "flex",
        listStyle: "none",
        margin: 0,
        padding: "0 32px",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 0,
      }}>
        {NAV_CATEGORIES.map((cat) => {
          const isActive  = active === cat.id;
          const isHovered = hovered === cat.id;
          const highlight = isActive || isHovered;

          return (
            <li key={cat.id}>
              <button
                onClick={() => {
                  // About / Contact have no grid — treat as plain links
                  if (!cat.subs) {
                    setActive(null);
                    // navigation would go here, e.g. router.push(`/${cat.id}`)
                  } else {
                    setActive(isActive ? null : cat.id);
                  }
                }}
                onMouseEnter={() => setHovered(cat.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: isActive ? 500 : 400,
                  color: highlight ? "#fff" : "#1a1a1a",
                  background: highlight ? "#1a1a1a" : "transparent",
                  border: "none",
                  padding: "18px 22px",
                  cursor: "pointer",
                  transition: "background 0.2s ease, color 0.2s ease",
                  display: "block",
                  whiteSpace: "nowrap",
                }}
              >
                {cat.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ══════════════════════════════════════════════
   SUBCATEGORY GRID
   ══════════════════════════════════════════════ */
function SubGrid({ categoryId }) {
  const [hoveredSub, setHoveredSub] = useState(null);
  const cat = NAV_CATEGORIES.find((c) => c.id === categoryId);
  if (!cat || !cat.subs) return null;

  return (
    <div style={{
      background: "#fafafa",
      borderBottom: "1px solid #e8e8e8",
      padding: "44px 40px 52px",
    }}>
      <p style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "0.62rem",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: "#aaa",
        textAlign: "center",
        marginBottom: "28px",
      }}>
        {cat.label}
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
        gap: "20px",
        maxWidth: "1400px",
        margin: "0 auto",
      }}>
        {cat.subs.map((sub) => {
          const isHov = hoveredSub === sub.label;
          return (
            <a
              key={sub.label}
              href={`#${sub.label.toLowerCase().replace(/\s+/g, "-")}`}
              onMouseEnter={() => setHoveredSub(sub.label)}
              onMouseLeave={() => setHoveredSub(null)}
              style={{
                textDecoration: "none",
                display: "block",
                aspectRatio: "3/2",
                borderRadius: "4px",
                overflow: "hidden",
                position: "relative",
                background: `hsl(${sub.hue}, 32%, ${isHov ? 52 : 64}%)`,
                transform: isHov ? "translateY(-4px)" : "translateY(0)",
                boxShadow: isHov
                  ? "0 14px 36px rgba(0,0,0,0.18)"
                  : "0 2px 10px rgba(0,0,0,0.08)",
                transition: "transform 0.28s ease, box-shadow 0.28s ease, background 0.28s ease",
              }}
            >
              <div style={{
                position: "absolute", inset: 0,
                background: isHov
                  ? "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.08) 100%)"
                  : "linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 60%)",
                transition: "background 0.28s ease",
              }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 18px" }}>
                <p style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.8rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#fff",
                  fontWeight: isHov ? 500 : 400,
                  transform: isHov ? "translateY(-2px)" : "translateY(0)",
                  transition: "transform 0.28s ease",
                }}>
                  {sub.label}
                </p>
                <div style={{
                  marginTop: "6px",
                  height: "1px",
                  background: "rgba(255,255,255,0.7)",
                  width: isHov ? "32px" : "0px",
                  transition: "width 0.3s ease",
                }} />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   CAROUSEL DATA
   ══════════════════════════════════════════════ */
const CAROUSEL_ITEMS = [
  {
    id: 1,
    href: "https://example.com/art-archives",
    src: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&q=85",
    eyebrow: "Newsletter",
    title: "Art Archives",
    description:
      "A curated journey through art history — stories, movements, and masterworks delivered straight to your inbox.",
    cta: "Subscribe Now",
    accent: "#5BB8D4",
  },
  {
    id: 2,
    href: "https://example.com/artist-spotlight",
    src: "https://images.unsplash.com/photo-1572947650440-e8a97ef053b2?w=1200&q=85",
    eyebrow: "Monthly Feature",
    title: "Artist Spotlight",
    description:
      "Every month we shine a light on one extraordinary artist — their process, their story, their vision.",
    cta: "Meet This Month's Artist",
    accent: "#a8c5da",
  },
  {
    id: 3,
    href: "https://example.com/dreamer-heart-fund",
    src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=85",
    eyebrow: "Nonprofit Initiative",
    title: "Dreamer Heart Fund",
    description:
      "Supporting artists in need. Every contribution keeps a creative voice alive — donate or nominate someone today.",
    cta: "Give & Support",
    accent: "#d4a5c9",
  },
];

/* ══════════════════════════════════════════════
   CAROUSEL
   ══════════════════════════════════════════════ */
function Carousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);
  const total = CAROUSEL_ITEMS.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => goTo((prev) => (prev + 1) % total), 5000);
    return () => clearInterval(id);
  }, [paused, total]);

  const goTo = (indexOrFn) => {
    setAnimating(true);
    setTimeout(() => { setActive(indexOrFn); setAnimating(false); }, 320);
  };

  const prev = () => { setPaused(true); goTo((active - 1 + total) % total); };
  const next = () => { setPaused(true); goTo((active + 1) % total); };
  const item = CAROUSEL_ITEMS[active];

  return (
    <section
      style={{ position: "relative", background: "#0a0a0a", overflow: "hidden" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${item.src})`,
        backgroundSize: "cover", backgroundPosition: "center",
        opacity: animating ? 0 : 1,
        transform: animating ? "scale(1.03)" : "scale(1)",
        transition: "opacity 0.55s ease, transform 0.55s ease",
        zIndex: 0,
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.15) 100%)",
        zIndex: 1,
      }} />
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, width: "4px",
        background: item.accent, opacity: animating ? 0 : 1,
        transition: "background 0.55s ease, opacity 0.4s ease", zIndex: 3,
      }} />
      <div style={{
        position: "relative", zIndex: 2, maxWidth: "680px",
        padding: "80px 64px 80px 68px",
        opacity: animating ? 0 : 1,
        transform: animating ? "translateY(12px)" : "translateY(0)",
        transition: "opacity 0.45s ease, transform 0.45s ease",
      }}>
        <p style={{
          fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem",
          letterSpacing: "0.28em", textTransform: "uppercase",
          color: item.accent, marginBottom: "14px",
        }}>{item.eyebrow}</p>
        <h2 style={{
          fontFamily: "'Zeyada', cursive",
          fontSize: "clamp(2.8rem, 5vw, 4.2rem)", fontWeight: 400,
          color: "#fff", lineHeight: 1.1, marginBottom: "20px",
        }}>{item.title}</h2>
        <p style={{
          fontFamily: "'Montserrat', sans-serif", fontSize: "0.92rem",
          fontWeight: 300, color: "rgba(255,255,255,0.78)", lineHeight: 1.75,
          maxWidth: "440px", marginBottom: "36px",
        }}>{item.description}</p>
        <a href={item.href} target="_blank" rel="noopener noreferrer"
          style={{
            display: "inline-block", padding: "13px 32px",
            border: `1px solid ${item.accent}`, color: item.accent,
            fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem",
            letterSpacing: "0.18em", textTransform: "uppercase",
            textDecoration: "none", borderRadius: "2px",
            transition: "background 0.25s ease, color 0.25s ease", background: "transparent",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = item.accent; e.currentTarget.style.color = "#0a0a0a"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = item.accent; }}
        >{item.cta}</a>
      </div>
      {[{ fn: prev, label: "‹", side: "left" }, { fn: next, label: "›", side: "right" }].map(({ fn, label, side }) => (
        <button key={side} onClick={fn} aria-label={side}
          style={{
            position: "absolute", top: "50%", [side]: "24px", transform: "translateY(-50%)",
            zIndex: 4, width: "44px", height: "44px", borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.35)", background: "rgba(0,0,0,0.35)",
            color: "#fff", fontSize: "1.5rem", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "border-color 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.borderColor = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.35)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}
        >{label}</button>
      ))}
      <div style={{
        position: "absolute", bottom: "28px", right: "48px",
        zIndex: 4, display: "flex", gap: "10px", alignItems: "center",
      }}>
        {CAROUSEL_ITEMS.map((c, i) => (
          <button key={c.id}
            onClick={() => { setPaused(true); goTo(i); }}
            aria-label={`Go to ${c.title}`}
            style={{
              width: active === i ? "48px" : "8px", height: "8px", borderRadius: "4px",
              border: "none", background: active === i ? c.accent : "rgba(255,255,255,0.35)",
              cursor: "pointer", padding: 0,
              transition: "width 0.35s ease, background 0.35s ease",
            }}
          />
        ))}
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "rgba(255,255,255,0.1)", zIndex: 4 }}>
        <div key={`${active}-${paused}`} style={{
          height: "100%", background: item.accent,
          width: paused ? "0%" : "100%",
          transition: paused ? "none" : "width 5s linear",
        }} />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════ */
const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "https://twitter.com/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34l-.01-8.83a8.18 8.18 0 0 0 4.78 1.52V4.55a4.85 4.85 0 0 1-1-.14z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.64 1.267 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.137-1.868 3.137-4.561 0-2.386-1.714-4.054-4.163-4.054-2.836 0-4.5 2.127-4.5 4.326 0 .856.33 1.775.741 2.276a.3.3 0 0 1 .069.286c-.076.313-.244.995-.277 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
      </svg>
    ),
  },
];

/* ══════════════════════════════════════════════
   MISSION SECTION (default below nav)
   ══════════════════════════════════════════════ */
const MISSION_IMAGES = [
  { hue: 22,  src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80", alt: "Painting" },
  { hue: 195, src: "https://images.unsplash.com/photo-1510081887155-56fe96846e71?w=600&q=80", alt: "Photography" },
  { hue: 160, src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80", alt: "Abstract" },
  { hue: 310, src: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80", alt: "Digital Art" },
];

function MissionSection() {
  const [hoveredImg, setHoveredImg] = useState(null);

  return (
    <section style={{
      background: "#fff",
      borderBottom: "1px solid #ebebeb",
      padding: "64px 48px 72px",
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "64px",
        alignItems: "center",
      }}>

        {/* Left: 2×2 image grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
        }}>
          {MISSION_IMAGES.map((img, i) => {
            const isHov = hoveredImg === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredImg(i)}
                onMouseLeave={() => setHoveredImg(null)}
                style={{
                  aspectRatio: "1 / 1",
                  borderRadius: "4px",
                  overflow: "hidden",
                  position: "relative",
                  transform: isHov ? "scale(1.03)" : "scale(1)",
                  boxShadow: isHov
                    ? "0 16px 40px rgba(0,0,0,0.18)"
                    : "0 4px 16px rgba(0,0,0,0.08)",
                  transition: "transform 0.32s ease, box-shadow 0.32s ease",
                  cursor: "pointer",
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    display: "block",
                    transform: isHov ? "scale(1.07)" : "scale(1)",
                    transition: "transform 0.5s ease",
                  }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: isHov
                    ? "rgba(0,0,0,0.28)"
                    : "rgba(0,0,0,0.04)",
                  transition: "background 0.32s ease",
                }} />
              </div>
            );
          })}
        </div>

        {/* Right: mission text */}
        <div>
          {/* Decorative eyebrow */}
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#bbb",
            marginBottom: "18px",
          }}>Our Mission</p>

          {/* Headline */}
          <h2 style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(1.4rem, 2.8vw, 2.1rem)",
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#1a1a1a",
            lineHeight: 1.15,
            marginBottom: "28px",
          }}>
            A space for every creative voice
          </h2>

          {/* Thin accent line */}
          <div style={{
            width: "40px",
            height: "2px",
            background: "#5BB8D4",
            marginBottom: "28px",
          }} />

          {/* Body paragraphs */}
          {[
            "Art District's mission is to create a space for art lovers and creatives to connect and learn the stories of emerging and established underrepresented artists.",
            "We emphasize the importance of arts and culture to help us understand one another, tell our histories, and imagine new possibilities for our communities. Ensuring accessibility in the arts means making space for everyone so that people of all abilities, backgrounds, and lived experiences can participate, create, and be heard.",
            "Connection is at the heart of creative communities. By supporting one another, we help ensure that art remains a living, shared experience. When accessibility and equity guide our cultural spaces, the arts become not only a reflection of our society, but a powerful way to bring people together and build a more understanding and vibrant world.",
          ].map((para, i) => (
            <p key={i} style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.85rem",
              fontWeight: i === 0 ? 400 : 300,
              color: i === 0 ? "#2a2a2a" : "#666",
              lineHeight: 1.85,
              marginBottom: i < 2 ? "18px" : 0,
              letterSpacing: "0.01em",
            }}>
              {para}
            </p>
          ))}
        </div>

      </div>
    </section>
  );
}

/* Random vivid colour for the brand name letter effect */
const VIVID_COLORS = [
  "#FF6B6B","#FF9F43","#FECA57","#48DBFB","#FF9FF3",
  "#54A0FF","#5F27CD","#00D2D3","#1DD1A1","#C44569",
  "#F8B739","#EE5A24","#009432","#0652DD","#9980FA",
];
function randomColor() {
  return VIVID_COLORS[Math.floor(Math.random() * VIVID_COLORS.length)];
}

function RainbowBrand() {
  const text = "Art District";
  const [colors, setColors] = useState(() => Array(text.length).fill("#e8e0d0"));
  const [active, setActive] = useState(false);
  const intervalRef = React.useRef(null);

  const startShimmer = () => {
    setActive(true);
    intervalRef.current = setInterval(() => {
      setColors(Array(text.length).fill(null).map(() => randomColor()));
    }, 120);
  };
  const stopShimmer = () => {
    setActive(false);
    clearInterval(intervalRef.current);
    setColors(Array(text.length).fill("#e8e0d0"));
  };

  return (
    <span
      onMouseEnter={startShimmer}
      onMouseLeave={stopShimmer}
      style={{ cursor: "default", display: "inline-block" }}
    >
      {text.split("").map((ch, i) => (
        <span
          key={i}
          style={{
            color: colors[i],
            transition: active ? "color 0.1s ease" : "color 0.4s ease",
            display: "inline-block",
            whiteSpace: ch === " " ? "pre" : "normal",
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);

  const footerLinks = [
    { label: "About",              href: "#about" },
    { label: "Contact",            href: "#contact" },
    { label: "Art Archives",       href: "#art-archives" },
    { label: "Artist Spotlight",   href: "#artist-spotlight" },
    { label: "Dreamer Heart Fund", href: "#dreamer-heart-fund" },
    { label: "Privacy Policy",     href: "#privacy" },
  ];

  return (
    <footer style={{
      background: "#0d0d0d",
      color: "#fff",
      padding: "40px 48px 24px",
    }}>

      {/* Main row: brand | links | newsletter */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.2fr 1fr 1.4fr",
        gap: "40px",
        maxWidth: "1100px",
        margin: "0 auto 28px",
        alignItems: "start",
      }}>

        {/* Brand + socials */}
        <div>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "2rem",
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            lineHeight: 1,
            marginBottom: "10px",
          }}>
            <RainbowBrand />
          </p>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.68rem",
            fontWeight: 300,
            color: "rgba(255,255,255,0.38)",
            lineHeight: 1.7,
            letterSpacing: "0.04em",
            maxWidth: "230px",
            marginBottom: "18px",
          }}>
            A home for every art form.
          </p>

          {/* Icon-only socials */}
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {SOCIAL_LINKS.map((social) => {
              const isHov = hoveredSocial === social.label;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  onMouseEnter={() => setHoveredSocial(social.label)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  style={{
                    color: isHov ? "#e8e0d0" : "rgba(255,255,255,0.38)",
                    textDecoration: "none",
                    transition: "color 0.2s ease, transform 0.2s ease",
                    display: "flex",
                    transform: isHov ? "translateY(-2px)" : "translateY(0)",
                  }}
                >
                  {social.icon}
                </a>
              );
            })}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.28)",
            marginBottom: "14px",
          }}>Quick Links</p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {footerLinks.map((link) => (
              <li key={link.label} style={{ marginBottom: "9px" }}>
                <a
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.68rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    color: hoveredLink === link.label ? "#e8e0d0" : "rgba(255,255,255,0.42)",
                    transition: "color 0.2s ease",
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.28)",
            marginBottom: "14px",
          }}>Stay in the Loop</p>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.68rem",
            fontWeight: 300,
            color: "rgba(255,255,255,0.42)",
            lineHeight: 1.65,
            marginBottom: "14px",
          }}>
            Art history, stories & monthly spotlights — straight to your inbox.
          </p>
          <div style={{ display: "flex" }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                flex: 1,
                padding: "10px 14px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRight: "none",
                borderRadius: "2px 0 0 2px",
                color: "#fff",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.7rem",
                outline: "none",
              }}
            />
            <button
              style={{
                padding: "10px 18px",
                background: "#5BB8D4",
                border: "none",
                borderRadius: "0 2px 2px 0",
                color: "#0d0d0d",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#3FA5C4"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#5BB8D4"}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ maxWidth: "1100px", margin: "0 auto 18px", height: "1px", background: "rgba(255,255,255,0.07)" }} />

      {/* Bottom bar */}
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "8px",
      }}>
        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.6rem",
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "0.06em",
        }}>
          © {new Date().getFullYear()} Art District. All rights reserved.
        </p>
        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.58rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.18)",
        }}>
          Everyone speaks art
        </p>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════
   PLACEHOLDER HERO SUB-COMPONENTS
   ══════════════════════════════════════════════ */
const ArtDistrict = () => (
  <div style={{
    position: "absolute", bottom: "12%", left: "50%", transform: "translateX(-50%)",
    zIndex: 2, textAlign: "center", color: "white", letterSpacing: "0.35em",
    textTransform: "uppercase", fontSize: "0.75rem",
    fontFamily: "'Montserrat', sans-serif", opacity: 0.85,
  }}>Art District</div>
);

const LogoImage = () => (
  <img
    src="https://placehold.co/80x80/ffffff/000000?text=AD"
    alt="Art District Logo"
    style={{ width: "8%", minWidth: "52px", maxWidth: "88px", height: "auto", display: "block" }}
  />
);

/* ══════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════ */
export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zeyada&family=Montserrat:wght@300;400;500;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fafafa; }
        @media (max-width: 550px) { .logo-img { min-width: 44px !important; } }
        @media (max-width: 400px) { .logo-img { min-width: 36px !important; } }
      `}</style>

      <div>
        {/* 1 ── Hero video ── */}
        <div style={{ overflow: "hidden", maxWidth: "100%", position: "relative" }}>
          <div style={{
            position: "relative", paddingBottom: "56.25%", height: 0,
            paddingTop: "25px", width: "300%", left: "-100%",
          }}>
            <iframe
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -2, border: "none" }}
              width="1200" height="500"
              src="https://www.youtube.com/embed/zcA2B41Wym8?version=3&autoplay=1&start=4140&controls=0&loop=1&rel=0&mute=1&vq=hd1080&playlist=zcA2B41Wym8"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <ArtDistrict />
          </div>
          <div style={{ fontSize: "5em", position: "absolute", top: "5px", left: "1%", zIndex: 2, color: "white" }}>
            <LogoImage className="logo-img" />
          </div>
        </div>

        {/* 2 ── CAROUSEL (directly under hero) ── */}
        <Carousel />

        {/* 3 ── NAV BAR ── */}
        <NavBar active={activeCategory} setActive={setActiveCategory} />

        {/* 4 ── SUBCATEGORY GRID or default MISSION section ── */}
        {activeCategory ? <SubGrid categoryId={activeCategory} /> : <MissionSection />}

        {/* 5 ── FOOTER ── */}
        <Footer />
      </div>
    </>
  );
}