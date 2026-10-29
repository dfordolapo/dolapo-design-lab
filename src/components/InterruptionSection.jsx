import React, { useState, useEffect, useRef } from 'react';
import DeckleDivider from './DeckleDivider';
import useSoundEffects from '../hooks/useSoundEffects';
import { CASE_STUDIES } from '../utils/caseStudies.jsx';
import '../styles/interruption-section.css';

const LINE_TEXTS = [
  'Excuse the interruption',
  'Not to brag but...',
  'My work, Awwja won Best Project at the MoonTechLife bootcamp. Just thought you should know.',
  'As you were…'
];

export default function InterruptionSection({ onSelectProject }) {
  const { playClick } = useSoundEffects();
  const sectionRef = useRef(null);

  const [hasTriggered, setHasTriggered] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Scroll detection via IntersectionObserver
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setCurrentLine(LINE_TEXTS.length);
      setIsComplete(true);
      setHasTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Pure, robust typewriter state machine
  useEffect(() => {
    if (!hasTriggered || isComplete) return;

    if (currentLine >= LINE_TEXTS.length) {
      setIsComplete(true);
      return;
    }

    const targetLine = LINE_TEXTS[currentLine];
    let timerId = null;

    if (currentChar < targetLine.length) {
      timerId = setTimeout(() => {
        setCurrentChar((c) => c + 1);
      }, 26);
    } else {
      // Current line completed: pause naturally before advancing to next line
      const pauseDuration = currentLine === 0 ? 320 : 250;
      timerId = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, pauseDuration);
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [hasTriggered, currentLine, currentChar, isComplete]);

  // Click handler for Awwja case study or live project
  const handleAwwjaClick = (e) => {
    e.preventDefault();
    if (playClick) playClick();
    if (onSelectProject && Array.isArray(CASE_STUDIES)) {
      const awwja = CASE_STUDIES.find(
        (c) => c.title?.toLowerCase().includes('awwja') || c.id?.toLowerCase().includes('awwja')
      );
      if (awwja) {
        onSelectProject(awwja);
        return;
      }
    }
    if (typeof window !== 'undefined') {
      window.open('https://awwja.vercel.app', '_blank', 'noopener,noreferrer');
    }
  };

  // Helper to get typed content for a given line index
  const getLineText = (lineIndex) => {
    if (currentLine > lineIndex) {
      return LINE_TEXTS[lineIndex];
    }
    if (currentLine === lineIndex) {
      return LINE_TEXTS[lineIndex].slice(0, currentChar);
    }
    return '';
  };

  // Render Line 2 with Awwja interactive link
  const renderLine2Content = (text) => {
    if (!text) return null;
    const awwjaTarget = 'Awwja';
    const awwjaPos = LINE_TEXTS[2].indexOf(awwjaTarget);
    const awwjaEnd = awwjaPos + awwjaTarget.length;

    if (text.length <= awwjaPos) {
      return text;
    }

    const prefix = text.slice(0, awwjaPos);

    if (text.length < awwjaEnd) {
      const partial = text.slice(awwjaPos);
      return (
        <>
          {prefix}
          <button
            type="button"
            className="interruption-awwja-keyword"
            onClick={handleAwwjaClick}
            title="Explore Awwja project"
            aria-label="Explore Awwja (opens waitlist)"
          >
            {partial}
          </button>
        </>
      );
    }

    const suffix = text.slice(awwjaEnd);
    return (
      <>
        {prefix}
        <button
          type="button"
          className="interruption-awwja-keyword"
          onClick={handleAwwjaClick}
          title="Explore Awwja project"
          aria-label="Explore Awwja (opens waitlist)"
        >
          {awwjaTarget}
        </button>
        {suffix}
      </>
    );
  };

  const line0 = getLineText(0);
  const line1 = getLineText(1);
  const line2 = getLineText(2);
  const line3 = getLineText(3);

  return (
    <section
      ref={sectionRef}
      className="interruption-section"
      aria-label="Excuse the interruption"
    >
      {/* Canonical Deckle Paper Edge: Transitions from dark Reviews into Parchment */}
      <DeckleDivider type="top" fill="var(--about-parchment-bg)" />

      <div className="interruption-container">
        {/* Tactile Vintage Rubber Ink Award Stamp Badge */}
        <div
          className={`interruption-stamp-badge ${hasTriggered ? 'interruption-stamp-badge--stamped' : ''}`}
          onClick={playClick}
          title="Best Project Winner — MoonTechLife Bootcamp Cohort"
          aria-label="Award badge: Best Project Winner at MoonTechLife Bootcamp"
          role="img"
        >
          <svg viewBox="0 0 160 160" className="interruption-stamp-svg" aria-hidden="true">
            <defs>
              <path id="stampArcTop" d="M 22,80 A 58,58 0 1,1 138,80" fill="none" />
              <path id="stampArcBottom" d="M 22,80 A 58,58 0 0,0 138,80" fill="none" />
            </defs>

            {/* Outer Scalloped / Perforated Ring */}
            <circle cx="80" cy="80" r="74" fill="none" stroke="#9F1239" strokeWidth="2" strokeDasharray="3 3" opacity="0.75" />

            {/* Double Circular Rings */}
            <circle cx="80" cy="80" r="69" fill="none" stroke="#9F1239" strokeWidth="2.2" opacity="0.9" />
            <circle cx="80" cy="80" r="48" fill="none" stroke="#9F1239" strokeWidth="1.2" opacity="0.65" />

            {/* Top Curved Text */}
            <text fill="#9F1239" fontSize="9.5" fontWeight="800" letterSpacing="1.8" fontFamily="system-ui, -apple-system, sans-serif" opacity="0.95">
              <textPath href="#stampArcTop" startOffset="50%" textAnchor="middle">
                ★ BEST PROJECT ★
              </textPath>
            </text>

            {/* Bottom Curved Text */}
            <text fill="#9F1239" fontSize="8" fontWeight="700" letterSpacing="1.4" fontFamily="system-ui, -apple-system, sans-serif" opacity="0.95">
              <textPath href="#stampArcBottom" startOffset="50%" textAnchor="middle">
                MOONTECHLIFE
              </textPath>
            </text>

            {/* Center Laurel Wreath and Stars */}
            <g transform="translate(80, 80)" stroke="#9F1239" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
              {/* Left Laurel */}
              <path d="M -5,14 C -15,10 -18,-1 -13,-12 C -10,-17 -6,-20 -2,-22" strokeWidth="1.5" />
              <path d="M -13,-8 C -18,-10 -20,-13 -18,-17 C -16,-16 -12,-13 -11,-10" fill="#9F1239" strokeWidth="0.5" />
              <path d="M -15,0 C -20,-1 -22,-5 -20,-9 C -17,-8 -14,-5 -13,-2" fill="#9F1239" strokeWidth="0.5" />
              <path d="M -12,8 C -18,8 -20,4 -18,1 C -15,2 -13,5 -11,7" fill="#9F1239" strokeWidth="0.5" />

              {/* Right Laurel */}
              <path d="M 5,14 C 15,10 18,-1 13,-12 C 10,-17 6,-20 2,-22" strokeWidth="1.5" />
              <path d="M 13,-8 C 18,-10 20,-13 18,-17 C 16,-16 12,-13 11,-10" fill="#9F1239" strokeWidth="0.5" />
              <path d="M 15,0 C 20,-1 22,-5 20,-9 C 17,-8 14,-5 13,-2" fill="#9F1239" strokeWidth="0.5" />
              <path d="M 12,8 C 18,8 20,4 18,1 C 15,2 13,5 11,7" fill="#9F1239" strokeWidth="0.5" />

              {/* Center Star */}
              <polygon points="0,-14 3,-5 12,-5 5,1 8,9 0,4 -8,9 -5,1 -12,-5 -3,-5" fill="#9F1239" strokeWidth="0.8" />

              <text y="7" textAnchor="middle" fill="#9F1239" stroke="none" fontSize="8" fontWeight="800" letterSpacing="0.8" fontFamily="system-ui, -apple-system, sans-serif">
                1ST PLACE
              </text>
              <text y="15" textAnchor="middle" fill="#9F1239" stroke="none" fontSize="5.5" fontWeight="700" letterSpacing="0.5" fontFamily="system-ui, -apple-system, sans-serif" opacity="0.85">
                BOOTCAMP
              </text>
            </g>
          </svg>
        </div>

        {/* Line 1: Modak font with unique deep crimson color */}
        {(hasTriggered || line0.length > 0) && (
          <h2 className="interruption-headline">
            {line0}
            {currentLine === 0 && !isComplete && (
              <span className="interruption-caret" aria-hidden="true" />
            )}
          </h2>
        )}

        {/* Line 2: "Not to brag but..." */}
        {(currentLine >= 1 || line1.length > 0) && (
          <p className="interruption-subhead">
            {line1}
            {currentLine === 1 && !isComplete && (
              <span className="interruption-caret" aria-hidden="true" />
            )}
          </p>
        )}

        {/* Line 3: "My work, Awwja won Best Project at the MoonTechLife bootcamp. Just thought you should know." */}
        {(currentLine >= 2 || line2.length > 0) && (
          <p className="interruption-body">
            {renderLine2Content(line2)}
            {currentLine === 2 && !isComplete && (
              <span className="interruption-caret" aria-hidden="true" />
            )}
          </p>
        )}

        {/* Line 4: "As you were…" */}
        {(currentLine >= 3 || line3.length > 0) && (
          <p className="interruption-signoff">
            {line3}
            {(currentLine === 3 || isComplete) && (
              <span
                className={`interruption-caret ${isComplete ? 'interruption-caret--done' : ''}`}
                aria-hidden="true"
              />
            )}
          </p>
        )}
      </div>

      {/* Canonical Deckle Paper Edge: Transitions from Parchment into dark Beyond the Workspace */}
      <DeckleDivider type="bottom" fill="var(--about-parchment-bg)" />
    </section>
  );
}
