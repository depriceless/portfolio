import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, MessageCircle, ExternalLink, Menu, X, ArrowRight, Smartphone, Globe, Database, Layers, CheckCircle, ArrowUpRight, Briefcase, TrendingUp } from 'lucide-react';

const FONT_LINK = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap";

const styles = `
  @import url('${FONT_LINK}');
  
  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  :root {
    --ink: #020817;
    --ink-2: #0f172a;
    --surface: #0f172a;
    --border: rgba(255,255,255,0.07);
    --border-hover: rgba(255,255,255,0.15);
    --gold: #34d399;
    --gold-light: #6ee7b7;
    --text: #e2e8f0;
    --muted: #64748b;
    --accent: #34d399;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--ink);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    line-height: 1.7;
    overflow-x: hidden;
  }

  .serif { font-family: 'Cormorant Garamond', serif; }

  /* Grain overlay */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: none;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.35;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--ink); }
  ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }

  /* Nav */
  .nav {
    position: fixed; top: 0; width: 100%; z-index: 100;
    transition: all 0.5s ease;
    padding: 1.5rem 0;
  }
  .nav.scrolled {
    background: rgba(10,10,15,0.92);
    backdrop-filter: blur(24px);
    border-bottom: 1px solid var(--border);
    padding: 1rem 0;
  }
  .nav-inner {
    max-width: 1200px; margin: 0 auto;
    padding: 0 2rem;
    display: flex; justify-content: space-between; align-items: center;
  }
  .logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem; font-weight: 600;
    color: var(--gold); letter-spacing: 0.05em;
    cursor: pointer;
  }
  .nav-links { display: flex; gap: 2.5rem; align-items: center; }
  .nav-link {
    font-size: 0.78rem; font-weight: 400; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--muted);
    cursor: pointer; transition: color 0.3s;
    background: none; border: none; font-family: 'DM Sans', sans-serif;
  }
  .nav-link:hover { color: var(--text); }
  .nav-cta {
    font-size: 0.72rem; font-weight: 500; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--ink);
    background: var(--gold); border: none;
    padding: 0.6rem 1.4rem; cursor: pointer;
    transition: all 0.3s; font-family: 'DM Sans', sans-serif;
  }
  .nav-cta:hover { background: var(--gold-light); }
  .menu-btn {
    display: none; background: none; border: none;
    color: var(--text); cursor: pointer; padding: 0.25rem;
  }

  /* Mobile menu */
  .mobile-menu {
    position: fixed; inset: 0; z-index: 200;
    background: var(--ink);
    display: flex; flex-direction: column;
    padding: 2rem;
    animation: fadeIn 0.2s ease;
  }
  .mobile-nav-links { display: flex; flex-direction: column; gap: 0; margin-top: 3rem; }
  .mobile-nav-link {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3rem; font-weight: 300;
    color: var(--muted); text-align: left;
    background: none; border: none; border-bottom: 1px solid var(--border);
    padding: 1rem 0; cursor: pointer; transition: color 0.3s;
    letter-spacing: -0.01em;
  }
  .mobile-nav-link:hover { color: var(--gold); }

  /* Hero */
  .hero {
    min-height: 100vh;
    display: flex; align-items: center;
    padding: 8rem 2rem 4rem;
    position: relative; overflow: hidden;
  }
  .hero-grid {
    position: absolute; inset: 0;
    background-image: 
      linear-gradient(rgba(52,211,153,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(52,211,153,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
  }
  .hero-glow {
    position: absolute;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 70%);
    top: 50%; left: 50%; transform: translate(-50%, -50%);
    pointer-events: none;
  }
  .hero-inner {
    max-width: 1200px; margin: 0 auto;
    position: relative; z-index: 1; width: 100%;
  }
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 0.75rem;
    margin-bottom: 2rem;
  }
  .eyebrow-line { width: 40px; height: 1px; background: var(--gold); }
  .eyebrow-text {
    font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--gold); font-weight: 400;
  }
  .hero-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(4rem, 10vw, 8rem);
    font-weight: 300; line-height: 0.95;
    letter-spacing: -0.02em; color: var(--text);
    margin-bottom: 0.5rem;
  }
  .hero-name-em {
    font-style: italic; color: var(--gold);
    display: block;
  }
  .hero-role {
    font-size: 0.85rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--muted); margin: 2rem 0 1.5rem;
    display: flex; align-items: center; gap: 1rem;
  }
  .hero-role::after { content: ''; flex: 1; height: 1px; background: var(--border); }
  .hero-desc {
    font-size: 1.05rem; color: var(--muted); max-width: 520px;
    line-height: 1.8; margin-bottom: 3rem;
  }
  .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 4rem; }
  .btn-primary {
    display: inline-flex; align-items: center; gap: 0.6rem;
    font-size: 0.78rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
    background: var(--gold); color: var(--ink); padding: 1rem 2rem;
    border: none; cursor: pointer; transition: all 0.3s; font-family: 'DM Sans', sans-serif;
    text-decoration: none;
  }
  .btn-primary:hover { background: var(--gold-light); transform: translateY(-2px); }
  .btn-ghost {
    display: inline-flex; align-items: center; gap: 0.6rem;
    font-size: 0.78rem; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase;
    background: transparent; color: var(--text); padding: 1rem 2rem;
    border: 1px solid var(--border); cursor: pointer; transition: all 0.3s;
    font-family: 'DM Sans', sans-serif; text-decoration: none;
  }
  .btn-ghost:hover { border-color: var(--gold); color: var(--gold); }
  .hero-socials { display: flex; gap: 1.5rem; }
  .social-link {
    color: var(--muted); transition: color 0.3s;
    display: flex; align-items: center;
  }
  .social-link:hover { color: var(--gold); }
  .hero-stats {
    position: absolute; right: 0; top: 50%; transform: translateY(-50%);
    display: flex; flex-direction: column; gap: 2rem;
  }
  .stat-item { text-align: right; }
  .stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3.5rem; font-weight: 300; color: var(--gold);
    line-height: 1; letter-spacing: -0.02em;
  }
  .stat-label { font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); }

  /* Section base */
  .section { padding: 7rem 2rem; }
  .section-inner { max-width: 1200px; margin: 0 auto; }
  .section-label {
    display: inline-flex; align-items: center; gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  .section-label-line { width: 30px; height: 1px; background: var(--gold); }
  .section-label-text {
    font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold);
  }
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 300; line-height: 1.1;
    letter-spacing: -0.02em; color: var(--text);
    margin-bottom: 1.5rem;
  }
  .section-title em { font-style: italic; color: var(--gold); }

  /* About */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center; }
  .about-img-wrap {
    position: relative;
  }
  .about-img-frame {
    position: relative;
    aspect-ratio: 3/4;
    overflow: hidden;
  }
  .about-img-frame::before {
    content: '';
    position: absolute; inset: 0;
    border: 1px solid var(--gold);
    z-index: 2; pointer-events: none;
    transform: translate(12px, 12px);
    transition: transform 0.4s ease;
  }
  .about-img-wrap:hover .about-img-frame::before { transform: translate(8px, 8px); }
  .about-img-frame img {
    width: 100%; height: 100%; object-fit: cover; object-position: top;
    filter: grayscale(20%); transition: filter 0.4s;
  }
  .about-img-wrap:hover .about-img-frame img { filter: grayscale(0%); }
  .about-text { color: var(--muted); font-size: 1rem; line-height: 1.9; margin-bottom: 2rem; }
  .about-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); border: 1px solid var(--border); }
  .about-stat {
    background: var(--ink); padding: 1.5rem;
    transition: background 0.3s;
  }
  .about-stat:hover { background: var(--surface); }
  .about-stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.5rem; font-weight: 300; color: var(--gold); line-height: 1;
  }
  .about-stat-label { font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-top: 0.25rem; }

  /* Services */
  .services-bg { background: var(--surface); }
  .services-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); }
  .service-card {
    background: var(--ink); padding: 2.5rem 2rem;
    transition: background 0.3s; position: relative; overflow: hidden;
  }
  .service-card::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: var(--gold); transform: scaleX(0); transition: transform 0.4s;
  }
  .service-card:hover { background: var(--surface); }
  .service-card:hover::after { transform: scaleX(1); }
  .service-icon { color: var(--gold); margin-bottom: 1.5rem; }
  .service-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 4rem; font-weight: 300; color: var(--border);
    position: absolute; top: 1rem; right: 1.5rem; line-height: 1;
    transition: color 0.3s;
  }
  .service-card:hover .service-num { color: rgba(52,211,153,0.06); }
  .service-title {
    font-size: 1rem; font-weight: 500; color: var(--text); margin-bottom: 0.75rem;
    letter-spacing: 0.02em;
  }
  .service-desc { font-size: 0.85rem; color: var(--muted); line-height: 1.7; margin-bottom: 1.5rem; }
  .service-features { list-style: none; }
  .service-feature {
    font-size: 0.75rem; color: var(--muted); padding: 0.3rem 0;
    border-top: 1px solid var(--border); display: flex; align-items: center; gap: 0.5rem;
  }
  .feature-dot { width: 4px; height: 4px; background: var(--gold); border-radius: 50%; flex-shrink: 0; }

  /* Projects */
  .projects-filter { display: flex; gap: 0; margin-bottom: 3rem; border: 1px solid var(--border); width: fit-content; }
  .filter-btn {
    font-size: 0.72rem; font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase;
    padding: 0.7rem 1.4rem; background: none; border: none; color: var(--muted);
    cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
    border-right: 1px solid var(--border);
  }
  .filter-btn:last-child { border-right: none; }
  .filter-btn.active { background: var(--gold); color: var(--ink); }
  .filter-btn:not(.active):hover { color: var(--text); background: var(--surface); }
  .projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); }
  .project-card {
    background: var(--ink); overflow: hidden; position: relative;
    transition: background 0.3s; cursor: pointer;
  }
  .project-card:hover { background: var(--surface); }
  .project-img {
    aspect-ratio: 16/10; overflow: hidden; position: relative;
  }
  .project-img img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.6s ease; filter: grayscale(15%);
  }
  .project-card:hover .project-img img { transform: scale(1.05); filter: grayscale(0%); }
  .project-img-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(10,10,15,0.8) 0%, transparent 60%);
  }
  .project-body { padding: 1.75rem; }
  .project-type {
    font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 0.5rem;
  }
  .project-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem; font-weight: 400; color: var(--text);
    margin-bottom: 0.75rem; line-height: 1.2;
    display: flex; align-items: flex-start; justify-content: space-between; gap: 0.5rem;
  }
  .project-arrow { color: var(--muted); flex-shrink: 0; margin-top: 0.25rem; transition: all 0.3s; }
  .project-card:hover .project-arrow { color: var(--gold); transform: translate(2px, -2px); }
  .project-desc { font-size: 0.83rem; color: var(--muted); line-height: 1.7; margin-bottom: 1.25rem; }
  .project-tech { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.25rem; }
  .tech-tag {
    font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase;
    padding: 0.25rem 0.6rem; border: 1px solid var(--border); color: var(--muted);
  }
  .project-links { display: flex; gap: 1.5rem; }
  .project-link {
    display: inline-flex; align-items: center; gap: 0.4rem;
    font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--muted); text-decoration: none; transition: color 0.2s;
  }
  .project-link:hover { color: var(--gold); }

  /* Experience */
  .exp-bg { background: var(--surface); }
  .exp-timeline { position: relative; padding-left: 2rem; }
  .exp-timeline::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 1px;
    background: var(--border);
  }
  .exp-item {
    position: relative; padding: 0 0 3rem 2.5rem; 
  }
  .exp-item::before {
    content: ''; position: absolute; left: -5px; top: 8px;
    width: 10px; height: 10px; background: var(--gold); border-radius: 50%;
    box-shadow: 0 0 0 4px var(--surface);
    transition: all 0.3s;
  }
  .exp-item:hover::before { box-shadow: 0 0 0 6px rgba(52,211,153,0.12); }
  .exp-duration {
    font-size: 0.68rem; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 0.5rem;
  }
  .exp-position {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem; font-weight: 300; color: var(--text);
    margin-bottom: 0.25rem;
  }
  .exp-company { font-size: 0.85rem; color: var(--muted); margin-bottom: 1.25rem; }
  .exp-highlights { list-style: none; }
  .exp-highlight {
    display: flex; gap: 0.75rem; align-items: flex-start;
    font-size: 0.87rem; color: var(--muted); padding: 0.5rem 0;
    border-top: 1px solid var(--border); line-height: 1.6;
  }
  .exp-highlight-icon { color: var(--gold); flex-shrink: 0; margin-top: 2px; }

  /* Skills */
  .skills-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); }
  .skill-group {
    background: var(--ink); padding: 2rem;
    transition: background 0.3s;
  }
  .skill-group:hover { background: var(--surface); }
  .skill-group-title {
    font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 1.5rem; padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--border);
  }
  .skill-list { list-style: none; }
  .skill-item {
    display: flex; align-items: center; gap: 0.6rem;
    font-size: 0.85rem; color: var(--muted); padding: 0.4rem 0;
    border-bottom: 1px solid var(--border); transition: color 0.2s;
  }
  .skill-item:last-child { border-bottom: none; }
  .skill-item:hover { color: var(--text); }
  .skill-dot { width: 4px; height: 4px; background: var(--gold); border-radius: 50%; flex-shrink: 0; }

  /* Contact */
  .contact-bg { background: var(--surface); }
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: start; }
  .contact-cards { display: flex; flex-direction: column; gap: 1px; background: var(--border); border: 1px solid var(--border); }
  .contact-card {
    background: var(--ink); padding: 1.75rem 2rem;
    display: flex; align-items: center; gap: 1.25rem;
    text-decoration: none; transition: background 0.3s; position: relative; overflow: hidden;
  }
  .contact-card::after {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
    background: var(--gold); transform: scaleY(0); transition: transform 0.3s;
  }
  .contact-card:hover { background: var(--surface); }
  .contact-card:hover::after { transform: scaleY(1); }
  .contact-icon { color: var(--gold); flex-shrink: 0; }
  .contact-info-label {
    font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--muted); margin-bottom: 0.15rem;
  }
  .contact-info-value { font-size: 0.9rem; color: var(--text); }
  .contact-arrow { margin-left: auto; color: var(--muted); transition: all 0.3s; }
  .contact-card:hover .contact-arrow { color: var(--gold); transform: translate(3px, -3px); }
  .contact-cta-box {
    border: 1px solid var(--border); padding: 3rem; position: relative; overflow: hidden;
  }
  .contact-cta-box::before {
    content: '';
    position: absolute; top: -80px; right: -80px;
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
  .contact-cta-quote {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem; font-weight: 300; font-style: italic;
    color: var(--text); line-height: 1.4; margin-bottom: 2rem;
  }
  .contact-response {
    display: flex; align-items: center; gap: 0.75rem;
    font-size: 0.78rem; color: var(--muted); margin-top: 2rem;
    padding-top: 2rem; border-top: 1px solid var(--border);
  }
  .response-dot { width: 6px; height: 6px; background: #22c55e; border-radius: 50%; flex-shrink: 0; animation: pulse 2s infinite; }

  /* Footer */
  .footer { padding: 3rem 2rem; border-top: 1px solid var(--border); }
  .footer-inner {
    max-width: 1200px; margin: 0 auto;
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 1rem;
  }
  .footer-copy { font-size: 0.78rem; color: var(--muted); }
  .footer-links { display: flex; gap: 2rem; }
  .footer-link { font-size: 0.78rem; color: var(--muted); text-decoration: none; transition: color 0.2s; }
  .footer-link:hover { color: var(--gold); }

  /* Animations */
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  .fade-up {
    opacity: 0; transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .fade-up.visible { opacity: 1; transform: translateY(0); }

  /* Responsive */
  @media (max-width: 1024px) {
    .services-grid { grid-template-columns: repeat(2, 1fr); }
    .projects-grid { grid-template-columns: repeat(2, 1fr); }
    .skills-grid { grid-template-columns: repeat(2, 1fr); }
    .hero-stats { display: none; }
  }
  @media (max-width: 768px) {
    .nav-links { display: none; }
    .menu-btn { display: flex; }
    .hero { padding: 7rem 1.5rem 4rem; }
    .hero-name { font-size: clamp(3rem, 12vw, 5rem); }
    .about-grid { grid-template-columns: 1fr; gap: 3rem; }
    .services-grid { grid-template-columns: 1fr; }
    .projects-grid { grid-template-columns: 1fr; }
    .skills-grid { grid-template-columns: repeat(2, 1fr); }
    .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
    .section { padding: 5rem 1.5rem; }
    .projects-filter { flex-wrap: wrap; }
    .footer-inner { flex-direction: column; align-items: flex-start; }
  }
  @media (max-width: 480px) {
    .skills-grid { grid-template-columns: 1fr; }
  }
`;

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const sectionRefs = useRef({});

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      // Fade-up animations
      document.querySelectorAll('.fade-up').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
          el.classList.add('visible');
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navItems = ['About', 'Services', 'Projects', 'Experience', 'Skills', 'Contact'];

  const projects = [
    {
      title: 'NextPro Africa',
      subtitle: 'Football Academy Platform',
      type: 'Full Stack Application',
      status: 'Live',
      description: 'Comprehensive football academy management platform with player registration, admin dashboard, performance tracking, and secure authentication. Serving active players and coaches across Nigeria.',
      tech: ['Next.js', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
      link: 'https://nextproafrica.com/',
      github: 'https://github.com/depriceless',
      category: 'fullstack',
      image: 'https://i.imgur.com/ptG8Xi2.png',
      metrics: { users: '500+', perf: 'A+' }
    },
    {
      title: 'EcoHarvest',
      subtitle: 'Agrochemical B2B Platform',
      type: 'Business Website',
      status: 'Live',
      description: 'B2B agrochemical platform featuring a full product catalog, customer portal, and deep SEO optimization — delivering consistent organic traffic for enterprise agricultural clients.',
      tech: ['React.js', 'Firebase', 'Tailwind CSS', 'SEO'],
      link: 'https://ecoharvestng.com/',
      github: 'https://github.com/depriceless',
      category: 'frontend',
      image: 'https://i.imgur.com/XKEH9jq.png',
      metrics: { traffic: '10k/mo', cvr: '3.2%' }
    },
    {
      title: 'VTU Mobile App',
      subtitle: 'Fintech Payments Application',
      type: 'Mobile Application',
      status: 'Published',
      description: 'Cross-platform fintech app enabling airtime top-ups, data purchases, and bill payments with real-time transaction tracking and secure authentication.',
      tech: ['React Native', 'Firebase', 'Firestore', 'Payment API'],
      github: 'https://github.com/depriceless',
      category: 'mobile',
      image: 'https://i.imgur.com/Nq5cMqz.jpeg',
      metrics: { downloads: '5k+', rating: '4.8★' }
    },
    {
      title: 'ElectroMarket',
      subtitle: 'Nigerian Classifieds Marketplace',
      type: 'Full Stack Application',
      status: 'In Development',
      description: 'Full-featured classifieds marketplace for Nigeria — buy and sell electronics, vehicles, property, fashion, jobs and more. Features real-time messaging, saved listings, seller verification, category browsing, and a mobile-first responsive design.',
      tech: ['Next.js', 'Prisma', 'PostgreSQL', 'NextAuth', 'Tailwind CSS'],
      category: 'fullstack',
      image: '/electro.png',
      metrics: { categories: '12+', type: 'Marketplace' }
    },
  ];

  const services = [
    { icon: <Globe size={24} />, title: 'Web Development', desc: 'Custom websites with modern frameworks, SEO optimization, and peak performance.', features: ['Responsive Design', 'SEO Optimization', 'Fast Loading'] },
    { icon: <Smartphone size={24} />, title: 'Mobile Development', desc: 'Cross-platform iOS & Android apps using React Native with native performance.', features: ['Cross-Platform', 'Native Feel', 'Offline Support'] },
    { icon: <Database size={24} />, title: 'Backend Solutions', desc: 'Scalable architecture with secure APIs, database design, and cloud infrastructure.', features: ['API Development', 'Database Design', 'Cloud Setup'] },
    { icon: <Layers size={24} />, title: 'Full Stack Projects', desc: 'End-to-end development from architecture to deployment, maintenance and growth.', features: ['Complete Ownership', 'Maintenance', 'Scalability'] },
  ];

  const skills = {
    Frontend: ['React.js', 'Next.js', 'Tailwind CSS', 'JavaScript ES6+', 'HTML5/CSS3', 'Responsive Design'],
    Mobile: ['React Native', 'Mobile UI/UX', 'Cross-Platform Dev', 'App Store Deploy'],
    Backend: ['Firebase', 'Supabase', 'MongoDB', 'PostgreSQL', 'REST APIs'],
    Tools: ['Git/GitHub', 'VS Code', 'Vercel', 'Figma', 'Docker', 'Postman'],
  };

  const experience = [
    {
      company: 'Freelance', position: 'Full Stack Developer', duration: '2022 – Present',
      highlights: ['Delivered 10+ projects across fintech, e-commerce, and SaaS sectors', 'Increased client traffic by 40% through SEO and performance engineering', 'Maintained 100% client satisfaction with professional, on-time delivery'],
    },
    {
      company: 'NextPro Africa', position: 'Lead Developer', duration: '2023 – 2024',
      highlights: ['Built complete player management system serving 500+ active users', 'Designed secure authentication and scalable database architecture', 'Led all technical decisions and maintained code quality standards'],
    },
  ];

  const filtered = activeFilter === 'all' ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* Nav */}
      <nav className={`nav ${scrollY > 60 ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <div className="logo" onClick={() => scrollTo('home')}>MRA</div>
          <div className="nav-links">
            {navItems.map(item => (
              <button key={item} className="nav-link" onClick={() => scrollTo(item.toLowerCase())}>{item}</button>
            ))}
            <button className="nav-cta" onClick={() => scrollTo('contact')}>Hire Me</button>
          </div>
          <button className="menu-btn" onClick={() => setMenuOpen(true)}>
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="logo">MRA</div>
            <button style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer' }} onClick={() => setMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <div className="mobile-nav-links">
            {['Home', ...navItems].map(item => (
              <button key={item} className="mobile-nav-link" onClick={() => scrollTo(item.toLowerCase())}>{item}</button>
            ))}
          </div>
        </div>
      )}

      {/* Hero */}
      <section id="home" className="hero">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-inner">
          <div className="hero-eyebrow">
            <div className="eyebrow-line" />
            <span className="eyebrow-text">Full Stack Developer · Ibadan, Oyo State, Nigeria</span>
          </div>
          <h1 className="hero-name">
            Mutiu Ridwan
            <em className="hero-name-em">Adeyinka</em>
          </h1>
          <div className="hero-role">Crafting Digital Experiences That Matter</div>
          <p className="hero-desc">
            I build high-performance web and mobile applications using React, Next.js, and React Native — focused on clean architecture, measurable outcomes, and solutions that scale.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo('projects')}>
              View Work <ArrowRight size={16} />
            </button>
            <button className="btn-ghost" onClick={() => scrollTo('contact')}>
              Let's Talk
            </button>
          </div>
          <div className="hero-socials">
            <a href="https://github.com/depriceless" target="_blank" rel="noreferrer" className="social-link"><Github size={20} /></a>
            <a href="#" target="_blank" rel="noreferrer" className="social-link"><Linkedin size={20} /></a>
            <a href="mailto:mutiuridwan0@gmail.com" className="social-link"><Mail size={20} /></a>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-num">10+</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">3+</div>
              <div className="stat-label">Years Exp.</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">100%</div>
              <div className="stat-label">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section">
        <div className="section-inner">
          <div className="about-grid">
            <div className="about-img-wrap fade-up">
              <div className="about-img-frame">
                <img src="https://i.imgur.com/n9I3Y9h.jpeg" alt="Mutiu Ridwan Adeyinka" />
              </div>
            </div>
            <div className="fade-up" style={{ transitionDelay: '0.15s' }}>
              <div className="section-label">
                <div className="section-label-line" />
                <span className="section-label-text">About</span>
              </div>
              <h2 className="section-title">Building with <em>purpose</em> and precision</h2>
              <p className="about-text">
                Results-driven Full Stack Developer with proven expertise building scalable, high-performance applications. Specialized in React.js, React Native, and Next.js — with demonstrated success across fintech, e-commerce, and SaaS.
              </p>
              <p className="about-text">
                I'm passionate about intuitive, user-centric solutions that solve real business problems. Strong background in clean code practices, agile development, and cross-functional collaboration with a sharp eye for design and performance.
              </p>
              <div className="about-stats">
                {[['10+', 'Projects Delivered'], ['100%', 'Client Satisfaction'], ['3+', 'Years Experience'], ['2', 'Apps in Production']].map(([n, l]) => (
                  <div key={l} className="about-stat">
                    <div className="about-stat-num">{n}</div>
                    <div className="about-stat-label">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section services-bg">
        <div className="section-inner">
          <div className="fade-up" style={{ marginBottom: '3rem' }}>
            <div className="section-label">
              <div className="section-label-line" />
              <span className="section-label-text">Services</span>
            </div>
            <h2 className="section-title">What I <em>do</em></h2>
          </div>
          <div className="services-grid fade-up" style={{ transitionDelay: '0.1s' }}>
            {services.map((s, i) => (
              <div key={i} className="service-card">
                <div className="service-num">0{i + 1}</div>
                <div className="service-icon">{s.icon}</div>
                <div className="service-title">{s.title}</div>
                <p className="service-desc">{s.desc}</p>
                <ul className="service-features">
                  {s.features.map(f => (
                    <li key={f} className="service-feature">
                      <span className="feature-dot" />{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section">
        <div className="section-inner">
          <div className="fade-up" style={{ marginBottom: '3rem' }}>
            <div className="section-label">
              <div className="section-label-line" />
              <span className="section-label-text">Work</span>
            </div>
            <h2 className="section-title">Selected <em>Projects</em></h2>
          </div>
          <div className="projects-filter fade-up">
            {['all', 'fullstack', 'frontend', 'mobile'].map(f => (
              <button key={f} className={`filter-btn ${activeFilter === f ? 'active' : ''}`} onClick={() => setActiveFilter(f)}>
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="projects-grid fade-up" style={{ transitionDelay: '0.1s' }}>
            {filtered.map((p, i) => (
              <div key={i} className="project-card">
                <div className="project-img">
                  <img src={p.image} alt={p.title} />
                  <div className="project-img-overlay" />
                </div>
                <div className="project-body">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <div className="project-type">{p.type}</div>
                    {p.status && (
                      <span style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.2rem 0.6rem', border: '1px solid rgba(52,211,153,0.4)', color: 'var(--gold)', borderRadius: '2px' }}>
                        ● {p.status}
                      </span>
                    )}
                  </div>
                  <div className="project-title">
                    <div>
                      {p.title}
                      {p.subtitle && <div style={{ fontSize: '0.8rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 300, color: 'var(--muted)', marginTop: '0.1rem' }}>{p.subtitle}</div>}
                    </div>
                    <ArrowUpRight size={18} className="project-arrow" />
                  </div>
                  <p className="project-desc">{p.description}</p>
                  <div className="project-tech">
                    {p.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    {Object.entries(p.metrics).map(([k, v]) => (
                      <span key={k} style={{ fontSize: '0.7rem', color: 'var(--gold)', border: '1px solid rgba(52,211,153,0.2)', padding: '0.2rem 0.5rem', letterSpacing: '0.05em' }}>{v}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="project-link"><ExternalLink size={14} /> Live Site</a>}
                    {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="project-link"><Github size={14} /> Code</a>}
                    {!p.github && !p.link && <span style={{fontSize:'0.72rem', color:'var(--muted)', letterSpacing:'0.08em', textTransform:'uppercase'}}>Private / Coming Soon</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="section exp-bg">
        <div className="section-inner">
          <div className="fade-up" style={{ marginBottom: '3rem' }}>
            <div className="section-label">
              <div className="section-label-line" />
              <span className="section-label-text">Experience</span>
            </div>
            <h2 className="section-title">Where I've <em>worked</em></h2>
          </div>
          <div className="exp-timeline fade-up" style={{ transitionDelay: '0.1s' }}>
            {experience.map((job, i) => (
              <div key={i} className="exp-item">
                <div className="exp-duration">{job.duration}</div>
                <div className="exp-position">{job.position}</div>
                <div className="exp-company">{job.company}</div>
                <ul className="exp-highlights">
                  {job.highlights.map((h, j) => (
                    <li key={j} className="exp-highlight">
                      <TrendingUp size={14} className="exp-highlight-icon" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section">
        <div className="section-inner">
          <div className="fade-up" style={{ marginBottom: '3rem' }}>
            <div className="section-label">
              <div className="section-label-line" />
              <span className="section-label-text">Expertise</span>
            </div>
            <h2 className="section-title">Technical <em>Skills</em></h2>
          </div>
          <div className="skills-grid fade-up" style={{ transitionDelay: '0.1s' }}>
            {Object.entries(skills).map(([cat, list]) => (
              <div key={cat} className="skill-group">
                <div className="skill-group-title">{cat}</div>
                <ul className="skill-list">
                  {list.map(s => (
                    <li key={s} className="skill-item">
                      <span className="skill-dot" />{s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section contact-bg">
        <div className="section-inner">
          <div className="fade-up" style={{ marginBottom: '3rem' }}>
            <div className="section-label">
              <div className="section-label-line" />
              <span className="section-label-text">Contact</span>
            </div>
            <h2 className="section-title">Let's build something <em>great</em></h2>
          </div>
          <div className="contact-grid fade-up" style={{ transitionDelay: '0.1s' }}>
            <div className="contact-cards">
              <a href="mailto:mutiuridwan0@gmail.com" className="contact-card">
                <Mail size={20} className="contact-icon" />
                <div>
                  <div className="contact-info-label">Email</div>
                  <div className="contact-info-value">mutiuridwan0@gmail.com</div>
                </div>
                <ArrowUpRight size={16} className="contact-arrow" />
              </a>
              <a href="https://wa.me/2348125813562" target="_blank" rel="noreferrer" className="contact-card">
                <MessageCircle size={20} className="contact-icon" />
                <div>
                  <div className="contact-info-label">WhatsApp</div>
                  <div className="contact-info-value">+234 812 581 3562</div>
                </div>
                <ArrowUpRight size={16} className="contact-arrow" />
              </a>
              <a href="https://github.com/depriceless" target="_blank" rel="noreferrer" className="contact-card">
                <Github size={20} className="contact-icon" />
                <div>
                  <div className="contact-info-label">GitHub</div>
                  <div className="contact-info-value">@depriceless</div>
                </div>
                <ArrowUpRight size={16} className="contact-arrow" />
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="contact-card">
                <Linkedin size={20} className="contact-icon" />
                <div>
                  <div className="contact-info-label">LinkedIn</div>
                  <div className="contact-info-value">Mutiu Ridwan Adeyinka</div>
                </div>
                <ArrowUpRight size={16} className="contact-arrow" />
              </a>
            </div>

            <div className="contact-cta-box">
              <p className="contact-cta-quote">
                "Have a project in mind? I'd love to hear about it."
              </p>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: '1.8', marginBottom: '2rem' }}>
                Whether you need a web application, mobile app, or full-stack solution — I'm ready to bring your vision to life with clean code and professional delivery.
              </p>
              <a href="mailto:mutiuridwan0@gmail.com" className="btn-primary">
                Send a Message <ArrowRight size={16} />
              </a>
              <div className="contact-response">
                <div className="response-dot" />
                <span>Available for new projects · Responds within 24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="logo" style={{ marginBottom: '0.25rem' }}>MRA</div>
            <div className="footer-copy">© {new Date().getFullYear()} Mutiu Ridwan Adeyinka. All rights reserved.</div>
          </div>
          <div className="footer-links">
            <a href="https://github.com/depriceless" target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
            <a href="mailto:mutiuridwan0@gmail.com" className="footer-link">Email</a>
            <a href="https://wa.me/2348125813562" target="_blank" rel="noreferrer" className="footer-link">WhatsApp</a>
          </div>
        </div>
      </footer>
    </>
  );
}