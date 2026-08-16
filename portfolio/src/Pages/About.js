import React, { useEffect, useState } from 'react'
import './About.css'
import doodleImage from './my_images/random(1).jpg'

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const createStars = () => {
      const stars = document.querySelector('.stars')
      const starCount = 50

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div')
        star.className = 'star'
        star.style.setProperty(
          '--star-tail-length',
          `${6 + Math.random() * 3}em`
        )
        star.style.setProperty('--top-offset', `${Math.random() * 100}%`)
        star.style.setProperty('--fall-duration', `${Math.random() * 6 + 6}s`)
        star.style.setProperty('--fall-delay', `${Math.random() * 10}s`)
        stars.appendChild(star)
      }
    }

    createStars()

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const aboutSection = document.querySelector('.about-container');
      const aboutSectionPosition = aboutSection.offsetTop;

      if (scrollPosition > aboutSectionPosition - window.innerHeight / 2) {
        setIsVisible(true);
      }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check visibility on initial load
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  return (
    <div className='about-container'>
      <div className='photo-section'>
        <div className='stars'></div>
        <div className={`image-container ${isVisible ? 'visible' : ''}`}>
          <img src={doodleImage} alt="Doodle" className='profile-image' />
          <div className='name'>Rahul Pardasani</div>
        </div>
      </div>
      <div className='text-section'>
        <div className={`greeting ${isVisible ? 'visible' : ''}`}>
          Su Swagatam
          <hr />
        </div>
        <div className={`text ${isVisible ? 'visible' : ''}`}>
          M.Tech CSE student at IIIT Delhi (GATE CS 2025, scored 503), previously B.Tech CSE at JIIT Noida. I build backend systems, most recently SupportFlow, a production-deployed FastAPI ticketing platform with role-based access control, a RAG chatbot, real-time WebSocket notifications, and a 214-test CI/CD pipeline. Comfortable across the stack: FastAPI, PostgreSQL, Redis, Celery, Docker, AWS, and React on the frontend when needed.
        </div>
      </div>
    </div>
  )
}

export default About