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
import AudioToggle from './AudioToggle'
import ParticleCanvas from './ParticleCanvas'
import TransitionOverlay from './TransitionOverlay'
import useParallax from '../hooks/useParallax'

export default function CinematicContainer({ phase, onEnterLab, transitioning, onToggleAudio }) {
  const containerRef = useRef(null)

  useParallax(phase)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.className = `cinematic-container phase-${phase}`
    }
  }, [phase])

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
        <AudioToggle onToggle={onToggleAudio} />
      </div>
      <TransitionOverlay active={transitioning} />
    </>
  )
}
