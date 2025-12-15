// ============================================================================
// 💎 InfluenceScoreContext.jsx — FULL v8 MASTER BUILD
// Includes: Boosters + Tribe Loop + Behavior Engine + Predictive AI +
// Conversion Engine + Smart Insights + Cross-Boosting
// ============================================================================

import { createContext, useContext, useEffect, useState } from "react";

const InfluenceScoreContext = createContext();
export const useInfluence = () => useContext(InfluenceScoreContext);

export function InfluenceScoreProvider({ children }) {
  const [influence, setInfluence] = useState({
    // ========================= BASIC METRICS =========================
    score: 150,
    xp: 45,
    xpToNext: 100,
    tier: "Bronze",
    reputation: 15,
    tokens: 340,

    // ========================= TRIBE METRICS =========================
    tribePower: 40,
    tribeTokens: 58,
    tribeMembers: 120,
    tribeRank: 8,
    tribeMood: "متحفّزة",
    tribeStrength: 0,
    tribeScore: 0,

    // ========================= INFLUENCE METRICS ======================
    conversions: 126,
    reach: 18200,
    growth: 0.14,

    topContent: [
      { id: 1, title: "أفضل روتين صباحي", reach: 5400, category: "lifestyle" },
      { id: 2, title: "مراجعتي لسماعات X3", reach: 4200, category: "tech" },
      { id: 3, title: "فتح صندوق Eco Bottle", reach: 3100, category: "eco" },
    ],
  });

  // ==========================================================================
  // 💥 Multi-Boost System
  // ==========================================================================
  const [activeBoosts, setActiveBoosts] = useState({
    xp2x:     { active: false, expiresAt: null, multiplier: 2 },
    audience: { active: false, expiresAt: null, bonus: 500 },
    reach:    { active: false, expiresAt: null, multiplier: 1.2 },
    tribe:    { active: false, expiresAt: null, bonus: 15 },
  });

  // ==========================================================================
  // 🟣 STEP 8.1 — Conversion Score Engine
  // ==========================================================================
  const calculateConversionScore = () => {
    const { reach, conversions, tribePower, growth, score } = influence;
    let cs = 0;

    if (reach > 10000) cs += 20;
    if (reach > 20000) cs += 40;

    const convRate = conversions / (reach || 1);
    if (convRate > 0.005) cs += 20;
    if (convRate > 0.01) cs += 40;

    if (tribePower > 80) cs += 20;
    if (tribePower > 120) cs += 30;

    if (growth > 0.10) cs += 15;
    if (growth > 0.15) cs += 25;

    if (score > 2000) cs += 20;
    if (score > 4000) cs += 40;

    return Math.round(cs);
  };

  // ==========================================================================
  // 🟣 STEP 8.2 — Product Fit Analysis
  // ==========================================================================
  const analyzeProductFit = (product) => {
    const { topContent, tribeMood, growth } = influence;
    let fit = 0;

    if (topContent.some((c) => c.category === product.category)) fit += 40;
    if (tribeMood === "نشيطة 🔥") fit += 20;
    if (tribeMood === "قوية جدًا ⚡") fit += 30;
    if (growth > 0.12) fit += 20;

    return fit;
  };

  // ==========================================================================
  // 🟣 STEP 8.3 — Conversion Prediction
  // ==========================================================================
  const predictConversion = (product) => {
    const conversionScore = calculateConversionScore();
    const fit = analyzeProductFit(product);
    return Math.round(conversionScore * 0.6 + fit * 0.4);
  };

  // ==========================================================================
  // 🟣 Boost Expiration Auto-Reset
  // ==========================================================================
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setActiveBoosts((prev) => {
        const updated = { ...prev };
        Object.keys(prev).forEach((key) => {
          if (prev[key].active && prev[key].expiresAt <= now) {
            updated[key] = { ...prev[key], active: false, expiresAt: null };
          }
        });
        return updated;
      });
    }, 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  // ==========================================================================
  // 🟣 Boost Activation Functions
  // ==========================================================================
  const activateXPBoost = () => {
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
    setActiveBoosts((prev) => ({
      ...prev,
      xp2x: { ...prev.xp2x, active: true, expiresAt },
    }));
  };

  const activateAudienceBoost = () => {
    const expiresAt = Date.now() + 12 * 60 * 60 * 1000;
    setActiveBoosts((prev) => ({
      ...prev,
      audience: { ...prev.audience, active: true, expiresAt },
    }));

    setInfluence((prev) => ({
      ...prev,
      reach: prev.reach + 500,
      growth: prev.growth + 0.05,
    }));

    recalcScore();
  };

  const activateReachBoost = () => {
    const expiresAt = Date.now() + 12 * 60 * 60 * 1000;
    setActiveBoosts((prev) => ({
      ...prev,
      reach: { ...prev.reach, active: true, expiresAt },
    }));

    setInfluence((prev) => ({
      ...prev,
      reach: Math.floor(prev.reach * 1.2),
      growth: prev.growth + 0.03,
    }));

    recalcScore();
  };

  const activateTribeBoost = () => {
    const expiresAt = Date.now() + 48 * 60 * 60 * 1000;
    setActiveBoosts((prev) => ({
      ...prev,
      tribe: { ...prev.tribe, active: true, expiresAt },
    }));

    setInfluence((prev) => {
      const newPower = prev.tribePower + 15;
      let mood = "متحفّزة";
      if (newPower > 80) mood = "نشيطة 🔥";
      if (newPower > 120) mood = "قوية جدًا ⚡";

      return { ...prev, tribePower: newPower, tribeMood: mood };
    });

    recalcScore();
  };

  // ==========================================================================
  // 🟣 XP Gain
  // ==========================================================================
  const gainXP = (amount) => {
    const finalXP = activeBoosts.xp2x.active ? amount * 2 : amount;

    setInfluence((prev) => {
      let newXP = prev.xp + finalXP;
      let tier = prev.tier;

      if (newXP >= prev.xpToNext) {
        newXP -= prev.xpToNext;

        if (tier === "Bronze") tier = "Silver";
        else if (tier === "Silver") tier = "Gold";
        else if (tier === "Gold") tier = "Platinum";
      }

      return { ...prev, xp: newXP, tier };
    });

    recalcScore();
  };

  // ==========================================================================
  // 🟣 Tribe Calculation
  // ==========================================================================
  const recalcTribe = () => {
    setInfluence((prev) => {
      const strength =
        prev.tribePower * 2 +
        prev.tribeMembers * 0.4 +
        (15 - prev.tribeRank) * 12 +
        (prev.tribeMood === "قوية جدًا ⚡" ? 20 : 0);

      return {
        ...prev,
        tribeStrength: Math.round(strength),
        tribeScore: Math.round(strength * 1.5),
      };
    });
  };

  useEffect(() => {
    recalcTribe();
  }, [
    influence.tribePower,
    influence.tribeMembers,
    influence.tribeRank,
    influence.tribeMood,
  ]);

  // ==========================================================================
  // 🟣 SCORE RE-CALC
  // ==========================================================================
  const recalcScore = () => {
    setInfluence((prev) => {
      const score =
        prev.xp * 1.2 +
        prev.reach * 0.02 +
        prev.growth * 120 +
        prev.reputation * 4 +
        prev.tribePower * 5 +
        prev.tribeMembers * 0.3 +
        (15 - prev.tribeRank) * 8;

      return { ...prev, score: Math.round(score) };
    });
  };

  // ==========================================================================
  // 🟣 Behavior Engine (Phase 6)
  // ==========================================================================
  const extractBehaviorMetrics = () => {
    const {
      xp,
      reach,
      growth,
      tribePower,
      tribeMembers,
      tribeRank,
      topContent,
      conversions,
      score,
    } = influence;

    const metrics = {
      workEthic: 0,
      growthMind: 0,
      tribalLoyalty: 0,
      contentFocus: 0,
      momentumSeeking: 0,
    };

    if (xp > 80) metrics.workEthic += 30;
    if (xp > 150) metrics.workEthic += 50;

    if (growth > 0.10) metrics.growthMind += 25;
    if (growth > 0.15) metrics.growthMind += 45;

    if (tribePower > 60) metrics.tribalLoyalty += 25;
    if (tribeRank < 5) metrics.tribalLoyalty += 35;

    const top = topContent[0];
    if (top.reach > 4000) metrics.contentFocus += 30;

    if (reach > 20000) metrics.momentumSeeking += 20;
    if (score > 3000) metrics.momentumSeeking += 40;

    return metrics;
  };

  const classifyInfluencer = () => {
    const m = extractBehaviorMetrics();

    const profiles = [
      { type: "The Builder — البنّاء", value: m.workEthic * 1.1 },
      { type: "The Explorer — المستكشف", value: m.growthMind * 1.2 },
      { type: "The Commander — القائد القبلي", value: m.tribalLoyalty * 1.3 },
      { type: "The Creator — صانع المحتوى", value: m.contentFocus * 1.15 },
      { type: "The Momentum Rider — راكب الزخم", value: m.momentumSeeking * 1.25 },
    ];

    profiles.sort((a, b) => b.value - a.value);
    return profiles[0];
  };

