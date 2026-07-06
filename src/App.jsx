import { useState, useCallback, useEffect } from 'react'
import LoadingSequence from './components/LoadingSequence'
import CinematicContainer from './components/CinematicContainer'
import WelcomeScreen from './components/WelcomeScreen'
import DepartmentSelect from './components/DepartmentSelect'
import ElevatorScreen from './components/ElevatorScreen'
import DepartmentVault from './components/DepartmentVault'
import CaseStudyViewer from './components/CaseStudyViewer'
import AboutCreator from './components/AboutCreator'
import BookingPage from './components/BookingPage'
import FloatingCTA from './components/FloatingCTA'
import useCinematicEngine from './hooks/useCinematicEngine'
import { CONFIG } from './utils/cinematicConfig'
import { CASE_STUDIES } from './utils/caseStudies'
import { motion, AnimatePresence } from 'framer-motion'
import SmoothScroll from './components/SmoothScroll'
import { getCalApi } from '@calcom/embed-react'

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
  const initialPath = window.location.pathname
  const isAbout = initialPath === '/about'
  const isDept = initialPath.startsWith('/department/')
  const initialDept = isDept ? initialPath.split('/')[2] : null
  const hasActiveScreen = isAbout || isDept || saved?.showDeptSelect || saved?.showElevator || saved?.showDepartmentView

  const [showCinematic, setShowCinematic] = useState(!hasActiveScreen)
  const [transitioning, setTransitioning] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showDeptSelect, setShowDeptSelect] = useState((!isAbout && !isDept) ? (saved?.showDeptSelect || false) : false)
  const [showElevator, setShowElevator] = useState((!isAbout && !isDept) ? (saved?.showElevator || false) : false)
  const [selectedDept, setSelectedDept] = useState(initialDept || saved?.selectedDept || null)
  const [showDepartmentView, setShowDepartmentView] = useState(isDept || ((!isAbout && !isDept) ? (saved?.showDepartmentView || false) : false))
  const [activeProject, setActiveProject] = useState(null)
  const [showAboutCreator, setShowAboutCreator] = useState(isAbout)
  const [currentPath, setCurrentPath] = useState(initialPath)

  const {
    phase,
    loadingComplete,
    setLoadingComplete,
    triggerTransition,
    resetTransition,
  } = useCinematicEngine(true)

  const pushRoute = useCallback((path) => {
    window.history.pushState({}, '', path)
    setCurrentPath(path)
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      setCurrentPath(path)
      
      if (path === '/about') {
        setShowAboutCreator(true)
        setShowDepartmentView(false)
        setShowDeptSelect(false)
        setShowElevator(false)
      } else if (path.startsWith('/department/')) {
        const dept = path.split('/')[2]
        if (dept) {
          setSelectedDept(dept)
          setShowDepartmentView(true)
          setShowAboutCreator(false)
          setShowDeptSelect(false)
          setShowElevator(false)
        }
      } else if (path === '/') {
        setShowAboutCreator(false)
        setShowDepartmentView(false)
        setShowElevator(false)
        setShowDeptSelect(true)
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    const state = {
      showDeptSelect,
      showElevator,
      showDepartmentView,
      selectedDept,
    }
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(state))
  }, [showDeptSelect, showElevator, showDepartmentView, selectedDept])

  // Preload Cal.com script instantly in the background so it's ready when needed
  useEffect(() => {
    (async function preloadCal() {
      try {
        const cal = await getCalApi()
        cal("preload", { calLink: "dfordolapo/15min" })
      } catch (e) {
        console.error('Failed to preload Cal.com API', e)
      }
    })()
  }, [])

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
    pushRoute('/')
  }, [pushRoute])

  const handleDepartmentSelect = useCallback((deptId) => {
    setActiveProject(null)
    setSelectedDept(deptId)
    setShowDeptSelect(false)
    setShowElevator(true)
  }, [])

  const handleElevatorComplete = useCallback(() => {
    setShowElevator(false)
    setShowDepartmentView(true)
    pushRoute(`/department/${selectedDept}`)
  }, [selectedDept, pushRoute])

  const handleBackToLobby = useCallback(() => {
    setShowDeptSelect(false)
    resetTransition()
    setShowCinematic(true)
    pushRoute('/')
  }, [resetTransition, pushRoute])

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
      pushRoute('/')
    }, 1000)
  }

  const handleViewProject = (project) => {
    console.log("Opening case study viewer for:", project)
    // Create a fresh reference so React always remounts, preventing close-animation ghost bugs
    setActiveProject({ ...project, _mountId: Date.now() })
  }

  const renderScreen = () => {
    if (currentPath === '/book') {
      return (
        <BookingPage 
          key="booking" 
          onBack={() => {
            pushRoute('/')
          }} 
        />
      )
    }

    if (showAboutCreator) {
      return (
        <motion.div key="about" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="screen-wrapper">
          <AboutCreator onBack={() => {
            setShowAboutCreator(false)
            pushRoute('/')
          }} />
        </motion.div>
      )
    }

    if (showDepartmentView) {
      return (
        <motion.div key="vault" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="screen-wrapper">
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
        </motion.div>
      )
    }

    if (showElevator) {
      return (
        <motion.div key="elevator" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.5 }} className="screen-wrapper">
          <ElevatorScreen selectedDeptId={selectedDept} onComplete={handleElevatorComplete} onAbort={handleAbortElevator} />
        </motion.div>
      )
    }

    if (showDeptSelect) {
      return (
        <motion.div key="deptSelect" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="screen-wrapper">
          <DepartmentSelect 
            onSelect={handleDepartmentSelect} 
            onBack={handleBackToLobby} 
            onOpenAbout={() => {
              setShowAboutCreator(true)
              pushRoute('/about')
            }} 
          />
        </motion.div>
      )
    }

    return (
      <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="screen-wrapper">
        {showWelcome && <WelcomeScreen onComplete={handleWelcomeComplete} />}
        {showCinematic && (
          <CinematicContainer
            phase={phase}
            onEnterLab={handleEnterLab}
            transitioning={transitioning}
          />
        )}
      </motion.div>
    )
  }

  return (
    <SmoothScroll>
      {!loadingComplete && <LoadingSequence onComplete={handleLoadingComplete} />}

      <AnimatePresence mode="wait">
        {renderScreen()}
      </AnimatePresence>

      {!showCinematic && currentPath !== '/book' && (
        <FloatingCTA />
      )}

      {transitioning && <div className="transition-overlay active" />}
    </SmoothScroll>
  )
}

