import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INITIAL_MESSAGES } from '../utils/inboxData';
import useSoundEffects from '../hooks/useSoundEffects';
import '../styles/about-reviews-inbox.css';

export default function AboutReviewsInbox({ onShowToast }) {
  const { playClick, playHover } = useSoundEffects();

  // Filter only the verified client reviews / feedback messages
  const reviews = useMemo(() => {
    return INITIAL_MESSAGES.filter(
      (msg) => msg.category === 'Client Feedback' || msg.id.startsWith('msg-blurr') || msg.id.startsWith('msg-nail') || msg.id.startsWith('msg-teeraboh')
    );
  }, []);

  // Default to the first review
  const [selectedId, setSelectedId] = useState(reviews[0]?.id || 'msg-blurr-developer');
  const [copiedId, setCopiedId] = useState(null);

  const activeReview = useMemo(() => {
    return reviews.find((r) => r.id === selectedId) || reviews[0];
  }, [reviews, selectedId]);

  const activeIndex = reviews.findIndex((r) => r.id === activeReview?.id);

  const handleSelect = (id) => {
    playClick();
    setSelectedId(id);
  };

  const handleCopyReview = (review) => {
    playClick();
    if (!review) return;
    const quoteText = review.body?.paragraphs?.join('\n\n') || review.preview;
    const attribution = `— ${review.sender} (${review.senderRole})`;
    const fullText = `${review.subject}\n\n${quoteText}\n\n${attribution}`;
    
    navigator.clipboard?.writeText(fullText).then(() => {
      setCopiedId(review.id);
      if (onShowToast) {
        onShowToast(`✓ Copied note from ${review.sender}!`);
      }
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const handlePrev = () => {
    playClick();
    const prevIdx = (activeIndex - 1 + reviews.length) % reviews.length;
    setSelectedId(reviews[prevIdx].id);
  };

  const handleNext = () => {
    playClick();
    const nextIdx = (activeIndex + 1) % reviews.length;
    setSelectedId(reviews[nextIdx].id);
  };

  return (
    <section
      id="reviews-inbox"
      className="about-reviews-inbox-section"
      aria-label="Client feedback and verified reviews"
    >
      <div className="about-reviews-inbox-container">
        {/* Section Header: Paper tape badge + Display Title */}
        <header className="about-reviews-inbox-header">
          <div className="about-reviews-inbox-tape">
            <span className="about-reviews-inbox-tape-pin" aria-hidden="true" />
            <span className="about-reviews-inbox-tape-text">inbox / client feedback</span>
          </div>

          <h2 className="about-reviews-inbox-headline">
            Words from the other side <span className="about-reviews-headline-gold">of the screen</span>.
          </h2>

          <p className="about-reviews-inbox-subhead">
            Genuine notes from founders, developers, and mentors I've built and shipped with.
          </p>
        </header>

        {/* Dedicated Black Surface Email Client Workstation */}
        <div className="about-reviews-workstation">
          {/* Email Client Window Chrome */}
          <div className="about-reviews-chrome">
            <div className="about-reviews-chrome__traffic-lights" aria-hidden="true">
              <span className="about-reviews-dot about-reviews-dot--close" />
              <span className="about-reviews-dot about-reviews-dot--min" />
              <span className="about-reviews-dot about-reviews-dot--max" />
            </div>

            <div className="about-reviews-chrome__title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
              </svg>
              <span>inbox / reviews ({reviews.length})</span>
            </div>

            <div className="about-reviews-chrome__status">
              <span className="about-reviews-status-indicator" aria-hidden="true" />
              <span>3 Verified Notes</span>
            </div>
          </div>

          {/* Email Dual-Pane Workspace */}
          <div className="about-reviews-body">
            {/* Left Pane: Email Message List */}
            <aside className="about-reviews-list" aria-label="Reviews list">
              <div className="about-reviews-list__header">
                <span className="about-reviews-list__count">{reviews.length} Conversations</span>
                <span className="about-reviews-list__tag">All Verified</span>
              </div>

              <div className="about-reviews-list__items">
                {reviews.map((msg, idx) => {
                  const isSelected = msg.id === activeReview?.id;
                  const initials = msg.senderInitials || msg.sender.slice(0, 2).toUpperCase();

                  return (
                    <button
                      key={msg.id}
                      type="button"
                      className={`about-reviews-row ${isSelected ? 'about-reviews-row--active' : ''}`}
                      onClick={() => handleSelect(msg.id)}
                      onMouseEnter={playHover}
                      aria-selected={isSelected}
                    >
                      {/* Active indicator bar */}
                      <span className="about-reviews-row__indicator" aria-hidden="true" />

                      <div className="about-reviews-row__avatar" aria-hidden="true">
                        <span>{initials}</span>
                      </div>

                      <div className="about-reviews-row__content">
                        <div className="about-reviews-row__top-line">
                          <span className="about-reviews-row__sender">{msg.sender}</span>
                          <span className="about-reviews-row__date">{msg.timestamp || msg.date}</span>
                        </div>

                        <div className="about-reviews-row__subject">
                          {msg.subject}
                        </div>

                        <p className="about-reviews-row__snippet">
                          {msg.preview}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Right Pane: Reading Pane */}
            <main className="about-reviews-reading-pane" aria-live="polite">
              <AnimatePresence mode="wait">
                {activeReview && (
                  <motion.article
                    key={activeReview.id}
                    className="about-reviews-letter"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Letter Header Bar */}
                    <div className="about-reviews-letter__header">
                      <div className="about-reviews-letter__sender-info">
                        <div className="about-reviews-letter__avatar" aria-hidden="true">
                          <span>{activeReview.senderInitials || activeReview.sender.slice(0, 2).toUpperCase()}</span>
                        </div>

                        <div className="about-reviews-letter__sender-details">
                          <div className="about-reviews-letter__sender-name">
                            {activeReview.sender}
                            <span className="about-reviews-letter__verified-badge">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              Verified
                            </span>
                          </div>

                          <div className="about-reviews-letter__sender-role">
                            {activeReview.senderRole}
                          </div>

                          <div className="about-reviews-letter__to-line">
                            <span className="about-reviews-letter__label">to:</span> Dolapo &lt;dfordolapo@gmail.com&gt;
                          </div>
                        </div>
                      </div>

                      {/* Letter Right Meta */}
                      <div className="about-reviews-letter__meta">
                        <span className="about-reviews-letter__date-badge">
                          {activeReview.date || activeReview.timestamp}
                        </span>

                        <div className="about-reviews-letter__star" title="Starred review" aria-label="Starred review">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="#F5B731" stroke="#F5B731" strokeWidth="1.5">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Project Context Box if available */}
                    {activeReview.projectContext && (
                      <div className="about-reviews-letter__context-card">
                        <span className="about-reviews-letter__context-icon" aria-hidden="true">📎</span>
                        <div className="about-reviews-letter__context-text">
                          <strong>Deliverable:</strong> {activeReview.projectContext.deliverable} · <span>{activeReview.projectContext.project}</span>
                        </div>
                      </div>
                    )}

                    {/* Email Subject */}
                    <h3 className="about-reviews-letter__subject">
                      {activeReview.subject}
                    </h3>

                    {/* Email Body Paragraphs */}
                    <div className="about-reviews-letter__body">
                      {activeReview.body?.paragraphs?.map((p, pIdx) => (
                        <p key={pIdx} className="about-reviews-letter__paragraph">
                          {p}
                        </p>
                      ))}
                    </div>

                    {/* Skills Tags */}
                    {activeReview.skills && activeReview.skills.length > 0 && (
                      <div className="about-reviews-letter__skills">
                        <span className="about-reviews-skills-label">Core highlights:</span>
                        <div className="about-reviews-skills-list">
                          {activeReview.skills.map((skill, sIdx) => (
                            <span key={sIdx} className="about-reviews-skill-chip">
                              #{skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Authentic Signoff */}
                    <div className="about-reviews-letter__signoff">
                      <div className="about-reviews-letter__signoff-text">
                        {activeReview.body?.signoff || activeReview.sender}
                      </div>
                    </div>

                    {/* Reading Pane Bottom Quick Actions */}
                    <div className="about-reviews-letter__actions">
                      <button
                        type="button"
                        className="about-reviews-btn about-reviews-btn--copy"
                        onClick={() => handleCopyReview(activeReview)}
                        onMouseEnter={playHover}
                        title="Copy this testimonial"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                        <span>{copiedId === activeReview.id ? '✓ Copied to Clipboard' : 'Copy Quote'}</span>
                      </button>

                      <div className="about-reviews-pagination">
                        <button
                          type="button"
                          className="about-reviews-pag-btn"
                          onClick={handlePrev}
                          onMouseEnter={playHover}
                          aria-label="Previous review"
                          title="Previous review"
                        >
                          &larr;
                        </button>
                        <span className="about-reviews-pag-counter">
                          {activeIndex + 1} of {reviews.length}
                        </span>
                        <button
                          type="button"
                          className="about-reviews-pag-btn"
                          onClick={handleNext}
                          onMouseEnter={playHover}
                          aria-label="Next review"
                          title="Next review"
                        >
                          &rarr;
                        </button>
                      </div>
                    </div>
                  </motion.article>
                )}
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
}
