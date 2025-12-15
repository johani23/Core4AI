import React, { useEffect, useState } from "react";

import {
  getGroups,
  getGroupMetrics,
  runCohesionAnalysis,
} from "@services/api";

import { getMomentumColor } from "../../../assets/data/dataSync";

/**
 * Core4.AI Ã¢â‚¬â€œ GroupStats (Noor UTF-8 Clean Edition)
 */

export default function GroupStats() {
  const [groups, setGroups] = useState([]);
  const [selected, setSelected] = useState(null);
  const [cohesion, setCohesion] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load groups on mount
  useEffect(() => {
    async function fetchGroups() {
      try {
        const data = await getGroups();
        setGroups(data || []);
      } catch (err) {
        console.error("Ã¢ÂÅ’ Failed to load groups:", err);
      }
    }
    fetchGroups();
  }, []);

  // Handle selection
  const handleSelect = async (g) => {
    setSelected(g);
    setLoading(true);

    try {
      const [metricData, analysis] = await Promise.all([
        getGroupMetrics(g.id),
        runCohesionAnalysis(g.id),
      ]);

      setMetrics(metricData?.history || []);
      setCohesion(analysis);
    } catch (err) {
      console.error("Ã¢ÂÅ’ Error fetching analysis:", err);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white" style={{ direction: "rtl" }}>
      <h1 className="text-2xl font-bold mb-6">Ã°Å¸â€œÅ  Ã˜Â¥Ã˜Â­Ã˜ÂµÃ˜Â§Ã˜Â¦Ã™Å Ã˜Â§Ã˜Âª Ã˜Â£Ã˜Â¯Ã˜Â§Ã˜Â¡ Ã˜Â§Ã™â€žÃ™â€¦Ã˜Â¬Ã™â€¦Ã™Ë†Ã˜Â¹Ã˜Â§Ã˜Âª</h1>

      {/* GROUP CARDS */}
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
              Ã˜Â§Ã™â€žÃ˜ÂªÃ™ÂÃ˜Â§Ã˜Â¹Ã™â€ž:{" "}
              <span className="text-yellow-400 font-semibold">
                {g.engagement || "Ã¢â‚¬â€œ"}%
              </span>
              {" Ã¢â‚¬Â¢ "}
              Ã˜Â§Ã™â€žÃ˜ÂªÃ™Ë†Ã˜Â¬Ã™â€˜Ã™â€¡:{" "}
              <span
                className="font-medium"
                style={{ color: getMomentumColor(g.trend) }}
              >
                {g.trend}
              </span>
            </p>

            <p className="text-xs mt-1 italic text-gray-500">
              {g.summary || "Ã™â€žÃ˜Â§ Ã™Å Ã™Ë†Ã˜Â¬Ã˜Â¯ Ã™Ë†Ã˜ÂµÃ™Â"}
            </p>
          </div>
        ))}
      </div>

      {/* SELECTED GROUP DETAILS */}
      {selected && (
        <div
          className="mt-10 bg-gray-900 p-6 rounded-2xl border shadow-xl"
          style={{
            borderColor: getMomentumColor(selected.trend),
          }}
        >
          <h2 className="text-xl font-bold mb-2">{selected.name}</h2>

          <p className="text-gray-400 mb-3">
            Ã˜Â§Ã™â€žÃ˜ÂªÃ™ÂÃ˜Â§Ã˜Â¹Ã™â€ž:{" "}
            <span className="text-yellow-400 font-semibold">
              {selected.engagement}%
            </span>
            {" Ã¢â‚¬Â¢ "}
            Ã˜Â§Ã™â€žÃ˜ÂªÃ™Ë†Ã˜Â¬Ã™â€˜Ã™â€¡:{" "}
            <span
              style={{ color: getMomentumColor(selected.trend) }}
              className="font-medium"
            >
              {selected.trend}
            </span>
          </p>

          {/* AI Cohesion */}
          {loading && (
            <p className="text-sm text-gray-500 italic">Ã˜ÂªÃ˜Â­Ã™â€žÃ™Å Ã™â€ž Ã˜Â§Ã™â€žÃ˜Â°Ã™Æ’Ã˜Â§Ã˜Â¡ Ã˜Â§Ã™â€žÃ˜Â§Ã˜ÂµÃ˜Â·Ã™â€ Ã˜Â§Ã˜Â¹Ã™Å  Ã˜Â¬Ã˜Â§Ã˜Â±Ã™ÂÃ¢â‚¬Â¦</p>
          )}

          {cohesion && !loading && (
            <>
              <div className="grid md:grid-cols-3 gap-4 text-sm">

                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <p className="text-gray-400">Ã˜Â§Ã™â€žÃ˜ÂªÃ™â€¦Ã˜Â§Ã˜Â³Ã™ÂÃ™Æ’</p>
                  <p className="text-yellow-400 font-semibold text-lg">
                    {cohesion.cohesion_score?.toFixed(1)}%
                  </p>
                </div>

                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <p className="text-gray-400">Ã˜Â§Ã™â€žÃ˜ÂªÃ™Ë†Ã˜Â§Ã˜Â²Ã™â€ </p>
                  <p className="text-yellow-400 font-semibold text-lg">
                    {(cohesion.balance_index * 100)?.toFixed(1)}%
                  </p>
                </div>

                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <p className="text-gray-400">Ã˜Â§Ã™â€žÃ˜Â±Ã™â€ Ã™Å Ã™â€ </p>
                  <p className="text-yellow-400 font-semibold text-lg">
                    {cohesion.resonance_score?.toFixed(1)}%
                  </p>
                </div>

              </div>

              {cohesion.drift_reason && (
                <p className="mt-3 text-sm text-red-400 italic">
                  Ã¢Å¡Â Ã¯Â¸Â Ã˜Â§Ã™â€ Ã˜Â­Ã˜Â±Ã˜Â§Ã™Â: {cohesion.drift_reason}
                </p>
              )}
            </>
          )}

          {/* Metrics Timeline */}
          {metrics.length > 0 && (
            <div className="mt-6 bg-gray-800 p-4 rounded-xl border border-gray-700">
              <h3 className="text-md font-semibold text-yellow-400 mb-2">
                Ã˜Â§Ã™â€žÃ˜ÂªÃ˜Â§Ã˜Â±Ã™Å Ã˜Â® Ã˜Â§Ã™â€žÃ˜Â²Ã™â€¦Ã™â€ Ã™Å  Ã™â€žÃ™â€žÃ™â€¦Ã˜Â¤Ã˜Â´Ã˜Â±Ã˜Â§Ã˜Âª
              </h3>

              {metrics.map((m, i) => (
                <p key={i} className="text-gray-300 text-sm">
                  {new Date(m.timestamp || m.created_at).toLocaleString()} Ã¢â‚¬â€{" "}
                  <span className="text-yellow-400">
                    {m.cohesion_score ?? m.cohesion}%
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
