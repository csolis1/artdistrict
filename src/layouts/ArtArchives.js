"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";

const FONT = "'Montserrat', sans-serif";
const SCRIPT = "'Zeyada', cursive";

const T = {
  eyebrow: { fontFamily: FONT, fontSize: "0.48rem", letterSpacing: "0.38em", textTransform: "uppercase" },
  label: { fontFamily: FONT, fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase" },
  small: { fontFamily: FONT, fontSize: "0.7rem", letterSpacing: "0.06em" },
  body: { fontFamily: FONT, fontSize: "0.82rem", fontWeight: 300, lineHeight: 1.9, letterSpacing: "0.02em" },
  cta: { fontFamily: FONT, fontSize: "0.5rem", letterSpacing: "0.22em", textTransform: "uppercase" },
};

function useReveal(threshold = 0.22) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, vis];
}

const ARCHIVE_TOPICS = [
  "Renaissance",
  "Modernism",
  "Afrofuturism",
  "Contemporary",
  "Photography",
  "Installation",
  "Sculpture",
  "Editorial",
];

const ARCHIVE_ARTICLES = [
  {
    id: 1,
    title: "How art movements travel across centuries",
    category: "Art History",
    date: "April 2026",
    readTime: "6 min read",
    excerpt:
      "A guide to tracing visual ideas through time, showing how style, politics, and culture reshape the same artistic questions again and again.",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&q=80",
    accent: "#5BB8D4",
  },
  {
    id: 2,
    title: "The power of underrepresented artists in public memory",
    category: "Cultural Critique",
    date: "March 2026",
    readTime: "5 min read",
    excerpt:
      "Why public collections matter, how archives shape what gets remembered, and what happens when institutions overlook whole communities.",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&q=80",
    accent: "#d4a5c9",
  },
  {
    id: 3,
    title: "Reading a painting like a visual essay",
    category: "Learning Lab",
    date: "February 2026",
    readTime: "4 min read",
    excerpt:
      "A simple framework for noticing composition, symbolism, color, scale, and the social context behind a work of art.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80",
    accent: "#a8c5da",
  },
  {
    id: 4,
    title: "Why archives are living systems, not dusty storage",
    category: "Archive Notes",
    date: "January 2026",
    readTime: "7 min read",
    excerpt:
      "Archives become educational when they are structured for discovery, dialogue, and future interpretation rather than passive collection.",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=80",
    accent: "#f0b35f",
  },
];

const FEATURED_QUOTE = "An archive is not just a record of what happened. It is a map of what a culture decided to preserve.";

const fade = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transition: `opacity 0.8s ease ${delay}s`,
});

const fadeUp = (vis, delay = 0) => ({
  opacity: vis ? 1 : 0,
  transform: vis ? "translateY(0)" : "translateY(14px)",
  transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
});

