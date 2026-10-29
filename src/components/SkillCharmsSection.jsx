import React from 'react';
import DeckleDivider from './DeckleDivider';
import '../styles/skill-charms-section.css';

/**
 * SKILL CHARMS SECTION - "I don't stop at the designs."
 * Parchment background (alternating from dark intro).
 * Top DeckleDivider transitions from dark intro into parchment.
 * Uses skills-web.png on desktop and skills-mobile.png on mobile.
 * Modak header strips slightly overlap the top of the chrome rod.
 */

export default function SkillCharmsSection() {
  return (
    <section className="skill-charms-section" aria-label="I don't stop at the designs">
      {/* Canonical Deckle Paper Edge Transition: Dark Intro into Parchment Section */}
      <DeckleDivider type="top" fill="var(--about-parchment-bg)" />

      <div className="skill-charms-container">
        {/* Modak Tilted Paper / Sticker Strips Header */}
        <header className="charms-header-banner">
          <div className="charms-strip charms-strip--top">
            <h2 className="charms-banner-text charms-banner-text--top">
              I don't stop
            </h2>
          </div>
          <div className="charms-strip charms-strip--bottom">
            <span className="charms-banner-text charms-banner-text--bottom">
              at the designs, I...
            </span>
          </div>
        </header>

        {/* Responsive Skill Charms Artwork using provided assets */}
        <div className="charms-artwork-stage">
          <picture className="charms-picture">
            <source media="(max-width: 768px)" srcSet="/assets/skills-mobile.png" />
            <img
              src="/assets/skills-web.png"
              alt="I don't stop at the designs - Skill Charms: 01 UX Research, 02 UI Design, 03 Code Development, 04 Database, 05 Admin Tools, 06 Email Systems, 07 Google Search / SEO, 08 Live Product"
              className="charms-image"
              width="2172"
              height="724"
              loading="eager"
              decoding="async"
            />
          </picture>
        </div>
      </div>

      {/* Canonical Deckle Paper Edge Transition: Parchment Section into Dark Selected Work */}
      <DeckleDivider type="bottom" fill="var(--about-parchment-bg)" />
    </section>
  );
}