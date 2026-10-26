import React, { useRef, useState, useEffect } from 'react'
import TopBar from './TopBar'
import usePageSEO from '../hooks/usePageSEO'
import useSoundEffects from '../hooks/useSoundEffects'
import '../styles/about-creator.css'

const MILESTONES = [
  {
    num: '01',
    title: 'Words first',
    desc: 'Poetry, language, and storytelling shaped how I see the world.',
    annotation: 'The beginning. Words made me see the world differently.',
    image: '/assets/journey-01-words.webp',
    alt: 'Vintage notebook with handwritten poetry and fountain pen'
  },
  {
    num: '02',
    title: 'People next',
    desc: 'Understanding how people think, feel, and make decisions.',
    annotation: 'People have always been the center.',
    image: '/assets/journey-02-people.webp',
    alt: 'Historic city colonnade with pedestrians'
  },
  {
    num: '03',
    title: 'Design & words',
    desc: 'Crafting clear, thoughtful experiences.',
    annotation: 'Where it all started to click.',
    image: '/assets/journey-03-design.webp',
    alt: 'Design workspace with laptop wireframes and ceramic mug'
  },
  {
    num: '04',
    title: 'Build',
    desc: 'Learning to code and ship products.',
    annotation: 'Curiosity turned into capability.',
    image: '/assets/journey-04-build.webp',
    alt: 'Dark mode code editor and terminal workspace'
  },
  {
    num: '05',
    title: "What's next",
    desc: 'Bigger ideas. Better products. More impact.',
    annotation: 'Still so much to explore.',
    image: '/assets/journey-05-future.webp',
    alt: 'Airplane window overlooking glowing sunset horizon'
  }
]

const INTRO_BLOCKS = {
  headline: "Creative, Designer, Writer, Builder.",
  p1: "I’ve always been interested in what happens beneath the surface of things: the thought behind a sentence, the reason one experience stays with you while another disappears the moment you close it, the strange little gap between what someone intended and what another person actually experienced.",
  p2: "Writing taught me to pay attention; design gave that attention somewhere to go. Now I work across words, interfaces and code, following an idea from that first flicker of possibility to something another person can actually use.",
  quote: "“I care about the details because people feel them.”",
  p3: "It’s a belief that follows me into the smallest decisions, including the ones nobody will ever notice consciously. Especially those, perhaps. I like knowing there was a reason something ended up exactly where it did.",
  p4: "I suppose that’s part of what keeps me here: the chance to turn an observation into an idea, an idea into something tangible, and something tangible into a part of somebody’s everyday life."
}

