// ============================================================================
// 💚 Core4.AI – TribeDashboard FINAL FULL EDITION (2025)
// ----------------------------------------------------------------------------
// Includes:
// - Lifecycle Engine
// - Revenue Attribution Engine
// - Funnel Heatmap (Awareness → Advocacy)
// - Revenue-Based Ranking Engine
// - AI Campaign Auto-Optimizer (MIT-aligned)
// - Tribe XP + Challenges + Economy
// ============================================================================

import React from "react";
import { motion } from "framer-motion";

import { useTribe } from "@/context/TribeContext";
import { useAudience } from "@/context/AudienceContext";
import { useRevenueRanking } from "@/context/RevenueRankingContext";
import { useTribeInfluence } from "@/context/TribeInfluenceContext";
import { useTribeFunnel } from "@/context/TribeFunnelContext";
import { useAttribution } from "@/context/AttributionContext";

import TribeFunnelHeatmap from "./components/TribeFunnelHeatmap";
import { autoOptimizeCampaign } from "@/engines/CampaignAutoOptimizer";

export default function TribeDashboard() {
  const {
    xp,
    rank,
    lifecycleStage,
    lifecycleProgress,
    talentScore,
    challenges,
    selectedTribe,
    coins,
    treasury,
    contribution,
    upgrades,
    members,
    warPoints,
    eventProgress,
    liveEvent
  } = useTribe();

  const { clusters } = useAudience();
  const { rankMembers } = useRevenueRanking();
  const { getTopAmbassadors } = useTribeInfluence();
  const { evaluateFunnelStage } = useTribeFunnel();
  const { logs } = useAttribution();

  const completed = challenges.filter((c) => c.completed).length;
  const total = challenges.length;

  const product = JSON.parse(localStorage.getItem("core4ai_new_product") || "null");

  // Ranking table based on revenue
  const revenueRanking = product ? rankMembers(product) : [];

  // AI Campaign Optimization
  const aiSuggestion =
    product && clusters
      ? autoOptimizeCampaign({
          product,
          clusters,
          ambassadors: getTopAmbassadors(product, 3),
          previousRevenue: logs.reduce((sum, l) => sum + l.amount, 0),
          conversionEvents: logs.filter(l => l.funnelStage === "conversion").length
        })
      : null;

  return (
    <div
      className="min-h-screen p-10 text-white space-y-10"
      dir="rtl"
      style={{
        background: "linear-gradient(to bottom right, #111, #1a1a1a, #000)"
      }}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-purple-300">
            لوحة تحكم القبيلة – {selectedTribe?.name} {selectedTribe?.icon}
          </h1>
          <p className="text-gray-400 mt-1">
            تحكم كامل بقوة القبيلة، الأداء التأثيري، وإيرادات الحملات.
          </p>
        </div>

        <div className="text-xl font-bold text-blue-300">
          رتبة: {rank} | XP: {xp}
        </div>
      </div>

      {/* LIFECYCLE & TALENT */}
      <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-green-300 mb-4">
          🔥 مسار تطور العضو (Lifecycle Progress)
        </h3>

        <div className="text-lg font-bold text-purple-200">
          المرحلة الحالية: {translateStage(lifecycleStage)}
        </div>
        <p className="mt-1 text-gray-300">
          نسبة التقدم: {lifecycleProgress}%
        </p>

        <div className="text-purple-300 font-semibold text-lg mt-4">
          ⚡ مؤشر الموهبة: {talentScore}
        </div>
      </div>

      {/* GRID SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        <Card title="إجمالي XP" value={xp} color="text-green-400" />
        <Card title="نقاط الحرب (WP)" value={warPoints} color="text-red-400" />
        <Card title="التحديات" value={`${completed} / ${total}`} color="text-blue-300" />

        <Card title="Coins" value={coins} color="text-yellow-300" />
        <Card title="خزنة القبيلة" value={treasury} color="text-purple-300" />
        <Card title="مساهمتك" value={contribution} color="text-pink-300" />

        {/* UPGRADES */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-6 col-span-1">
          <h3 className="text-lg font-semibold text-cyan-300 mb-2">ترقيات القبيلة</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>XP Boost All: {upgrades.xpBoostAll.level}</li>
            <li>XP Boost Challenges: {upgrades.xpBoostChallenges.level}</li>
            <li>Coin Boost: {upgrades.coinBoost.level}</li>
            <li>Tribe Level: {upgrades.tribeLevel.level}</li>
          </ul>
        </div>

        {/* LIVE EVENT */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-6 col-span-2">
          <h3 className="text-lg font-semibold text-yellow-300">🔥 الحدث الحي</h3>

          {liveEvent?.active ? (
            <>
              <p className="text-gray-300 mt-1">{liveEvent.name}</p>
              <p className="mt-3 text-green-400">XP المكتسب: {eventProgress.xp}</p>
              <p className="text-pink-300">WP المكتسب: {eventProgress.wp}</p>
            </>
          ) : (
            <p className="text-gray-400 mt-3">لا يوجد حدث نشط حالياً</p>
          )}
        </div>
      </div>

      {/* FUNNEL HEATMAP */}
      <TribeFunnelHeatmap />

      {/* REVENUE-BASED RANKING */}
      <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-blue-300 mb-4">🏆 ترتيب الأعضاء حسب الإيرادات</h2>

        {revenueRanking.slice(0, 5).map((m, i) => (
          <div
            key={i}
            className="p-3 bg-white/5 border border-white/10 rounded-xl mb-2 flex justify-between"
          >
            <span className="font-bold">{i + 1}. {m.name}</span>
            <span className="text-green-300 font-bold">{m.influenceScore} نقطة</span>
          </div>
        ))}
      </div>

      {/* AI OPTIMIZER */}
      <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-purple-300 mb-2">
          🤖 توصيات الحملة القادمة (AI Optimizer)
        </h2>

        {aiSuggestion ? (
          <div className="space-y-2 text-gray-200 text-sm">
            <p>👤 المؤثر التالي: <b>{aiSuggestion.nextAmbassador}</b></p>
            <p>🎯 الشريحة: <b>{aiSuggestion.targetCluster}</b></p>
            <p>💰 تعديل السعر: <b>{aiSuggestion.priceAdjustment}</b></p>
            <p>🎬 المحتوى القادم: <b>{aiSuggestion.nextContent}</b></p>
            <p className="text-green-300">
              📈 ROI المتوقع: {aiSuggestion.expectedROI} ريال
            </p>
          </div>
        ) : (
          <p className="text-gray-400 text-sm mt-2">لا توجد بيانات كافية للتحسين.</p>
        )}
      </div>
    </div>
  );
}


// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------

function translateStage(stage) {
  return {
    spot: "Spot – الاكتشاف",
    assess: "Assess – التقييم",
    develop: "Develop – التطوير",
    recruit: "Recruit – الاستقطاب",
    motivate: "Motivate – التحفيز",
  }[stage];
}

function Card({ title, value, color }) {
  return (
    <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
      <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
    </div>
  );
}
