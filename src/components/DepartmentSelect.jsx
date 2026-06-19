import { useEffect, useState } from 'react'
import { ROLES } from '../utils/roles'

export default function DepartmentSelect({ onSelect }) {
  const [entered, setEntered] = useState(false)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100)
    return () => clearTimeout(t)
  }, [])

  const handleSelect = (roleId) => {
    setSelected(roleId)
    if (onSelect) {
      setTimeout(() => {
        setEntered(false) // animate out
        setTimeout(() => onSelect(roleId), 300) // trigger callback
      }, 100)
    }
  }

  return (
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
            >
              <div className="dept-card__header">
                <span className="dept-card__number">{role.number}</span>
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

      <div className="dept-screen__footer-bar">
        <div className="dept-screen__tip">
          <div className="tip-icon">💡</div>
          <div className="tip-text">
            <strong>LAB TIP</strong>
            <span>You can explore all<br/>departments anytime.</span>
          </div>
        </div>
        
        <div className="dept-screen__progress">
          <div className="progress-info">
            <div className="explorer-details">
              <strong>EXPLORER STATUS</strong>
              <div className="explorer-name">
                <div className="explorer-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
                New Visitor
              </div>
              <div className="departments-visited">
                DEPARTMENTS VISITED<br/>0 / 3
              </div>
            </div>
          </div>
          <div className="progress-ring">
            <span>0%</span>
            <svg viewBox="0 0 36 36">
              <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="circle" strokeDasharray="0, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
