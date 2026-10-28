import React, { useState, useMemo } from 'react';
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

export default function AboutReviewsInbox() {
  const { playClick, playHover } = useSoundEffects();

  // Filter only the verified client reviews / feedback messages
  const reviews = useMemo(() => {
    return INITIAL_MESSAGES.filter(
      (msg) => msg.category === 'Client Feedback' || msg.id.startsWith('msg-blurr') || msg.id.startsWith('msg-nail') || msg.id.startsWith('msg-teeraboh')
    );
  }, []);

  // Nail Express is the initial expanded email example
  const [selectedId, setSelectedId] = useState('msg-nailexpress');

  // On mobile: 'list' shows message list, 'email' shows full-width email view
  const [mobileView, setMobileView] = useState('email');

  const activeReview = useMemo(() => {
    return reviews.find((r) => r.id === selectedId) || reviews.find((r) => r.id === 'msg-nailexpress') || reviews[0];
  }, [reviews, selectedId]);

  const activeProject = PROJECT_PREVIEWS[activeReview?.id] || PROJECT_PREVIEWS['msg-nailexpress'];

  const handleSelectMessage = (id) => {
    playClick();
    setSelectedId(id);
    setMobileView('email');
  };

  const handleBackToList = () => {
    playClick();
    setMobileView('list');
  };

  return (
    <section
      id="reviews-inbox"
      className="about-reviews-inbox-section"
      aria-label="Client feedback"
    >
      <div className="about-reviews-inbox-container">
        {/* Section Header: Sentence capitalized at beginning, no subhead */}
        <header className="about-reviews-inbox-header">
          <h2 className="about-reviews-inbox-headline">
            From <span className="about-reviews-headline-gold">the other side</span> of the screen
          </h2>
        </header>

        {/* The Email Client Interface (Light-Mode Surface placed within Dark Section) */}
        <div className={`about-reviews-workstation about-reviews-workstation--mobile-${mobileView}`}>
          {/* Header of the email: ONLY has client feedback eyebrow */}
          <div className="about-reviews-chrome">
            <span className="about-reviews-eyebrow">client feedback</span>
          </div>

          {/* Email Client Main Dual-Pane Body */}
          <div className="about-reviews-body">
            {/* Left Column: Message List (No outer stroke, no All Testimonials header, no stars) */}
            <aside
              className={`about-reviews-list-col ${mobileView === 'list' ? 'about-reviews-list-col--visible-mobile' : ''}`}
              aria-label="Messages list"
            >
              <div className="about-reviews-list-scroll">
                {reviews.map((msg) => {
                  const isSelected = msg.id === activeReview?.id;
                  const initials = msg.senderInitials || msg.sender.slice(0, 2).toUpperCase();

                  return (
                    <button
                      key={msg.id}
                      type="button"
                      className={`about-reviews-row ${isSelected ? 'about-reviews-row--active' : ''}`}
                      onClick={() => handleSelectMessage(msg.id)}
                      onMouseEnter={playHover}
                      aria-selected={isSelected}
                    >
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
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Right Column: Expanded Email Panel (Light Mode, significantly reduced font) */}
            <main
              className={`about-reviews-email-col ${mobileView === 'email' ? 'about-reviews-email-col--visible-mobile' : ''}`}
              aria-live="polite"
            >
              {activeReview && (
                <article className="about-email-paper">
                  {/* Next line: Back icon and Reply on opposite ends, nothing more */}
                  <div className="about-email-toolbar">
                    <button
                      type="button"
                      className="about-email-nav-icon-btn"
                      onClick={handleBackToList}
                      onMouseEnter={playHover}
                      aria-label="Back to messages list"
                      title="Back to messages list"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                      </svg>
                    </button>

                    <a
                      href={`mailto:${activeReview.senderHandle || 'dfordolapo@gmail.com'}?subject=Re:%20${encodeURIComponent(activeReview.subject)}`}
                      className="about-email-nav-icon-btn"
                      onClick={() => playClick()}
                      onMouseEnter={playHover}
                      title="Reply via email"
                      aria-label="Reply via email"
                    >
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="9 17 4 12 9 7" />
                        <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
                      </svg>
                    </a>
                  </div>

                  {/* Sender Avatar, Name, Recipient & Timestamp (No verified client tag) */}
                  <div className="about-email-sender-card">
                    <div className="about-email-avatar-col">
                      <div className="about-email-avatar" aria-hidden="true">
                        <span>{activeReview.senderInitials || activeReview.sender.slice(0, 2).toUpperCase()}</span>
                      </div>
                    </div>

                    <div className="about-email-sender-meta">
                      <div className="about-email-sender-top">
                        <h3 className="about-email-sender-name">{activeReview.sender}</h3>
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

                  {/* Email Subject */}
                  <div className="about-email-subject-banner">
                    <h4 className="about-email-subject-title">{activeReview.subject}</h4>
                  </div>

                  {/* Testimonial Message Body */}
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

                  {/* Project Preview Card (Compact side-by-side on desktop, stacked on mobile) */}
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
                          <h5 className="about-email-project-name">{activeProject.name}</h5>
                          <span className="about-email-project-type">{activeProject.type}</span>
                        </div>

                        <p className="about-email-project-desc">
                          {activeProject.description}
                        </p>

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
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