// ============================================================================
// 🟣 PHASE 9 — PRODUCT MATCHING ENGINE
// ============================================================================

// 1) تحليل المنتج
const analyzeProductProfile = (product) => {
  let profileScore = 0;

  if (product.brandPower > 50) profileScore += 20;
  if (product.brandPower > 80) profileScore += 40;

  if (influence.topContent.some((c) => c.category === product.category))
    profileScore += 35;

  if (product.price > 200) profileScore += 15;
  if (product.price > 500) profileScore += 25;

  return profileScore;
};


// 2) درجة الملائمة بين المؤثر والمنتج
const calculateFitScore = (product) => {
  const productProfile = analyzeProductProfile(product);
  const convScore = calculateConversionScore();
  const behavior = extractBehaviorMetrics();

  const fit =
    productProfile * 0.4 +
    convScore * 0.4 +
    behavior.contentFocus * 0.2;

  return Math.round(fit);
};


// 3) توقع النجاح التجاري
const predictCommercialSuccess = (product) => {
  const fit = calculateFitScore(product);
  const conv = calculateConversionScore();

  const projected = fit * 0.6 + conv * 0.4;

  return Math.round(projected);
};

// ============================================================================
// ⭐ PHASE 5.8 — Influencer Auto-Pick Engine
// ============================================================================

