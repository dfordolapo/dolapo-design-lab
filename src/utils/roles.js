export const ROLES = [
  { 
    id: 'designer', 
    number: '01',
    name: 'Product Design', 
    description: 'I figure out what should be built.',
    accent: 'var(--purple-mid)', 
    hue: 270,
    badges: [
      { text: 'USER JOURNEY MAP', top: '35%', left: '-5%', type: 'default' },
      { text: 'PAIN\nPOINTS', top: '65%', left: '-2%', type: 'circle' },
      { text: 'USER\nINSIGHT', top: '25%', right: '-2%', type: 'circle-small' }
    ],
    icon: '⎘'
  },
  { 
    id: 'writer', 
    number: '02',
    name: 'UX Writing', 
    description: 'I make products speak human.',
    accent: 'var(--pink-mid)', 
    hue: 330,
    badges: [
      { text: "Let's get you\nall set up 💖", top: '25%', left: '-5%', type: 'chat-left' },
      { text: 'Tone of voice\nClear\nHelpful\nHuman\nEmpathetic', top: '60%', left: '-10%', type: 'list' },
      { text: 'Your changes\nhave been saved.', top: '35%', right: '-10%', type: 'chat-right' },
      { text: 'Something\nwent wrong.\nTry again?', top: '65%', right: '-5%', type: 'chat-right' }
    ],
    icon: '💬'
  },
  { 
    id: 'builder', 
    number: '03',
    name: 'Design + Build', 
    description: 'I take products from idea to launch.',
    accent: 'var(--blue-ambient)', 
    hue: 210,
    badges: [
      { text: '▲ VERCEL', top: '30%', left: '-5%', type: 'code' },
      { text: 'DEPLOYMENT\nLive ✅', top: '25%', right: '-5%', type: 'status' },
      { text: '// Build\n// Ship\n// Impact', top: '60%', left: '-10%', type: 'code-list' },
      { text: '</>', top: '75%', right: '-2%', type: 'code-icon' }
    ],
    icon: '</>'
  },
]
