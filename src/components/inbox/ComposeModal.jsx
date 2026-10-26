import React, { useState, useEffect } from 'react'
import useSoundEffects from '../../hooks/useSoundEffects'

export default function ComposeModal({
  isOpen,
  onClose,
  initialSubject = '',
  initialBody = '',
  onNavigateRoute,
  onShowToast
}) {
  const { playClick, playHover } = useSoundEffects()
  const [senderName, setSenderName] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [subject, setSubject] = useState(initialSubject || 'Project Inquiry / Collaboration')
  const [messageText, setMessageText] = useState(
    initialBody ||
    "Hi Dolapo,\n\nI'd love to chat about working together on [brief product description]. Loved the depth in your portfolio. Let's set up a meeting to talk through next steps."
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (initialSubject) setSubject(initialSubject)
    if (initialBody) setMessageText(initialBody)
  }, [initialSubject, initialBody])

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false)
      setIsSubmitting(false)
      setErrorMsg('')
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSend = async (e) => {
    e.preventDefault()
    playClick()

    if (!senderEmail || !senderEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address so Dolapo can reply directly to you.')
      return
    }

    setIsSubmitting(true)
    setErrorMsg('')

    try {
      const response = await fetch('https://formsubmit.co/ajax/dfordolapo@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: senderName.trim() || 'Portfolio Visitor',
          email: senderEmail.trim(),
          _subject: subject.trim() || 'Project Inquiry via Design Lab',
          message: messageText.trim(),
          _replyto: senderEmail.trim(),
          _template: 'table'
        })
      })

      const data = await response.json()

      if (response.ok && (data.success === 'true' || data.success === true)) {
        setIsSuccess(true)
        if (onShowToast) {
          onShowToast('✓ Email sent directly to Dolapo!')
        }
        setTimeout(() => {
          setIsSuccess(false)
          setIsSubmitting(false)
          setSenderEmail('')
          setSenderName('')
          onClose()
        }, 2400)
      } else {
        throw new Error(data.message || 'Direct dispatch was unsuccessful.')
      }
    } catch (err) {
      setErrorMsg('Direct dispatch was blocked. Opening your email client as fallback...')
      setTimeout(() => {
        const encodedSubject = encodeURIComponent(subject || 'Project Inquiry via Design Lab')
        const senderSignature = senderName ? `From: ${senderName} (${senderEmail})\n\n` : `From: ${senderEmail}\n\n`
        const encodedBody = encodeURIComponent(senderSignature + messageText)
        window.location.href = `mailto:dfordolapo@gmail.com?subject=${encodedSubject}&body=${encodedBody}`
        setIsSubmitting(false)
        onClose()
      }, 1500)
    }
  }

  return (
    <div className="inbox-compose-modal" role="dialog" aria-labelledby="compose-modal-title">
      <div className="inbox-compose-header">
        <span id="compose-modal-title" className="inbox-compose-title">
          {isSuccess ? 'Message Sent' : (initialSubject ? 'Reply to Thread' : 'New Message to Dolapo')}
        </span>
        <div className="inbox-compose-actions">
          <button
            type="button"
            className="inbox-compose-close"
            onClick={() => {
              playClick()
              onClose()
            }}
            aria-label="Close compose modal"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {isSuccess ? (
        <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            Message Sent Directly!
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', maxWidth: '360px', lineHeight: 1.55 }}>
            Thank you{senderName ? `, ${senderName}` : ''}! Your message has been delivered straight to <strong style={{ color: 'var(--accent-gold, #D4AF37)' }}>dfordolapo@gmail.com</strong>. Dolapo will reply directly to <span style={{ color: 'var(--text-primary)' }}>{senderEmail}</span>.
          </div>
        </div>
      ) : (
        <form onSubmit={handleSend}>
          {errorMsg && (
            <div style={{ padding: '0.45rem 1rem', fontSize: '0.74rem', color: '#f87171', background: 'rgba(239, 68, 68, 0.1)', borderBottom: '1px solid rgba(239, 68, 68, 0.2)' }}>
              {errorMsg}
            </div>
          )}

          <div className="inbox-compose-fields">
            <div className="inbox-compose-field-row">
              <span className="inbox-compose-field-label">To</span>
              <span style={{ color: 'var(--text-primary)', fontSize: '0.82rem' }}>
                Dolapo &lt;dfordolapo@gmail.com&gt;
              </span>
            </div>

            <div className="inbox-compose-field-row">
              <span className="inbox-compose-field-label">Your Email</span>
              <input
                type="email"
                className="inbox-compose-field-input"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="your.email@company.com"
                required
              />
            </div>

            <div className="inbox-compose-field-row">
              <span className="inbox-compose-field-label">Your Name</span>
              <input
                type="text"
                className="inbox-compose-field-input"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Name or company (optional)"
              />
            </div>

            <div className="inbox-compose-field-row">
              <span className="inbox-compose-field-label">Subject</span>
              <input
                type="text"
                className="inbox-compose-field-input"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject..."
                required
              />
            </div>
          </div>

          <div className="inbox-compose-body">
            <textarea
              className="inbox-compose-textarea"
              rows="6"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type your message here..."
              required
            />
          </div>

          <div className="inbox-compose-footer">
            <button
              type="submit"
              className="inbox-compose-send-btn"
              disabled={isSubmitting}
              onMouseEnter={playHover}
            >
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              {isSubmitting ? (
                <span className="inbox-send-spinner" />
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              )}
            </button>

            <button
              type="button"
              className="inbox-compose-call-btn"
              onClick={() => {
                playClick()
                onNavigateRoute('/book')
                onClose()
              }}
              onMouseEnter={playHover}
              title="Open booking calendar to schedule a session"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Or Book a Call</span>
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