function ArchiveHero() {
  const [ref, vis] = useReveal(0.2);
  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#0f0f0f",
        minHeight: "72vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            'url("/images/artarchives.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: vis ? "scale(1)" : "scale(1.05)",
          transition: "transform 1.2s ease",
          opacity: 0.72,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      <div style={{ position: "relative", zIndex: 2, width: "100%", padding: "84px 6vw" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ ...T.eyebrow, color: "#5BB8D4", marginBottom: "16px", ...fade(vis, 0.1) }}>
            Newsletter Archive
          </p>
          <h1
            style={{
              fontFamily: SCRIPT,
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontWeight: 400,
              color: "#fff",
              lineHeight: 1,
              marginBottom: "18px",
              ...fadeUp(vis, 0.18),
            }}
          >
            Art Archives
          </h1>
          <p
            style={{
              ...T.body,
              color: "rgba(255,255,255,0.78)",
              maxWidth: "620px",
              marginBottom: "30px",
              ...fadeUp(vis, 0.28),
            }}
          >
            Explore essays, critiques, and visual lessons from the newsletter — built to be educational,
            reflective, and easy to browse.
          </p>

          <div
            style={{
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
              ...fadeUp(vis, 0.38),
            }}
          >
            <a
              href="#latest"
              style={{
                display: "inline-block",
                padding: "13px 28px",
                border: "1px solid #5BB8D4",
                color: "#5BB8D4",
                ...T.cta,
                textDecoration: "none",
                background: "transparent",
              }}
            >
              Browse Latest
            </a>
            <a
              href="#topics"
              style={{
                display: "inline-block",
                padding: "13px 28px",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                ...T.cta,
                textDecoration: "none",
              }}
            >
              Explore Topics
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function TopicPills({ activeTopic, setActiveTopic }) {
  return (
    <section id="topics" style={{ background: "#fff", borderBottom: "1px solid #ececec", padding: "34px 6vw" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{ ...T.label, color: "#aaa", marginBottom: "16px" }}>Topics</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {ARCHIVE_TOPICS.map((topic) => {
            const on = activeTopic === topic;
            return (
              <button
                key={topic}
                onClick={() => setActiveTopic(on ? null : topic)}
                style={{
                  ...T.cta,
                  border: "1px solid #ddd",
                  background: on ? "#111" : "#fff",
                  color: on ? "#fff" : "#111",
                  padding: "10px 16px",
                  cursor: "pointer",
                  borderRadius: "999px",
                  transition: "all 0.2s ease",
                }}
              >
                {topic}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedStrip() {
  const [ref, vis] = useReveal(0.2);
  return (
    <section ref={ref} style={{ background: "#fafafa", borderBottom: "1px solid #ebebeb", padding: "58px 6vw" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "48px", alignItems: "center" }}>
        <div style={{ ...fade(vis, 0.1) }}>
          <p style={{ ...T.eyebrow, color: "#5BB8D4", marginBottom: "14px" }}>Archive Ethos</p>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", lineHeight: 1.12, marginBottom: "18px" }}>
            Read art with context
          </h2>
          <p style={{ ...T.body, color: "#666" }}>
            Each article is designed to teach, question, and connect visual culture to broader social ideas.
            The archive is meant to feel like a guided library, not just a feed.
          </p>
        </div>

        <div
          style={{
            borderLeft: "2px solid #5BB8D4",
            paddingLeft: "22px",
            minHeight: "140px",
            display: "flex",
            alignItems: "center",
            ...fade(vis, 0.2),
          }}
        >
          <p style={{ ...SCRIPT ? { fontFamily: SCRIPT } : {}, fontSize: "1.8rem", lineHeight: 1.25, color: "#111" }}>
            {FEATURED_QUOTE}
          </p>
        </div>
      </div>
    </section>
  );
}

function ArticleCard({ article }) {
  const [hover, setHover] = useState(false);

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "#fff",
        border: "1px solid #ececec",
        borderRadius: "4px",
        overflow: "hidden",
        boxShadow: hover ? "0 18px 44px rgba(0,0,0,0.12)" : "0 4px 18px rgba(0,0,0,0.05)",
        transform: hover ? "translateY(-5px)" : "translateY(0)",
        transition: "all 0.28s ease",
      }}
    >
      <div style={{ position: "relative", aspectRatio: "3/2", overflow: "hidden" }}>
        <img
          src={article.image}
          alt={article.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hover ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: hover ? "rgba(0,0,0,0.18)" : "rgba(0,0,0,0.06)" }} />
        <div style={{ position: "absolute", top: "16px", left: "16px" }}>
          <span
            style={{
              ...T.cta,
              padding: "8px 10px",
              background: article.accent,
              color: "#111",
              display: "inline-block",
            }}
          >
            {article.category}
          </span>
        </div>
      </div>

      <div style={{ padding: "22px 22px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", marginBottom: "10px" }}>
          <p style={{ ...T.small, color: "#777" }}>{article.date}</p>
          <p style={{ ...T.small, color: "#777" }}>{article.readTime}</p>
        </div>
        <h3 style={{ fontFamily: FONT, fontSize: "1.15rem", fontWeight: 700, lineHeight: 1.3, marginBottom: "12px", color: "#111" }}>
          {article.title}
        </h3>
        <p style={{ ...T.body, color: "#666", marginBottom: "18px" }}>{article.excerpt}</p>

        <a
          href="#"
          style={{
            ...T.cta,
            color: "#111",
            textDecoration: "none",
            borderBottom: "1px solid #111",
            paddingBottom: "2px",
          }}
        >
          Read Article
        </a>
      </div>
    </article>
  );
}

function ArchiveGrid({ activeTopic }) {
  const [ref, vis] = useReveal(0.15);

  const filtered = useMemo(() => {
    if (!activeTopic) return ARCHIVE_ARTICLES;
    return ARCHIVE_ARTICLES.filter((item) => {
      const hay = `${item.title} ${item.category} ${item.excerpt}`.toLowerCase();
      return hay.includes(activeTopic.toLowerCase());
    });
  }, [activeTopic]);

  return (
    <section id="latest" ref={ref} style={{ background: "#fff", padding: "70px 6vw 84px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: "20px", marginBottom: "30px", flexWrap: "wrap" }}>
          <div>
            <p style={{ ...T.eyebrow, color: "#bbb", marginBottom: "12px", ...fade(vis, 0.1) }}>Latest Posts</p>
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.8rem, 3vw, 3rem)", fontWeight: 200, letterSpacing: "0.14em", textTransform: "uppercase", lineHeight: 1.06, ...fadeUp(vis, 0.15) }}>
              Archive Entries
            </h2>
          </div>
          <p style={{ ...T.body, color: "#888", maxWidth: "420px", ...fade(vis, 0.2) }}>
            {activeTopic ? `Filtered by topic: ${activeTopic}` : "Browse the newest essays, critiques, and educational features."}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "22px" }}>
          {filtered.map((article, i) => (
            <div key={article.id} style={{ ...fadeUp(vis, 0.15 + i * 0.08) }}>
              <ArticleCard article={article} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ padding: "48px 0", textAlign: "center" }}>
            <p style={{ ...T.body, color: "#777" }}>No articles match that topic yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function SubscribeSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(email ? `Thanks — ${email} is on the archive list.` : "Please enter an email address.");
  };

  return (
    <section style={{ background: "#0d0d0d", color: "#fff", padding: "70px 6vw" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center" }}>
        <div>
          <p style={{ ...T.eyebrow, color: "#5BB8D4", marginBottom: "14px" }}>Newsletter</p>
          <h2 style={{ fontFamily: SCRIPT, fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 400, lineHeight: 1.05, marginBottom: "16px" }}>
            Join Art Archives
          </h2>
          <p style={{ ...T.body, color: "rgba(255,255,255,0.7)", maxWidth: "460px" }}>
            Get new essays, art history notes, and critical reflections delivered to your inbox.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex" }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                flex: 1,
                padding: "14px 16px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRight: "none",
                borderRadius: "2px 0 0 2px",
                color: "#fff",
                fontFamily: FONT,
                fontSize: "0.8rem",
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "14px 18px",
                background: "#5BB8D4",
                border: "none",
                borderRadius: "0 2px 2px 0",
                color: "#111",
                ...T.cta,
                cursor: "pointer",
              }}
            >
              Subscribe
            </button>
          </div>
          {message && <p style={{ ...T.small, color: "#c9c9c9" }}>{message}</p>}
        </form>
      </div>
    </section>
  );
}

export default function ArtArchivePage() {
  const [activeTopic, setActiveTopic] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zeyada&family=Montserrat:wght@200;300;400;500;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fafafa; }
        html { scroll-behavior: smooth; }
      `}</style>

      <ArchiveHero />
      <TopicPills activeTopic={activeTopic} setActiveTopic={setActiveTopic} />
      <FeaturedStrip />
      <ArchiveGrid activeTopic={activeTopic} />
      <SubscribeSection />
    </>
  );
}