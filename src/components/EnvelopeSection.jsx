import React, { useState } from 'react'
import { motion } from 'framer-motion'
import DeckleDivider from './DeckleDivider'
import '../styles/envelope-section.css'

// 8 Compact Photorealistic Rumpled Post-It Notes arranged like an authentic human brainstorming session
const THINKING_NOTES = [
  {
    id: 'ux-research',
    title: 'UX Research',
    desc: 'Understand the problem.',
    colorClass: 'rumpled-note--yellow',
    rotation: '-8deg',
    hasTape: true,
    tapeAngle: '-3deg',
    texturePos: '15% 20%'
  },
  {
    id: 'ui-design',
    title: 'UI Design',
    desc: 'Design the experience.',
    colorClass: 'rumpled-note--purple',
    rotation: '7deg',
    hasTape: false,
    tapeAngle: '2deg',
    texturePos: '75% 80%'
  },
  {
    id: 'code-dev',
    title: 'Code Development',
    desc: 'Bring it to life.',
    colorClass: 'rumpled-note--pink',
    rotation: '-5deg',
    hasTape: true,
    tapeAngle: '3.5deg',
    texturePos: '40% 15%'
  },
  {
    id: 'database',
    title: 'Database',
    desc: 'Make the data work.',
    colorClass: 'rumpled-note--green',
    rotation: '9deg',
    hasTape: false,
    tapeAngle: '-2deg',
    texturePos: '85% 35%'
  },
  {
    id: 'admin-tools',
    title: 'Admin Tools',
    desc: 'Support the people.',
    colorClass: 'rumpled-note--cream',
    rotation: '-7deg',
    hasTape: true,
    tapeAngle: '-1.5deg',
    texturePos: '25% 75%'
  },
  {
    id: 'email-systems',
    title: 'Email Systems',
    desc: 'Connect communications.',
    colorClass: 'rumpled-note--blue',
    rotation: '5deg',
    hasTape: false,
    tapeAngle: '-3deg',
    texturePos: '60% 50%'
  },
  {
    id: 'seo',
    title: 'Google Search / SEO',
    desc: 'Make it discoverable.',
    colorClass: 'rumpled-note--lavender',
    rotation: '-9deg',
    hasTape: true,
    tapeAngle: '2.5deg',
    texturePos: '10% 90%'
  },
  {
    id: 'live-product',
    title: 'Live Product',
    desc: 'Ship the whole experience.',
    colorClass: 'rumpled-note--coral',
    rotation: '8deg',
    hasTape: false,
    tapeAngle: '1.5deg',
    texturePos: '80% 10%'
  }
]

export default function EnvelopeSection() {
  const [activeNoteId, setActiveNoteId] = useState(null)

  const handleNoteClick = (id) => {
    setActiveNoteId(prev => (prev === id ? null : id))
  }

  return (
    <section className="envelope-section whiteboard-session-section" aria-label="I don't stop at the designs">
      {/* Top Deckle Paper Edge: Transitions Dark Section 1 into Parchment Section 2 */}
      <DeckleDivider type="top" fill="var(--about-parchment-bg)" />

      <div className="whiteboard-session-container">
        {/* Playful Modak Headline Positioned High (No Subtitles) */}
        <header className="whiteboard-header">
          <div className="whiteboard-title-group">
            <div className="envelope-strip-white">
              <span className="envelope-headline-text">I don't stop</span>
            </div>
            <div className="envelope-strip-yellow">
              <span className="envelope-headline-text">at the designs.</span>
            </div>
          </div>
        </header>

        {/* Human Thinking Whiteboard Canvas: Truly Unaligned Rumpled Paper Sticky Notes */}
        <div className="whiteboard-canvas" role="list">
          {THINKING_NOTES.map((note, index) => {
            const isSelected = activeNoteId === note.id

            return (
              <motion.article
                key={note.id}
                role="listitem"
                className={`rumpled-sticky-note ${note.colorClass} note-scatter-${index + 1} ${isSelected ? 'is-note-selected' : ''}`}
                style={{
                  '--note-rot': note.rotation,
                  '--tape-rot': note.tapeAngle,
                  '--texture-pos': note.texturePos
                }}
                onClick={() => handleNoteClick(note.id)}
                whileHover={{
                  scale: 1.06,
                  rotate: 0,
                  zIndex: 25,
                  transition: { type: 'spring', stiffness: 450, damping: 22 }
                }}
                whileTap={{
                  scale: 0.97,
                  transition: { duration: 0.1 }
                }}
                animate={
                  isSelected
                    ? { scale: 1.08, rotate: 0, zIndex: 30 }
                    : { scale: 1, zIndex: index + 1 }
                }
                transition={{
                  type: 'spring',
                  stiffness: 380,
                  damping: 24
                }}
                title={note.title}
              >
                {/* Translucent rumpled washi tape on select notes */}
                {note.hasTape && (
                  <span className="rumpled-tape-strip" aria-hidden="true" />
                )}

                {/* Secondary crumpled paper texture highlight overlay */}
                <div className="rumpled-paper-overlay" aria-hidden="true" />

                {/* Felt-Tip Pen Typography */}
                <div className="rumpled-note-content">
                  <h3 className="rumpled-note-title">{note.title}</h3>
                  <p className="rumpled-note-desc">{note.desc}</p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
