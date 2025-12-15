// ============================================================================
// Ã°Å¸â€™Å¡ Core4.AI Ã¢â‚¬â€œ audienceApi.js (v2 FINAL)
// ----------------------------------------------------------------------------
// Includes: Persona fallback + Full Feed (6 Tribes) + Thumbnails
// ============================================================================

export async function fetchBuyerPersona(buyerId = "buyer_001") {
  try {
    const res = await fetch(`/api/audience/${buyerId}/persona`);
    if (!res.ok) throw new Error("Failed persona");
    return await res.json();
  } catch (e) {
    console.warn("Ã¢Å¡Â Ã¯Â¸Â Using fallback persona (no backend yet)", e);

    return {
      buyer_id: buyerId,
      name: "Ã˜Â¶Ã™Å Ã™Â Core4",
      tribe: "Techy Tribe",
      mood: "Ã™â€¦Ã˜Â±Ã˜ÂªÃ˜Â§Ã˜Â­",
      influence_score: 72,
      tags: ["Ã™â€šÃ™â€¡Ã™Ë†Ã˜Â©", "Ã˜ÂªÃ™â€šÃ™â€ Ã™Å Ã˜Â©", "Ã˜Â¹Ã˜Â±Ã™Ë†Ã˜Â¶ Ã˜Â³Ã˜Â±Ã™Å Ã˜Â¹Ã˜Â©"],
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
    console.warn("Ã¢Å¡Â Ã¯Â¸Â Using fallback feed (no backend yet)", e);

    // ======================================================================
    // FULL FEED (6 TRIBES) Ã¢â‚¬â€ balanced, with thumbnails, curated by Noor & Sama
    // ======================================================================

    return [
      // -------------------- Techy Tribe --------------------
      {
        id: "t1",
        type: "product",
        tribe: "Techy Tribe",
        title: "Ã˜Â³Ã™â€¦Ã˜Â§Ã˜Â¹Ã˜Â© Ã˜Â¨Ã™â€žÃ™Ë†Ã˜ÂªÃ™Ë†Ã˜Â« Ã™â€¦Ã˜Â¹ Ã˜Â¹Ã˜Â²Ã™â€ž Ã˜Â¶Ã™Ë†Ã˜Â¶Ã˜Â§Ã˜Â¡",
        subtitle: "Ã™â€¦Ã™â€ Ã˜Â§Ã˜Â³Ã˜Â¨Ã˜Â© Ã™â€žÃ™â€žÃ˜Â¹Ã™â€¦Ã™â€ž Ã™â€¦Ã™â€  Ã˜Â§Ã™â€žÃ™Æ’Ã™Ë†Ã™ÂÃ™Å ",
        merchant_name: "Ã™Æ’Ã™Ë†Ã™ÂÃ™Å  Ã˜Â²Ã˜Â§Ã™Ë†Ã™Å Ã˜Â© Ã˜Â§Ã™â€žÃ˜Â±Ã˜Â§Ã˜Â­Ã˜Â©",
        dopamine_hint: "Ã™â€¡Ã˜Â¯Ã™Ë†Ã˜Â¡ + Ã˜ÂªÃ˜Â±Ã™Æ’Ã™Å Ã˜Â²",
        thumbnail: "https://picsum.photos/300?random=101",
      },
      {
        id: "t2",
        type: "product",
        tribe: "Techy Tribe",
        title: "Ã™Æ’Ã™Å Ã˜Â¨Ã™Ë†Ã˜Â±Ã˜Â¯ Ã™â€¦Ã™Å Ã™Æ’Ã˜Â§Ã™â€ Ã™Å Ã™Æ’Ã™Å  RGB",
        subtitle: "Ã™â€¦Ã˜ÂµÃ™â€¦Ã™â€¦ Ã™â€žÃ™â€žÃ™â€¦Ã˜Â¨Ã˜Â±Ã™â€¦Ã˜Â¬Ã™Å Ã™â€  Ã™Ë†Ã˜Â¹Ã˜Â´Ã˜Â§Ã™â€š Ã˜Â§Ã™â€žÃ˜ÂªÃ™â€šÃ™â€ Ã™Å Ã˜Â©",
        merchant_name: "Tech World",
        dopamine_hint: "Ã˜ÂµÃ™Ë†Ã˜Âª Ã˜Â§Ã™â€žÃ™Æ’Ã˜ÂªÃ˜Â§Ã˜Â¨Ã˜Â© Ã°Å¸ËœÂ",
        thumbnail: "https://picsum.photos/300?random=102",
      },

      // -------------------- Adventurers --------------------
      {
        id: "a1",
        type: "content",
        tribe: "Adventurers",
        title: "Ã™ÂÃ™â€žÃ™Ë†Ã˜Âº: Ã™Å Ã™Ë†Ã™â€¦ Ã™Æ’Ã˜Â§Ã™â€¦Ã™â€ž Ã™â€¦Ã™â€  Ã˜Â§Ã™â€žÃ˜Â¹Ã™â€¦Ã™â€ž Ã˜Â§Ã™â€žÃ™â€¦Ã˜ÂªÃ™â€ Ã™â€šÃ™â€ž",
        creator_name: "Tech Nomad",
        subtitle: "Ã™Æ’Ã™Å Ã™Â Ã˜ÂªÃ˜Â®Ã™â€žÃ™Å  Ã˜Â§Ã™â€žÃ˜Â¹Ã˜Â§Ã™â€žÃ™â€¦ Ã™â€¦Ã™Æ’Ã˜ÂªÃ˜Â¨Ã™Æ’Ã˜Å¸",
        dopamine_hint: "Ã˜Â­Ã™â€¦Ã˜Â§Ã˜Â³ + Ã˜Â­Ã˜Â±Ã™Æ’Ã˜Â©",
        thumbnail: "https://picsum.photos/300?random=201",
      },
      {
        id: "a2",
        type: "product",
        tribe: "Adventurers",
        title: "Ã˜Â¨Ã˜Â§Ã™Ë†Ã˜Â± Ã˜Â¨Ã˜Â§Ã™â€ Ã™Æ’ Ã˜Â®Ã˜Â§Ã˜Â±Ã™â€š 30000mAh",
        subtitle: "Ã™â€žÃ™â€žÃ˜Â±Ã˜Â­Ã™â€žÃ˜Â§Ã˜Âª Ã˜Â§Ã™â€žÃ™â€¦Ã˜ÂªÃ™â€ Ã™â€šÃ™â€žÃ˜Â© Ã™Ë†Ã˜Â§Ã™â€žÃ™â€¦Ã˜ÂºÃ˜Â§Ã™â€¦Ã˜Â±Ã˜Â§Ã˜Âª",
        merchant_name: "Adventure Hub",
        dopamine_hint: "Ã˜ÂªÃ˜Â­Ã˜Â±Ã˜Â± + Ã˜Â£Ã™â€¦Ã˜Â§Ã™â€ ",
        thumbnail: "https://picsum.photos/300?random=202",
      },

      // -------------------- EventGoers --------------------
      {
        id: "e1",
        type: "product",
        tribe: "EventGoers",
        title: "Ã˜Â¨Ã˜Â§Ã™Æ’Ã˜Â¬ Ã˜ÂªÃ˜Â°Ã˜Â§Ã™Æ’Ã˜Â± + Ã™â€šÃ™â€¡Ã™Ë†Ã˜Â© Ã™â€žÃ™â€¦Ã™Ë†Ã˜Â³Ã™â€¦ Ã˜Â§Ã™â€žÃ˜Â±Ã™Å Ã˜Â§Ã˜Â¶",
        subtitle: "Ã˜ÂªÃ˜Â¬Ã˜Â±Ã˜Â¨Ã˜Â© Ã˜Â°Ã™Æ’Ã™Å Ã˜Â© Ã™â€žÃ˜Â¹Ã˜Â´Ã˜Â§Ã™â€š Ã˜Â§Ã™â€žÃ™ÂÃ˜Â¹Ã˜Â§Ã™â€žÃ™Å Ã˜Â§Ã˜Âª",
        merchant_name: "Riyadh Events Hub",
        dopamine_hint: "Ã˜Â§Ã˜Â¬Ã˜ÂªÃ™â€¦Ã˜Â§Ã˜Â¹Ã˜Â§Ã˜Âª + Ã˜ÂªÃ˜Â¬Ã˜Â±Ã˜Â¨Ã˜Â©",
        thumbnail: "https://picsum.photos/300?random=301",
      },
      {
        id: "e2",
        type: "content",
        tribe: "EventGoers",
        title: "Ã˜Â£Ã™ÂÃ˜Â¶Ã™â€ž Ã™ÂÃ˜Â¹Ã˜Â§Ã™â€žÃ™Å Ã˜Â§Ã˜Âª Ã™â€¡Ã˜Â°Ã˜Â§ Ã˜Â§Ã™â€žÃ˜Â£Ã˜Â³Ã˜Â¨Ã™Ë†Ã˜Â¹",
        subtitle: "Ã˜ÂªÃ™Ë†Ã˜ÂµÃ™Å Ã˜Â§Ã˜Âª Ã˜Â­Ã˜Â³Ã˜Â¨ Ã˜Â§Ã™â€¡Ã˜ÂªÃ™â€¦Ã˜Â§Ã™â€¦Ã˜Â§Ã˜ÂªÃ™Æ’",
        creator_name: "Riyadh Guide",
        dopamine_hint: "Ã˜ÂªÃ˜Â¬Ã˜Â§Ã˜Â±Ã˜Â¨ Ã˜Â¬Ã˜Â¯Ã™Å Ã˜Â¯Ã˜Â©",
        thumbnail: "https://picsum.photos/300?random=302",
      },

      // -------------------- Fashionists --------------------
      {
        id: "f1",
        type: "product",
        tribe: "Fashionists",
        title: "Ã˜Â´Ã™â€ Ã˜Â·Ã˜Â© Ã™Å Ã˜Â¯ Ã™ÂÃ˜Â§Ã˜Â®Ã˜Â±Ã˜Â©",
        subtitle: "Ã˜Â³Ã˜ÂªÃ˜Â§Ã™Å Ã™â€ž Ã˜Â£Ã™â€ Ã™Å Ã™â€š Ã™Å Ã™â€ Ã˜Â§Ã˜Â³Ã˜Â¨ Ã˜Â§Ã™â€žÃ™â€¦Ã˜Â´Ã˜Â§Ã™Ë†Ã™Å Ã˜Â±",
        merchant_name: "Luxury Boutique",
        dopamine_hint: "Ã˜Â£Ã™â€ Ã˜Â§Ã™â€šÃ˜Â© + Ã˜Â«Ã™â€šÃ˜Â©",
        thumbnail: "https://picsum.photos/300?random=401",
      },
      {
        id: "f2",
        type: "product",
        tribe: "Fashionists",
        title: "Ã™â€ Ã˜Â¸Ã˜Â§Ã˜Â±Ã˜Â© Ã˜Â´Ã™â€¦Ã˜Â³Ã™Å Ã˜Â© Signature",
        subtitle: "Ã˜ÂªÃ˜ÂµÃ™â€¦Ã™Å Ã™â€¦ Ã˜Â±Ã˜Â§Ã™â€šÃ™Å  Ã™â€žÃ˜Â¹Ã˜Â´Ã˜Â§Ã™â€š Ã˜Â§Ã™â€žÃ™â€¦Ã™Ë†Ã˜Â¶Ã˜Â©",
        merchant_name: "Style House",
        dopamine_hint: "Ã˜Â¥Ã˜Â·Ã™â€žÃ˜Â§Ã™â€žÃ˜Â© + Ã˜ÂªÃ™â€¦Ã™Å Ã˜Â²",
        thumbnail: "https://picsum.photos/300?random=402",
      },

      // -------------------- Foodies --------------------
      {
        id: "fo1",
        type: "product",
        tribe: "Foodies",
        title: "Ã˜Â¨Ã˜Â§Ã™Æ’Ã˜Â¬ Ã˜ÂªÃ˜Â°Ã™Ë†Ã™â€š Ã˜Â§Ã™â€žÃ™â€¦Ã˜Â·Ã˜Â§Ã˜Â¹Ã™â€¦ Ã˜Â§Ã™â€žÃ˜Â¬Ã˜Â¯Ã™Å Ã˜Â¯Ã˜Â©",
        subtitle: "Ã™â€¦Ã˜Â«Ã˜Â§Ã™â€žÃ™Å  Ã™â€žÃ˜Â¹Ã˜Â´Ã˜Â§Ã™â€š Ã˜Â§Ã™â€žÃ˜Â£Ã™Æ’Ã™â€ž Ã™Ë†Ã˜Â§Ã™â€žÃ˜Â§Ã˜Â³Ã˜ÂªÃ™Æ’Ã˜Â´Ã˜Â§Ã™Â",
        merchant_name: "Taste Hub",
        dopamine_hint: "Ã™â€ Ã™Æ’Ã™â€¡Ã˜Â§Ã˜Âª + Ã˜ÂªÃ˜Â¬Ã˜Â±Ã˜Â¨Ã˜Â©",
        thumbnail: "https://picsum.photos/300?random=501",
      },
      {
        id: "fo2",
        type: "content",
        tribe: "Foodies",
        title: "Ã˜Â£Ã™ÂÃ˜Â¶Ã™â€ž Ã™â€¦Ã˜Â·Ã˜Â§Ã˜Â¹Ã™â€¦ Ã˜Â§Ã™â€žÃ˜Â£Ã˜Â³Ã˜Â¨Ã™Ë†Ã˜Â¹",
        subtitle: "Ã˜Â§Ã˜Â®Ã˜ÂªÃ™Å Ã˜Â§Ã˜Â±Ã˜Â§Ã˜Âª Ã˜Â­Ã˜Â³Ã˜Â¨ Ã˜Â°Ã™Ë†Ã™â€šÃ™Æ’",
        creator_name: "Food Diary",
        dopamine_hint: "Ã™â€žÃ˜Â°Ã˜Â© + Ã˜Â§Ã™Æ’Ã˜ÂªÃ˜Â´Ã˜Â§Ã™Â",
        thumbnail: "https://picsum.photos/300?random=502",
      },
    ];
  }
}

