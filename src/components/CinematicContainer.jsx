import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import SceneBackgrounds from './SceneBackgrounds'
import AmbientOverlays from './AmbientOverlays'
import HUDFrame from './HUDFrame'
import HeroHeading from './HeroHeading'
import HeroSub from './HeroSub'
import CTAButton from './CTAButton'
import HolographicElements from './HolographicElements'
import DoorLight from './DoorLight'
import SensorIndicators from './SensorIndicators'
import DiscoveryCue from './DiscoveryCue'
import PhaseIndicator from './PhaseIndicator'
import ParticleCanvas from './ParticleCanvas'
import TransitionOverlay from './TransitionOverlay'
import useParallax from '../hooks/useParallax'
import useSoundEffects from '../hooks/useSoundEffects'
import ThemeToggle from './ThemeToggle'

export default function CinematicContainer({ phase, onEnterLab, transitioning }) {
  const containerRef = useRef(null)
  const { playDoors } = useSoundEffects()

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 })

  const bgX = useTransform(springX, [0, 1], ['-2%', '2%'])
  const bgY = useTransform(springY, [0, 1], ['-2%', '2%'])
  
  const glowX = useTransform(springX, [0, 1], ['-5%', '5%'])
  const glowY = useTransform(springY, [0, 1], ['-5%', '5%'])

  useParallax(phase)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.className = `cinematic-container phase-${phase}`
    }
    if (phase === 'entering') {
      playDoors()
    }
  }, [phase, playDoors])

  useEffect(() => {
    const handleDeviceOrientation = (e) => {
      if (!e.beta || !e.gamma) return
      const x = Math.min(Math.max((e.gamma + 45) / 90, 0), 1)
      const y = Math.min(Math.max((e.beta - 45 + 45) / 90, 0), 1)
      mouseX.set(x)
      mouseY.set(y)
    }
    const orient = typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function'
    if (orient) {
      DeviceOrientationEvent.requestPermission().then(state => {
        if (state === 'granted') {
          window.addEventListener('deviceorientation', handleDeviceOrientation)
        }
      })
    } else {
      window.addEventListener('deviceorientation', handleDeviceOrientation)
    }
    return () => window.removeEventListener('deviceorientation', handleDeviceOrientation)
  }, [mouseX, mouseY])

  return (
    <>
      <div 
        ref={containerRef} 
        className={`cinematic-container phase-${phase} ${transitioning ? 'is-transitioning' : ''}`} 
        id="cinematic-container"
        onMouseMove={(e) => {
          mouseX.set(e.clientX / window.innerWidth)
          mouseY.set(e.clientY / window.innerHeight)
        }}
        onTouchMove={(e) => {
          if (e.touches.length > 0) {
            mouseX.set(e.touches[0].clientX / window.innerWidth)
            mouseY.set(e.touches[0].clientY / window.innerHeight)
          }
        }}
        onTouchEnd={() => {
          mouseX.set(0.5)
          mouseY.set(0.5)
        }}
      >
        <motion.div 
          className="scene-bg"
          style={{ x: bgX, y: bgY }}
        >
          <SceneBackgrounds />
        </motion.div>
        
        <div className="ambient-overlay">
          <AmbientOverlays />
          <motion.div 
            className="ambient-overlay__glow"
            style={{ x: glowX, y: glowY }}
          ></motion.div>
        </div>

        <ParticleCanvas />
        <DoorLight />
        <SensorIndicators />
        <HolographicElements />
        <HUDFrame />

        <div className="content-layer">
          <HeroHeading />
          <HeroSub />
          <CTAButton onClick={onEnterLab} />
        </div>

        <DiscoveryCue />
        <PhaseIndicator phase={phase} />
        

      </div>
      <TransitionOverlay active={transitioning} />
    </>
  )
}
