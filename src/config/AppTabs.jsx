// ============================================================================
// 💚 Core4.AI – AppTabs (Hybrid Navigation System)
// ----------------------------------------------------------------------------
// • نفس تبويبات أمس (Pricing / Offers / Merchant Hub…)
// • لكن مربوطة بالمسارات الحقيقية الموجودة الآن في App.jsx
// • يعمل مع role-based access + CoreSyncProvider
// ============================================================================

export const appTabs = [

  // 🏠 Home — Available for all roles
  {
    path: "/home",
    label: "Home",
    icon: "🏠",
    roles: ["all"],
  },

  // 💰 Pricing Intelligence (Merchant Only)
  {
    path: "/merchant-pricing",       // Connected to MerchantProductPricing.jsx
    label: "Pricing",
    icon: "💰",
    roles: ["merchant"],
  },

  // 🎁 Offers — Buyer + Creator
  {
    path: "/offers",                 // Currently no Offers page → will redirect to home
    label: "Offers",
    icon: "🎁",
    roles: ["buyer", "creator"],
  },

  // 🎧 Audience — Buyer only
  {
    path: "/audience",               // Connected to Audience.jsx
    label: "Audience",
    icon: "🎧",
    roles: ["buyer"],
  },

  // 💼 Promoter — Creator only
  {
    path: "/promote-and-earn",       // Connected to PromoteAndEarn.jsx
    label: "Promoter",
    icon: "💼",
    roles: ["creator"],
  },

  // 🛒 Merchant Hub — Merchant only
  {
    path: "/merchant-dashboard",     // Connected to MerchantDashboard.jsx
    label: "Merchant Hub",
    icon: "🛒",
    roles: ["merchant"],
  },

  // 💰 Wallet — Available for all (later we add actual page)
  {
    path: "/wallet",                 // no page yet → will redirect to home
    label: "Wallet",
    icon: "💰",
    roles: ["all"],
  },

  // ⚡ PowerBoard — All roles
  {
    path: "/dashboard",              // Connected to Dashboard.jsx
    label: "PowerBoard",
    icon: "⚡",
    roles: ["all"],
  },

  // 💫 Pulse — Creator + Merchant
  {
    path: "/pulse",                  // No actual file yet → safe fallback
    label: "Pulse",
    icon: "💫",
    roles: ["creator", "merchant"],
  },

  // 📊 Analytics — Creator + Merchant
  {
    path: "/analytics",              // Future analytics page
    label: "Analytics",
    icon: "📊",
    roles: ["creator", "merchant"],
  },

  // 🧩 XP — Creator only
  {
    path: "/creator-tour",           // Using CreatorTour as XP home for now
    label: "XP",
    icon: "🧩",
    roles: ["creator"],
  },

  // 🤝 CollabHub — Creator + Merchant
  {
    path: "/tribe-exchange",         // Connected to TribeExchangeHub.jsx
    label: "CollabHub",
    icon: "🤝",
    roles: ["creator", "merchant"],
  },

  // 🧭 Tour — All roles
  {
    path: "/welcome",
    label: "Tour",
    icon: "🧭",
    roles: ["all"],
  },
];