// مؤثر واحد فقط حالياً (Self Influencer) — لكن النظام قابل للتوسع
const getAllInfluencers = () => {
  return [
    {
      id: "creator_001",
      name: "المؤثر الرئيسي",
      influence: influence,   // بيانات المستخدم نفسه
    },
    // لاحقاً نضيف مؤثرين آخرين من API أو Local DB
  ];
};

// اختيار أفضل مؤثر حسب المنتج
const autoPickInfluencer = (product) => {
  const list = getAllInfluencers();

  const ranked = list
    .map((inf) => ({
      ...inf,
      fit: calculateFitScore(product),
      projection: predictCommercialSuccess(product),
      behavior: extractBehaviorMetrics(),
    }))
    .sort((a, b) => b.fit - a.fit);

  return ranked[0]; // أعلى ملاءمة
};

// ============================================================================
// ⭐ PHASE 6 — Merchant Intelligence Analytics Engine
// ============================================================================

const analyzeMerchantCampaign = (product, fit, success, budget, influence) => {
  const risks = [];
  const opportunities = [];

  // Risk: Low fit
  if (fit < 100) risks.push("ملاءمة المؤثر منخفضة — قد تقل النتائج.");

  // Risk: Low tribe mood
  if (influence.tribeMood === "هادئة")
    risks.push("مزاج القبيلة منخفض — النشر الآن قد لا يعطي أفضل نتائج.");

  // Risk: weak content
  if (influence.topContent[0]?.reach < 3500)
    risks.push("أعلى محتوى أداءً ضعيف — ينصح بنشر محتوى قوي قبل الحملة.");

  // Opportunity: High success
  if (success > 60) opportunities.push("المؤشرات تشير لنسبة نجاح ممتازة.");

  // Opportunity: strong tribe
  if (influence.tribePower > 80)
    opportunities.push("قوة القبيلة في صالح المنتج — وقت مناسب للإطلاق.");

  // Opportunity: growth
  if (influence.growth > 0.14)
    opportunities.push("نمو حسابك قوي — استثمر الزخم الآن.");

  const readiness =
    Math.round(
      (fit * 0.3) +
      (success * 0.4) +
      (influence.growth * 100 * 0.2) +
      (influence.tribePower * 0.1)
    );

  const recommendation =
    readiness > 70
      ? "🚀 ننصح بإطلاق الحملة — المؤشرات ممتازة."
      : readiness > 50
      ? "⭕ الحملة جيدة — لكن ينصح بتحسين المحتوى قبل الإطلاق."
      : "⛔ ننصح بالتأجيل — المؤشرات الحالية ضعيفة.";

  return {
    risks,
    opportunities,
    readiness,
    recommendation
  };
};


  // ==========================================================================
  // 🟣 Predictive Engine (Phase 5.5)
  // ==========================================================================
  const generatePredictiveAdvice = () => {
    const msgs = [];
    const m = extractBehaviorMetrics();
    const { xp, xpToNext, growth, reach, tribeMood, score } = influence;

    if (growth > 0.15)
      msgs.push("📈 نموك قوي، استغل اللحظة وانشر محتوى عالي الجودة الآن.");

    if (xp > xpToNext * 0.7)
      msgs.push("🔥 اقتربت من مستوى جديد — أكمل مهمة XP الآن!");

    if (reach > 20000)
      msgs.push("🌍 وصولك ممتاز — ركّز على المحتوى الأعلى أداء.");

    if (tribeMood === "نشيطة 🔥")
      msgs.push("⚡ قبيلتك مشعللة… الآن وقت مثالي لنشر محتوى!");

    if (score > 4000)
      msgs.push("💎 تأثيرك يتخطى المتوسط — استثمره مع منتجات قوية.");

    return msgs;
  };

  // ==========================================================================
  // 🟣 Phase 7 — Tribe Mood Engine
  // ==========================================================================
  const evaluateTribeMood = () => {
    const { tribePower, tribeRank, tribeMembers, growth } = influence;

    let s = 0;

    if (tribePower > 50) s += 20;
    if (tribePower > 80) s += 40;
    if (tribePower > 120) s += 60;

    if (tribeRank < 10) s += 20;
    if (tribeRank < 5) s += 40;

    if (tribeMembers > 100) s += 10;
    if (tribeMembers > 200) s += 20;

    if (growth > 0.10) s += 10;

    if (s < 30) return "هادئة";
    if (s < 70) return "متحفّزة";
    if (s < 120) return "نشيطة 🔥";
    return "قوية جدًا ⚡";
  };

  useEffect(() => {
    const mood = evaluateTribeMood();
    setInfluence((prev) => ({ ...prev, tribeMood: mood }));
  }, [
    influence.tribePower,
    influence.tribeMembers,
    influence.tribeRank,
    influence.growth,
  ]);

  const suggestPostingTime = () => {
    const mood = influence.tribeMood;

    if (mood === "قوية جدًا ⚡")
      return "القبيلة في قمة نشاطها — انشر الآن فورًا!";
    if (mood === "نشيطة 🔥")
      return "مزاج القبيلة قوي — وقت ممتاز للنشر.";
    if (mood === "متحفّزة")
      return "النشر الآن جيد لكن ليس الأفضل.";
    return "القبيلة هادئة — يفضّل الانتظار أو تفعيل Boost.";
  };

  // ==========================================================================
  // 🟣 Phase 6.5 — Behavior-driven Booster Suggestions
  // ==========================================================================
  const recommendBoost = () => {
    const { xp, xpToNext, reach, growth, tribePower, tokens, tribeMood } = influence;
    const recs = [];

    const xpProgress = xp / xpToNext;

    if (!activeBoosts.xp2x.active && tokens >= 40 && xpProgress > 0.6)
      recs.push({
        type: "xp2x",
        label: "XP BOOSTER ×2",
        reason: "أنت قريب من الترقية — مضاعفة XP الآن ستكون قوية جدًا.",
        priority: 90,
      });

    if (!activeBoosts.reach.active && tokens >= 30 && growth < 0.1)
      recs.push({
        type: "reach",
        label: "Reach Booster",
        reason: "الوصول منخفض — رفع الوصول سيساعدك كثير.",
        priority: 80,
      });

    if (!activeBoosts.audience.active && tokens >= 60 && reach > 15000)
      recs.push({
        type: "audience",
        label: "Audience Expansion",
        reason: "وصولك قوي — توسيع الجمهور الآن ممتاز.",
        priority: 75,
      });

    if (!activeBoosts.tribe.active && tokens >= 30 && tribePower < 70)
      recs.push({
        type: "tribe",
        label: "Tribe Energy Boost",
        reason: "طاقة القبيلة منخفضة — رفعها يدعمك في كل شيء.",
        priority: 85,
      });

    if (tribeMood === "قوية جدًا ⚡" && growth > 0.15)
      recs.push({
        type: "none",
        label: "لا حاجة لبوستر الآن",
        reason: "أداءك ومزاج القبيلة ممتاز — أكمل بدون Boost.",
        priority: 50,
      });

    if (recs.length === 0) return null;

    recs.sort((a, b) => b.priority - a.priority);
    return recs[0];
  };

  // ==========================================================================
  // 🟣 Reputation + Tokens
  // ==========================================================================
  const addReputation = (amount) =>
    setInfluence((prev) => ({ ...prev, reputation: prev.reputation + amount }));

  const addTokens = (amount) => {
  setInfluence((prev) => ({ ...prev, tokens: prev.tokens + amount }));
};

