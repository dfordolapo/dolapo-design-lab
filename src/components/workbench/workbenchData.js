/**
 * WORKBENCH DATA - Genuine Tools Used by Dolapo
 * Organized into exactly four drawers:
 * 1. Design (Warm Golden Yellow)
 * 2. Build (Coral Pink)
 * 3. AI Stack (Lavender Purple)
 * 4. Ship (Muted Olive Green)
 */

export const WORKBENCH_DRAWERS = [
  {
    id: 'design',
    number: '01',
    name: 'Design',
    themeColor: '#F5B731',
    gradient: 'linear-gradient(180deg, #FAD768 0%, #F5B731 42%, #DF9810 100%)',
    borderColor: '#C48107',
    tagBg: '#FFF3C4',
    tagColor: '#6B4700',
    iconType: 'pencil',
    tools: [
      {
        id: 'figma',
        name: 'Figma',
        category: 'Design',
        badge: 'UI/UX & Prototyping',
        shortDesc: 'My main tool for interface design, prototyping, and collaboration.',
        description:
          'My primary environment for UI/UX design, interactive prototyping, and cross-functional collaboration. I use Figma to explore product ideas, construct responsive interfaces, build reusable token-driven design systems, and work alongside clients and developers in real time.',
        howIUseIt: [
          'Designing intuitive interfaces, responsive components, and end-to-end user flows.',
          'Exploring and rapidly refining product ideas with interactive prototypes.',
          'Creating scalable design systems with variables, autolayout, and design tokens.',
          'Collaborating seamlessly with clients, stakeholders, and engineering teams.'
        ]
      },
      {
        id: 'figjam',
        name: 'FigJam',
        category: 'Design',
        badge: 'Workshops & IA',
        shortDesc: 'Digital whiteboard for user flows, empathy maps, and architecture diagrams.',
        description:
          'An infinite digital whiteboard space for high-level conceptual thinking, user journey mapping, and collaborative research synthesis before jumping into wireframes.',
        howIUseIt: [
          'Mapping out complex information architecture and decision trees.',
          'Synthesizing customer discovery findings, user pain points, and personas.',
          'Facilitating asynchronous feedback rounds and product scoping sessions.'
        ]
      },
      {
        id: 'framer',
        name: 'Framer',
        category: 'Design',
        badge: 'Interaction Physics',
        shortDesc: 'High-fidelity prototyping with spring physics and production motion.',
        description:
          'Used to build micro-interactions, gesture-driven prototypes, and fluid interactive proofs-of-concept that look and behave identically to native production apps.',
        howIUseIt: [
          'Prototyping advanced spring physics, swipe gestures, and tactile animations.',
          'Testing micro-interactions and scroll animations with users before coding.',
          'Bridging the design-to-engineering gap with production-grade motion specs.'
        ]
      },
      {
        id: 'photoshop',
        name: 'Photoshop',
        category: 'Design',
        badge: 'Asset Craft & Texture',
        shortDesc: 'Editorial image crafting, tactile texture development, and visual assets.',
        description:
          'The workbench tool for raster craft: creating tactile paper and film textures, enhancing product photography, and giving digital mockups an authentic tactile feel.',
        howIUseIt: [
          'Crafting bespoke tactile paper textures, shadow overlays, and subtle grain.',
          'Retouching photography and composing high-impact portfolio hero slides.',
          'Optimizing visual assets for crisp high-density display delivery.'
        ]
      }
    ]
  },
  {
    id: 'build',
    number: '02',
    name: 'Build',
    themeColor: '#F56E72',
    gradient: 'linear-gradient(180deg, #FA9497 0%, #F56E72 42%, #E04E53 100%)',
    borderColor: '#BF2B31',
    tagBg: '#FFE2E3',
    tagColor: '#7A1217',
    iconType: 'code',
    tools: [
      {
        id: 'github',
        name: 'GitHub',
        category: 'Build',
        badge: 'Version Control',
        shortDesc: 'Source code management, collaboration, and repository architecture.',
        description:
          'The core source code management hub for tracking changes, managing feature branches, conducting pull-request code reviews, and automating continuous deployment pipelines.',
        howIUseIt: [
          'Managing clean feature branches, releases, and version histories.',
          'Reviewing pull requests, inspecting diffs, and maintaining code standards.',
          'Triggering automated CI/CD build checks and deployment previews.'
        ]
      },
      {
        id: 'html-css',
        name: 'HTML & CSS',
        category: 'Build',
        badge: 'Semantic Web & Tokens',
        shortDesc: 'Semantic markup architecture and bespoke CSS design token systems.',
        description:
          'The bedrock of web development. I focus on clean, semantic HTML5 structure paired with modular Vanilla CSS, design tokens, fluid clamp sizing, and zero layout shift.',
        howIUseIt: [
          'Architecting accessible, semantic HTML5 document structures and landmarks.',
          'Authoring bespoke CSS design systems with CSS custom properties and tokens.',
          'Crafting custom keyframe animations, micro-interactions, and responsive layouts.'
        ]
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        category: 'Build',
        badge: 'ES6+ Logic & Physics',
        shortDesc: 'Modern ES6+ for state management, gesture handlers, and web APIs.',
        description:
          'Modern JavaScript powers the interactive engines behind my digital products: event handling, state synchronization, client-side calculations, and smooth interactive physics.',
        howIUseIt: [
          'Building reactive state containers and event-driven user interactions.',
          'Implementing drag, scroll, and tilt physics with performant listeners.',
          'Connecting frontend components to REST/JSON APIs and local storage.'
        ]
      },
      {
        id: 'react-next',
        name: 'React & Next.js',
        category: 'Build',
        badge: 'Component Architecture',
        shortDesc: 'Modular UI engineering and full-stack React application frameworks.',
        description:
          'My primary frontend framework for shipping performant web applications like NailExpress and Vurdict, leveraging reusable components, hooks, and Server Components.',
        howIUseIt: [
          'Building modular, maintainable component systems with clean unidirectional data flow.',
          'Optimizing page speed, code-splitting, and routing with the Next.js App Router.',
          'Creating responsive state-driven experiences with smooth client transitions.'
        ]
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        category: 'Build',
        badge: 'Strict Typing & Contracts',
        shortDesc: 'Typed superset of JavaScript providing robust type safety across web and mobile apps.',
        description:
          'Provides full type safety, contract guarantees, and autocomplete productivity across full-stack applications like Vurdict, Skinfolio, and NailExpress. It catches runtime errors before deployment.',
        howIUseIt: [
          'Defining end-to-end type contracts between frontend UI and backend API responses.',
          'Powering component props, generic state hooks, and strict domain models.',
          'Refactoring large multi-screen applications safely with zero regressions.'
        ]
      },
      {
        id: 'react-native',
        name: 'React Native & Expo',
        category: 'Build',
        badge: 'Cross-Platform Mobile',
        shortDesc: 'Native iOS & Android mobile application development with Expo Router and Reanimated.',
        description:
          'Used to engineer fluid, cross-platform mobile experiences like Skinfolio and eto54, combining native gesture handling, haptics, and responsive screen architectures.',
        howIUseIt: [
          'Building gesture-driven mobile screens with React Native Reanimated.',
          'Implementing cross-platform navigation and deep links with Expo Router.',
          'Leveraging native device APIs for camera scanning, haptics, and secure storage.'
        ]
      },
      {
        id: 'python',
        name: 'Python',
        category: 'Build',
        badge: 'Scripting & Automation',
        shortDesc: 'Utility scripting for background image removal, asset automation, and data processing.',
        description:
          'My go-to scripting language for asset processing pipelines, color-key background removal, batch conversions, and automated file workflows.',
        howIUseIt: [
          'Writing custom automation scripts for asset pipeline preprocessing.',
          'Automated chroma-keying and background elimination on portfolio imagery.',
          'Rapid data parsing and batch transformation tasks.'
        ]
      }
    ]
  },
  {
    id: 'ai-assist',
    number: '03',
    name: 'AI Stack',
    themeColor: '#A976F5',
    gradient: 'linear-gradient(180deg, #C7A2FC 0%, #A976F5 42%, #8B4EE6 100%)',
    borderColor: '#6F28D4',
    tagBg: '#F3E8FF',
    tagColor: '#4A1296',
    iconType: 'sparkle',
    tools: [
      {
        id: 'antigravity',
        name: 'Antigravity',
        category: 'AI Stack',
        badge: 'Agentic Coding',
        shortDesc: "Google DeepMind's advanced agentic coding environment for full-stack engineering.",
        description:
          'My primary pair-programming engine for accelerated development. It allows me to move from high-level architectural ideas directly into validated, tested production code.',
        howIUseIt: [
          'Scaffolding complete components, design systems, and responsive pages from specs.',
          'Executing deep, multi-file code refactors and CSS polish loops autonomously.',
          'Running automated browser validation and real-time end-to-end testing.'
        ]
      },
      {
        id: 'claude',
        name: 'Claude',
        category: 'AI Stack',
        badge: 'Architecture & Reasoning',
        shortDesc: 'Deep reasoning, system design synthesis, and precision UX copy refinement.',
        description:
          'Anthropic’s model for complex architectural analysis, logical trade-off evaluation, and high-clarity UX writing and documentation refinement.',
        howIUseIt: [
          'Synthesizing user research transcripts into crisp UX problem statements.',
          'Reasoning through complex business logic and database schema trade-offs.',
          'Polishing microcopy, error states, and onboarding guidance for clarity.'
        ]
      },
      {
        id: 'gemini',
        name: 'Gemini',
        category: 'AI Stack',
        badge: 'Multimodal Synthesis',
        shortDesc: 'Multimodal AI for visual code translation, layout audit, and creative exploration.',
        description:
          'Google’s multimodal engine used to inspect visual mockups, analyze responsive layout breakdowns, test copy variants, and generate helpful utility functions.',
        howIUseIt: [
          'Auditing visual layouts and comparing coded interfaces to design mockups.',
          'Generating realistic localized placeholder data and edge-case test copy.',
          'Synthesizing quick utility functions, regex patterns, and data transforms.'
        ]
      },
      {
        id: 'opencode',
        name: 'OpenCode',
        category: 'AI Stack',
        badge: 'CLI & Automation',
        shortDesc: 'Terminal-based scripting, automated pipelines, and fast code transformation.',
        description:
          'Terminal and CLI-driven AI workflow automation used for repetitive boilerplate tasks, generating mock APIs, and running batch transformations across asset collections.',
        howIUseIt: [
          'Writing bespoke shell scripts and asset optimization batch pipelines.',
          'Generating test mocks and data fixtures for rapid component prototyping.',
          'Accelerating terminal-driven refactoring and automated file management.'
        ]
      },
      {
        id: 'chatgpt',
        name: 'ChatGPT',
        category: 'AI Stack',
        badge: 'Ideation & Prototyping',
        shortDesc: 'Fast conversational ideation, code snippet generation, and algorithmic brainstorming.',
        description:
          'OpenAI’s flagship conversational intelligence engine used for rapid prototyping, drafting technical specs, exploring user flows, and brainstorming solutions.',
        howIUseIt: [
          'Rapidly prototyping algorithms, data transformations, and utility functions.',
          'Brainstorming alternate UX flow models and handling tricky product edge cases.',
          'Comparing copy tone variations and stress-testing system assumptions.'
        ]
      },
      {
        id: 'deepseek',
        name: 'DeepSeek',
        category: 'AI Stack',
        badge: 'Reasoning & Logic',
        shortDesc: 'Deep mathematical logic, code synthesis, and architectural cost optimization.',
        description:
          'DeepSeek’s specialized reasoning models for complex mathematical computations, algorithmic optimization, and deeply analytical code synthesis.',
        howIUseIt: [
          'Solving complex algorithmic puzzles, coordinate math, and geometry calculations.',
          'Optimizing data structures and evaluating algorithmic computational complexity.',
          'Analyzing performance bottlenecks across complex client-side renders.'
        ]
      },
      {
        id: 'codex',
        name: 'Codex',
        category: 'AI Stack',
        badge: 'Code Synthesis',
        shortDesc: 'Contextual autocomplete, inline code generation, and syntactic suggestions.',
        description:
          'OpenAI’s dedicated code intelligence engine powering inline autocomplete, rapid syntax completion, and API usage boilerplate.',
        howIUseIt: [
          'Speeding up typing with intelligent inline code completions.',
          'Translating plain English comments into working functional methods.',
          'Filling in boilerplate API calls and typing parameters accurately.'
        ]
      },
      {
        id: 'kiro',
        name: 'Kiro',
        category: 'AI Stack',
        badge: 'Workflow Intelligence',
        shortDesc: 'Specialized workflow intelligence, agent orchestration, and task automation.',
        description:
          'A tailored AI assistant for streamlined developer workflows, context-aware command automation, and multi-agent coordination.',
        howIUseIt: [
          'Automating repetitive workspace routines and project setup scaffolds.',
          'Orchestrating agent workflows and summarizing multi-file project contexts.',
          'Assisting in task breakdown and engineering execution sprints.'
        ]
      }
    ]
  },
  {
    id: 'ship',
    number: '04',
    name: 'Ship',
    themeColor: '#92CB61',
    gradient: 'linear-gradient(180deg, #B5E58C 0%, #92CB61 42%, #72AD3E 100%)',
    borderColor: '#528923',
    tagBg: '#ECFDF5',
    tagColor: '#1E460E',
    iconType: 'package',
    tools: [
      {
        id: 'vercel',
        name: 'Vercel',
        category: 'Ship',
        badge: 'Edge Hosting & CDN',
        shortDesc: 'Zero-config global edge deployment, preview branches, and instant delivery.',
        description:
          'The hosting and continuous deployment platform for all my live web products. It delivers lightning-fast edge CDN distribution, automated preview URLs, and rock-solid uptime.',
        howIUseIt: [
          'Deploying production builds automatically with zero downtime or maintenance windows.',
          'Sharing shareable preview deployments with stakeholders on every Git commit.',
          'Monitoring edge latency, web vitals, and production analytics in real time.'
        ]
      },
      {
        id: 'supabase',
        name: 'Supabase',
        category: 'Ship',
        badge: 'PostgreSQL & Storage',
        shortDesc: 'Production PostgreSQL database, secure storage buckets, and auth.',
        description:
          'The open-source backend suite powering full-stack products like NailExpress. It provides relational PostgreSQL storage, cloud media buckets, and instant row-level security.',
        howIUseIt: [
          'Managing structured relational tables for orders, inventory, and waitlists.',
          'Storing and streaming customer photo uploads via secure cloud storage buckets.',
          'Enforcing row-level security policies to keep user data strictly isolated.'
        ]
      },
      {
        id: 'sql',
        name: 'SQL & Database',
        category: 'Ship',
        badge: 'Relational Architecture',
        shortDesc: 'Relational database schema modeling, queries, and migrations.',
        description:
          'Relational database architecture, queries, and automated migration scripts powering products like NailExpress and Vurdict.',
        howIUseIt: [
          'Designing normalized relational schemas and foreign key relationship models.',
          'Writing efficient transactional queries and database triggers.',
          'Managing automated database migration files and schema rollback scripts.'
        ]
      },
      {
        id: 'resend',
        name: 'Resend',
        category: 'Ship',
        badge: 'Transactional Email',
        shortDesc: 'Developer-first email delivery infrastructure and recovery engines.',
        description:
          'The email delivery engine used in NailExpress and Gino audit projects to send reliable transactional notifications, order confirmations, and abandoned-cart recovery sequences.',
        howIUseIt: [
          'Dispatching responsive HTML lifecycle emails with 99%+ deliverability.',
          'Powering automated abandoned checkout recovery loops and merchant alerts.',
          'Sending instant restock alerts to customers who joined back-in-stock waitlists.'
        ]
      }
    ]
  }
];
