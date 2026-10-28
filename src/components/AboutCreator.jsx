import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import TopBar from './TopBar'
import Scrapbook from './Scrapbook'
import DotPortrait from './DotPortrait'
import SkillCharmsSection from './SkillCharmsSection'
import SelectedWorkSection from './SelectedWorkSection'
import WorkbenchSection from './WorkbenchSection'
import DeckleDivider from './DeckleDivider'
import AboutCaseStudyModal from './AboutCaseStudyModal'
import StickyMobileActionBar from './StickyMobileActionBar'
import AboutReviewsInbox from './AboutReviewsInbox'
import SocialBubbles from './SocialBubbles'
import usePageSEO from '../hooks/usePageSEO'
import useSoundEffects from '../hooks/useSoundEffects'
import '../styles/about-creator.css'

const MILESTONES = [
  {
    num: '01',
    title: 'Words first',
    desc: 'Poetry, language, and storytelling shaped how I see the world.',
    annotation: 'The beginning.',
    image: '/assets/journey-01-words.jpg',
    alt: 'Vintage handwritten poetry notebook with fountain pen and tropical sunlight in Lagos'
  },
  {
    num: '02',
    title: 'People next',
    desc: 'Understanding how people think, feel, and make decisions.',
    annotation: 'People have always been the center.',
    image: '/assets/journey-02-people.jpg',
    alt: 'Bustling Lagos streetscape at golden hour with iconic yellow Danfo buses and market stalls'
  },
  {
    num: '03',
    title: 'Design & words',
    desc: 'Crafting clear, thoughtful experiences.',
    annotation: 'Where it all started to click.',
    image: '/assets/journey-03-design.jpg',
    alt: 'UI/UX product design workspace in Lagos with laptop wireframes and sketchbook'
  },
  {
    num: '04',
    title: 'Build',
    desc: 'Learning to code and ship products.',
    annotation: 'Curiosity turned into capability.',
    image: '/assets/journey-04-build.jpg',
    alt: 'Simple laptop screen with an IDE coding on a wooden desk in bright daylight'
  },
  {
    num: '05',
    title: "What's next",
    desc: 'Bigger ideas. Better products. More impact.',
    annotation: 'Still so much to explore.',
    image: '/assets/journey-05-future.jpg',
    alt: 'Airplane window view of the Lagos coastline and Atlantic Ocean glowing at dusk'
  }
]

const HEADLINE_PART_1 = "Creative."
const HEADLINE_PART_2 = "Designer. Writer. Builder."
const HEADLINE_FULL = `${HEADLINE_PART_1} ${HEADLINE_PART_2}`
const QUOTE_TEXT = "“I care about the details because people feel them.”"