// ============================================================================
// 🧠 Phase 10 — AI Content Engine (Content Pattern Intelligence)
// ============================================================================

const extractContentPatterns = () => {
  const { topContent, growth, reach } = influence;

  const main = topContent[0];
  const second = topContent[1] || null;

  const pattern = {
    dominantCategory: main.category,
    avgReach: Math.round((main.reach + (second?.reach || main.reach)) / 2),
    growthMomentum: growth,
    contentStrength: main.reach > 5000 ? "strong" : "medium",
  };

  return pattern;
};

const suggestContentFormats = () => {
  const pattern = extractContentPatterns();

  if (pattern.dominantCategory === "tech") return ["Reels", "Shorts", "Stories"];
  if (pattern.dominantCategory === "lifestyle") return ["Reels", "Carousel"];
  if (pattern.dominantCategory === "fashion") return ["Reels", "Photo Post"];
  if (pattern.dominantCategory === "eco") return ["Reels", "Story Tips"];
  if (pattern.dominantCategory === "home") return ["Before/After", "Reels"];

  return ["Reels"];
};

const generateContentIdeas = () => {
  const p = extractContentPatterns();

  const ideas = [];

  if (p.dominantCategory === "tech") {
    ideas.push("مقارنة سريعة بين منتجين في 20 ثانية");
    ideas.push("ميزة خفية ما يعرفها 90٪ من الناس");
    ideas.push("أفضل قيمة مقابل السعر — رأيي بصراحة");
  }

  if (p.dominantCategory === "lifestyle") {
    ideas.push("روتين 30 ثانية يحسّن يومك");
    ideas.push("أفضل 3 نصائح تعلمتها هذا الأسبوع");
    ideas.push("Before / After — تحسن بسيط يصنع فرق");
  }

  if (p.dominantCategory === "eco") {
    ideas.push("عادة صغيرة تقلل استهلاكك 20٪");
    ideas.push("منتج بسيط… تأثير كبير على البيئة");
    ideas.push("3 حلول عملية للاستدامة اليومية");
  }

  if (p.dominantCategory === "fashion") {
    ideas.push("3 إطلالات من قطعة واحدة");
    ideas.push("Style Hack سريع لرفع الأناقة");
    ideas.push("ألوان الموسم — كيف تختار المناسب؟");
  }

  if (p.dominantCategory === "home") {
    ideas.push("تنظيم بسيط يغير شكل المكان ✨");
    ideas.push("Before/After في 15 ثانية");
    ideas.push("أدوات منزلية ذكية بأسعار مناسبة");
  }

  if (ideas.length === 0) {
    ideas.push("أفضل نصيحة تعلمتها هذا الشهر");
    ideas.push("قصة قصيرة تلهم متابعيك");
    ideas.push("شيء صغير… يغير يومك بالكامل");
  }

  return ideas;     // 👈 هذا كان ناقص
};                  // 👈 وهذا إغلاق الدالة
// ============================================================================
// 🧠 PHASE 11 — AI Influencer Matcher PRO
// ============================================================================

