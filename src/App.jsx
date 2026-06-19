import { useState, useCallback } from 'react'
import LoadingSequence from './components/LoadingSequence'
import CinematicContainer from './components/CinematicContainer'
import WelcomeScreen from './components/WelcomeScreen'
import DepartmentSelect from './components/DepartmentSelect'
import ElevatorScreen from './components/ElevatorScreen'
import useCinematicEngine from './hooks/useCinematicEngine'
import { CONFIG } from './utils/cinematicConfig'

import BackButton from './components/BackButton'

export default function App() {
  const [showCinematic, setShowCinematic] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showDeptSelect, setShowDeptSelect] = useState(false)
  const [showElevator, setShowElevator] = useState(false)
  const [selectedDept, setSelectedDept] = useState(null)
  const {
    phase,
    loadingComplete,
    setLoadingComplete,
    triggerTransition,
    resetTransition,
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

  // Navigation Handlers
  const handleBackToLobby = useCallback(() => {
    setShowDeptSelect(false)
    resetTransition()
    setShowCinematic(true)
  }, [resetTransition])

  const handleAbortElevator = useCallback(() => {
    setShowElevator(false)
    setShowDeptSelect(true)
  }, [])

  const handleLeaveDepartment = useCallback(() => {
    setShowDepartmentView(false)
    setShowDeptSelect(true)
  }, [])

  if (showDepartmentView) {
    return (
      <div className="department-view" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'white', background: '#050505', flexDirection: 'column', gap: '24px', textAlign: 'center', padding: '40px' }}>
        <BackButton onClick={handleLeaveDepartment} label="RETURN TO LOBBY" />
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0' }}>
          Welcome to <span style={{ background: 'var(--gradient-title)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{selectedDept}</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', maxWidth: '600px', lineHeight: '1.6', fontSize: '1.1rem' }}>
          The elevator has arrived. This section will hold the full portfolio content and case studies for the {selectedDept.toUpperCase()} department.
        </p>
      </div>
    )
  }

  if (showElevator) {
    return <ElevatorScreen selectedDeptId={selectedDept} onComplete={handleElevatorComplete} onAbort={handleAbortElevator} />
  }

  if (showDeptSelect) {
    return <DepartmentSelect onSelect={handleDepartmentSelect} onBack={handleBackToLobby} />
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
        />
      )}

      {transitioning && <div className="transition-overlay active" />}
    </>
  )
}
