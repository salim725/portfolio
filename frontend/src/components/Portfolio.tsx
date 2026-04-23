import { useState, useEffect, useRef } from "react";
import ContactForm from "./ContactForm";
import type { TechItem, Project, ContactField } from "../types";

const NAV_LINKS = ["About", "Stack", "Projects", "Training", "Contact"];

const TECH_STACK: TechItem[] = [
  { name: "React", icon: "⚛️", color: "#61DAFB" },
  { name: "Node.js", icon: "🟢", color: "#68A063" },
  { name: "PostgreSQL", icon: "🐘", color: "#336791" },
  { name: "TypeScript", icon: "🔷", color: "#3178C6" },
  { name: "Express", icon: "⚡", color: "#888" },
  { name: "MongoDB", icon: "🍃", color: "#47A248" },
  { name: "Git", icon: "🌿", color: "#F05032" },
  { name: "REST APIs", icon: "🔗", color: "#FF6B6B" },
];

const PROJECTS: Project[] = [
  {
    title: "E-Commerce Platform",
    desc: "Full-stack app with JWT authentication, product management, cart system, and admin dashboard. Deployed on Render with MongoDB Atlas.",
    tags: ["React", "Node.js", "MongoDB", "JWT"],
    github: "#",
    live: "#",
    gradient: "from-violet-500 to-indigo-600",
    number: "01",
  },
  {
    title: "Auth Microservice",
    desc: "Secure authentication service with email verification, 2FA for admins, rate limiting, and Joi validation schemas.",
    tags: ["Express", "JWT", "Nodemailer", "MongoDB"],
    github: "#",
    live: "#",
    gradient: "from-emerald-400 to-teal-600",
    number: "02",
  },
];

