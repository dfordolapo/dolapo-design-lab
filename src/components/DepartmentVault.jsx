import { useState, useEffect } from 'react'
import TopBar from './TopBar'
import useSoundEffects from '../hooks/useSoundEffects'
import { CASE_STUDIES } from '../utils/caseStudies'
import { ROLES } from '../utils/roles.jsx'

const THEME_COLORS = {
  designer: '#8b5cf6',
  writer: '#e879f9',
  builder: '#60a5fa'
}

export default function DepartmentVault({ departmentId, onBack, onViewProject }) {
  const { playHover, playClick } = useSoundEffects()
  const [activeProjectIdx, setActiveProjectIdx] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const projects = CASE_STUDIES.filter(cs => cs.departmentId === departmentId)
  const displayProjects = projects.length > 0 ? projects : CASE_STUDIES
  const activeProject = displayProjects[activeProjectIdx]
  const themeColor = THEME_COLORS[departmentId] || '#8b5cf6'
  const activeRole = ROLES.find(r => r.id === departmentId) || ROLES[0]

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        playClick()
        setActiveProjectIdx(prev => (prev - 1 + displayProjects.length) % displayProjects.length)
      } else if (e.key === 'ArrowRight') {
        playClick()
        setActiveProjectIdx(prev => (prev + 1) % displayProjects.length)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [displayProjects.length, playClick])

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
      setActiveProjectIdx(prev => (prev + 1) % displayProjects.length)
    } else if (distance < -minSwipeDistance) {
      playClick()
      setActiveProjectIdx(prev => (prev - 1 + displayProjects.length) % displayProjects.length)
    }
  }

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

        {/* LEFT SIDEBAR NAVIGATION */}
        <div className="vault-sidebar">
          <div className="vault-sidebar__header">
            <h2 className="vault-logo">DOLAPO'S<br/>DESIGN LAB</h2>
            <p className="vault-welcome">Welcome to the</p>
            <h1 className="vault-dept-title">
              {departmentId.replace('-', ' ')}<br/>Lab
            </h1>
            <p className="vault-dept-desc">
              {activeRole.vaultDescription}
            </p>
          </div>

          <div className="vault-sidebar__index">
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
          </div>
        </div>

        {/* MAIN STAGE (3D GLASS CYLINDERS) */}
        <div className="vault-stage">
          {displayProjects.map((proj, idx) => {
            let positionClass = 'hidden';
            if (idx === activeProjectIdx) positionClass = 'center';
            else if (idx === activeProjectIdx - 1 || (activeProjectIdx === 0 && idx === displayProjects.length - 1)) positionClass = 'left';
            else if (idx === activeProjectIdx + 1 || (activeProjectIdx === displayProjects.length - 1 && idx === 0)) positionClass = 'right';

            return (
              <div key={proj.id} className={`vault-cylinder ${positionClass}`}>
                <div className="cylinder-glass"></div>

                <div className="cylinder-content">
                  <div className="cylinder-content__visual">
                    <div className="product-preview">
                      <img src={proj.vaultImage} alt={proj.title} className="project-hero-image" />
                    </div>
                  </div>

                  <button 
                    className="view-project-btn"
                    onClick={handleViewProject}
                    onMouseEnter={playHover}
                  >
                    VIEW PROJECT &rarr;
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* BOTTOM CAROUSEL */}
        <div className="vault-carousel">
          <div className="carousel-label">VIEW ALL PROJECTS &rarr;</div>
          <div className="carousel-track">
            {displayProjects.map((proj, idx) => (
              <div 
                key={proj.id}
                className={`carousel-item ${idx === activeProjectIdx ? 'active' : ''}`}
                onClick={() => handleSelectProject(idx)}
                onMouseEnter={playHover}
              >
                <img src={proj.vaultImage} alt={proj.title} />
                <div className="carousel-item__overlay">
                  <span>{proj.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
