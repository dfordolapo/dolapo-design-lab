import useSoundEffects from '../hooks/useSoundEffects'

const MAGNETIC_STRENGTH = 0.35
const MAGNETIC_MAX = 14

export default function BookSessionCTA({ variant = 'primary', onClick }) {
  const { playHover, playClick } = useSoundEffects()

  const magneticEnabled = typeof window !== 'undefined'
    && window.matchMedia?.('(hover: hover) and (pointer: fine)').matches
    && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const handleClick = (e) => {
    playClick()
    
    if (onClick) {
      onClick(e)
    } else {
      window.history.pushState({}, '', '/book')
      window.dispatchEvent(new Event('popstate'))
    }
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

  if (variant === 'nav') {
    return (
      <button 
        className="book-nav-cta" 
        onClick={handleClick}
        onMouseEnter={playHover}
      >
        <div className="book-nav-cta__glow"></div>
        <span className="book-nav-cta__text">Book a Session</span>
      </button>
    )
  }

  if (variant === 'secondary') {
    return (
      <button 
        className="book-secondary-cta cta-button--magnetic" 
        onClick={handleClick}
        onMouseEnter={playHover}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <span className="book-secondary-cta__text">Book a Session</span>
      </button>
    )
  }

  return null
}
