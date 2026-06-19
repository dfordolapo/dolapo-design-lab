export default function Mascot({ type }) {
  const base = (
    <defs>
      <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F5E0C3" />
        <stop offset="100%" stopColor="#E8C9A0" />
      </linearGradient>
      <linearGradient id="skinShadow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E8C9A0" />
        <stop offset="100%" stopColor="#D4AD82" />
      </linearGradient>
      <radialGradient id="cheek" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#E8A0A0" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#E8A0A0" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="iris" cx="40%" cy="35%" r="50%">
        <stop offset="0%" stopColor="#4A3520" />
        <stop offset="100%" stopColor="#1A1A2E" />
      </radialGradient>
      <linearGradient id="hairGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1A1A2E" />
        <stop offset="100%" stopColor="#0D0D1A" />
      </linearGradient>
      <linearGradient id="purpleShade" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
      <filter id="softShadow">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
        <feOffset dx="0" dy="2" />
        <feComponentTransfer><feFuncA type="linear" slope="0.3"/></feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  )

  const face = (
    <g>
      <ellipse cx="50" cy="40" rx="16" ry="20" fill="url(#skin)" />
      <ellipse cx="50" cy="48" rx="14" ry="10" fill="url(#skinShadow)" opacity="0.4" />
      <ellipse cx="39" cy="45" rx="6" ry="4" fill="url(#cheek)" />
      <ellipse cx="61" cy="45" rx="6" ry="4" fill="url(#cheek)" />
      <ellipse cx="50" cy="42" rx="2.5" ry="1.5" fill="#C4956A" opacity="0.5" />
      <path d="M 46 47 Q 50 50 54 47" stroke="#B0805A" strokeWidth="1" fill="none" strokeLinecap="round" />
      <ellipse cx="50" cy="48.5" rx="3" ry="1.2" fill="#D4828A" opacity="0.4" />
      <g filter="url(#softShadow)">
        <ellipse cx="43" cy="37" rx="3.5" ry="2" fill="#F8F4F0" />
        <ellipse cx="57" cy="37" rx="3.5" ry="2" fill="#F8F4F0" />
        <ellipse cx="43" cy="37" rx="2.5" ry="3.5" fill="url(#iris)" />
        <ellipse cx="57" cy="37" rx="2.5" ry="3.5" fill="url(#iris)" />
        <circle cx="44" cy="35.5" r="1.5" fill="white" opacity="0.9" />
        <circle cx="58" cy="35.5" r="1.5" fill="white" opacity="0.9" />
        <circle cx="42.5" cy="38" r="0.8" fill="white" opacity="0.4" />
        <circle cx="56.5" cy="38" r="0.8" fill="white" opacity="0.4" />
      </g>
      <path d="M 39 31 Q 42.5 29 46 31" stroke="#1A1A2E" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M 54 31 Q 57.5 29 61 31" stroke="#1A1A2E" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <g filter="url(#softShadow)">
        <path d="M 50 22 Q 48 18 50 14 Q 54 12 56 16" fill="url(#hairGrad)" />
      </g>
    </g>
  )

  const hair = (
    <g filter="url(#softShadow)">
      <path d="M 34 30 Q 32 16 38 10 Q 44 6 50 6 Q 56 6 62 10 Q 68 16 66 30 Q 66 34 62 34 Q 60 22 50 18 Q 40 22 38 34 Q 34 34 34 30 Z" fill="url(#hairGrad)" />
      <path d="M 50 6 Q 52 10 50 14" stroke="#2A2A4E" strokeWidth="0.8" fill="none" opacity="0.3" />
      <path d="M 44 8 Q 46 12 44 16" stroke="#2A2A4E" strokeWidth="0.5" fill="none" opacity="0.2" />
      <path d="M 56 8 Q 54 12 56 16" stroke="#2A2A4E" strokeWidth="0.5" fill="none" opacity="0.2" />
    </g>
  )

  const legs = (
    <g filter="url(#softShadow)">
      <rect x="39" y="82" width="8" height="20" rx="3" fill="#0D0D1A" />
      <rect x="53" y="82" width="8" height="20" rx="3" fill="#0D0D1A" />
      <ellipse cx="43" cy="102" rx="5" ry="2" fill="#1A1A2E" />
      <ellipse cx="57" cy="102" rx="5" ry="2" fill="#1A1A2E" />
      <ellipse cx="50" cy="107" rx="20" ry="3" fill="#000" opacity="0.15" />
    </g>
  )

  const arms = (
    <g>
      <rect x="20" y="52" width="14" height="9" rx="4" fill="url(#skin)" />
      <rect x="66" y="52" width="14" height="9" rx="4" fill="url(#skin)" />
      <circle cx="22" cy="58" r="6" fill="url(#skin)" />
      <circle cx="78" cy="58" r="6" fill="url(#skin)" />
    </g>
  )

  const designer = (
    <svg viewBox="0 0 100 115" fill="none">
      {base}
      {legs}
      <g filter="url(#softShadow)">
        <rect x="33" y="48" width="34" height="38" rx="10" fill="#7C3AED" />
        <rect x="33" y="48" width="34" height="38" rx="10" fill="url(#purpleShade)" opacity="0.3" />
        <rect x="35" y="48" width="30" height="6" rx="3" fill="#6D28D9" />
      </g>
      <path d="M 33 52 Q 28 60 20 58" stroke="#6D28D9" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M 67 52 Q 72 60 80 58" stroke="#6D28D9" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M 41 56 L 50 63 L 59 56" fill="#8B5CF6" />
      {arms}
      <ellipse cx="80" cy="70" rx="10" ry="6" fill="#F0ABFC" stroke="#A78BFA" strokeWidth="1.2" />
      <circle cx="77" cy="68" r="1.8" fill="#34D399" />
      <circle cx="83" cy="68" r="1.8" fill="#60A5FA" />
      <circle cx="80" cy="74" r="1.8" fill="#FBBF24" />
      <circle cx="86" cy="72" r="1.8" fill="#F472B6" />
      <rect x="74" y="62" width="12" height="2" rx="1" fill="#A78BFA" />
      <g filter="url(#softShadow)">
        <ellipse cx="50" cy="7" rx="17" ry="5" fill="#8B5CF6" />
        <ellipse cx="50" cy="5" rx="12" ry="3" fill="#7C3AED" />
        <circle cx="50" cy="3" r="3.5" fill="#6D28D9" />
      </g>
      {hair}
      {face}
    </svg>
  )

  const builder = (
    <svg viewBox="0 0 100 115" fill="none">
      {base}
      {legs}
      <g filter="url(#softShadow)">
        <rect x="33" y="48" width="34" height="38" rx="10" fill="#EA580C" />
        <rect x="35" y="48" width="30" height="6" rx="3" fill="#C2410C" />
        <rect x="34" y="56" width="32" height="5" rx="2" fill="#FBBF24" opacity="0.9" />
        <line x1="34" y1="58" x2="66" y2="58" stroke="#F59E0B" strokeWidth="1" />
      </g>
      <path d="M 33 52 Q 28 60 20 58" stroke="#C2410C" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M 67 52 Q 72 60 80 58" stroke="#C2410C" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M 41 56 L 50 63 L 59 56" fill="#F97316" />
      {arms}
      <rect x="76" y="56" width="5" height="20" rx="2" fill="#94A3B8" />
      <rect x="72" y="74" width="13" height="5" rx="2.5" fill="#64748B" />
      <line x1="76" y1="56" x2="76" y2="76" stroke="#475569" strokeWidth="0.8" />
      <rect x="10" y="52" width="12" height="15" rx="1" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
      <line x1="12" y1="56" x2="19" y2="56" stroke="#60A5FA" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="12" y1="60" x2="19" y2="60" stroke="#60A5FA" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="12" y1="64" x2="16" y2="64" stroke="#60A5FA" strokeWidth="1.2" strokeLinecap="round" />
      <g filter="url(#softShadow)">
        <path d="M 28 28 Q 30 14 50 10 Q 70 14 72 28 Z" fill="#FBBF24" />
        <rect x="26" y="26" width="48" height="4" rx="2" fill="#F59E0B" />
        <rect x="47" y="10" width="6" height="3" rx="1" fill="#D97706" />
      </g>
      {hair}
      {face}
    </svg>
  )

  const writer = (
    <svg viewBox="0 0 100 115" fill="none">
      {base}
      {legs}
      <g filter="url(#softShadow)">
        <rect x="33" y="48" width="34" height="38" rx="10" fill="#3B82F6" />
        <rect x="35" y="48" width="30" height="6" rx="3" fill="#2563EB" />
        <path d="M 46 56 L 50 72 L 54 56" fill="#1E3A5F" />
      </g>
      <path d="M 33 52 Q 28 60 20 58" stroke="#2563EB" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M 67 52 Q 72 60 80 58" stroke="#2563EB" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M 41 56 L 50 63 L 59 56" fill="#93C5FD" />
      {arms}
      <rect x="8" y="50" width="14" height="19" rx="1.5" fill="#F8F7FF" stroke="#93C5FD" strokeWidth="0.8" />
      <rect x="13.5" y="50" width="3" height="19" fill="#60A5FA" />
      <line x1="10" y1="55" x2="12.5" y2="55" stroke="#1E1B2E" strokeWidth="0.6" opacity="0.25" />
      <line x1="10" y1="59" x2="12.5" y2="59" stroke="#1E1B2E" strokeWidth="0.6" opacity="0.25" />
      <line x1="10" y1="63" x2="12.5" y2="63" stroke="#1E1B2E" strokeWidth="0.6" opacity="0.25" />
      <line x1="15" y1="55" x2="20" y2="55" stroke="#1E1B2E" strokeWidth="0.6" opacity="0.25" />
      <line x1="15" y1="59" x2="20" y2="59" stroke="#1E1B2E" strokeWidth="0.6" opacity="0.25" />
      <line x1="15" y1="63" x2="18" y2="63" stroke="#1E1B2E" strokeWidth="0.6" opacity="0.25" />
      <line x1="75" y1="52" x2="84" y2="44" stroke="#1E1B2E" strokeWidth="2" strokeLinecap="round" />
      <polygon points="84,44 86,46 82,48" fill="#3B82F6" />
      {hair}
      {face}
      <circle cx="43" cy="37" r="4.5" stroke="#FBBF24" strokeWidth="1.2" fill="none" />
      <circle cx="57" cy="37" r="4.5" stroke="#FBBF24" strokeWidth="1.2" fill="none" />
      <line x1="47.5" y1="37" x2="52.5" y2="37" stroke="#FBBF24" strokeWidth="1.2" />
      <path d="M 38.5 37 L 37 35.5" stroke="#FBBF24" strokeWidth="1" strokeLinecap="round" />
      <path d="M 61.5 37 L 63 35.5" stroke="#FBBF24" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )

  const mascots = { designer, builder, writer }
  return mascots[type] || null
}
