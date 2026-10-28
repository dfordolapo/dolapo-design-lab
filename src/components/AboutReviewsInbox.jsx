import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INITIAL_MESSAGES } from '../utils/inboxData';
import useSoundEffects from '../hooks/useSoundEffects';
import '../styles/about-reviews-inbox.css';

// Project preview metadata for each testimonial
const PROJECT_PREVIEWS = {
  'msg-nailexpress': {
    name: 'Nail Express',
    type: 'E-commerce website',
    url: 'https://www.nailexpress.ng',
    image: '/assets/nailexpress-logo.webp',
    actionText: 'View live project',
    description: 'Direct-to-consumer press-on nail storefront with 1-tap checkout, sizing flip cards, and omnichannel email lifecycle suite.'
  },
  'msg-blurr-developer': {
    name: 'Blurr: Anonymous Chat',
    type: 'Storefront images & visuals',
    url: 'https://x.com/dsignwithdolapo',
    image: '/assets/journey-03-design.jpg',
    actionText: 'View project details',
    description: 'Visual direction, feature showcase mockups, and high-conversion Google Play Store storefront graphics.'
  },
  'msg-teeraboh': {
    name: 'Awwja (Best Project Winner)',
    type: 'Automated negotiation machine & escrow',
    url: 'https://awwja.vercel.app',
    image: '/assets/awwja-thumbnail-preview.webp',
    actionText: 'View live waitlist',
    description: 'Bootcamp cohort Best Project winner blending cultural haggling nuances with automated escrow financial architecture.'
  }
};

