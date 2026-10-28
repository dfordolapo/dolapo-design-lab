import React from 'react'
import useSoundEffects from '../hooks/useSoundEffects'
import '../styles/sticky-mobile-action-bar.css'

export default function StickyMobileActionBar({ onNavigate }) {
  const { playClick, playHover } = useSoundEffects()

  const handleBook = () => {
    playClick()
    if (onNavigate) {
      onNavigate('/book')
    } else {
      window.history.pushState({}, '', '/book')
      window.dispatchEvent(new Event('popstate'))
    }
  }

  const handleHire = () => {
    playClick()
    // Trigger download or mailto fallback
    const link = document.createElement('a')
    link.href = '/assets/resume.pdf'
    link.download = 'resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <nav className="sticky-mobile-action-bar" aria-label="Quick Actions">
      <div className="sticky-mobile-action-bar__inner">
        <a
          href="/assets/resume.pdf"
          download="resume.pdf"
          className="sticky-action-btn sticky-action-btn--hire"
          onClick={handleHire}
          onMouseEnter={playHover}
          aria-label="Hire Me: Download CV"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>Hire Me</span>
        </a>

        <button
          type="button"
          className="sticky-action-btn sticky-action-btn--book"
          onClick={handleBook}
          onMouseEnter={playHover}
          aria-label="Book a Call"
        >
          <div className="sticky-action-btn__glow" aria-hidden="true" />
          <span>Book a Call</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </nav>
  )
}
