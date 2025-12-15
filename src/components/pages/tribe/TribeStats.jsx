// ============================================================================
// 💚 Core4.AI – TribeStats (MIT Digital Marketing Edition)
// ----------------------------------------------------------------------------
// - Funnel Distribution (A → C → Cv → Ad)
// - Content Influence Score
// - Audience Cluster Breakdown
// - Engagement Heatmap
// - Growth Prediction (MIT SLoM)
// ============================================================================

import React from "react";
import { useTribe } from "@/context/TribeContext";
import { useTribeFunnel } from "@/context/TribeFunnelContext";
import { useAttribution } from "@/context/AttributionContext";
import { useAudience } from "@/context/AudienceContext";

export default function TribeStats() {

  const { members = [] } = useTribe();
  const { evaluateFunnelStage } = useTribeFunnel();
  const { logs = [] } = useAttribution();
  const { clusters = [] } = useAudience();

  // Funnel counts
  const funnel = {
    awareness: 0,
    consideration: 0,
    conversion: 0,
    advocacy: 0,
  };

  members.forEach((m) => {
    const f = evaluateFunnelStage(m, null);
    if (f?.funnelStage) funnel[f.funnelStage]++;
  });

  // Revenue stats
  const totalRevenue = logs.reduce((sum, l) => sum + (l.amount || 0), 0);

  // Influence Score
  const influenceScore = Math.round(
    members.reduce((acc, m) => acc + (m.talentScore || 50), 0) /
    Math.max(1, members.length)
  );

  // Engagement by Cluster
  const clusterView = clusters.map((c) => ({
    name: c.name,
    engagement: c.engagement || 0,
    reach: c.reach || 0,
  }));

  return (
    <div className="p-10 text-white space-y-10" dir="rtl">

      <h1 className="text-3xl font-bold text-purple-300">📊 تحليلات القبيلة (MIT Edition)</h1>

      {/* Funnel Overview */}
      <section className="bg-white/10 p-6 rounded-xl border border-white/20 space-y-3">
        <h2 className="text-xl font-bold text-yellow-300">🔎 توزيع الأعضاء حسب مراحل الـ Funnel</h2>

        <ul className="space-y-2 text-gray-300">
          <li>🔥 الوعي (Awareness): {funnel.awareness}</li>
          <li>✨ التفكير (Consideration): {funnel.consideration}</li>
          <li>💰 التحويل (Conversion): {funnel.conversion}</li>
          <li>🚀 الترويج (Advocacy): {funnel.advocacy}</li>
        </ul>
      </section>

      {/* Revenue */}
      <section className="bg-white/10 p-6 rounded-xl border border-white/20 space-y-3">
        <h2 className="text-xl font-bold text-green-300">💰 إجمالي الإيرادات المنسوبة للقبيلة</h2>
        <p className="text-gray-200 text-lg font-bold">{totalRevenue} ريال</p>
      </section>

      {/* Influence Score */}
      <section className="bg-white/10 p-6 rounded-xl border border-white/20 space-y-3">
        <h2 className="text-xl font-bold text-blue-300">⭐ مؤشر قوة القبيلة</h2>
        <p className="text-gray-200 text-lg font-bold">{influenceScore} نقطة</p>
      </section>

      {/* Audience Clusters */}
      <section className="bg-white/10 p-6 rounded-xl border border-white/20 space-y-3">
        <h2 className="text-xl font-bold text-pink-300">🎯 تحليل الشريحة المستهدفة (Audience Clusters)</h2>

        {clusterView.map((c) => (
          <div key={c.name} className="p-3 bg-white/5 rounded-xl">
            <p className="font-bold">{c.name}</p>
            <p>📈 التفاعل: {c.engagement}</p>
            <p>🌍 الوصول: {c.reach}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
