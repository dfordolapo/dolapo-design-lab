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

        {/* Brand Logo inside Top Nav Bar */}
        <div
          className="top-bar__logo-wrap"
          onClick={handleNavigateHome}
          onMouseEnter={playHover}
          role="button"
          tabIndex={0}
          aria-label="Dolapo's Design Lab - Return to top"
        >
          <img
            src={variant === 'white' ? '/assets/logo-dark.webp' : '/assets/logo-light.webp'}
            alt="Dolapo's Design Lab"
            className="top-bar__logo"
            fetchpriority="high"
            decoding="async"
          />
        </div>
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
            aria-label="Hire Me: Download CV"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Hire Me</span>
          </a>

          {!hideBookingCTA && (
            <a
              href="mailto:dfordolapo@gmail.com?subject=Say%20Hello"
              className="top-bar__btn top-bar__btn--book"
              onClick={() => playClick()}
              onMouseEnter={playHover}
              aria-label="Say Hello"
            >
              <div className="top-bar__btn-shimmer" aria-hidden="true" />
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="16" rx="3" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              <span>Say Hello</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          )}
        </div>

        {rightElement}
      </div>
    </header>
  )
}
