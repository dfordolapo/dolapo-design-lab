import React from 'react';
import { ROLES } from './roles.jsx';

export const CASE_STUDIES = [
  // Real Case Study: Scan2Supper
  {
    id: 'writer-1',
    departmentId: 'writer',
    vaultImage: '/assets/scan2supper-hero.png',
    noMockupBg: true,
    noGlow: true,
    vaultLogo: <img src="/assets/scan2supper-vault-cover.png" alt="Scan2Supper Mockup" style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', maxWidth: '300px' }} />,
    category: 'RECIPE GENERATOR APP',
    title: 'Scan2Supper',
    role: 'UX/UI Design, Illustration',
    duration: '4 weeks',
    platform: 'iOS Concept',
    content: [
      { type: 'hero', image: '/assets/scan2supper-hero.png' },
      { 
        type: 'overview',
        text: 'Scan2Supper is a concept mobile app that helps people decide what to cook using ingredients they already have, flipping the typical recipe experience.'
      },
      {
        type: 'side-by-side-images',
        images: [
          { src: '/assets/scan2supper-before.jpg', caption: 'Before (Old Onboarding)' },
          { src: '/assets/scan2supper-after.png', caption: 'After (Redesigned Onboarding)' }
        ]
      },
      {
        type: 'text-block',
        body: 'We\'ve all stared at our fridge wondering what to make. Traditional recipe apps assume you know what you want. Scan2Supper flips the script: scan the ingredients you already have, and it instantly builds a digital pantry and generates matching recipes.'
      },
      {
        type: 'features-list',
        features: [
          { title: 'Ingredient Scanning', desc: 'Auto-detects items via camera to build a digital pantry.' },
          { title: 'Smart Recipes', desc: 'Instantly generates meals based on available ingredients, prioritizing what needs to be used.' },
          { title: 'Step-by-Step Cooking Mode', desc: 'Hands-free navigation through recipe steps, perfect for messy hands.' }
        ]
      },
      { type: 'presentation-slide', image: '/assets/s2s-scanning.png' },
      { type: 'presentation-slide', image: '/assets/s2s-pantry.png' },
      { type: 'presentation-slide', image: '/assets/s2s-recipe-generation.png' },
      { type: 'presentation-slide', image: '/assets/s2s-cooking-mode.png' },
      {
        type: 'split-block',
        body: 'What started as a personal solution became a robust system. I had to design recovery paths for blurry scans, allow manual entries, and restructure the navigation from 3 tabs to 5 (adding dedicated Search and Scan actions) to reduce friction.',
        image: '/assets/s2s-error-states.png'
      },
      {
        type: 'split-block',
        body: 'I learned to protect the MVP. While I initially wanted grocery integrations and expiry tracking, focusing solely on the "Scan-to-Supper" loop kept the value proposition clear. Additionally, introducing a friendly mascot turned system feedback into moments of delight.',
        image: '/assets/s2s-mascot.png'
      },
      {
        type: 'text-block',
        body: 'Thank you for reading!',
        align: 'center'
      }
    ]
  },
  
  {
    id: 'designer-1',
    departmentId: 'designer',
    vaultImage: '/assets/mockup_mobile_vault.png',
    logoOnlyPreview: true,
    themeColor: '#312bb5',
    noGlow: true,
    vaultLogo: (
      <svg className="saferide-logo" width="240" height="270" viewBox="0 0 24 30" fill="none" stroke="#000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#000" fill="none"></path>
        <path d="M14 10 L10 10 L9 13 L7 13 L7 15 L17 15 L17 13 L15 13 Z" stroke="#000" strokeWidth="1" fill="none"></path>
        <circle cx="9.5" cy="15.5" r="1" stroke="#000" fill="#000"></circle>
        <circle cx="14.5" cy="15.5" r="1" stroke="#000" fill="#000"></circle>
        <path d="M9 13 L15 13" stroke="#000" strokeWidth="0.5"></path>
        <text x="12" y="28" textAnchor="middle" fontSize="2.5" fontWeight="bold" fill="#000" stroke="none" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>SAFERIDE MODE</text>
      </svg>
    ),
    thumbnailLogo: (
      <svg className="saferide-logo" width="100%" height="auto" viewBox="0 2 24 22" fill="none" stroke="#FFF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#FFF" fill="none"></path>
        <path d="M14 10 L10 10 L9 13 L7 13 L7 15 L17 15 L17 13 L15 13 Z" stroke="#FFF" strokeWidth="1" fill="none"></path>
        <circle cx="9.5" cy="15.5" r="1" stroke="#FFF" fill="#FFF"></circle>
        <circle cx="14.5" cy="15.5" r="1" stroke="#FFF" fill="#FFF"></circle>
        <path d="M9 13 L15 13" stroke="#FFF" strokeWidth="0.5"></path>
      </svg>
    ),
    category: 'UX EXPLORATION',
    title: 'SafeRide Mode™',
    role: 'Product Design, UX Research',
    duration: 'Exploration',
    platform: 'Mobile App',
    content: [
      { type: 'presentation-slide', image: '/assets/image-1.png' },
      { type: 'presentation-slide', image: '/assets/image-2.png' },
      { type: 'presentation-slide', image: '/assets/image-3.png' },
      { type: 'presentation-slide', image: '/assets/image-4.png' },
      { type: 'presentation-slide', image: '/assets/image-5.png' },
      { type: 'presentation-slide', image: '/assets/image-6.png' },
      { type: 'presentation-slide', image: '/assets/image-7.png' },
      { type: 'presentation-slide', image: '/assets/image-8.png' }
    ]
  },
  
  {
    id: 'designer-2',
    departmentId: 'designer',
    themeColor: '#52311E',
    backgroundColor: '#52311E',
    vaultImage: '/assets/awwja-thumbnail-preview.png',
    noGlow: true,
    hideTitle: true,
    vaultLogo: <img src="/assets/awwja-vault-cover.png" alt="Awwja" style={{ width: '250px', height: 'auto', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))' }} />,
    category: 'NEGOTIATION MACHINE',
    title: 'Awwja',
    role: 'Product Design, Branding',
    duration: 'Ongoing',
    platform: 'Web App',
    content: [
      { type: 'full-image', image: '/assets/awwja-case-study.png' }
    ]
  },
  
  {
    id: 'designer-3',
    departmentId: 'designer',
    vaultImage: '/assets/vurdict-thumbnail-logo.png',
    noGlow: true,
    vaultLogo: <img src="/assets/vurdict-logo.png" alt="Vurdict" style={{ width: '450px', height: 'auto', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }} />,
    category: 'AI PORTFOLIO REVIEWER',
    title: 'Vurdict',
    role: 'Product Design',
    duration: 'Ongoing',
    platform: 'Web Platform',
    content: [
      {
        type: 'embed',
        heading: 'Live Preview',
        url: 'https://www.vurdict.site'
      }
    ]
  },
  
  {
    id: 'designer-4',
    departmentId: 'designer',
    vaultImage: '/assets/mockup_laptop_vault.png',
    logoOnlyPreview: true,
    noGlow: true,
    vaultLogo: <img src="/assets/Shiftsyncd%20black%20logo.png" alt="ShiftSyncd" style={{ width: '250px', height: 'auto', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }} />,
    thumbnailLogo: <img src="/assets/ShiftSync%20logo.png" alt="ShiftSyncd Preview" style={{ width: '100%', height: 'auto' }} />,
    category: 'NURSE HANDOVER TOOL',
    title: 'ShiftSyncd',
    role: 'Product Design',
    duration: 'Ongoing',
    platform: 'Web / Mobile',
    content: [
      { type: 'full-image', image: '/assets/shiftsyncd-case-study.png' }
    ]
  },
  
  {
    id: 'designer-5',
    departmentId: 'designer',
    themeColor: '#0E172A',
    vaultImage: '/assets/kitkeeper-hero.png',
    noGlow: true,
    vaultLogo: <img src="/assets/kitkeeper-cover.png" alt="KitKeeper" style={{ width: '250px', height: 'auto', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))' }} />,
    category: 'EQUIPMENT MANAGEMENT SAAS',
    title: 'KitKeeper Authentication',
    role: 'Product Design',
    duration: 'UX & Prototyping',
    platform: 'Mobile / Web',
    goal: 'Designed a completely structured authentication flow, focusing on clarity and error tolerance.',
    content: [
      { type: 'hero', image: '/assets/kitkeeper-hero.png' },
      {
        type: 'text-block',
        heading: 'The Problem',
        body: 'Teams that share equipment often struggle with losing track of items, poor access control, and scattered information. Authentication is the entry point to solving this. If it feels confusing or insecure, users lose trust immediately. This project explores a clear, structured experience.'
      },
      {
        type: 'text-block',
        heading: 'Design Goals',
        body: '• Simple login and signup\n• Clear password recovery\n• Error-tolerant forms\n• Smooth flow between screens'
      },
      { type: 'presentation-slide', image: '/assets/kitkeeper-login.png', caption: 'The Login Flow' },
      {
        type: 'text-block',
        heading: 'Fast & Familiar Access',
        body: 'Returning users sign in quickly with minimal input fields—only email and password are required. A visible "Forgot password" option is placed directly under the password field so users do not have to search for it. Loading feedback confirms the system is processing the request, preventing users from tapping repeatedly.'
      },
      { type: 'presentation-slide', image: '/assets/kitkeeper-signup.png', caption: 'The Sign Up Flow' },
      {
        type: 'text-block',
        heading: 'Reducing Friction for New Users',
        body: 'The sign up form only asks for full name, work email, and password. This simple structure lowers friction for first-time users. After signing up, clear next steps guide them through email verification and workspace setup. Progress feedback avoids giving the impression that the system has stalled during preparation.'
      },
      { type: 'presentation-slide', image: '/assets/kitkeeper-forgot-password.png', caption: 'Password Recovery Flow' },
      {
        type: 'text-block',
        heading: 'Regaining Access Safely',
        body: 'Users are told exactly what will happen (e.g., "we’ll send you a link to reset your password"), removing guesswork. System feedback on the loading screen confirms the request is being processed. Finally, strong completion feedback confirms the password was updated and provides a clear next action, preventing users from getting stuck.'
      },
      { type: 'presentation-slide', image: '/assets/kitkeeper-error.png', caption: 'Error Handling' },
      {
        type: 'text-block',
        heading: 'Specific Error Messages',
        body: 'Instead of generic errors, users see specific feedback like "We couldn’t find an account with that email address" or "Incorrect password. Please try again." This helps users correct mistakes immediately without frustration.'
      },
      {
        type: 'text-block',
        heading: 'Key UX Decisions',
        body: '• **Simplified navigation:** Back buttons were used instead of screen titles to reduce visual clutter.\n• **Consistent layout:** All authentication screens follow the same structure to make navigation predictable.\n• **Clear system feedback:** Loading and success states help users understand what is happening at every step.\n• **Readable hierarchy:** Large headings and simple spacing make screens easy to scan.'
      }
    ]
  },
  
  {
    id: 'builder-1',
    departmentId: 'builder',
    vaultImage: '/assets/vurdict-thumbnail-logo.png',
    noGlow: true,
    vaultLogo: <img src="/assets/vurdict-logo.png" alt="Vurdict" style={{ width: '450px', height: 'auto', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }} />,
    category: 'AI PORTFOLIO REVIEWER',
    title: 'Vurdict',
    role: 'Full-Stack Development',
    duration: 'Ongoing',
    platform: 'Web Platform',
    content: [
      {
        type: 'embed',
        heading: 'Live Preview',
        url: 'https://www.vurdict.site'
      }
    ]
  },
  
  {
    id: 'writer-4',
    departmentId: 'writer',
    vaultImage: '',
    textOnlyPreview: true,
    themeColor: '#881337',
    noGlow: true,
    vaultLogo: (
      <div style={{
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: 'black',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        textAlign: 'center',
        lineHeight: '1.2'
      }}>
        Gino Jollof <br/> Festival
      </div>
    ),
    category: 'GINO WORLD JOLLOF FESTIVAL',
    title: 'Gino Jollof Festival',
    role: 'UX Writer',
    duration: 'Audit & Redesign',
    platform: 'Email Communications',
    goal: <>Redesigned confusing vendor emails for a <br className="mobile-break" />Guinness World Record event.</>,
    content: [
      { type: 'hero', image: '/assets/gino-before-after.webp' },
      { 
        type: 'text-block',
        body: 'When someone gets a confirmation email, it should mean one thing: the matter is settled. No extra guesswork.\n\nThat’s why the vendor emails for the Gino World Jollof Festival stood out to me. They’re a masterclass in how a brand can unintentionally create confusion and doubt, all through a few poor UX writing decisions.\n\nLet’s break down the emails that were sent and see where the user experience went wrong.'
      },
      { type: 'presentation-slide', image: '/assets/gino-1.webp', caption: 'Email 1: False Alarm' },
      { 
        type: 'text-block',
        body: 'The first email told vendors their registration was confirmed and provided a “vendor registration number” to gain access to the event. A clear green light. The copy makes it sound like a done deal.'
      },
      { type: 'presentation-slide', image: '/assets/gino-2.webp', caption: 'Email 2: The Belated Clarification' },
      { 
        type: 'text-block',
        body: 'Then, in some cases, a day or more later, a second email arrived saying there would be a selection process after all.\n\nThat shift left vendors in limbo as some had already shared with their audiences that they would be at the event. First, they were “in.” Then, they were “maybe.” This is the most damaging part of the user journey.'
      },
      { 
        type: 'text-block',
        body: '**The “Undefined” Problem:** Addressing the user as “Dear undefined” is a glaring technical and UX error. It is a jarring, impersonal greeting, and showed a lack of personalization and care. This was an immediate red flag to me.\n\n**The Timing Gap:** The delayed delivery of the clarifying information is a significant user experience flaw. It suggests a disorganized process and leaves the users in a state of uncertainty for an extended period.\n\n**The Unnecessary Two-Step:** While the second email is more accurate, the fact that it was needed to correct the mistakes of the first one is a major UX failure. The user journey is filled with friction and uncertainty due to the lack of a clear, single source of truth in the communication flow.'
      },
      { type: 'presentation-slide', image: '/assets/gino-3.webp', caption: 'The Solution: A Better Approach' },
      { 
        type: 'text-block',
        body: 'A better approach would have been a single, well-crafted email with a clear subject line, human-centered copy, full disclosure, and no contradictions.\n\n**Personalized & Professional:** I removed “Dear undefined,” addressed the user by their name, and used a friendly yet formal tone.\n\n**Honesty Upfront:** The email sets the correct expectation from the start by removing the misleading language.\n\n**Clear Next Steps:** It clearly states that applications are “currently under review” and provides a timeframe (“within 48 hours”). This manages user expectations and gives them a sense of control over the process.\n\n**A Safety Net:** The most powerful part of this rewrite is the inclusion of “If your application isn’t approved, you’re still welcome to attend the event as a guest.” This is a fantastic example of empathetic UX writing. It provides a positive alternative and shows the brand values every user, regardless of their application status.\n\n**Thoughtful Design:** I also removed the irrelevant “Register via:” text from the bottom of the graphic. This small but important detail shows the user is no longer in the “registration” phase. It cleans up the design and removes unnecessary clutter.'
      },
      { 
        type: 'text-block',
        body: 'Clarity is seasoning. Without it, everything tastes off.\n\nThe Gino World Jollof Festival, in its quest for a world record, left out that key ingredient in their digital communication, turning what should have been a smooth user experience into a source of anxiety.\n\nThis misstep is a reminder that words reflect brands. When UX writing is done right, it goes beyond just confirming an action; you’re building trust.'
      }
    ]
  },
  
  {
    id: 'writer-2',
    departmentId: 'writer',
    vaultImage: '/assets/jolli-hero.png',
    noMockupBg: true,
    noGlow: true,
    vaultLogo: <img src="/assets/jolli-vault-mockup.png" alt="Jolli App Mockup" style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))' }} />,
    category: 'EVENTS & TRAVEL APP',
    title: 'How I Made an Events & Travel App Speak Before Users Even Tap',
    shortTitle: 'Jolli',
    role: 'UX Writer & Content Designer',
    duration: 'Strategy & MVP',
    platform: 'Mobile App',
    content: [
      { type: 'hero', image: '/assets/jolli-hero.png' },
      { 
        type: 'text-block',
        body: 'If you’ve ever booked a trip, you know the exact moment the excitement stops: you’ve been crowned the Group Chat CFO. Suddenly, you’re tracking money for Airbnb security deposit, sending friendly reminders about overdue payments. That’s not memory-making, it’s accounting.\n\nEnter Jolli. When I first imagined it, I saw a space as lively and inviting as its name suggests. A place where finding the next experience doesn’t come with the usual friction of exorbitant costs. The MVP keeps it simple: installment payments, curated events discovery and a platform for hosts to advertise while paying only per conversion.'
      },
      { 
        type: 'text-block',
        body: 'A lot of people who are interested in fun experiences either scroll endlessly without knowing what fits their interests or get stuck with upfront payments they can’t manage. The app also had multiple functionalities but no framework to guide users through these features. So, I quickly realized that I needed a content strategy that felt alive and fostered trust and transparency without clutter. This was how I tackled the challenge to remove these barriers:'
      },
      { 
        type: 'text-block',
        body: 'Meet Oluwadoyinsola, 28, works a 9–5 and loves to have fun within a budget. Her goals and frustrations guided every decision in this content strategy.'
      },
      { type: 'presentation-slide', image: '/assets/jolli-persona.webp', caption: 'Oluwadoyinsola’s Persona: Goals and pain points informed every tone and structural decision in the app.' },
      { 
        type: 'text-block',
        body: 'Next, I created a full user flow map for the product. This was my favorite part of this project because the map helped me to see how users would move through it. This was how I was able to understand the user’s pain points at every turn and align the content to their intent for using the product.'
      },
      { type: 'presentation-slide', image: '/assets/jolli-flow-1.webp', caption: 'The complete user flow for Jolli, from onboarding to post-booking (Part 1)' },
      { type: 'presentation-slide', image: '/assets/jolli-flow-2.webp', caption: 'The complete user flow for Jolli, from onboarding to post-booking (Part 2)' },
      { type: 'presentation-slide', image: '/assets/jolli-flow-3.webp', caption: 'The complete user flow for Jolli, from onboarding to post-booking (Part 3)' },
      { type: 'presentation-slide', image: '/assets/jolli-tone-map.webp', caption: 'A tone map for Jolli, showing how the voice shifts dynamically across the user’s journey' },
      { 
        type: 'text-block',
        body: '**Core personality:** Jolli sounds friendly, playful, confident, honest, warm, alive and approachable. We speak like the friend who knows how to plan a great time without making it a chore; the one in the group chat saying, “Don’t worry, I already checked the price.”\n\n**We are:** Open, grounded, expressive, people-first.\n\n**We are not:** Corporate, vague, overly cheerful, transactional.\n\nOur goal is to make users feel like they’re part of something exciting and simple, not something they have to “figure out.”\n\n**Tone Dimensions:** The tone shifts depending on where the users are in their journey. Dimensions: Emotion, length, formality and energy.\n\nWe move between short phrases and layered explanations based on what the user needs. Formality is low, but precision is high. When the mood allows, we let a bit of fun in that will be enough to make people smile but never enough to distract them.'
      },
      { 
        type: 'text-block',
        body: '**Onboarding:** sets the tone by being welcoming and encouraging. The goal here is to build trust and reduce hesitation without overselling. Lines like “Welcome to Jolli. You bring the vibes; we’ll handle the rest” “Set up your profile. The faster we know your vibe, the better we can match your kind of fun” would fit.\n\n**Event discovery:** is the fun zone where the energy rises. The tone should fuel curiosity and excitement e.g. “Tap into what’s happening near you.”\n\n**Payment flow:** Here, we slow down and make things simple. The goal is to keep the users confident about their options. e.g. “Pay in parts. No hidden fees. No surprises,” “You’re covered. Pay in parts, enjoy in full.”\n\n**Error messages:** stay kind, empathetic, grounded, solution oriented. The goal is to turn inactivity into opportunity e.g. “Hold up! That didn’t load. Let’s fix it together.” “No plans yet. Let’s find something worth dressing up for.”\n\n**Notifications:** These stay brief, warm, engaging, non-intrusive. Still in the fun zone but they should be personal without being pushy e.g. “Spyro found his wife in the club, but you keep finding excuses. Yours might be at any of these karaoke nights happening this week. Open Jolli.” “Your Jolli plan starts tomorrow. Have you packed your bags… and your energy?”\n\n*(Note: The samples above aren’t the final copy. They’re only meant to capture the feeling and rhythm Jolli’s voice aims for across different touchpoints.)*'
      },
      { 
        type: 'text-block',
        body: '**Inclusive Language:** Jolli speaks to one person, not a crowd. We avoid insider jokes or anything that depends on gender, class or culture. The focus should be connection more than cleverness in most cases.\n\n**Writing Principles:** To ensure every sentence is scannable and accessible, especially on mobile, we follow these guidelines:\n\n* Use sentence case.\n* Keep sentences under 25 words when possible.\n* Skip filler words like “just” or “click here.”\n* Choose verbs that move people (e.g. Book, Explore, Split, Share)\n* Avoid unnecessary punctuation. For instance, exclamation marks belong only in joy, never in guidance.'
      },
      { 
        type: 'text-block',
        body: 'The content for Jolli is built on two pillars: Clarity (achieved through writing principles) and Direction (achieved through structure). I treated the Information Architecture (IA) like a dialogue structure; every screen either asked, answered, or reassured the user.\n\nThe core categories are Discover, Plan, Book & Pay, Host & Earn and Account & Support and the structure follows a simple logic: group related actions, minimize cognitive load, make the next steps obvious. This makes it feel like a good conversation that knows when to pause and when to move forward.'
      },
      { type: 'presentation-slide', image: '/assets/jolli-ia-map.webp', caption: 'Jolli’s Information Architecture organized around five core categories that group related actions, minimize cognitive load, and make next steps obvious.' },
      { 
        type: 'text-block',
        body: 'With the content foundation in place, the next phase focused on translating strategy into the actual experience. I collaborated with a UI designer to bring the interface to life, ensuring every label, tooltip, and notification reflected the same warmth and clarity outlined here.\n\nThe design process involved testing microcopy, refining information hierarchy to make navigation feel effortless, and aligning voice consistency across marketing and in-product touchpoints.\n\nThe goal was to make Jolli usable and also make it feel like a companion in planning, one that kept the excitement alive from the moment you discovered an event or trip to the second you arrived.'
      },
      { 
        type: 'text-block',
        body: 'Working on Jolli taught me that content strategy was more than simply filling screens. It had a lot to do with shaping user behavior. And behavior needed proof. While the interface hadn’t been designed yet, I had already identified what success would look like: faster onboarding, fewer confused support queries, and users who actually chose installment payments because the copy made them feel safe.\n\nStarting from scratch without visuals made me approach UX writing like architecture: the words had to hold shape before the walls existed. Next, they needed to perform.\n\nThe process reminded me that structure and empathy were design tools too; just written ones.'
      }
    ]
  }
];
