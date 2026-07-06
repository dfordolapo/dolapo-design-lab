import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useSoundEffects from '../hooks/useSoundEffects'

export default function FloatingCTA() {
  const [isExpanded, setIsExpanded] = useState(true)
  const { playHover, playClick } = useSoundEffects()
  const timeoutRef = useRef(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down
        setIsExpanded(false)
      } else {
        // Scrolling up
        setIsExpanded(true)
      }
      
      lastScrollY.current = currentScrollY

      // Reset inactivity timer
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setIsExpanded(true)
      }, 2000) // 2 seconds of inactivity expands it
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Initial timer
    timeoutRef.current = setTimeout(() => {
      setIsExpanded(true)
    }, 2000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleClick = (e) => {
    playClick()
    window.history.pushState({}, '', '/book')
    window.dispatchEvent(new Event('popstate'))
  }

  return (
    <motion.button
      className="floating-cta"
      onClick={handleClick}
      onMouseEnter={playHover}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
    >
      <div className="floating-cta__glow"></div>
      <div className="floating-cta__content">
        <svg 
          className="floating-cta__icon" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <AnimatePresence>
          {isExpanded && (
            <motion.span 
              className="floating-cta__text"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              Book a Session
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  )
}
