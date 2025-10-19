import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Code2, Menu, X, ArrowRight, Smartphone, Globe, Database, Layers, CheckCircle, ChevronDown, ArrowUpRight, Award, Briefcase, Star, TrendingUp } from 'lucide-react';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [visibleSections, setVisibleSections] = useState({});
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['about', 'services', 'projects', 'skills', 'experience', 'testimonials', 'contact'];
      const newVisibleSections = {};
      
      sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          newVisibleSections[id] = rect.top < window.innerHeight * 0.75;
        }
      });
      
      setVisibleSections(newVisibleSections);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      title: 'NextPro Africa Football Academy',
      description: 'Comprehensive platform for player management with registration system, admin dashboard, real-time updates and secure authentication.',
      tech: ['Next.js', 'Tailwind CSS', 'Supabase', 'React', 'PostgreSQL'],
      features: ['Player Registration', 'Admin Dashboard', 'Real-time Updates', 'Responsive Design'],
      github: 'https://github.com/depriceless',
      type: 'Web Application',
      category: 'fullstack',
      color: 'from-green-500 to-emerald-600',
      image: 'https://i.imgur.com/ptG8Xi2.png',
      metrics: { users: '500+', performance: 'A+' }
    },
    {
      title: 'EcoHarvest',
      description: 'B2B agrochemical platform featuring product catalog, customer portal, and SEO optimization for enterprise clients.',
      tech: ['React.js', 'Tailwind CSS', 'SEO', 'Firebase'],
      features: ['Product Catalog', 'SEO Optimized', 'Analytics Dashboard', 'Mobile Responsive'],
      link: 'https://ecoharvestng.com/',
      github: 'https://github.com/depriceless',
      type: 'Business Website',
      category: 'frontend',
      color: 'from-amber-500 to-orange-600',
      image: 'https://i.imgur.com/XKEH9jq.png',
      metrics: { traffic: '10k/month', conversion: '3.2%' }
    },
    {
      title: 'VTU Mobile Application',
      description: 'Cross-platform fintech mobile app enabling airtime, data, and bill payments with secure transactions and real-time tracking.',
      tech: ['React Native', 'Firebase', 'Firestore', 'Payment Gateway'],
      features: ['Mobile Payment', 'Real-time Tracking', 'Secure Auth', 'Transaction History'],
      github: 'https://github.com/depriceless',
      type: 'Mobile App',
      category: 'mobile',
      color: 'from-blue-500 to-purple-600',
      image: 'https://i.imgur.com/Nq5cMqz.jpeg',
      metrics: { downloads: '5k+', rating: '4.8★' }
    }
  ];

  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Web Development',
      description: 'Custom websites and applications with modern frameworks, SEO optimization, and optimal performance.',
      highlights: ['Responsive Design', 'SEO Optimization', 'Fast Loading'],
      price: '$2000+'
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Mobile App Development',
      description: 'Cross-platform iOS/Android applications using React Native with native performance and seamless UX.',
      highlights: ['Cross-Platform', 'Native Feel', 'Offline Support'],
      price: '$3000+'
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Backend Solutions',
      description: 'Scalable server architecture with secure APIs, database design, and cloud infrastructure setup.',
      highlights: ['API Development', 'Database Design', 'Cloud Integration'],
      price: '$2500+'
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: 'Full Stack Solutions',
      description: 'End-to-end development services handling complete project lifecycle from design to deployment and maintenance.',
      highlights: ['Complete Solutions', 'Maintenance Support', 'Scalability'],
      price: '$4000+'
    }
  ];

  const experience = [
    {
      company: 'Freelance Developer',
      position: 'Full Stack Developer',
      duration: '2022 - Present',
      highlights: [
        'Delivered 10+ projects for diverse clients across fintech, e-commerce, and SaaS sectors',
        'Increased client website traffic by 40% through SEO optimization and performance improvements',
        'Maintained 100% client satisfaction rate with on-time delivery and professional support'
      ]
    },
    {
      company: 'NextPro Africa',
      position: 'Lead Developer',
      duration: '2023 - 2024',
      highlights: [
        'Built comprehensive player management system serving 500+ active users',
        'Designed and implemented secure authentication and database architecture',
        'Led technical decisions and code quality standards for the platform'
      ]
    }
  ];

  const testimonials = [
    {
      name: 'Ahmed Okafor',
      role: 'CEO, NextPro Africa',
      text: 'Mutiu delivered an exceptional platform that exceeded our expectations. His technical expertise and attention to detail were invaluable.',
      rating: 5
    },
    {
      name: 'Chioma Adeyemi',
      role: 'Founder, EcoHarvest',
      text: 'Professional, responsive, and highly skilled. Mutiu transformed our vision into a robust, scalable platform. Highly recommended!',
      rating: 5
    }
  ];

  const skills = {
    'Frontend': ['React.js', 'Next.js', 'Tailwind CSS', 'JavaScript ES6+', 'HTML5/CSS3', 'Responsive Design'],
    'Mobile': ['React Native', 'Mobile UI/UX', 'Cross-platform Development', 'App Store Deployment'],
    'Backend': ['Firebase', 'Supabase', 'MongoDB', 'PostgreSQL', 'REST APIs'],
    'Tools': ['Git/GitHub', 'VS Code', 'Vercel', 'Figma', 'Docker', 'Postman']
  };

  const filteredProjects = activeFilter === 'all' ? projects : projects.filter(p => p.category === activeFilter);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-green-700/20 rounded-full blur-3xl top-20 right-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-slate-300/20 rounded-full blur-3xl bottom-20 left-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-slate-950/95 backdrop-blur-lg border-b border-slate-800 shadow-2xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold cursor-pointer group">
              <span className="bg-gradient-to-r from-emerald-400 to-slate-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block">
                Mutiu Ridwan 
              </span>
            </div>
            
            <div className="hidden md:flex gap-8">
              {['Home', 'About', 'Services', 'Projects', 'Experience', 'Skills', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-300 hover:text-emerald-400 transition-all duration-300 font-medium relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-slate-300 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>

            <button
              className="md:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 flex flex-col gap-2">
              {['Home', 'About', 'Services', 'Projects', 'Experience', 'Skills', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left text-gray-300 hover:text-blue-400 text-sm font-medium py-2 px-4 rounded-lg hover:bg-slate-800/50 transition-all duration-200"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10 w-full">
          <div className="flex flex-col items-center gap-12">
            <div className="text-center max-w-3xl">
              <div className="mb-8 inline-flex gap-2 items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full text-slate-300 text-xs font-medium tracking-wider uppercase hover:border-slate-600 transition-all duration-300">
                  Available for opportunities
                </div>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tight">
                <span className="block">Mutiu Ridwan</span>
                <span className="block bg-gradient-to-r from-emerald-400 via-green-400 to-slate-300 bg-clip-text text-transparent">Adeyinka</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-4 font-medium">
                Full Stack Developer & Problem Solver
              </p>
              
              <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                I craft high-performance web and mobile applications using React.js, React Native, and Next.js. Specialized in building scalable solutions that drive business growth and enhance user experience.
              </p>

              <div className="flex gap-4 justify-center flex-wrap mb-12">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-700 rounded-lg hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 flex items-center gap-2 font-semibold hover:scale-105 active:scale-95"
                >
                  View My Work 
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-4 border-2 border-slate-400 rounded-lg hover:bg-slate-800 hover:border-emerald-500 transition-all duration-300 font-semibold hover:scale-105 active:scale-95"
                >
                  Get In Touch
                </button>
              </div>
              
              <div className="flex gap-6 justify-center">
                {[
                  {icon: Github, url: 'https://github.com/depriceless', label: 'GitHub'},
                  {icon: Linkedin, url: '#', label: 'LinkedIn'},
                  {icon: Mail, url: 'mailto:mutiuridwan0@gmail.com', label: 'Email'}
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                    className="p-4 bg-slate-800/50 rounded-lg hover:bg-blue-500/20 hover:scale-125 transition-all duration-300 border border-slate-700 hover:border-blue-500 group"
                  >
                    <social.icon size={24} className="group-hover:rotate-12 transition-transform duration-300" />
                  </a>
                ))}
              </div>

              <div className="mt-16 animate-bounce" style={{animationDuration: '2s'}}>
                <ChevronDown size={32} className="mx-auto text-blue-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className={`py-20 px-6 bg-slate-900/50 transition-all duration-1000 ${visibleSections.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">About Me</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`relative group transition-all duration-1000 ${visibleSections.about ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 flex items-center justify-center border-2 border-slate-700 overflow-hidden group-hover:border-transparent transition-all duration-500 group-hover:scale-105">
                <img 
                  src="https://i.imgur.com/n9I3Y9h.jpeg" 
                  alt="Mutiu Ridwan Adeyinka" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            
            <div className={`space-y-6 transition-all duration-1000 ${visibleSections.about ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
              <div className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/60 transition-all duration-300 border border-slate-700 hover:border-blue-500/50 cursor-pointer hover:translate-x-2 group">
                <MapPin className="text-blue-400 mt-1 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" size={20} />
                <div>
                  <p className="text-slate-300 font-semibold">Ibadan, Oyo State</p>
                  <p className="text-slate-400">Nigeria</p>
                </div>
              </div>
              
              <p className="text-lg text-slate-300 leading-relaxed hover:text-slate-200 transition-colors duration-300">
                Results-driven Full Stack Developer with proven expertise building scalable, high-performance applications. Specialized in React.js, React Native, and Next.js with demonstrated success in fintech, e-commerce, and SaaS.
              </p>
              
              <p className="text-lg text-slate-300 leading-relaxed hover:text-slate-200 transition-colors duration-300">
                I'm passionate about creating intuitive, user-centric solutions that solve real business problems. Strong background in clean code practices, agile development, and cross-functional collaboration.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl border border-blue-500/20 hover:border-blue-500/50 hover:scale-110 transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-blue-500/20">
                  <div className="text-4xl font-bold text-blue-400 mb-2">10+</div>
                  <div className="text-slate-400">Projects Delivered</div>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl border border-purple-500/20 hover:border-purple-500/50 hover:scale-110 transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-purple-500/20">
                  <div className="text-4xl font-bold text-purple-400 mb-2">100%</div>
                  <div className="text-slate-400">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className={`py-20 px-6 transition-all duration-1000 ${visibleSections.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Services</h2>
            <p className="text-slate-400 text-lg">Professional solutions tailored to your project needs</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 group cursor-pointer flex flex-col"
              >
                <div className="w-12 h-12 bg-slate-800/50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-all duration-300">
                  <div className="text-slate-400 group-hover:text-blue-400 transition-colors">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-slate-400 mb-4 text-sm leading-relaxed flex-grow">
                  {service.description}
                </p>
                <div className="space-y-2 mb-4">
                  {service.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-300 group-hover:text-slate-200 transition-colors">
                      <CheckCircle size={16} className="text-green-400 group-hover:scale-125 transition-transform" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
                <div className="text-blue-400 font-semibold text-sm">Starting at {service.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className={`py-20 px-6 bg-slate-900/50 transition-all duration-1000 ${visibleSections.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
            <p className="text-slate-400 text-lg mb-8">Production-ready applications built for real clients</p>
            
            <div className="flex justify-center gap-4 flex-wrap">
              {['all', 'fullstack', 'frontend', 'mobile'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-slate-800 text-slate-400 hover:text-white hover:border-blue-500 border border-slate-700'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
                className={`group bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer flex flex-col ${hoveredProject === index ? 'ring-2 ring-blue-500/50' : ''}`}
              >
                <div className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden group-hover:scale-110 transition-transform duration-500`}>
                  {project.image && (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300 flex items-center gap-2">
                    {project.title}
                    <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </h3>
                  
                  <div className="flex gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded font-semibold">{project.type}</span>
                    {project.metrics && Object.entries(project.metrics).map(([key, value]) => (
                      <span key={key} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded">{value}</span>
                    ))}
                  </div>
                  
                  <p className="text-slate-400 mb-4 text-sm leading-relaxed group-hover:text-slate-300 transition-colors flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-slate-300 mb-2">Key Features:</p>
                    <div className="space-y-1">
                      {project.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-300 transition-colors group-hover:translate-x-1 duration-300">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs text-blue-400 hover:bg-blue-500/30 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    {project.link && (
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium group/link hover:translate-x-1 transition-transform duration-300"
                      >
                        <ExternalLink size={16} /> Live
                      </a>
                    )}
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium group/link hover:translate-x-1 transition-transform duration-300"
                    >
                      <Github size={16} /> Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className={`py-20 px-6 transition-all duration-1000 ${visibleSections.experience ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Experience</h2>
          
          <div className="space-y-8">
            {experience.map((job, index) => (
              <div key={index} className="group p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="flex items-start gap-4 mb-4">
                  <Briefcase className="text-blue-400 mt-1 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" size={24} />
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{job.position}</h3>
                    <p className="text-slate-400">{job.company}</p>
                    <p className="text-sm text-slate-500">{job.duration}</p>
                  </div>
                </div>
                
                <ul className="space-y-2 ml-10">
                  {job.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 group-hover:text-slate-200 transition-colors">
                      <TrendingUp size={16} className="text-green-400 mt-1 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className={`py-20 px-6 bg-slate-900/50 transition-all duration-1000 ${visibleSections.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">What Clients Say</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-8 bg-slate-900 rounded-xl border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-400 text-yellow-400 group-hover:scale-125 transition-transform" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 text-lg leading-relaxed italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4 border-t border-slate-700 pt-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className={`py-20 px-6 transition-all duration-1000 ${visibleSections.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Technical Skills</h2>
            <p className="text-slate-400 text-lg">Technologies and tools I work with daily</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skills).map(([category, skillList], index) => (
              <div
                key={index}
                className="p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-purple-500/50 transition-all duration-300 hover:bg-slate-800/50 hover:scale-105 group cursor-pointer"
              >
                <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-400 transition-all duration-300">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {skillList.map((skill, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300 hover:text-slate-100 transition-colors duration-200 group/skill cursor-pointer hover:translate-x-2 duration-300">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full group-hover/skill:scale-150 transition-transform duration-300"></div>
                      <span className="text-sm">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className={`py-20 px-6 bg-slate-900/50 transition-all duration-1000 ${visibleSections.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Collaborate</h2>
            <p className="text-slate-400 text-lg">I'm open to freelance projects, full-time opportunities, and consulting</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <a 
              href="mailto:mutiuridwan0@gmail.com"
              className="p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 group cursor-pointer"
            >
              <Mail className="mx-auto mb-4 text-blue-400 group-hover:scale-125 group-hover:text-blue-300 transition-all duration-300 group-hover:-translate-y-2" size={32} />
              <h3 className="font-bold mb-2 text-center group-hover:text-blue-400 transition-colors">Email</h3>
              <p className="text-slate-400 text-sm text-center break-all group-hover:text-slate-300 transition-colors">mutiuridwan0@gmail.com</p>
            </a>
            
            <a 
              href="tel:08141900468"
              className="p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 group cursor-pointer"
            >
              <Phone className="mx-auto mb-4 text-blue-400 group-hover:scale-125 group-hover:text-blue-300 transition-all duration-300 group-hover:-translate-y-2" size={32} />
              <h3 className="font-bold mb-2 text-center group-hover:text-blue-400 transition-colors">Phone</h3>
              <p className="text-slate-400 text-sm text-center group-hover:text-slate-300 transition-colors">+234 814 190 0468</p>
            </a>
            
            <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 group cursor-pointer">
              <MapPin className="mx-auto mb-4 text-blue-400 group-hover:scale-125 group-hover:text-blue-300 transition-all duration-300 group-hover:-translate-y-2" size={32} />
              <h3 className="font-bold mb-2 text-center group-hover:text-blue-400 transition-colors">Location</h3>
              <p className="text-slate-400 text-sm text-center group-hover:text-slate-300 transition-colors">Ibadan, Nigeria</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
            <h3 className="text-2xl font-bold mb-6 text-center hover:text-blue-400 transition-colors">Ready to start something amazing?</h3>
            <p className="text-slate-300 text-center mb-8 hover:text-slate-200 transition-colors leading-relaxed">
              Whether you need a web application, mobile app, full-stack solution, or consulting services, I'm ready to bring your vision to life with quality code and professional service.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a 
                href="mailto:mutiuridwan0@gmail.com"
                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 font-semibold hover:scale-105 active:scale-95 inline-flex items-center gap-2"
              >
                Send Email
                <Mail size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="https://github.com/depriceless"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-slate-600 rounded-lg hover:bg-slate-800 hover:border-blue-500 transition-all duration-300 font-semibold hover:scale-105 active:scale-95 inline-flex items-center gap-2 group"
              >
                GitHub Profile
                <Github size={18} className="group-hover:rotate-12 transition-transform" />
              </a>
            </div>
          </div>

          <div className="mt-12 p-6 bg-slate-800/30 rounded-lg border border-slate-700 text-center">
            <p className="text-slate-400">
              <span className="font-semibold text-blue-400">Quick Response:</span> I typically respond to inquiries within 24 hours
            </p>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-slate-800 hover:border-slate-700 transition-colors bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-slate-400 text-sm hover:text-slate-300 transition-colors font-semibold">
                © 2025 Mutiu Ridwan Adeyinka. All rights reserved.
              </p>
              <p className="text-slate-500 text-xs mt-1">Crafted with attention to detail and modern web technologies</p>
            </div>
            <div className="flex gap-6">
              <a href="https://github.com/depriceless" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-all duration-300 hover:scale-125 hover:-translate-y-1">
                <Github size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-all duration-300 hover:scale-125 hover:-translate-y-1">
                <Linkedin size={20} />
              </a>
              <a href="mailto:mutiuridwan0@gmail.com" className="text-slate-400 hover:text-blue-400 transition-all duration-300 hover:scale-125 hover:-translate-y-1">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}