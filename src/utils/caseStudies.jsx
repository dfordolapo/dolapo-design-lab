import React from 'react';
import { ROLES } from './roles.jsx';

export const CASE_STUDIES = [
  // Real Case Study: Scan2Supper
  {
    id: 'writer-1',
    departmentId: 'writer',
    vaultImage: '/assets/mockup_mobile_vault.png',
    vaultLogo: <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>,
    category: 'CONCEPT MOBILE APP',
    title: 'Scan2Supper',
    role: 'UX/UI Design, Illustration',
    duration: '4 weeks',
    platform: 'iOS Concept',
    goal: 'Help users turn available ingredients into meals effortlessly.',
    content: [
      { type: 'hero', image: '/assets/mockup_mobile_vault.png' },
      { 
        type: 'overview',
        text: 'Scan2Supper is a concept mobile app that helps people decide what to cook using ingredients they already have, flipping the typical recipe experience.'
      },
      {
        type: 'text-block',
        heading: 'Killing Decision Fatigue',
        body: 'We\'ve all stared at our fridge wondering what to make. Traditional recipe apps assume you know what you want. Scan2Supper flips the script: scan the ingredients you already have, and it instantly builds a digital pantry and generates matching recipes.'
      },
      {
        type: 'features-list',
        heading: 'Key Features',
        features: [
          { title: 'Ingredient Scanning', desc: 'Auto-detects items via camera to build a digital pantry.' },
          { title: 'Smart Recipes', desc: 'Instantly generates meals based on available ingredients, prioritizing what needs to be used.' },
          { title: 'Step-by-Step Cooking Mode', desc: 'Hands-free navigation through recipe steps, perfect for messy hands.' }
        ]
      },
      {
        type: 'split-block',
        heading: 'Evolving the Experience',
        body: 'What started as a personal solution became a robust system. I had to design recovery paths for blurry scans, allow manual entries, and restructure the navigation from 3 tabs to 5 (adding dedicated Search and Scan actions) to reduce friction.',
        image: '/assets/mockup_laptop_vault.png' // placeholder
      },
      {
        type: 'text-block',
        heading: 'Clarity over Features',
        body: 'I learned to protect the MVP. While I initially wanted grocery integrations and expiry tracking, focusing solely on the "Scan-to-Supper" loop kept the value proposition clear. Additionally, introducing a friendly mascot turned system feedback into moments of delight.'
      }
    ]
  },
  
  {
    id: 'designer-1',
    departmentId: 'designer',
    vaultImage: '/assets/mockup_mobile_vault.png',
    noGlow: true,
    vaultLogo: (
      <svg width="160" height="180" viewBox="0 0 24 30" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#fff" fill="none"></path>
        <path d="M14 10 L10 10 L9 13 L7 13 L7 15 L17 15 L17 13 L15 13 Z" stroke="#fff" strokeWidth="1" fill="none"></path>
        <circle cx="9.5" cy="15.5" r="1" stroke="#fff" fill="#fff"></circle>
        <circle cx="14.5" cy="15.5" r="1" stroke="#fff" fill="#fff"></circle>
        <path d="M9 13 L15 13" stroke="#fff" strokeWidth="0.5"></path>
        <text x="12" y="28" textAnchor="middle" fontSize="2.5" fontWeight="bold" fill="#fff" stroke="none" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>SAFERIDE MODE</text>
      </svg>
    ),
    category: 'UX EXPLORATION',
    title: 'SafeRide Mode™',
    role: 'Product Design, UX Research',
    duration: 'Exploration',
    platform: 'Mobile App',
    goal: 'Reduce rider anxiety and uncertainty during nighttime rides through proactive safety signals.',
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
    vaultImage: '/assets/mockup_laptop_vault.png',
    noGlow: true,
    vaultLogo: <img src="/assets/awwja-logo.png" alt="Awwja" style={{ width: '250px', height: 'auto', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }} />,
    category: 'E-COMMERCE APP',
    title: 'Awwja',
    role: 'Product Design, Branding',
    duration: 'Ongoing',
    platform: 'Web App',
    goal: 'Design a vibrant, multi-vendor marketplace platform.',
    content: [
      { type: 'hero', image: '/assets/mockup_laptop_vault.png' },
      { 
        type: 'text-block',
        heading: 'Project Overview',
        body: 'Details for this case study will be added later.'
      }
    ]
  },
  
  {
    id: 'designer-3',
    departmentId: 'designer',
    vaultImage: '/assets/mockup_laptop_vault.png',
    noGlow: true,
    vaultLogo: <img src="/assets/vurdict-logo.png" alt="Vurdict" style={{ width: '450px', height: 'auto', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }} />,
    category: 'AI-POWERED APP',
    title: 'Vurdict',
    role: 'Product Design',
    duration: 'Ongoing',
    platform: 'Web Platform',
    goal: 'Build a comprehensive review and analytics platform.',
    content: [
      { type: 'hero', image: '/assets/mockup_laptop_vault.png' },
      { 
        type: 'text-block',
        heading: 'Project Overview',
        body: 'Details for this case study will be added later.'
      }
    ]
  },
  
  {
    id: 'builder-1',
    departmentId: 'builder',
    vaultImage: '/assets/mockup_laptop_vault.png',
    noGlow: true,
    vaultLogo: <img src="/assets/vurdict-logo.png" alt="Vurdict" style={{ width: '450px', height: 'auto', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }} />,
    category: 'AI-POWERED APP',
    title: 'Vurdict',
    role: 'Full-Stack Development',
    duration: 'Ongoing',
    platform: 'Web Platform',
    goal: 'Build a comprehensive review and analytics platform.',
    content: [
      { type: 'hero', image: '/assets/mockup_laptop_vault.png' },
      { 
        type: 'text-block',
        heading: 'Project Overview',
        body: 'Details for this case study will be added later.'
      }
    ]
  },
  
  {
    id: 'writer-1',
    departmentId: 'writer',
    vaultImage: '/assets/mockup_laptop_vault.png',
    noGlow: true,
    vaultLogo: <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}>Gino Jollof <br/> Festival</div>,
    category: 'UX WRITING',
    title: 'Gino Jollof Festival',
    role: 'UX Writer',
    duration: 'Audit & Redesign',
    platform: 'Email Communications',
    goal: 'Analyze and redesign confusing vendor confirmation emails for a Guinness World Record event.',
    content: [
      { type: 'hero', image: '/assets/gino-before-after.webp' },
      { 
        type: 'text-block',
        heading: 'Clarity is the ingredient they forgot.',
        body: 'When someone gets a confirmation email, it should mean one thing: the matter is settled. No extra guesswork.\n\nThat’s why the vendor emails for the Gino World Jollof Festival stood out to me. They’re a masterclass in how a brand can unintentionally create confusion and doubt, all through a few poor UX writing decisions.\n\nLet’s break down the emails that were sent and see where the user experience went wrong.'
      },
      { type: 'presentation-slide', image: '/assets/gino-1.webp', caption: 'Email 1: False Alarm' },
      { 
        type: 'text-block',
        heading: 'Email 1: False Alarm',
        body: 'The first email told vendors their registration was confirmed and provided a “vendor registration number” to gain access to the event. A clear green light. The copy makes it sound like a done deal.'
      },
      { type: 'presentation-slide', image: '/assets/gino-2.webp', caption: 'Email 2: The Belated Clarification' },
      { 
        type: 'text-block',
        heading: 'Email 2: The Belated Clarification',
        body: 'Then, in some cases, a day or more later, a second email arrived saying there would be a selection process after all.\n\nThat shift left vendors in limbo as some had already shared with their audiences that they would be at the event. First, they were “in.” Then, they were “maybe.” This is the most damaging part of the user journey.'
      },
      { 
        type: 'text-block',
        heading: 'The Flaws',
        body: '**The “Undefined” Problem:** Addressing the user as “Dear undefined” is a glaring technical and UX error. It is a jarring, impersonal greeting, and showed a lack of personalization and care. This was an immediate red flag to me.\n\n**The Timing Gap:** The delayed delivery of the clarifying information is a significant user experience flaw. It suggests a disorganized process and leaves the users in a state of uncertainty for an extended period.\n\n**The Unnecessary Two-Step:** While the second email is more accurate, the fact that it was needed to correct the mistakes of the first one is a major UX failure. The user journey is filled with friction and uncertainty due to the lack of a clear, single source of truth in the communication flow.'
      },
      { type: 'presentation-slide', image: '/assets/gino-3.webp', caption: 'The Solution: A Better Approach' },
      { 
        type: 'text-block',
        heading: 'Key Improvements',
        body: 'A better approach would have been a single, well-crafted email with a clear subject line, human-centered copy, full disclosure, and no contradictions.\n\n**Personalized & Professional:** I removed “Dear undefined,” addressed the user by their name, and used a friendly yet formal tone.\n\n**Honesty Upfront:** The email sets the correct expectation from the start by removing the misleading language.\n\n**Clear Next Steps:** It clearly states that applications are “currently under review” and provides a timeframe (“within 48 hours”). This manages user expectations and gives them a sense of control over the process.\n\n**A Safety Net:** The most powerful part of this rewrite is the inclusion of “If your application isn’t approved, you’re still welcome to attend the event as a guest.” This is a fantastic example of empathetic UX writing. It provides a positive alternative and shows the brand values every user, regardless of their application status.\n\n**Thoughtful Design:** I also removed the irrelevant “Register via:” text from the bottom of the graphic. This small but important detail shows the user is no longer in the “registration” phase. It cleans up the design and removes unnecessary clutter.'
      },
      { 
        type: 'text-block',
        heading: 'Takeaway',
        body: 'Clarity is seasoning. Without it, everything tastes off.\n\nThe Gino World Jollof Festival, in its quest for a world record, left out that key ingredient in their digital communication, turning what should have been a smooth user experience into a source of anxiety.\n\nThis misstep is a reminder that words reflect brands. When UX writing is done right, it goes beyond just confirming an action; you’re building trust.'
      }
    ]
  },
  
  ...ROLES.flatMap(role => {
    const items = [];
    
    // Fill remaining slots
    let startIndex = 1;
    if (role.id === 'writer') startIndex = 2;
    if (role.id === 'designer') startIndex = 4;
    if (role.id === 'builder') startIndex = 2;
    
    for (let i = startIndex; i <= 3; i++) {
      const isMobile = i % 2 === 0;
      items.push({
        id: `${role.id}-${i}`,
        departmentId: role.id,
        vaultImage: isMobile ? "/assets/mockup_mobile_vault.png" : "/assets/mockup_laptop_vault.png",
        vaultLogo: isMobile 
          ? <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
          : <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>,
        category: isMobile ? "MOBILE APP" : "WEB PLATFORM",
        title: `${role.name} Project ${i}`,
        role: role.name,
        duration: '12 weeks',
        platform: isMobile ? 'iOS / Android' : 'Web',
        goal: `A conceptual goal for ${role.name}.`,
        content: [
          { type: "hero", image: isMobile ? "/assets/mockup_mobile_vault.png" : "/assets/mockup_laptop_vault.png" },
          { type: "text-block", heading: "The Problem", body: "Mock problem statement for " + role.name }
        ]
      });
    }
    
    return items;
  })
];
