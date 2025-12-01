import React from "react";

export default function WeeklyMilestone() {
  const insights = {
    worked: [
      "✅ You shared 2 reflection notes this week.",
      "✅ Consistent check-ins increased your engagement score.",
    ],
    improve: [
      "❌ Missed participating in Harmony Circle discussions.",
      "❌ No daily pulse updates for 3 days.",
    ],
    progress: "⭐ You are now 20% closer to the Reflection Circle!",
  };

  return (
    <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-extrabold text-gray-800 mb-4 flex items-center">
        🪄 Weekly Milestone
      </h2>

      {/* What worked */}
      <div className="mb-4">
        <h3 className="font-bold text-green-700 mb-2">What Worked</h3>
        <ul className="space-y-1">
          {insights.worked.map((item, idx) => (
            <li key={idx} className="text-gray-700">{item}</li>
          ))}
        </ul>
      </div>

      {/* What to improve */}
      <div className="mb-4">
        <h3 className="font-bold text-red-700 mb-2">What to Improve</h3>
        <ul className="space-y-1">
          {insights.improve.map((item, idx) => (
            <li key={idx} className="text-gray-700">{item}</li>
          ))}
        </ul>
      </div>

      {/* Progress */}
      <div className="p-3 bg-white rounded-lg shadow text-blue-600 font-semibold text-center">
        {insights.progress}
      </div>
    </div>
  );
}