// 1️⃣ مطابقة الفئة
function calculateCategoryMatch(product) {
  const productCat = product.category?.toLowerCase() || "";
  const influencerCats = influence.topContent.map((c) => c.category);

  return influencerCats.includes(productCat) ? 30 : 10;
}

// 2️⃣ مطابقة المحتوى
function calculateContentMatch(product) {
  return influence.topContent.some((c) => c.category === product.category)
    ? 25
    : 10;
}

// 3️⃣ مزاج القبيلة
function calculateTribeMatch() {
  if (influence.tribeMood === "قوية جدًا ⚡") return 25;
  if (influence.tribeMood === "نشيطة 🔥") return 20;
  return 10;
}

// 4️⃣ قوة التحويل
function calculateConversionStrength() {
  return Math.min(calculateConversionScore() / 10, 20);
}

// 5️⃣ المحرك الكامل
function aiMatchProductToInfluencer(product) {
  const categoryMatch = calculateCategoryMatch(product);
  const contentMatch = calculateContentMatch(product);
  const tribeMatch = calculateTribeMatch();
  const convStrength = calculateConversionStrength();

  const score =
    categoryMatch + contentMatch + tribeMatch + convStrength;

  const reasons = [];

  if (categoryMatch > 20) reasons.push("مطابقة الفئة عالية");
  if (contentMatch > 20) reasons.push("محتوى المؤثر يشبه منتجك");
  if (tribeMatch > 15) reasons.push("مزاج القبيلة مرتفع");
  if (convStrength > 10) reasons.push("قوة التحويل ممتازة");

  return {
    score,
    reasons,
    categoryMatch,
    contentMatch,
    tribeMatch,
    convStrength,
  };
}
 
// ============================================================================
// PROVIDER EXPORT (FINAL CLEAN VERSION)
// ============================================================================
return (
  <InfluenceScoreContext.Provider
    value={{
      influence,

      // Boosts
      activeBoosts,
      activateXPBoost,
      activateAudienceBoost,
      activateReachBoost,
      activateTribeBoost,

      // Influence
      gainXP,
      addTokens,
      addReputation,

      // Tribe Loop
      recalcTribe,
      evaluateTribeMood,
      suggestPostingTime,

      // Predictive AI
      generatePredictiveAdvice,

      // Behavior Engine
      extractBehaviorMetrics,
      classifyInfluencer,

      // Boost suggestions
      recommendBoost,

      // Conversion Engine
      calculateConversionScore,
      analyzeProductFit,
      predictConversion,

      // Product Matching (Phase 9)
      analyzeProductProfile,
      calculateFitScore,
      predictCommercialSuccess,

      // AI Influencer Matcher PRO (Phase 11)
      aiMatchProductToInfluencer,

      // Content Engine (Phase 10)
      extractContentPatterns,
      suggestContentFormats,
      generateContentIdeas,
    }}
  >
    {children}
  </InfluenceScoreContext.Provider>
);
}   // ← إغلاق الدالة فقط
