import { useEffect, useRef, useState } from "react";

// ─── Portfolio data ────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: 1,
    flagship: true,
    title: "ReLoop — Intelligent Recommerce Marketplace",
    problem: "A modern pre-loved marketplace focused on discovery, trust, and a smoother buying and selling experience.",
    stack: ["React", "TypeScript", "Zustand", "Node.js", "Express", "MongoDB"],
    cover: "reloop",
    coverAlt: "ReLoop marketplace project preview",
    github: "https://github.com/shreeyabhimani02",
    details: {
      problemLong: "Traditional marketplace experiences can feel cluttered and difficult to navigate. ReLoop explores a cleaner recommerce experience where users can discover products, manage wishlists, and maintain their profile from one consistent interface.",
      approach: "Built a responsive React frontend with React Router and Zustand, connected to a Node.js and Express backend with MongoDB Atlas. Implemented authentication, protected routes, product browsing and details, search, categories, wishlist persistence, profile editing, REST API integration, and separate Vercel/Render deployments.",
      tradeoffs: "Focused first on a reliable product experience and predictable client-server data flow instead of adding AI features too early. This keeps authentication, navigation, and core marketplace interactions stable.",
      improve: "Add stronger accessibility coverage, richer seller workflows, recommendation features, semantic product search, and performance monitoring as the marketplace grows.",
    },
  },
  {
    id: 2,
    flagship: false,
    title: "UpSkillr — Full-Stack Learning Platform",
    problem: "A learning platform designed around structured content, authentication, role-based access, and a connected user experience.",
    stack: ["React", "JavaScript", "Node.js", "Express", "MongoDB", "JWT"],
    cover: "upskillr",
    coverAlt: "UpSkillr learning platform project preview",
    github: "https://github.com/shreeyabhimani02",
    details: {
      problemLong: "Learning platforms need more than static pages: users need secure accounts, meaningful roles, organized course workflows, and a frontend that communicates clearly with backend services.",
      approach: "Built a MERN application with a React frontend, JWT authentication, role-based access, REST APIs, database-backed learning workflows, certificates, and email-related functionality. The project connects reusable UI with backend services and persistent data.",
      tradeoffs: "Kept the architecture API-driven instead of coupling UI components directly to database logic. This adds setup overhead but makes features easier to extend and test independently.",
      improve: "Add richer progress dashboards, accessibility improvements, performance optimizations, personalized course discovery, and stronger frontend testing coverage.",
    },
  },
  {
    id: 3,
    flagship: false,
    title: "Todsy — Task Management Web App",
    problem: "A practical task manager that makes everyday planning easier through structured tasks, filters, priorities, and progress tracking.",
    stack: ["React", "JavaScript", "Node.js", "Express", "MongoDB"],
    cover: "todsy",
    coverAlt: "Todsy task management project preview",
    github: "https://github.com/shreeyabhimani02",
    details: {
      problemLong: "Simple task lists become difficult to manage when users need priorities, due dates, categories, search, and progress without losing a fast and focused interface.",
      approach: "Built a React task-management interface with authentication, CRUD operations, search, filtering, sorting, priorities, due dates, categories, progress tracking, theme controls, and MongoDB Atlas persistence. Connected the frontend to an Express API for server-backed task data.",
      tradeoffs: "Prioritized a lightweight interface and straightforward state flow over adding unnecessary UI complexity. This keeps the core task workflow quick while leaving room for richer collaboration features.",
      improve: "Add drag-and-drop task organization, calendar views, optimistic updates, reusable form validation, automated frontend tests, and collaborative task sharing.",
    },
  },
  {
    id: 4,
    flagship: false,
    title: "FraudShield — Fraud Monitoring Dashboard",
    problem: "A machine-learning workflow that identifies suspicious transactions and presents results through an interactive dashboard.",
    stack: ["Python", "Random Forest", "Streamlit", "Data Analysis"],
    cover: "fraudshield",
    coverAlt: "Fraud detection machine learning project preview",
    github: "https://github.com/shreeyabhimani02",
    details: {
      problemLong: "Transaction datasets can contain patterns that are difficult to identify consistently with manual rules. The project explores supervised learning for flagging potentially fraudulent activity.",
      approach: "Built a Random Forest classification workflow with preprocessing, model evaluation, and a Streamlit dashboard for interacting with predictions and monitoring results. The project reached approximately 98% accuracy on the evaluated dataset.",
      tradeoffs: "Accuracy alone is not enough for fraud detection because class imbalance and false positives matter. A production workflow would need stronger precision/recall analysis and threshold tuning.",
      improve: "Add calibrated probabilities, imbalance-aware evaluation, explainable predictions, drift monitoring, and a more complete alert workflow.",
    },
  },
  {
    id: 5,
    flagship: false,
    title: "ATS Resume Matcher — NLP Web App",
    problem: "A lightweight web application that compares a resume with a job description and surfaces textual alignment.",
    stack: ["Python", "Flask", "TF-IDF", "spaCy", "NLP"],
    cover: "ats",
    coverAlt: "NLP resume matching project preview",
    github: "https://github.com/shreeyabhimani02",
    details: {
      problemLong: "Applicants often need a quick way to understand whether their resume communicates the same skills and terminology as a target job description.",
      approach: "Processed resume and job-description text with spaCy, generated TF-IDF representations, and used cosine similarity to estimate textual alignment. Flask provides the web application layer.",
      tradeoffs: "TF-IDF is transparent and lightweight, but it does not fully capture semantic similarity. It provides a useful baseline before more advanced language representations.",
      improve: "Add section-aware scoring, skill extraction, embeddings, missing-skill explanations, and more detailed role-specific feedback.",
    },
  },
];

