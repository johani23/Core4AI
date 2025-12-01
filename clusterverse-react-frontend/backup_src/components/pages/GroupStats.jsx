import React, { useEffect, useState } from "react";
import {
  getGroups,
  getGroupMetrics,
  runCohesionAnalysis,
} from "@services/api";
import { getMomentumColor } from "@data/dataSync";

/**
 * Core4.AI – MVP 14 Hybrid GroupStats
 * Combines backend-powered analytics with MVP10 visual design.
 */

export default function GroupStats() {
  const [groups, setGroups] = useState([]);
  const [selected, setSelected] = useState(null);
  const [cohesion, setCohesion] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load groups from backend
  useEffect(() => {
    async function fetchGroups() {
      try {
        const data = await getGroups();
        setGroups(data || []);
      } catch (err) {
        console.error("❌ Failed to load groups:", err);
      }
    }
    fetchGroups();
  }, []);

  // Handle selection + load metrics + run analysis
  const handleSelect = async (g) => {
    setSelected(g);
    setLoading(true);
    try {
      const [metricData, analysis] = await Promise.all([
        getGroupMetrics(g.id),
        runCohesionAnalysis(g.id),
      ]);
      setMetrics(metricData.history || []);
      setCohesion(analysis);
    } catch (err) {
      console.error("❌ Error fetching analysis:", err);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">📊 Group Performance Insights</h1>

      {/* 🔹 Group Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {groups.map((g) => (
          <div
            key={g.id}
            onClick={() => handleSelect(g)}
            className={`p-5 rounded-2xl cursor-pointer border transition ${
              selected?.id === g.id
                ? "border-purple-600 bg-gray-800"
                : "border-gray-800 bg-gray-900 hover:border-purple-600"
            }`}
          >
            <h2 className="font-semibold text-lg mb-1">{g.name}</h2>
            <p className="text-sm text-gray-400">
              Engagement:{" "}
              <span className="text-yellow-400 font-semibold">
                {g.engagement || "–"}%
              </span>{" "}
              • Trend:{" "}
              <span
                style={{ color: getMomentumColor(g.trend) }}
                className="font-medium"
              >
                {g.trend}
              </span>
            </p>
            <p className="text-xs mt-1 italic text-gray-500">
              {g.summary || "No summary available"}
            </p>
          </div>
        ))}
      </div>

      {/* 🔹 Selected Group Details */}
      {selected && (
        <div
          className="mt-10 bg-gray-900 p-6 rounded-2xl border shadow-xl"
          style={{
            borderColor: getMomentumColor(selected.trend),
          }}
        >
          <h2 className="text-xl font-bold mb-2">{selected.name}</h2>
          <p className="text-gray-400 mb-3">
            Engagement:{" "}
            <span className="text-yellow-400 font-semibold">
              {selected.engagement}%
            </span>{" "}
            • Trend:{" "}
            <span
              style={{ color: getMomentumColor(selected.trend) }}
              className="font-medium"
            >
              {selected.trend}
            </span>
          </p>

          {/* Cohesion Data */}
          {loading && (
            <p className="text-sm text-gray-500 italic">Analyzing AI cohesion...</p>
          )}
          {cohesion && !loading && (
            <>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <p className="text-gray-400">Cohesion</p>
                  <p className="text-yellow-400 font-semibold text-lg">
                    {cohesion.cohesion_score?.toFixed(1)}%
                  </p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <p className="text-gray-400">Balance</p>
                  <p className="text-yellow-400 font-semibold text-lg">
                    {(cohesion.balance_index * 100)?.toFixed(1)}%
                  </p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <p className="text-gray-400">Resonance</p>
                  <p className="text-yellow-400 font-semibold text-lg">
                    {cohesion.resonance_score?.toFixed(1)}%
                  </p>
                </div>
              </div>

              {cohesion.drift_reason && (
                <p className="mt-3 text-sm text-red-400 italic">
                  ⚠️ Drift detected: {cohesion.drift_reason}
                </p>
              )}
            </>
          )}

          {/* 🔹 Metrics History */}
          {metrics.length > 0 && (
            <div className="mt-6 bg-gray-800 p-4 rounded-xl border border-gray-700">
              <h3 className="text-md font-semibold text-yellow-400 mb-2">
                Historical Metrics
              </h3>
              {metrics.map((m, i) => (
                <p key={i} className="text-gray-300 text-sm">
                  {new Date(m.timestamp || m.created_at).toLocaleString()} —{" "}
                  <span className="text-yellow-400">
                    {m.cohesion_score || m.cohesion}%
                  </span>
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
