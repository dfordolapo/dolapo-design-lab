import { useState, useCallback, useEffect, lazy, Suspense } from 'react'
import SplashIntro from './components/SplashIntro'
import InboxLayout from './components/inbox/InboxLayout'
import { CASE_STUDIES } from './utils/caseStudies'
import { motion, AnimatePresence } from 'framer-motion'
import SmoothScroll from './components/SmoothScroll'

import AboutCreator from './components/AboutCreator'

// Lazy loaded secondary screens (departments, vault, booking)
const DepartmentSelect = lazy(() => import('./components/DepartmentSelect'))
const ElevatorScreen = lazy(() => import('./components/ElevatorScreen'))
const DepartmentVault = lazy(() => import('./components/DepartmentVault'))
const CaseStudyViewer = lazy(() => import('./components/CaseStudyViewer'))
const BookingPage = lazy(() => import('./components/BookingPage'))
const CinematicContainer = lazy(() => import('./components/CinematicContainer'))
const LoadingSequence = lazy(() => import('./components/LoadingSequence'))

const ComponentFallback = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100vh',
    background: '#07060B'
  }}>
    <div style={{
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      border: '2px solid rgba(139, 92, 246, 0.2)',
      borderTopColor: '#8b5cf6',
      animation: 'spin 0.8s linear infinite'
    }} />
  </div>
)

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
  const initialPath = typeof window !== 'undefined' ? window.location.pathname : '/'
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
  const hash = typeof window !== 'undefined' ? window.location.hash : ''
  const isInbox = initialPath === '/inbox'
  const isDept = initialPath.startsWith('/department/')
  const isDeptSelect = initialPath === '/departments' || initialPath === '/vault'
  const isBook = initialPath === '/book'
  const isLab = initialPath === '/lab'
  const isAbout = initialPath === '/about' || initialPath === '/' || initialPath === '' || searchParams?.get('view') === 'about' || hash === '#about'
  const initialDept = isDept ? initialPath.split('/')[2] : null

  // Only bypass splash if directly deep-linking to an inner section (e.g. /departments, /inbox)
  const isDirectDeepLink = isDept || isDeptSelect || isBook || isLab || isInbox

  const [showSplash, setShowSplash] = useState(!isDirectDeepLink)
  const [showDeptSelect, setShowDeptSelect] = useState(isDeptSelect || (saved?.showDeptSelect || false))
  const [showElevator, setShowElevator] = useState(false)
  const [selectedDept, setSelectedDept] = useState(initialDept || saved?.selectedDept || null)
  const [showDepartmentView, setShowDepartmentView] = useState(isDept || (saved?.showDepartmentView || false))
  const [activeProject, setActiveProject] = useState(null)
  const [showAboutCreator, setShowAboutCreator] = useState(isAbout || (!isInbox && !isDeptSelect && !isDept && !isBook && !isLab))
  const [showInbox, setShowInbox] = useState(isInbox)
  const [showOldLab, setShowOldLab] = useState(isLab)
  const [labStep, setLabStep] = useState('loading')
  const [currentPath, setCurrentPath] = useState(initialPath)
  const [elevatorDoorsState, setElevatorDoorsState] = useState('idle')

  const pushRoute = useCallback((path) => {
    window.history.pushState({}, '', path)
    setCurrentPath(path)
  }, [])

  useEffect(() => {
    try { sessionStorage.removeItem('portfolio-skip') } catch (e) {}
  }, [])

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [showSplash])

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      setCurrentPath(path)
      
      if (path === '/inbox') {
        setShowInbox(true)
        setShowAboutCreator(false)
        setShowDepartmentView(false)
        setShowDeptSelect(false)
        setShowElevator(false)
        setShowOldLab(false)
        setActiveProject(null)
      } else if (path === '/departments' || path === '/vault') {
        setShowDeptSelect(true)
        setShowInbox(false)
        setShowDepartmentView(false)
        setShowAboutCreator(false)
        setShowElevator(false)
        setShowOldLab(false)
        setActiveProject(null)
      } else if (path === '/projects') {
        setSelectedDept('selected-works')
        setShowDepartmentView(true)
        setShowInbox(false)
        setShowDeptSelect(false)
        setShowAboutCreator(false)
        setShowElevator(false)
        setShowOldLab(false)
        setActiveProject(null)
      } else if (path === '/lab') {
        setShowOldLab(true)
        setShowInbox(false)
        setShowAboutCreator(false)
        setShowDepartmentView(false)
        setShowDeptSelect(false)
        setShowElevator(false)
        setActiveProject(null)
      } else if (path.startsWith('/department/')) {
        const dept = path.split('/')[2]
        if (dept) {
          setSelectedDept(dept)
          setShowDepartmentView(true)
          setShowInbox(false)
          setShowDeptSelect(false)
          setShowAboutCreator(false)
          setShowElevator(false)
          setShowOldLab(false)
          setActiveProject(null)
        }
      } else if (path === '/book') {
        setShowInbox(false)
        setShowAboutCreator(false)
        setShowDepartmentView(false)
        setShowDeptSelect(false)
        setShowElevator(false)
        setShowOldLab(false)
        setActiveProject(null)
      } else if (path === '/' || path === '' || path === '/about') {
        setShowAboutCreator(true)
        setShowInbox(false)
        setShowDepartmentView(false)
        setShowDeptSelect(false)
        setShowElevator(false)
        setShowOldLab(false)
        setActiveProject(null)
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    const state = {
      showDepartmentView,
      showDeptSelect,
      selectedDept,
    }
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(state))
  }, [showDepartmentView, showDeptSelect, selectedDept])

  // In the department, vault, and explore lab flows, everything stays strictly dark mode
  useEffect(() => {
    const isDarkFlow = showElevator || showDepartmentView || showOldLab
    if (isDarkFlow) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      try {
        const savedTheme = localStorage.getItem('theme') || (window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
        document.documentElement.setAttribute('data-theme', savedTheme)
      } catch (e) {
        document.documentElement.setAttribute('data-theme', 'dark')
      }
    }
  }, [showElevator, showDepartmentView, showOldLab])

  // Selective idle background preloader (delayed so critical render is instantaneous)
  useEffect(() => {
    const timer = setTimeout(() => {
      import('@calcom/embed-react').then(({ getCalApi }) => {
        getCalApi().then(cal => {
          cal("preload", { calLink: "dfordolapo/15min" })
        }).catch(() => {})
      }).catch(() => {})
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  // Enter lab from old cinematic hero: closes elevator doors and enters department selection
  const handleEnterLabFromOldLab = useCallback(() => {
    setElevatorDoorsState('closing')
    setTimeout(() => {
      setShowOldLab(false)
      setShowDeptSelect(true)
      pushRoute('/departments')
      setElevatorDoorsState('opening')
      setTimeout(() => {
        setElevatorDoorsState('idle')
      }, 1500)
    }, 1500)
  }, [pushRoute])

  // Global handler for the top bar logo
  useEffect(() => {
    const handleNavigateHome = () => {
      sessionStorage.removeItem(SESSION_KEY)
      pushRoute('/')
      setShowDepartmentView(false)
      setShowDeptSelect(false)
      setShowElevator(false)
      setActiveProject(null)
      setShowInbox(false)
      setShowAboutCreator(true)
    }

    window.addEventListener('navigate-home', handleNavigateHome)
    return () => window.removeEventListener('navigate-home', handleNavigateHome)
  }, [pushRoute])

  const handleSkipIntro = useCallback(() => {
    setShowSplash(false)
    setShowDepartmentView(false)
    setShowDeptSelect(false)
    setShowElevator(false)
    setActiveProject(null)
    setShowInbox(false)
    setShowAboutCreator(true)
    pushRoute('/')
  }, [pushRoute])

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false)
  }, [])

  const handleViewProject = useCallback((projectOrId) => {
    let project = typeof projectOrId === 'string'
      ? CASE_STUDIES.find(cs => cs.id === projectOrId)
      : projectOrId
    if (project) {
      setActiveProject({ ...project, _mountId: Date.now() })
    }
  }, [])

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

  const handleAbortElevator = useCallback(() => {
    setShowElevator(false)
    setShowDeptSelect(true)
  }, [])

  const handleLeaveDepartment = useCallback(() => {
    setActiveProject(null)
    setShowDepartmentView(false)
    setShowDeptSelect(false)
    pushRoute('/')
  }, [pushRoute])

  const renderScreen = () => {
    if (currentPath === '/book') {
      return (
        <Suspense fallback={<ComponentFallback />}>
          <BookingPage 
            key="booking" 
            onBack={() => {
              pushRoute('/')
            }} 
          />
        </Suspense>
      )
    }

    if (showDepartmentView) {
      return (
        <motion.div
          key="vault"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="screen-wrapper"
        >
          <Suspense fallback={<ComponentFallback />}>
            <DepartmentVault 
              departmentId={selectedDept || 'designer'} 
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
          </Suspense>
        </motion.div>
      )
    }

    if (showElevator) {
      return (
        <motion.div
          key="elevator"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="screen-wrapper"
        >
          <Suspense fallback={<ComponentFallback />}>
            <ElevatorScreen
              selectedDeptId={selectedDept}
              onComplete={handleElevatorComplete}
              onAbort={handleAbortElevator}
            />
          </Suspense>
        </motion.div>
      )
    }

    if (showDeptSelect) {
      return (
        <motion.div
          key="deptSelect"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="screen-wrapper"
        >
          <Suspense fallback={<ComponentFallback />}>
            <DepartmentSelect 
              onSelect={handleDepartmentSelect} 
              onBack={() => {
                setShowDeptSelect(false)
                setShowDepartmentView(false)
                setShowElevator(false)
                setShowInbox(false)
                setShowOldLab(false)
                setShowAboutCreator(true)
                pushRoute('/')
              }} 
            />
          </Suspense>
        </motion.div>
      )
    }

    if (showOldLab) {
      return (
        <motion.div
          key="old-lab"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="screen-wrapper old-lab-wrapper"
        >
          <div className="old-lab-nav-header">
            <button
              type="button"
              className="old-lab-back-btn"
              onClick={() => {
                setShowOldLab(false)
                pushRoute('/')
              }}
              aria-label="Back to Inbox Workspace"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Back to Inbox</span>
            </button>
          </div>

          <Suspense fallback={<ComponentFallback />}>
            {labStep === 'loading' ? (
              <LoadingSequence
                onComplete={() => setLabStep('cinematic')}
                onSkip={() => setLabStep('cinematic')}
              />
            ) : (
              <CinematicContainer
                phase="inside"
                onEnterLab={handleEnterLabFromOldLab}
                transitioning={false}
              />
            )}
          </Suspense>
        </motion.div>
      )
    }

    // Render Inbox Workspace when explicitly navigating to /inbox
    if (showInbox || currentPath === '/inbox') {
      return (
        <motion.div
          key="inbox-home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="screen-wrapper"
        >
          <InboxLayout
            onViewProject={handleViewProject}
            onNavigateRoute={(path) => {
              if (path === '/about' || path === '/') {
                setShowInbox(false)
                setShowAboutCreator(true)
                pushRoute('/')
              } else if (path === '/book') {
                pushRoute('/book')
              } else if (path === '/lab') {
                setLabStep('loading')
                setShowOldLab(true)
                pushRoute('/lab')
              } else if (path.startsWith('/department/')) {
                const dept = path.split('/')[2]
                setSelectedDept(dept)
                setShowDepartmentView(true)
                pushRoute(path)
              } else {
                pushRoute(path)
              }
            }}
            onOpenDepartments={() => {
              setShowDeptSelect(true)
              pushRoute('/departments')
            }}
            onOpenProjects={() => {
              setSelectedDept('selected-works')
              setShowDepartmentView(true)
              pushRoute('/department/selected-works')
            }}
            onOpenLab={() => {
              setLabStep('loading')
              setShowOldLab(true)
              pushRoute('/lab')
            }}
          />

          {/* Full-featured Case Study Viewer on click of any case study in Inbox */}
          {activeProject && (
            <Suspense fallback={<ComponentFallback />}>
              <CaseStudyViewer 
                key={activeProject._mountId}
                project={activeProject} 
                onClose={() => setActiveProject(null)} 
              />
            </Suspense>
          )}
        </motion.div>
      )
    }

    // Default Main Screen: Dolapo's About Creator Portfolio Homepage!
    return (
      <motion.div
        key="about-main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="screen-wrapper"
      >
        <AboutCreator
          onBack={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
      </motion.div>
    )
  }

  return (
    <SmoothScroll>
      {showSplash ? (
        <SplashIntro
          onComplete={handleSplashComplete}
        />
      ) : (
        <AnimatePresence mode="wait">
          {renderScreen()}
        </AnimatePresence>
      )}

      {elevatorDoorsState !== 'idle' && (
        <div className={`fullscreen-elevator-doors ${elevatorDoorsState}`}>
          <div className="fullscreen-elevator-door left"></div>
          <div className="fullscreen-elevator-door right"></div>
        </div>
      )}
    </SmoothScroll>
  )
}
