// ============================================================================
// 🌙 Core4.AI – AppTabs v4 (2025 Edition)
// Hybrid Navigation System with Role-Based Access
// ============================================================================
// - Clean UTF-8 icons (no corrupted symbols)
// - Integrated Smart BuyerFeed (AI Feed)
// - Role-aware navigation for Buyer / Creator / Merchant
// - Mirrors the UX of the new Navbar v3
// ============================================================================

export const appTabs = [

  // 🏠 Home (All roles)
  {
    path: "/home",
    label: "الرئيسية",
    icon: "🏠",
    roles: ["all"],
  },

  // 🛒 Smart Buyer Feed (Buyer Only)
  {
    path: "/buyer/feed",
    label: "الاقتراحات",
    icon: "🛒",
    roles: ["buyer"],
  },

  // 📊 Pricing Intelligence (Merchant Only)
  {
    path: "/merchant-pricing",
    label: "التسعير",
    icon: "📊",
    roles: ["merchant"],
  },

  // 🎁 Offers (Buyer + Creator)
  {
    path: "/offers",
    label: "العروض",
    icon: "🎁",
    roles: ["buyer", "creator"],
  },

  // 🎧 Audience (Buyer Only)
  {
    path: "/audience",
    label: "الجمهور",
    icon: "🎧",
    roles: ["buyer"],
  },

  // 📣 Promoter (Creator Only)
  {
    path: "/promote-and-earn",
    label: "الترويج",
    icon: "📣",
    roles: ["creator"],
  },

  // 🛍️ Merchant Hub (Merchant Only)
  {
    path: "/merchant-dashboard",
    label: "لوحة التاجر",
    icon: "🛍️",
    roles: ["merchant"],
  },

  // 💰 Wallet (All roles)
  {
    path: "/wallet",
    label: "المحفظة",
    icon: "💰",
    roles: ["all"],
  },

  // ⚡ PowerBoard (All roles)
  {
    path: "/dashboard",
    label: "لوحة القوة",
    icon: "⚡",
    roles: ["all"],
  },

  // 📡 Pulse (Creator + Merchant)
  {
    path: "/pulse",
    label: "النبض",
    icon: "📡",
    roles: ["creator", "merchant"],
  },

  // 📈 Analytics (Creator + Merchant)
  {
    path: "/analytics",
    label: "التحليلات",
    icon: "📈",
    roles: ["creator", "merchant"],
  },

  // 🌀 XP / Creator Tour (Creator Only)
  {
    path: "/creator-tour",
    label: "النقاط",
    icon: "🌀",
    roles: ["creator"],
  },

  // 🤝 CollabHub (Creator + Merchant)
  {
    path: "/tribe-exchange",
    label: "التعاون",
    icon: "🤝",
    roles: ["creator", "merchant"],
  },

  // 🚀 Tour / Welcome (All roles)
  {
    path: "/welcome",
    label: "جولة",
    icon: "🚀",
    roles: ["all"],
  },
];
