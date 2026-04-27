import { useState, useEffect, useRef } from "react";
import ContactForm from "./ContactForm";
import type { TechCategory, Project, ContactField } from "../types";

const NAV_LINKS = ["About", "Stack", "Projects", "Training", "Contact"];

const TECH_CATEGORIES: TechCategory[] = [
  {
    label: "Frontend",
    emoji: "🎨",
    items: [
      { name: "React",       icon: "⚛️",  color: "#61DAFB" },
      { name: "TypeScript",  icon: "🔷",  color: "#3178C6" },
      { name: "JavaScript",  icon: "🟨",  color: "#F7DF1E" },
      { name: "HTML5",       icon: "🧱",  color: "#E34F26" },
      { name: "CSS3",        icon: "🎨",  color: "#1572B6" },
      { name: "Tailwind CSS",icon: "🌊",  color: "#38BDF8" },
      { name: "Vite",        icon: "⚡",  color: "#646CFF" },
    ],
  },
  {
    label: "Backend",
    emoji: "⚙️",
    items: [
      { name: "Node.js",     icon: "🟢",  color: "#68A063" },
      { name: "Express",     icon: "🚂",  color: "#f0c040" },
      { name: "REST APIs",   icon: "🔗",  color: "#FF6B6B" },
      { name: "JWT",         icon: "🔐",  color: "#FB015B" },
      { name: "Bcrypt",      icon: "🔑",  color: "#a78bfa" },
      { name: "Nodemailer",  icon: "📧",  color: "#22D3EE" },
      { name: "Joi / Zod",   icon: "✅",  color: "#34D399" },
    ],
  },
  {
    label: "Databases",
    emoji: "🗄️",
    items: [
      { name: "MongoDB",     icon: "🍃",  color: "#47A248" },
      { name: "PostgreSQL",  icon: "🐘",  color: "#336791" },
      { name: "Mongoose",    icon: "🔌",  color: "#800000" },
      { name: "SQL",         icon: "📊",  color: "#F29111" },
    ],
  },
  {
    label: "Tools & DevOps",
    emoji: "🛠️",
    items: [
      { name: "Git",         icon: "🌿",  color: "#F05032" },
      { name: "GitHub",      icon: "🐙",  color: "#E2E8F0" },
      { name: "Postman",     icon: "📮",  color: "#FF6C37" },
      { name: "Render",      icon: "☁️",  color: "#46E3B7" },
      { name: "Cloudinary",  icon: "🖼️",  color: "#3448C5" },
      { name: "VS Code",     icon: "💙",  color: "#007ACC" },
      { name: "Cursor",      icon: "🤖",  color: "#a78bfa" },
    ],
  },
];

const PROJECTS: Project[] = [
  {
    title: "E-Commerce Platform",
    desc: "Full-stack app with JWT authentication, product management, cart system, and admin dashboard. Deployed on Render with MongoDB Atlas.",
    tags: ["React", "Node.js", "MongoDB", "JWT"],
    github: "#",
    live: "#",
    gradient: "from-violet-500 to-pink-500",
    number: "01",
  },
  {
    title: "Auth Microservice",
    desc: "Secure authentication service with email verification, 2FA for admins, rate limiting, and Joi validation schemas.",
    tags: ["Express", "JWT", "Nodemailer", "MongoDB"],
    github: "#",
    live: "#",
    gradient: "from-cyan-400 to-blue-500",
    number: "02",
  },
];

