import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useSoundEffects from '../hooks/useSoundEffects'
import useScrollLock from '../hooks/useScrollLock'
import '../styles/about-case-study-modal.css'

function ModalEmbed({ block }) {
  const [loaded, setLoaded] = React.useState(false);

  // Safety timer: reveal iframe within 3s in case third-party tracking delays the load event
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [block.url]);

  const openUrl = block.liveUrl || block.url;

  return (
    <div className="about-modal-block about-modal-embed-box">
      <div className="about-modal-embed-bar">
        <span className="about-modal-embed-title">
          {block.heading || 'Live Interactive Preview'}
        </span>
        <a href={openUrl} target="_blank" rel="noopener noreferrer" className="about-modal-embed-btn">
          <span>{block.buttonLabel || 'Open Live Site'}</span>
          <span>&rarr;</span>
        </a>
      </div>
      <div className="about-modal-embed-viewport">
        {!loaded && (
          <div className="about-modal-embed-skeleton" aria-hidden="true">
            <span className="about-modal-embed-skeleton-spinner" />
            <span className="about-modal-embed-skeleton-text">Connecting to live preview...</span>
          </div>
        )}
        <iframe
          src={block.url}
          title={block.heading || 'Interactive Project Embed'}
          width="100%"
          height="560"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="eager"
          onLoad={() => setLoaded(true)}
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.35s ease',
            display: 'block',
            width: '100%',
            height: '560px',
            border: 'none'
          }}
        />
      </div>
    </div>
  );
}

