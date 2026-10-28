import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useSoundEffects from '../hooks/useSoundEffects'
import useScrollLock from '../hooks/useScrollLock'
import '../styles/about-case-study-modal.css'

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
          <ul key={pIdx}>
            {lines.map((line, lIdx) => {
              const cleanLine = line.replace(/^[•*-]\s*/, '')
              return (
                <li key={lIdx} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(cleanLine) }} />
              )
            })}
          </ul>
        )
      }

      return (
        <p key={pIdx} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed) }} />
      )
    })
  }

  const formatInlineMarkdown = (str) => {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code style="background:rgba(0,0,0,0.06);padding:2px 6px;border-radius:4px;font-size:0.9em;font-family:var(--font-mono);">$1</code>')
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
          {/* Modal Sticky Header */}
          <header className="about-modal-header">
            <div className="about-modal-header__meta">
              <span className="about-modal-badge">{project.category || 'CASE STUDY'}</span>
              <span className="about-modal-header__title">{project.title}</span>
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
            {/* Editorial Hero */}
            <div className="about-modal-hero">
              <h1 className="about-modal-hero__title">{project.title}</h1>
              {project.goal && <p className="about-modal-hero__goal">{project.goal}</p>}

              {/* Metadata Ledger Strip */}
              <div className="about-modal-metadata-ledger">
                {project.platform && (
                  <div className="about-modal-meta-item">
                    <span className="about-modal-meta-label">Platform</span>
                    <span className="about-modal-meta-value">{project.platform}</span>
                  </div>
                )}
                {project.role && (
                  <div className="about-modal-meta-item">
                    <span className="about-modal-meta-label">Role</span>
                    <span className="about-modal-meta-value">{project.role}</span>
                  </div>
                )}
                {project.duration && (
                  <div className="about-modal-meta-item">
                    <span className="about-modal-meta-label">Timeline</span>
                    <span className="about-modal-meta-value">{project.duration}</span>
                  </div>
                )}
                {project.shortTitle && (
                  <div className="about-modal-meta-item">
                    <span className="about-modal-meta-label">Archive ID</span>
                    <span className="about-modal-meta-value" style={{ fontFamily: 'var(--font-mono)' }}>{project.id}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Dynamic Content Blocks */}
            <div className="about-modal-content-blocks">
              {project.content?.map((block, idx) => {
                if (block.type === 'text-block') {
                  return (
                    <div key={idx} className="about-modal-block about-modal-text-block">
                      {renderFormattedText(block.body)}
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
                  return (
                    <div key={idx} className="about-modal-block about-modal-image-frame">
                      <img src={block.url || block.src} alt={block.caption || project.title} loading="lazy" decoding="async" />
                      {block.caption && (
                        <p className="about-modal-image-caption">{block.caption}</p>
                      )}
                    </div>
                  )
                }

                if (block.type === 'embed') {
                  return (
                    <div key={idx} className="about-modal-block about-modal-embed-box">
                      <div className="about-modal-embed-bar">
                        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 600, color: '#3D332A' }}>
                          {block.heading || 'Live Interactive Preview'}
                        </span>
                        <a href={block.url} target="_blank" rel="noopener noreferrer" className="about-modal-embed-btn">
                          <span>{block.buttonLabel || 'Open Live Site'}</span>
                          <span>&rarr;</span>
                        </a>
                      </div>
                      <iframe
                        src={block.url}
                        title={block.heading || 'Interactive Project Embed'}
                        width="100%"
                        height="560"
                        frameBorder="0"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  )
                }

                if (block.type === 'onboarding-collection') {
                  return (
                    <div key={idx} className="about-modal-block about-modal-onboarding-collection">
                      {block.screens?.map((screen) => {
                        const hasImages = screen.images && screen.images.length > 0

                        return (
                          <div key={screen.id} className="about-ob-card">
                            <div className="about-ob-card-header">
                              <div>
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
                                    <img src={imgSrc} alt={`${screen.name} step ${imgIdx + 1}`} loading="lazy" decoding="async" />
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
                              <p style={{ marginTop: '16px', lineHeight: 1.6, color: '#4A423B', fontSize: '0.96rem' }}>
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
                                    <span>{pr.detail}</span>
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
              <span style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.1rem', color: '#8C7F72' }}>
                End of Case Study Report
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
