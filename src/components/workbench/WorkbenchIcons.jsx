import React from 'react';

/**
 * High-precision vector SVG brand icons and drawer category icons
 * Each tool icon is rendered within a glossy 3D-styled squircle tile
 */

export function CategoryIcon({ type, className = '', size = 20 }) {
  switch (type) {
    case 'pencil':
      return (
        <svg
          className={className}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
          <path d="m15 5 4 4" />
        </svg>
      );
    case 'code':
      return (
        <svg
          className={className}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case 'sparkle':
      return (
        <svg
          className={className}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z" />
          <path d="M19 16L20 19L23 20L20 21L19 24L18 21L15 20L18 19L19 16Z" opacity="0.8" />
        </svg>
      );
    case 'package':
      return (
        <svg
          className={className}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      );
    default:
      return null;
  }
}

export function ToolBrandIcon({ toolId, size = 32 }) {
  switch (toolId) {
    case 'figma':
      return (
        <svg width={size} height={size} viewBox="0 0 38 57" fill="none" aria-hidden="true">
          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
          <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
          <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
        </svg>
      );

    case 'figjam':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#8B5CF6" />
          <path d="M16 14H32V20H16V14Z" fill="#FFFFFF" />
          <path d="M16 22H28V28H16V22Z" fill="#FFD027" />
          <path d="M16 30H22V36H16V30Z" fill="#0ACF83" />
        </svg>
      );

    case 'framer':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#0A0A0A" />
          <path d="M14 12H34V24H24L34 36H14L24 24H14V12Z" fill="#FFFFFF" />
        </svg>
      );

    case 'photoshop':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#001E36" />
          <rect x="1" y="1" width="46" height="46" rx="11" stroke="#31A8FF" strokeWidth="2" strokeOpacity="0.8" />
          <text x="14" y="32" fontFamily="system-ui, -apple-system, sans-serif" fontSize="20" fontWeight="800" fill="#31A8FF">Ps</text>
        </svg>
      );

    case 'github':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#181717" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 10C16.27 10 10 16.36 10 24.2C10 30.48 14.01 35.8 19.59 37.69C20.29 37.82 20.55 37.38 20.55 37.01C20.55 36.68 20.54 35.59 20.53 34.43C16.63 35.29 15.81 32.72 15.81 32.72C15.18 31.08 14.25 30.65 14.25 30.65C12.98 29.77 14.35 29.79 14.35 29.79C15.76 29.89 16.5 31.26 16.5 31.26C17.75 33.44 19.78 32.81 20.58 32.44C20.71 31.52 21.07 30.89 21.47 30.53C18.36 30.17 15.09 28.95 15.09 23.51C15.09 21.96 15.63 20.69 16.53 19.7C16.39 19.34 15.9 17.89 16.67 15.94C16.67 15.94 17.84 15.56 20.5 17.39C21.61 17.08 22.81 16.92 24 16.92C25.19 16.92 26.39 17.08 27.5 17.39C30.16 15.56 31.33 15.94 31.33 15.94C32.1 17.89 31.61 19.34 31.47 19.7C32.37 20.69 32.91 21.96 32.91 23.51C32.91 28.97 29.63 30.17 26.51 30.52C27.01 30.96 27.46 31.83 27.46 33.16C27.46 35.08 27.44 36.63 27.44 37.01C27.44 37.38 27.7 37.83 28.41 37.69C33.98 35.79 38 30.48 38 24.2C38 16.36 31.73 10 24 10Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'html-css':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#E44D26" />
          <path d="M12 12L15 36L24 38.5L33 36L36 12H12Z" fill="#F16529" />
          <path d="M24 15V35.5L30.5 33.7L32.8 15H24Z" fill="#EBEBEB" />
          <path d="M24 15H15.2L16.2 23H24V19H19.5L19.2 15H24V15Z" fill="#FFFFFF" />
          <path d="M24 27H19.9L20.3 31.5L24 32.5V27Z" fill="#FFFFFF" />
        </svg>
      );

    case 'javascript':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#F7DF1E" />
          <path d="M18 36C19.5 36 21 35.2 21.6 33.8L19.8 32.7C19.4 33.4 18.8 33.8 18 33.8C16.8 33.8 16.2 33 16.2 31.5V24H13.8V31.5C13.8 34.5 15.5 36 18 36Z" fill="#000000" />
          <path d="M26 36C28.8 36 30.8 34.4 30.8 32C30.8 29.8 29.2 29 27.2 28.2L26.4 27.8C25.2 27.3 24.4 26.8 24.4 25.8C24.4 24.8 25.3 24.2 26.5 24.2C27.5 24.2 28.3 24.7 28.8 25.6L30.5 24.4C29.6 23 28.2 22.2 26.5 22.2C23.9 22.2 22 23.8 22 26C22 28 23.4 29 25.6 29.8L26.4 30.2C27.8 30.7 28.6 31.3 28.6 32.4C28.6 33.5 27.5 34.2 26.1 34.2C24.6 34.2 23.5 33.4 22.9 32.1L21 33.3C21.8 35.1 23.7 36 26 36Z" fill="#000000" />
        </svg>
      );

    case 'react-next':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#0E1217" />
          <ellipse cx="24" cy="24" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="1.8" fill="none" transform="rotate(30 24 24)" />
          <ellipse cx="24" cy="24" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="1.8" fill="none" transform="rotate(90 24 24)" />
          <ellipse cx="24" cy="24" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="1.8" fill="none" transform="rotate(150 24 24)" />
          <circle cx="24" cy="24" r="2.4" fill="#61DAFB" />
        </svg>
      );

    case 'antigravity':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#120F24" />
          <circle cx="24" cy="24" r="10" stroke="#7C3AED" strokeWidth="2.2" strokeDasharray="5 3" />
          <circle cx="24" cy="24" r="5" fill="#38BDF8" />
          <path d="M24 8L27 15L24 13L21 15L24 8Z" fill="#A855F7" />
          <path d="M24 40L21 33L24 35L27 33L24 40Z" fill="#A855F7" />
          <circle cx="36" cy="24" r="2" fill="#E0E7FF" />
          <circle cx="12" cy="24" r="2" fill="#E0E7FF" />
        </svg>
      );

    case 'claude':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#CC785C" />
          <g transform="translate(14, 14)">
            <path
              d="M10 0L12.5 7.5L20 10L12.5 12.5L10 20L7.5 12.5L0 10L7.5 7.5L10 0Z"
              fill="#FFFFFF"
            />
          </g>
        </svg>
      );

    case 'gemini':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#0C101C" />
          <path
            d="M24 10C24 17.732 17.732 24 10 24C17.732 24 24 30.268 24 38C24 30.268 30.268 24 38 24C30.268 24 24 17.732 24 10Z"
            fill="url(#gemini-gradient)"
          />
          <defs>
            <linearGradient id="gemini-gradient" x1="10" y1="10" x2="38" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1BA1E3" />
              <stop offset="0.5" stopColor="#9B51E0" />
              <stop offset="1" stopColor="#E26D5C" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'opencode':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#18181B" />
          <path d="M15 18L22 24L15 30" stroke="#10B981" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="25" y1="30" x2="33" y2="30" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      );

    case 'chatgpt':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#10A37F" />
          <path
            d="M33.6 23.2C33.2 21.2 31.9 19.6 30 18.7C29.6 16.5 28.1 14.7 26 14C23.9 13.3 21.6 13.8 20 15.2C18.6 14.5 17 14.5 15.6 15.3C14.2 16.1 13.3 17.6 13.3 19.2C11.9 20.3 11.2 22.1 11.4 23.9C11.6 25.7 12.8 27.2 14.4 27.9C14.4 28.2 14.4 28.5 14.4 28.8C14.4 31 15.8 33 17.9 33.7C19.9 34.4 22.2 33.9 23.8 32.5C25.2 33.2 26.8 33.2 28.2 32.4C29.6 31.6 30.5 30.1 30.5 28.5C32.1 27.3 32.9 25.3 32.5 23.4L33.6 23.2Z"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M24 18V30M18.8 21L29.2 27M18.8 27L29.2 21"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'deepseek':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#0D6EFD" />
          <path
            d="M13 29C15.5 30.5 19 31 23 29.5C28 27.5 31.5 22 34 16C31 18.5 26.5 21 21.5 21C16.5 21 14 18 14 18C14 18 15 22.5 18 24.5C15 25.5 13 29 13 29Z"
            fill="#FFFFFF"
          />
          <circle cx="21" cy="24.5" r="1.5" fill="#0D6EFD" />
          <path
            d="M28 26C31 28 34 27 36 25.5C34.5 27.5 31.5 31 27 32C24.5 32.5 21.5 32 19 31"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'codex':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#090D16" />
          <path d="M18 16L12 24L18 32" stroke="#38BDF8" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M30 16L36 24L30 32" stroke="#38BDF8" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="24" cy="24" r="3" fill="#10B981" />
          <line x1="24" y1="16" x2="24" y2="19" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
          <line x1="24" y1="29" x2="24" y2="32" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'kiro':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#6366F1" />
          <path d="M16 14V34" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M32 16L21 25L32 34" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="21" cy="25" r="2.5" fill="#FACC15" />
        </svg>
      );

    case 'vercel':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#000000" />
          <path d="M24 13L35 32H13L24 13Z" fill="#FFFFFF" />
        </svg>
      );

    case 'supabase':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#1C1C1C" />
          <path
            d="M25.4 12L13 27.5H23.5L22 36L34.5 20.5H24L25.4 12Z"
            fill="#3ECF8E"
          />
        </svg>
      );

    case 'resend':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#000000" />
          <path
            d="M16 16H25C28.3 16 31 18.7 31 22C31 25.3 28.3 28 25 28H21V32H16V16ZM21 24H24.5C25.6 24 26.5 23.1 26.5 22C26.5 20.9 25.6 20 24.5 20H21V24Z"
            fill="#FFFFFF"
          />
          <path d="M26 28L32 32H27L22 28.5L26 28Z" fill="#FFFFFF" />
        </svg>
      );

    case 'typescript':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#3178C6" />
          <path d="M14 20H26V23.5H21.5V36H18.5V23.5H14V20Z" fill="#FFFFFF" />
          <path d="M26.5 31.8C27.2 33 28.5 33.7 30 33.7C31.5 33.7 32.5 33 32.5 32C32.5 30.5 30.2 30 28.5 29.2C26.5 28.2 25.5 27 25.5 25C25.5 22.8 27.2 21.2 29.8 21.2C31.8 21.2 33.2 22 34 23.2L32 24.8C31.5 24 30.8 23.5 29.8 23.5C28.8 23.5 28 24 28 24.8C28 25.8 29.5 26.2 31.2 27C33.5 28 35 29.2 35 31.5C35 34 32.8 35.8 29.8 35.8C27.2 35.8 25.2 34.5 24.5 32.8L26.5 31.8Z" fill="#FFFFFF" />
        </svg>
      );

    case 'react-native':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#000000" />
          <rect x="15" y="10" width="18" height="28" rx="4" stroke="#61DAFB" strokeWidth="2.2" fill="none" />
          <ellipse cx="24" cy="24" rx="8" ry="3.2" stroke="#61DAFB" strokeWidth="1.4" fill="none" transform="rotate(30 24 24)" />
          <ellipse cx="24" cy="24" rx="8" ry="3.2" stroke="#61DAFB" strokeWidth="1.4" fill="none" transform="rotate(150 24 24)" />
          <circle cx="24" cy="24" r="1.5" fill="#61DAFB" />
          <line x1="22" y1="34" x2="26" y2="34" stroke="#61DAFB" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'python':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#1E293B" />
          <path d="M23.6 12C18.5 12 18.8 14.2 18.8 14.2L18.8 16.5H24V17.3H16.8C14.7 17.3 13 18.5 13 22.3C13 26.1 14.8 26.2 14.8 26.2L16.2 26.2V23.7C16.2 21.3 18.2 21.1 18.2 21.1H23.6C25.5 21.1 27 19.5 27 17.6V14.2C27 12 23.6 12 23.6 12ZM21.3 13.5C21.8 13.5 22.2 13.9 22.2 14.4C22.2 14.9 21.8 15.3 21.3 15.3C20.8 15.3 20.4 14.9 20.4 14.4C20.4 13.9 20.8 13.5 21.3 13.5Z" fill="#387EB8" />
          <path d="M24.4 36C29.5 36 29.2 33.8 29.2 33.8L29.2 31.5H24V30.7H31.2C33.3 30.7 35 29.5 35 25.7C35 21.9 33.2 21.8 33.2 21.8L31.8 21.8V24.3C31.8 26.7 29.8 26.9 29.8 26.9H24.4C22.5 26.9 21 28.5 21 30.4V33.8C21 36 24.4 36 24.4 36ZM26.7 34.5C26.2 34.5 25.8 34.1 25.8 33.6C25.8 33.1 26.2 32.7 26.7 32.7C27.2 32.7 27.6 33.1 27.6 33.6C27.6 34.1 27.2 34.5 26.7 34.5Z" fill="#FFE052" />
        </svg>
      );

    case 'sql':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#1E293B" />
          <ellipse cx="24" cy="15" rx="11" ry="4" stroke="#38BDF8" strokeWidth="2.2" fill="#0284C7" fillOpacity="0.3" />
          <path d="M13 15V24C13 26.2 17.9 28 24 28C30.1 28 35 26.2 35 24V15" stroke="#38BDF8" strokeWidth="2.2" fill="none" />
          <path d="M13 24V33C13 35.2 17.9 37 24 37C30.1 37 35 35.2 35 33V24" stroke="#38BDF8" strokeWidth="2.2" fill="none" />
        </svg>
      );

    default:
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#333333" />
          <circle cx="24" cy="24" r="8" fill="#FFFFFF" />
        </svg>
      );
  }
}
