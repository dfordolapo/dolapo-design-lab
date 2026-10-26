import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import useSoundEffects from '../hooks/useSoundEffects'

/**
 * Editorial Scrapbook with loose photographs and tape labels.
 * Each item is a photo with a small washi tape strip showing a very short description (3-4 words).
 * Sits directly on the website background with no separate container box.
 */
const DESKTOP_PHOTOS = [
  {
    id: 'photo-1',
    image: '/assets/inspired-cinema-film.jpg',
    tapeText: 'Lagos cinema on 35mm',
    alt: 'Vintage 35mm camera with glowing film strips, Lagos cinema ticket stubs and film canisters',
    initialX: 10,
    initialY: 15,
    initialRotate: -5.2,
    width: 220,
    aspect: '4/3',
    tapePos: 'top-left',
    baseZ: 2,
    staggerDelay: 0.1
  },
  {
    id: 'photo-2',
    image: '/assets/inspired-food-suya.jpg',
    tapeText: 'Suya, spice & plantains',
    alt: 'Sizzling Nigerian suya skewers with yaji spice, fried dodo plantains and red onions',
    initialX: 235,
    initialY: 35,
    initialRotate: 3.8,
    width: 225,
    aspect: '4/3',
    tapePos: 'top-center',
    baseZ: 3,
    staggerDelay: 0.2
  },
  {
    id: 'photo-3',
    image: '/assets/inspired-vinyl-music.jpg',
    tapeText: 'Analog Afrobeat vinyl spins',
    alt: 'Walnut turntable playing 1970s Afrobeat and Highlife vinyl record with album sleeve',
    initialX: 470,
    initialY: 8,
    initialRotate: -3.4,
    width: 220,
    aspect: '4/3',
    tapePos: 'top-right',
    baseZ: 4,
    staggerDelay: 0.28
  },
  {
    id: 'photo-4',
    image: '/assets/inspired-coastal-travel.jpg',
    tapeText: 'Tarkwa Bay ocean breeze',
    alt: 'Tarkwa Bay beach travel still life with woven raffia bag, fresh coconut, and travel journal',
    initialX: 35,
    initialY: 235,
    initialRotate: 4.6,
    width: 215,
    aspect: '4/3',
    tapePos: 'bottom-center',
    baseZ: 3,
    staggerDelay: 0.36
  },
  {
    id: 'photo-5',
    image: '/assets/inspired-architecture-terracotta.jpg',
    tapeText: 'Terracotta & courtyard light',
    alt: 'Afro-modernist courtyard with terracotta breeze block screens and tropical palms in Lagos',
    initialX: 255,
    initialY: 195,
    initialRotate: -4.5,
    width: 235,
    aspect: '4/3',
    tapePos: 'top-center',
    baseZ: 5,
    staggerDelay: 0.44
  },
  {
    id: 'photo-6',
    image: '/assets/inspired-midnight-notebook.jpg',
    tapeText: 'Midnight sparks & ink',
    alt: 'Artist desk in Lagos loft with steaming coffee, open sketch journal, brass lamp, and night city skyline',
    initialX: 490,
    initialY: 240,
    initialRotate: 3.6,
    width: 215,
    aspect: '4/3',
    tapePos: 'top-left',
    baseZ: 4,
    staggerDelay: 0.52
  }
]

const MOBILE_PHOTOS = [
  {
    id: 'photo-1',
    image: '/assets/inspired-cinema-film.jpg',
    tapeText: 'Lagos cinema on 35mm',
    alt: 'Vintage 35mm camera with glowing film strips and Lagos cinema ticket stubs',
    initialX: 10,
    initialY: 10,
    initialRotate: -4.5,
    width: 175,
    aspect: '4/3',
    tapePos: 'top-left',
    baseZ: 2,
    staggerDelay: 0.1
  },
  {
    id: 'photo-2',
    image: '/assets/inspired-food-suya.jpg',
    tapeText: 'Suya, spice & dodo',
    alt: 'Artisanal Nigerian suya skewers with yaji spice and fried dodo plantains',
    initialX: 160,
    initialY: 35,
    initialRotate: 4.2,
    width: 175,
    aspect: '4/3',
    tapePos: 'top-right',
    baseZ: 3,
    staggerDelay: 0.2
  },
  {
    id: 'photo-3',
    image: '/assets/inspired-vinyl-music.jpg',
    tapeText: 'Analog Afrobeat spins',
    alt: 'Walnut turntable playing 1970s Afrobeat and Highlife vinyl record',
    initialX: 15,
    initialY: 195,
    initialRotate: 3.5,
    width: 175,
    aspect: '4/3',
    tapePos: 'top-center',
    baseZ: 4,
    staggerDelay: 0.3
  },
  {
    id: 'photo-4',
    image: '/assets/inspired-coastal-travel.jpg',
    tapeText: 'Tarkwa Bay breeze',
    alt: 'Tarkwa Bay beach travel still life with woven raffia bag and fresh coconut',
    initialX: 165,
    initialY: 180,
    initialRotate: -4.8,
    width: 175,
    aspect: '4/3',
    tapePos: 'top-right',
    baseZ: 4,
    staggerDelay: 0.4
  },
  {
    id: 'photo-5',
    image: '/assets/inspired-architecture-terracotta.jpg',
    tapeText: 'Terracotta courtyard light',
    alt: 'Afro-modernist courtyard with terracotta breeze block screens and tropical palms',
    initialX: 10,
    initialY: 375,
    initialRotate: -3.8,
    width: 175,
    aspect: '4/3',
    tapePos: 'top-left',
    baseZ: 5,
    staggerDelay: 0.5
  },
  {
    id: 'photo-6',
    image: '/assets/inspired-midnight-notebook.jpg',
    tapeText: 'Midnight sparks & ink',
    alt: 'Artist desk in Lagos loft with steaming coffee and open sketch journal',
    initialX: 160,
    initialY: 395,
    initialRotate: 4.5,
    width: 175,
    aspect: '4/3',
    tapePos: 'top-center',
    baseZ: 6,
    staggerDelay: 0.58
  }
]

