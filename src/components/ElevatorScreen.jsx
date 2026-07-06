import { useState, useEffect } from 'react'
import { ROLES } from '../utils/roles.jsx'
import TopBar from './TopBar'
import useSoundEffects from '../hooks/useSoundEffects'
import useTheme from '../hooks/useTheme'

export default function ElevatorScreen({ selectedDeptId, onComplete, onAbort }) {
  const [currentFloor, setCurrentFloor] = useState('00')
  const [arrived, setArrived] = useState(false)
  const { startHum, stopHum, playDing } = useSoundEffects()
  const { theme } = useTheme()
  
  const targetRole = ROLES.find(r => r.id === selectedDeptId) || ROLES[0]

  useEffect(() => {
    // animate floor numbers
    let floor = 0;
    const targetFloor = parseInt(targetRole.number, 10);
    
    startHum()
    
    const interval = setInterval(() => {
      floor++;
      setCurrentFloor(floor < 10 ? `0${floor}` : `${floor}`);
      if (floor >= targetFloor) {
        clearInterval(interval);
        setTimeout(() => {
          setArrived(true)
          stopHum()
          playDing()
        }, 500);
        if (onComplete) {
            setTimeout(onComplete, 2500); // 2.5s after arrival, trigger onComplete
        }
      }
    }, 600); // speed of elevator
    
    return () => {
      clearInterval(interval)
      stopHum()
    }
  }, [targetRole, onComplete, startHum, stopHum, playDing]);

  return (
    <div className="page-with-topbar">
      <TopBar onBack={onAbort} />
      <div 
        className={`elevator-screen ${arrived ? 'elevator-screen--arrived' : ''}`}
        style={{ '--theme-color': targetRole.accent }}
      >
        <div className="elevator-panel-left">
            <div className="elevator-direction-block" style={{ marginBottom: 'auto' }}>
                <div className="elevator-direction" style={{ margin: '0 0 8px 0', gap: '16px' }}>
                    <div className="up-arrow">▲</div>
                    <h1 className="elevator-title" style={{ marginBottom: 0 }}>GOING <span>UP</span></h1>
                </div>
                <p className="elevator-desc elevator-led-text" style={{ marginLeft: '10px', marginBottom: '32px' }}>DEST: FLOOR {targetRole.number}</p>
            </div>
            
            <div className="elevator-floor-display">
                <div className="floor-number">{currentFloor}</div>
                
                <div className="elevator-buttons">
                    <div className="elevator-buttons-line"></div>
                    {[...ROLES].reverse().map(role => {
                        const isActive = role.number === currentFloor || (arrived && role.id === selectedDeptId);
                        const isTarget = role.id === selectedDeptId;
                        return (
                            <div key={role.id} className={`elevator-btn-row ${isActive ? 'elevator-btn-row--active' : ''} ${isTarget ? 'elevator-btn-row--target' : ''}`}>
                                <div className="elevator-btn">{role.number}</div>
                                <div className="elevator-dot"></div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        
        <div className="elevator-shaft">
            <div className="elevator-glass">
                <img 
                    src={theme === 'light' ? "/assets/elevator_bg_light.webp" : "/assets/elevator_bg.webp"} 
                    className="elevator-bg" 
                    alt="Lab Atrium" 
                    fetchpriority="high"
                    decoding="async"
                    style={{ transform: `translateY(${ -30 + parseInt(currentFloor, 10) * 10 }%)` }}
                />
                <div className="elevator-reflection"></div>
                <div className="elevator-light-beam"></div>
            </div>
        </div>
        
        <div className="elevator-panel-right">
            <div className="elevator-destinations">
                {[...ROLES].reverse().map(role => {
                    const isActive = role.number === currentFloor || (arrived && role.id === selectedDeptId);
                    return (
                    <div 
                        key={role.id} 
                        className={`destination-card ${isActive ? 'destination-card--active' : ''}`}
                        style={{ '--accent': role.accent }}
                    >
                        <div className="destination-number">{role.number}</div>
                        <div className="destination-info">
                            <h3>{role.name.toUpperCase()}</h3>
                        </div>
                        <div className="destination-arrow">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
        
    </div>
    </div>
  )
}
