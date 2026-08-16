import React, { useState, useEffect, useCallback, useMemo } from 'react'
import './Home.css'

const SWIPE_THRESHOLD = 5
const CARD_COUNT = 5
const MAX_RADIUS = 200

const cardData = [
  { text: 'FastAPI', color: '#009688', contrastColor: '#E6F7F5', intro: 'Building Backends' },
  { text: 'PostgreSQL', color: '#336791', contrastColor: '#E7EDF3', intro: 'Modeling Data' },
  { text: 'Docker', color: '#2496ED', contrastColor: '#E6F3FD', intro: 'Shipping Containers' },
  { text: 'AWS', color: '#FF9900', contrastColor: '#FFF3E0', intro: 'Cloud Infrastructure' },
  { text: 'M.Tech @ IIITD', color: '#34495E', contrastColor: '#E8ECF0', intro: 'GATE CS 2025, Score 503' },
  { text: 'Product Builder', color: '#27AE60', contrastColor: '#E7F6EE', intro: 'Crafting Solutions' },
  { text: 'Music Lover', color: '#1DB954', contrastColor: '#E6F9EC', intro: 'Harmonizing Life' },
  { text: 'Guitar Player', color: '#D35400', contrastColor: '#FCE9E0', intro: 'Strumming Stories' },
  { text: 'Singer', color: '#9B59B6', contrastColor: '#F5EDF8', intro: 'Voicing Emotions' },
  { text: 'Astronomer', color: '#34495E', contrastColor: '#E8ECF0', intro: 'Stargazing Dreamer' },
  { text: 'Gamer', color: '#E74C3C', contrastColor: '#FCE9E7', intro: 'Digital Adventurer' },
  { text: 'Space Enthusiast', color: '#8E44AD', contrastColor: '#F3EAF7', intro: 'Exploring Cosmos' },
];

const generateRandomPosition = () => ({
  x: Math.random() * (40) - 40,
  y: Math.random() * (40) - 40,
  rotation: Math.random() * 5 - 30,
  scale: Math.random() * 0.1 + 0.95
})

const generateInitialPosition = () => {
  const directions = ['left', 'right', 'top', 'bottom'];
  const direction = directions[Math.floor(Math.random() * directions.length)];
  const offset = 1000 + Math.random() * 1000; // Random offset between 1000 and 1500
  switch (direction) {
    case 'left': return { x: -offset, y: 0 };
    case 'right': return { x: offset, y: 0 };
    case 'top': return { x: 0, y: -offset };
    case 'bottom': return { x: 0, y: offset };
    default: return { x: 0, y: 0 };
  }
};

