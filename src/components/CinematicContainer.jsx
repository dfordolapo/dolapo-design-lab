import { useEffect, useRef } from 'react'
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

export default function CinematicContainer({ phase, onEnterLab, transitioning }) {
  const containerRef = useRef(null)
  const { playDoors } = useSoundEffects()

  useParallax(phase)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.className = `cinematic-container phase-${phase}`
    }
    if (phase === 'entering') {
      playDoors()
    }
  }, [phase, playDoors])

  return (
    <>
      <div ref={containerRef} className={`cinematic-container phase-${phase}`} id="cinematic-container">
        <SceneBackgrounds />
        <AmbientOverlays />
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
