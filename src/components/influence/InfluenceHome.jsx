// ============================================================================
// 💎 InfluenceHome.jsx — PRO Version (Phase 10 + Top-3 Matching)
// ============================================================================

import { useInfluence } from "@/context/InfluenceScoreContext";

import InfluenceTierBadge from "@/components/influence/InfluenceTierBadge";
import InfluenceReputation from "@/components/influence/InfluenceReputation";
import BoostBadge from "@/components/influence/BoostBadge";
import AnimatedXPBar from "@/components/influence/AnimatedXPBar";
import PulseValue from "@/components/influence/PulseValue";

import InfluenceMiniStats from "@/components/influence/InfluenceMiniStats";
import SmartFeed from "@/components/influence/SmartFeed";
import SmartFeedAdvanced from "@/components/influence/SmartFeedAdvanced";
import BoostSuggestions from "@/components/influence/BoostSuggestions";
import TribeMoodPanel from "@/components/influence/TribeMoodPanel";
import InfluenceSalesPanel from "@/components/influence/InfluenceSalesPanel";

import ContentStrategyPanel from "@/components/influence/ContentStrategyPanel"; 
import ProductMatchTop3Panel from "@/components/influence/ProductMatchTop3Panel";


export default function InfluenceHome() {
  const { influence } = useInfluence();

  if (!influence)
    return (
      <div className="text-center text-gray-300 mt-20">
        جاري تحميل بيانات التأثير...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto text-white mt-10 space-y-8" dir="rtl">

      <h1 className="text-3xl font-bold">منطقة التأثير — Core4.AI</h1>

      {/* Score */}
      <PulseValue value={influence.score}>
        <div className="text-xl text-purple-300 font-bold">
          مجموع التأثير: {influence.score}
        </div>
      </PulseValue>

      {/* Tier */}
      <InfluenceTierBadge tier={influence.tier} score={influence.score} />

      {/* XP */}
      <AnimatedXPBar xp={influence.xp} xpToNext={influence.xpToNext} />

      {/* Reputation */}
      <InfluenceReputation reputation={influence.reputation} />

      {/* Boost Badges */}
      <BoostBadge />

      {/* AI Insights */}
      <SmartFeed />
      <SmartFeedAdvanced />

      {/* Boost Suggestions */}
      <BoostSuggestions />

      {/* Tribe Mood */}
      <TribeMoodPanel />

      {/* Sales Power */}
      <InfluenceSalesPanel />

      {/* AI Content Strategy (Phase 10) */}
      <ContentStrategyPanel />

      {/* Top-3 Product Matching (Phase 9) */}
      <ProductMatchTop3Panel />

      {/* Influence + Tribe Mini Stats */}
      <InfluenceMiniStats
        tribePower={influence.tribePower}
        tribeMembers={influence.tribeMembers}
        tribeRank={influence.tribeRank}
        tribeMood={influence.tribeMood}
        dailyGain={5}
        reputation={influence.reputation}
        cluster={3}
      />
    </div>
  );
}
