export const ROLES = [
  { 
    id: 'designer', 
    number: '01',
    name: 'Product Design', 
    description: 'I figure out what should be built.',
    accent: 'var(--purple-mid)', 
    hue: '270',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>,
    badges: [
      { text: 'USER RESEARCH & INSIGHTS', top: '8%', right: '5%', type: 'pill' },
      { text: 'IDEATE', top: '34%', left: '5%', type: 'circle' },
      { text: 'USABILITY & ACCESSIBILITY', top: '60%', right: '5%', type: 'pill' },
      { text: 'WIREFRAMES & MOCKUPS', top: '84%', left: '5%', type: 'pill' }
    ]
  },
  { 
    id: 'writer', 
    number: '02',
    name: 'UX Writing', 
    description: 'I figure out how to explain it.',
    accent: 'var(--pink-mid)', 
    hue: '330',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>,
    badges: [
      { text: 'MICROCOPY & UI TEXT', top: '8%', right: '5%', type: 'pill' },
      { text: 'TONE & VOICE', top: '34%', left: '5%', type: 'circle' },
      { text: 'READABILITY & CLARITY', top: '60%', right: '5%', type: 'pill' },
      { text: 'CONTENT STRATEGY', top: '84%', left: '5%', type: 'pill' }
    ]
  },
  { 
    id: 'builder', 
    number: '03',
    name: 'Design + Build', 
    description: 'I take products from idea to launch.',
    accent: 'var(--blue-ambient)', 
    hue: '210',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    badges: [
      { text: 'REACT & TYPESCRIPT', top: '8%', right: '5%', type: 'pill' },
      { text: 'STATE MGMT', top: '34%', left: '5%', type: 'circle' },
      { text: 'UI COMPONENTS', top: '60%', right: '5%', type: 'pill' },
      { text: 'CSS GRID & FLEXBOX', top: '84%', left: '5%', type: 'pill' }
    ]
  }
]
