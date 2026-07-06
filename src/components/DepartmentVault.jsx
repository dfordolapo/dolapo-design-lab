import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useDragControls } from 'framer-motion'
import TopBar from './TopBar'
import useSoundEffects from '../hooks/useSoundEffects'
import ScrambleText from './ScrambleText'
import { CASE_STUDIES } from '../utils/caseStudies.jsx'
import { ROLES } from '../utils/roles.jsx'
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal'
import usePageSEO from '../hooks/usePageSEO'

const THEME_COLORS = {
  designer: '#8b5cf6',
  writer: '#e879f9',
  builder: '#60a5fa'
}

export default function DepartmentVault({ departmentId, onBack, onViewProject }) {
  const activeRole = ROLES.find(r => r.id === departmentId) || ROLES[0]

  usePageSEO({
    title: `${activeRole.name} Vault`,
    description: activeRole.vaultDescription || `Explore the ${activeRole.name} projects.`
  })

  const { playHover, playClick } = useSoundEffects()
  const [activeProjectIdx, setActiveProjectIdx] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const carouselRef = useRef(null)

  const dragX = useMotionValue(0)
  const dragSpring = useSpring(dragX, { stiffness: 300, damping: 30 })
  const dragOpacity = useTransform(dragSpring, [-200, 0, 200], [0.5, 1, 0.5])
  const dragControls = useDragControls()

  const projects = CASE_STUDIES.filter(cs => cs.departmentId === departmentId)
  const displayProjects = projects.length > 0 ? projects : CASE_STUDIES
  
  // Create a 4-item array if there are exactly 2 items to allow flawless infinite looping
  const renderProjects = displayProjects.length === 2 
    ? [...displayProjects, ...displayProjects.map(p => ({ ...p, id: p.id + '_clone' }))] 
    : displayProjects;

  // Ensure activeProject gets the original data properties even if it's currently on a clone
  const activeProject = renderProjects[activeProjectIdx]
  const themeColor = activeProject?.themeColor || THEME_COLORS[departmentId] || '#8b5cf6'

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        playClick()
        setActiveProjectIdx(prev => (prev - 1 + renderProjects.length) % renderProjects.length)
      } else if (e.key === 'ArrowRight') {
        playClick()
        setActiveProjectIdx(prev => (prev + 1) % renderProjects.length)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [renderProjects.length, playClick])

  const minSwipeDistance = 50 
  const handleTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > minSwipeDistance) {
      playClick()
      setActiveProjectIdx(prev => (prev + 1) % renderProjects.length)
    } else if (distance < -minSwipeDistance) {
      playClick()
      setActiveProjectIdx(prev => (prev - 1 + renderProjects.length) % renderProjects.length)
    }
  }

  const handleDragEnd = useCallback((_, info) => {
    const offset = info.offset.x
    if (offset < -80) {
      playClick()
      setActiveProjectIdx(prev => (prev + 1) % renderProjects.length)
    } else if (offset > 80) {
      playClick()
      setActiveProjectIdx(prev => (prev - 1 + renderProjects.length) % renderProjects.length)
    }
    dragX.set(0)
  }, [renderProjects.length, playClick, dragX])

  const handleSelectProject = (idx) => {
    if (idx !== activeProjectIdx) {
      playClick()
      setActiveProjectIdx(idx)
    }
  }

  const handleViewProject = () => {
    playClick()
    onViewProject(activeProject)
  }

  return (
    <div className="page-with-topbar">
      <TopBar onBack={onBack} />
      <div 
        className="vault-dashboard" 
        style={{ '--theme-color': themeColor }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <svg style={{ display: 'none' }}>
          <defs>
            <filter id="glitch-shader">
              <feTurbulence type="fractalNoise" baseFrequency="0.05 0.95" numOctaves="1" result="noise" />
              <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" in="noise" result="coloredNoise" />
              <feDisplacementMap in="SourceGraphic" in2="coloredNoise" scale="20" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        {/* LEFT SIDEBAR NAVIGATION - desktop only */}
        {window.innerWidth > 768 && (
        <div className="vault-sidebar">
          <div className="vault-sidebar__header">
            <ScrambleText 
              as="h1" 
              className="vault-dept-title" 
              text={`${activeRole.name} Lab`} 
              duration={0.8}
            />
            <ScrambleText 
              as="p" 
              className="vault-dept-desc" 
              text={activeRole.vaultDescription} 
              duration={1.2}
              delay={0.2}
            />
          </div>

          <ScrollReveal variant="fadeIn" delay={0.3} className="vault-sidebar__index">
            {displayProjects.map((proj, idx) => (
              <button 
                key={proj.id}
                className={`vault-index-item ${idx === activeProjectIdx ? 'active' : ''}`}
                onClick={() => handleSelectProject(idx)}
                onMouseEnter={playHover}
              >
                <span className="index-number">0{idx + 1}</span>
                <span className="index-category">{proj.category}</span>
              </button>
            ))}
          </ScrollReveal>
        </div>
        )}

        {/* MAIN STAGE (3D GLASS CYLINDERS) */}
        <div className="vault-stage">
          <motion.div
            className="vault-stage-drag-area"
            drag="x"
            dragControls={dragControls}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            onDragEnd={handleDragEnd}
            style={{ x: dragSpring, opacity: dragOpacity }}
            whileTap={{ cursor: 'grabbing' }}
          >
            {renderProjects.map((proj, idx) => {
              let positionClass = 'hidden';
              if (idx === activeProjectIdx) {
                positionClass = 'center';
              } else if (idx === (activeProjectIdx - 1 + renderProjects.length) % renderProjects.length) {
                positionClass = 'left';
              } else if (idx === (activeProjectIdx + 1) % renderProjects.length) {
                positionClass = 'right';
              }

              // Only mount center + immediate neighbors — keeps iOS GPU layer count to 3
              if (positionClass === 'hidden') return null;

              return (
                <div 
                  key={proj.id} 
                  className={`vault-cylinder ${positionClass}`}
                  onClick={() => handleSelectProject(idx)}
                  style={{ cursor: positionClass !== 'center' ? 'pointer' : 'default' }}
                >
                  <div className="cylinder-glass"></div>

                  <div className="cylinder-content">
                    <div className="cylinder-content__visual">
                      {proj.vaultLogo && (
                        <div className={`vault-logo-overlay ${proj.noGlow ? 'no-glow' : ''}`}>
                          {proj.vaultLogo}
                        </div>
                      )}
                    </div>

                    <button 
                      className="view-project-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewProject();
                      }}
                      onMouseEnter={playHover}
                    >
                      VIEW PROJECT &rarr;
                    </button>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>

        {/* BOTTOM CAROUSEL */}
        <div className="vault-carousel" ref={carouselRef}>
          <div className="carousel-label">VIEW ALL PROJECTS &rarr;</div>
          <div className="carousel-track">
            {displayProjects.map((proj, idx) => (
              <div 
                key={proj.id}
                className={`carousel-item ${idx === (activeProjectIdx % displayProjects.length) ? 'active' : ''}`}
                onClick={() => handleSelectProject(idx)}
                onMouseEnter={playHover}
              >
                {proj.logoOnlyPreview ? (
                  <div className="carousel-item-logo">
                    {proj.thumbnailLogo || proj.vaultLogo}
                  </div>
                ) : !proj.textOnlyPreview && (
                  <img src={proj.vaultImage} alt={proj.shortTitle || proj.title} loading="lazy" decoding="async" draggable={false} />
                )}
                <div className="carousel-item__overlay">
                  <span>{proj.shortTitle || proj.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
