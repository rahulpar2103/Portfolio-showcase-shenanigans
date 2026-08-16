import React, { useEffect } from 'react';
import './Projects.css';

const Projects = () => {
  const projectsData = [
    {
      title: 'SupportFlow',
      isFlagship: true,
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
      title: 'ELEO — ECE Labs Chatbot',
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
      title: 'GitDash — GitHub Activity Dashboard',
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
      title: 'YOLOPX Adaptive Inference',
      isResearch: true,
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
    const items = document.querySelectorAll('.project-card');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      items.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, []);

  return (
    <div className='projects-container'>
      <h2>Projects</h2>
      <div className='projects-grid'>
        {projectsData.map((project, index) => (
          <div key={index} className={`project-card ${project.isFlagship ? 'flagship' : ''}`}>
            <div className='project-card-header'>
              <h3>{project.title}</h3>
              {project.isFlagship && <span className='badge flagship-badge'>Flagship Project</span>}
              {project.isResearch && <span className='badge research-badge'>Research</span>}
            </div>

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
        ))}
      </div>
    </div>
  );
};

export default Projects;
