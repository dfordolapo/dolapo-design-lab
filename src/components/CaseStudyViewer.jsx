import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import useSoundEffects from '../hooks/useSoundEffects';
import BackButton from './BackButton';
import ParallaxImage from './ParallaxImage';
import VelocityMarquee from './VelocityMarquee';

export default function CaseStudyViewer({ project, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
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
      <div className="case-study-viewer__container" ref={viewerRef}>
        
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
          
          <div className="case-study-hero-title">
            <h1>{project.title}</h1>
            {project.goal && <p className="case-study-goal">{project.goal}</p>}
          </div>

          {/* Map through dynamic content blocks */}
          {project.content.map((block, index) => {
            
            let blockContent = null;

            if (block.type === 'hero') {
              blockContent = (
                <div className="case-study-block hero-image-block">
                  <div className="image-placeholder-glass">
                    {/* Placeholder div until user provides actual image */}
                    {block.image ? (
                      <ParallaxImage 
                        src={block.image} 
                        alt={project.title} 
                        className="hero-img" 
                      />
                    ) : null}
                    <div className="placeholder-text" style={{ display: block.image ? 'none' : 'block' }}>
                      Add {block.image.split('/').pop()} to public/assets
                    </div>
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
                      <span className="meta-value">{project.role}</span>
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
                    .replace(/\*(.*?)\*/g, '<em>$1</em>');
                  return <p key={i} dangerouslySetInnerHTML={{ __html: htmlString }} />;
                });
              };
              
              blockContent = (
                <div className="case-study-block text-block">
                  <h2>{block.heading}</h2>
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
                  <div className="split-image image-placeholder-glass">
                    {block.image ? (
                      <ParallaxImage 
                        src={block.image} 
                        alt={block.heading} 
                      />
                    ) : null}
                    <div className="placeholder-text" style={{ display: block.image ? 'none' : 'block' }}>
                      Add {block.image.split('/').pop()} to public/assets
                    </div>
                  </div>
                </div>
              );
            } else if (block.type === 'presentation-slide') {
              blockContent = (
                <div className="case-study-block presentation-slide-block">
                  <div className="presentation-image-wrapper">
                    {block.image ? (
                      <ParallaxImage 
                        src={block.image} 
                        alt="Presentation Slide" 
                        className="presentation-img"
                      />
                    ) : null}
                    <div className="placeholder-text" style={{ display: block.image ? 'none' : 'block' }}>
                      Add {block.image?.split('/').pop()} to public/assets
                    </div>
                  </div>
                  {block.caption && <p className="presentation-caption">{block.caption}</p>}
                </div>
              );
            } else if (block.type === 'embed') {
              blockContent = (
                <div className="case-study-block embed-block">
                  {block.heading && <h2>{block.heading}</h2>}
                  <div className="embed-container">
                    <iframe 
                      src={block.url} 
                      width="100%" 
                      height="600" 
                      frameBorder="0" 
                      allowFullScreen 
                      allow="clipboard-write"
                      title={block.heading || "Embedded content"}
                    ></iframe>
                  </div>
                </div>
              );
            }

            if (!blockContent) return null;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {blockContent}
              </motion.div>
            );
          })}
          
          <VelocityMarquee baseVelocity={1} className="case-study-marquee">
            <span style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', opacity: 0.1, textTransform: 'uppercase' }}>
              {project.title} &bull; CASE STUDY &bull; {project.role} &bull;
            </span>
          </VelocityMarquee>

          <div className="case-study-footer">
            <div className="end-marker"></div>
            <p>END OF REPORT</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
