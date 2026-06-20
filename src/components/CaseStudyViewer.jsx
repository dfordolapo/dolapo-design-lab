import React, { useEffect, useRef, useState } from 'react';
import useSoundEffects from '../hooks/useSoundEffects';
import BackButton from './BackButton';

export default function CaseStudyViewer({ project, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const viewerRef = useRef(null);
  const { playHover, playSelect } = useSoundEffects();

  useEffect(() => {
    // Small delay to trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    playSelect();
    setTimeout(onClose, 500); // Wait for exit animation
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
        <div className="case-study-content">
          
          <div className="case-study-hero-title">
            <h1>{project.title}</h1>
            {project.goal && <p className="case-study-goal">{project.goal}</p>}
          </div>

          {/* Map through dynamic content blocks */}
          {project.content.map((block, index) => {
            
            if (block.type === 'hero') {
              return (
                <div key={index} className="case-study-block hero-image-block">
                  <div className="image-placeholder-glass">
                    {/* Placeholder div until user provides actual image */}
                    {block.image ? (
                      <img 
                        src={block.image} 
                        alt={project.title} 
                        className="hero-img" 
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                    ) : null}
                    <div className="placeholder-text" style={{ display: block.image ? 'none' : 'block' }}>
                      Add {block.image.split('/').pop()} to public/assets
                    </div>
                  </div>
                </div>
              );
            }

            if (block.type === 'overview') {
              return (
                <div key={index} className="case-study-block overview-block">
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
            }

            if (block.type === 'text-block') {
              const renderText = (text) => {
                if (!text) return null;
                return text.split('\n\n').map((paragraph, i) => {
                  const htmlString = paragraph
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>');
                  return <p key={i} dangerouslySetInnerHTML={{ __html: htmlString }} />;
                });
              };
              
              return (
                <div key={index} className="case-study-block text-block">
                  <h2>{block.heading}</h2>
                  {renderText(block.body)}
                </div>
              );
            }

            if (block.type === 'features-list') {
              return (
                <div key={index} className="case-study-block features-block">
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
            }

            if (block.type === 'split-block') {
              const renderText = (text) => {
                if (!text) return null;
                return text.split('\n\n').map((paragraph, i) => {
                  const htmlString = paragraph
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>');
                  return <p key={i} dangerouslySetInnerHTML={{ __html: htmlString }} />;
                });
              };
              
              return (
                <div key={index} className="case-study-block split-block">
                  <div className="split-text">
                    <h2>{block.heading}</h2>
                    {renderText(block.body)}
                  </div>
                  <div className="split-image image-placeholder-glass">
                    {block.image ? (
                      <img 
                        src={block.image} 
                        alt={block.heading} 
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                    ) : null}
                    <div className="placeholder-text" style={{ display: block.image ? 'none' : 'block' }}>
                      Add {block.image.split('/').pop()} to public/assets
                    </div>
                  </div>
                </div>
              );
            }

            if (block.type === 'presentation-slide') {
              return (
                <div key={index} className="case-study-block presentation-slide-block">
                  <div className="presentation-image-wrapper">
                    {block.image ? (
                      <img 
                        src={block.image} 
                        alt="Presentation Slide" 
                        className="presentation-img"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
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
            }

            if (block.type === 'embed') {
              return (
                <div key={index} className="case-study-block embed-block">
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

            return null;
          })}
          
          <div className="case-study-footer">
            <div className="end-marker"></div>
            <p>END OF REPORT</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
