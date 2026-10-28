import React, { useRef, useState, useEffect } from 'react'

/**
 * ScrollTriggeredQuote:
 * Highlighted quote with independent scroll-triggered typing animation.
 * Space allocation is guaranteed stable via double-layer layout (invisible spacer + overlay),
 * preventing layout shifts when characters type in.
 */
export default function ScrollTriggeredQuote({
  quote = "I care about the details because people feel them."
}) {
  const quoteRef = useRef(null)
  const [typedCount, setTypedCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  // IntersectionObserver to trigger at 20-30% visibility
  useEffect(() => {
    // Reduced motion: complete immediately without typing
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setTypedCount(quote.length)
      setHasStarted(true)
      setIsComplete(true)
      return
    }

    const element = quoteRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.25 // Trigger when roughly 20-30% is visible
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [hasStarted, quote.length])

  // Deliberate typing effect (45-65ms per character)
  useEffect(() => {
    if (!hasStarted || isComplete) return

    let current = 0
    const intervalTime = 52 // ~52ms per character (within 45-65ms range)
    const timer = setInterval(() => {
      current += 1
      setTypedCount(current)
      if (current >= quote.length) {
        clearInterval(timer)
        setIsComplete(true)
      }
    }, intervalTime)

    return () => clearInterval(timer)
  }, [hasStarted, isComplete, quote])

  return (
    <div
      ref={quoteRef}
      className="about-hero-paper-slip about-hero-paper-slip--cinematic"
      aria-label={`“${quote}”`}
    >
      <span className="about-hero-paper-tape" aria-hidden="true" />

      {/* Grid container ensures 100% height and width stability without layout shifts */}
      <div className="about-quote-stable-wrapper">
        {/* Invisible static spacer: occupies exact natural space */}
        <blockquote className="about-hero-paper-quote about-quote-ghost-spacer" aria-hidden="true">
          “{quote}”
        </blockquote>

        {/* Visible typing overlay */}
        <blockquote className="about-hero-paper-quote about-quote-visible-layer" aria-hidden="true">
          “{quote.slice(0, typedCount)}”
          {hasStarted && !isComplete && (
            <span className="about-hero-typewriter-caret" aria-hidden="true" />
          )}
        </blockquote>
      </div>

      {/* Screen reader text for clean non-repetitive reading */}
      <span className="sr-only">“{quote}”</span>
    </div>
  )
}
