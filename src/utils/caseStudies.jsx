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
    vaultLogo: <img src="/assets/awwja-logo.png" alt="Awwja" style={{ width: '300px', height: 'auto', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }} />,
    category: 'E-COMMERCE CONCEPT',
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
  
  ...ROLES.flatMap(role => {
    const items = [];
    
    // Fill remaining slots
    let startIndex = 1;
    if (role.id === 'writer') startIndex = 2;
    if (role.id === 'designer') startIndex = 3;
    
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
