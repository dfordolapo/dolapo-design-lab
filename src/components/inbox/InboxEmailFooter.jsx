import React, { useState, useRef } from 'react'
import useSoundEffects from '../../hooks/useSoundEffects'

export default function InboxEmailFooter({ onNavigateRoute, onShowToast }) {
  const [isOpen, setIsOpen] = useState(false)
  const bodyRef = useRef(null)
  const { playClick, playHover } = useSoundEffects()

  const conversationStarter = `Hi Dolapo,\n\nI'd love to chat about working together on [brief product description]. Loved the depth in your portfolio. Let's set up a meeting to talk through next steps.`

  const handleCopyStarter = (e) => {
    e.stopPropagation()
    playClick()
    navigator.clipboard.writeText(conversationStarter)
    if (onShowToast) {
      onShowToast('✓ Conversation starter copied to clipboard!')
    }
  }

  const handleToggle = () => {
    playClick()
    setIsOpen(prev => {
      const next = !prev
      if (next) {
        // Smoothly bring the top of the newly expanded trimmed content right into view
        requestAnimationFrame(() => {
          setTimeout(() => {
            bodyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }, 50)
        })
      }
      return next
    })
  }

  return (
    <div className="inbox-thread-footer" aria-label="Working together thread footer">
      {isOpen && (
        <div className="inbox-thread-footer__body" ref={bodyRef}>
          <div className="inbox-thread-footer__note-heading">
            <h4 className="inbox-thread-footer__note-title">A little note before you go.</h4>
          </div>

          <div className="inbox-thread-letter">
            <p className="inbox-thread-letter__salutation">Hi there,</p>
            <p className="inbox-thread-letter__p">
              If you've made it all the way down here, something must have caught your attention.
            </p>
            <p className="inbox-thread-letter__p">
              Maybe it was a project. Maybe it was the way I approached a problem. Maybe you're already imagining what we could build together.
            </p>
            <p className="inbox-thread-letter__p">
              Whatever brought you here, I'd love to hear from you.
            </p>
            <p className="inbox-thread-letter__p">
              Until our next conversation,
            </p>
            <div className="inbox-thread-letter__signoff">
              <strong>Dolapo</strong>
              <span>Product Designer · UX Writer · Design Engineer</span>
            </div>
          </div>

          <div className="inbox-thread-actions">
            <button
              type="button"
              className="inbox-thread-btn inbox-thread-btn--primary"
              onClick={() => {
                playClick()
                onNavigateRoute('/book')
              }}
              title="Open 15-minute booking calendar"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Book a Lab Session</span>
            </button>

            <a
              href="mailto:dfordolapo@gmail.com?subject=Re:%20Working%20together?"
              className="inbox-thread-btn inbox-thread-btn--secondary"
              onClick={() => playClick()}
              title="Send direct email"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>Send an Email</span>
            </a>

            <a
              href="https://x.com/dsignwithdolapo"
              target="_blank"
              rel="noopener noreferrer"
              className="inbox-thread-btn inbox-thread-btn--ghost"
              onClick={() => playClick()}
              title="Connect on X @dsignwithdolapo"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>X (@dsignwithdolapo)</span>
            </a>

            <button
              type="button"
              className="inbox-thread-btn inbox-thread-btn--ghost"
              onClick={handleCopyStarter}
              title="Copy intro email template to clipboard"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>Copy conversation starter</span>
            </button>
          </div>
        </div>
      )}

      <div
        className="inbox-thread-footer__header"
        onClick={handleToggle}
        onMouseEnter={playHover}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
      >
        <div className="inbox-thread-footer__left">
          <div className="inbox-thread-footer__title">
            <span>Re: Working together?</span>
            <span className="inbox-thread-footer__draft-badge">Draft</span>
          </div>
          <div className="inbox-thread-footer__sender-sub">
            From Dolapo · Just now
          </div>
        </div>

        <div className="inbox-thread-footer__right">
          <button
            type="button"
            className="inbox-thread-footer__trimmed-btn"
            onClick={(e) => {
              e.stopPropagation()
              handleToggle()
            }}
            title={isOpen ? 'Hide trimmed content' : 'View trimmed content'}
            aria-label={isOpen ? 'Hide trimmed content' : 'View trimmed content'}
          >
            <span className="inbox-trimmed-dots">…</span>
            <span className="inbox-trimmed-text">{isOpen ? 'Hide content' : 'View trimmed content'}</span>
          </button>

          <svg
            className={`inbox-thread-footer__toggle-icon ${isOpen ? 'open' : ''}`}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </div>
      </div>
    </div>
  )
}