export default function AboutCreator({ onBack }) {
  usePageSEO({
    title: "About Dolapo: The Person Behind the Pixels",
    description: "Creative, Designer, Writer, Builder. Learn how poetry, storytelling, product design, and building with code connect in Dolapo's Design Lab."
  })

  const { playClick, playHover } = useSoundEffects()
  const journeyRef = useRef(null)

  const [typedText, setTypedText] = useState({
    headline: '',
    p1: '',
    p2: '',
    quote: '',
    p3: '',
    p4: ''
  })
  const [activeField, setActiveField] = useState('headline')

  const handleFastForwardTyping = () => {
    if (activeField !== 'done') {
      setTypedText({
        headline: INTRO_BLOCKS.headline,
        p1: INTRO_BLOCKS.p1,
        p2: INTRO_BLOCKS.p2,
        quote: INTRO_BLOCKS.quote,
        p3: INTRO_BLOCKS.p3,
        p4: INTRO_BLOCKS.p4
      })
      setActiveField('done')
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setTypedText({
        headline: INTRO_BLOCKS.headline,
        p1: INTRO_BLOCKS.p1,
        p2: INTRO_BLOCKS.p2,
        quote: INTRO_BLOCKS.quote,
        p3: INTRO_BLOCKS.p3,
        p4: INTRO_BLOCKS.p4
      })
      setActiveField('done')
      return
    }

    let isCancelled = false
    let currentStepIdx = 0
    let currentCharIdx = 0
    let timerId = null

    const STEPS = [
      { key: 'headline', text: INTRO_BLOCKS.headline, speed: 10, chunk: 2, pause: 70 },
      { key: 'p1', text: INTRO_BLOCKS.p1, speed: 7, chunk: 3, pause: 60 },
      { key: 'p2', text: INTRO_BLOCKS.p2, speed: 7, chunk: 3, pause: 60 },
      { key: 'quote', text: INTRO_BLOCKS.quote, speed: 9, chunk: 2, pause: 60 },
      { key: 'p3', text: INTRO_BLOCKS.p3, speed: 7, chunk: 3, pause: 60 },
      { key: 'p4', text: INTRO_BLOCKS.p4, speed: 7, chunk: 3, pause: 100 }
    ]

    const typeNextChar = () => {
      if (isCancelled) return

      const currentStep = STEPS[currentStepIdx]
      if (!currentStep) {
        setActiveField('done')
        return
      }

      const chunkSize = currentStep.chunk || 1
      currentCharIdx = Math.min(currentCharIdx + chunkSize, currentStep.text.length)
      const currentSlice = currentStep.text.slice(0, currentCharIdx)

      setTypedText((prev) => ({
        ...prev,
        [currentStep.key]: currentSlice
      }))

      if (currentCharIdx < currentStep.text.length) {
        timerId = setTimeout(typeNextChar, currentStep.speed)
      } else {
        if (currentStepIdx < STEPS.length - 1) {
          currentStepIdx += 1
          currentCharIdx = 0
          setActiveField(STEPS[currentStepIdx].key)
          timerId = setTimeout(typeNextChar, currentStep.pause)
        } else {
          setActiveField('done')
        }
      }
    }

    timerId = setTimeout(() => {
      setActiveField(STEPS[0].key)
      typeNextChar()
    }, 120)

    return () => {
      isCancelled = true
      if (timerId) clearTimeout(timerId)
    }
  }, [])

  const handleScrollToJourney = (e) => {
    e.preventDefault()
    playClick()
    journeyRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="about-page-container">
      {/* Sitewide TopBar matching the rest of the application */}
      <TopBar onBack={onBack} title="" forceDark={true} />

      <main role="main">
        {/* ==================================================================
            SECTION 1: THE PERSON BEHIND THE PIXELS
            ================================================================== */}
        <section className="about-hero-section" aria-label="The Person Behind the Pixels">
          <div className="about-hero-grid">
            {/* Left Column: Editorial Copy */}
            <div 
              className="about-hero-left"
              onClick={handleFastForwardTyping}
              title={activeField !== 'done' ? 'Click to show all text' : undefined}
            >
              <h1 className="about-hero-headline" aria-label={INTRO_BLOCKS.headline}>
                <span>{typedText.headline}</span>
                {activeField === 'headline' && (
                  <span className="about-hero-typewriter-caret" aria-hidden="true" />
                )}
              </h1>

              <div className="about-hero-intro-group">
                <p className="about-hero-intro" aria-label={INTRO_BLOCKS.p1}>
                  <span>{typedText.p1}</span>
                  {activeField === 'p1' && (
                    <span className="about-hero-typewriter-caret" aria-hidden="true" />
                  )}
                </p>

                {(typedText.p2 || activeField === 'p2' || activeField === 'quote' || activeField === 'p3' || activeField === 'p4' || activeField === 'done') && (
                  <p className="about-hero-intro" aria-label={INTRO_BLOCKS.p2}>
                    <span>{typedText.p2}</span>
                    {activeField === 'p2' && (
                      <span className="about-hero-typewriter-caret" aria-hidden="true" />
                    )}
                  </p>
                )}
              </div>

              {(typedText.quote || activeField === 'quote' || activeField === 'p3' || activeField === 'p4' || activeField === 'done') && (
                <div className="about-hero-paper-slip" aria-label={INTRO_BLOCKS.quote}>
                  <span className="about-hero-paper-tape" aria-hidden="true" />
                  <blockquote className="about-hero-paper-quote">
                    <span>{typedText.quote}</span>
                    {activeField === 'quote' && (
                      <span className="about-hero-typewriter-caret" aria-hidden="true" />
                    )}
                  </blockquote>
                </div>
              )}

              {(typedText.p3 || activeField === 'p3' || activeField === 'p4' || activeField === 'done') && (
                <div className="about-hero-support-group">
                  <p className="about-hero-support" aria-label={INTRO_BLOCKS.p3}>
                    <span>{typedText.p3}</span>
                    {activeField === 'p3' && (
                      <span className="about-hero-typewriter-caret" aria-hidden="true" />
                    )}
                  </p>

                  {(typedText.p4 || activeField === 'p4' || activeField === 'done') && (
                    <p className="about-hero-support" aria-label={INTRO_BLOCKS.p4}>
                      <span>{typedText.p4}</span>
                      {activeField === 'p4' && (
                        <span className="about-hero-typewriter-caret" aria-hidden="true" />
                      )}
                    </p>
                  )}
                </div>
              )}

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

            {/* Right Column: Tactile Layered Moodboard */}
            <div className="about-hero-right">
              <div className="about-hero-moodboard-wrapper">
                <div className="about-hero-photo-frame">
                  <span className="about-hero-photo-tape" aria-hidden="true" />
                  <picture>
                    <source media="(max-width: 640px)" srcSet="/assets/about-mobile-portrait.webp" />
                    <img
                      src="/assets/about-desktop-portrait.webp"
                      alt="Dolapo Oyekanmi, Product Designer and Builder"
                      className="about-hero-portrait-img"
                      fetchpriority="high"
                      decoding="async"
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            SECTION 2: THE JOURNEY MAP
            ================================================================== */}
        <section
          id="journey"
          ref={journeyRef}
          className="about-journey-section"
          aria-label="The Journey Map"
        >
          {/* Tactile Square-ish Deckle Paper Edge Transition: Dark to Parchment */}
          <div className="about-paper-edge-top" aria-hidden="true">
            <svg viewBox="0 0 1440 24" preserveAspectRatio="none" fill="var(--about-parchment-bg)">
              <path d="M0,24 L0,12 L30,12 L30,6 L60,6 L60,14 L90,14 L90,8 L120,8 L120,15 L150,15 L150,9 L180,9 L180,14 L210,14 L210,7 L240,7 L240,13 L270,13 L270,8 L300,8 L300,15 L330,15 L330,10 L360,10 L360,16 L390,16 L390,9 L420,9 L420,14 L450,14 L450,7 L480,7 L480,13 L510,13 L510,8 L540,8 L540,15 L570,15 L570,10 L600,10 L600,16 L630,16 L630,9 L660,9 L660,14 L690,14 L690,7 L720,7 L720,13 L750,13 L750,8 L780,8 L780,15 L810,15 L810,10 L840,10 L840,16 L870,16 L870,9 L900,9 L900,14 L930,14 L930,7 L960,7 L960,13 L990,13 L990,8 L1020,8 L1020,15 L1050,15 L1050,10 L1080,10 L1080,16 L1110,16 L1110,9 L1140,9 L1140,14 L1170,14 L1170,7 L1200,7 L1200,13 L1230,13 L1230,8 L1260,8 L1260,15 L1290,15 L1290,10 L1320,10 L1320,16 L1350,16 L1350,9 L1380,9 L1380,14 L1410,14 L1410,7 L1440,7 L1440,24 Z" />
            </svg>
          </div>

          <div className="about-journey-inner">
            <header className="about-journey-header">
              <h2 className="about-journey-headline">
                Not a straight line, but a good one.
              </h2>
              <p className="about-journey-intro">
                From poetry to product design, UX writing, and building: here's how it all connects.
              </p>
            </header>

            {/* Desktop Timeline (Horizontal Winding Path) */}
            <div className="about-journey-timeline-desktop">
              {/* Curved SVG connector line across milestones */}
              <svg className="about-journey-svg-connector" viewBox="0 0 1000 60" fill="none" preserveAspectRatio="none" aria-hidden="true">
                <path
                  d="M 50 30 C 180 5, 220 55, 350 30 C 480 5, 520 55, 650 30 C 780 5, 820 55, 950 30"
                  stroke="#C26143"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                  className="about-journey-desktop-path"
                />
              </svg>

              {MILESTONES.map((item, idx) => (
                <article key={idx} className="about-journey-node-item">
                  {/* For odd milestones: Image on top, text on bottom */}
                  {idx % 2 === 0 ? (
                    <>
                      <div className="about-milestone-polaroid">
                        <span className="about-milestone-tape" aria-hidden="true" />
                        <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
                      </div>

                      <div className="about-milestone-dot-anchor" aria-hidden="true">
                        <div className="about-milestone-dot-inner" />
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

                      <div className="about-milestone-dot-anchor" aria-hidden="true">
                        <div className="about-milestone-dot-inner" />
                      </div>

                      <div className="about-milestone-polaroid">
                        <span className="about-milestone-tape" aria-hidden="true" />
                        <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
                      </div>
                    </>
                  )}
                </article>
              ))}
            </div>

            {/* Mobile Timeline (Curving, winding path that is visibly NOT a straight line) */}
            <div className="about-journey-timeline-mobile">
              <svg className="about-journey-mobile-wavy-path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <path
                  d="M 26,2 Q 86,12 74,25 T 26,50 T 74,75 T 50,98"
                  fill="none"
                  stroke="#C26143"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                  className="about-journey-mobile-path"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {MILESTONES.map((item, idx) => (
                <article key={idx} className={`about-mobile-step-card about-mobile-step-card--${idx % 2 === 0 ? 'left' : 'right'}`}>
                  <span className="about-mobile-step-tape" aria-hidden="true" />

                  <div className="about-mobile-step-dot" aria-hidden="true">
                    <div className="about-mobile-step-dot-inner" />
                  </div>

                  <div className="about-mobile-step-img-box">
                    <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
                  </div>

                  <div className="about-mobile-step-title">
                    <span style={{ color: 'var(--about-copper)', fontFamily: 'var(--font-mono)' }}>{item.num}.</span>
                    <span>{item.title}</span>
                  </div>

                  <p className="about-mobile-step-desc">{item.desc}</p>
                  <span className="about-mobile-step-annotation">{item.annotation}</span>
                </article>
              ))}
            </div>
          </div>

          {/* Tactile Square-ish Deckle Paper Edge Transition: Parchment to Dark */}
          <div className="about-paper-edge-bottom" aria-hidden="true">
            <svg viewBox="0 0 1440 24" preserveAspectRatio="none" fill="var(--about-parchment-bg)">
              <path d="M0,0 L0,12 L30,12 L30,18 L60,18 L60,10 L90,10 L90,16 L120,16 L120,9 L150,9 L150,15 L180,15 L180,10 L210,10 L210,17 L240,17 L240,11 L270,11 L270,16 L300,16 L300,9 L330,9 L330,14 L360,14 L360,8 L390,8 L390,15 L420,15 L420,10 L450,10 L450,17 L480,17 L480,11 L510,11 L510,16 L540,16 L540,9 L570,9 L570,14 L600,14 L600,8 L630,8 L630,15 L660,15 L660,10 L690,10 L690,17 L720,17 L720,11 L750,11 L750,16 L780,16 L780,9 L810,9 L810,14 L840,14 L840,8 L870,8 L870,15 L900,15 L900,10 L930,10 L930,17 L960,17 L960,11 L990,11 L990,16 L1020,16 L1020,9 L1050,9 L1050,14 L1080,14 L1080,8 L1110,8 L1110,15 L1140,15 L1140,10 L1170,10 L1170,17 L1200,17 L1200,11 L1230,11 L1230,16 L1260,16 L1260,9 L1290,9 L1290,14 L1320,14 L1320,8 L1350,8 L1350,15 L1380,15 L1380,10 L1410,10 L1410,17 L1440,17 L1440,0 Z" />
            </svg>
          </div>
        </section>

        {/* ==================================================================
            SECTION 3: BEYOND DESIGN
            ================================================================== */}
        <section className="about-beyond-section" aria-label="Beyond Design">
          <div className="about-beyond-inner">
            <div className="about-beyond-grid">
              {/* Left Column: Headline & Reflections */}
              <div className="about-beyond-left">
                <h2 className="about-beyond-headline">
                  The things that keep me inspired.
                </h2>
                <p className="about-beyond-support">
                  Movies, poetry, good food, travel dreams, late-night ideas, and a life that's still unfolding.
                </p>
                <div className="about-beyond-note-pill">
                  Same girl. More ideas.
                </div>
              </div>

              {/* Right Column: Layered Editorial Moodboard */}
              <div className="about-beyond-right">
                <div className="about-beyond-collage-card">
                  <picture>
                    <source media="(max-width: 640px)" srcSet="/assets/about-beyond-collage-mobile.webp" />
                    <img
                      src="/assets/about-beyond-collage-desktop.webp"
                      alt="Editorial studio moodboard featuring films, travel, pastries, film photography, and cozy inspiration"
                      className="about-beyond-collage-img"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>
              </div>
            </div>

            {/* Closing Statement & Lab Session CTA */}
            <footer className="about-closing-card">
              <h3 className="about-closing-title">
                <span>Always curious.</span>
                <span>Always creating.</span>
              </h3>
              <p className="about-closing-text">
                Whether it's a new product, a good story, or a place I've never been, I like exploring what's possible.
              </p>

              <button
                type="button"
                className="about-closing-cta-btn"
                onClick={() => handleNavigate('/book')}
                onMouseEnter={playHover}
              >
                <span>Book a Lab Session</span>
                <span aria-hidden="true">&rarr;</span>
              </button>

              <svg className="about-closing-signature" width="120" height="34" viewBox="0 0 120 34" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M 10 24 C 30 10, 45 30, 65 15 C 80 5, 95 25, 115 18 M 55 26 Q 75 32 105 28" />
              </svg>
            </footer>
          </div>
        </section>
      </main>
    </div>
  )
}