const SKILLS = [
  "React", "TypeScript", "JavaScript", "HTML", "CSS", "React Router", "Zustand",
  "Responsive UI", "Node.js", "Express.js", "REST APIs", "JWT", "MongoDB", "Git",
  "GitHub", "Vercel", "Render", "Python", "Scikit-learn", "Machine Learning", "NLP", "Flask",
];

const TYPING_PHRASES = [
  "Building React interfaces.",
  "Connecting products to real APIs.",
  "Shipping full-stack web applications.",
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useTypingEffect(phrases: string[], speed = 60, pause = 2000) {
  const [text, setText] = useState(phrases[0]);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(phrases[0].length);
  const [deleting, setDeleting] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const current = phrases[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx, phrases, speed, pause, ready]);

  useEffect(() => setText(phrases[phraseIdx].slice(0, charIdx)), [charIdx, phraseIdx, phrases]);
  return text;
}

function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function useHeroMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);
  return mounted;
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const C = {
  bg: "#F7F6F3",
  surface: "#FFFFFF",
  charcoal: "#1C1C1E",
  charcoal2: "#3A3A3C",
  muted: "#6C6C70",
  border: "#E5E4E0",
  coral: "#F04E37",
  coralLight: "#FFF1EF",
  coralBorder: "#FFCDC6",
};

const manrope: React.CSSProperties = { fontFamily: "'Manrope', sans-serif" };
const inter: React.CSSProperties = { fontFamily: "'Inter', sans-serif" };

function RevealSection({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.65s ${delay}ms ease, transform 0.65s ${delay}ms ease`,
    }}>
      {children}
    </div>
  );
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function NavBar({ activeSection }: { activeSection: string }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-14" style={{
      background: scrolled ? "rgba(247,246,243,0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid rgba(229,228,224,0.6)` : "none",
      transition: "background 0.3s, border-color 0.3s",
    }}>
      <button className="text-base cursor-pointer" style={{ ...manrope, fontWeight: 800, color: C.charcoal, background: "none", border: 0 }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        Shreeya Bhimani
      </button>

      <nav className="hidden md:flex items-center gap-7">
        {(["projects", "about", "contact"] as const).map((id) => (
          <button key={id} onClick={() => scrollTo(id)} className="text-sm font-medium capitalize transition-colors" style={{ ...inter, color: activeSection === id ? C.coral : C.muted, background: "none", border: 0, cursor: "pointer" }}>
            {id}
          </button>
        ))}
      </nav>

      <button onClick={() => scrollTo("contact")} className="text-sm px-4 py-2 rounded-full" style={{ ...inter, background: C.charcoal, color: C.bg, fontWeight: 600, border: 0, cursor: "pointer" }}>
        Let's connect
      </button>
    </header>
  );
}

