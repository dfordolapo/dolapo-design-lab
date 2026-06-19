import { ROLES } from './roles.jsx';

export const CASE_STUDIES = ROLES.flatMap(role => [
  {
    id: `${role.id}-1`,
    departmentId: role.id,
    vaultImage: "/assets/mockup_laptop_vault.png",
    category: "FEATURED PROJECT",
    title: `${role.name} Web Platform`,
    content: [
      { type: "hero", image: "/assets/mockup_laptop_vault.png" },
      { type: "text-block", heading: "The Problem", body: "Mock problem statement for " + role.name }
    ]
  },
  {
    id: `${role.id}-2`,
    departmentId: role.id,
    vaultImage: "/assets/mockup_mobile_vault.png",
    category: "MOBILE APP",
    title: `${role.name} Mobile App`,
    content: [
      { type: "hero", image: "/assets/mockup_mobile_vault.png" },
      { type: "text-block", heading: "UX Overhaul", body: "Mock solution statement for " + role.name }
    ]
  },
  {
    id: `${role.id}-3`,
    departmentId: role.id,
    vaultImage: "/assets/mockup_dashboard_vault.png",
    category: "SaaS PLATFORM",
    title: `${role.name} Analytics Hub`,
    content: [
      { type: "hero", image: "/assets/mockup_dashboard_vault.png" },
      { type: "text-block", heading: "Data Visualization", body: "Mock data visualization for " + role.name }
    ]
  }
]);
