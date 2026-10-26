import React, { useRef, useEffect } from 'react'
import ThemeToggle from '../ThemeToggle'
import useTheme from '../../hooks/useTheme'
import useSoundEffects from '../../hooks/useSoundEffects'

export default function InboxToolbar({
  searchQuery,
  onSearchChange,
  onClearSearch,
  onToggleSidebar,
  sidebarOpen,
  onComposeClick
}) {
  const { theme } = useTheme()
  const { playClick, playHover } = useSoundEffects()
  const searchInputRef = useRef(null)

  // Global keyboard shortcut to focus search ("/" or "Cmd/Ctrl+K")
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is already typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return

      if (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <header className="inbox-toolbar" role="banner">
      <div className="inbox-toolbar__left">
        <button
          type="button"
          className="inbox-toolbar__menu-btn"
          onClick={() => {
            playClick()
            onToggleSidebar()
          }}
          onMouseEnter={playHover}
          aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          title="Toggle Navigation Sidebar"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div
          className="inbox-toolbar__brand"
          onClick={() => {
            playClick()
            window.location.href = '/'
          }}
          role="button"
          tabIndex={0}
          aria-label="Dolapo's Design Lab Home"
        >
          <span className="inbox-toolbar__brand-text">
            Dolapo's Design Lab
            <span className="inbox-toolbar__badge">Inbox</span>
          </span>
        </div>
      </div>

      <div className="inbox-toolbar__center">
        <div className="inbox-search-box">
          <svg className="inbox-search-box__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={searchInputRef}
            type="text"
            className="inbox-search-box__input"
            placeholder="Search messages, projects, or people..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search messages, projects, or people"
          />
          {searchQuery ? (
            <button
              type="button"
              className="inbox-search-box__clear"
              onClick={() => {
                playClick()
                onClearSearch()
                searchInputRef.current?.focus()
              }}
              aria-label="Clear search"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          ) : (
            <kbd className="inbox-search-box__kbd" title="Press / to search">/</kbd>
          )}
        </div>
      </div>

      <div className="inbox-toolbar__right">
        <ThemeToggle />

        <button
          type="button"
          className="inbox-profile-btn"
          onClick={() => {
            playClick()
            onComposeClick()
          }}
          onMouseEnter={playHover}
          title="Dolapo - Active (Click to Compose)"
        >
          <img
            src="/assets/designer.webp"
            alt="Dolapo"
            className="inbox-profile-avatar"
            decoding="async"
          />
          <div className="inbox-profile-info">
            <span className="inbox-profile-name">Dolapo</span>
            <span className="inbox-profile-status">Online</span>
          </div>
        </button>
      </div>
    </header>
  )
}