export default function AboutCaseStudyModal({ project, onClose }) {
  const { playClick, playHover } = useSoundEffects()
  const contentRef = useRef(null)

  // Completely lock all page and container scrolling when case study modal is open
  useScrollLock(Boolean(project))

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  if (!project) return null

  const handleCloseClick = () => {
    playClick()
    onClose()
  }

  // Parse markdown-like bold (**text**) and newlines for text blocks
  const renderFormattedText = (text) => {
    if (!text) return null
    const paragraphs = text.split('\n\n')

    return paragraphs.map((para, pIdx) => {
      const trimmed = para.trim()
      if (!trimmed) return null

      // Check if it's a bullet list
      if (trimmed.startsWith('•') || trimmed.startsWith('*') || trimmed.startsWith('-')) {
        const lines = trimmed.split('\n')
        return (
          <ul key={pIdx} className="about-modal-ul">
            {lines.map((line, lIdx) => {
              const cleanLine = line.replace(/^[•*-]\s*/, '')
              return (
                <li
                  key={lIdx}
                  className="about-modal-li"
                  style={{ color: '#38302A' }}
                  dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(cleanLine) }}
                />
              )
            })}
          </ul>
        )
      }

      return (
        <p
          key={pIdx}
          className="about-modal-p"
          style={{ color: '#2D2520' }}
          dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed) }}
        />
      )
    })
  }

  const formatInlineMarkdown = (str) => {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#110F0D;font-weight:700;">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em style="color:#2D2520;">$1</em>')
      .replace(/`([^`]+)`/g, '<code style="background:rgba(0,0,0,0.06);padding:2px 6px;border-radius:4px;font-size:0.9em;font-family:var(--font-mono);color:#1A1715;">$1</code>')
      .replace(/\n/g, '<br/>')
  }

  return (
    <AnimatePresence>
      <div className="about-modal-backdrop" onClick={handleCloseClick} role="dialog" aria-modal="true" aria-label={project.title}>
        <motion.div
          className="about-modal-card"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Modal Sticky Header: ONLY category badge (no project name) */}
          <header className="about-modal-header">
            <div className="about-modal-header__meta">
              <span className="about-modal-badge">{project.category || 'CASE STUDY'}</span>
            </div>

            <button
              type="button"
              className="about-modal-close-btn"
              onClick={handleCloseClick}
              onMouseEnter={playHover}
              aria-label="Close Case Study"
              title="Close (Esc)"
            >
              &times;
            </button>
          </header>

          {/* Scrollable Inner Body */}
          <div className="about-modal-body" ref={contentRef}>
            {/* Editorial Intro: ONLY Project Name, Short Description, and Metadata Ledger (Platform, Role, Duration with Icons) */}
            <div className="about-modal-hero">
              <h1 className="about-modal-hero__title">{project.title}</h1>
              {(project.goal || project.desc || project.shortDesc) && (
                <p className="about-modal-hero__desc">
                  {project.goal || project.desc || project.shortDesc}
                </p>
              )}

              {/* Compact Metadata Ledger Strip with Icons */}
              <div className="about-modal-metadata-ledger">
                {project.platform && (
                  <div className="about-modal-meta-item">
                    <span className="about-modal-meta-label">
                      <svg className="about-modal-meta-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                      Platform
                    </span>
                    <span className="about-modal-meta-value">{project.platform}</span>
                  </div>
                )}
                {project.role && (
                  <div className="about-modal-meta-item">
                    <span className="about-modal-meta-label">
                      <svg className="about-modal-meta-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      Role
                    </span>
                    <span className="about-modal-meta-value">{project.role}</span>
                  </div>
                )}
                {(project.duration || project.timeline) && (
                  <div className="about-modal-meta-item">
                    <span className="about-modal-meta-label">
                      <svg className="about-modal-meta-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      Duration
                    </span>
                    <span className="about-modal-meta-value">{project.duration || project.timeline}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Dynamic Content Blocks */}
            <div className="about-modal-content-blocks">
              {project.content?.map((block, idx) => {
                if (block.type === 'overview') {
                  const introDesc = project.goal || project.desc || project.shortDesc || ''
                  const introStr = typeof introDesc === 'string' ? introDesc.toLowerCase().trim() : ''
                  const blockStr = typeof block.text === 'string' ? block.text.toLowerCase().trim() : ''

                  // If overview block repeats the intro description, skip it to prevent repetition
                  if (introStr && (blockStr === introStr || blockStr.includes(introStr) || introStr.includes(blockStr))) {
                    return null
                  }

                  return (
                    <div key={idx} className="about-modal-block about-modal-overview">
                      <div className="about-modal-overview__eyebrow">
                        <span className="about-modal-overview__dot" aria-hidden="true" />
                        <span>Proposal Summary</span>
                      </div>
                      <p className="about-modal-overview__text">{block.text}</p>
                    </div>
                  )
                }

                if (block.type === 'empty-state') {
                  return (
                    <div key={idx} className="about-modal-block about-modal-empty-state">
                      {block.title && (
                        <h2 className="about-modal-empty-state__title">{block.title}</h2>
                      )}
                      <p className="about-modal-empty-state__text">{block.text || 'Coming soon...'}</p>
                    </div>
                  )
                }

                if (block.type === 'text-block') {
                  return (
                    <div key={idx} className="about-modal-block about-modal-text-block" style={{ textAlign: block.align || 'left' }}>
                      {block.heading && (
                        <h2 className="about-modal-heading">{block.heading}</h2>
                      )}
                      {renderFormattedText(block.body)}
                    </div>
                  )
                }

                if (block.type === 'hero') {
                  const heroImg = block.image || block.url;
                  if (!heroImg) return null;
                  return (
                    <div key={idx} className="about-modal-block about-modal-image-frame about-modal-hero-frame">
                      <img src={heroImg} alt={block.caption || project.title} loading="eager" fetchPriority="high" decoding="async" />
                      {block.caption && (
                        <p className="about-modal-image-caption">{block.caption}</p>
                      )}
                    </div>
                  )
                }

                if (block.type === 'presentation-slide') {
                  if (!block.image) return null;
                  return (
                    <div key={idx} className="about-modal-block about-modal-slide-frame">
                      <div className="about-modal-slide-card">
                        <img
                          src={block.image}
                          alt={block.caption || 'Case study slide'}
                          loading={idx < 4 ? "eager" : "lazy"}
                          fetchPriority={idx < 2 ? "high" : "auto"}
                          decoding="async"
                        />
                      </div>
                      {block.caption && (
                        <p className="about-modal-image-caption">
                          <span className="about-modal-caption-bullet" aria-hidden="true">•</span> {block.caption}
                        </p>
                      )}
                    </div>
                  )
                }

                if (block.type === 'features-list') {
                  return (
                    <div key={idx} className="about-modal-block about-modal-features">
                      {block.heading && <h2 className="about-modal-heading">{block.heading}</h2>}
                      <div className="about-modal-features-grid">
                        {block.features?.map((feat, fIdx) => (
                          <div key={fIdx} className="about-modal-feature-card">
                            <h3 className="about-modal-feature-title">{feat.title}</h3>
                            <p className="about-modal-feature-desc">{feat.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                }

                if (block.type === 'split-block') {
                  return (
                    <div key={idx} className="about-modal-block about-modal-split-block">
                      <div className="about-modal-split-text">
                        {block.heading && <h2 className="about-modal-heading">{block.heading}</h2>}
                        {renderFormattedText(block.body)}
                      </div>
                      {block.image && (
                        <div className="about-modal-split-image">
                          <img src={block.image} alt={block.heading || 'Detail illustration'} loading="eager" decoding="async" />
                        </div>
                      )}
                    </div>
                  )
                }

                if (block.type === 'side-by-side-images') {
                  return (
                    <div key={idx} className="about-modal-block about-modal-side-by-side">
                      {block.images?.map((img, iIdx) => (
                        <div key={iIdx} className="about-modal-side-item">
                          <img src={img.src || img} alt={img.caption || 'Comparison'} loading="eager" decoding="async" />
                          {img.caption && <p className="about-modal-image-caption">{img.caption}</p>}
                        </div>
                      ))}
                    </div>
                  )
                }

                if (block.type === 'quote') {
                  return (
                    <div key={idx} className="about-modal-block about-modal-quote">
                      <div className="about-modal-quote__tape" aria-hidden="true" />
                      <blockquote className="about-modal-quote__text">
                        “{block.text}”
                      </blockquote>
                    </div>
                  )
                }

                if (block.type === 'full-image' || block.type === 'image') {
                  const imgSrc = block.url || block.src || block.image;
                  if (!imgSrc) return null;
                  return (
                    <div key={idx} className="about-modal-block about-modal-image-frame">
                      <img src={imgSrc} alt={block.caption || project.title} loading={idx < 4 ? "eager" : "lazy"} decoding="async" />
                      {block.caption && (
                        <p className="about-modal-image-caption">{block.caption}</p>
                      )}
                    </div>
                  )
                }

                if (block.type === 'embed') {
                  return <ModalEmbed key={idx} block={block} />
                }

                if (block.type === 'onboarding-collection') {
                  return (
                    <div key={idx} className="about-modal-block about-modal-onboarding-collection">
                      {block.screens?.map((screen) => {
                        const hasImages = screen.images && screen.images.length > 0

                        return (
                          <div key={screen.id} className="about-ob-card">
                            <div className="about-ob-card-header">
                              <div className="about-ob-title-group">
                                <span className="about-ob-label" style={{ color: screen.color || '#C26143' }}>
                                  {screen.label}
                                </span>
                                <h3 className="about-ob-name">{screen.name}</h3>
                              </div>

                              {screen.tags && (
                                <div className="about-ob-tags">
                                  {screen.tags.map((tag, tIdx) => (
                                    <span key={tIdx} className="about-ob-tag">{tag}</span>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Gallery of screens (e.g. Awwja, Muve, Audiobook) */}
                            {hasImages ? (
                              <div className="about-ob-gallery-scroll" tabIndex={0} aria-label={`${screen.name} onboarding flow screenshots`}>
                                {screen.images.map((imgSrc, imgIdx) => (
                                  <div key={imgIdx} className="about-ob-gallery-item">
                                    <img
                                      src={imgSrc}
                                      alt={`${screen.name} step ${imgIdx + 1}`}
                                      loading={imgIdx < 3 ? "eager" : "lazy"}
                                      fetchPriority={imgIdx === 0 ? "high" : "auto"}
                                      decoding="async"
                                    />
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div style={{
                                padding: '32px 20px',
                                background: '#F8F5EE',
                                borderRadius: '12px',
                                textAlign: 'center',
                                border: '1px dashed rgba(180, 160, 140, 0.4)',
                                color: '#8C7F72',
                                fontFamily: 'var(--font-heading)',
                                fontSize: '0.9rem',
                                margin: '12px 0'
                              }}>
                                <span>Images coming soon</span>
                              </div>
                            )}

                            {/* Insight & Principles */}
                            {screen.insight && (
                              <p className="about-ob-insight">
                                {screen.insight}
                              </p>
                            )}

                            {screen.principles && screen.principles.length > 0 && (
                              <div className="about-ob-principles">
                                {screen.principles.map((pr, prIdx) => (
                                  <div key={prIdx} className="about-ob-principle-row">
                                    <span className="about-ob-principle-name" style={{ color: screen.color || '#1A1715' }}>
                                      {pr.name}:
                                    </span>{' '}
                                    <span className="about-ob-principle-detail" style={{ color: '#38302A' }}>{pr.detail}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )
                }

                return null
              })}
            </div>

            {/* Modal Bottom Close Row */}
            <footer className="about-modal-footer">
              <span className="about-modal-footer-note">
                {!project.isEmptyState ? 'End of Case Study Report' : ''}
              </span>

              <button
                type="button"
                className="about-modal-footer-close-btn"
                onClick={handleCloseClick}
                onMouseEnter={playHover}
              >
                <span>Close Case Study</span>
                <span aria-hidden="true">&times;</span>
              </button>
            </footer>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
