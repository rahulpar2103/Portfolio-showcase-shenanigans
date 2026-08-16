import React, { useEffect, useRef } from 'react';
import './Timeline.css';

const Timeline = () => {
  const timelineRef = useRef(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const educationData = [
    {
      year: '2021-2025',
      institution: 'Jaypee Institute of Information Technology (JIIT), Noida',
      description: 'B.Tech in Computer Science Engineering.',
    },
    {
      year: '2025',
      institution: 'GATE CS 2025',
      description: 'Scored 503, securing direct admission to M.Tech at IIIT Delhi.',
    },
    {
      year: '2025-2027',
      institution: 'IIIT Delhi',
      description: 'M.Tech in Computer Science Engineering.',
    },
  ];

  useEffect(() => {
    const items = document.querySelectorAll('.timeline-item');
  
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
    if (!timelineRef.current) return;
    isDownRef.current = true;
    startXRef.current = e.pageX - timelineRef.current.offsetLeft;
    scrollLeftRef.current = timelineRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDownRef.current = false;
  };

  const handleMouseUp = () => {
    isDownRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDownRef.current || !timelineRef.current) return;
    e.preventDefault();
    const x = e.pageX - timelineRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    timelineRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  return (
    <div className='timeline-container'>
      <h1>My Educational Journey</h1>
      <div 
        className='timeline' 
        ref={timelineRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {educationData.map((item, index) => (
          <div key={index} className='timeline-item'>
            <div className='timeline-content'>
              <h2>{item.year}</h2>
              <h3>{item.institution}</h3>
              <p>{item.description}</p>
            </div>
            <div className='timeline-dot'></div>
          </div>
        ))}
      </div>
      <div className='timeline-scroll-hint'>
        <span>‹ Drag or scroll horizontally ›</span>
      </div>
    </div>
  );
};

export default Timeline;
