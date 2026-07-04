import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ROLES } from '../utils/roles.jsx'
import TopBar from './TopBar'
import useSoundEffects from '../hooks/useSoundEffects'

const TILT_MAX_DEG = 8

export default function DepartmentSelect({ onSelect, onBack, onOpenAbout }) {
  const [entered, setEntered] = useState(false)
  const [selected, setSelected] = useState(null)
  const { playHover, playClick } = useSoundEffects()

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100)
    return () => clearTimeout(t)
  }, [])

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })
  const glowX = useTransform(springX, [0, 1], ['-10%', '10%'])
  const glowY = useTransform(springY, [0, 1], ['-10%', '10%'])
  const gridX = useTransform(springX, [0, 1], ['-1%', '1%'])
  const gridY = useTransform(springY, [0, 1], ['-1%', '1%'])

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      mouseX.set(e.clientX / window.innerWidth)
      mouseY.set(e.clientY / window.innerHeight)
    }
    
    const handleDeviceOrientation = (e) => {
      if (!e.beta || !e.gamma) return
      // beta is front-to-back tilt in [-180, 180], gamma is left-to-right in [-90, 90]
      // normalize roughly to [0, 1] for motion values
      const x = Math.min(Math.max((e.gamma + 45) / 90, 0), 1)
      const y = Math.min(Math.max((e.beta - 45 + 45) / 90, 0), 1)
      mouseX.set(x)
      mouseY.set(y)

      // Apply tilt to all cards globally for touch devices
      const rotateY = (x - 0.5) * TILT_MAX_DEG * 3
      const rotateX = (0.5 - y) * TILT_MAX_DEG * 3
      const container = document.querySelector('.dept-screen__cards')
      if (container) {
        Array.from(container.children).forEach(card => {
          card.style.setProperty('--tilt-x', `${rotateX}deg`)
          card.style.setProperty('--tilt-y', `${rotateY}deg`)
          card.style.setProperty('--spot-x', `${x * 100}%`)
          card.style.setProperty('--spot-y', `${y * 100}%`)
        })
      }
    }

    window.addEventListener('mousemove', handleGlobalMouseMove)
    window.addEventListener('deviceorientation', handleDeviceOrientation)
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove)
      window.removeEventListener('deviceorientation', handleDeviceOrientation)
    }
  }, [mouseX, mouseY])

  // Only enable pointer-tracking tilt for precise pointers (mouse/trackpad),
  // and skip it entirely if the person prefers reduced motion.
  const tiltEnabled = typeof window !== 'undefined'
    && window.matchMedia?.('(hover: hover) and (pointer: fine)').matches
    && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const handleCardMouseMove = (e) => {
    if (!tiltEnabled) return
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rotateY = (px - 0.5) * TILT_MAX_DEG * 2
    const rotateX = (0.5 - py) * TILT_MAX_DEG * 2
    card.style.setProperty('--tilt-x', `${rotateX}deg`)
    card.style.setProperty('--tilt-y', `${rotateY}deg`)
    card.style.setProperty('--spot-x', `${px * 100}%`)
    card.style.setProperty('--spot-y', `${py * 100}%`)
  }

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget
    card.style.setProperty('--tilt-x', '0deg')
    card.style.setProperty('--tilt-y', '0deg')
  }

  const handleSelect = (roleId) => {
    playClick()
    setSelected(roleId)
    if (onSelect) {
      setTimeout(() => {
        setEntered(false)
        setTimeout(() => onSelect(roleId), 300)
      }, 100)
    }
  }

  return (
    <div className="page-with-topbar">
      <TopBar onBack={onBack} />
      <div className={`dept-screen${entered ? ' dept-screen--entered' : ''}`}>
        <div className="dept-screen__bg">
          <motion.div className="dept-screen__grid" style={{ x: gridX, y: gridY }}></motion.div>
          <motion.div className="dept-screen__glow dept-screen__glow--1" style={{ x: glowX, y: glowY }}></motion.div>
          <div className="dept-screen__glow dept-screen__glow--2"></div>
          <div className="dept-screen__glow dept-screen__glow--3"></div>
          <div className="dept-screen__scanline"></div>
        </div>

      <div className="dept-screen__content">
        <div className="dept-header-container">
          <h1 className="dept-screen__title">Choose a <span>Department</span></h1>
          <button 
            className="about-creator-btn" 
            onClick={onOpenAbout}
            onMouseEnter={playHover}
          >
            About Me
          </button>
        </div>
        
        <div className="dept-screen__cards">
          {ROLES.map((role) => (
            <button
              key={role.id}
              className={`dept-card${selected === role.id ? ' dept-card--selected' : ''}`}
              style={{ '--card-accent': role.accent, '--card-hue': role.hue }}
              onClick={() => handleSelect(role.id)}
              onMouseEnter={playHover}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="dept-card__header">
                <h2 className="dept-card__name">{role.name}</h2>
                <p className="dept-card__desc">{role.description}</p>
              </div>
              
              <div className="dept-card__arch-container">
                <div className="dept-card__arch-glow"></div>
                <div className="dept-card__arch"></div>
                <div className="dept-card__mascot">
                  <img
                    src={`/assets/${role.id}.png`}
                    alt={role.name}
                    className="dept-card__img"
                    loading="lazy"
                  />
                </div>
                
                {role.badges && role.badges.map((badge, idx) => (
                  <div 
                    key={idx} 
                    className={`badge badge--${badge.type}`}
                    style={{ top: badge.top, left: badge.left, right: badge.right }}
                  >
                    {badge.text.split('\n').map((line, i) => <div key={i}>{line}</div>)}
                  </div>
                ))}

                <div className="dept-card__floating-icon">{role.icon}</div>
              </div>
              
              <div className="dept-card__footer">
                <div className="dept-card__explore">
                  Explore {role.name}
                </div>
                <div className="dept-card__arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}
