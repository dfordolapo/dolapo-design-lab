import React from 'react'
import useSoundEffects from '../../hooks/useSoundEffects'

function getInitials(sender) {
  if (!sender) return '?'
  const parts = sender.replace(/[·•]/g, ' ').trim().split(/\s+/).filter(Boolean)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

function formatInboxSubject(subject) {
  if (!subject) return '""'
  const clean = subject.replace(/^["“]+|["”]+$/g, '').trim()
  return `"${clean}"`
}

export default function InboxMessageRow({
  message,
  isSelected,
  onSelect
}) {
  const { playClick, playHover } = useSoundEffects()

  const handleRowClick = () => {
    playClick()
    onSelect(message.id)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleRowClick()
    }
  }

  return (
    <div
      className={`inbox-message-row ${message.unread ? 'unread' : 'read'} ${isSelected ? 'active' : ''}`}
      onClick={handleRowClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={playHover}
      role="button"
      tabIndex={0}
      aria-selected={isSelected}
      aria-label={`Email from ${message.sender}: ${message.subject}`}
    >
      {/* Controls: Unread indicator dot */}
      <div className="inbox-row-controls">
        <span
          className={`inbox-unread-dot ${message.unread ? '' : 'read'}`}
          title={message.unread ? 'Unread message' : 'Read'}
          aria-hidden="true"
        />
      </div>

      {/* Sender Avatar / Initials */}
      <div className="inbox-row-avatar" aria-hidden="true">
        {message.senderAvatar ? (
          <img src={message.senderAvatar} alt="" className="inbox-row-avatar__img" decoding="async" />
        ) : (
          <span className="inbox-row-avatar__initials">
            {message.senderInitials || getInitials(message.sender)}
          </span>
        )}
      </div>

      {/* Main Content Area: Sender + Quoted Subject ONLY */}
      <div className="inbox-message-row__body">
        <div className="inbox-message-row__header-line">
          <div className="inbox-message-row__sender" title={message.sender}>
            {message.sender}
          </div>
          <div className="inbox-message-row__time inbox-message-row__time--mobile">
            Just now
          </div>
        </div>

        <div className="inbox-message-row__content">
          <span className="inbox-message-row__subject" title={message.subject}>
            {formatInboxSubject(message.subject)}
          </span>
        </div>
      </div>

      {/* Meta: Timestamp (Desktop) */}
      <div className="inbox-message-row__meta">
        <div className="inbox-message-row__time">{message.timestamp}</div>
      </div>
    </div>
  )
}
