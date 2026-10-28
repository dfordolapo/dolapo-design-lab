// Verified portfolio content transformed into an email-native workspace.
// Inbox contains: welcome note from Dolapo, verified client reviews, and future collaborator inquiry.
// Starred is kept empty for now (ready for featured projects).
// Drafts contains concept explorations.

export const INITIAL_MESSAGES = [
  {
    id: 'msg-welcome',
    sender: 'Dolapo',
    senderHandle: 'dfordolapo@gmail.com',
    senderRole: 'Product Designer · UX Writer · Design Engineer',
    senderAvatar: '/assets/designer.webp',
    isCreator: true,
    subject: "You've got mail. And a portfolio to explore.",
    preview: "I'm Dolapo, a full-stack Product Designer, UX Writer, and Design Engineer who enjoys turning ideas into thoughtfully designed, working products...",
    timestamp: 'Just now',
    date: 'Today, 10:00 AM',
    unread: true,
    starred: false,
    folder: 'inbox',
    body: {
      salutation: 'Hello and welcome,',
      paragraphs: [
        "I'm Dolapo, a full-stack Product Designer, UX Writer, and Design Engineer who enjoys turning ideas into thoughtfully designed, working products.",
        'Every product starts as a thought. A messy idea. A "what if?" A problem waiting for someone to notice it. I obsess over the details that take concepts from UX wireframes to code and shipped software.',
        "Welcome to my little corner of the internet. Instead of giving you another predictable grid of cards, I've organised my work into conversations, so here's your quick guide to finding your way around:"
      ],
      guideItems: [
        {
          icon: '📥',
          title: 'Inbox',
          description: 'Start here to explore my work and the stories behind selected projects.',
          action: 'close-reading'
        },
        {
          icon: '🗂️',
          title: 'Departments & vaults',
          description: 'Explore by department to find the work most relevant to you.',
          action: 'open-departments'
        },
        {
          icon: '📅',
          title: 'Book a Lab Session',
          description: "Have an idea or a project in mind? Let's talk.",
          action: 'navigate-book'
        }
      ],
      closingNote: 'Make yourself at home.',
      signoff: 'Until then,\nDolapo ♡',
      cta: {
        text: 'Book a 15-Minute Lab Session',
        action: 'navigate-book'
      },
      secondaryCta: {
        text: 'Explore Departments & Vaults',
        action: 'open-departments'
      }
    }
  },
  {
    id: 'msg-blurr-developer',
    sender: 'Blurr · Developer',
    senderHandle: 'developer@blurr.app',
    senderRole: 'Developer, Blurr: Anonymous Chat',
    senderAvatar: null,
    senderInitials: 'BD',
    subject: 'She understood the vision',
    preview: '“She understood the direction I had in mind, contributed her own ideas, and created visuals that presented the app and its features in a clear and appealing way.”',
    timestamp: 'June-July',
    date: 'June-July',
    unread: true,
    starred: false,
    folder: 'inbox',
    category: 'Client Feedback',
    projectContext: {
      project: 'Blurr: Anonymous Chat',
      deliverable: 'Google Play Store storefront images',
      period: 'June-July'
    },
    body: {
      paragraphs: [
        '“I had the pleasure of working with Dolapo in June and July on the Google Play Store storefront images for Blurr: Anonymous Chat, and it was a great experience.',
        'As the developer working on Blurr, I wanted the new update to look as good as it worked, and Dolapo did a great job bringing that vision to life. She understood the direction I had in mind, contributed her own ideas, and created visuals that presented the app and its features in a clear and appealing way.',
        'What I appreciated most was how easy she was to work with. Communication was smooth, she was open to feedback, and she handled revisions well. That made the entire process much easier and helped us get the storefront visuals to where we wanted them.',
        'Beyond her design skills, Dolapo is easygoing, thoughtful, and genuinely great to work with. Our professional relationship even grew into a friendship, which made the experience all the more meaningful.',
        'I\'d happily work with her again and recommend her to anyone looking for a designer who understands a product\'s vision, collaborates well with developers, and takes feedback seriously.”'
      ],
      signoff: 'Developer, Blurr: Anonymous Chat'
    },
    skills: [
      'Product understanding',
      'Developer collaboration',
      'Feedback and iteration'
    ]
  },
  {
    id: 'msg-nailexpress',
    sender: 'Nail Express NG · Owner',
    senderHandle: 'owner@nailexpress.ng',
    senderRole: 'Owner, Nail Express NG',
    senderAvatar: null,
    senderInitials: 'NE',
    subject: '“You are a force to reckon with!”',
    preview: '“Your attention to details, creative direction, calmness and clarity, technical know how, brilliant suggestions, and fab energy…”',
    timestamp: 'Recent',
    date: 'Recent milestone',
    unread: true,
    starred: false,
    folder: 'inbox',
    category: 'Client Feedback',
    projectContext: {
      project: 'Nail Express NG website',
      deliverable: 'Website design and development',
      clientIdentity: 'Owner · Client feedback'
    },
    projectPreview: {
      id: 'designer-4',
      title: 'NailExpress',
      subtitle: 'Luxury Press-On Nail Storefront & Design System',
      description: 'Interactive direct-to-consumer storefront with 1-tap checkout, sizing flip cards, and 60-page omnichannel brand asset system.',
      tags: ['E-Commerce UX', 'Full-Stack Development', 'Design System'],
      image: '/assets/nailexpress-logo.webp'
    },
    body: {
      paragraphs: [
        '“Girrrrlll! You are so amazing at what you do.',
        'I couldn’t have done this project better myself!',
        'Your attention to details, creative direction, calmness and clarity, technical know how, brilliant suggestions, and fab energy all through the process of putting this website together have been nothing short of amazing.',
        'I am so grateful for finding you and doing this with you.',
        'You are a force to reckon with oh D!',
        'Can’t wait to hop on more projects with you.',
        'Will definitely recommend your services a billion times over.',
        'God bless you!”'
      ],
      signoff: 'Owner, Nail Express NG',
      relatedProjectId: 'designer-4',
      cta: {
        text: 'View NailExpress Project',
        action: 'open-project',
        projectId: 'designer-4'
      },
      secondaryCta: {
        text: 'Visit nailexpress.ng',
        action: 'open-url',
        url: 'https://www.nailexpress.ng'
      }
    },
    skills: [
      'Creative direction',
      'Attention to detail',
      'Technical execution',
      'Client collaboration'
    ]
  },
  {
    id: 'msg-teeraboh',
    sender: 'Teeraboh Zana',
    senderHandle: 'teeraboh@moontechlife.com',
    senderRole: 'Bootcamp Tutor & Product Design Mentor',
    senderAvatar: null,
    senderInitials: 'TZ',
    subject: "You're the 1% of the 1%",
    preview: '“You’re the 1% of the 1%.” Student review and congratulations on Awwja winning Best Project in the bootcamp...',
    timestamp: 'Bootcamp',
    date: 'Bootcamp Review',
    unread: true,
    starred: false,
    folder: 'inbox',
    category: 'Client Feedback',
    testimonial: {
      quote: "You're the 1% of the 1%.",
      author: 'Teeraboh Zana',
      company: 'Bootcamp Cohort',
      role: 'Tutor & Mentor',
      verified: true
    },
    projectPreview: {
      id: 'designer-2',
      title: 'Awwja (Best Project Winner)',
      subtitle: 'Automated Negotiation Machine & Escrow Engine',
      description: 'Won Best Project in the bootcamp cohort. Cultural haggling meets automated escrow infrastructure with active waitlist.',
      tags: ['Best Project Winner', 'Bootcamp Award', 'Product Design', 'UX Architecture'],
      image: '/assets/awwja-thumbnail-preview.webp'
    },
    body: {
      salutation: 'Hi Dolapo,',
      paragraphs: [
        'I wanted to send a note reflecting on your growth and execution throughout our product design bootcamp.',
        '“You’re the 1% of the 1%.”',
        'As your tutor and mentor, watching you take complex product thinking from raw user flows to high-fidelity interfaces and polished interactive prototypes has been nothing short of inspiring.',
        'Huge congratulations on your project, Awwja, winning Best Project in the entire bootcamp cohort! Your ability to translate cultural nuance into an automated negotiation engine showed maturity far beyond typical coursework.',
        'Keep building with that same precision and craft.'
      ],
      signoff: 'Best regards,\nTeeraboh Zana\nBootcamp Tutor & Product Design Mentor',
      relatedProjectId: 'designer-2',
      cta: {
        text: 'View Awwja Case Study',
        action: 'open-project',
        projectId: 'designer-2'
      },
      secondaryCta: {
        text: 'Visit Awwja Waitlist',
        action: 'open-url',
        url: 'https://awwja.vercel.app'
      }
    },
    skills: [
      'Best Project Winner',
      'Design leadership',
      'UX architecture',
      'Product strategy'
    ]
  },
  {
    id: 'msg-opportunity-starter',
    sender: 'Future Collaborator',
    senderHandle: 'you@company.com',
    senderRole: 'Founder / Product Lead / Hiring Manager',
    senderAvatar: null,
    senderInitials: 'FC',
    isOpportunityTemplate: true,
    subject: 'Re: Starting a project or lab session with Dolapo',
    preview: 'Looking to design an AI product, refine UX writing, or build an MVP? Here is how we can collaborate...',
    timestamp: 'Just now',
    date: 'Just now',
    unread: true,
    starred: false,
    folder: 'inbox',
    body: {
      salutation: 'Ready to build something exceptional together?',
      paragraphs: [
        'Whether you are an early-stage startup looking to take an idea from napkin sketch to a shipped product, or an established company redesigning a critical user flow, here are the ways we can collaborate:',
        '1. Product Design & Strategy: End-to-end UX wireframing, high-fidelity Figma components, interactive prototypes, and design systems.\n2. UX Writing & Microcopy: Establishing your product voice, eliminating user confusion in onboarding, and authoring transactional lifecycle communications.\n3. Design + Build (Engineering): Developing front-end applications with React, Vite, CSS, and modern web frameworks that ship to real users.',
        'Choose your preferred next step below:'
      ],
      links: [
        { label: 'Book a 15-Minute Session', url: '/book', type: 'route' },
        { label: 'Send an Email', url: 'mailto:dfordolapo@gmail.com?subject=Project%20Inquiry%20via%20Design%20Lab', type: 'mailto' },
        { label: 'X (@dsignwithdolapo)', url: 'https://x.com/dsignwithdolapo', type: 'external' },
        { label: 'LinkedIn', url: 'https://linkedin.com/in/dolapo-o', type: 'external' }
      ],
      signoff: 'Dolapo\nProduct Designer · UX Writer · Design Engineer',
      cta: {
        text: 'Book a 15-Minute Lab Session',
        action: 'navigate-book'
      },
      secondaryCta: {
        text: 'Send Direct Email',
        action: 'mailto-creator'
      }
    }
  },
  {
    id: 'msg-draft-saferide',
    sender: 'SafeRide Mode™ Exploration',
    senderHandle: 'lab@designwithdolapo.pro',
    senderRole: 'Discreet Passenger Safety Companion',
    senderAvatar: null,
    senderInitials: 'SR',
    subject: 'SafeRide Mode™: Covert emergency companion UX',
    preview: 'When a passenger feels unsafe, opening a dialer is too dangerous. Designing discreet volume-key SOS triggers, route-deviation alerts, and covert fake-call mechanics...',
    timestamp: 'Draft',
    date: 'Draft · UX Exploration',
    unread: false,
    starred: false,
    folder: 'drafts',
    isDraft: true,
    category: 'UX Exploration',
    projectPreview: {
      id: 'designer-1',
      title: 'SafeRide Mode™',
      subtitle: 'Safety Companion UX Exploration',
      description: 'High-contrast, discreet emergency companion designed for passengers traveling alone late at night, featuring covert volume gestures and live telemetry tracking.',
      tags: ['Safety UX', 'Discreet Gestures', 'Mobile Exploration', 'Route Telemetry'],
      image: '/assets/saferide-logo.svg'
    },
    body: {
      salutation: 'SafeRide Mode™: Emergency Companion UX Exploration',
      paragraphs: [
        'When a passenger feels unsafe in a rideshare vehicle late at night, pulling out their phone, unlocking the screen, and opening a dialer can actively escalate danger by signaling to an aggressive driver that they are being reported.',
        'SafeRide Mode™ explores non-verbal, discreet safety mechanics engineered specifically for high-tension environments:',
        '1. Non-Verbal Volume Button SOS: A tactile physical key sequence (volume hold + double tap) that immediately logs vehicle telemetry and real-time GPS coordinates to trusted emergency contacts without waking the display or triggering sound.',
        '2. Live Route Telemetry & Deviation Alerts: Constant background comparison between the mapped navigation path and real-time vehicle heading, triggering subtle haptic pulses if the vehicle makes unexpected turns or prolonged stops.',
        '3. Covert Fake-Call Screen: An ultra-realistic simulated incoming call interface with pre-recorded natural voice prompts, giving the rider a plausible excuse to speak out loud and broadcast location details to the driver.',
        'Designed with a high-contrast dark palette to avoid illuminating the vehicle cabin while preserving critical legibility under duress.'
      ],
      signoff: 'Design Lab Exploration by Dolapo\nProduct Designer · UX Writer',
      cta: {
        text: 'View SafeRide Mode™ Case Study',
        action: 'open-project',
        projectId: 'designer-1'
      }
    }
  },
  {
    id: 'msg-draft-onboarding',
    sender: 'Onboarding Screens Collection',
    senderHandle: 'lab@designwithdolapo.pro',
    senderRole: 'Principles-First Mobile Onboarding',
    senderAvatar: null,
    senderInitials: 'OS',
    subject: 'Onboarding Screens: First impressions & design principles',
    preview: 'Every product gets one shot at a first impression. Exploring progressive disclosure in MUVE Fitness and playful bedtime storytelling in Children’s Audiobook App...',
    timestamp: 'Draft',
    date: 'Draft · Ongoing Self-Challenge',
    unread: false,
    starred: false,
    folder: 'drafts',
    isDraft: true,
    category: 'Self-Challenge',
    projectPreview: {
      id: 'designer-onboarding',
      title: 'Onboarding Screens Collection',
      subtitle: 'Principles-First Mobile Onboarding Library',
      description: 'An ongoing craft challenge exploring single UX principles across products, from progressive goal setting in MUVE Fitness to audio-first warmth in Children’s Audiobook.',
      tags: ['Onboarding UX', 'Progressive Disclosure', 'Mobile Systems', 'Tactile UI'],
      image: '/assets/onboarding-emblem.webp'
    },
    body: {
      salutation: 'Onboarding Screens: Crafting First Impressions',
      paragraphs: [
        'Every product gets one shot at a first impression. Onboarding screens are that critical moment. This is an ongoing self-challenge: design one onboarding screen at a time, each focused on a single uncompromising design principle. No briefs, no clients, just the craft.',
        'Current explorations in the collection:',
        '• Product 001: MUVE Fitness (Motivation Meets Action)\nA complete 8-step onboarding flow designed to inspire users while smoothly capturing their goals and fitness levels. Leverages Progressive Disclosure to prevent cognitive overload, high-energy typography and dark-mode aesthetics to build immediate workout momentum, and tactile interactive choice cards with immediate feedback.\n\n• Product 002: Children’s Audiobook App (Story-First Warmth & Playful Exploration)\nAn immersive storytelling onboarding flow designed for children and parents. Prioritizes voice warmth, vibrant visual cues, oversized tactile controls with intuitive cues for young listeners, transparent screen-time settings, and seamless bedtime auto-pause to build parental reassurance.\n\n• Product 003: In Progress\nExploring generative AI setup flows with adaptive progressive hints.'
      ],
      signoff: 'Craft Challenge by Dolapo\nProduct Designer',
      cta: {
        text: 'View Onboarding Case Study',
        action: 'open-project',
        projectId: 'designer-onboarding'
      }
    }
  },
  {
    id: 'msg-draft-gino',
    sender: 'Gino Jollof Festival Audit',
    senderHandle: 'lab@designwithdolapo.pro',
    senderRole: 'Guinness World Record Email Audit & Redesign',
    senderAvatar: null,
    senderInitials: 'GJ',
    subject: 'Gino Jollof Festival: Vendor email audit & rewrite',
    preview: 'Clarity is seasoning. Without it, everything tastes off. How contradictory emails and "Dear undefined" damaged trust in a Guinness World Record event...',
    timestamp: 'Draft',
    date: 'Draft · UX Writing Audit',
    unread: false,
    starred: false,
    folder: 'drafts',
    isDraft: true,
    category: 'UX Writing Audit',
    projectPreview: {
      id: 'writer-4',
      title: 'Gino Jollof Festival Audit',
      subtitle: 'Guinness World Record Vendor Email Teardown',
      description: 'A comprehensive UX writing audit and empathetic rewrite of contradictory vendor confirmation emails for a Guinness World Record event.',
      tags: ['UX Writing', 'Email Teardown', 'Empathetic Copy', 'Content Strategy'],
      image: '/assets/gino-mascot.webp'
    },
    body: {
      salutation: 'Gino World Jollof Festival: Vendor Email Audit & Rewrite',
      paragraphs: [
        'When someone gets a confirmation email, it should mean one thing: the matter is settled. No extra guesswork. That is why the vendor emails for the Gino World Jollof Festival stood out to me. In its quest for a Guinness World Record, the brand unintentionally created confusion and doubt through a few poor UX writing decisions.',
        'The Breakdown of What Went Wrong:',
        '1. Email 1 (False Alarm): Told vendors their registration was confirmed and provided a "vendor registration number" to gain access to the event. A clear green light. The copy made it sound like a done deal, leading vendors to share the news with their audiences.',
        '2. Email 2 (The Belated Clarification): A day or more later, a second email arrived stating there would be a selection process after all. Vendors were thrown into limbo. First they were "in," then they were "maybe."',
        '3. The "Undefined" Problem & Timing Gap: Addressing recipients as "Dear undefined" was a jarring technical and UX failure showing a lack of care. Combined with delayed communication, it damaged vendor trust at a critical moment.',
        'The Solution (Empathetic Rewrite):',
        '• Personalized & Professional: Fixed greetings with fallback mechanisms and a respectful, welcoming tone.\n• Honesty Upfront: Sets accurate expectations from the start by removing misleading confirmation language.\n• Clear Next Steps: States applications are "currently under review" with a definite 48-hour timeframe to manage expectations.\n• A Safety Net: Included empathetic copy: "If your application isn’t approved, you’re still welcome to attend the event as a guest," preserving goodwill.\n\nClarity is seasoning. Without it, everything tastes off. Words reflect brands, and when UX writing is done right, you build lasting trust.'
      ],
      signoff: 'UX Writing Audit by Dolapo\nUX Writer',
      cta: {
        text: 'View Gino Case Study',
        action: 'open-project',
        projectId: 'writer-4'
      }
    }
  },
  {
    id: 'msg-draft-working-together',
    sender: 'Dolapo',
    senderHandle: 'dfordolapo@gmail.com',
    senderRole: 'Product Designer · UX Writer · Design Engineer',
    senderAvatar: '/assets/designer.webp',
    isCreator: true,
    isDraft: true,
    folder: 'drafts',
    subject: 'A little note before you go',
    preview: "If you've made your way here, something must have caught your attention. Maybe it was a project. Maybe it was the way I approached a problem...",
    timestamp: 'Draft',
    date: 'Draft · Note Before You Go',
    unread: false,
    starred: false,
    category: 'Note',
    body: {
      salutation: 'Hi there,',
      paragraphs: [
        "If you've made your way here, something must have caught your attention.",
        "Maybe it was a project. Maybe it was the way I approached a problem. Maybe you're already imagining what we could build together.",
        "Whatever brought you here, I'd love to hear from you.",
        "Until our next conversation,"
      ],
      signoff: 'Dolapo',
      role: 'Product Designer · UX Writer · Design Engineer',
      cta: {
        text: 'Book a 15-Minute Lab Session',
        action: 'navigate-book'
      },
      secondaryCta: {
        text: 'Send Direct Email',
        action: 'mailto-creator'
      }
    }
  }
];

export const SIDEBAR_ITEMS = [
  { id: 'inbox', label: 'Inbox', icon: 'inbox', type: 'folder', countKey: 'inbox' },
  { id: 'drafts', label: 'Drafts', icon: 'file', type: 'folder', countKey: 'drafts' },
  { id: 'vault', label: 'Vault', icon: 'layers', type: 'departments' },
  { id: 'projects', label: 'Projects', icon: 'folder', type: 'projects' },
  { id: 'about', label: 'About Me', icon: 'user', type: 'about' },
  { id: 'book', label: 'Book a Session', icon: 'calendar', type: 'book' }
];
