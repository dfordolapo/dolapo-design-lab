import { useState, useCallback } from 'react'
import LoadingSequence from './components/LoadingSequence'
import CinematicContainer from './components/CinematicContainer'
import WelcomeScreen from './components/WelcomeScreen'
import DepartmentSelect from './components/DepartmentSelect'
import ElevatorScreen from './components/ElevatorScreen'
import useAmbientAudio from './hooks/useAmbientAudio'
import useCinematicEngine from './hooks/useCinematicEngine'
import { CONFIG } from './utils/cinematicConfig'

export default function App() {
  const [showCinematic, setShowCinematic] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showDeptSelect, setShowDeptSelect] = useState(false)
  const [showElevator, setShowElevator] = useState(false)
  const [selectedDept, setSelectedDept] = useState(null)
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
      setTimeout(() => {
        setShowCinematic(false)
        setShowWelcome(true)
        setTransitioning(false)
      }, CONFIG.transitionDuration)
    }
  }, [triggerTransition])

  const handleWelcomeComplete = useCallback(() => {
    setShowWelcome(false)
    setShowDeptSelect(true)
  }, [])

  const [showDepartmentView, setShowDepartmentView] = useState(false)

  const handleDepartmentSelect = useCallback((deptId) => {
    setSelectedDept(deptId)
    setShowDeptSelect(false)
    setShowElevator(true)
  }, [])

  const handleElevatorComplete = useCallback(() => {
    setShowElevator(false)
    setShowDepartmentView(true)
  }, [])

  if (showDepartmentView) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'white', background: '#000', flexDirection: 'column', gap: '20px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem' }}>Welcome to {selectedDept.toUpperCase()}</h1>
        <p style={{ color: 'var(--text-secondary)' }}>The elevator has arrived. This is where the department content will go.</p>
        <button onClick={() => { setShowDepartmentView(false); setShowDeptSelect(true) }} style={{ padding: '10px 20px', background: 'white', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}>Go Back</button>
      </div>
    )
  }

  if (showElevator) {
    return <ElevatorScreen selectedDeptId={selectedDept} onComplete={handleElevatorComplete} />
  }

  if (showDeptSelect) {
    return <DepartmentSelect onSelect={handleDepartmentSelect} />
  }

  return (
    <>
      {showWelcome && <WelcomeScreen onComplete={handleWelcomeComplete} />}

      {!showCinematic && !showWelcome && (
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

      {transitioning && <div className="transition-overlay active" />}
    </>
  )
}
