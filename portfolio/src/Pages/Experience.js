import React, { useEffect, useRef } from 'react';
import './Experience.css';

const Experience = () => {
  const expRef = useRef(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const experienceData = [
    {
      company: 'IIIT Delhi',
      role: 'Teaching Assistant, ECE Labs',
      duration: 'June 2026 – Present',
      description: 'Rebuilding the ECE Labs website as a JSON-driven CMS and developing ELEO, a RAG chatbot for the site. Working in a 3-member team with weekly syncs with faculty supervisor.',
    },
  ];

  useEffect(() => {
    const items = document.querySelectorAll('.exp-item');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          } else {
            entry.target.classList.remove('show');
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

  const handleMouseDown = (e) => {
    if (!expRef.current) return;
    isDownRef.current = true;
    startXRef.current = e.pageX - expRef.current.offsetLeft;
    scrollLeftRef.current = expRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDownRef.current = false;
  };

  const handleMouseUp = () => {
    isDownRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDownRef.current || !expRef.current) return;
    e.preventDefault();
    const x = e.pageX - expRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    expRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  return (
    <div className='exp-container'>
      <h1>Work Experience</h1>
      <div 
        className='exp-timeline'
        ref={expRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {experienceData.map((item, index) => (
          <div key={index} className='exp-item'>
            <div className='exp-content'>
              <h2>{item.duration}</h2>
              <h3>{item.company} — {item.role}</h3>
              <p>{item.description}</p>
            </div>
            <div className='exp-dot'></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
