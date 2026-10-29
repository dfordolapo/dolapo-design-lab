import React, { useState, useCallback, useEffect } from 'react';
import { CASE_STUDIES } from '../utils/caseStudies';
import { prefetchCaseStudy, scheduleIdlePrefetch } from '../utils/assetPrefetcher';
import DeckleDivider from './DeckleDivider';
import '../styles/selected-work-section.css';

/**
 * SELECTED WORK SECTION — Interactive Desk Shelf
 * Reverts to original heading: "Some of the things I've built."
 * Pure black #000000 background (alternating from parchment).
 * Top DeckleDivider transitions from parchment into black.
 * Complete Desk Shelf image with zero cropping/cut-off on any screen width.
 * Clicking a book opens the lower preview drawer with description, platform & CTA.
 * Bottom gradient softly transitions toward the next section.
 */

const SHELF_PROJECTS = [
  {
    id: 'nailexpress',
    caseStudyId: 'builder-3',
    name: 'NailExpress',
    category: 'PREMIUM PRESS-ON STUDIO',
    color: '#C084FC',
    bgTint: 'rgba(192, 132, 252, 0.14)',
    borderTint: 'rgba(192, 132, 252, 0.28)',
    platform: 'Next.js 16 • Supabase • Paystack',
    role: 'Product Designer • UX Writer • Design Engineer',
    desc: 'A bespoke full-stack ecommerce storefront and merchant operations suite engineered for a luxury press-on nail brand with 3D product inspections and 1-tap checkout.',
    accessibleLabel: 'Select NailExpress project',
    left: '22.2%',
    top: '13.0%',
    width: '10.6%',
    height: '63.0%'
  },
  {
    id: 'thetoysvirago',
    caseStudyId: 'thetoysvirago',
    name: 'TheToysVirago',
    category: 'COMMERCE EXPERIENCE',
    color: '#EAB308',
    bgTint: 'rgba(234, 179, 8, 0.14)',
    borderTint: 'rgba(234, 179, 8, 0.28)',
    platform: 'Web / E-commerce',
    role: 'Product Design • Brand Experience',
    desc: 'A playful and curated toys boutique experience designed for intimate retail storytelling and effortless gift discovery.',
    accessibleLabel: 'Select TheToysVirago project',
    left: '33.2%',
    top: '13.0%',
    width: '9.6%',
    height: '63.0%'
  },
  {
    id: 'awwja',
    caseStudyId: 'designer-2',
    name: 'Awwja',
    category: 'NEGOTIATION PLATFORM',
    color: '#FB923C',
    bgTint: 'rgba(251, 146, 60, 0.14)',
    borderTint: 'rgba(251, 146, 60, 0.28)',
    platform: 'Web App',
    role: 'Product Design • Branding',
    desc: 'An interactive negotiation engine and structured workflow designed to make buyer-seller transactions clear, effortless, and error-tolerant.',
    accessibleLabel: 'Select Awwja project',
    left: '43.2%',
    top: '13.0%',
    width: '13.6%',
    height: '63.0%'
  },
  {
    id: 'onboarding',
    caseStudyId: 'designer-onboarding',
    name: 'Onboarding Screens Collection',
    shortName: 'Onboarding',
    category: 'SELF CHALLENGE',
    color: '#ECC8B2',
    bgTint: 'rgba(236, 200, 178, 0.14)',
    borderTint: 'rgba(236, 200, 178, 0.28)',
    platform: 'Mobile Experiences',
    role: 'Product Design',
    desc: 'A growing collection of focused onboarding screen designs, each exploring a single cognitive and behavioral design principle for first impressions.',
    accessibleLabel: 'Select Onboarding Screens Collection',
    left: '57.2%',
    top: '13.0%',
    width: '10.3%',
    height: '63.0%'
  },
  {
    id: 'gino',
    caseStudyId: 'writer-4',
    name: 'Gino World Jollof Festival',
    shortName: 'Gino',
    category: 'EMAIL AUDIT',
    color: '#E07A8A',
    bgTint: 'rgba(224, 122, 138, 0.14)',
    borderTint: 'rgba(224, 122, 138, 0.28)',
    platform: 'Email Communications',
    role: 'UX Writer',
    desc: 'An in-depth UX writing audit and communication redesign that eliminated vendor ambiguity and restored participant trust for a Guinness World Record event.',
    accessibleLabel: 'Select Gino World Jollof Festival project',
    left: '68.0%',
    top: '13.0%',
    width: '10.8%',
    height: '63.0%'
  },
  {
    id: 'saferide',
    caseStudyId: 'designer-1',
    name: 'SafeRide Mode™',
    shortName: 'SafeRide',
    category: 'UX EXPLORATION',
    color: '#A4B69B',
    bgTint: 'rgba(164, 182, 155, 0.16)',
    borderTint: 'rgba(164, 182, 155, 0.32)',
    platform: 'Mobile App',
    role: 'Product Design • UX Research',
    desc: 'A proactive safety and emergency assistance framework designed into rideshare journeys, giving passengers instant panic triggers and automated status tracking.',
    accessibleLabel: 'Select SafeRide Mode project',
    left: '79.2%',
    top: '13.0%',
    width: '10.0%',
    height: '63.0%'
  }
];