const CONTACT_LINKS: ContactField[] = [
  { icon: "✉️", label: "Email",    value: "dscode999@gmail.com",            href: "mailto:dscode999@gmail.com" },
  { icon: "🐙", label: "GitHub",   value: "github.com/salim725",            href: "https://github.com/salim725" },
  { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/salim-aldeadla", href: "https://www.linkedin.com/in/salim-aldeadla" },
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [visible, setVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 120);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          const match = NAV_LINKS.find((l) => l.toLowerCase() === e.target.id);
          if (match) setActiveSection(match);
        }
      }),
      { threshold: 0.35 }
    );
    NAV_LINKS.forEach((l) => { const el = document.getElementById(l.toLowerCase()); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif", background: "linear-gradient(135deg,#0f0c29 0%,#1a103d 35%,#0d1f3c 65%,#0a2a1f 100%)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        /* ── Animated background orbs ── */
        .orb {
          position: fixed;
          border-radius: 9999px;
          filter: blur(100px);
          pointer-events: none;
          animation: orbDrift 18s ease-in-out infinite alternate;
        }
        @keyframes orbDrift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(40px, -30px) scale(1.08); }
        }

        /* ── Glass base ── */
        .glass {
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          border: 1px solid rgba(255,255,255,0.13);
        }
        .glass-strong {
          background: rgba(255,255,255,0.11);
          backdrop-filter: blur(28px) saturate(200%);
          -webkit-backdrop-filter: blur(28px) saturate(200%);
          border: 1px solid rgba(255,255,255,0.18);
        }
        .glass-card {
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(22px) saturate(180%);
          -webkit-backdrop-filter: blur(22px) saturate(180%);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 24px;
          transition: background 0.3s, border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .glass-card:hover {
          background: rgba(255,255,255,0.11);
          border-color: rgba(255,255,255,0.25);
          transform: translateY(-6px);
          box-shadow: 0 24px 60px rgba(120,80,255,0.25);
        }

        /* ── Nav ── */
        .nav-link {
          position: relative;
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 600;
          color: rgba(255,255,255,0.55);
          cursor: pointer;
          transition: color 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .nav-link::after {
          content:'';
          position:absolute;
          bottom:-5px; left:0; right:0;
          height:2px;
          border-radius:2px;
          background: linear-gradient(90deg,#a78bfa,#60a5fa);
          transform:scaleX(0);
          transform-origin:left;
          transition:transform 0.25s;
        }
        .nav-link:hover, .nav-link.active { color:white; }
        .nav-link.active::after, .nav-link:hover::after { transform:scaleX(1); }

        /* ── Buttons ── */
        .btn-glass {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.06em;
          padding: 12px 30px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.25s;
          background: linear-gradient(135deg, rgba(167,139,250,0.35), rgba(96,165,250,0.35));
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(167,139,250,0.5);
          color: white;
        }
        .btn-glass:hover {
          background: linear-gradient(135deg, rgba(167,139,250,0.55), rgba(96,165,250,0.55));
          border-color: rgba(167,139,250,0.8);
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(139,92,246,0.4);
        }
        .btn-outline-glass {
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.06em;
          padding: 11px 30px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.25s;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.8);
        }
        .btn-outline-glass:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.45);
          color: white;
          transform: translateY(-2px);
        }

        /* ── Tags / pills ── */
        .tag-glass {
          font-size: 11px;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 999px;
          background: rgba(167,139,250,0.15);
          border: 1px solid rgba(167,139,250,0.3);
          color: rgba(200,185,255,0.9);
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
        }

        /* ── Tech pill ── */
        .tech-glass {
          display:flex; align-items:center; gap:10px;
          padding:14px 20px;
          border-radius:18px;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.1);
          font-size:14px; font-weight:500;
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,0.75);
          transition: all 0.25s;
          cursor: default;
        }
        .tech-glass:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.22);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(120,80,255,0.2);
        }

        /* ── Section labels ── */
        .section-label {
          font-family:'DM Sans',sans-serif;
          font-size:11px;
          letter-spacing:0.2em;
          text-transform:uppercase;
          background: linear-gradient(90deg,#a78bfa,#60a5fa);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          margin-bottom:10px;
          display:inline-block;
        }
        .section-title {
          font-family:'Syne',sans-serif;
          font-weight:800;
          font-size:clamp(28px,5vw,50px);
          line-height:1.1;
          color:white;
        }

        /* ── Fade-up ── */
        .fade-up { opacity:0; transform:translateY(36px); transition:opacity 0.85s ease,transform 0.85s ease; }
        .fade-up.visible { opacity:1; transform:translateY(0); }

        /* ── Hero ghost text ── */
        .hero-ghost {
          font-family:'Syne',sans-serif;
          font-weight:800;
          font-size:clamp(80px,20vw,220px);
          line-height:1;
          color:transparent;
          -webkit-text-stroke:1px rgba(255,255,255,0.04);
          position:absolute; right:-10px; top:50%;
          transform:translateY(-50%);
          user-select:none; pointer-events:none;
          letter-spacing:-0.02em;
        }

        /* ── Gradient text ── */
        .grad-text {
          background: linear-gradient(135deg,#a78bfa 0%,#60a5fa 50%,#34d399 100%);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
        }

        /* ── Contact row ── */
        .contact-row {
          display:flex; align-items:center; gap:16px;
          padding:16px 0;
          border-bottom:1px solid rgba(255,255,255,0.07);
          text-decoration:none;
          color:white;
          transition:background 0.2s;
          border-radius:12px;
          padding-left:8px;
          margin-left:-8px;
        }
        .contact-row:hover { background:rgba(255,255,255,0.05); }
        .contact-row:last-child { border-bottom:none; }

        /* ── Link pill ── */
        .link-pill {
          display:inline-flex; align-items:center; gap:5px;
          font-size:11px; letter-spacing:0.08em;
          text-transform:uppercase;
          font-family:'DM Sans',sans-serif; font-weight:600;
          color:rgba(167,139,250,0.7);
          text-decoration:none;
          transition:color 0.2s;
          padding:6px 12px;
          border-radius:999px;
          border:1px solid rgba(167,139,250,0.25);
          background:rgba(167,139,250,0.08);
        }
        .link-pill:hover { color:#a78bfa; border-color:rgba(167,139,250,0.5); background:rgba(167,139,250,0.15); }

        /* ── Glow divider ── */
        .glow-line {
          height:1px;
          background:linear-gradient(90deg,transparent,rgba(167,139,250,0.4),transparent);
        }

        /* ── Stat card ── */
        .stat-card {
          padding:20px 28px;
          border-radius:20px;
          background:rgba(255,255,255,0.05);
          backdrop-filter:blur(16px);
          -webkit-backdrop-filter:blur(16px);
          border:1px solid rgba(255,255,255,0.1);
          text-align:center;
        }

        /* ── Float animation ── */
        @keyframes floatY {
          0%,100%{transform:translateY(0)}
          50%{transform:translateY(-10px)}
        }
        .float{animation:floatY 5s ease-in-out infinite;}
        .float2{animation:floatY 6s ease-in-out 1.5s infinite;}

        /* ── Shimmer border on hover ── */
        @keyframes borderSpin {
          0%{background-position:0% 50%}
          100%{background-position:200% 50%}
        }

        /* ── Grain ── */
        .grain::before{
          content:'';
          position:fixed;inset:0;
          pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          opacity:0.3;
          z-index:100;
        }

        /* scrollbar */
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:rgba(167,139,250,0.3);border-radius:3px}
      `}</style>

      {/* ── Grain ── */}
      <div className="grain" />

      {/* ── Background orbs ── */}
      <div className="orb" style={{width:700,height:700,background:"radial-gradient(circle,rgba(139,92,246,0.35),transparent 70%)",top:-200,left:-200,animationDuration:"20s"}} />
      <div className="orb" style={{width:600,height:600,background:"radial-gradient(circle,rgba(59,130,246,0.3),transparent 70%)",top:"30%",right:-200,animationDuration:"15s",animationDelay:"3s"}} />
      <div className="orb" style={{width:500,height:500,background:"radial-gradient(circle,rgba(16,185,129,0.2),transparent 70%)",bottom:"5%",left:"15%",animationDuration:"25s",animationDelay:"6s"}} />
      <div className="orb" style={{width:400,height:400,background:"radial-gradient(circle,rgba(236,72,153,0.2),transparent 70%)",top:"55%",right:"20%",animationDuration:"18s",animationDelay:"9s"}} />

      {/* ════════════════ NAV ════════════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-lg shadow-black/20" : ""}`} style={{borderBottom: scrolled ? "1px solid rgba(255,255,255,0.1)" : "none"}}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:22,letterSpacing:"-0.02em"}}>
            <span className="grad-text">SA</span>
            <span style={{color:"rgba(255,255,255,0.3)"}}>.</span>
          </span>

          <div className="hidden md:flex items-center gap-9">
            {NAV_LINKS.map((l) => (
              <span key={l} onClick={() => scrollTo(l)} className={`nav-link ${activeSection===l?"active":""}`}>{l}</span>
            ))}
          </div>

          <button className="btn-glass hidden md:block text-xs px-5 py-2.5" onClick={() => scrollTo("Contact")}>
            Hire Me ✦
          </button>

          {/* hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 flex flex-col gap-1.5">
            <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen?"rotate-45 translate-y-2":""}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen?"opacity-0":""}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen?"-rotate-45 -translate-y-2":""}`} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden glass border-t border-white/10 px-6 py-6 flex flex-col gap-5">
            {NAV_LINKS.map((l) => (
              <span key={l} onClick={() => scrollTo(l)} className="nav-link text-white text-base">{l}</span>
            ))}
          </div>
        )}
      </nav>

      {/* ════════════════ HERO ════════════════ */}
      <section id="about" ref={heroRef} className="min-h-screen flex items-center px-6 pt-28 max-w-6xl mx-auto relative">
        <div className="hero-ghost">DEV</div>

        <div className={`fade-up ${visible?"visible":""} relative z-10`} style={{transitionDelay:"0.1s"}}>

          {/* badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,letterSpacing:"0.1em",color:"rgba(255,255,255,0.7)"}}>AVAILABLE FOR OPPORTUNITIES</span>
          </div>

          <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(44px,9vw,96px)",lineHeight:1.05,marginBottom:20}}>
            Salim<br />
            <span className="grad-text">Aldeadla</span>
            <span style={{color:"rgba(255,255,255,0.2)"}}>.</span>
          </h1>

          <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:600,fontSize:"clamp(18px,3.5vw,36px)",color:"rgba(255,255,255,0.35)",marginBottom:24}}>
            Junior Full-Stack Developer
          </h2>

          <p style={{fontFamily:"'DM Sans',sans-serif",color:"rgba(255,255,255,0.55)",maxWidth:520,fontSize:17,lineHeight:1.75,marginBottom:40}}>
            I build scalable web applications using React, Node.js and TypeScript —
            with a focus on clean architecture and real-world impact.
          </p>

          <div className="flex gap-4 flex-wrap mb-16">
            <button className="btn-glass" onClick={() => scrollTo("Projects")}>View Projects →</button>
            <button className="btn-outline-glass" onClick={() => scrollTo("Contact")}>Contact Me</button>
          </div>

          {/* stats */}
          <div className="flex gap-4 flex-wrap">
            {[{n:"200+",label:"Training Hours"},{n:"2+",label:"Projects Shipped"},{n:"25+",label:"Technologies"}].map((s)=>(
              <div key={s.label} className="stat-card">
                <p style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:28}} className="grad-text">{s.n}</p>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"rgba(255,255,255,0.4)",marginTop:4,letterSpacing:"0.06em"}}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ ABOUT ════════════════ */}
      <section id="stack" className="py-32 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label">Who I am</p>
            <h2 className="section-title mb-4">Building things<br /><span style={{color:"rgba(255,255,255,0.3)"}}>that matter.</span></h2>
          </div>
          <div className="glass-card p-8 space-y-5">
            <p style={{fontFamily:"'DM Sans',sans-serif",color:"rgba(255,255,255,0.65)",fontSize:16,lineHeight:1.8}}>
              Junior Full-Stack Developer with hands-on experience in React, Node.js, and
              PostgreSQL. Passionate about building real-world applications and continuously
              growing my skills.
            </p>
            <p style={{fontFamily:"'DM Sans',sans-serif",color:"rgba(255,255,255,0.4)",lineHeight:1.8,fontSize:15}}>
              I've worked through complete project lifecycles — from architecture planning
              and feature implementation through deployment and production debugging. I care
              about clean code, solid structure, and systems that scale.
            </p>
            <div className="glow-line" />
            <div className="flex gap-2 flex-wrap">
              {["Clean Code","REST APIs","Agile","Problem Solving"].map((t)=>(
                <span key={t} className="tag-glass">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ TECH STACK ════════════════ */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="section-label block text-center mb-2">What I work with</p>
          <h2 className="section-title text-center mb-10">Tech Stack</h2>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {TECH_CATEGORIES.map((cat, i) => (
              <button
                key={cat.label}
                onClick={() => setActiveTab(i)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  padding: "8px 20px",
                  borderRadius: 999,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  border: activeTab === i
                    ? "1px solid rgba(167,139,250,0.7)"
                    : "1px solid rgba(255,255,255,0.1)",
                  background: activeTab === i
                    ? "linear-gradient(135deg,rgba(167,139,250,0.3),rgba(96,165,250,0.3))"
                    : "rgba(255,255,255,0.04)",
                  color: activeTab === i ? "white" : "rgba(255,255,255,0.45)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>

          {/* Skills grid — animated on tab switch */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {TECH_CATEGORIES[activeTab].items.map((t, i) => (
              <div
                key={t.name}
                className="tech-glass"
                style={{ animationDelay: `${i * 0.05}s`, opacity: 1 }}
                onMouseEnter={() => setHoveredTech(t.name)}
                onMouseLeave={() => setHoveredTech(null)}
              >
                <span style={{ fontSize: 22 }}>{t.icon}</span>
                <span style={{ color: hoveredTech === t.name ? t.color : "rgba(255,255,255,0.75)", transition: "color 0.2s" }}>
                  {t.name}
                </span>
                {/* glow dot on hover */}
                {hoveredTech === t.name && (
                  <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: t.color, boxShadow: `0 0 8px ${t.color}`, flexShrink: 0 }} />
                )}
              </div>
            ))}
          </div>

          {/* total count badge */}
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.2)", fontSize: 12, textAlign: "center", marginTop: 28, letterSpacing: "0.08em" }}>
            {TECH_CATEGORIES.reduce((s, c) => s + c.items.length, 0)} technologies across {TECH_CATEGORIES.length} categories
          </p>
        </div>
      </section>

      {/* ════════════════ PROJECTS ════════════════ */}
      <section id="training" className="py-24 px-6 max-w-6xl mx-auto">
        <p className="section-label">What I've built</p>
        <h2 className="section-title mb-14">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p)=>(
            <div key={p.title} className="glass-card p-8">
              {/* gradient accent top bar */}
              <div className={`h-0.5 w-20 bg-gradient-to-r ${p.gradient} rounded-full mb-8`} />

              {/* ghost number */}
              <span style={{fontFamily:"'Syne',sans-serif",fontSize:68,fontWeight:800,color:"transparent",WebkitTextStroke:"1px rgba(255,255,255,0.05)",position:"absolute" as const,top:18,right:24,lineHeight:1,userSelect:"none" as const,pointerEvents:"none" as const}}>{p.number}</span>

              <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:22,marginBottom:10,color:"white"}}>{p.title}</h3>
              <p style={{fontFamily:"'DM Sans',sans-serif",color:"rgba(255,255,255,0.5)",lineHeight:1.75,fontSize:14,marginBottom:20}}>{p.desc}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {p.tags.map((tag)=><span key={tag} className="tag-glass">{tag}</span>)}
              </div>

              <div className="flex gap-3">
                <a href={p.github} className="link-pill">↗ GitHub</a>
                <a href={p.live}   className="link-pill">↗ Live Demo</a>
              </div>
            </div>
          ))}

          {/* coming soon card */}
          <div className="glass-card p-8 flex flex-col items-center justify-center min-h-[220px] cursor-pointer group"
            style={{borderStyle:"dashed",borderColor:"rgba(167,139,250,0.2)"}}>
            <span className="text-5xl mb-4 group-hover:scale-110 transition-transform" style={{filter:"drop-shadow(0 0 12px rgba(167,139,250,0.6))"}}>+</span>
            <p style={{fontFamily:"'DM Sans',sans-serif",color:"rgba(255,255,255,0.25)",fontSize:13}}>More projects coming soon</p>
          </div>
        </div>
      </section>

      {/* ════════════════ TRAINING ════════════════ */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <p className="section-label">My background</p>
              <h2 className="section-title mb-8">Training &<br />Education</h2>
              <div className="glass-card p-8">
                <div className={`h-0.5 w-14 bg-gradient-to-r from-violet-500 to-blue-400 rounded-full mb-6`} />
                <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:19,marginBottom:8,color:"white"}}>Full-Stack Web Development</h3>
                <span className="tag-glass" style={{display:"inline-block",marginBottom:14}}>200+ Hours · Practicum</span>
                <p style={{fontFamily:"'DM Sans',sans-serif",color:"rgba(255,255,255,0.5)",fontSize:14,lineHeight:1.8,marginTop:8}}>
                  Completed intensive full-stack training building real-world applications,
                  covering modern technologies, software architecture, and deployment workflows.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {icon:"🏗️",title:"Architecture",   desc:"Vertical slice feature-based project structure"},
                {icon:"🔐",title:"Security",        desc:"JWT auth, 2FA, rate limiting, Joi validation"},
                {icon:"🚀",title:"Deployment",      desc:"Render, MongoDB Atlas, Cloudinary"},
                {icon:"🧪",title:"Best Practices",  desc:"Clean code, Git workflow, ES Modules"},
              ].map((item,i)=>(
                <div key={item.title} className="glass-card flex gap-4 items-start p-5"
                  style={{animationDelay:`${i*0.1}s`}}>
                  <span className="text-2xl float2" style={{animationDelay:`${i*0.4}s`}}>{item.icon}</span>
                  <div>
                    <p style={{fontFamily:"'Syne',sans-serif",fontWeight:600,fontSize:14,color:"white"}}>{item.title}</p>
                    <p style={{fontFamily:"'DM Sans',sans-serif",color:"rgba(255,255,255,0.4)",fontSize:13,marginTop:4}}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ CONTACT ════════════════ */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="section-label block text-center mb-2">Let's work together</p>
          <h2 className="section-title text-center mb-3">Get In Touch</h2>
          <p style={{fontFamily:"'DM Sans',sans-serif",color:"rgba(255,255,255,0.4)",textAlign:"center",marginBottom:48,maxWidth:420,margin:"0 auto 48px"}}>
            Open to junior roles, freelance projects, and collaborations.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* links */}
            <div className="glass-card p-8">
              <p className="section-label mb-4">Reach me at</p>
              {CONTACT_LINKS.map((c)=>(
                <a key={c.label} href={c.href} className="contact-row">
                  <div style={{width:42,height:42,borderRadius:14,background:"rgba(167,139,250,0.15)",border:"1px solid rgba(167,139,250,0.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>
                    {c.icon}
                  </div>
                  <div>
                    <p style={{fontFamily:"'DM Sans',sans-serif",color:"rgba(255,255,255,0.3)",fontSize:10,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:3}}>{c.label}</p>
                    <p style={{fontFamily:"'DM Sans',sans-serif",color:"rgba(255,255,255,0.8)",fontSize:13}}>{c.value}</p>
                  </div>
                  <span style={{marginLeft:"auto",color:"rgba(167,139,250,0.5)",fontSize:18}}>→</span>
                </a>
              ))}
            </div>

            {/* form */}
            <div className="glass-card p-8">
              <p className="section-label mb-1">Send a message</p>
              <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:20,color:"white"}}>Drop me a line</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ FOOTER ════════════════ */}
      <footer className="glass border-t-0" style={{borderTop:"1px solid rgba(255,255,255,0.08)",padding:"28px 24px"}}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:18}} className="grad-text">SA.</span>
          <p style={{fontFamily:"'DM Sans',sans-serif",color:"rgba(255,255,255,0.2)",fontSize:12}}>
            © 2026 Salim Aldeadla · Built with React & TypeScript
          </p>
        </div>
      </footer>
    </div>
  );
}
