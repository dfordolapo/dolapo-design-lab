import { useState, useCallback } from 'react'
import LoadingSequence from './components/LoadingSequence'
import CinematicContainer from './components/CinematicContainer'
import WelcomeScreen from './components/WelcomeScreen'
import DepartmentSelect from './components/DepartmentSelect'
import ElevatorScreen from './components/ElevatorScreen'
import DepartmentVault from './components/DepartmentVault'
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

  const handleLeaveDepartment = () => {
    setTransitioning(true)
    setTimeout(() => {
      setShowDepartmentView(false)
      setShowDeptSelect(true)
      setTransitioning(false)
    }, 1000)
  }

  const handleViewProject = (project) => {
    console.log("Opening case study viewer for:", project)
    // To be implemented: set state to show CaseStudyViewer
  }

  if (showDepartmentView) {
    return (
      <DepartmentVault 
        departmentId={selectedDept} 
        onBack={handleLeaveDepartment} 
        onViewProject={handleViewProject} 
      />
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
