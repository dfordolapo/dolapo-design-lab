import React from 'react';
import useSoundEffects from '../hooks/useSoundEffects';
import '../styles/social-bubbles.css';

const LANDMARK_SIGNS = [
  {
    id: 'x',
    name: 'X (Twitter)',
    direction: 'right',
    url: 'https://x.com/dsignwithdolapo',
    signClass: 'landmark-sign-arm--x',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    direction: 'left',
    url: 'https://linkedin.com/in/dolapo-o',
    signClass: 'landmark-sign-arm--linkedin',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.5a1.63 1.63 0 0 0-1.63 1.62c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.89-.73-1.62-1.63-1.62z" />
      </svg>
    )
  },
  {
    id: 'github',
    name: 'GitHub',
    direction: 'right',
    url: 'https://github.com/dfordolapo',
    signClass: 'landmark-sign-arm--github',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    )
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    direction: 'left',
    url: 'https://wa.me/2348187902241',
    signClass: 'landmark-sign-arm--whatsapp',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 1.67c2.2 0 4.26.86 5.82 2.42a8.17 8.17 0 012.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.46 0-2.88-.39-4.14-1.13l-.3-.18-3.12.82.83-3.04-.2-.31a8.17 8.17 0 01-1.26-4.4c0-4.54 3.7-8.24 8.24-8.24zm4.78 11.66c-.2-.1-.79-.39-1.04-.51-.25-.12-.43-.18-.61.12-.18.3-.7 1.04-.86 1.26-.16.22-.32.25-.52.15-.2-.1-.85-.31-1.62-1-.6-.53-1-1.19-1.12-1.39-.12-.2-.01-.31.09-.41.09-.09.2-.23.3-.35.1-.12.13-.2.2-.33.07-.13.03-.25-.02-.35-.05-.1-.61-1.47-.84-2.02-.22-.53-.45-.46-.62-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.35-.26.28-1 .98-1 2.39 0 1.41 1.03 2.78 1.17 2.97.14.19 2.03 3.1 4.92 4.35.69.3 1.22.48 1.64.61.69.22 1.32.19 1.82.12.56-.08 1.72-.7 1.96-1.38.24-.67.24-1.25.17-1.37-.07-.12-.25-.2-.45-.3z" />
      </svg>
    )
  },

  {
    id: 'email',
    name: 'Say Hello',
    direction: 'left',
    url: 'mailto:dfordolapo@gmail.com?subject=Say%20Hello',
    signClass: 'landmark-sign-arm--email',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    )
  }
];

export default function SocialBubbles() {
  const { playClick, playHover } = useSoundEffects();

  return (
    <div className="landmark-signpost-wrapper" aria-label="Social media destination signpost">
      <div className="landmark-signpost">
        {/* Dark Matte Cast-Iron Architectural Finial */}
        <div className="landmark-post-finial" aria-hidden="true" />
        
        {/* Dark Matte Cast-Iron Architectural Pillar */}
        <div className="landmark-post" aria-hidden="true" />

        {/* Stack of Directional Signs */}
        <div className="landmark-signs-stack">
          {LANDMARK_SIGNS.map((item) => {
            const isLeft = item.direction === 'left';
            return (
              <a
                key={item.id}
                href={item.url}
                target={item.id === 'email' ? '_self' : '_blank'}
                rel={item.id === 'email' ? undefined : 'noopener noreferrer'}
                className={`landmark-sign-arm landmark-sign-arm--${item.direction} ${item.signClass}`}
                onClick={() => playClick()}
                onMouseEnter={playHover}
                aria-label={`${item.name} - pointing ${item.direction}`}
                title={item.name}
              >
                <div className="landmark-sign-plank">
                  {/* Left pointing arrow symbol */}
                  {isLeft && (
                    <span className="landmark-sign-chevron" aria-hidden="true">
                      ◀
                    </span>
                  )}

                  {/* Platform Icon */}
                  <span className="landmark-sign-icon" aria-hidden="true">
                    {item.icon}
                  </span>

                  {/* Clean Social Media Name Only */}
                  <span className="landmark-sign-name">{item.name}</span>

                  {/* Right pointing arrow symbol */}
                  {!isLeft && (
                    <span className="landmark-sign-chevron" aria-hidden="true">
                      ▶
                    </span>
                  )}
                </div>
              </a>
            );
          })}
        </div>

        {/* Dark Matte Cast-Iron Architectural Base */}
        <div className="landmark-post-base" aria-hidden="true" />
      </div>

      {/* Subcaption */}
      <div className="landmark-subcaption-container">
        <span className="landmark-subcaption-line" aria-hidden="true" />
        <span className="landmark-subcaption">find me across the web</span>
        <span className="landmark-subcaption-line" aria-hidden="true" />
      </div>
    </div>
  );
}
