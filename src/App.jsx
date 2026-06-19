import { useState, useCallback, useEffect } from 'react'
import LoadingSequence from './components/LoadingSequence'
import CinematicContainer from './components/CinematicContainer'
import WelcomeScreen from './components/WelcomeScreen'
import DepartmentSelect from './components/DepartmentSelect'
import ElevatorScreen from './components/ElevatorScreen'
import DepartmentVault from './components/DepartmentVault'
import useCinematicEngine from './hooks/useCinematicEngine'
import { CONFIG } from './utils/cinematicConfig'

const SESSION_KEY = 'portfolio-session'

function loadSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export default function App() {
  const saved = loadSession()
  const [showCinematic, setShowCinematic] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showDeptSelect, setShowDeptSelect] = useState(saved?.showDeptSelect || false)
  const [showElevator, setShowElevator] = useState(saved?.showElevator || false)
  const [selectedDept, setSelectedDept] = useState(saved?.selectedDept || null)
  const [showDepartmentView, setShowDepartmentView] = useState(saved?.showDepartmentView || false)

  const {
    phase,
    loadingComplete,
    setLoadingComplete,
    triggerTransition,
    resetTransition,
  } = useCinematicEngine(!!saved)

  useEffect(() => {
    const state = {
      showDeptSelect,
      showElevator,
      showDepartmentView,
      selectedDept,
    }
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(state))
  }, [showDeptSelect, showElevator, showDepartmentView, selectedDept])

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

  const handleDepartmentSelect = useCallback((deptId) => {
    setSelectedDept(deptId)
    setShowDeptSelect(false)
    setShowElevator(true)
  }, [])

  const handleElevatorComplete = useCallback(() => {
    setShowElevator(false)
    setShowDepartmentView(true)
  }, [])

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

      {!showCinematic && !showWelcome && !saved && (
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