const CONTACT_LINKS: ContactField[] = [
  { icon: "✉️", label: "Email", value: "dscode999@gmail.com", href: "mailto:dscode999@gmail.com" },
  { icon: "🐙", label: "GitHub", value: "github.com/salim725", href: "https://github.com/salim725" },
  { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/salim-aldeadla", href: "https://www.linkedin.com/in/salim-aldeadla" },
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const match = NAV_LINKS.find((l) => l.toLowerCase() === id);
            if (match) setActiveSection(match);
          }
        });
      },
      { threshold: 0.4 }
    );

    NAV_LINKS.forEach((l) => {
      const el = document.getElementById(l.toLowerCase());
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div
      style={{ fontFamily: "'DM Sans', 'Syne', sans-serif" }}
      className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden"
    >
      <style>{`
        .grain::after {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.35;
          z-index: 50;
        }

        .glow-orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(120px);
          pointer-events: none;
        }

        .fade-up {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 48px rgba(124,58,237,0.2);
        }

        .tag {
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 3px 10px;
          border-radius: 999px;
          color: rgba(255,255,255,0.55);
          font-family: 'DM Sans', sans-serif;
        }

        .nav-link {
          position: relative;
          color: rgba(255,255,255,0.5);
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: color 0.2s;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
        }
        .nav-link:hover, .nav-link.active { color: white; }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0; right: 0;
          height: 1px;
          background: white;
          transform: scaleX(0);
          transition: transform 0.2s;
        }
        .nav-link.active::after, .nav-link:hover::after { transform: scaleX(1); }

        .hero-number {
          font-family: 'Syne', sans-serif;
          font-size: clamp(80px, 18vw, 200px);
          font-weight: 800;
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.06);
          position: absolute;
          right: -20px;
          top: 50%;
          transform: translateY(-50%);
          user-select: none;
          pointer-events: none;
        }

        .btn-primary {
          background: white;
          color: #0a0a0f;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.05em;
          padding: 12px 28px;
          border-radius: 999px;
          cursor: pointer;
          border: none;
          transition: all 0.25s;
        }
        .btn-primary:hover {
          background: #d4d4d4;
          transform: scale(1.02);
        }

        .btn-outline {
          background: transparent;
          color: white;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.05em;
          padding: 11px 28px;
          border-radius: 999px;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.2);
          transition: all 0.25s;
        }
        .btn-outline:hover {
          border-color: rgba(255,255,255,0.6);
          background: rgba(255,255,255,0.05);
        }

        .section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 12px;
        }

        .section-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(28px, 5vw, 48px);
          line-height: 1.1;
        }

        .tech-pill {
          position: relative;
          padding: 14px 20px;
          border-radius: 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          cursor: default;
          transition: all 0.25s;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
        }
        .tech-pill:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.18);
          transform: translateY(-2px);
        }

        .project-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 32px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s;
        }
        .project-card:hover {
          border-color: rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.05);
        }

        .project-number {
          font-family: 'Syne', sans-serif;
          font-size: 72px;
          font-weight: 800;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.06);
          position: absolute;
          top: 16px;
          right: 24px;
          line-height: 1;
          user-select: none;
        }

        .link-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          color: rgba(255,255,255,0.5);
          transition: color 0.2s;
          text-decoration: none;
        }
        .link-pill:hover { color: white; }

        .divider {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.06);
        }

        .contact-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: opacity 0.2s;
        }
        .contact-row:hover { opacity: 0.75; }
        .contact-row:last-child { border-bottom: none; }

        .contact-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .float { animation: float 6s ease-in-out infinite; }
        .float-delay { animation: float 6s ease-in-out 2s infinite; }
      `}</style>

      {/* Grain overlay */}
      <div className="grain" />

      {/* Background orbs */}
      <div className="glow-orb w-[600px] h-[600px] bg-violet-700 opacity-20" style={{ top: "-200px", left: "-200px" }} />
      <div className="glow-orb w-[400px] h-[400px] bg-indigo-600 opacity-15" style={{ top: "30%", right: "-150px" }} />
      <div className="glow-orb w-[500px] h-[500px] bg-violet-900 opacity-10" style={{ bottom: "10%", left: "10%" }} />

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/5" : ""}`}>
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="font-bold text-lg tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            SA<span className="text-violet-400">.</span>
          </span>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <span key={l} onClick={() => scrollTo(l)} className={`nav-link ${activeSection === l ? "active" : ""}`}>
                {l}
              </span>
            ))}
          </div>
          <button className="btn-primary hidden md:block text-xs px-5 py-2" onClick={() => scrollTo("Contact")}>
            Hire Me
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 p-2">
            <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#0d0d14] border-t border-white/5 px-6 py-6 flex flex-col gap-5">
            {NAV_LINKS.map((l) => (
              <span key={l} onClick={() => scrollTo(l)} className="nav-link text-white text-base">{l}</span>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="about" ref={heroRef} className="min-h-screen flex items-center px-6 pt-24 max-w-6xl mx-auto relative">
        <div className="hero-number">DEV</div>
        <div className={`fade-up ${visible ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
          <p className="section-label mb-6">Available for opportunities</p>
          <h1 className="font-extrabold leading-none mb-6" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(44px, 9vw, 100px)" }}>
            Salim Aldeadla<span className="text-violet-400">.</span>
          </h1>
          <h2 className="font-bold text-white/40 mb-8" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(20px, 4vw, 42px)" }}>
            Junior Full-Stack Developer
          </h2>
          <p className="text-white/55 max-w-lg text-lg leading-relaxed mb-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            I build scalable web applications using React, Node.js, and modern
            technologies — with a focus on clean architecture and real-world impact.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button className="btn-primary" onClick={() => scrollTo("Projects")}>View Projects →</button>
            <button className="btn-outline" onClick={() => scrollTo("Contact")}>Contact Me</button>
          </div>
          <div className="flex gap-10 mt-16 flex-wrap">
            {[{ n: "200+", label: "Training Hours" }, { n: "2+", label: "Projects Shipped" }, { n: "8+", label: "Technologies" }].map((s) => (
              <div key={s.label}>
                <p className="font-bold text-3xl" style={{ fontFamily: "'Syne', sans-serif" }}>{s.n}</p>
                <p className="text-white/40 text-sm mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT DETAIL */}
      <section id="stack" className="py-32 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label">Who I am</p>
            <h2 className="section-title mb-8">Building things<br /><span className="text-white/35">that matter.</span></h2>
          </div>
          <div className="space-y-6">
            <p className="text-white/60 text-lg leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Junior Full-Stack Developer with hands-on experience in React, Node.js,
              and PostgreSQL. Passionate about building real-world applications and
              continuously growing my skills.
            </p>
            <p className="text-white/45 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              I've worked through complete project lifecycles — from architecture
              planning and feature implementation through deployment and production
              debugging. I care about clean code, solid structure, and systems that scale.
            </p>
            <div className="divider" />
            <div className="flex gap-6 flex-wrap">
              {["Clean Code", "REST APIs", "Agile", "Problem Solving"].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="section-label text-center">What I work with</p>
          <h2 className="section-title text-center mb-16">Tech Stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {TECH_STACK.map((t) => (
              <div
                key={t.name}
                className="tech-pill"
                onMouseEnter={() => setHoveredTech(t.name)}
                onMouseLeave={() => setHoveredTech(null)}
              >
                <span style={{ fontSize: "20px" }}>{t.icon}</span>
                <span style={{ color: hoveredTech === t.name ? t.color : "rgba(255,255,255,0.75)" }}>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="training" className="py-24 px-6 max-w-6xl mx-auto">
        <p className="section-label">What I've built</p>
        <h2 className="section-title mb-16">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p) => (
            <div key={p.title} className="project-card card-hover">
              <div className="project-number">{p.number}</div>
              <div className={`h-0.5 w-16 bg-gradient-to-r ${p.gradient} rounded-full mb-8`} />
              <h3 className="font-bold text-2xl mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>{p.title}</h3>
              <p className="text-white/50 leading-relaxed mb-6 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {p.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
              </div>
              <div className="flex gap-6">
                <a href={p.github} className="link-pill"><span>↗</span> GitHub</a>
                <a href={p.live} className="link-pill"><span>↗</span> Live Demo</a>
              </div>
            </div>
          ))}
          <div
            className="project-card flex flex-col items-center justify-center text-center min-h-[200px] cursor-pointer group"
            style={{ borderStyle: "dashed", borderColor: "rgba(255,255,255,0.08)" }}
          >
            <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">+</span>
            <p className="text-white/30 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>More projects coming soon</p>
          </div>
        </div>
      </section>

      {/* TRAINING */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label">My background</p>
              <h2 className="section-title mb-8">Training &<br />Education</h2>
              <div className="project-card">
                <div className="h-0.5 w-12 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full mb-6" />
                <h3 className="font-bold text-xl mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>Full-Stack Web Development</h3>
                <p className="tag mb-4">200+ Hours · Practicum</p>
                <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Completed intensive full-stack training building real-world applications,
                  covering modern technologies, software architecture, and deployment workflows.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { icon: "🏗️", title: "Architecture", desc: "Vertical slice feature-based project structure" },
                { icon: "🔐", title: "Security", desc: "JWT auth, 2FA, rate limiting, validation" },
                { icon: "🚀", title: "Deployment", desc: "Render, MongoDB Atlas, Cloudinary" },
                { icon: "🧪", title: "Best Practices", desc: "Clean code, Git workflow, ES Modules" },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start p-4 rounded-2xl hover:bg-white/[0.03] transition-colors">
                  <span className="text-2xl float">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>{item.title}</p>
                    <p className="text-white/40 text-sm mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="section-label text-center">Let's work together</p>
          <h2 className="section-title text-center mb-4">Get In Touch</h2>
          <p className="text-center text-white/40 mb-12 max-w-md mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Open to junior roles, freelance projects, and collaborations.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="project-card">
              {CONTACT_LINKS.map((c) => (
                <a key={c.label} href={c.href} className="contact-row no-underline text-white">
                  <div className="contact-icon">{c.icon}</div>
                  <div>
                    <p className="text-white/35 text-xs uppercase tracking-widest mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{c.label}</p>
                    <p className="text-white/80 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>{c.value}</p>
                  </div>
                  <span className="ml-auto text-white/25">→</span>
                </a>
              ))}
            </div>
            <div className="project-card">
              <p className="section-label">Send a message</p>
              <h3 className="font-bold text-xl" style={{ fontFamily: "'Syne', sans-serif" }}>Drop me a line</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>SA<span className="text-violet-400">.</span></span>
          <p className="text-white/25 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>© 2026 · Built with React & TypeScript</p>
        </div>
      </footer>
    </div>
  );
}
