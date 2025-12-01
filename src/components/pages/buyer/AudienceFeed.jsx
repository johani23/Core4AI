import React, { useMemo } from "react";
import { useAudience } from "@/context/AudienceContext";
import { useInfluenceMissions } from "@/context/InfluenceMissionsContext.jsx";

export default function AudienceFeed({ activeTribe }) {
  const { feed, loading, error, persona, trackEvent } = useAudience();
  const { missions, completed, level, streak } = useInfluenceMissions();

  // إضافة influence بشكل آمن
  const influence = persona?.influence || { score: 0, tier: "", cluster: 1 };

  if (loading) return <div className="text-gray-400 mt-6 text-center">جارِ تحميل الفيد…</div>;
  if (error) return <div className="text-red-400 mt-6 text-center">{error}</div>;
  if (!feed || feed.length === 0) return <div className="text-gray-500 mt-6 text-center">لا توجد بيانات بعد…</div>;

  const filteredFeed = useMemo(() => {
    if (activeTribe === "All") return feed;
    return feed.filter((i) => i.tribe === activeTribe);
  }, [feed, activeTribe]);

  const rankedFeed = useMemo(() => {
    return filteredFeed
      .map((item) => {
        let score = 0;

        if (influence) {
          const userInfluence = influence.score || 0;
          const tier = influence.tier || "";

          if (userInfluence > 120) score += 20;
          if (userInfluence > 200) score += 40;

          const tierBoost = {
            "Explorer": 2,
            "Rising Micro-Influencer": 6,
            "Mid Influencer": 12,
            "Top Influencer": 18,
            "Power Influencer": 25,
          };
          score += tierBoost[tier] || 0;
        }

        if (persona?.mood === "متحمس") score += 15;
        if (persona?.mood === "فضولي") score += 10;
        if (persona?.mood === "مرتاح") score += 5;

        if (persona?.tribe && item.tribe === persona.tribe) {
          score += 30;
        }

        if (persona?.tags?.length > 0) {
          if (persona.tags.includes(item.tribe)) score += 20;
        }

        const clusterBoost = { 1: 4, 2: 8, 3: 12, 4: 18, 5: 25 };
        score += clusterBoost[influence.cluster] || 0;

        if (persona?.heat_score > 70) score += 10;

        if (item.dopamine_hint) score += 5;

        return { ...item, _score: score };
      })
      .sort((a, b) => b._score - a._score);
  }, [filteredFeed, persona, influence]);

  const handleClick = (item) => {
    trackEvent("feed_item_clicked", {
      item_id: item.id,
      item_type: item.type,
      tribe: item.tribe || null,
      category: item.category || null,
    });
  };

  return (
    <div className="space-y-5" dir="rtl">
      {rankedFeed.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item)}
          className="w-full flex items-start gap-4 bg-white/5 border border-white/10
           hover:bg-white/10 transition-all rounded-2xl p-4 backdrop-blur-lg"
        >
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-800 flex-shrink-0">
            <img
              src={item.thumbnail || `https://picsum.photos/200?random=${item.id}`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-grow text-right">
            <div className="text-xs text-gray-500 mb-1">
              {item.type === "product" ? "منتج مقترح" : "محتوى من قبيلتك"}
            </div>

            <div className="text-lg font-semibold text-gray-100">
              {item.title}
            </div>

            {item.subtitle && (
              <div className="text-sm text-gray-300 mt-1">{item.subtitle}</div>
            )}

            <div className="text-xs text-gray-400 mt-2">
              🎯 {item.dopamine_hint || "اهتمامك مرتفع في هذا النوع"}
            </div>

            <div className="mt-3 flex items-center justify-end gap-3 text-xs text-gray-400">
              {item.tribe && (
                <span className="px-2 py-1 bg-white/10 rounded-full">
                  {item.tribe}
                </span>
              )}
              {item.merchant_name && <span>🛒 {item.merchant_name}</span>}
              {item.creator_name && <span>👤 {item.creator_name}</span>}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}








