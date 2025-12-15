// ============================================================================
// 💚 Core4.AI – Challenge Ranking System
// ============================================================================
// Ranks members by:
//  - XP from challenges
//  - Participation count
//  - UGC quality (video > image > text)
// ============================================================================

import React from "react";

export default function ChallengeRanking() {
  const data =
    JSON.parse(localStorage.getItem("challenge_participation") || "[]");

  const ranking = {};

  data.forEach((p) => {
    if (!ranking[p.memberId]) {
      ranking[p.memberId] = {
        xp: 0,
        count: 0,
        videoCount: 0,
        imageCount: 0
      };
    }

    ranking[p.memberId].xp += p.xpEarned;
    ranking[p.memberId].count += 1;
    if (p.type === "video") ranking[p.memberId].videoCount += 1;
    if (p.type === "image") ranking[p.memberId].imageCount += 1;
  });

  const result = Object.entries(ranking)
    .map(([memberId, stats]) => ({
      memberId,
      ...stats,
      score:
        stats.xp +
        stats.videoCount * 5 +
        stats.imageCount * 2 +
        stats.count * 2
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-3xl mx-auto mt-10" dir="rtl">

      <h1 className="text-2xl text-purple-300 font-bold mb-4">
        ⭐ ترتيب المساهمين في التحديات
      </h1>

      <div className="space-y-4">
        {result.map((r, i) => (
          <div
            key={r.memberId}
            className="bg-white/10 p-4 border border-white/20 rounded-xl"
          >
            <h3 className="text-white font-bold">#{i + 1} العضو {r.memberId}</h3>
            <p className="text-gray-300 text-sm">
              XP: {r.xp} – مشاركات: {r.count} – فيديو: {r.videoCount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
