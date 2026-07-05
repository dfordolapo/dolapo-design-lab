import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import TopBar from './TopBar'
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal'
import '../styles/about-creator.css'

const TOOLS = [
  { name: "Antigravity", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><path d="M12 22V2M12 2l-7 7M12 2l7 7" /><path d="M5 22h14" /></svg> },
  { name: "OpenCode", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg> },
  { name: "Google Docs", icon: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M14.727 6.727H14V0H4.91c-.905 0-1.637.732-1.637 1.636v20.728c0 .904.732 1.636 1.636 1.636h14.182c.904 0 1.636-.732 1.636-1.636V6.727h-6zm-.545 10.455H7.09v-1.364h7.09v1.364zm2.727-3.273H7.091v-1.364h9.818v1.364zm0-3.273H7.091V9.273h9.818v1.363zM14.727 6h6l-6-6v6z"/></svg> },
  { name: "Figma", icon: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z"/></svg> },
  { name: "Claude", icon: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"/></svg> },
  { name: "Gemini", icon: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"/></svg> },
  { name: "Antigravity", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><path d="M12 22V2M12 2l-7 7M12 2l7 7" /><path d="M5 22h14" /></svg> },
  { name: "OpenCode", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg> },
  { name: "Google Docs", icon: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M14.727 6.727H14V0H4.91c-.905 0-1.637.732-1.637 1.636v20.728c0 .904.732 1.636 1.636 1.636h14.182c.904 0 1.636-.732 1.636-1.636V6.727h-6zm-.545 10.455H7.09v-1.364h7.09v1.364zm2.727-3.273H7.091v-1.364h9.818v1.364zm0-3.273H7.091V9.273h9.818v1.363zM14.727 6h6l-6-6v6z"/></svg> }
]

export default function AboutCreator({ onBack }) {
  const [activeTab, setActiveTab] = useState('bio')

  const displayTools = window.innerWidth <= 768 
    ? [TOOLS[0], TOOLS[3], TOOLS[1], TOOLS[2], ...TOOLS.slice(4)] 
    : TOOLS;

  return (
    <div className="about-page">
      <TopBar onBack={onBack} title="DOLAPO'S DESIGN LAB" />
      <div className="about-page__bg-glow"></div>
      
      <div className="about-content-scroll">
        <div className="about-mascot-container">
          <img src="/assets/designer.png" alt="Dolapo Mascot" className="about-mascot" />
        </div>

        <div className="about-tab-container">
          <div className="about-tab-header">
            <button 
              className={`about-tab-button ${activeTab === 'bio' ? 'active' : ''}`}
              onClick={() => setActiveTab('bio')}
            >
              BIO
            </button>
            <button 
              className={`about-tab-button ${activeTab === 'manifest' ? 'active' : ''}`}
              onClick={() => setActiveTab('manifest')}
            >
              LAB EQUIPMENTS
            </button>
            <div 
              className="about-tab-indicator" 
              style={{
                left: activeTab === 'bio' ? '0%' : '50%',
                width: '50%'
              }}
            ></div>
          </div>

          <div className="about-tab-content">
            {activeTab === 'bio' ? (
              <>
                <ScrollReveal variant="fadeUp">
                  <div className="bio-section">
                    <span className="bio-section__title">So... who built the lab?</span>
                    <p className="bio-section__text">
                      Every product starts as a thought. A messy idea. A "what if?" A problem waiting for someone to notice it.<br/><br/>
                      That's where I come in.<br/><br/>
                      I'm Dolapo. I design digital products, write their conversations, and obsess over the tiny details that make them actually fun to use.<br/><br/>
                      Instead of a traditional portfolio, I built this lab to feel more like my actual workspace, a place where messy ideas get refined, tested, and turned into something real. Take a look around.
                    </p>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal variant="fadeUp" delay={0.15}>
                  <div className="bio-section">
                    <span className="bio-section__title">My three departments</span>
                    <StaggerContainer className="bio-card-container">
                      {['Product Design', 'UX Writing', 'Product Design + Full-stack Dev'].map((title, i) => (
                        <StaggerItem key={i}>
                          <div className="bio-card" data-cursor-hover>
                            <span className="bio-card__title">{title}</span>
                            <span className="bio-card__desc">
                              {i === 0 ? 'Turning problems into experiences people can use.' :
                               i === 1 ? 'Helping products speak clearly without sounding like a manual.' :
                               'Taking ideas from a blank canvas to something real.'}
                            </span>
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal variant="fadeUp" delay={0.3}>
                  <div className="bio-section" style={{ alignItems: 'center' }}>
                    <span className="bio-section__title">Find me on</span>
                    <div className="social-links">
                      <a href="https://www.x.com/dolapodesigns" className="social-link" target="_blank" rel="noopener noreferrer">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        <span>Twitter</span>
                      </a>
                      <a href="https://www.linkedin.com/in/dolapo-o" className="social-link" target="_blank" rel="noopener noreferrer">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        <span>LinkedIn</span>
                      </a>
                      <a href="https://instagram.com/dolapodesigns" className="social-link" target="_blank" rel="noopener noreferrer">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        <span>Instagram</span>
                      </a>
                      <a href="https://dfordolapo.medium.com" className="social-link" target="_blank" rel="noopener noreferrer">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>
                        <span>Medium</span>
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal variant="fadeUp" delay={0.4}>
                  <div className="about-footer">
                    <strong>The lab is open.</strong>
                  </div>
                </ScrollReveal>
              </>
            ) : (
              <>
                <ScrollReveal variant="fadeIn">
                  <div className="manifest-section">
                    {[
                      { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 1.5.5 2.9 1.3 4.1.2.3.3.6.3 1v3.8c0 .6.4 1.1 1 1.1h10.8c.6 0 1-.5 1-1.1V15c0-.4.1-.7.3-1 .8-1.2 1.3-2.6 1.3-4.1 0-4.4-3.6-8-8-8Z"/><path d="M9 22h6"/><path d="M9 18h6"/></svg>, title: 'Product Strategy & Architecture', badges: ['Product thinking & discovery', 'User flow architecture', 'Brand direction & strategy', 'End-to-end product lifecycle'] },
                      { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, title: 'UX Writing & Content Design', badges: ['UX microcopy & interface language', 'Content strategy & audits', 'Product voice & narrative'] },
                      { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>, title: 'Interactive Engineering', badges: ['Front-end development', 'Interactive experiences', 'Web experiences & PWA builds', 'AI-assisted workflows'] },
                    ].map((cat, i) => (
                      <ScrollReveal key={i} variant="fadeLeft" delay={i * 0.1}>
                        <div className="manifest-category">
                          <div className="manifest-category__header">
                            <span className="manifest-category__icon">{cat.icon}</span>
                            {cat.title}
                          </div>
                          <div className="manifest-badges">
                            {cat.badges.map((badge, j) => (
                              <div key={j} className="manifest-badge">{badge}</div>
                            ))}
                          </div>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </ScrollReveal>
              </>
            )}
          </div>
          
          {activeTab === 'manifest' && (
            <div className="tech-stack-container">
              <div className="tech-stack-carousel">
                {[...Array(6)].map((_, groupIdx) => (
                  <div key={groupIdx} className="tech-stack-track" aria-hidden={groupIdx > 0}>
                    {displayTools.map((tool, idx) => (
                      <div key={`${groupIdx}-${idx}`} className="tech-stack-item">
                        <div className="tech-stack-icon">{tool.icon}</div>
                        <span className="tech-stack-name">{tool.name}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