export default function AboutCreator({ onBack }) {
  usePageSEO({
    title: "About Dolapo: The Person Behind the Pixels",
    description: "Creative. Designer. Writer. Builder. Learn how poetry, storytelling, product design, and building with code connect in Dolapo's Design Lab."
  })

  const { playClick, playHover } = useSoundEffects()
  const journeyRef = useRef(null)
  const quoteRef = useRef(null)
  const [activeCaseStudy, setActiveCaseStudy] = useState(null)

  const handleNavigate = (path) => {
    playClick()
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path)
      window.dispatchEvent(new Event('popstate'))
    }
  }

  // Animated headline typing state (fast load, finishes in ~900ms)
  const [headlineTypedCount, setHeadlineTypedCount] = useState(0)
  const [isTypingHeadline, setIsTypingHeadline] = useState(true)

  // Sticky note quote typewriter state: starts plain, types in after headline completes
  const [quoteTypedCount, setQuoteTypedCount] = useState(0)
  const [isTypingQuote, setIsTypingQuote] = useState(false)
  const [isQuoteDone, setIsQuoteDone] = useState(false)

  const handleFastForwardHeadline = () => {
    setHeadlineTypedCount(HEADLINE_PART_1.length + HEADLINE_PART_2.length)
    setIsTypingHeadline(false)
    setIsTypingQuote(false)
    setQuoteTypedCount(QUOTE_TEXT.length)
    setIsQuoteDone(true)
  }

  // Headline typewriter effect on mount
  useEffect(() => {
    const totalChars = HEADLINE_PART_1.length + HEADLINE_PART_2.length
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setHeadlineTypedCount(totalChars)
      setIsTypingHeadline(false)
      setQuoteTypedCount(QUOTE_TEXT.length)
      setIsQuoteDone(true)
      return
    }

    let count = 0
    let timerId = null
    const speed = 26 // Fast typewriter animation

    const step = () => {
      count += 1
      setHeadlineTypedCount(count)
      if (count < totalChars) {
        timerId = setTimeout(step, speed)
      } else {
        timerId = setTimeout(() => {
          setIsTypingHeadline(false)
          // On WEB (desktop): trigger quote typewriter sequentially after headline completes
          const isMobileViewport = typeof window !== 'undefined' && window.innerWidth <= 768
          if (!isMobileViewport) {
            setTimeout(() => {
              setIsTypingQuote(true)
            }, 160)
          }
        }, 200)
      }
    }

    timerId = setTimeout(step, 80)

    return () => {
      if (timerId) clearTimeout(timerId)
    }
  }, [])

  // On MOBILE: Sticky note quote types in ONLY after the user scrolls down to where it shows
  useEffect(() => {
    const isMobileViewport = typeof window !== 'undefined' && window.innerWidth <= 768
    if (!isMobileViewport || !quoteRef.current || isQuoteDone || isTypingQuote) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isQuoteDone && !isTypingQuote) {
            setIsTypingQuote(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.25 }
    )

    observer.observe(quoteRef.current)

    return () => {
      observer.disconnect()
    }
  }, [isQuoteDone, isTypingQuote])

  // Quote typewriter effect: types character by character
  useEffect(() => {
    if (!isTypingQuote) return

    let count = 0
    let timerId = null
    const quoteSpeed = 36 // Natural typewriter cadence

    const stepQuote = () => {
      count += 1
      setQuoteTypedCount(count)
      if (count < QUOTE_TEXT.length) {
        timerId = setTimeout(stepQuote, quoteSpeed)
      } else {
        timerId = setTimeout(() => {
          setIsTypingQuote(false)
          setIsQuoteDone(true)
        }, 350)
      }
    }

    timerId = setTimeout(stepQuote, 60)

    return () => {
      if (timerId) clearTimeout(timerId)
    }
  }, [isTypingQuote])

  const handleScrollToJourney = (e) => {
    e.preventDefault()
    playClick()
    journeyRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const desktopTimelineRef = useRef(null)
  const polaroidRefs = useRef([])
  const [journeyPathD, setJourneyPathD] = useState(
    'M 0 75 C 150 75, 200 270, 300 270 C 400 270, 450 75, 550 75 C 650 75, 700 270, 800 270 C 900 270, 950 75, 1100 75'
  )

  useEffect(() => {
    const calculatePath = () => {
      const container = desktopTimelineRef.current
      if (!container) return

      const cRect = container.getBoundingClientRect()
      if (cRect.width === 0) return

      const nodes = polaroidRefs.current
      if (!nodes || nodes.length < 5) return

      const coords = nodes.map((node) => {
        if (!node) return null
        const r = node.getBoundingClientRect()
        return {
          left: r.left - cRect.left,
          right: r.right - cRect.left,
          width: r.width,
          centerY: r.top - cRect.top + r.height * 0.46
        }
      })

      if (coords.some((c) => !c)) return

      // Build path that directly traverses through each polaroid photo
      let path = `M 0 ${coords[0].centerY} L ${coords[0].left} ${coords[0].centerY}`

      for (let i = 0; i < coords.length; i++) {
        const cur = coords[i]
        // Straight line threading directly through the polaroid photo
        path += ` L ${cur.right} ${cur.centerY}`

        if (i < coords.length - 1) {
          const next = coords[i + 1]
          const dx = next.left - cur.right
          const cp1x = cur.right + dx * 0.48
          const cp1y = cur.centerY
          const cp2x = next.left - dx * 0.48
          const cp2y = next.centerY
          path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.left} ${next.centerY}`
        }
      }

      const last = coords[coords.length - 1]
      path += ` L ${cRect.width} ${last.centerY}`

      setJourneyPathD(path)
    }

    calculatePath()

    const container = desktopTimelineRef.current
    if (!container) return

    const ro = new ResizeObserver(() => {
      calculatePath()
    })

    ro.observe(container)
    window.addEventListener('resize', calculatePath)

    const timer = setTimeout(calculatePath, 300)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', calculatePath)
      clearTimeout(timer)
    }
  }, [])

  const scrollContainerRef = useRef(null)
  const [isOverLightBg, setIsOverLightBg] = useState(false)

  useEffect(() => {
    const container = scrollContainerRef.current

    let rafId = null
    const checkBackground = () => {
      const navY = 44 // Vertical sampling height for floating top bar pill

      // Only Skill Charms and Journey Map have light parchment backgrounds (#F5EFEB).
      // Hero, Selected Work, Workbench, Scrapbook, and Footer are all on dark/black backgrounds.
      const lightSections = document.querySelectorAll('.skill-charms-section, .about-journey-section')
      let overLight = false

      for (const sec of lightSections) {
        const rect = sec.getBoundingClientRect()
        if (rect.top <= navY && rect.bottom >= navY) {
          overLight = true
          break
        }
      }

      setIsOverLightBg(overLight)
    }

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(checkBackground)
    }

    if (container) {
      container.addEventListener('scroll', onScroll, { passive: true })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    checkBackground()
    const interval = setInterval(checkBackground, 200)

    return () => {
      if (container) container.removeEventListener('scroll', onScroll)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      clearInterval(interval)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="about-page-container" ref={scrollContainerRef}>
      {/* Sitewide TopBar: white on black background, dark on parchment background */}
      <TopBar isMainPage={true} variant={isOverLightBg ? 'dark' : 'white'} />

      <main role="main">
        {/* ==================================================================
            SECTION 1: THE PERSON BEHIND THE PIXELS
            ================================================================== */}
        <section className="about-hero-section" aria-label="The Person Behind the Pixels">
          <div className="about-hero-grid">
            {/* Left Column: Editorial Copy */}
            <div className="about-hero-left">
              <h1
                className="about-hero-headline"
                aria-label={HEADLINE_FULL}
                onClick={handleFastForwardHeadline}
                title={isTypingHeadline ? 'Click to show all' : undefined}
              >
                {/* Line 1: Creative with colored background badge and dynamic stroke */}
                <div className="about-headline-line about-headline-line--top">
                  <span className="about-highlight-creative">
                    <span className="about-highlight-content">
                      {headlineTypedCount <= HEADLINE_PART_1.length
                        ? HEADLINE_PART_1.slice(0, headlineTypedCount)
                        : HEADLINE_PART_1}
                    </span>
                    <svg className="about-creative-stroke" viewBox="0 0 100 36" preserveAspectRatio="none" aria-hidden="true">
                      <path d="M 4,5 Q 50,2 96,5 Q 98,18 96,31 Q 50,34 4,31 Q 2,18 4,5 Z" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {isTypingHeadline && headlineTypedCount <= HEADLINE_PART_1.length && (
                      <span className="about-typewriter-caret about-typewriter-caret--badge" aria-hidden="true" />
                    )}
                  </span>
                </div>

                {/* Line 2: Designer. Writer. Builder. */}
                <div className="about-headline-line about-headline-line--bottom">
                  <span className="about-headline-rest">
                    {headlineTypedCount > HEADLINE_PART_1.length
                      ? HEADLINE_PART_2.slice(0, headlineTypedCount - HEADLINE_PART_1.length)
                      : ''}
                    {isTypingHeadline && headlineTypedCount > HEADLINE_PART_1.length && (
                      <span className="about-typewriter-caret" aria-hidden="true" />
                    )}
                  </span>
                </div>
              </h1>

              <div className="about-hero-intro-group">
                <p className="about-hero-intro">
                  I’ve always been interested in what happens beneath the surface: the thought behind things, the reason one experience stays with you while another disappears the moment you leave, the strange little gap between what is intended and what another person actually experiences.
                </p>

                <p className="about-hero-intro">
                  Writing taught me to pay attention, design gave that attention somewhere to go, and now I work across words, interfaces and code to follow ideas from that first flicker of possibility to something another person can actually use.
                </p>
              </div>

              <div 
                ref={quoteRef}
                className="about-hero-paper-slip" 
                aria-label={QUOTE_TEXT}
                onClick={handleFastForwardHeadline}
                style={{ cursor: isQuoteDone ? 'default' : 'pointer' }}
                title={!isQuoteDone ? 'Click to show all' : undefined}
              >
                <span className="about-hero-paper-tape" aria-hidden="true" />
                <blockquote className="about-hero-paper-quote">
                  {quoteTypedCount > 0 ? (
                    <>
                      <span>{QUOTE_TEXT.slice(0, quoteTypedCount)}</span>
                      {!isQuoteDone && (
                        <span className="about-typewriter-caret about-typewriter-caret--quote" aria-hidden="true" />
                      )}
                    </>
                  ) : (
                    /* Starts out plain/empty, preserving layout height with 0 shift */
                    <span style={{ opacity: 0 }} aria-hidden="true">
                      {QUOTE_TEXT}
                    </span>
                  )}
                </blockquote>
              </div>

              <div className="about-hero-support-group">
                <p className="about-hero-support">
                  It’s a belief that follows me into the smallest decisions, including the ones nobody will ever notice consciously. I like knowing there was a reason something ended up exactly where it did.
                </p>
              </div>

              <div className="about-hero-cta-row">
                <a
                  href="#journey"
                  className="about-hero-scroll-btn"
                  onClick={handleScrollToJourney}
                  onMouseEnter={playHover}
                >
                  <span>More about me</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="12" y1="4" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column: Dolapo Dot Portrait Assembling Dots in Real Time */}
            <div className="about-hero-right">
              <DotPortrait
                src="/assets/dolapo-dot-portrait.webp"
                fallbackSrc="/assets/dolapo-dot-portrait.jpg"
                alt="Dolapo dot-art portrait"
                duration={2000}
              />
            </div>
          </div>
        </section>

        {/* ==================================================================
            SECTION 2: “I DON’T STOP AT THE DESIGNS” (SKILL CHARMS)
            ================================================================== */}
        <SkillCharmsSection />

        {/* ==================================================================
            SECTION 3: “SOME OF THE THINGS I’VE BUILT” / SELECTED WORK
            ================================================================== */}
        <SelectedWorkSection onSelectProject={setActiveCaseStudy} />

        {/* ==================================================================
            SECTION: “TOOLS ON MY WORKBENCH”
            ================================================================== */}
        <WorkbenchSection />

        {/* ==================================================================
            SECTION 4: THE JOURNEY MAP
            ================================================================== */}
        <section
          id="journey"
          ref={journeyRef}
          className="about-journey-section"
          aria-label="The Journey Map"
        >
          {/* Tactile Softly Curved Deckle Paper Edge Transition: Dark to Parchment */}
          <DeckleDivider type="top" fill="var(--about-parchment-bg)" />

          <div className="about-journey-inner">
            <header className="about-journey-header">
              <h2 className="about-journey-headline">
                <span>Not a <span className="about-highlight-journey">straight line</span>,</span>{' '}
                <span className="about-journey-headline-break">but a <span className="about-highlight-warm">good one</span>.</span>
              </h2>
            </header>

            {/* Desktop Timeline (Horizontal Winding Path passing through the images) */}
            <div className="about-journey-timeline-desktop" ref={desktopTimelineRef}>
              {/* Dynamic connector line threading directly through the milestone images */}
              <svg className="about-journey-svg-connector" fill="none" aria-hidden="true">
                <path
                  d={journeyPathD}
                  stroke="#C26143"
                  strokeWidth="3.5"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                  className="about-journey-desktop-path"
                />
              </svg>

              {MILESTONES.map((item, idx) => (
                <motion.article
                  key={idx}
                  className="about-journey-node-item"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* For odd milestones: Image on top, text on bottom */}
                  {idx % 2 === 0 ? (
                    <>
                      <div
                        className="about-milestone-polaroid"
                        ref={(el) => (polaroidRefs.current[idx] = el)}
                      >
                        <span className="about-milestone-tape" aria-hidden="true" />
                        <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
                      </div>

                      <div className="about-milestone-content">
                        <div className="about-milestone-number-title">
                          <span className="about-milestone-num">{item.num}.</span>
                          <span>{item.title}</span>
                        </div>
                        <p className="about-milestone-desc">{item.desc}</p>
                        <span className="about-milestone-annotation">{item.annotation}</span>
                      </div>
                    </>
                  ) : (
                    /* For even milestones: Text on top, image on bottom */
                    <>
                      <div className="about-milestone-content">
                        <div className="about-milestone-number-title">
                          <span className="about-milestone-num">{item.num}.</span>
                          <span>{item.title}</span>
                        </div>
                        <p className="about-milestone-desc">{item.desc}</p>
                        <span className="about-milestone-annotation">{item.annotation}</span>
                      </div>

                      <div
                        className="about-milestone-polaroid"
                        ref={(el) => (polaroidRefs.current[idx] = el)}
                      >
                        <span className="about-milestone-tape" aria-hidden="true" />
                        <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
                      </div>
                    </>
                  )}
                </motion.article>
              ))}
            </div>

            {/* Mobile Timeline (Curving, winding path dynamically connecting images, without dots) */}
            <div className="about-journey-timeline-mobile">
              <svg className="about-journey-mobile-wavy-path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <path
                  d="M 35 10 C 75 18, 75 22, 65 30 C 55 38, 25 42, 35 50 C 45 58, 75 62, 65 70 C 55 78, 50 82, 50 90"
                  fill="none"
                  stroke="#C26143"
                  strokeWidth="4"
                  strokeDasharray="8 8"
                  strokeLinecap="round"
                  className="about-journey-mobile-path"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {MILESTONES.map((item, idx) => (
                <motion.article
                  key={idx}
                  className={`about-mobile-step-card about-mobile-step-card--${idx % 2 === 0 ? 'left' : 'right'}`}
                  initial={{ opacity: 0, y: 38, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="about-mobile-step-tape" aria-hidden="true" />

                  <div className="about-mobile-step-img-box">
                    <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
                  </div>

                  <div className="about-mobile-step-title">
                    <span style={{ color: 'var(--about-copper)', fontFamily: 'var(--font-mono)' }}>{item.num}.</span>
                    <span>{item.title}</span>
                  </div>

                  <p className="about-mobile-step-desc">{item.desc}</p>
                  <span className="about-mobile-step-annotation">{item.annotation}</span>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Canonical Deckle Paper Edge Transition: Parchment Journey Map into Dark Beyond Section */}
          <DeckleDivider type="bottom" fill="var(--about-parchment-bg)" />
        </section>

        {/* ==================================================================
            CLIENT FEEDBACK & REVIEWS INBOX (Under divider, on black surface)
            ================================================================== */}
        <AboutReviewsInbox />

        {/* ==================================================================
            SECTION 5: BEYOND THE WORKSPACE
            ================================================================== */}
        <section className="about-beyond-section" aria-label="Beyond the workspace">
          <div className="about-beyond-inner">
            <header className="about-beyond-header">
              <h2 className="about-beyond-headline">
                Beyond the <span className="about-highlight-workspace">workspace</span>.
              </h2>
            </header>

            <div className="about-beyond-content">
              <Scrapbook />
            </div>

            {/* Closing Statement */}
            <footer className="about-closing-card">
              <h3 className="about-closing-title">
                <span className="about-closing-title-inner">
                  <span className="about-highlight-your-turn">Your turn.</span> What's on your mind?
                </span>
              </h3>
              <p className="about-closing-text">
                Bring the rough idea, the ambitious brief, or the problem you can't quite crack. We can figure out what it needs and build from there.
              </p>

              <svg className="about-closing-signature" width="120" height="34" viewBox="0 0 120 34" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M 10 24 C 30 10, 45 30, 65 15 C 80 5, 95 25, 115 18 M 55 26 Q 75 32 105 28" />
              </svg>

              {/* Realistic Colorful Bubbles for Social Media Links */}
              <SocialBubbles />
            </footer>
          </div>
        </section>

        {/* Editorial Light Case Study Modal for Selected Work */}
        {activeCaseStudy && (
          <AboutCaseStudyModal
            key={activeCaseStudy._mountId || activeCaseStudy.id}
            project={activeCaseStudy}
            onClose={() => setActiveCaseStudy(null)}
          />
        )}
      </main>

      {/* Sticky Mobile Action Bar: Fixed to bottom of screen on mobile */}
      <StickyMobileActionBar onNavigate={handleNavigate} />
    </div>
  )
}
