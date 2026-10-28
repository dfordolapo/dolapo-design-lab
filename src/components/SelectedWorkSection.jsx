import React from 'react'
import { motion } from 'framer-motion'
import { CASE_STUDIES } from '../utils/caseStudies'
import DeckleDivider from './DeckleDivider'
import '../styles/selected-work-section.css'

// Top 3 Flagship Projects from caseStudies.jsx sized to fit in one viewport
const SELECTED_PROJECT_IDS = [
  {
    id: 'designer-2',
    num: '01',
    name: 'Awwja',
    tag: 'NEGOTIATION MACHINE',
    desc: 'An interactive negotiation machine and structured workflow designed to make buyer-seller transactions clear, effortless, and error-tolerant.',
    colorClass: 'folder--yellow',
    rotation: '-1deg',
    arrowType: 'curve-up'
  },
  {
    id: 'designer-3',
    num: '02',
    name: 'Vurdict',
    tag: 'AI PORTFOLIO REVIEWER',
    desc: 'An intelligent portfolio critique and heuristic review platform engineered to give designers and builders instant, actionable feedback.',
    colorClass: 'folder--purple',
    rotation: '1deg',
    arrowType: 'curve-down'
  },
  {
    id: 'designer-4',
    num: '03',
    name: 'NailExpress',
    tag: 'LUXURY PRESS-ON ATELIER',
    desc: 'A bespoke e-commerce experience designed and engineered for a modern luxury nail atelier, making sizing, discovery, and ordering seamless.',
    colorClass: 'folder--green',
    rotation: '-0.7deg',
    arrowType: 'curve-up'
  }
]

export default function SelectedWorkSection({ onSelectProject }) {
  const handleOpenCaseStudy = (projectId, e) => {
    e.preventDefault()
    const found = CASE_STUDIES.find(cs => cs.id === projectId)
    if (found && onSelectProject) {
      onSelectProject(found)
    } else {
      window.location.hash = `#${projectId}`
    }
  }

  return (
    <section className="selected-work-section" aria-label="Some of the things I've built">
      {/* Canonical Deckle Paper Edge Transition: Parchment Section 2 into Dark Section 3 */}
      <DeckleDivider type="top" fill="#000000" />

      <div className="selected-work-container">

        {/* Heading in Modak font: Strictly Black and White Only */}
        <header className="selected-work-header">
          <div className="selected-work-strip-top">
            <span className="selected-work-title-text">Some of the</span>
          </div>
          <div className="selected-work-strip-bottom">
            <span className="selected-work-title-text">things I've built.</span>
          </div>
        </header>

        {/* Stacked Project Folder Cards (Fits in One Viewport) */}
        <div className="selected-work-folders-stack" role="list">
          {SELECTED_PROJECT_IDS.map((item, idx) => {
            const caseStudy = CASE_STUDIES.find(cs => cs.id === item.id)
            const title = caseStudy?.title || item.name
            const desc = caseStudy?.goal || item.desc

            return (
              <motion.article
                key={item.id}
                className={`project-folder-card ${item.colorClass}`}
                style={{ '--folder-rot': item.rotation }}
                role="listitem"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{
                  y: -5,
                  scale: 1.015,
                  zIndex: 15,
                  transition: { duration: 0.2 }
                }}
                onClick={(e) => handleOpenCaseStudy(item.id, e)}
              >
                {/* Folder Silhouette Tab */}
                <div className="project-folder-tab" aria-hidden="true" />

                <div className="project-folder-body">
                  {/* Left Column: Number, Title, Description */}
                  <div className="project-folder-info">
                    <div className="project-folder-num-wrap">
                      <span className="project-folder-num">{item.num}</span>
                      <span className="project-folder-num-line" aria-hidden="true" />
                    </div>

                    <h3 className="project-folder-title">{title}</h3>
                    <p className="project-folder-desc">{desc}</p>
                  </div>

                  {/* Right Column: Playful Hand-drawn Arrow + Circular Action Button */}
                  <div className="project-folder-action">
                    <svg
                      className={`project-folder-arrow project-folder-arrow--${item.arrowType}`}
                      viewBox="0 0 100 45"
                      fill="none"
                      aria-hidden="true"
                    >
                      {item.arrowType === 'curve-up' ? (
                        <path
                          d="M 5,35 Q 45,5 82,24 M 72,14 L 84,24 L 75,34"
                          stroke="#08060D"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      ) : (
                        <path
                          d="M 5,10 Q 40,40 82,20 M 73,12 L 84,21 L 74,32"
                          stroke="#08060D"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}
                    </svg>

                    <button
                      type="button"
                      className="project-folder-btn"
                      aria-label={`View ${title} case study`}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenCaseStudy(item.id, e)
                      }}
                    >
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

      </div>
    </section>
  )
}
