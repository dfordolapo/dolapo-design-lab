import React from 'react'
import InboxMessageRow from './InboxMessageRow'
import useSoundEffects from '../../hooks/useSoundEffects'

export default function InboxMessageList({
  messages,
  selectedMessageId,
  onSelectMessage,
  onClearSearch,
  isSplitView
}) {
  const { playClick, playHover } = useSoundEffects()

  return (
    <div className={`inbox-list-pane ${isSplitView ? 'inbox-list-pane--split' : ''}`}>
      {/* Sub-toolbar: Conversation count */}
      <div className="inbox-sub-toolbar">
        <div className="inbox-sub-toolbar__left">
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Conversations</span>
        </div>
        <div className="inbox-sub-toolbar__right">
          <span>{messages.length} message{messages.length === 1 ? '' : 's'}</span>
        </div>
      </div>

      {/* Scrollable messages container */}
      <div className="inbox-messages-scroll" role="region" aria-label="Messages List">
        {messages.length > 0 ? (
          messages.map((message) => (
            <InboxMessageRow
              key={message.id}
              message={message}
              isSelected={selectedMessageId === message.id}
              onSelect={onSelectMessage}
            />
          ))
        ) : (
          <div className="inbox-empty-state">
            <svg className="inbox-empty-state__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
              <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
            </svg>
            <div className="inbox-empty-state__title">No conversations match your search</div>
            <p style={{ fontSize: '0.85rem', maxWidth: '320px', margin: '0 auto 1.25rem', color: 'var(--text-muted)' }}>
              Try searching for "Vurdict", "NailExpress", "Onboarding", "Feedback", or clear your current filters.
            </p>
            <button
              type="button"
              className="inbox-pane-btn"
              style={{ border: '1px solid var(--glass-border)', padding: '6px 14px' }}
              onClick={() => {
                playClick()
                onClearSearch?.()
              }}
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
