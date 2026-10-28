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

  // Filter client reviews (Teeraboh is preserved in inboxData & PROJECT_PREVIEWS for future reference)
  const reviews = useMemo(() => {
    return INITIAL_MESSAGES.filter(
      (msg) => (msg.category === 'Client Feedback' || msg.id.startsWith('msg-blurr') || msg.id.startsWith('msg-nail')) && !msg.id.includes('teeraboh')
    );
  }, []);

  // Emails start out collapsed on both web and mobile; opens only when clicked
  const [selectedId, setSelectedId] = useState(null);

  const activeReview = useMemo(() => {
    if (!selectedId) return null;
    return reviews.find((r) => r.id === selectedId) || null;
  }, [reviews, selectedId]);

  const activeProject = activeReview ? (PROJECT_PREVIEWS[activeReview.id] || PROJECT_PREVIEWS['msg-nailexpress']) : null;

  const handleSelectMessage = (id) => {
    playClick();
    setSelectedId(id);
  };

  const handleBackToList = () => {
    playClick();
    setSelectedId(null);
  };

  return (
    <section
      id="reviews-inbox"
      className="about-reviews-inbox-section"
      aria-label="Client feedback"
    >
      <div className="about-reviews-inbox-container">
        {/* Section Header: Sentence capitalized at beginning, one line on web or two equal lines */}
        <header className="about-reviews-inbox-header">
          <h2 className="about-reviews-inbox-headline">
            <span className="about-reviews-headline-line">From <span className="about-reviews-headline-cyan">the other side</span></span>{' '}
            <span className="about-reviews-headline-line">of the screen</span>
          </h2>
        </header>

        {/* The Email Client Interface (Light-Mode Surface placed within Dark Section) */}
        <div className={`about-reviews-workstation ${activeReview ? 'about-reviews-workstation--open' : 'about-reviews-workstation--collapsed'}`}>
          {/* Header of the email: ONLY has client feedback eyebrow */}
          <div className="about-reviews-chrome">
            <span className="about-reviews-eyebrow">client feedback</span>
          </div>

          {/* Email Client Body: Shows Collapsed List when !activeReview, or Expanded Email when activeReview */}
          <div className="about-reviews-body">
            {!activeReview ? (
              /* Collapsed List View (Starts collapsed on both web & mobile) */
              <div className="about-reviews-list-col about-reviews-list-col--full" aria-label="Messages list">
                <div className="about-reviews-list-scroll">
                  {reviews.map((msg) => {
                    const initials = msg.senderInitials || msg.sender.slice(0, 2).toUpperCase();

                    return (
                      <button
                        key={msg.id}
                        type="button"
                        className="about-reviews-row"
                        onClick={() => handleSelectMessage(msg.id)}
                        onMouseEnter={playHover}
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

                        <div className="about-reviews-row__chevron" aria-hidden="true">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Expanded Email View (Opens only when clicked; Back icon closes back to collapsed state) */
              <article className="about-email-paper">
                {/* Toolbar: Back icon only (reply icon removed as requested) */}
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
                </div>

                {/* Sender Avatar, Name, Recipient & Timestamp */}
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

                {/* Project Preview Card */}
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
          </div>
        </div>
      </div>
    </section>
  );
}
