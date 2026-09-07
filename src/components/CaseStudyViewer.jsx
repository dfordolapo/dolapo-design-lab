import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import useSoundEffects from '../hooks/useSoundEffects';
import BackButton from './BackButton';
import VelocityMarquee from './VelocityMarquee';

export default function CaseStudyViewer({ project, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const viewerRef = useRef(null);
  const contentRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const { playHover, playSelect } = useSoundEffects();
  
  const { scrollYProgress } = useScroll({
    container: viewerRef
  });

  useEffect(() => {
    // Small delay to trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => {
      clearTimeout(timer);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    playSelect();
    closeTimeoutRef.current = setTimeout(onClose, 500); // Wait for exit animation
  };

  if (!project) return null;

  return (
    <div className={`case-study-viewer ${isVisible ? 'active' : ''}`}>
      {/* Background overlay */}
      <div className="case-study-viewer__bg" onClick={handleClose}></div>
      
      {/* Main Content Container */}
      <div 
        className="case-study-viewer__container" 
        ref={viewerRef}
        style={project.backgroundColor ? { backgroundColor: project.backgroundColor } : undefined}
      >
        
        {/* Header Navigation */}
        <header className="case-study-header">
          <BackButton onClick={handleClose} label="RETURN TO VAULT" />
        </header>

        {/* Scrollable Content */}
        <div className="case-study-content" ref={contentRef}>
          
          {/* SVG Scroll Tracer */}
          <svg className="scroll-tracer" viewBox="0 0 50 1000" preserveAspectRatio="none">
            <motion.path 
              d="M25,0 L25,1000" 
              stroke="var(--theme-color, #8b5cf6)" 
              strokeWidth="2" 
              fill="none" 
              style={{ pathLength: scrollYProgress }} 
            />
            <motion.circle 
              cx="25" 
              cy="0" 
              r="4" 
              fill="var(--theme-color, #8b5cf6)" 
              style={{
                transformOrigin: "center",
                translateY: "calc(1000% * var(--progress))"
              }}
            />
          </svg>
          
          {!project.hideTitle && (
            <div className="case-study-hero-title">
              <h1>{project.title}</h1>
              {project.goal && <p className="case-study-goal">{project.goal}</p>}
            </div>
          )}

          {/* Map through dynamic content blocks */}
          {project.content.map((block, index) => {
            
            let blockContent = null;

            if (block.type === 'hero') {
              blockContent = (
                <div className="case-study-block hero-image-block">
                  <div className="image-placeholder-glass">
                    {/* Placeholder div until user provides actual image */}
                    {block.image ? (
                      <img loading="lazy" decoding="async"
                        src={block.image} 
                        alt={project.title} 
                        className="hero-img" 
                        fetchpriority={index === 0 ? "high" : "auto"}
                        onError={(e) => {
                          if (e.target.src.endsWith('.webp')) {
                            e.target.src = e.target.src.replace('.webp', '.png');
                          } else {
                            e.target.style.display = 'none';
                            if (e.target.nextElementSibling) {
                              e.target.nextElementSibling.style.display = 'block';
                            }
                          }
                        }}
                      />
                    ) : null}
                    <div className="placeholder-text" style={{ display: block.image ? 'none' : 'block' }}>
                      Add {block.image?.split('/').pop()} to public/assets
                    </div>
                  </div>
                </div>
              );
            } else if (block.type === 'full-image') {
              blockContent = (
                <div 
                  className={`case-study-block full-image-block ${project.hideTitle && index === 0 ? 'pull-up' : ''}`} 
                  style={{ marginBottom: 0 }}
                >
                  {block.image ? (
                    <img loading="lazy" decoding="async"
                      src={block.image} 
                      alt={project.title} 
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                      onError={(e) => {
                        if (e.target.src.endsWith('.webp')) {
                          e.target.src = e.target.src.replace('.webp', '.png');
                        } else {
                          e.target.style.display = 'none';
                          if (e.target.nextElementSibling) {
                            e.target.nextElementSibling.style.display = 'block';
                          }
                        }
                      }}
                    />
                  ) : null}
                  <div className="placeholder-text" style={{ display: block.image ? 'none' : 'block' }}>
                    Add {block.image?.split('/').pop()} to public/assets
                  </div>
                </div>
              );
            } else if (block.type === 'overview') {
              blockContent = (
                <div className="case-study-block overview-block">
                  <p className="overview-text">{block.text}</p>
                  <div className="overview-meta">
                    <div className="meta-item">
                      <span className="meta-label">ROLE</span>
                      <span className="meta-value role-list">
                        {project.role.split(/ • |, /).map((r, i) => (
                          <span key={i} className="role-item">
                            {r}
                          </span>
                        ))}
                      </span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">PLATFORM</span>
                      <span className="meta-value">{project.platform}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">DURATION</span>
                      <span className="meta-value">{project.duration}</span>
                    </div>
                  </div>
                </div>
              );
            } else if (block.type === 'text-block') {
              const renderText = (text) => {
                if (!text) return null;
                return text.split('\n\n').map((paragraph, i) => {
                  const htmlString = paragraph
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/\n/g, '<br />');
                  return <p key={i} dangerouslySetInnerHTML={{ __html: htmlString }} />;
                });
              };
              
              blockContent = (
                <div className="case-study-block text-block" style={{ textAlign: block.align || 'left' }}>
                  {block.heading && <h2>{block.heading}</h2>}
                  {renderText(block.body)}
                </div>
              );
            } else if (block.type === 'features-list') {
              blockContent = (
                <div className="case-study-block features-block">
                  <h2>{block.heading}</h2>
                  <div className="features-grid">
                    {block.features.map((feat, i) => (
                      <div key={i} className="feature-card">
                        <h3>{feat.title}</h3>
                        <p>{feat.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            } else if (block.type === 'split-block') {
              const renderText = (text) => {
                if (!text) return null;
                return text.split('\n\n').map((paragraph, i) => {
                  const htmlString = paragraph
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>');
                  return <p key={i} dangerouslySetInnerHTML={{ __html: htmlString }} />;
                });
              };
              
              blockContent = (
                <div className="case-study-block split-block">
                  <div className="split-text">
                    <h2>{block.heading}</h2>
                    {renderText(block.body)}
                  </div>
                  <div className={`split-image ${!block.image ? 'image-placeholder-glass' : ''}`}>
                    {block.image ? (
                      <img loading="lazy" decoding="async"
                        src={block.image} 
                        alt={block.heading} 
                        style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 'var(--radius-lg)' }}
                        onError={(e) => {
                          if (e.target.src.endsWith('.webp')) {
                            e.target.src = e.target.src.replace('.webp', '.png');
                          } else {
                            e.target.style.display = 'none';
                            if (e.target.nextElementSibling) {
                              e.target.nextElementSibling.style.display = 'block';
                            }
                          }
                        }}
                      />
                    ) : null}
                    <div className="placeholder-text" style={{ display: block.image ? 'none' : 'block' }}>
                      Add {block.image?.split('/').pop()} to public/assets
                    </div>
                  </div>
                </div>
              );
            } else if (block.type === 'presentation-slide') {
              blockContent = (
                <div className="case-study-block presentation-slide-block">
                  <div className="presentation-image-wrapper">
                    {block.image ? (
                      <img loading="lazy" decoding="async"
                        src={block.image} 
                        alt="Presentation Slide" 
                        className="presentation-img"
                        onError={(e) => {
                          if (e.target.src.endsWith('.webp')) {
                            e.target.src = e.target.src.replace('.webp', '.png');
                          } else {
                            e.target.style.display = 'none';
                            if (e.target.nextElementSibling) {
                              e.target.nextElementSibling.style.display = 'block';
                            }
                          }
                        }}
                      />
                    ) : null}
                    <div className="placeholder-text" style={{ display: block.image ? 'none' : 'block' }}>
                      Add {block.image?.split('/').pop()} to public/assets
                    </div>
                  </div>
                  {block.caption && <p className="presentation-caption">{block.caption}</p>}
                </div>
              );
            } else if (block.type === 'side-by-side-images') {
              blockContent = (
                <div className="case-study-block side-by-side-images" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)', marginBottom: 'var(--space-2xl)' }}>
                  {block.images?.map((img, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {img.src ? (
                        <img loading="lazy" decoding="async" src={img.src} alt={img.caption || 'Case study image'} style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }} />
                      ) : (
                        <div className="image-placeholder-glass" style={{ width: '100%', aspectRatio: '1/2' }}>
                          <span className="placeholder-text">Missing image</span>
                        </div>
                      )}
                      {img.caption && <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textAlign: 'center', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>{img.caption}</span>}
                    </div>
                  ))}
                </div>
              );
            } else if (block.type === 'embed') {
              blockContent = (
                <div className="case-study-block embed-block">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)', flexWrap: 'wrap', gap: '10px' }}>
                    {block.heading && <h2 style={{ marginBottom: 0, borderBottom: 'none' }}>{block.heading}</h2>}
                    {block.url && (
                      <a 
                        href={block.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="embed-visit-btn"
                        style={{
                          color: 'var(--text-primary)',
                          textDecoration: 'none',
                          border: '1px solid var(--glass-border)',
                          padding: '0.6rem 1.4rem',
                          borderRadius: 'var(--radius-md)',
                          fontSize: '0.85rem',
                          fontFamily: 'var(--font-mono)',
                          letterSpacing: '0.08em',
                          background: 'rgba(255,255,255,0.06)',
                          transition: 'all 0.3s ease',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.18)'
                          e.currentTarget.style.borderColor = 'var(--text-primary)'
                          e.currentTarget.style.transform = 'translateY(-2px)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                          e.currentTarget.style.borderColor = 'var(--glass-border)'
                          e.currentTarget.style.transform = 'none'
                        }}
                      >
                        {block.buttonLabel || 'VISIT SITE'} &rarr;
                      </a>
                    )}
                  </div>
                  <div className="embed-container" style={{ position: 'relative' }}>
                    <iframe 
                      src={block.url} 
                      width="100%" 
                      height="600" 
                      frameBorder="0" 
                      allowFullScreen 
                      allow="clipboard-write"
                      title={block.heading || "Embedded content"}
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              );
            } else if (block.type === 'diagram') {
              const renderCard = (card, sIdx) => (
                <div key={sIdx} className={`canvas-card ${card.variant === 'warning' ? 'recovery-card' : ''} ${card.variant === 'admin' ? 'admin-card' : ''}`}>
                  <div className="canvas-card-top">
                    <div className={`step-tag-pill ${card.variant === 'warning' ? 'recovery-pill' : ''} ${card.variant === 'admin' ? 'admin-pill' : ''}`}>
                      <span className="tag-step-index">{card.icon || `0${sIdx + 1}`}</span>
                      <span className="tag-step-name">{card.badge || 'STAGE'}</span>
                    </div>
                    <span className={`step-state-badge ${card.variant === 'warning' ? 'recovery-state' : ''} ${card.variant === 'admin' ? 'admin-state' : ''}`}>
                      {card.state || 'AUTOMATED'}
                    </span>
                  </div>

                  <h4 className="canvas-card-title">{card.title}</h4>

                  {card.trigger && (
                    <div className={`canvas-trigger-box ${card.variant === 'warning' ? 'recovery-trigger-box' : ''} ${card.variant === 'admin' ? 'admin-trigger-box' : ''}`}>
                      <span className="trigger-bullet">{card.triggerIcon || '⚡'}</span>
                      <div className="trigger-info">
                        <span className="trigger-head">WHEN</span>
                        <span className="trigger-val">{card.trigger}</span>
                      </div>
                    </div>
                  )}

                  <p className="canvas-card-desc">{card.desc}</p>

                  {/* Inline Visual Preview (Option B) */}
                  {card.image && (
                    <div className="canvas-card-media-slot">
                      <div className="card-media-thumbnail-wrapper" onClick={() => setSelectedImage(card.image)} title="Click to view full email template">
                        <img 
                          loading="lazy" 
                          decoding="async" 
                          src={card.image} 
                          alt={card.title}
                          className="card-media-img"
                          onError={(e) => {
                            const currentSrc = e.target.src;
                            if (currentSrc.endsWith('.webp')) {
                              e.target.src = currentSrc.replace('.webp', '.png');
                            } else if (currentSrc.endsWith('.png')) {
                              e.target.src = currentSrc.replace('.png', '.jpg');
                            } else if (currentSrc.endsWith('.jpg')) {
                              e.target.src = currentSrc.replace('.jpg', '.jpeg');
                            } else {
                              e.target.style.display = 'none';
                              if (e.target.nextElementSibling) {
                                e.target.nextElementSibling.style.display = 'flex';
                              }
                            }
                          }}
                        />
                        <div className="card-media-placeholder" style={{ display: 'none' }}>
                          <span className="placeholder-chip">PREVIEW COMING</span>
                          <span className="placeholder-sub">{card.image.split('/').pop()}</span>
                        </div>
                        
                        {/* Always visible micro badge */}
                        <div className="thumbnail-zoom-tag">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                          <span>EXPAND</span>
                        </div>

                        <div className="card-media-overlay">
                          <span className="overlay-badge">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                            VIEW FULL TEMPLATE
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {card.tone && (
                    <div className="canvas-card-tone">
                      <span className="tone-label">COPY TONE</span>
                      <span className="tone-val">{card.tone}</span>
                    </div>
                  )}
                </div>
              );

              blockContent = (
                <div className="case-study-block diagram-block">
                  {block.heading && <h2>{block.heading}</h2>}
                  {block.intro && (
                    <p className="diagram-intro">
                      {block.intro}
                    </p>
                  )}
                  
                  <div className="lifecycle-canvas">
                    {/* Visual Stage Banner */}
                    <div className="canvas-header-bar">
                      <div className="canvas-title-group">
                        <span className="canvas-dot"></span>
                        <span className="canvas-label">{block.canvasTitle || 'TRANSACTIONAL LIFECYCLE FLOW'}</span>
                      </div>
                      <div className="canvas-header-right">
                        <span className="canvas-hint-pill">🔍 TAP ANY TEMPLATE TO EXPAND</span>
                        <span className="canvas-flow-type">{block.canvasSubtitle || 'PRIMARY SEQUENCE & RECOVERY'}</span>
                      </div>
                    </div>

                    {/* Main Sequence Grid with Connected Track */}
                    <div className="lifecycle-canvas-body">
                      {block.sections ? (
                        block.sections.map((section, secIdx) => (
                          <div key={secIdx} className="canvas-flow-section">
                            {section.sectionTitle && (
                              <div className="recovery-divider-rail">
                                <div className="rail-line"></div>
                                <div className={`rail-pill ${section.variant === 'warning' ? 'recovery-rail-pill' : ''} ${section.variant === 'admin' ? 'admin-rail-pill' : ''}`}>
                                  <span className="rail-dot"></span>
                                  <span>{section.sectionTitle}</span>
                                </div>
                                <div className="rail-line"></div>
                              </div>
                            )}
                            <div className={`canvas-cards-row canvas-cards-grid-${section.steps.length}`}>
                              {section.steps.map((step, sIdx) => renderCard(step, sIdx))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="canvas-cards-row">
                            {block.steps?.map((step, sIdx) => (
                              <React.Fragment key={sIdx}>
                                {renderCard(step, sIdx)}
                                {sIdx < block.steps.length - 1 && (
                                  <div className="canvas-step-arrow" aria-hidden="true">
                                    <div className="arrow-disc">
                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                      </svg>
                                    </div>
                                  </div>
                                )}
                              </React.Fragment>
                            ))}
                          </div>

                          {/* Parallel Exit / Recovery Loop */}
                          {block.branchStep && (
                            <div className="canvas-recovery-section">
                              <div className="recovery-divider-rail">
                                <div className="rail-line"></div>
                                <div className="rail-pill">
                                  <span className="rail-dot"></span>
                                  <span>{block.branchStep.tag || 'EXIT & RECOVERY LOOP'}</span>
                                </div>
                                <div className="rail-line"></div>
                              </div>
                              {renderCard({ ...block.branchStep, variant: 'warning' }, 0)}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            }

            if (!blockContent) return null;

            const isInstant = block.type === 'full-image' || block.type === 'embed';

            return (
              <motion.div
                key={index}
                initial={isInstant ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {blockContent}
              </motion.div>
            );
          })}
          


          <div className="case-study-footer">
            <div className="end-marker"></div>
            <p>END OF REPORT</p>
          </div>
          
        </div>
      </div>

      {/* LIGHTBOX MODAL FOR TEMPLATE PREVIEWS */}
      {selectedImage && (
        <div className="card-media-lightbox" onClick={() => setSelectedImage(null)}>
          <div className="card-media-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={() => setSelectedImage(null)} aria-label="Close Preview">
              &times;
            </button>
            <img 
              src={selectedImage} 
              alt="Email Template Preview" 
              className="lightbox-full-img" 
              onError={(e) => {
                const currentSrc = e.target.src;
                if (currentSrc.endsWith('.webp')) {
                  e.target.src = currentSrc.replace('.webp', '.png');
                } else if (currentSrc.endsWith('.png')) {
                  e.target.src = currentSrc.replace('.png', '.jpg');
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