function HeroSection() {
  const mounted = useHeroMounted();
  const typed = useTypingEffect(TYPING_PHRASES);
  const fade = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(18px)",
    transition: `opacity 0.6s ${delay}ms ease, transform 0.6s ${delay}ms ease`,
  });

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden" style={{ background: C.bg }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob-1 absolute rounded-full" style={{ width: 480, height: 480, top: -80, right: -60, background: "radial-gradient(circle, #FFCDC6 0%, transparent 70%)", opacity: 0.35 }} />
        <div className="blob-2 absolute rounded-full" style={{ width: 360, height: 360, bottom: 80, left: -80, background: "radial-gradient(circle, #F04E37 0%, transparent 70%)", opacity: 0.18 }} />
        <div className="blob-3 absolute rounded-full" style={{ width: 260, height: 260, top: "40%", right: "22%", background: "radial-gradient(circle, #FFC9A0 0%, transparent 70%)", opacity: 0.2 }} />
      </div>

      <div className="relative z-10 max-w-3xl w-full text-center">
        <div {...{ style: { ...fade(80), display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 999, marginBottom: 28, background: C.coralLight, border: `1px solid ${C.coralBorder}` } }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.coral, display: "inline-block" }} />
          <span style={{ ...inter, fontSize: 12, fontWeight: 600, color: "#C93B27" }}>Open to frontend & software internships</span>
        </div>

        <h1 style={{ ...fade(180), ...manrope, fontSize: "clamp(2.8rem, 8vw, 5rem)", fontWeight: 800, color: C.charcoal, lineHeight: 1.05, letterSpacing: "-0.04em", marginBottom: 18 }}>
          Shreeya Bhimani
        </h1>

        <p style={{ ...fade(300), ...inter, fontSize: 18, color: C.muted, marginBottom: 16, fontWeight: 500 }}>
          Information Technology Student · SAKEC · Class of 2027
        </p>

        <div style={{ ...fade(420), ...manrope, fontSize: "clamp(1.3rem, 4vw, 1.8rem)", fontWeight: 700, color: C.charcoal, marginBottom: 28, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
          <span>{typed}</span>
          <span style={{ display: "inline-block", width: 2, height: "1em", background: C.coral, borderRadius: 2, animation: "cursor-blink 0.9s step-end infinite" }} />
        </div>

        <p style={{ ...fade(480), ...inter, maxWidth: 620, margin: "0 auto 34px", color: C.muted, fontSize: 15, lineHeight: 1.75 }}>
          I build responsive React applications and full-stack products with a focus on clean interfaces, reliable API integration, authentication, and practical user experiences.
        </p>

        <div style={{ ...fade(540), display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "center" }}>
          <button className="cta-btn" style={{ ...inter, background: C.coral, color: "#fff", fontWeight: 600, fontSize: 16, padding: "14px 28px", borderRadius: 12, border: "none", cursor: "pointer" }} onClick={() => scrollTo("projects")}>
            See my work →
          </button>
          <a href="/resume.pdf" style={{ ...inter, color: C.charcoal2, fontWeight: 600, fontSize: 16, padding: "13px 28px", borderRadius: 12, border: `1.5px solid ${C.border}`, background: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
            Resume
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2" style={{ opacity: 0.4 }}>
        <span style={{ ...inter, fontSize: 11, color: C.muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>scroll</span>
        <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, ${C.muted}, transparent)` }} />
      </div>
    </section>
  );
}

function ProjectVisual({ type }: { type: string }) {
  const labels: Record<string, string> = {
    reloop: "RELOOP",
    upskillr: "UPSKILLR",
    fraudshield: "FRAUDSHIELD",
    recommendation: "RECOMMEND",
    ats: "ATS MATCHER",
  };
  const subtitles: Record<string, string> = {
    reloop: "INTELLIGENT RECOMMERCE",
    upskillr: "LEARNING PLATFORM",
    fraudshield: "FRAUD MONITORING",
    recommendation: "PERSONALIZATION",
    ats: "NLP + JOB MATCHING",
  };

  return (
    <div className={`project-visual project-${type}`} aria-label={labels[type]}>
      <div className="project-grid" />
      <div className="project-window">
        <div className="window-dots"><i /><i /><i /></div>
        <span className="window-label">{labels[type]}</span>
        <strong>{subtitles[type]}</strong>
        <div className="window-lines"><span /><span /><span /></div>
      </div>
    </div>
  );
}

function ProjectCard({ project, flagship, onClick }: { project: typeof PROJECTS[0]; flagship?: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className={`text-left rounded-2xl overflow-hidden flex flex-col cursor-pointer w-full ${flagship ? "md:col-span-2" : ""}`} style={{ background: C.surface, border: `1px solid ${C.border}`, boxShadow: hovered ? "0 20px 48px rgba(28,28,30,0.12)" : "0 2px 12px rgba(28,28,30,0.06)", transform: hovered ? "translateY(-4px)" : "translateY(0)", transition: "transform 0.25s ease, box-shadow 0.25s ease", padding: 0 }}>
      <div className={`relative overflow-hidden ${flagship ? "h-56 md:h-72" : "h-44"}`}>
        <ProjectVisual type={project.cover} />
        {flagship && <span style={{ position: "absolute", top: 12, left: 12, ...inter, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 999, background: "rgba(240,78,55,0.92)", color: "#fff" }}>Featured</span>}
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <h3 style={{ ...manrope, fontWeight: 700, fontSize: 17, color: C.charcoal, marginBottom: 4, lineHeight: 1.3 }}>{project.title}</h3>
          <p style={{ ...inter, fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{project.problem}</p>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.stack.map((tag) => <span key={tag} style={{ ...inter, fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 999, background: C.bg, color: C.charcoal2, border: `1px solid ${C.border}` }}>{tag}</span>)}
        </div>
        <span style={{ ...inter, fontSize: 13, fontWeight: 600, color: C.coral }}>View case study →</span>
      </div>
    </button>
  );
}

function CaseStudyModal({ project, onClose }: { project: typeof PROJECTS[0]; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6" style={{ background: "rgba(28,28,30,0.6)", backdropFilter: "blur(4px)" }} onClick={onClose}>
      <div className="relative w-full md:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl md:rounded-2xl" style={{ background: C.surface }} onClick={(e) => e.stopPropagation()}>
        <div className="relative h-52 overflow-hidden rounded-t-3xl md:rounded-t-2xl"><ProjectVisual type={project.cover} /><button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: "rgba(255,255,255,0.9)", color: C.charcoal, border: "none", cursor: "pointer" }}>✕</button></div>
        <div className="p-6 md:p-8 flex flex-col gap-6">
          <div>
            <div className="flex flex-wrap gap-1.5 mb-3">{project.stack.map((tag) => <span key={tag} style={{ ...inter, fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 999, background: C.bg, color: C.charcoal2, border: `1px solid ${C.border}` }}>{tag}</span>)}</div>
            <h2 style={{ ...manrope, fontWeight: 800, fontSize: 22, color: C.charcoal }}>{project.title}</h2>
          </div>
          {[['Problem', project.details.problemLong], ['Approach', project.details.approach], ['Tradeoffs', project.details.tradeoffs], ["What I'd improve", project.details.improve]].map(([label, body]) => (
            <div key={label}><h4 style={{ ...inter, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: C.coral, marginBottom: 8 }}>{label}</h4><p style={{ ...inter, fontSize: 14, color: C.charcoal2, lineHeight: 1.7 }}>{body}</p></div>
          ))}
          <a href={project.github} target="_blank" rel="noreferrer" style={{ ...inter, display: "inline-flex", alignItems: "center", justifyContent: "center", width: "fit-content", padding: "11px 16px", borderRadius: 10, background: C.charcoal, color: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 600 }}>View GitHub profile →</a>
        </div>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const [selected, setSelected] = useState<typeof PROJECTS[0] | null>(null);
  const flagship = PROJECTS.find((p) => p.flagship)!;
  const rest = PROJECTS.filter((p) => !p.flagship);
  return (
    <section id="projects" className="py-20 md:py-28 px-6" style={{ background: C.bg }}>
      <div className="max-w-4xl mx-auto">
        <RevealSection className="mb-12">
          <p style={{ ...inter, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: C.coral, marginBottom: 8 }}>Selected work</p>
          <h2 style={{ ...manrope, fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: C.charcoal, letterSpacing: "-0.025em", marginBottom: 14 }}>Projects that show how I build.</h2>
          <p style={{ ...inter, fontSize: 15, color: C.muted, maxWidth: 620, lineHeight: 1.7 }}>Frontend-first projects built with React, JavaScript, and TypeScript, backed by APIs, authentication, databases, and deployment. ML and NLP projects add breadth to my technical toolkit.</p>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <RevealSection className="md:col-span-2"><ProjectCard project={flagship} flagship onClick={() => setSelected(flagship)} /></RevealSection>
          {rest.map((p, i) => <RevealSection key={p.id} delay={i * 80}><ProjectCard project={p} onClick={() => setSelected(p)} /></RevealSection>)}
        </div>
      </div>
      {selected && <CaseStudyModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 px-6" style={{ background: C.surface }}>
      <div className="max-w-4xl mx-auto">
        <RevealSection className="mb-12">
          <p style={{ ...inter, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: C.coral, marginBottom: 8 }}>About</p>
          <h2 style={{ ...manrope, fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: C.charcoal, letterSpacing: "-0.025em" }}>Information Technology student who likes building.</h2>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16 items-start">
          <RevealSection className="md:col-span-2 flex flex-col gap-4">
            <div className="w-full h-72 rounded-2xl overflow-hidden flex-shrink-0 relative" style={{ border: `1px solid ${C.border}`, background: "linear-gradient(145deg, #1C1C1E, #F04E37)" }}>
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
              <div className="absolute bottom-6 left-6 right-6"><span style={{ ...inter, fontSize: 11, letterSpacing: "0.14em", color: "rgba(255,255,255,.7)", textTransform: "uppercase" }}>Shreeya Bhimani</span><div style={{ ...manrope, color: "#fff", fontWeight: 800, fontSize: 28, marginTop: 4 }}>Build · Learn · Iterate</div></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl" style={{ background: C.bg, border: `1px solid ${C.border}` }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "#16A34A", flexShrink: 0 }} /><div><p style={{ ...inter, fontSize: 12, fontWeight: 600, color: C.charcoal }}>Currently building</p><p style={{ ...inter, fontSize: 12, color: C.muted }}>ReLoop · web applications · portfolio projects</p></div></div>
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl" style={{ background: C.bg, border: `1px solid ${C.border}` }}><span style={{ fontSize: 15 }}>✦</span><div><p style={{ ...inter, fontSize: 12, fontWeight: 600, color: C.charcoal }}>Currently learning</p><p style={{ ...inter, fontSize: 12, color: C.muted }}>React · TypeScript · full-stack web development</p></div></div>
            </div>
          </RevealSection>

          <RevealSection delay={120} className="md:col-span-3 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p style={{ ...inter, fontSize: 17, color: C.charcoal, lineHeight: 1.7 }}>I'm an Information Technology student at Shah & Anchor Kutchhi Engineering College, focused on frontend and software engineering through hands-on product development.</p>
              <p style={{ ...inter, fontSize: 15, color: C.muted, lineHeight: 1.7 }}>I enjoy turning an idea into a working product—from designing React interfaces and reusable UI flows to integrating REST APIs, authentication, databases, and deployment.</p>
              <p style={{ ...inter, fontSize: 15, color: C.muted, lineHeight: 1.7 }}>My strongest interests are frontend engineering, full-stack development, responsive UI, and product-focused software. I also enjoy machine learning and NLP, which give me an additional perspective when building data-driven features.</p>
            </div>
            <div>
              <p style={{ ...inter, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: C.muted, marginBottom: 12 }}>Technical toolkit</p>
              <div className="flex flex-wrap gap-2">{SKILLS.map((s) => <span key={s} style={{ ...inter, fontSize: 13, fontWeight: 500, padding: "6px 14px", borderRadius: 999, background: C.bg, color: C.charcoal2, border: `1px solid ${C.border}` }}>{s}</span>)}</div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-28 px-6" style={{ background: C.bg }}>
      <div className="max-w-4xl mx-auto">
        <RevealSection>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div>
              <p style={{ ...inter, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: C.coral, marginBottom: 8 }}>Contact</p>
              <h2 style={{ ...manrope, fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: C.charcoal, letterSpacing: "-0.025em", marginBottom: 16 }}>Let's build something.</h2>
              <p style={{ ...inter, fontSize: 15, color: C.muted, maxWidth: 480, lineHeight: 1.7 }}>I'm looking for frontend and software engineering internship opportunities where I can build user-facing products, work with experienced engineers, and keep improving through real product problems.</p>
              <div className="flex flex-wrap gap-3 mt-6">
                <a href="https://github.com/shreeyabhimani02" target="_blank" rel="noreferrer" className="cta-btn inline-block" style={{ ...inter, background: C.coral, color: "#fff", fontWeight: 600, fontSize: 15, padding: "13px 22px", borderRadius: 12, textDecoration: "none" }}>GitHub →</a>
                <a href="https://www.linkedin.com/in/shreeya-bhimani/" target="_blank" rel="noreferrer" style={{ ...inter, color: C.charcoal2, fontWeight: 600, fontSize: 15, padding: "12px 22px", borderRadius: 12, border: `1.5px solid ${C.border}`, background: C.surface, textDecoration: "none" }}>LinkedIn</a>
                <a href="mailto:bhimanishreeya5@gmail.com" style={{ ...inter, color: C.charcoal2, fontWeight: 600, fontSize: 15, padding: "12px 22px", borderRadius: 12, border: `1.5px solid ${C.border}`, background: C.surface, textDecoration: "none" }}>Email</a>
              </div>
            </div>

            <a href="https://github.com/shreeyabhimani02" target="_blank" rel="noreferrer" aria-label="GitHub" style={{ width: 52, height: 52, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: C.surface, color: C.charcoal2, border: `1.5px solid ${C.border}`, textDecoration: "none" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
            </a>
          </div>
        </RevealSection>
      </div>

      <div className="max-w-4xl mx-auto mt-16 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3" style={{ borderTop: `1px solid ${C.border}` }}>
        <p style={{ ...inter, fontSize: 13, color: C.muted }}>Designed & built by Shreeya Bhimani · 2026</p>
        <p style={{ ...inter, fontSize: 13, color: C.muted }}>Information Technology · SAKEC · Class of 2027</p>
      </div>
    </section>
  );
}

function useActiveSection() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const ids = ["hero", "projects", "about", "contact"];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActive(id); }, { threshold: 0.3 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);
  return active;
}

export default function App() {
  const activeSection = useActiveSection();
  return <div style={{ minHeight: "100vh", background: C.bg }}><NavBar activeSection={activeSection} /><HeroSection /><ProjectsSection /><AboutSection /><ContactSection /></div>;
}
