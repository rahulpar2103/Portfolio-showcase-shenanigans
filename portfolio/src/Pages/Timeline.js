import React, { useEffect } from 'react';
import './Timeline.css';

const Timeline = () => {
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
  
    const observeItems = () => {
      items.forEach((item) => {
        observer.observe(item);
      });
    };
  
    observeItems();
  
    const handleResize = () => {
      observeItems();
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      items.forEach((item) => {
        observer.unobserve(item);
      });
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='timeline-container'>
      <h1>My Educational Journey</h1>
      <div className='timeline'>
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
    </div>
  );
};

export default Timeline;