export default function AboutReviewsInbox({ onShowToast }) {
  const { playClick, playHover } = useSoundEffects();

  // Filter only the verified client reviews / feedback messages
  const reviews = useMemo(() => {
    return INITIAL_MESSAGES.filter(
      (msg) => msg.category === 'Client Feedback' || msg.id.startsWith('msg-blurr') || msg.id.startsWith('msg-nail') || msg.id.startsWith('msg-teeraboh')
    );
  }, []);

  // Nail Express is the initial expanded email example as requested
  const [selectedId, setSelectedId] = useState('msg-nailexpress');
  const [copiedId, setCopiedId] = useState(null);
  const [starredMap, setStarredMap] = useState({ 'msg-nailexpress': true, 'msg-blurr-developer': true, 'msg-teeraboh': true });

  // On mobile: 'list' shows message list, 'email' shows full-width email view
  const [mobileView, setMobileView] = useState('email');

  const activeReview = useMemo(() => {
    return reviews.find((r) => r.id === selectedId) || reviews.find((r) => r.id === 'msg-nailexpress') || reviews[0];
  }, [reviews, selectedId]);

  const activeProject = PROJECT_PREVIEWS[activeReview?.id] || PROJECT_PREVIEWS['msg-nailexpress'];
  const activeIndex = reviews.findIndex((r) => r.id === activeReview?.id);

  const handleSelectMessage = (id) => {
    playClick();
    setSelectedId(id);
    setMobileView('email');
  };

  const handleBackToList = () => {
    playClick();
    setMobileView('list');
  };

  const handleToggleStar = (id) => {
    playClick();
    setStarredMap((prev) => ({ ...prev, [id]: !prev[id] }));
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
      aria-label="Client feedback"
    >
      <div className="about-reviews-inbox-container">
        {/* Section Header: Headline with 'the other side' highlighted + Subhead 'client feedback' */}
        <header className="about-reviews-inbox-header">
          <h2 className="about-reviews-inbox-headline">
            from <span className="about-reviews-headline-gold">the other side</span> of the screen
          </h2>
          <p className="about-reviews-inbox-subhead">
            client feedback
          </p>
        </header>

        {/* The Email Client Interface (Light-Mode Surface placed within Dark Section) */}
        <div className={`about-reviews-workstation about-reviews-workstation--mobile-${mobileView}`}>
          {/* Top Window Frame Bar */}
          <div className="about-reviews-chrome">
            <div className="about-reviews-chrome__left">
              <div className="about-reviews-chrome__traffic-lights" aria-hidden="true">
                <span className="about-reviews-dot about-reviews-dot--close" />
                <span className="about-reviews-dot about-reviews-dot--min" />
                <span className="about-reviews-dot about-reviews-dot--max" />
              </div>
              <span className="about-reviews-chrome__app-label">Mail — Inbox</span>
            </div>

            <div className="about-reviews-chrome__center">
              <span className="about-reviews-chrome__folder-pill">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                  <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                </svg>
                <span>Client Feedback ({reviews.length})</span>
              </span>
            </div>

            <div className="about-reviews-chrome__right">
              <span className="about-reviews-status-badge">
                <span className="about-reviews-status-indicator" aria-hidden="true" />
                <span>Verified</span>
              </span>
            </div>
          </div>

          {/* Email Client Main Dual-Pane Body */}
          <div className="about-reviews-body">
            {/* Left Column: Message List */}
            <aside
              className={`about-reviews-list-col ${mobileView === 'list' ? 'about-reviews-list-col--visible-mobile' : ''}`}
              aria-label="Messages list"
            >
              <div className="about-reviews-list-header">
                <span className="about-reviews-list-title">All Testimonials</span>
                <span className="about-reviews-list-badge">{reviews.length} notes</span>
              </div>

              <div className="about-reviews-list-scroll">
                {reviews.map((msg) => {
                  const isSelected = msg.id === activeReview?.id;
                  const initials = msg.senderInitials || msg.sender.slice(0, 2).toUpperCase();
                  const isStarred = starredMap[msg.id];

                  return (
                    <button
                      key={msg.id}
                      type="button"
                      className={`about-reviews-row ${isSelected ? 'about-reviews-row--active' : ''}`}
                      onClick={() => handleSelectMessage(msg.id)}
                      onMouseEnter={playHover}
                      aria-selected={isSelected}
                    >
                      {/* Active blush border indicator */}
                      <span className="about-reviews-row__accent-line" aria-hidden="true" />

                      <div className="about-reviews-row__avatar" aria-hidden="true">
                        <span>{initials}</span>
                      </div>

                      <div className="about-reviews-row__content">
                        <div className="about-reviews-row__meta-row">
                          <span className="about-reviews-row__sender">{msg.sender}</span>
                          <span className="about-reviews-row__timestamp">{msg.timestamp || msg.date}</span>
                        </div>

                        <div className="about-reviews-row__subject">
                          {msg.subject}
                        </div>

                        <p className="about-reviews-row__snippet">
                          {msg.preview}
                        </p>
                      </div>

                      {/* Star indicator */}
                      <div
                        className="about-reviews-row__star"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleStar(msg.id);
                        }}
                        aria-label={isStarred ? 'Starred message' : 'Star message'}
                        title={isStarred ? 'Starred message' : 'Star message'}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill={isStarred ? '#F59E0B' : 'none'}
                          stroke={isStarred ? '#F59E0B' : '#A8A29E'}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Right Column: Expanded Email Panel (Light Mode) */}
            <main
              className={`about-reviews-email-col ${mobileView === 'email' ? 'about-reviews-email-col--visible-mobile' : ''}`}
              aria-live="polite"
            >
              {activeReview && (
                <article className="about-email-paper">
                  {/* 1. Compact Email Toolbar */}
                  <div className="about-email-toolbar">
                    <div className="about-email-toolbar__left">
                      {/* Mobile Back Control */}
                      <button
                        type="button"
                        className="about-email-back-btn"
                        onClick={handleBackToList}
                        onMouseEnter={playHover}
                        aria-label="Back to inbox list"
                        title="Back to inbox"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="19" y1="12" x2="5" y2="12" />
                          <polyline points="12 19 5 12 12 5" />
                        </svg>
                        <span>Back to inbox</span>
                      </button>

                      {/* Quick Pagination */}
                      <div className="about-email-quick-nav" aria-label="Review switcher">
                        <button
                          type="button"
                          className="about-email-nav-arrow"
                          onClick={handlePrev}
                          onMouseEnter={playHover}
                          aria-label="Previous review"
                          title="Previous review"
                        >
                          &larr;
                        </button>
                        <span className="about-email-nav-counter">
                          {activeIndex + 1} of {reviews.length}
                        </span>
                        <button
                          type="button"
                          className="about-email-nav-arrow"
                          onClick={handleNext}
                          onMouseEnter={playHover}
                          aria-label="Next review"
                          title="Next review"
                        >
                          &rarr;
                        </button>
                      </div>
                    </div>

                    <div className="about-email-toolbar__actions">
                      {/* Star Button */}
                      <button
                        type="button"
                        className={`about-email-tool-btn ${starredMap[activeReview.id] ? 'about-email-tool-btn--starred' : ''}`}
                        onClick={() => handleToggleStar(activeReview.id)}
                        onMouseEnter={playHover}
                        title="Star this review"
                        aria-label="Star this review"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill={starredMap[activeReview.id] ? '#F59E0B' : 'none'} stroke={starredMap[activeReview.id] ? '#F59E0B' : '#78716C'} strokeWidth="2">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </button>

                      {/* Copy Quote Button */}
                      <button
                        type="button"
                        className="about-email-tool-btn"
                        onClick={() => handleCopyReview(activeReview)}
                        onMouseEnter={playHover}
                        title="Copy note to clipboard"
                        aria-label="Copy note to clipboard"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                        <span className="about-email-tool-label">
                          {copiedId === activeReview.id ? 'Copied!' : 'Copy'}
                        </span>
                      </button>

                      {/* Reply button */}
                      <a
                        href={`mailto:${activeReview.senderHandle || 'dfordolapo@gmail.com'}?subject=Re:%20${encodeURIComponent(activeReview.subject)}`}
                        className="about-email-tool-btn"
                        onClick={() => playClick()}
                        onMouseEnter={playHover}
                        title="Reply via email"
                        aria-label="Reply via email"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="9 17 4 12 9 7" />
                          <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
                        </svg>
                        <span className="about-email-tool-label">Reply</span>
                      </a>
                    </div>
                  </div>

                  {/* 2. Sender Avatar, Sender Name, Recipient & Timestamp */}
                  <div className="about-email-sender-card">
                    <div className="about-email-avatar-col">
                      <div className="about-email-avatar" aria-hidden="true">
                        <span>{activeReview.senderInitials || activeReview.sender.slice(0, 2).toUpperCase()}</span>
                      </div>
                    </div>

                    <div className="about-email-sender-meta">
                      <div className="about-email-sender-top">
                        <div className="about-email-sender-name-wrap">
                          <h3 className="about-email-sender-name">{activeReview.sender}</h3>
                          <span className="about-email-verified-tag">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Verified client
                          </span>
                        </div>
                        <span className="about-email-timestamp">{activeReview.date || activeReview.timestamp}</span>
                      </div>

                      <div className="about-email-sender-role">
                        {activeReview.senderRole}
                      </div>

                      <div className="about-email-to-line">
                        <span className="about-email-to-label">to:</span>
                        <span>Dolapo &lt;dfordolapo@gmail.com&gt;</span>
                      </div>
                    </div>
                  </div>

                  {/* Email Subject Line */}
                  <div className="about-email-subject-banner">
                    <h4 className="about-email-subject-title">{activeReview.subject}</h4>
                  </div>

                  {/* 3. Complete Testimonial Message Body */}
                  <div className="about-email-body-prose">
                    {activeReview.body?.paragraphs?.map((para, idx) => (
                      <p key={idx} className="about-email-paragraph">
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Signoff block */}
                  <div className="about-email-signoff">
                    <span className="about-email-signoff-dash">&mdash;</span>
                    <span className="about-email-signoff-name">{activeReview.body?.signoff || activeReview.sender}</span>
                  </div>

                  {/* 4. Project Preview Card (Side-by-side on desktop, stacked on mobile) */}
                  {activeProject && (
                    <div className="about-email-project-card" aria-label={`Project preview for ${activeProject.name}`}>
                      <div className="about-email-project-thumb-frame">
                        <img
                          src={activeProject.image}
                          alt={activeProject.name}
                          className="about-email-project-thumb"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>

                      <div className="about-email-project-details">
                        <div className="about-email-project-headline-row">
                          <div>
                            <h5 className="about-email-project-name">{activeProject.name}</h5>
                            <span className="about-email-project-type">{activeProject.type}</span>
                          </div>
                        </div>

                        <p className="about-email-project-desc">
                          {activeProject.description}
                        </p>

                        {/* 5. Clearly labeled View Live Project Action */}
                        <div className="about-email-project-action-row">
                          <a
                            href={activeProject.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="about-email-view-live-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              playClick();
                            }}
                            onMouseEnter={playHover}
                            aria-label={`${activeProject.actionText}: ${activeProject.name} (opens in new tab)`}
                          >
                            <span>{activeProject.actionText}</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              )}
            </main>
          </div>
        </div>
      </div>
    </section>
  );
}