const Home = () => {
  const [cardIndex, setCardIndex] = useState(0)
  const [cardPositions, setCardPositions] = useState(() =>
    Array(CARD_COUNT).fill().map(generateRandomPosition)
  )
  const [isDragging, setIsDragging] = useState(false)
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 })
  const [isLeaving, setIsLeaving] = useState(false)
  const [isReloading, setIsReloading] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState(
    cardData[0].contrastColor
  )
  const [introText, setIntroText] = useState(cardData[0].intro)
  const [autoThrowActive, setAutoThrowActive] = useState(true)
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)
  const [initialPositions] = useState(() =>
    Array(CARD_COUNT).fill().map(generateInitialPosition)
  )

  const resetCardPosition = useCallback(() => {
    setCurrentPosition({ x: 0, y: 0 })
  }, [])

  const throwCard = useCallback((fromAutoThrow = false) => {
    if (isLeaving || isReloading) return;

    setIsLeaving(true)
    let throwDistance, throwHeight;
    
    if (fromAutoThrow) {
      throwDistance = (Math.random() - 0.5) * 300;
      throwHeight = (Math.random() - 0.5) * 100;
      setCurrentPosition({ x: throwDistance, y: throwHeight });
    } else {
      throwDistance = currentPosition.x * 10;
      throwHeight = currentPosition.y * 3;
    }

    const finalPosition = {
      x: throwDistance,
      y: throwHeight
    }

    setTimeout(() => {
      setCurrentPosition(finalPosition)
    }, 50)

    setTimeout(() => {
      setIsReloading(true)
      setCardIndex(prevIndex => {
        const newIndex = (prevIndex + 1) % cardData.length
        setBackgroundColor(cardData[newIndex].contrastColor)
        setIntroText(cardData[newIndex].intro)
        return newIndex
      })
      setCardPositions(prevPositions => {
        const newPositions = [
          ...prevPositions.slice(1),
          generateRandomPosition()
        ]
        setIsLeaving(false)
        resetCardPosition()
        setTimeout(() => setIsReloading(false), 50)
        return newPositions
      })
    }, 300)
  }, [currentPosition, resetCardPosition, isLeaving, isReloading, setBackgroundColor])

  const handleStart = useCallback((clientX, clientY) => {
    setIsDragging(true)
    setStartPosition({ x: clientX, y: clientY })
    setCurrentPosition({ x: 0, y: 0 })
  }, [])

  const handleMove = useCallback(
    (clientX, clientY) => {
      if (!isDragging) return

      const deltaX = clientX - startPosition.x
      const deltaY = clientY - startPosition.y
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)

      if (distance <= MAX_RADIUS) {
        setCurrentPosition({ x: deltaX, y: deltaY })
      } else {
        const angle = Math.atan2(deltaY, deltaX)
        const constrainedX = Math.cos(angle) * MAX_RADIUS
        const constrainedY = Math.sin(angle) * MAX_RADIUS
        setCurrentPosition({ x: constrainedX, y: constrainedY })
      }
    },
    [isDragging, startPosition]
  )

  const handleEnd = useCallback(() => {
    if (isDragging) {
      const distance = Math.sqrt(
        currentPosition.x ** 2 + currentPosition.y ** 2
      )
      setIsDragging(false)
      if (distance > SWIPE_THRESHOLD) {
        throwCard()
      } else {
        resetCardPosition()
      }
    }
  }, [isDragging, currentPosition, throwCard, resetCardPosition])

  const autoThrow = useCallback(() => {
    if (!isDragging && !isLeaving && !isReloading) {
      throwCard(true);
    }
  }, [isDragging, isLeaving, isReloading, throwCard])

  useEffect(() => {
    let interval;
    if (autoThrowActive) {
      interval = setInterval(autoThrow, 3000);
    }
    return () => clearInterval(interval);
  }, [autoThrowActive, autoThrow]);

  useEffect(() => {
    const handleGlobalMouseMove = e =>
      isDragging && handleMove(e.clientX, e.clientY)
    const handleGlobalTouchMove = e => {
      if (isDragging) {
        e.preventDefault()
        handleMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    window.addEventListener('mousemove', handleGlobalMouseMove)
    window.addEventListener('touchmove', handleGlobalTouchMove, {
      passive: false
    })
    window.addEventListener('mouseup', handleEnd)
    window.addEventListener('touchend', handleEnd)

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove)
      window.removeEventListener('touchmove', handleGlobalTouchMove)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchend', handleEnd)
    }
  }, [isDragging, handleMove, handleEnd])

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoadComplete(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const cardElements = useMemo(
    () =>
      Array(CARD_COUNT)
        .fill()
        .map((_, index) => {
          const cardDataIndex = (cardIndex + index) % cardData.length;
          const { text, color } = cardData[cardDataIndex];
          const initialPosition = initialPositions[index];
          
          return (
            <div
              key={cardDataIndex}
              className={`card ${index === 0 ? 'top-card' : ''} ${
                index === 0 && isLeaving ? 'leaving' : ''
              } ${isReloading ? 'reloading' : ''} ${
                initialLoadComplete ? 'initial-load' : ''
              }`}
              onMouseDown={
                index === 0 ? e => handleStart(e.clientX, e.clientY) : undefined
              }
              onTouchStart={
                index === 0
                  ? e => handleStart(e.touches[0].clientX, e.touches[0].clientY)
                  : undefined
              }
              style={{
                transform: `
                  translate(${initialLoadComplete ? (index === 0 ? currentPosition.x : cardPositions[index].x) : initialPosition.x}px, 
                            ${initialLoadComplete ? (index === 0 ? currentPosition.y : cardPositions[index].y) : initialPosition.y}px)
                  rotate(${initialLoadComplete ? (index === 0 ? currentPosition.x * 0.1 : cardPositions[index].rotation) : 0}deg)
                  scale(${initialLoadComplete ? (1 - index * 0.05) * (cardPositions[index].scale || 1) : 1})
                `,
                transition: isDragging
                  ? 'none'
                  : `all ${0.5 + index * 0.1}s cubic-bezier(0.25, 0.1, 0.25, 1)`,
                opacity: isLeaving && index === 0 ? 0 : 1,
                zIndex: CARD_COUNT - index,
                top: initialLoadComplete ? `${index * 5}px` : '0px',
                backgroundColor: color,
                transitionDelay: !initialLoadComplete ? `${index * 0.1}s` : '0s',
              }}
            >
              <div className='card2'>{text}</div>
            </div>
          );
        }),
    [
      cardIndex,
      cardPositions,
      currentPosition,
      isDragging,
      isLeaving,
      isReloading,
      handleStart,
      initialLoadComplete,
      initialPositions,
    ]
  );

  return (
    <div className='home-container' style={{ backgroundColor }}>
      <div className='content-wrapper'>
        <div className='intro'>
          <span>{introText}</span>
        </div>
        <div className='cards-container'>
          {cardElements}
          <div className='card-instruction'>
            Psst! These cards aren't just eye candy. Give 'em a swipe and watch the magic unfold!
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home