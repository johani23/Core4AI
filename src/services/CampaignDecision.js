// ============================================================================
// Core4.AI – Campaign Decision Engine
// يقرر نوع الحملة بناءً على رأي العملاء والسعر
// ============================================================================

export function decideCampaignType({ rnd, mit }) {
  if (!rnd || !mit) return "educational";

  const valueScore = rnd.value_score; // 0 – 25
  const perceived = rnd.perceived_market_price;
  const smart = mit.smart_price;
  const elasticity = rnd.elasticity_label;

  // قوة الميزة
  const strongFeature = valueScore >= 16;
  const weakFeature = valueScore < 10;

  // فجوة السعر
  const priceFeelsHigh = smart > perceived;

  // 1️⃣ ميزة ضعيفة → تعليم
  if (weakFeature) return "educational";

  // 2️⃣ ميزة قوية لكن السعر أعلى من تصور العميل
  if (strongFeature && priceFeelsHigh) return "value_proof";

  // 3️⃣ ميزة قوية والسعر مقبول
  if (strongFeature && !priceFeelsHigh && elasticity === "Inelastic")
    return "conversion";

  // 4️⃣ باقي الحالات
  return "hybrid";
}
