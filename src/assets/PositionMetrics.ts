export interface RolePlacementMetrics {
  title: string;
  department: string;
  zone: string;
  facing: string;
  advantage: string;
  allocatedFunding: string;
}

export const POSITION_PLACEMENT_MATRIX: Record<string, RolePlacementMetrics> = {
  // --- TECH & ENGINEERING SECTOR ---
  FULL_STACK: {
    title: "Full Stack Developer",
    department: "Engineering & Core Infrastructure",
    zone: "Southeast or North",
    facing: "North or East",
    advantage: "Attracts operational stability, logic precision, and structural prosperity.",
    allocatedFunding: "$145,000"
  },
  UI_UX: {
    title: "UI/UX Designer",
    department: "Creative & Design",
    zone: "West",
    facing: "North or East",
    advantage: "Maximizes spatial imagination, interface intuition, and fluid creativity.",
    allocatedFunding: "$115,000"
  },
  DEVOPS: {
    title: "DevOps Engineer",
    department: "Infrastructure & Deployment",
    zone: "Northwest",
    facing: "North or East",
    advantage: "Drives continuous integration momentum, uptime initiative, and proactive monitoring energy.",
    allocatedFunding: "$150,000"
  },

  // --- NON-TECH SECTOR (NEW ADDITIONS) ---
  HR_MANAGER: {
    title: "Human Resources Manager",
    department: "People Operations & Recruitment",
    zone: "North or East",
    facing: "North or East",
    advantage: "Optimizes team workflow efficiency, targeted productivity, and focused employee onboarding.",
    allocatedFunding: "$90,000"
  },
  ACCOUNTANT: {
    title: "Senior Accountant / Financial Analyst",
    department: "Finance & Corporate Audit",
    zone: "Southeast or North",
    facing: "North or East",
    advantage: "Secures financial stability, ledger accuracy, and capital prosperity.",
    allocatedFunding: "$105,000"
  },
  SALES_LEAD: {
    title: "Sales & Account Executive",
    department: "Business Revenue & Sales Growth",
    zone: "Southeast or North",
    facing: "North or East",
    advantage: "Attracts high-value contract closures, revenue scalability, and financial growth.",
    allocatedFunding: "$85,000 + Commission"
  },
  MARKETING_STRATEGIST: {
    title: "Growth Marketing Manager",
    department: "Brand Outreach & Business Development",
    zone: "Northwest",
    facing: "North or East",
    advantage: "Sparks dynamic launch energy, proactive growth hacking, and market initiative.",
    allocatedFunding: "$98,000"
  },
  OFFICE_ADMIN: {
    title: "Office Administrator / Coordinator",
    department: "General Administrative Operations",
    zone: "North or East",
    facing: "North or East",
    advantage: "Maintains smooth day-to-day operations, task completion, and general workplace order.",
    allocatedFunding: "$65,000"
  },

  // --- EXECUTIVE SECTOR ---
  CHIEF_EXECUTIVE: {
    title: "Managing Director / CEO",
    department: "Executive Leadership Board",
    zone: "Southwest, South, or West",
    facing: "North or East",
    advantage: "Enhances long-term high-level strategic decision-making and platform leadership skills.",
    allocatedFunding: "Executive Board Allocation"
  }
};