export default function SelectedWorkSection({ onSelectProject }) {
  const [selectedBookId, setSelectedBookId] = useState(null);

  // Background warm cache for all shelf case studies during idle browser time
  useEffect(() => {
    scheduleIdlePrefetch(CASE_STUDIES);
  }, []);

  const handleBookClick = useCallback((bookId) => {
    setSelectedBookId((prev) => (prev === bookId ? null : bookId));
    const project = SHELF_PROJECTS.find((p) => p.id === bookId);
    if (project) {
      const cs = CASE_STUDIES.find((c) => c.id === project.caseStudyId);
      if (cs) prefetchCaseStudy(cs);
    }
  }, []);

  const activeProject = SHELF_PROJECTS.find((p) => p.id === selectedBookId);
  const activeCaseStudy = activeProject ? CASE_STUDIES.find((cs) => cs.id === activeProject.caseStudyId) : null;

  const handleViewCaseStudy = useCallback(() => {
    if (activeCaseStudy && onSelectProject) {
      onSelectProject(activeCaseStudy);
    }
  }, [activeCaseStudy, onSelectProject]);

  return (
    <section
      id="selected-work"
      className="selected-work-section"
      aria-label="Some of the things I've built"
    >
      <div className="selected-work-container">
        {/* Heading in Modak font: Tilted Paper Strips with Non-Yellow Accent */}
        <header className="selected-work-header">
          <div className="selected-work-strip selected-work-strip--top">
            <h2 className="selected-work-title-text">Some of the</h2>
          </div>
          <div className="selected-work-strip selected-work-strip--bottom">
            <span className="selected-work-title-text">things I've built.</span>
          </div>
        </header>

        {/* Tactile prompt midway between heading and shelf */}
        <div className="shelf-explore-prompt" aria-hidden="true">
          <span className="shelf-prompt-tape" />
          <span className="shelf-prompt-text">click on a book to explore</span>
          <span className="shelf-prompt-arrow">&darr;</span>
        </div>

        {/* Desk Shelf Artwork Stage with 6 Interactive Book Hotspots */}
        <div className="desk-shelf-stage">
          <div className="desk-shelf-art-wrapper">
            <picture>
              <source type="image/webp" srcSet="/assets/shelf-img.webp" />
              <img
                src="/assets/shelf-img.jpg"
                alt="Selected Work desk shelf with books: NailExpress, TheToysVirago, Awwja, Onboarding Screens, Gino World Jollof Festival, and SafeRide Mode"
                className="desk-shelf-image"
                width="2752"
                height="1536"
                loading="eager"
                decoding="async"
              />
            </picture>

            {/* 6 Transparent Clickable Hotspots strictly within book boundaries */}
            {SHELF_PROJECTS.map((book) => {
              const isSelected = selectedBookId === book.id;
              return (
                <button
                  key={book.id}
                  type="button"
                  className={"desk-shelf-hotspot " + (isSelected ? "desk-shelf-hotspot--selected" : "")}
                  aria-label={book.accessibleLabel}
                  title={"Click to explore " + book.name}
                  style={{
                    left: book.left,
                    top: book.top,
                    width: book.width,
                    height: book.height,
                    ...(book.transform ? { transform: book.transform, transformOrigin: book.transformOrigin } : {})
                  }}
                  onMouseEnter={() => {
                    const cs = CASE_STUDIES.find((c) => c.id === book.caseStudyId);
                    if (cs) prefetchCaseStudy(cs);
                  }}
                  onClick={() => handleBookClick(book.id)}
                />
              );
            })}
          </div>
        </div>

        {/* Lower Project Details Drawer with Short Description, Platform & CTA */}
        {activeProject && (
          <div className="shelf-preview-drawer" role="region" aria-live="polite">
            <div className="drawer-inner-card">
              {/* Header: Category Badge & Close Button */}
              <div className="drawer-top-bar">
                <div
                  className="drawer-category-badge"
                  style={{
                    color: activeProject.color,
                    backgroundColor: activeProject.bgTint,
                    borderColor: activeProject.borderTint
                  }}
                >
                  <span>{activeProject.category}</span>
                </div>
                <button
                  type="button"
                  className="drawer-close-btn"
                  aria-label="Close project preview"
                  onClick={() => setSelectedBookId(null)}
                >
                  &times;
                </button>
              </div>

              {/* Main Content */}
              <div className="drawer-body">
                <div className="drawer-info-left">
                  <h3 className="drawer-project-title">{activeProject.name}</h3>
                  <p className="drawer-project-desc">{activeProject.desc}</p>
                </div>

                <div className="drawer-meta-right">
                  <div className="drawer-meta-item">
                    <span className="drawer-meta-label">PLATFORM</span>
                    <span className="drawer-meta-val">{activeProject.platform}</span>
                  </div>
                  <div className="drawer-meta-item">
                    <span className="drawer-meta-label">ROLE</span>
                    <span className="drawer-meta-val">{activeProject.role}</span>
                  </div>

                  {/* Primary CTA: Launches the complete Case Study Viewer Modal */}
                  <button
                    type="button"
                    className="drawer-cta-btn"
                    onClick={handleViewCaseStudy}
                  >
                    <span>View Case Study</span>
                    <span className="drawer-cta-arrow">&rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}