// ============================================================================
// 💚 Core4.AI – audienceApi.js (v2 FINAL)
// ----------------------------------------------------------------------------
// Includes: Persona fallback + Full Feed (6 Tribes) + Thumbnails
// ============================================================================

export async function fetchBuyerPersona(buyerId = "buyer_001") {
  try {
    const res = await fetch(`/api/audience/${buyerId}/persona`);
    if (!res.ok) throw new Error("Failed persona");
    return await res.json();
  } catch (e) {
    console.warn("⚠️ Using fallback persona (no backend yet)", e);

    return {
      buyer_id: buyerId,
      name: "ضيف Core4",
      tribe: "Techy Tribe",
      mood: "مرتاح",
      influence_score: 72,
      tags: ["قهوة", "تقنية", "عروض سريعة"],
      level: "Rising Micro-Influencer",
      heat_score: 55,
      cluster: 3,
    };
  }
}

export async function fetchAudienceFeed(buyerId = "buyer_001") {
  try {
    const res = await fetch(`/api/audience/${buyerId}/feed`);
    if (!res.ok) throw new Error("Failed feed");
    return await res.json();
  } catch (e) {
    console.warn("⚠️ Using fallback feed (no backend yet)", e);

    // ======================================================================
    // FULL FEED (6 TRIBES) — balanced, with thumbnails, curated by Noor & Sama
    // ======================================================================

    return [
      // -------------------- Techy Tribe --------------------
      {
        id: "t1",
        type: "product",
        tribe: "Techy Tribe",
        title: "سماعة بلوتوث مع عزل ضوضاء",
        subtitle: "مناسبة للعمل من الكوفي",
        merchant_name: "كوفي زاوية الراحة",
        dopamine_hint: "هدوء + تركيز",
        thumbnail: "https://picsum.photos/300?random=101",
      },
      {
        id: "t2",
        type: "product",
        tribe: "Techy Tribe",
        title: "كيبورد ميكانيكي RGB",
        subtitle: "مصمم للمبرمجين وعشاق التقنية",
        merchant_name: "Tech World",
        dopamine_hint: "صوت الكتابة 😍",
        thumbnail: "https://picsum.photos/300?random=102",
      },

      // -------------------- Adventurers --------------------
      {
        id: "a1",
        type: "content",
        tribe: "Adventurers",
        title: "فلوغ: يوم كامل من العمل المتنقل",
        creator_name: "Tech Nomad",
        subtitle: "كيف تخلي العالم مكتبك؟",
        dopamine_hint: "حماس + حركة",
        thumbnail: "https://picsum.photos/300?random=201",
      },
      {
        id: "a2",
        type: "product",
        tribe: "Adventurers",
        title: "باور بانك خارق 30000mAh",
        subtitle: "للرحلات المتنقلة والمغامرات",
        merchant_name: "Adventure Hub",
        dopamine_hint: "تحرر + أمان",
        thumbnail: "https://picsum.photos/300?random=202",
      },

      // -------------------- EventGoers --------------------
      {
        id: "e1",
        type: "product",
        tribe: "EventGoers",
        title: "باكج تذاكر + قهوة لموسم الرياض",
        subtitle: "تجربة ذكية لعشاق الفعاليات",
        merchant_name: "Riyadh Events Hub",
        dopamine_hint: "اجتماعات + تجربة",
        thumbnail: "https://picsum.photos/300?random=301",
      },
      {
        id: "e2",
        type: "content",
        tribe: "EventGoers",
        title: "أفضل فعاليات هذا الأسبوع",
        subtitle: "توصيات حسب اهتماماتك",
        creator_name: "Riyadh Guide",
        dopamine_hint: "تجارب جديدة",
        thumbnail: "https://picsum.photos/300?random=302",
      },

      // -------------------- Fashionists --------------------
      {
        id: "f1",
        type: "product",
        tribe: "Fashionists",
        title: "شنطة يد فاخرة",
        subtitle: "ستايل أنيق يناسب المشاوير",
        merchant_name: "Luxury Boutique",
        dopamine_hint: "أناقة + ثقة",
        thumbnail: "https://picsum.photos/300?random=401",
      },
      {
        id: "f2",
        type: "product",
        tribe: "Fashionists",
        title: "نظارة شمسية Signature",
        subtitle: "تصميم راقي لعشاق الموضة",
        merchant_name: "Style House",
        dopamine_hint: "إطلالة + تميز",
        thumbnail: "https://picsum.photos/300?random=402",
      },

      // -------------------- Foodies --------------------
      {
        id: "fo1",
        type: "product",
        tribe: "Foodies",
        title: "باكج تذوق المطاعم الجديدة",
        subtitle: "مثالي لعشاق الأكل والاستكشاف",
        merchant_name: "Taste Hub",
        dopamine_hint: "نكهات + تجربة",
        thumbnail: "https://picsum.photos/300?random=501",
      },
      {
        id: "fo2",
        type: "content",
        tribe: "Foodies",
        title: "أفضل مطاعم الأسبوع",
        subtitle: "اختيارات حسب ذوقك",
        creator_name: "Food Diary",
        dopamine_hint: "لذة + اكتشاف",
        thumbnail: "https://picsum.photos/300?random=502",
      },
    ];
  }
}
