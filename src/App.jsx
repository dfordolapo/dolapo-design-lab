import { useState, useCallback } from 'react'
import LoadingSequence from './components/LoadingSequence'
import CinematicContainer from './components/CinematicContainer'
import useAmbientAudio from './hooks/useAmbientAudio'
import useCinematicEngine from './hooks/useCinematicEngine'
import { CONFIG } from './utils/cinematicConfig'

export default function App() {
  const [showCinematic, setShowCinematic] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [portalReady, setPortalReady] = useState(false)
  const { toggleAudio } = useAmbientAudio()
  const {
    phase,
    loadingComplete,
    setLoadingComplete,
    triggerTransition,
  } = useCinematicEngine()

  const handleLoadingComplete = useCallback(() => {
    setShowCinematic(true)
    setLoadingComplete(true)
  }, [setLoadingComplete])

  const handleEnterLab = useCallback(() => {
    const shouldTransition = triggerTransition()
    if (shouldTransition) {
      setTransitioning(true)
      setTimeout(() => setPortalReady(true), CONFIG.transitionDuration)
    }
  }, [triggerTransition])

  if (portalReady) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#07060B',
        fontFamily: "'Outfit', sans-serif",
        color: '#F8F7FF',
        gap: '1.5rem',
        animation: 'portalFade 1.5s ease forwards',
      }}>
        <style>{`
          @keyframes portalFade { from { opacity: 0; } to { opacity: 1; } }
          @keyframes portalPulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
          @keyframes loadLoop {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(350%); }
          }
        `}</style>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
          border: '1px solid rgba(139,92,246,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2rem', animation: 'portalPulse 2s ease-in-out infinite',
        }}>🔬</div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.15em' }}>WELCOME TO THE LAB</h1>
        <p style={{ fontSize: '0.85rem', color: 'rgba(248,247,255,0.5)', letterSpacing: '0.1em', fontFamily: "'JetBrains Mono', monospace" }}>
          Expertise Selection Portal loading...
        </p>
        <div style={{ width: 120, height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden', marginTop: '0.5rem' }}>
          <div style={{ height: '100%', width: '40%', background: 'linear-gradient(90deg, #8B5CF6, #E879F9)', borderRadius: 2, animation: 'loadLoop 1.5s ease-in-out infinite' }}></div>
        </div>
      </div>
    )
  }

  return (
    <>
      {!showCinematic && (
        <LoadingSequence onComplete={handleLoadingComplete} />
      )}
      {showCinematic && (
        <CinematicContainer
          phase={phase}
          onEnterLab={handleEnterLab}
          transitioning={transitioning}
          onToggleAudio={toggleAudio}
        />
      )}
    </>
  )
}
