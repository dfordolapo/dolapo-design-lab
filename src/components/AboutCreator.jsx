import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import TopBar from './TopBar'
import Scrapbook from './Scrapbook'
import usePageSEO from '../hooks/usePageSEO'
import useSoundEffects from '../hooks/useSoundEffects'
import '../styles/about-creator.css'

const MILESTONES = [
  {
    num: '01',
    title: 'Words first',
    desc: 'Poetry, language, and storytelling shaped how I see the world.',
    annotation: 'The beginning. Words made me see the world differently.',
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
    alt: 'Atmospheric late-night coding setup overlooking the illuminated Lekki bridge in Lagos'
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
      { key: 'headline', text: INTRO_BLOCKS.headline, speed: 4, chunk: 4, pause: 25 },
      { key: 'p1', text: INTRO_BLOCKS.p1, speed: 3, chunk: 6, pause: 20 },
      { key: 'p2', text: INTRO_BLOCKS.p2, speed: 3, chunk: 6, pause: 20 },
      { key: 'quote', text: INTRO_BLOCKS.quote, speed: 3, chunk: 4, pause: 20 },
      { key: 'p3', text: INTRO_BLOCKS.p3, speed: 3, chunk: 6, pause: 20 },
      { key: 'p4', text: INTRO_BLOCKS.p4, speed: 3, chunk: 6, pause: 35 }
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
                    <source media="(max-width: 640px)" srcSet="/assets/about-me.png" />
                    <img
                      src="/assets/about-me.png"
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
          {/* Tactile Softly Curved Deckle Paper Edge Transition: Dark to Parchment */}
          <div className="about-paper-edge-top" aria-hidden="true">
            <svg viewBox="0 0 1440 40" preserveAspectRatio="none" fill="var(--about-parchment-bg)">
              <path d="M0,40 L0,28 L26.5,28 Q30,28 30,24.5 L30,7.5 Q30,4 33.5,4 L56.5,4 Q60,4 60,7.5 L60,27.5 Q60,31 63.5,31 L86.5,31 Q90,31 90,27.5 L90,9.5 Q90,6 93.5,6 L116.5,6 Q120,6 120,9.5 L120,29.5 Q120,33 123.5,33 L146.5,33 Q150,33 150,29.5 L150,9.5 Q150,6 153.5,6 L176.5,6 Q180,6 180,9.5 L180,27.5 Q180,31 183.5,31 L206.5,31 Q210,31 210,27.5 L210,8.5 Q210,5 213.5,5 L236.5,5 Q240,5 240,8.5 L240,26.5 Q240,30 243.5,30 L266.5,30 Q270,30 270,26.5 L270,9.5 Q270,6 273.5,6 L296.5,6 Q300,6 300,9.5 L300,29.5 Q300,33 303.5,33 L326.5,33 Q330,33 330,29.5 L330,10.5 Q330,7 333.5,7 L356.5,7 Q360,7 360,10.5 L360,30.5 Q360,34 363.5,34 L386.5,34 Q390,34 390,30.5 L390,9.5 Q390,6 393.5,6 L416.5,6 Q420,6 420,9.5 L420,27.5 Q420,31 423.5,31 L446.5,31 Q450,31 450,27.5 L450,8.5 Q450,5 453.5,5 L476.5,5 Q480,5 480,8.5 L480,26.5 Q480,30 483.5,30 L506.5,30 Q510,30 510,26.5 L510,9.5 Q510,6 513.5,6 L536.5,6 Q540,6 540,9.5 L540,29.5 Q540,33 543.5,33 L566.5,33 Q570,33 570,29.5 L570,10.5 Q570,7 573.5,7 L596.5,7 Q600,7 600,10.5 L600,30.5 Q600,34 603.5,34 L626.5,34 Q630,34 630,30.5 L630,9.5 Q630,6 633.5,6 L656.5,6 Q660,6 660,9.5 L660,27.5 Q660,31 663.5,31 L686.5,31 Q690,31 690,27.5 L690,8.5 Q690,5 693.5,5 L716.5,5 Q720,5 720,8.5 L720,26.5 Q720,30 723.5,30 L746.5,30 Q750,30 750,26.5 L750,9.5 Q750,6 753.5,6 L776.5,6 Q780,6 780,9.5 L780,29.5 Q780,33 783.5,33 L806.5,33 Q810,33 810,29.5 L810,9.5 Q810,6 813.5,6 L836.5,6 Q840,6 840,9.5 L840,27.5 Q840,31 843.5,31 L866.5,31 Q870,31 870,27.5 L870,8.5 Q870,5 873.5,5 L896.5,5 Q900,5 900,8.5 L900,26.5 Q900,30 903.5,30 L926.5,30 Q930,30 930,26.5 L930,9.5 Q930,6 933.5,6 L956.5,6 Q960,6 960,9.5 L960,29.5 Q960,33 963.5,33 L986.5,33 Q990,33 990,29.5 L990,10.5 Q990,7 993.5,7 L1016.5,7 Q1020,7 1020,10.5 L1020,30.5 Q1020,34 1023.5,34 L1046.5,34 Q1050,34 1050,30.5 L1050,9.5 Q1050,6 1053.5,6 L1076.5,6 Q1080,6 1080,9.5 L1080,27.5 Q1080,31 1083.5,31 L1106.5,31 Q1110,31 1110,27.5 L1110,8.5 Q1110,5 1113.5,5 L1136.5,5 Q1140,5 1140,8.5 L1140,26.5 Q1140,30 1143.5,30 L1166.5,30 Q1170,30 1170,26.5 L1170,9.5 Q1170,6 1173.5,6 L1196.5,6 Q1200,6 1200,9.5 L1200,29.5 Q1200,33 1203.5,33 L1226.5,33 Q1230,33 1230,29.5 L1230,10.5 Q1230,7 1233.5,7 L1256.5,7 Q1260,7 1260,10.5 L1260,30.5 Q1260,34 1263.5,34 L1286.5,34 Q1290,34 1290,30.5 L1290,9.5 Q1290,6 1293.5,6 L1316.5,6 Q1320,6 1320,9.5 L1320,27.5 Q1320,31 1323.5,31 L1346.5,31 Q1350,31 1350,27.5 L1350,8.5 Q1350,5 1353.5,5 L1376.5,5 Q1380,5 1380,8.5 L1380,26.5 Q1380,30 1383.5,30 L1406.5,30 Q1410,30 1410,26.5 L1410,9.5 Q1410,6 1413.5,6 L1440,6 L1440,40 Z" />
            </svg>
          </div>

          <div className="about-journey-inner">
            <header className="about-journey-header">
              <h2 className="about-journey-headline">
                <span>Not a <span className="about-highlight-journey">straight line</span>,</span>{' '}
                <span className="about-journey-headline-break">but a <span className="about-highlight-warm">good one</span>.</span>
              </h2>
              <p className="about-journey-intro">
                From poetry to product design, UX writing, and building: here's how it all connects.
              </p>
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

          {/* Tactile Softly Curved Deckle Paper Edge Transition: Parchment to Dark */}
          <div className="about-paper-edge-bottom" aria-hidden="true">
            <svg viewBox="0 0 1440 40" preserveAspectRatio="none" fill="var(--about-parchment-bg)">
              <path d="M0,0 L0,6 L26.5,6 Q30,6 30,9.5 L30,32.5 Q30,36 33.5,36 L56.5,36 Q60,36 60,32.5 L60,8.5 Q60,5 63.5,5 L86.5,5 Q90,5 90,8.5 L90,28.5 Q90,32 93.5,32 L116.5,32 Q120,32 120,28.5 L120,8.5 Q120,5 123.5,5 L146.5,5 Q150,5 150,8.5 L150,26.5 Q150,30 153.5,30 L176.5,30 Q180,30 180,26.5 L180,8.5 Q180,5 183.5,5 L206.5,5 Q210,5 210,8.5 L210,30.5 Q210,34 213.5,34 L236.5,34 Q240,34 240,30.5 L240,9.5 Q240,6 243.5,6 L266.5,6 Q270,6 270,9.5 L270,28.5 Q270,32 273.5,32 L296.5,32 Q300,32 300,28.5 L300,8.5 Q300,5 303.5,5 L326.5,5 Q330,5 330,8.5 L330,24.5 Q330,28 333.5,28 L356.5,28 Q360,28 360,24.5 L360,7.5 Q360,4 363.5,4 L386.5,4 Q390,4 390,7.5 L390,26.5 Q390,30 393.5,30 L416.5,30 Q420,30 420,26.5 L420,8.5 Q420,5 423.5,5 L446.5,5 Q450,5 450,8.5 L450,30.5 Q450,34 453.5,34 L476.5,34 Q480,34 480,30.5 L480,9.5 Q480,6 483.5,6 L506.5,6 Q510,6 510,9.5 L510,28.5 Q510,32 513.5,32 L536.5,32 Q540,32 540,28.5 L540,8.5 Q540,5 543.5,5 L566.5,5 Q570,5 570,8.5 L570,24.5 Q570,28 573.5,28 L596.5,28 Q600,28 600,24.5 L600,7.5 Q600,4 603.5,4 L626.5,4 Q630,4 630,7.5 L630,26.5 Q630,30 633.5,30 L656.5,30 Q660,30 660,26.5 L660,8.5 Q660,5 663.5,5 L686.5,5 Q690,5 690,8.5 L690,30.5 Q690,34 693.5,34 L716.5,34 Q720,34 720,30.5 L720,9.5 Q720,6 723.5,6 L746.5,6 Q750,6 750,9.5 L750,28.5 Q750,32 753.5,32 L776.5,32 Q780,32 780,28.5 L780,8.5 Q780,5 783.5,5 L806.5,5 Q810,5 810,8.5 L810,24.5 Q810,28 813.5,28 L836.5,28 Q840,28 840,24.5 L840,7.5 Q840,4 843.5,4 L866.5,4 Q870,4 870,7.5 L870,26.5 Q870,30 873.5,30 L896.5,30 Q900,30 900,26.5 L900,8.5 Q900,5 903.5,5 L926.5,5 Q930,5 930,8.5 L930,30.5 Q930,34 933.5,34 L956.5,34 Q960,34 960,30.5 L960,9.5 Q960,6 963.5,6 L986.5,6 Q990,6 990,9.5 L990,28.5 Q990,32 993.5,32 L1016.5,32 Q1020,32 1020,28.5 L1020,8.5 Q1020,5 1023.5,5 L1046.5,5 Q1050,5 1050,8.5 L1050,24.5 Q1050,28 1053.5,28 L1076.5,28 Q1080,28 1080,24.5 L1080,7.5 Q1080,4 1083.5,4 L1106.5,4 Q1110,4 1110,7.5 L1110,26.5 Q1110,30 1113.5,30 L1136.5,30 Q1140,30 1140,26.5 L1140,8.5 Q1140,5 1143.5,5 L1166.5,5 Q1170,5 1170,8.5 L1170,30.5 Q1170,34 1173.5,34 L1196.5,34 Q1200,34 1200,30.5 L1200,9.5 Q1200,6 1203.5,6 L1226.5,6 Q1230,6 1230,9.5 L1230,28.5 Q1230,32 1233.5,32 L1256.5,32 Q1260,32 1260,28.5 L1260,8.5 Q1260,5 1263.5,5 L1286.5,5 Q1290,5 1290,8.5 L1290,24.5 Q1290,28 1293.5,28 L1316.5,28 Q1320,28 1320,24.5 L1320,7.5 Q1320,4 1323.5,4 L1346.5,4 Q1350,4 1350,7.5 L1350,26.5 Q1350,30 1353.5,30 L1376.5,30 Q1380,30 1380,26.5 L1380,8.5 Q1380,5 1383.5,5 L1406.5,5 Q1410,5 1410,8.5 L1410,30.5 Q1410,34 1413.5,34 L1440,34 L1440,0 Z" />
            </svg>
          </div>
        </section>

        {/* ==================================================================
            SECTION 3: THE THINGS THAT KEEP ME INSPIRED
            ================================================================== */}
        <section className="about-beyond-section" aria-label="The Things That Keep Me Inspired">
          <div className="about-beyond-inner">
            <div className="about-beyond-grid">
              {/* Left Column: Headline & Reflections */}
              <div className="about-beyond-left">
                <h2 className="about-beyond-headline">
                  The things that <span className="about-highlight-gold">keep me inspired</span>.
                </h2>
                <p className="about-beyond-support">
                  Movies, poetry, good food, travel dreams, late-night ideas, and a life that's still unfolding.
                </p>
              </div>

              {/* Right Column: Interactive Draggable Scrapbook */}
              <div className="about-beyond-right">
                <Scrapbook />
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
