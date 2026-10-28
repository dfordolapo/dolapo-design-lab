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
