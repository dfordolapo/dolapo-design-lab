import { useState, useEffect } from 'react'
import { ROLES } from '../utils/roles'

export default function ElevatorScreen({ selectedDeptId, onComplete }) {
  const [currentFloor, setCurrentFloor] = useState('00')
  const [arrived, setArrived] = useState(false)
  
  const targetRole = ROLES.find(r => r.id === selectedDeptId) || ROLES[0]

  useEffect(() => {
    // animate floor numbers
    let floor = 0;
    const targetFloor = parseInt(targetRole.number, 10);
    const interval = setInterval(() => {
      floor++;
      setCurrentFloor(floor < 10 ? `0${floor}` : `${floor}`);
      if (floor >= targetFloor) {
        clearInterval(interval);
        setTimeout(() => setArrived(true), 500);
        if (onComplete) {
            setTimeout(onComplete, 2500); // 2.5s after arrival, trigger onComplete
        }
      }
    }, 600); // speed of elevator
    
    return () => clearInterval(interval);
  }, [targetRole, onComplete]);

  return (
    <div className={`elevator-screen ${arrived ? 'elevator-screen--arrived' : ''}`}>
        <div className="elevator-panel-left">
            <div className="elevator-brand">
                <span className="icon">🏢</span> ELEVATOR ACCESS
            </div>
            <h1 className="elevator-title">Select Your<br/><span>Destination</span></h1>
            <p className="elevator-desc">Each floor leads you to a different expertise inside the lab.</p>
            
            <div className="elevator-floor-display">
                <div className="floor-label">CURRENT FLOOR</div>
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
                    src="/assets/elevator_bg.png" 
                    className="elevator-bg" 
                    alt="Lab Atrium" 
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
        
        <div className="elevator-footer">
            <div className="explorer-info">
                <div className="explorer-avatar">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
                <div>
                    <div className="label">EXPLORER</div>
                    <div className="value">New Visitor</div>
                </div>
            </div>
            <div className="mission-statement">
                <span className="sparkle">✦</span> Every department. Every skill. One mission:<br/><strong>Build meaningful products.</strong>
            </div>
            <div className="progress-info">
                <div className="label">LAB PROGRESS</div>
                <div className="ring">0%</div>
                <div className="explored">
                    <div className="label">DEPARTMENTS EXPLORED</div>
                    <div className="value">0 / 3</div>
                </div>
            </div>
        </div>
    </div>
  )
}
