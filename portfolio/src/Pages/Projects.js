import React, { useState, useEffect } from 'react';
import './Projects.css';

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const projectsData = [
    {
      id: '01',
      title: 'SupportFlow',
      isFlagship: true,
      subtitle: 'Production-Deployed Ticketing Platform',
      tags: ['FastAPI', 'PostgreSQL', 'pgvector', 'Redis', 'Celery', 'SQLAlchemy', 'React 19'],
      bullets: [
        'RBAC across Admin/Agent/Employee roles with JWT auth and per-endpoint rate limiting',
        'RAG chatbot (pgvector plus Gemini 2.5 Flash) with role-scoped retrieval',
        'Redis caching with prefix-based invalidation, SLA management with priority deadlines',
        'S3 file uploads, async email via Celery plus AWS SES, full audit logging',
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
      title: 'ELEO — ECE Labs Chatbot',
      subtitle: 'RAG Chatbot & CMS for IIIT Delhi',
      tags: ['LangGraph', 'FAISS', 'Gemini', 'FastAPI'],
      bullets: [
        'RAG chatbot for IIIT Delhi\'s ECE Labs website, orchestrated with LangGraph plus FAISS retrieval, Gemini fallback chain for reliability',
        'Rebuilt the ECE Labs website (7 lab pages) as a JSON-driven CMS so non-technical staff can update content without touching code',
        'Automated daily knowledge base refresh (Celery Beat), per-session rate limiting',
      ],
      links: [
        { label: 'Backend', url: 'https://github.com/rahulpar2103/ELEO-IIITD-chatbot' },
        { label: 'Frontend/Site', url: 'https://github.com/rahulpar2103/IIITD-ECE-website' },
      ],
    },
    {
      id: '03',
      title: 'GitDash — Activity Dashboard',
      subtitle: 'Real-Time Multi-User GitHub Monitoring',
      tags: ['FastAPI', 'WebSockets', 'Redis Pub/Sub', 'OAuth 2.0'],
      bullets: [
        'Real-time GitHub activity dashboard: FastAPI plus WebSocket backend, JWT and GitHub OAuth 2.0 login',
        'Celery Beat polling pipeline with event ID watermarking pushing live updates via Redis Pub/Sub every 10 seconds',
        'Per-repo WebSocket channels with Redis reference counting for automatic cleanup and multi-user tracking',
      ],
      links: [
        { label: 'Backend', url: 'https://github.com/rahulpar2103/Github-Dashboard-Backend' },
        { label: 'Frontend', url: 'https://github.com/rahulpar2103/Github-Dashboard-Frontend' },
      ],
    },
    {
      id: '04',
      title: 'YOLOPX Adaptive Inference',
      isResearch: true,
      subtitle: 'Frame-Skip Optimization for Computer Vision',
      tags: ['PyTorch', 'OpenCV', 'YOLOPX'],
      bullets: [
        'Adaptive frame-skip inference pipeline for a YOLOPX lane detection model',
        'Leakage-free pipeline using pixel-diff and detection-confidence signals, 0.58 dilated IoU baseline across 7,988 dashcam frames',
        'Benchmarked 3 keyframe-skipping strategies across 36 configurations, up to 5x inference compute reduction with IoU degradation under 3%',
      ],
      note: 'Ongoing Coursework Project',
      links: [],
    },
  ];

  useEffect(() => {
    const rail = document.querySelector('.projects-spotlight-rail');
    if (!rail) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            rail.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(rail);

    return () => {
      observer.unobserve(rail);
    };
  }, []);

  return (
    <div className='projects-container'>
      <div className='projects-header-group'>
        <h2>Featured Projects</h2>
        <p className='projects-instruction'>Hover over any vertical bar to expand its spotlight</p>
      </div>

      <div 
        className={`projects-spotlight-rail ${activeIndex !== null ? 'has-active' : 'all-closed'}`}
        onMouseLeave={() => setActiveIndex(null)}
      >
        {projectsData.map((project, index) => {
          const isExpanded = activeIndex === index;
          return (
            <div
              key={index}
              className={`spotlight-bar ${isExpanded ? 'expanded' : 'collapsed'} ${
                project.isFlagship ? 'flagship' : ''
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(isExpanded ? null : index)}
            >
              {/* Collapsed Vertical Bar View */}
              <div className='collapsed-view'>
                <span className='bar-id'>{project.id}</span>
                <div className='bar-title-wrapper'>
                  <span className='bar-title'>{project.title}</span>
                </div>
                {project.isFlagship && <span className='bar-mini-badge flagship'>Flagship</span>}
                {project.isResearch && <span className='bar-mini-badge research'>Research</span>}
              </div>

              {/* Expanded Spotlight Content View */}
              <div className='expanded-view'>
                <div className='spotlight-card-header'>
                  <div className='title-group'>
                    <span className='project-number'>{project.id}</span>
                    <h3>{project.title}</h3>
                  </div>
                  <div className='badge-group'>
                    {project.isFlagship && <span className='badge flagship-badge'>Flagship</span>}
                    {project.isResearch && <span className='badge research-badge'>Research</span>}
                  </div>
                </div>

                <p className='project-subtitle'>{project.subtitle}</p>

                <div className='project-tags'>
                  {project.tags.map((tag, tIndex) => (
                    <span key={tIndex} className='tag'>{tag}</span>
                  ))}
                </div>

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
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
