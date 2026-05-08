import React, { useState, useEffect } from 'react';
import {
  Github, Linkedin, Mail, MessageCircle,
  ExternalLink, Menu, X, ArrowRight,
  Smartphone, Globe, Database, Layers,
  ArrowUpRight, TrendingUp
} from 'lucide-react';

const FONTS = "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap";

const css = `
@import url('${FONTS}');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#060a12;--bg-1:#0b1120;--bg-2:#111827;
  --bdr:rgba(255,255,255,0.07);--bdr-m:rgba(255,255,255,0.12);
  --em:#03BDE9;--em2:#03ACD4;--emd:rgba(3,189,233,0.08);
  --wh:#f0f4ff;--g1:#94a3b8;--g2:#475569;
  --serif:'Fraunces',Georgia,serif;
  --sans:'DM Sans',system-ui,sans-serif;
}
html{scroll-behavior:smooth;}
body{background:var(--bg);color:var(--wh);font-family:var(--sans);font-weight:300;line-height:1.7;overflow-x:hidden;}
::-webkit-scrollbar{width:2px;}::-webkit-scrollbar-thumb{background:var(--em);}

/* NAV */
.nav{position:fixed;top:0;width:100%;z-index:200;padding:1.8rem 0;transition:all 0.4s;}
.nav.up{background:rgba(6,10,18,0.88);backdrop-filter:blur(30px) saturate(160%);border-bottom:1px solid var(--bdr);padding:1rem 0;}
.nav-w{max-width:1300px;margin:0 auto;padding:0 2.5rem;display:flex;align-items:center;justify-content:space-between;}
.brand{font-family:var(--serif);font-size:1.3rem;font-weight:700;color:var(--em);letter-spacing:0.04em;cursor:pointer;user-select:none;}
.nav-list{display:flex;gap:2.5rem;align-items:center;}
.nav-a{font-size:0.68rem;font-weight:400;letter-spacing:0.16em;text-transform:uppercase;color:var(--g1);cursor:pointer;background:none;border:none;font-family:var(--sans);transition:color 0.25s;}
.nav-a:hover{color:var(--wh);}
.nav-hire{font-size:0.68rem;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#000;background:var(--em);border:none;padding:0.62rem 1.6rem;cursor:pointer;font-family:var(--sans);transition:all 0.25s;border-radius:50px;}
.nav-hire:hover{background:var(--em2);transform:translateY(-1px);}
.m-btn{display:none;background:none;border:none;color:var(--wh);cursor:pointer;}
.drawer{position:fixed;inset:0;z-index:300;background:var(--bg);display:flex;flex-direction:column;padding:2rem 2.5rem;}
.drawer-links{display:flex;flex-direction:column;margin-top:3.5rem;}
.drawer-a{font-family:var(--serif);font-size:2.6rem;font-weight:400;color:var(--g2);background:none;border:none;border-bottom:1px solid var(--bdr);padding:0.9rem 0;text-align:left;cursor:pointer;transition:all 0.25s;}
.drawer-a:hover{color:var(--em);padding-left:0.5rem;}

/* HERO */
.hero{min-height:100vh;display:flex;align-items:center;padding:9rem 2.5rem 5rem;position:relative;overflow:hidden;}
.h-grid{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(3,189,233,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(3,189,233,0.025) 1px,transparent 1px);background-size:80px 80px;mask-image:radial-gradient(ellipse 70% 70% at 50% 40%,black 10%,transparent 80%);}
.h-glow{position:absolute;top:0;right:15%;transform:translateY(-30%);width:700px;height:700px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,rgba(3,189,233,0.09) 0%,transparent 65%);}
.h-body{max-width:1300px;margin:0 auto;width:100%;position:relative;z-index:1;}
.h-tag{display:inline-flex;align-items:center;gap:0.7rem;margin-bottom:2.5rem;}
.h-tag-ln{width:38px;height:1px;background:var(--em);}
.h-tag-tx{font-size:0.67rem;letter-spacing:0.24em;text-transform:uppercase;color:var(--em);font-weight:400;}
.h-name{font-family:var(--serif);font-size:clamp(3.8rem,10vw,7.5rem);font-weight:700;line-height:0.93;letter-spacing:-0.025em;color:var(--wh);margin-bottom:0.3rem;}
.h-em{font-style:italic;color:var(--em);display:block;}
.h-role{font-size:0.68rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--g2);margin:2.5rem 0 1.5rem;display:flex;align-items:center;gap:1.2rem;}
.h-role::after{content:'';flex:1;max-width:180px;height:1px;background:var(--bdr);}
.h-desc{font-size:1rem;color:var(--g1);max-width:490px;line-height:1.9;margin-bottom:3rem;}
.h-btns{display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:3.5rem;}
.btn-s{display:inline-flex;align-items:center;gap:0.6rem;font-size:0.7rem;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;background:var(--em);color:#000;padding:1.05rem 2.2rem;border:none;cursor:pointer;transition:all 0.3s;font-family:var(--sans);text-decoration:none;border-radius:50px;}
.btn-s:hover{background:var(--em2);transform:translateY(-2px);box-shadow:0 12px 30px rgba(3,189,233,0.3);}
.btn-o{display:inline-flex;align-items:center;gap:0.6rem;font-size:0.7rem;font-weight:400;letter-spacing:0.14em;text-transform:uppercase;background:transparent;color:var(--g1);padding:1.05rem 2.2rem;border:1px solid var(--bdr);cursor:pointer;transition:all 0.3s;font-family:var(--sans);text-decoration:none;border-radius:50px;}
.btn-o:hover{border-color:var(--em);color:var(--em);background:var(--emd);}
.h-soc{display:flex;gap:1.6rem;}
.h-soc-a{color:var(--g2);transition:all 0.25s;display:flex;align-items:center;text-decoration:none;}
.h-soc-a:hover{color:var(--em);transform:translateY(-2px);}
.h-nums{position:absolute;right:0;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:2.5rem;}
.h-num{text-align:right;}
.h-num-v{font-family:var(--serif);font-size:3.4rem;font-weight:700;color:var(--em);line-height:1;}
.h-num-l{font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--g2);margin-top:0.1rem;}

/* SECTIONS */
.sec{padding:8rem 2.5rem;}
.sec-i{max-width:1300px;margin:0 auto;}
.s-tag{display:inline-flex;align-items:center;gap:0.7rem;margin-bottom:1.2rem;}
.s-tag-ln{width:26px;height:1px;background:var(--em);}
.s-tag-tx{font-size:0.62rem;letter-spacing:0.24em;text-transform:uppercase;color:var(--em);}
.s-h2{font-family:var(--serif);font-size:clamp(2.4rem,4.5vw,3.6rem);font-weight:700;line-height:1.05;letter-spacing:-0.02em;color:var(--wh);margin-bottom:1.25rem;}
.s-h2 em{font-style:italic;color:var(--em);}

/* ABOUT */
.ab-grid{display:grid;grid-template-columns:1fr 1.4fr;gap:6rem;align-items:center;}
.ab-img-shell{position:relative;}
.ab-img-box{position:relative;aspect-ratio:3/4;overflow:hidden;}
.ab-img-box::after{content:'';position:absolute;inset:0;border:1px solid rgba(3,189,233,0.35);transform:translate(13px,13px);pointer-events:none;z-index:2;transition:transform 0.4s;}
.ab-img-shell:hover .ab-img-box::after{transform:translate(7px,7px);}
.ab-img-box img{width:100%;height:100%;object-fit:cover;object-position:top;filter:grayscale(20%);transition:filter 0.5s;}
.ab-img-shell:hover .ab-img-box img{filter:grayscale(0%);}
.ab-p{color:var(--g1);font-size:0.98rem;line-height:1.9;margin-bottom:1.75rem;}
.ab-kpi{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--bdr);border:1px solid var(--bdr);}
.ab-kpi-c{background:var(--bg);padding:1.5rem 1.75rem;transition:background 0.3s;}
.ab-kpi-c:hover{background:var(--bg-2);}
.ab-kpi-v{font-family:var(--serif);font-size:2.4rem;font-weight:700;color:var(--em);line-height:1;}
.ab-kpi-l{font-size:0.62rem;letter-spacing:0.13em;text-transform:uppercase;color:var(--g2);margin-top:0.3rem;}

/* SERVICES */
.svc-bg{background:var(--bg-1);}
.svc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--bdr);border:1px solid var(--bdr);}
.svc-c{background:var(--bg);padding:2.5rem 1.75rem;position:relative;overflow:hidden;transition:background 0.3s;}
.svc-c::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--em),transparent);transform:scaleX(0);transition:transform 0.5s;}
.svc-c:hover{background:var(--bg-2);}
.svc-c:hover::after{transform:scaleX(1);}
.svc-n{font-family:var(--serif);font-size:5rem;font-weight:700;color:rgba(255,255,255,0.025);position:absolute;top:0;right:1rem;line-height:1;pointer-events:none;}
.svc-ico{color:var(--em);margin-bottom:1.5rem;}
.svc-ttl{font-size:0.9rem;font-weight:600;color:var(--wh);margin-bottom:0.65rem;}
.svc-desc{font-size:0.8rem;color:var(--g2);line-height:1.75;margin-bottom:1.25rem;}
.svc-fl{list-style:none;}
.svc-fi{font-size:0.71rem;color:var(--g2);padding:0.3rem 0;border-top:1px solid var(--bdr);display:flex;align-items:center;gap:0.45rem;}
.dot{width:3px;height:3px;background:var(--em);border-radius:50%;flex-shrink:0;}

/* PROJECTS */
.pj-head{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:3rem;flex-wrap:wrap;gap:1.5rem;}
.pj-filters{display:flex;border:1px solid var(--bdr);}
.pj-f{font-size:0.67rem;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;padding:0.7rem 1.5rem;background:none;border:none;color:var(--g2);cursor:pointer;transition:all 0.2s;font-family:var(--sans);border-right:1px solid var(--bdr);}
.pj-f:last-child{border-right:none;}
.pj-f.on{background:var(--em);color:#000;font-weight:600;}
.pj-f:not(.on):hover{color:var(--wh);background:var(--bg-2);}
.pj-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--bdr);}
.pj-card{background:var(--bg-1);display:flex;flex-direction:column;transition:background 0.3s;}
.pj-card:hover{background:var(--bg-2);}
.pj-card.wide{grid-column:1 / -1;}
.pj-img-a{display:block;position:relative;overflow:hidden;text-decoration:none;cursor:pointer;}
.pj-img-div{display:block;position:relative;overflow:hidden;cursor:default;}
.pj-card:not(.wide) .pj-img-a,.pj-card:not(.wide) .pj-img-div{aspect-ratio:16/9;}
.pj-card.wide .pj-img-a,.pj-card.wide .pj-img-div{aspect-ratio:21/8;}
.pj-img-a img,.pj-img-div img{display:block;width:100%;height:100%;object-fit:cover;object-position:center top;filter:brightness(0.82);transition:transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94),filter 0.5s;}
.pj-img-a:hover img{transform:scale(1.05);filter:brightness(0.65);}
.pj-vig{position:absolute;inset:0;pointer-events:none;background:linear-gradient(to top,rgba(6,10,18,0.9) 0%,rgba(6,10,18,0.28) 45%,rgba(6,10,18,0.06) 100%);}
.pj-pill{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(0.82);opacity:0;background:var(--em);color:#000;font-family:var(--sans);font-size:0.63rem;font-weight:700;letter-spacing:0.17em;text-transform:uppercase;padding:0.8rem 2rem;display:flex;align-items:center;gap:0.55rem;white-space:nowrap;pointer-events:none;transition:opacity 0.32s,transform 0.32s;border-radius:50px;}
.pj-img-a:hover .pj-pill{opacity:1;transform:translate(-50%,-50%) scale(1);}
.pj-badge{position:absolute;top:14px;right:14px;font-size:0.57rem;letter-spacing:0.14em;text-transform:uppercase;padding:4px 12px;background:rgba(6,10,18,0.72);border:1px solid rgba(3,189,233,0.3);color:var(--em);backdrop-filter:blur(8px);display:flex;align-items:center;gap:5px;border-radius:50px;}
.bdot{width:5px;height:5px;border-radius:50%;background:#22c55e;animation:blink 2s infinite;}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:0.3;}}
.pj-body{padding:2rem;flex:1;display:flex;flex-direction:column;}
.pj-type{font-size:0.57rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--em);margin-bottom:0.65rem;}
.pj-name{font-family:var(--serif);font-size:1.5rem;font-weight:700;color:var(--wh);line-height:1.15;margin-bottom:0.2rem;display:flex;justify-content:space-between;align-items:flex-start;gap:0.75rem;}
.pj-card.wide .pj-name{font-size:1.9rem;}
.pj-arrow{color:var(--g2);flex-shrink:0;margin-top:4px;transition:all 0.3s;}
.pj-card:hover .pj-arrow{color:var(--em);transform:translate(3px,-3px);}
.pj-sub{font-size:0.77rem;color:var(--g2);margin-bottom:0.85rem;}
.pj-desc{font-size:0.82rem;color:var(--g1);line-height:1.8;margin-bottom:1.25rem;flex:1;}
.pj-stack{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:1rem;}
.stag{font-size:0.57rem;letter-spacing:0.1em;text-transform:uppercase;padding:3px 8px;border:1px solid var(--bdr);color:var(--g2);transition:all 0.2s;border-radius:4px;}
.stag:hover{border-color:var(--em);color:var(--em);}
.pj-kpis{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:1.1rem;}
.kpitag{font-size:0.62rem;color:var(--em);letter-spacing:0.06em;border:1px solid rgba(3,189,233,0.16);padding:3px 9px;background:rgba(3,189,233,0.04);border-radius:4px;}
.pj-links{display:flex;gap:1.5rem;padding-top:1.1rem;border-top:1px solid var(--bdr);}
.pj-lnk{display:inline-flex;align-items:center;gap:0.4rem;font-size:0.64rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--g2);text-decoration:none;transition:all 0.2s;}
.pj-lnk:hover{color:var(--em);gap:0.55rem;}

/* EXPERIENCE */
.exp-bg{background:var(--bg-1);}
.exp-ln{position:relative;padding-left:2.5rem;}
.exp-ln::before{content:'';position:absolute;left:0;top:0;bottom:0;width:1px;background:linear-gradient(to bottom,var(--em),transparent);}
.exp-it{position:relative;padding:0 0 3.25rem 3rem;}
.exp-it::before{content:'';position:absolute;left:-5px;top:9px;width:11px;height:11px;background:var(--em);border-radius:50%;box-shadow:0 0 0 4px var(--bg-1);transition:box-shadow 0.3s;}
.exp-it:hover::before{box-shadow:0 0 0 8px rgba(3,189,233,0.1);}
.exp-d{font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--em);margin-bottom:0.45rem;}
.exp-p{font-family:var(--serif);font-size:1.8rem;font-weight:700;color:var(--wh);margin-bottom:0.15rem;}
.exp-c{font-size:0.82rem;color:var(--g2);margin-bottom:1.4rem;}
.exp-bl{list-style:none;}
.exp-b{display:flex;gap:0.7rem;align-items:flex-start;font-size:0.83rem;color:var(--g1);padding:0.5rem 0;border-top:1px solid var(--bdr);line-height:1.65;}
.exp-bi{color:var(--em);flex-shrink:0;margin-top:3px;}

/* SKILLS */
.sk-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--bdr);border:1px solid var(--bdr);}
.sk-g{background:var(--bg);padding:2.25rem;transition:background 0.3s;}
.sk-g:hover{background:var(--bg-2);}
.sk-gt{font-size:0.6rem;letter-spacing:0.24em;text-transform:uppercase;color:var(--em);margin-bottom:1.25rem;padding-bottom:0.7rem;border-bottom:1px solid var(--bdr);}
.sk-l{list-style:none;}
.sk-r{display:flex;align-items:center;gap:0.6rem;font-size:0.82rem;color:var(--g1);padding:0.4rem 0;border-bottom:1px solid var(--bdr);transition:color 0.2s;}
.sk-r:last-child{border-bottom:none;}
.sk-r:hover{color:var(--wh);}

/* CONTACT */
.ct-bg{background:var(--bg-1);}
.ct-grid{display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:start;}
.ct-cards{display:flex;flex-direction:column;gap:1px;background:var(--bdr);border:1px solid var(--bdr);}
.ct-card{background:var(--bg);padding:1.8rem 2rem;display:flex;align-items:center;gap:1.4rem;text-decoration:none;transition:background 0.3s;position:relative;overflow:hidden;}
.ct-card::before{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:var(--em);transform:scaleY(0);transition:transform 0.3s;transform-origin:top;}
.ct-card:hover{background:var(--bg-2);}
.ct-card:hover::before{transform:scaleY(1);}
.ct-ico{color:var(--em);flex-shrink:0;}
.ct-lbl{font-size:0.57rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--g2);margin-bottom:2px;}
.ct-val{font-size:0.86rem;color:var(--wh);}
.ct-arr{margin-left:auto;color:var(--g2);transition:all 0.3s;flex-shrink:0;}
.ct-card:hover .ct-arr{color:var(--em);transform:translate(3px,-3px);}
.ct-box{border:1px solid var(--bdr);padding:3.25rem;position:relative;overflow:hidden;}
.ct-box::before{content:'';position:absolute;top:-80px;right:-80px;width:240px;height:240px;border-radius:50%;background:radial-gradient(circle,rgba(3,189,233,0.06) 0%,transparent 65%);pointer-events:none;}
.ct-q{font-family:var(--serif);font-size:1.9rem;font-weight:400;font-style:italic;color:var(--wh);line-height:1.45;margin-bottom:1.75rem;}
.ct-note{font-size:0.86rem;color:var(--g1);line-height:1.85;margin-bottom:2rem;}
.ct-avail{display:flex;align-items:center;gap:0.7rem;font-size:0.72rem;color:var(--g2);margin-top:2rem;padding-top:2rem;border-top:1px solid var(--bdr);}
.adot{width:6px;height:6px;border-radius:50%;background:#22c55e;flex-shrink:0;animation:blink 2s infinite;}

/* FOOTER */
.ft{padding:2.5rem;border-top:1px solid var(--bdr);}
.ft-i{max-width:1300px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;}
.ft-copy{font-size:0.72rem;color:var(--g2);}
.ft-links{display:flex;gap:2rem;}
.ft-a{font-size:0.72rem;color:var(--g2);text-decoration:none;transition:color 0.2s;}
.ft-a:hover{color:var(--em);}

/* REVEAL */
.rv{opacity:0;transform:translateY(28px);transition:opacity 0.85s ease,transform 0.85s ease;}
.rv.in{opacity:1;transform:none;}

@media(max-width:1100px){.svc-grid{grid-template-columns:repeat(2,1fr);}.sk-grid{grid-template-columns:repeat(2,1fr);}.h-nums{display:none;}}
@media(max-width:900px){.pj-grid{grid-template-columns:1fr;}.pj-card.wide{grid-column:auto;}.pj-card.wide .pj-img-a,.pj-card.wide .pj-img-div{aspect-ratio:16/9;}.ab-grid{grid-template-columns:1fr;gap:3rem;}.ct-grid{grid-template-columns:1fr;gap:3rem;}.ct-box{padding:2.5rem;}}
@media(max-width:768px){.nav-list{display:none;}.m-btn{display:flex;}.hero{padding:7.5rem 1.5rem 4rem;}.sec{padding:5.5rem 1.5rem;}.svc-grid{grid-template-columns:1fr;}}
@media(max-width:540px){.sk-grid{grid-template-columns:1fr;}}
`;

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const tick = () => {
      setScrolled(window.scrollY > 55);
      document.querySelectorAll('.rv').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) el.classList.add('in');
      });
    };
    window.addEventListener('scroll', tick, { passive: true });
    tick();
    return () => window.removeEventListener('scroll', tick);
  }, []);

  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setDrawer(false); };
  const NAV = ['About', 'Services', 'Projects', 'Experience', 'Skills', 'Contact'];

  const PROJECTS = [
    {
      title: 'Yawa',
      sub: 'Personal Safety & Emergency Response App',
      type: 'Mobile Application · Frontend Mobile Developer · Team Project',
      status: 'Live on Play Store',
      desc: 'Built and shipped to the Google Play Store as Frontend Mobile Developer. Features real-time SOS alerts, safety circles, emergency contact management, location-based incident reporting, announcement modal system, and push notifications. Architected the entire mobile frontend from ground up with a cross-functional team.',
      stack: ['React Native', 'Expo', 'Redux Toolkit', 'RTK Query', 'Socket.io', 'Firebase'],
      url: 'https://play.google.com/store/apps/details?id=com.yawaapp.Yawa',
      github: null,
      cat: 'mobile',
      img: 'https://play-lh.googleusercontent.com/8l7Gx9REl0yd9yCYMPfle4SYH-cDbvVHkWD-qASm5nTnprpR7GWCSRI_dtdXpA84RmmBK66PLTVxtF4XJZHntQ=w526-h296-rw',
      kpis: ['100+ Downloads', 'Live on Play Store', 'Real-time Socket Events'],
    },
    {
      title: 'NextPro Africa',
      sub: 'Football Academy Management Platform',
      type: 'Full Stack Application',
      status: 'Live',
      desc: 'Comprehensive football academy platform with player registration, admin dashboard, performance tracking, and secure authentication — serving 500+ active users across Nigeria.',
      stack: ['Next.js', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
      url: 'https://nextproafrica.com/',
      github: 'https://github.com/depriceless',
      cat: 'fullstack',
      img: 'https://i.imgur.com/ptG8Xi2.png',
      kpis: ['500+ Users', 'A+ Performance'],
    },
    {
      title: 'EcoHarvest',
      sub: 'Agrochemical B2B Platform',
      type: 'Business Website',
      status: 'Live',
      desc: 'B2B agrochemical platform with full product catalog, customer portal, and deep SEO — delivering consistent 10k+ monthly organic traffic for enterprise agricultural clients.',
      stack: ['React.js', 'Firebase', 'Tailwind CSS', 'SEO'],
      url: 'https://ecoharvestng.com/',
      github: 'https://github.com/depriceless',
      cat: 'frontend',
      img: 'https://i.imgur.com/XKEH9jq.png',
      kpis: ['10k / month', 'CVR 3.2%'],
    },
    {
      title: 'VTU Mobile App',
      sub: 'Fintech Payments Application',
      type: 'Mobile Application',
      status: 'Published',
      desc: 'Cross-platform fintech app enabling airtime top-ups, data purchases, and bill payments with real-time transaction tracking and secure authentication.',
      stack: ['React Native', 'Firebase', 'Firestore', 'Payment API'],
      url: null,
      github: 'https://github.com/depriceless',
      cat: 'mobile',
      img: 'https://i.imgur.com/Nq5cMqz.jpeg',
      kpis: ['5k+ Downloads', '4.8 ★ Rating'],
    },
  ];

  const SERVICES = [
    { icon: <Smartphone size={22} />, title: 'Mobile Development', desc: 'Production-grade iOS & Android apps with React Native and Expo — from design to Play Store.', feats: ['React Native / Expo', 'Real-time Features', 'App Store Deploy'] },
    { icon: <Globe size={22} />, title: 'Web Development', desc: 'Custom websites with modern frameworks, SEO optimisation, and peak performance scores.', feats: ['Responsive Design', 'SEO Optimisation', 'Fast Loading'] },
    { icon: <Database size={22} />, title: 'Backend Solutions', desc: 'Scalable APIs, databases, and real-time integrations using Firebase, Supabase, and Socket.io.', feats: ['API Development', 'Database Design', 'Socket / Realtime'] },
    { icon: <Layers size={22} />, title: 'Full Stack Projects', desc: 'End-to-end development from architecture to deployment — complete ownership and maintenance.', feats: ['Complete Ownership', 'Maintenance', 'Scalability'] },
  ];

  const SKILLS = {
    Mobile: ['React Native', 'Expo / EAS Build', 'Mobile UI/UX', 'Play Store Deploy', 'Cross-Platform Dev'],
    'State & Realtime': ['Redux Toolkit', 'RTK Query', 'Socket.io', 'MobX', 'Firebase Realtime'],
    Frontend: ['React.js / Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5 / CSS3', 'Responsive Design'],
    'Backend / Tools': ['Firebase', 'Supabase', 'PostgreSQL', 'REST APIs', 'Git / GitHub'],
  };

  const EXP = [
    {
      co: 'Yawa App · Full-time · Lagos, Nigeria',
      pos: 'Frontend Mobile Developer',
      date: '2024 – Present',
      bullets: [
        'Built the entire React Native mobile app from early stages to Play Store launch',
        'Architected real-time SOS, safety circles, socket-based notifications, and announcement system',
        'Owned mobile frontend across 9+ feature branches — shipping consistently with zero critical bugs',
        'Collaborated cross-functionally with backend engineers and product team in an agile workflow',
      ],
    },
    {
      co: 'NextPro Africa · Contract',
      pos: 'Lead Developer',
      date: '2023 – 2024',
      bullets: [
        'Built complete player management system serving 500+ active users',
        'Designed secure authentication and scalable database architecture with Supabase & PostgreSQL',
        'Led all technical decisions and maintained code quality standards end-to-end',
      ],
    },
    {
      co: 'Self-employed',
      pos: 'Freelance Frontend Developer',
      date: '2022 – 2024',
      bullets: [
        'Delivered 10+ projects across fintech, e-commerce, and B2B sectors',
        'Increased client organic traffic by 40% through SEO and performance engineering',
        'Maintained 100% client satisfaction with on-time professional delivery',
      ],
    },
  ];

  const visible = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.cat === filter);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* NAV */}
      <nav className={`nav${scrolled ? ' up' : ''}`}>
        <div className="nav-w">
          <div className="brand" onClick={() => go('home')}>Mutiu.</div>
          <div className="nav-list">
            {NAV.map(n => (
              <button key={n} className="nav-a" onClick={() => go(n.toLowerCase())}>{n}</button>
            ))}
            <button className="nav-hire" onClick={() => go('contact')}>Hire Me</button>
          </div>
          <button className="m-btn" onClick={() => setDrawer(true)}><Menu size={22} /></button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {drawer && (
        <div className="drawer">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="brand">Mutiu.</div>
            <button style={{ background: 'none', border: 'none', color: 'var(--wh)', cursor: 'pointer' }} onClick={() => setDrawer(false)}>
              <X size={24} />
            </button>
          </div>
          <div className="drawer-links">
            {['Home', ...NAV].map(n => (
              <button key={n} className="drawer-a" onClick={() => go(n.toLowerCase())}>{n}</button>
            ))}
          </div>
        </div>
      )}

      {/* HERO */}
      <section id="home" className="hero">
        <div className="h-grid" /><div className="h-glow" />
        <div className="h-body">
          <div className="h-tag rv"><div className="h-tag-ln" /><span className="h-tag-tx">Frontend Mobile Developer · Oyo state Ibadan, Nigeria</span></div>
          <h1 className="h-name rv" style={{ transitionDelay: '0.07s' }}>
            Mutiu Ridwan<em className="h-em">Adeyinka</em>
          </h1>
          <div className="h-role rv" style={{ transitionDelay: '0.13s' }}>Building mobile experiences that reach thousands</div>
          <p className="h-desc rv" style={{ transitionDelay: '0.19s' }}>
            I specialise in React Native & Expo — shipping production-grade apps with real-time features, clean architecture, and pixel-perfect interfaces. Currently on the team building Yawa, live on the Play Store.
          </p>
          <div className="h-btns rv" style={{ transitionDelay: '0.25s' }}>
            <button className="btn-s" onClick={() => go('projects')}>View My Work <ArrowRight size={15} /></button>
            <button className="btn-o" onClick={() => go('contact')}>Let's Talk</button>
          </div>
          <div className="h-soc rv" style={{ transitionDelay: '0.31s' }}>
            <a href="https://github.com/depriceless" target="_blank" rel="noreferrer" className="h-soc-a"><Github size={20} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="h-soc-a"><Linkedin size={20} /></a>
            <a href="mailto:mutiuridwan0@gmail.com" className="h-soc-a"><Mail size={20} /></a>
            <a href="https://wa.me/2348125813562" target="_blank" rel="noreferrer" className="h-soc-a"><MessageCircle size={20} /></a>
          </div>
          <div className="h-nums">
            {[['2+', 'Years Building'], ['100+', 'Downloads'], ['Live', 'Play Store'], ['100%', 'Satisfaction']].map(([v, l]) => (
              <div key={l} className="h-num"><div className="h-num-v">{v}</div><div className="h-num-l">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="sec">
        <div className="sec-i">
          <div className="ab-grid">
            <div className="ab-img-shell rv">
              <div className="ab-img-box">
                <img src="https://i.imgur.com/n9I3Y9h.jpeg" alt="Mutiu Ridwan Adeyinka" />
              </div>
            </div>
            <div className="rv" style={{ transitionDelay: '0.12s' }}>
              <div className="s-tag"><div className="s-tag-ln" /><span className="s-tag-tx">About</span></div>
              <h2 className="s-h2">Building with <em>purpose</em> and precision</h2>
              <p className="ab-p">
                Frontend Mobile Developer with proven expertise building and shipping production React Native apps. Currently a key member of the <strong style={{ color: 'var(--wh)' }}>Yawa App</strong> team — a safety application live on the Google Play Store with 100+ downloads.
              </p>
              <p className="ab-p">
                Passionate about real-time features, clean architecture, and mobile experiences that genuinely improve people's lives. Strong background in Redux Toolkit, Socket.io, Firebase, and cross-functional team collaboration.
              </p>
              <div className="ab-kpi">
                {[['100+', 'App Downloads'], ['2+', 'Apps Shipped'], ['100%', 'Client Satisfaction'], ['3+', 'Years Building']].map(([v, l]) => (
                  <div key={l} className="ab-kpi-c"><div className="ab-kpi-v">{v}</div><div className="ab-kpi-l">{l}</div></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="sec svc-bg">
        <div className="sec-i">
          <div className="rv" style={{ marginBottom: '3.5rem' }}>
            <div className="s-tag"><div className="s-tag-ln" /><span className="s-tag-tx">Services</span></div>
            <h2 className="s-h2">What I <em>do</em></h2>
          </div>
          <div className="svc-grid rv" style={{ transitionDelay: '0.1s' }}>
            {SERVICES.map((s, i) => (
              <div key={i} className="svc-c">
                <div className="svc-n">0{i + 1}</div>
                <div className="svc-ico">{s.icon}</div>
                <div className="svc-ttl">{s.title}</div>
                <p className="svc-desc">{s.desc}</p>
                <ul className="svc-fl">
                  {s.feats.map(f => <li key={f} className="svc-fi"><span className="dot" />{f}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="sec">
        <div className="sec-i">
          <div className="pj-head rv">
            <div>
              <div className="s-tag"><div className="s-tag-ln" /><span className="s-tag-tx">Work</span></div>
              <h2 className="s-h2" style={{ marginBottom: 0 }}>Selected <em>Projects</em></h2>
            </div>
            <div className="pj-filters">
              {['all', 'mobile', 'fullstack', 'frontend'].map(f => (
                <button key={f} className={`pj-f${filter === f ? ' on' : ''}`} onClick={() => setFilter(f)}>
                  {f === 'all' ? 'All' : f[0].toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="pj-grid rv" style={{ transitionDelay: '0.1s' }}>
            {visible.map((p, i) => {
              const wide = filter === 'all' && i === 0;
              return (
                <div key={p.title} className={`pj-card${wide ? ' wide' : ''}`}>
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noreferrer noopener" className="pj-img-a">
                      <img src={p.img} alt={p.title} loading="lazy" />
                      <div className="pj-vig" />
                      <div className="pj-pill"><ExternalLink size={12} /> Open Live</div>
                      <div className="pj-badge"><span className="bdot" />{p.status}</div>
                    </a>
                  ) : (
                    <div className="pj-img-div">
                      <img src={p.img} alt={p.title} loading="lazy" />
                      <div className="pj-vig" />
                      <div className="pj-badge"><span className="bdot" />{p.status}</div>
                    </div>
                  )}
                  <div className="pj-body">
                    <div className="pj-type">{p.type}</div>
                    <div className="pj-name">
                      <div>{p.title}</div>
                      <ArrowUpRight size={18} className="pj-arrow" />
                    </div>
                    <div className="pj-sub">{p.sub}</div>
                    <p className="pj-desc">{p.desc}</p>
                    <div className="pj-stack">{p.stack.map(t => <span key={t} className="stag">{t}</span>)}</div>
                    <div className="pj-kpis">{p.kpis.map(k => <span key={k} className="kpitag">{k}</span>)}</div>
                    <div className="pj-links">
                      {p.url && <a href={p.url} target="_blank" rel="noreferrer" className="pj-lnk"><ExternalLink size={13} /> {p.cat === 'mobile' ? 'Play Store' : 'Live Site'}</a>}
                      {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="pj-lnk"><Github size={13} /> Source Code</a>}
                      {!p.url && !p.github && <span style={{ fontSize: '0.64rem', color: 'var(--g2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Private · Coming Soon</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="sec svc-bg">
        <div className="sec-i">
          <div className="rv" style={{ marginBottom: '3.5rem' }}>
            <div className="s-tag"><div className="s-tag-ln" /><span className="s-tag-tx">Experience</span></div>
            <h2 className="s-h2">Where I've <em>worked</em></h2>
          </div>
          <div className="exp-ln rv" style={{ transitionDelay: '0.1s' }}>
            {EXP.map((e, i) => (
              <div key={i} className="exp-it">
                <div className="exp-d">{e.date}</div>
                <div className="exp-p">{e.pos}</div>
                <div className="exp-c">{e.co}</div>
                <ul className="exp-bl">
                  {e.bullets.map((b, j) => (
                    <li key={j} className="exp-b"><TrendingUp size={13} className="exp-bi" />{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="sec">
        <div className="sec-i">
          <div className="rv" style={{ marginBottom: '3.5rem' }}>
            <div className="s-tag"><div className="s-tag-ln" /><span className="s-tag-tx">Expertise</span></div>
            <h2 className="s-h2">Technical <em>Skills</em></h2>
          </div>
          <div className="sk-grid rv" style={{ transitionDelay: '0.1s' }}>
            {Object.entries(SKILLS).map(([cat, list]) => (
              <div key={cat} className="sk-g">
                <div className="sk-gt">{cat}</div>
                <ul className="sk-l">
                  {list.map(s => <li key={s} className="sk-r"><span className="dot" />{s}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="sec ct-bg">
        <div className="sec-i">
          <div className="rv" style={{ marginBottom: '3.5rem' }}>
            <div className="s-tag"><div className="s-tag-ln" /><span className="s-tag-tx">Contact</span></div>
            <h2 className="s-h2">Let's build something <em>great</em></h2>
          </div>
          <div className="ct-grid rv" style={{ transitionDelay: '0.1s' }}>
            <div className="ct-cards">
              {[
                { href: 'mailto:mutiuridwan0@gmail.com', icon: <Mail size={19} />, lbl: 'Email', val: 'mutiuridwan0@gmail.com' },
                { href: 'https://wa.me/2348125813562', icon: <MessageCircle size={19} />, lbl: 'WhatsApp', val: '+234 812 581 3562' },
                { href: 'https://github.com/depriceless', icon: <Github size={19} />, lbl: 'GitHub', val: '@depriceless' },
                { href: 'https://play.google.com/store/apps/details?id=com.yawaapp.Yawa', icon: <Smartphone size={19} />, lbl: 'Play Store', val: 'Yawa App · Live' },
                { href: '#', icon: <Linkedin size={19} />, lbl: 'LinkedIn', val: 'Mutiu Ridwan Adeyinka' },
              ].map(({ href, icon, lbl, val }) => (
                <a key={lbl} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="ct-card">
                  <span className="ct-ico">{icon}</span>
                  <div><div className="ct-lbl">{lbl}</div><div className="ct-val">{val}</div></div>
                  <ArrowUpRight size={15} className="ct-arr" />
                </a>
              ))}
            </div>
            <div className="ct-box">
              <p className="ct-q">"Have a project in mind? I'd love to hear about it."</p>
              <p className="ct-note">
                Whether you need a React Native app, web application, or full-stack solution — I'm ready to bring your vision to life with clean code and professional delivery.
              </p>
              <button className="btn-s" onClick={() => window.location.href = 'mailto:mutiuridwan0@gmail.com'}>
                Send a Message <ArrowRight size={15} />
              </button>
              <div className="ct-avail">
                <div className="adot" />
                <span>Available for new projects · Responds within 24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ft">
        <div className="ft-i">
          <div>
            <div className="brand" style={{ marginBottom: '0.3rem' }}>Mutiu.</div>
            <div className="ft-copy">© {new Date().getFullYear()} Mutiu Ridwan Adeyinka · Frontend Mobile Developer · Lagos, Nigeria</div>
          </div>
          <div className="ft-links">
            <a href="https://github.com/depriceless" target="_blank" rel="noreferrer" className="ft-a">GitHub</a>
            <a href="mailto:mutiuridwan0@gmail.com" className="ft-a">Email</a>
            <a href="https://wa.me/2348125813562" target="_blank" rel="noreferrer" className="ft-a">WhatsApp</a>
          </div>
        </div>
      </footer>
    </>
  );
}