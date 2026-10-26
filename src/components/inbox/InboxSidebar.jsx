import React from 'react'
import { SIDEBAR_ITEMS } from '../../utils/inboxData'
import useSoundEffects from '../../hooks/useSoundEffects'

export default function InboxSidebar({
  activeFolder,
  onSelectFolder,
  counts,
  collapsed,
  mobileOpen,
  onCloseMobile,
  onComposeClick,
  onNavigateRoute,
  onOpenDepartments,
  onOpenProjects,
  onOpenAbout,
  onOpenLab
}) {
  const { playClick, playHover } = useSoundEffects()

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'inbox':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
            <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
          </svg>
        )
      case 'star':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        )
      case 'file':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        )
      case 'layers':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        )
      case 'folder':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
        )
      case 'user':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        )
      case 'calendar':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        )
      case 'compass':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
          </svg>
        )
      default:
        return null
    }
  }

  const handleItemClick = (item) => {
    playClick()
    if (mobileOpen) onCloseMobile()

    if (item.type === 'folder') {
      onSelectFolder(item.id)
    } else if (item.type === 'departments') {
      onOpenDepartments()
    } else if (item.type === 'projects') {
      onOpenProjects()
    } else if (item.type === 'lab') {
      if (onOpenLab) onOpenLab()
      else onNavigateRoute('/lab')
    } else if (item.type === 'about') {
      if (onOpenAbout) onOpenAbout()
      else onNavigateRoute('/about')
    } else if (item.type === 'book') {
      onNavigateRoute('/book')
    }
  }

  return (
    <>
      {mobileOpen && (
        <div
          className="inbox-sidebar-backdrop"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`inbox-sidebar ${collapsed ? 'inbox-sidebar--collapsed' : ''} ${mobileOpen ? 'inbox-sidebar--mobile-open' : ''}`}
        aria-label="Mail and Portfolio Navigation"
      >
        {/* Start a conversation Button */}
        <button
          type="button"
          className="inbox-compose-btn"
          onClick={() => {
            playClick()
            onComposeClick()
          }}
          onMouseEnter={playHover}
          title="Start a conversation"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          <span>Start a conversation</span>
        </button>

        {/* Clean Sidebar Navigation: Inbox, Drafts, Departments, Projects, About Me, Book a Session */}
        <nav className="inbox-sidebar__nav" aria-label="Inbox Navigation">
          {SIDEBAR_ITEMS.map((item) => {
            const count = item.countKey ? counts[item.countKey] || 0 : 0
            const isActive = activeFolder === item.id
            const isGold = item.id === 'book'

            return (
              <button
                key={item.id}
                type="button"
                className={`inbox-nav-item ${isActive ? 'active' : ''} ${isGold ? 'inbox-nav-item--book' : ''}`}
                onClick={() => handleItemClick(item)}
                onMouseEnter={playHover}
                title={item.label}
              >
                <div className="inbox-nav-item__left">
                  <span className="inbox-nav-item__icon">
                    {renderIcon(item.icon)}
                  </span>
                  <span className="inbox-nav-item__label">
                    {item.label}
                  </span>
                </div>
                {count > 0 && (
                  <span className="inbox-nav-item__count">{count}</span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Storage card: Unlimited Ideas & Craft Design Lab 2.0 */}
        <div className="inbox-sidebar__footer">
          <div className="inbox-storage-card">
            <div className="inbox-storage-card__header">
              <span>STORAGE</span>
              <span>11.4 MB / ∞</span>
            </div>
            <div className="inbox-storage-progress">
              <div className="inbox-storage-progress__bar"></div>
            </div>
            <div className="inbox-storage-card__sub">
              Unlimited Ideas & Craft • Design Lab 2.0
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
