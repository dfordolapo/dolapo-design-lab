import React from 'react'
import InboxEmailFooter from './InboxEmailFooter'
import useSoundEffects from '../../hooks/useSoundEffects'

function cleanExpandedSubject(subject) {
  if (!subject) return ''
  return subject.replace(/^["“]+|["”]+$/g, '').trim()
}

export default function InboxReadingPane({
  message,
  onClose,
  onViewProject,
  onNavigateRoute,
  onComposeReply,
  onShowToast,
  onOpenDepartments,
  onOpenProjects
}) {
  const { playClick, playHover } = useSoundEffects()
  const scrollRef = React.useRef(null)

  // Current time the user is viewing the message on their device
  const [deviceTimeStr, setDeviceTimeStr] = React.useState('')

  React.useEffect(() => {
    try {
      const now = new Date()
      const formatted = now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      }) + ', ' + now.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit'
      })
      setDeviceTimeStr(formatted)
    } catch (e) {
      setDeviceTimeStr('Just now')
    }
  }, [message?.id])

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [message?.id])

  if (!message) {
    return (
      <div className="inbox-reading-pane" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div className="inbox-empty-state">
          <svg className="inbox-empty-state__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <div className="inbox-empty-state__title">Select a conversation to read</div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Choose an email from the inbox list to preview project details and client feedback.
          </p>
        </div>
      </div>
    )
  }

  const handleActionClick = (cta) => {
    playClick()
    if (!cta) return

    if (cta.action === 'open-project' && cta.projectId) {
      onViewProject(cta.projectId)
    } else if (cta.action === 'open-url' && cta.url) {
      window.open(cta.url, '_blank', 'noopener,noreferrer')
    } else if (cta.action === 'navigate-book') {
      onNavigateRoute('/book')
    } else if (cta.action === 'open-departments') {
      if (onOpenDepartments) onOpenDepartments()
    } else if (cta.action === 'open-projects') {
      if (onOpenProjects) onOpenProjects()
    } else if (cta.action === 'close-reading') {
      onClose()
    } else if (cta.action === 'mailto-creator') {
      window.location.href = 'mailto:dfordolapo@gmail.com?subject=Project%20Inquiry%20via%20Design%20Lab'
    } else if (cta.action === 'filter-projects') {
      // Closes reading pane or scrolls to projects
      onClose()
    }
  }

  const isTeeraboh = message?.id === 'msg-teeraboh'

  return (
    <div className={`inbox-reading-pane ${isTeeraboh ? 'inbox-reading-pane--teeraboh' : ''}`} role="region" aria-label="Reading Pane">
      {/* Top action bar */}
      <div className="inbox-reading-pane__topbar">
        <div className="inbox-reading-pane__actions-left">
          <button
            type="button"
            className="inbox-pane-btn"
            onClick={() => {
              playClick()
              onClose()
            }}
            onMouseEnter={playHover}
            title="Back to Inbox List"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back</span>
          </button>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button
            type="button"
            className="inbox-pane-btn"
            onClick={() => {
              playClick()
              onComposeReply(message)
            }}
            onMouseEnter={playHover}
            title="Reply to this thread"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 17 4 12 9 7" />
              <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
            </svg>
            <span>Reply</span>
          </button>
        </div>
      </div>

      {/* Scrollable Email Content */}
      <div className="inbox-reading-scroll" ref={scrollRef}>
        {/* Email Subject Header */}
        <div className="inbox-email-header">
          <h1 className="inbox-email-subject">{cleanExpandedSubject(message.subject)}</h1>

          <div className="inbox-email-sender-card">
            <div className="inbox-sender-profile">
              <div className="inbox-sender-avatar">
                {message.senderAvatar ? (
                  <img src={message.senderAvatar} alt={message.sender} decoding="async" />
                ) : (
                  <span>{message.sender.charAt(0)}</span>
                )}
              </div>

              <div className="inbox-sender-details">
                <div className="inbox-sender-name-row">
                  <span className="inbox-sender-name">{message.sender}</span>
                  <span className="inbox-sender-handle">&lt;{message.senderHandle}&gt;</span>
                </div>
                <div className="inbox-recipient-row">
                  <span className="inbox-recipient-to">to You &lt;visitor@designwithdolapo.pro&gt;</span>
                  <span className="inbox-recipient-dot" aria-hidden="true">•</span>
                  <span className="inbox-email-date">{deviceTimeStr || 'Just now'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Relevant Project Context Card (Above Testimonial) */}
        {message.projectContext && (
          <div className="inbox-project-context-card" aria-label="Project Collaboration Context">
            {message.projectContext.badge && (
              <div className="inbox-context-item">
                <span className="inbox-context-label">Status</span>
                <span className="inbox-context-value inbox-context-badge" style={{ borderColor: 'rgba(212, 175, 55, 0.4)', color: '#D4AF37' }}>
                  {message.projectContext.badge}
                </span>
              </div>
            )}
            <div className="inbox-context-item">
              <span className="inbox-context-label">Project</span>
              <span className="inbox-context-value">{message.projectContext.project}</span>
            </div>
            {message.projectContext.deliverable && (
              <div className="inbox-context-item">
                <span className="inbox-context-label">Deliverable</span>
                <span className="inbox-context-value">{message.projectContext.deliverable}</span>
              </div>
            )}
            {message.projectContext.period && (
              <div className="inbox-context-item">
                <span className="inbox-context-label">Collaboration Period</span>
                <span className="inbox-context-value">{message.projectContext.period}</span>
              </div>
            )}
            {message.projectContext.clientIdentity ? (
              <div className="inbox-context-item">
                <span className="inbox-context-label">Identity</span>
                <span className="inbox-context-value inbox-context-badge">{message.projectContext.clientIdentity}</span>
              </div>
            ) : message.category ? (
              <div className="inbox-context-item">
                <span className="inbox-context-label">Category</span>
                <span className="inbox-context-value inbox-context-badge">{message.category}</span>
              </div>
            ) : null}
          </div>
        )}

        {/* Email Body */}
        <article className="inbox-email-body">
          {message.body?.salutation && (
            <div className="inbox-email-salutation">{message.body.salutation}</div>
          )}

          {message.body?.paragraphs?.map((p, idx) => (
            <p key={idx} className="inbox-email-p">{p}</p>
          ))}

          {/* Interactive Guide Items if present */}
          {message.body?.guideItems && message.body.guideItems.length > 0 && (
            <div className="inbox-guide-list" aria-label="Portfolio Navigation Guide">
              {message.body.guideItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`inbox-guide-card ${item.action ? 'inbox-guide-card--interactive' : ''}`}
                  onClick={() => item.action && handleActionClick(item)}
                  role={item.action ? 'button' : undefined}
                  tabIndex={item.action ? 0 : undefined}
                  title={item.action ? `Click to open ${item.title}` : undefined}
                >
                  <div className="inbox-guide-card__icon">{item.icon}</div>
                  <div className="inbox-guide-card__content">
                    <div className="inbox-guide-card__header">
                      <span className="inbox-guide-card__title">{item.title}</span>
                      {item.action && (
                        <span className="inbox-guide-card__hint">
                          {item.action === 'close-reading' ? 'Browse inbox →' : item.action === 'navigate-book' ? 'Book session →' : 'Explore vaults →'}
                        </span>
                      )}
                    </div>
                    <p className="inbox-guide-card__desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {message.body?.closingNote && (
            <p className="inbox-email-p" style={{ marginTop: '1.25rem' }}>{message.body.closingNote}</p>
          )}

          {/* Testimonial Quote Callout if present */}
          {message.testimonial?.quote && (
            <div className={`inbox-testimonial-box ${message.id === 'msg-teeraboh' ? 'inbox-testimonial-box--teeraboh-special' : ''}`}>
              {message.id === 'msg-teeraboh' && (
                <div className="teeraboh-playful-header">
                  <div className="teeraboh-stamp-tag">
                    <span className="teeraboh-stamp-dot"></span>
                    <span>BEST IN BOOTCAMP</span>
                  </div>
                </div>
              )}

              <div className="inbox-testimonial-quote">“{message.testimonial.quote}”</div>

              <div className="inbox-testimonial-author">
                {message.id === 'msg-teeraboh' ? (
                  <div className="teeraboh-author-layout">
                    <div className="teeraboh-avatar-badge">TZ</div>
                    <div className="teeraboh-author-details">
                      <div className="teeraboh-author-name">{message.testimonial.author}</div>
                      <div className="teeraboh-author-role">{message.testimonial.role} · {message.testimonial.company}</div>
                    </div>
                  </div>
                ) : (
                  <span>- {message.testimonial.author}, {message.testimonial.role} at {message.testimonial.company}</span>
                )}
              </div>
            </div>
          )}

          {/* Interactive Next Steps Links if present */}
          {message.body?.links && message.body.links.length > 0 && (
            <div className="inbox-next-steps-links" aria-label="Next step links">
              {message.body.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inbox-step-link"
                  onClick={(e) => {
                    playClick()
                    if (link.type === 'route') {
                      e.preventDefault()
                      onNavigateRoute(link.url)
                    }
                  }}
                >
                  <span>{link.label}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              ))}
            </div>
          )}

          {message.body?.signoff && (
            <div className="inbox-email-signoff">{message.body.signoff}</div>
          )}

          {/* Understated Skill Labels (Visually secondary to client feedback) */}
          {message.skills && message.skills.length > 0 && (
            <div className="inbox-skills-section" aria-label="Demonstrated Skills">
              <span className="inbox-skills-label">Core competencies:</span>
              <div className="inbox-skills-list">
                {message.skills.map((skill, idx) => (
                  <span key={idx} className="inbox-skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Embedded Project Card if present */}
          {message.projectPreview && (
            <div
              className="inbox-project-card"
              onClick={() => onViewProject(message.projectPreview.id)}
              role="button"
              tabIndex={0}
              title={`Click to open full ${message.projectPreview.title} case study`}
            >
              {(message.projectPreview.id === 'designer-1' ||
                message.id === 'msg-draft-saferide' ||
                message.projectPreview.title?.toLowerCase().includes('saferide') ||
                message.projectPreview.image?.includes('saferide') ||
                message.projectPreview.image?.includes('mockup_mobile')) ? (
                <div className="inbox-project-card__thumb inbox-project-card__thumb--saferide">
                  <svg className="saferide-vault-logo-preview" viewBox="0 0 24 30" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#6366f1" strokeWidth="1.2" fill="rgba(99, 102, 241, 0.2)"></path>
                    <path d="M14 10 L10 10 L9 13 L7 13 L7 15 L17 15 L17 13 L15 13 Z" stroke="currentColor" strokeWidth="1" fill="none"></path>
                    <circle cx="9.5" cy="15.5" r="1" stroke="currentColor" fill="currentColor"></circle>
                    <circle cx="14.5" cy="15.5" r="1" stroke="currentColor" fill="currentColor"></circle>
                    <path d="M9 13 L15 13" stroke="currentColor" strokeWidth="0.5"></path>
                    <text x="12" y="28" textAnchor="middle" fontSize="2.4" fontWeight="bold" fill="currentColor" stroke="none" style={{ fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.05em' }}>SAFERIDE MODE</text>
                  </svg>
                </div>
              ) : message.projectPreview.image ? (
                <div className="inbox-project-card__thumb">
                  <img src={message.projectPreview.image} alt={message.projectPreview.title} decoding="async" />
                </div>
              ) : null}
              <div className="inbox-project-card__info">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                  <div className="inbox-project-card__title" style={{ margin: 0 }}>{message.projectPreview.title}</div>
                  {message.id === 'msg-teeraboh' && (
                    <div className="teeraboh-stamp-tag" style={{ transform: 'none' }}>
                      <span className="teeraboh-stamp-dot"></span>
                      <span>BEST PROJECT WINNER</span>
                    </div>
                  )}
                  {message.id === 'msg-nailexpress' && (
                    <div className="teeraboh-stamp-tag" style={{ transform: 'none' }}>
                      <span className="teeraboh-stamp-dot"></span>
                      <span>LIVE IN PRODUCTION</span>
                    </div>
                  )}
                </div>
                <div className="inbox-project-card__desc">{message.projectPreview.description}</div>
                <div className="inbox-project-card__tags">
                  {message.projectPreview.tags?.map((tag, i) => (
                    <span key={i} className="inbox-project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Action CTA buttons if present */}
          {(message.body?.cta || message.body?.secondaryCta) && (
            <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              {message.body?.cta && (
                <button
                  type="button"
                  className="inbox-primary-cta"
                  onClick={() => handleActionClick(message.body.cta)}
                >
                  <span>{message.body.cta.text}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              )}
              {message.body?.secondaryCta && (
                <button
                  type="button"
                  className="inbox-secondary-action-btn"
                  onClick={() => handleActionClick(message.body.secondaryCta)}
                >
                  <span>{message.body.secondaryCta.text}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </article>

        {/* Email-Native Footer Thread (hide on the draft itself to avoid repetitive duplicate letter) */}
        {message.id !== 'msg-draft-working-together' && (
          <InboxEmailFooter
            onNavigateRoute={onNavigateRoute}
            onShowToast={onShowToast}
          />
        )}
      </div>
    </div>
  )
}
