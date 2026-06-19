import { ROLES } from './roles.jsx';

export const CASE_STUDIES = ROLES.flatMap(role => [
  {
    id: `${role.id}-1`,
    departmentId: role.id,
    vaultImage: "/assets/mockup_laptop_vault.png",
    vaultLogo: <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>,
    category: "FEATURED PROJECT",
    title: "Web Platform",
    content: [
      { type: "hero", image: "/assets/mockup_laptop_vault.png" },
      { type: "text-block", heading: "The Problem", body: "Mock problem statement for " + role.name }
    ]
  },
  {
    id: `${role.id}-2`,
    departmentId: role.id,
    vaultImage: "/assets/mockup_mobile_vault.png",
    vaultLogo: <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>,
    category: "MOBILE APP",
    title: "Mobile App",
    content: [
      { type: "hero", image: "/assets/mockup_mobile_vault.png" },
      { type: "text-block", heading: "UX Overhaul", body: "Mock solution statement for " + role.name }
    ]
  },
  {
    id: `${role.id}-3`,
    departmentId: role.id,
    vaultImage: "/assets/mockup_dashboard_vault.png",
    vaultLogo: <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>,
    category: "SaaS PLATFORM",
    title: "Analytics Hub",
    content: [
      { type: "hero", image: "/assets/mockup_dashboard_vault.png" },
      { type: "text-block", heading: "Data Visualization", body: "Mock data visualization for " + role.name }
    ]
  }
]);
