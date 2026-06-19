import { useEffect, useState } from 'react'
import { ROLES } from '../utils/roles.jsx'
import TopBar from './TopBar'
import useSoundEffects from '../hooks/useSoundEffects'

export default function DepartmentSelect({ onSelect, onBack }) {
  const [entered, setEntered] = useState(false)
  const [selected, setSelected] = useState(null)
  const { playHover, playClick } = useSoundEffects()

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100)
    return () => clearTimeout(t)
  }, [])

  const handleSelect = (roleId) => {
    playClick()
    setSelected(roleId)
    if (onSelect) {
      setTimeout(() => {
        setEntered(false)
        setTimeout(() => onSelect(roleId), 300)
      }, 100)
    }
  }

  return (
    <div className="page-with-topbar">
      <TopBar onBack={onBack} />
      <div className={`dept-screen${entered ? ' dept-screen--entered' : ''}`}>
        <div className="dept-screen__bg">
          <div className="dept-screen__grid"></div>
          <div className="dept-screen__glow dept-screen__glow--1"></div>
          <div className="dept-screen__glow dept-screen__glow--2"></div>
          <div className="dept-screen__glow dept-screen__glow--3"></div>
          <div className="dept-screen__scanline"></div>
        </div>

      <div className="dept-screen__content">
        <h1 className="dept-screen__title">Choose a <span>Department</span></h1>
        
        <div className="dept-screen__cards">
          {ROLES.map((role) => (
            <button
              key={role.id}
              className={`dept-card${selected === role.id ? ' dept-card--selected' : ''}`}
              style={{ '--card-accent': role.accent, '--card-hue': role.hue }}
              onClick={() => handleSelect(role.id)}
              onMouseEnter={playHover}
            >
              <div className="dept-card__header">
                <h2 className="dept-card__name">{role.name}</h2>
                <p className="dept-card__desc">{role.description}</p>
              </div>
              
              <div className="dept-card__arch-container">
                <div className="dept-card__arch-glow"></div>
                <div className="dept-card__arch"></div>
                <div className="dept-card__mascot">
                  <img
                    src={`/assets/${role.id}.png`}
                    alt={role.name}
                    className="dept-card__img"
                    loading="lazy"
                  />
                </div>
                
                {role.badges && role.badges.map((badge, idx) => (
                  <div 
                    key={idx} 
                    className={`badge badge--${badge.type}`}
                    style={{ top: badge.top, left: badge.left, right: badge.right }}
                  >
                    {badge.text.split('\n').map((line, i) => <div key={i}>{line}</div>)}
                  </div>
                ))}

                <div className="dept-card__floating-icon">{role.icon}</div>
              </div>
              
              <div className="dept-card__footer">
                <div className="dept-card__explore">
                  Explore {role.name}
                </div>
                <div className="dept-card__arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}
