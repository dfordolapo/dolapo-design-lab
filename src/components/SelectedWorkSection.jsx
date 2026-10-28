import React, { useState, useCallback } from 'react';
import { CASE_STUDIES } from '../utils/caseStudies';
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
    id: 'awwja',
    caseStudyId: 'designer-2',
    name: 'Awwja',
    category: 'NEGOTIATION PLATFORM',
    color: '#FE9784',
    bgTint: 'rgba(254, 151, 132, 0.14)',
    borderTint: 'rgba(254, 151, 132, 0.28)',
    platform: 'Web App',
    role: 'Product Design • Branding',
    desc: 'An interactive negotiation engine and structured workflow designed to make buyer-seller transactions clear, effortless, and error-tolerant.',
    accessibleLabel: 'Select Awwja project',
    left: '19.1%',
    top: '11.0%',
    width: '14.0%',
    height: '66.1%'
  },
  {
    id: 'onboarding',
    caseStudyId: 'designer-onboarding',
    name: 'Onboarding Screens Collection',
    shortName: 'Onboarding',
    category: 'SELF CHALLENGE • MOBILE UX',
    color: '#ECC8B2',
    bgTint: 'rgba(236, 200, 178, 0.14)',
    borderTint: 'rgba(236, 200, 178, 0.28)',
    platform: 'Mobile Experiences',
    role: 'Product Design',
    desc: 'A growing collection of focused onboarding screen designs, each exploring a single cognitive and behavioral design principle for first impressions.',
    accessibleLabel: 'Select Onboarding Screens Collection',
    left: '33.1%',
    top: '11.0%',
    width: '11.4%',
    height: '66.1%'
  },
  {
    id: 'gino',
    caseStudyId: 'writer-4',
    name: 'Gino World Jollof Festival',
    shortName: 'Gino',
    category: 'GINO WORLD JOLLOF FESTIVAL',
    color: '#D47A78',
    bgTint: 'rgba(212, 122, 120, 0.14)',
    borderTint: 'rgba(212, 122, 120, 0.28)',
    platform: 'Email Communications',
    role: 'UX Writer',
    desc: 'An in-depth UX writing audit and communication redesign that eliminated vendor ambiguity and restored participant trust for a Guinness World Record event.',
    accessibleLabel: 'Select Gino World Jollof Festival project',
    left: '44.5%',
    top: '11.0%',
    width: '11.6%',
    height: '66.1%'
  },
  {
    id: 'saferide',
    caseStudyId: 'designer-1',
    name: 'SafeRide Mode™',
    shortName: 'SafeRide',
    category: 'UX EXPLORATION • RIDE SAFETY',
    color: '#A4B69B',
    bgTint: 'rgba(164, 182, 155, 0.16)',
    borderTint: 'rgba(164, 182, 155, 0.32)',
    platform: 'Mobile App',
    role: 'Product Design • UX Research',
    desc: 'A proactive safety and emergency assistance framework designed into rideshare journeys, giving passengers instant panic triggers and automated status tracking.',
    accessibleLabel: 'Select SafeRide Mode project',
    left: '56.1%',
    top: '11.0%',
    width: '11.8%',
    height: '66.1%'
  },
  {
    id: 'vurdict',
    caseStudyId: 'designer-3',
    name: 'Vurdict',
    category: 'AI PORTFOLIO REVIEWER',
    color: '#A0A3CE',
    bgTint: 'rgba(160, 163, 206, 0.16)',
    borderTint: 'rgba(160, 163, 206, 0.32)',
    platform: 'Progressive Web App',
    role: 'Product Strategy • UX/UI • Full-Stack',
    desc: 'An intelligent portfolio critique and heuristic review platform engineered to give designers and builders instant, actionable feedback in under 5 minutes.',
    accessibleLabel: 'Select Vurdict project',
    left: '68.0%',
    top: '10.5%',
    width: '12.2%',
    height: '66.5%',
    transform: 'rotate(-10.8deg)',
    transformOrigin: 'top left'
  }
];

export default function SelectedWorkSection({ onSelectProject }) {
  const [selectedBookId, setSelectedBookId] = useState(null);

  const handleBookClick = useCallback((bookId) => {
    setSelectedBookId((prev) => (prev === bookId ? null : bookId));
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

        {/* Desk Shelf Artwork Stage with 5 Interactive Book Hotspots */}
        <div className="desk-shelf-stage">
          <div className="desk-shelf-art-wrapper">
            <img
              src="/assets/shelf-img.jpg"
              alt="Selected Work desk shelf with books: Awwja, Onboarding, Gino World Jollof Festival, SafeRide Mode, and Vurdict"
              className="desk-shelf-image"
              width="2752"
              height="1536"
              loading="eager"
              decoding="async"
            />

            {/* 5 Transparent Clickable Hotspots strictly within book boundaries */}
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