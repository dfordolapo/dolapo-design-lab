import { useState, useCallback, useEffect } from 'react'
import LoadingSequence from './components/LoadingSequence'
import CinematicContainer from './components/CinematicContainer'
import WelcomeScreen from './components/WelcomeScreen'
import DepartmentSelect from './components/DepartmentSelect'
import ElevatorScreen from './components/ElevatorScreen'
import DepartmentVault from './components/DepartmentVault'
import CaseStudyViewer from './components/CaseStudyViewer'
import AboutCreator from './components/AboutCreator'
import useCinematicEngine from './hooks/useCinematicEngine'
import { CONFIG } from './utils/cinematicConfig'
import { CASE_STUDIES } from './utils/caseStudies'

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
  const hasActiveScreen = saved?.showDeptSelect || saved?.showElevator || saved?.showDepartmentView
  const [showCinematic, setShowCinematic] = useState(!hasActiveScreen)
  const [transitioning, setTransitioning] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showDeptSelect, setShowDeptSelect] = useState(saved?.showDeptSelect || false)
  const [showElevator, setShowElevator] = useState(saved?.showElevator || false)
  const [selectedDept, setSelectedDept] = useState(saved?.selectedDept || null)
  const [showDepartmentView, setShowDepartmentView] = useState(saved?.showDepartmentView || false)
  const [activeProject, setActiveProject] = useState(null)
  const [showAboutCreator, setShowAboutCreator] = useState(false)

  const {
    phase,
    loadingComplete,
    setLoadingComplete,
    triggerTransition,
    resetTransition,
  } = useCinematicEngine(true)

  useEffect(() => {
    const state = {
      showDeptSelect,
      showElevator,
      showDepartmentView,
      selectedDept,
    }
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(state))
  }, [showDeptSelect, showElevator, showDepartmentView, selectedDept])

  // Preload all case study images in the background
  useEffect(() => {
    const imagesToPreload = [];
    Object.values(CASE_STUDIES).forEach(project => {
      if (project.vaultImage) imagesToPreload.push(project.vaultImage);
      if (project.content) {
        project.content.forEach(block => {
          if (block.image) imagesToPreload.push(block.image);
        });
      }
    });
    
    // Load images invisibly
    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

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
    setActiveProject(null)
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
    setActiveProject(null)
    setTransitioning(true)
    setTimeout(() => {
      setShowDepartmentView(false)
      setShowDeptSelect(true)
      setTransitioning(false)
    }, 1000)
  }

  const handleViewProject = (project) => {
    console.log("Opening case study viewer for:", project)
    // Create a fresh reference so React always remounts, preventing close-animation ghost bugs
    setActiveProject({ ...project, _mountId: Date.now() })
  }

  if (showAboutCreator) {
    return <AboutCreator onBack={() => setShowAboutCreator(false)} />
  }

  if (showDepartmentView) {
    return (
      <>
        <DepartmentVault 
          departmentId={selectedDept} 
          onBack={handleLeaveDepartment} 
          onViewProject={handleViewProject} 
        />
        {activeProject && (
          <CaseStudyViewer 
            key={activeProject._mountId}
            project={activeProject} 
            onClose={() => setActiveProject(null)} 
          />
        )}
      </>
    )
  }

  if (showElevator) {
    return <ElevatorScreen selectedDeptId={selectedDept} onComplete={handleElevatorComplete} onAbort={handleAbortElevator} />
  }

  if (showDeptSelect) {
    return <DepartmentSelect onSelect={handleDepartmentSelect} onBack={handleBackToLobby} onOpenAbout={() => setShowAboutCreator(true)} />
  }

  return (
    <>
      {showWelcome && <WelcomeScreen onComplete={handleWelcomeComplete} />}



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
