import React from 'react';
import useSoundEffects from '../hooks/useSoundEffects';
import '../styles/social-bubbles.css';

const SOCIAL_LINKS = [
  {
    id: 'x',
    name: 'X (Twitter)',
    handle: '@dsignwithdolapo',
    url: 'https://x.com/dsignwithdolapo',
    bubbleClass: 'social-bubble--x',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'dolapo-o',
    url: 'https://linkedin.com/in/dolapo-o',
    bubbleClass: 'social-bubble--linkedin',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.5a1.63 1.63 0 0 0-1.63 1.62c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.89-.73-1.62-1.63-1.62z" />
      </svg>
    )
  },
  {
    id: 'github',
    name: 'GitHub',
    handle: 'dfordolapo',
    url: 'https://github.com/dfordolapo',
    bubbleClass: 'social-bubble--github',
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    )
  },
  {
    id: 'email',
    name: 'Say Hello',
    handle: 'dfordolapo@gmail.com',
    url: 'mailto:dfordolapo@gmail.com?subject=Say%20Hello',
    bubbleClass: 'social-bubble--email',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    )
  }
];

export default function SocialBubbles() {
  const { playClick, playHover } = useSoundEffects();

  return (
    <div className="social-bubbles-wrapper" aria-label="Social media connections">
      <div className="social-bubbles-container">
        {SOCIAL_LINKS.map((item, idx) => (
          <a
            key={item.id}
            href={item.url}
            target={item.id === 'email' ? '_self' : '_blank'}
            rel={item.id === 'email' ? undefined : 'noopener noreferrer'}
            className={`social-bubble ${item.bubbleClass} social-bubble--float-${idx + 1}`}
            onClick={() => playClick()}
            onMouseEnter={playHover}
            aria-label={`${item.name} (${item.handle})`}
            title={`${item.name} · ${item.handle}`}
          >
            {/* Glossy Curved Highlight (Physical specular lens) */}
            <span className="social-bubble__highlight" aria-hidden="true" />
            
            {/* Core Icon */}
            <span className="social-bubble__icon" aria-hidden="true">
              {item.icon}
            </span>

            {/* Bottom Refraction Rim Glow */}
            <span className="social-bubble__rim" aria-hidden="true" />

            {/* Floating Tooltip Pill */}
            <span className="social-bubble__tooltip" role="tooltip">
              <span className="social-bubble__tooltip-name">{item.name}</span>
              <span className="social-bubble__tooltip-handle">{item.handle}</span>
            </span>
          </a>
        ))}
      </div>
      <span className="social-bubbles-subcaption">find me across the web</span>
    </div>
  );
}
