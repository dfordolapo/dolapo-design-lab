import useSoundEffects from '../hooks/useSoundEffects'

const MAGNETIC_STRENGTH = 0.35
const MAGNETIC_MAX = 14

export default function CTAButton({ onClick, secondaryCTA }) {
  const { playHover, playClick } = useSoundEffects()

  const magneticEnabled = typeof window !== 'undefined'
    && window.matchMedia?.('(hover: hover) and (pointer: fine)').matches
    && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const handleClick = (e) => {
    playClick()
    if (onClick) onClick(e)
  }

  const handleMouseMove = (e) => {
    if (!magneticEnabled) return
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const offsetX = e.clientX - (rect.left + rect.width / 2)
    const offsetY = e.clientY - (rect.top + rect.height / 2)
    const x = Math.max(-MAGNETIC_MAX, Math.min(MAGNETIC_MAX, offsetX * MAGNETIC_STRENGTH))
    const y = Math.max(-MAGNETIC_MAX, Math.min(MAGNETIC_MAX, offsetY * MAGNETIC_STRENGTH))
    btn.style.transform = `translate(${x}px, ${y - 2}px)`
  }

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = ''
  }

  return (
    <div className="cta-container" id="cta-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}>
      <button 
        className="cta-button cta-button--magnetic" 
        id="enter-lab-btn" 
        type="button" 
        aria-label="Enter Dolapo's Design Lab" 
        onClick={handleClick}
        onMouseEnter={playHover}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="cta-button__glow"></div>
        <span className="cta-button__text">Enter The Lab</span>
        <span className="cta-button__arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </span>
      </button>
      {secondaryCTA}
    </div>
  )
}