export default function Scrapbook() {
  const stageRef = useRef(null)
  const { playClick, playHover } = useSoundEffects()
  const prefersReducedMotion = useReducedMotion()

  const [isMobile, setIsMobile] = useState(false)
  const [resetKey, setResetKey] = useState(0)
  const [hasEntered, setHasEntered] = useState(false)
  const [activeDragId, setActiveDragId] = useState(null)
  const [topZ, setTopZ] = useState(10)
  const [zOrder, setZOrder] = useState({})

  // Responsive breakpoint detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const currentItems = isMobile ? MOBILE_PHOTOS : DESKTOP_PHOTOS

  // Elevate active dragged photo to the top stacking order
  const bringToFront = useCallback((id) => {
    setTopZ((prev) => {
      const nextZ = prev + 1
      setZOrder((current) => ({
        ...current,
        [id]: nextZ
      }))
      return nextZ
    })
  }, [])

  const handleReset = () => {
    playClick()
    setZOrder({})
    setTopZ(10)
    setResetKey((k) => k + 1)
  }

  return (
    <div className="scrapbook-wrapper" aria-label="Interactive scrapbook collection">
      {/* Subtle header bar directly on the page background */}
      <div className="scrapbook-stage-header">
        <div className="scrapbook-hint">
          <span className="scrapbook-hint-dot" aria-hidden="true" />
          <span>Tap & drag photos to rearrange</span>
        </div>

        <button
          type="button"
          className="scrapbook-reset-btn"
          onClick={handleReset}
          onMouseEnter={playHover}
          title="Reset all photographs to their original positions"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          <span>Reset scrapbook</span>
        </button>
      </div>

      {/* Scrapbook stage sits directly on the page background with no container box */}
      <motion.div
        ref={stageRef}
        className="scrapbook-stage scrapbook-stage--seamless"
        onViewportEnter={() => setHasEntered(true)}
        viewport={{ once: true, amount: 0.15 }}
      >
        {currentItems.map((item) => {
          const itemZ = zOrder[item.id] || item.baseZ
          const isDragging = activeDragId === item.id

          return (
            <motion.div
              key={`${item.id}-${resetKey}`}
              className={`scrapbook-item scrapbook-item--photo ${isDragging ? 'is-dragging' : ''}`}
              style={{
                width: item.width,
                zIndex: itemZ,
                left: item.initialX,
                top: item.initialY
              }}
              // Staggered falling entrance animation
              initial={
                prefersReducedMotion || hasEntered
                  ? { opacity: 1, y: 0, rotate: item.initialRotate }
                  : { opacity: 0, y: -65, rotate: item.initialRotate + (Math.random() * 6 - 3) }
              }
              animate={{
                opacity: 1,
                y: 0,
                rotate: item.initialRotate,
                scale: isDragging ? 1.045 : 1
              }}
              transition={{
                type: 'spring',
                stiffness: 220,
                damping: 20,
                mass: 0.8,
                delay: prefersReducedMotion || hasEntered ? 0 : item.staggerDelay
              }}
              // Interactive dragging
              drag
              dragConstraints={stageRef}
              dragElastic={0.06}
              dragMomentum={false}
              onPointerDown={() => {
                bringToFront(item.id)
                playClick()
              }}
              onDragStart={() => {
                setActiveDragId(item.id)
                bringToFront(item.id)
              }}
              onDragEnd={() => {
                setActiveDragId(null)
              }}
              whileTap={{ scale: 1.025 }}
              tabIndex={0}
              role="region"
              aria-label={`Draggable photo: ${item.tapeText}`}
            >
              {/* Photo Frame with subtle print border */}
              <div className="scrapbook-photo-card">
                <div
                  className="scrapbook-photo-media"
                  style={{ aspectRatio: item.aspect || '4/3' }}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    draggable="false"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="scrapbook-photo-sheen" aria-hidden="true" />
                </div>
              </div>

              {/* Small washi tape with very short 3-4 word description */}
              <div className={`scrapbook-tape-strip scrapbook-tape-strip--${item.tapePos}`}>
                <span className="scrapbook-tape-caption">{item.tapeText}</span>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
