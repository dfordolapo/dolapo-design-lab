import { useState, useCallback, useEffect } from 'react'
import LoadingSequence from './components/LoadingSequence'
import SplashIntro from './components/SplashIntro'
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

  const isStandalone = typeof window !== 'undefined' && (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone)

  // Respect motion sensitivity: reduced-motion users skip straight to departments
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  // Honor the skip button pressed on the static pre-splash in index.html (fires before React mounts)
  const skipFromPreSplash = typeof window !== 'undefined' && sessionStorage.getItem('portfolio-skip') === '1'

  const skipIntroAutomatically = (prefersReducedMotion || skipFromPreSplash) && !hasActiveScreen

  const [showSplash, setShowSplash] = useState(!hasActiveScreen && !skipIntroAutomatically)
  const [showCinematic, setShowCinematic] = useState(!hasActiveScreen && !skipIntroAutomatically)
  const [transitioning, setTransitioning] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showDeptSelect, setShowDeptSelect] = useState(skipIntroAutomatically || ((!isAbout && !isDept) ? (saved?.showDeptSelect || false) : false))
  const [showElevator, setShowElevator] = useState((!isAbout && !isDept) ? (saved?.showElevator || false) : false)
  const [selectedDept, setSelectedDept] = useState(initialDept || saved?.selectedDept || null)
  const [showDepartmentView, setShowDepartmentView] = useState(isDept || ((!isAbout && !isDept) ? (saved?.showDepartmentView || false) : false))
  const [activeProject, setActiveProject] = useState(null)
  const [showAboutCreator, setShowAboutCreator] = useState(isAbout)
  const [currentPath, setCurrentPath] = useState(initialPath)
  const [elevatorDoorsState, setElevatorDoorsState] = useState('idle')

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
    // Consume the pre-splash skip flag now that it's been honored
    try { sessionStorage.removeItem('portfolio-skip') } catch (e) {}
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

  // Global handler for the top bar logo
  useEffect(() => {
    const handleNavigateHome = () => {
      sessionStorage.removeItem(SESSION_KEY)
      pushRoute('/')
      setShowWelcome(false)
      setShowDeptSelect(false)
      setShowElevator(false)
      setShowDepartmentView(false)
      setActiveProject(null)
      setShowAboutCreator(false)
      resetTransition()
      setShowCinematic(true)
    }

    window.addEventListener('navigate-home', handleNavigateHome)
    return () => window.removeEventListener('navigate-home', handleNavigateHome)
  }, [pushRoute, resetTransition])

  const handleLoadingComplete = useCallback(() => {
    setShowCinematic(true)
    setLoadingComplete(true)
  }, [setLoadingComplete])

  // Skip the cinematic intro entirely and go straight to department selection
  const handleSkipToWork = useCallback(() => {
    setShowSplash(false)
    setShowCinematic(false)
    setShowWelcome(false)
    setShowDeptSelect(true)
    setShowElevator(false)
    setShowDepartmentView(false)
    setActiveProject(null)
    setShowAboutCreator(false)
    setLoadingComplete(true)
    resetTransition()
    pushRoute('/')
  }, [pushRoute, resetTransition, setLoadingComplete])

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
    setElevatorDoorsState('closing')
    setTimeout(() => {
      setShowDeptSelect(false)
      setShowElevator(true)
      setElevatorDoorsState('opening')
      setTimeout(() => {
        setElevatorDoorsState('idle')
      }, 1500)
    }, 1500)
  }, [])

  const handleElevatorComplete = useCallback(() => {
    setElevatorDoorsState('closing')
    setTimeout(() => {
      setShowElevator(false)
      setShowDepartmentView(true)
      pushRoute(`/department/${selectedDept}`)
      setElevatorDoorsState('opening')
      setTimeout(() => {
        setElevatorDoorsState('idle')
      }, 1500)
    }, 1500)
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
        {showWelcome && <WelcomeScreen onComplete={handleWelcomeComplete} onSkip={handleWelcomeComplete} />}
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
      {showSplash && <SplashIntro onComplete={() => setShowSplash(false)} onSkip={handleSkipToWork} />}
      {!showSplash && !loadingComplete && <LoadingSequence onComplete={handleLoadingComplete} onSkip={handleSkipToWork} />}

      <AnimatePresence mode="wait">
        {renderScreen()}
      </AnimatePresence>

      {!showCinematic && currentPath !== '/book' && (
        <FloatingCTA />
      )}

      {transitioning && <div className="transition-overlay active" />}

      {elevatorDoorsState !== 'idle' && (
        <div className={`fullscreen-elevator-doors ${elevatorDoorsState}`}>
          <div className="fullscreen-elevator-door left"></div>
          <div className="fullscreen-elevator-door right"></div>
        </div>
      )}
    </SmoothScroll>
  )
}

