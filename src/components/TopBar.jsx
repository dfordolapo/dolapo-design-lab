import React from 'react'
import useSoundEffects from '../hooks/useSoundEffects'
import useTheme from '../hooks/useTheme'
import '../styles/topbar-enhanced.css'

export default function TopBar({
  onBack,
  title = "DOLAPO'S DESIGN LAB",
  rightElement,
  hideBookingCTA = false,
  forceDark = false,
  isMainPage = true,
  variant = 'white'
}) {
  const { playHover, playClick } = useSoundEffects()
  const { theme } = useTheme()
  const effectiveTheme = forceDark ? 'dark' : theme

  const handleNavigateHome = () => {
    playClick()
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/' || window.location.pathname === '') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        window.history.pushState({}, '', '/')
        window.dispatchEvent(new Event('popstate'))
      }
    }
  }

  const handleNavigate = (path) => {
    playClick()
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path)
      window.dispatchEvent(new Event('popstate'))
    }
  }

  const handleHireClick = (e) => {
    playClick()
    // Auto-trigger CV download
    const link = document.createElement('a')
    link.href = '/assets/resume.pdf'
    link.download = 'resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <header className={`top-bar top-bar--variant-${variant} ${forceDark ? 'top-bar--force-dark' : ''}`} role="banner">
      <div className="top-bar__left">
        {onBack && !isMainPage && (
          <button
            className="top-bar__back"
            onClick={(e) => { playClick(); onBack(e) }}
            onMouseEnter={playHover}
            aria-label="Go Back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
        )}

        {/* Navigation Links */}
        <nav className="top-bar__nav-links" aria-label="Main Navigation">
          {!isMainPage && (
            <button
              type="button"
              className="top-bar__nav-link"
              onClick={handleNavigateHome}
              onMouseEnter={playHover}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              <span>Home</span>
            </button>
          )}

          <button
            type="button"
            className="top-bar__nav-link"
            onClick={() => handleNavigate('/departments')}
            onMouseEnter={playHover}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
            <span>Vault</span>
          </button>

          <button
            type="button"
            className="top-bar__nav-link"
            onClick={() => handleNavigate('/inbox')}
            onMouseEnter={playHover}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
              <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
            </svg>
            <span>Inbox</span>
          </button>
        </nav>
      </div>

      {title && title !== "DOLAPO'S DESIGN LAB" && (
        <span className="top-bar__center-title">{title}</span>
      )}

      <div className="top-bar__right">
        {/* Desktop Sticky Action Buttons */}
        <div className="top-bar__desktop-actions">
          <a
            href="/assets/resume.pdf"
            download="resume.pdf"
            className="top-bar__btn top-bar__btn--hire"
            onClick={handleHireClick}
            onMouseEnter={playHover}
          >
            <span>Hire Me</span>
          </a>

          {!hideBookingCTA && (
            <button
              type="button"
              className="top-bar__btn top-bar__btn--book"
              onClick={() => handleNavigate('/book')}
              onMouseEnter={playHover}
            >
              <div className="top-bar__btn-shimmer" aria-hidden="true" />
              <span>Book a Call</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          )}
        </div>

        {rightElement}
      </div>
    </header>
  )
}
