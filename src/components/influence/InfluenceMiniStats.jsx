import React from 'react';

export default function InfluenceMiniStats({ reputation, tribePower, dailyGain, cluster }) {
  return (
    <div className="grid grid-cols-2 gap-4">

      <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/10">
        <div className="text-gray-400 text-xs">قوة القبيلة</div>
        <div className="text-green-300 text-xl font-bold">{tribePower}</div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/10">
        <div className="text-gray-400 text-xs">نقاط اليوم</div>
        <div className="text-purple-300 text-xl font-bold">+{dailyGain}</div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/10">
        <div className="text-gray-400 text-xs">السمعة</div>
        <div className="text-blue-300 text-xl font-bold">{reputation}</div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/10">
        <div className="text-gray-400 text-xs">Cluster</div>
        <div className="text-yellow-300 text-xl font-bold">{cluster}</div>
      </div>

    </div>
  );
}
