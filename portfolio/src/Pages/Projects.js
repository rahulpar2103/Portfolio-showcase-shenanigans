import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const railRef = useRef(null);

  const projectsData = [
    {
      id: '01',
      title: 'SupportFlow',
      isFlagship: true,
      subtitle: 'Production-Deployed Ticketing Platform',
      tags: ['FastAPI', 'PostgreSQL', 'pgvector', 'Redis', 'Celery', 'SQLAlchemy'],
      bullets: [
        'RBAC across Admin/Agent/Employee roles with JWT auth and per-endpoint rate limiting',
        'RAG chatbot (pgvector + Gemini 2.5 Flash) with role-scoped retrieval',
        'Redis caching with prefix-based invalidation, SLA management with priority deadlines',
        'CI/CD via GitHub Actions running 214 pytest tests per push, real-time WebSocket notifications',
      ],
      links: [
        { label: 'Live Demo', url: 'https://ticketing-system-frontend-lilac.vercel.app/' },
        { label: 'Backend', url: 'https://github.com/rahulpar2103/Ticketing_System_Backend' },
        { label: 'Frontend', url: 'https://github.com/rahulpar2103/Ticketing_System_Frontend' },
      ],
    },
    {
      id: '02',
      title: 'ELEO — ECE Chatbot',
      subtitle: 'RAG Chatbot & CMS for IIIT Delhi',
      tags: ['LangGraph', 'FAISS', 'Gemini', 'FastAPI', 'Celery'],
      bullets: [
        'RAG chatbot for IIIT Delhi\'s ECE Labs website, LangGraph + FAISS retrieval, Gemini fallback chain',
        'Rebuilt the ECE Labs website (7 lab pages) as a JSON-driven CMS for non-technical staff',
        'Automated daily knowledge base refresh (Celery Beat), per-session rate limiting',
      ],
      links: [
        { label: 'Backend', url: 'https://github.com/rahulpar2103/ELEO-IIITD-chatbot' },
        { label: 'Frontend/Site', url: 'https://github.com/rahulpar2103/IIITD-ECE-website' },
      ],
    },
    {
      id: '03',
      title: 'GitDash Dashboard',
      subtitle: 'Real-Time Multi-User GitHub Monitoring',
      tags: ['FastAPI', 'WebSockets', 'Redis Pub/Sub', 'OAuth 2.0'],
      bullets: [
        'Real-time GitHub activity dashboard: FastAPI + WebSocket backend, JWT & GitHub OAuth 2.0 login',
        'Celery Beat polling pipeline pushing live updates via Redis Pub/Sub every 10 seconds',
        'Per-repo WebSocket channels with Redis reference counting for automatic cleanup',
      ],
      links: [
        { label: 'Backend', url: 'https://github.com/rahulpar2103/Github-Dashboard-Backend' },
        { label: 'Frontend', url: 'https://github.com/rahulpar2103/Github-Dashboard-Frontend' },
      ],
    },
    {
      id: '04',
      title: 'YOLOPX Inference',
      isResearch: true,
      subtitle: 'Frame-Skip Optimization for CV',
      tags: ['PyTorch', 'OpenCV', 'YOLOPX', 'Python'],
      bullets: [
        'Adaptive frame-skip inference pipeline for a YOLOPX lane detection model',
        'Leakage-free pipeline using pixel-diff and detection-confidence signals',
        'Benchmarked 36 configurations, up to 5× compute reduction with <3% IoU degradation',
      ],
      note: 'Ongoing Coursework Project',
      links: [],
    },
  ];

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className='projects-container'>
      <div className='projects-header-group'>
        <h2>Featured Projects</h2>
        <p className='projects-instruction'>Hover a card to see full details</p>
      </div>

      <div
        ref={railRef}
        className={`projects-spotlight-rail${isVisible ? ' animate' : ''}`}
        onMouseLeave={() => setActiveIndex(null)}
      >
        {projectsData.map((project, index) => {
          const isExpanded = activeIndex === index;
          return (
            <div
              key={index}
              className={`spotlight-bar${isExpanded ? ' expanded' : ' collapsed'}${project.isFlagship ? ' flagship' : ''}`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(isExpanded ? null : index)}
            >
              {/* CENTER-ALIGNED Header */}
              <div className='bar-header'>
                <div className='bar-top-row'>
                  <span className='bar-number'>{project.id}</span>
                  <h3 className='bar-title'>{project.title}</h3>
                  {project.isFlagship && <span className='bar-badge flagship'>Flagship</span>}
                  {project.isResearch && <span className='bar-badge research'>Research</span>}
                </div>
                <p className='bar-subtitle'>{project.subtitle}</p>
              </div>

              <div className='bar-divider' />

              {/* Tags – always visible, centered */}
              <div className='bar-tags'>
                {project.tags.map((tag, tIndex) => (
                  <span key={tIndex} className='tag'>{tag}</span>
                ))}
              </div>

              {/* Details – only rendered (no space) when expanded */}
              {isExpanded && (
                <div className='bar-details'>
                  <ul className='project-bullets'>
                    {project.bullets.map((bullet, bIndex) => (
                      <li key={bIndex}>{bullet}</li>
                    ))}
                  </ul>

                  {project.note && <p className='project-note'>{project.note}</p>}

                  {project.links.length > 0 && (
                    <div className='project-links'>
                      {project.links.map((link, lIndex) => (
                        <a
                          key={lIndex}
                          href={link.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='project-link-btn'
                          onClick={(e) => e.stopPropagation()}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
