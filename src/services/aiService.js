// ============================================================================
// 🤖 Core4.AI — aiService.js (v4 FINAL STABLE)
// Centralized AI engine for all Creator features
// Mock Mode Enabled — Backend Ready
// ============================================================================

// ⛑ Helper delay (simulates network)
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ============================================================================
// 🧠 1) Caption AI — Generate creative captions
// ============================================================================
export async function generateCaptionAI() {
  await wait(600);

  const samples = [
    "🎥✨ محتوى جديد… اسحب الشاشة وشوف الإبداع!",
    "🔥 لحظة جميلة تستحق المشاركة!",
    "⚡️ لقطة سريعة… لكن معناها كبير!",
    "✨ قصة قصيرة في ثانية واحدة… جاهز؟",
  ];

  return samples[Math.floor(Math.random() * samples.length)];
}

// ============================================================================
// 🏷 2) Hashtags AI — Smart hashtag generator
// ============================================================================
export async function generateHashtagsAI(caption) {
  await wait(600);

  if (!caption || caption.length < 5) {
    return ["#core4", "#creator", "#reels", "#ksa"];
  }

  return [
    "#core4ai",
    "#تأثير",
    "#صانع_محتوى",
    "#ريلز",
    "#اكسبلور",
    "#trend",
  ];
}

// ============================================================================
// 🎁 3) Offer AI — Smart promotional text generator
// ============================================================================
export async function generateOfferAI(offer, tribe) {
  await wait(600);

  return `🎁 عرض خاص لقبيلة ${tribe} — استمتع بـ ${offer} اليوم فقط! ⚡️`;
}

// ============================================================================
// 🔮 4) Smart Preview AI — Score + Tribe Match + Suggestions
// ============================================================================
export async function generatePreviewAI(caption, tribe, tags) {
  await wait(800);

  const score = 75 + Math.floor(Math.random() * 20);

  const suggestions = [
    "اجعل الجملة الأولى أكثر جذبًا.",
    "أضف دعوة واضحة للتفاعل.",
    "استخدم إيموجي يعكس محتوى المنشور.",
    "حافظ على النص مختصرًا قدر الإمكان.",
  ];

  return {
    score,
    bestTribe: tribe || "Techy Tribe",
    suggestions: suggestions.slice(0, 3),
  };
}
