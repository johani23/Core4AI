import React, { useState } from "react";
import axios from "axios";

/**
 * Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ MVP 15 Week 2
 * Emotion & Value Density Analyzer
 */

export default function EmotionCluster() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/ai/emotion-cluster", { text });
      setResult(res.data);
    } catch (err) {
      console.error("ÃƒÂ¢Ã‚ÂÃ…â€™ Error analyzing text:", err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-4 text-purple-400">ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â­ Emotional Clustering Analyzer</h1>
      <textarea
        className="w-full h-40 p-4 rounded-xl bg-gray-900 border border-gray-700 text-gray-200"
        placeholder="Enter any post, caption, or idea to analyze..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={analyze}
        disabled={loading}
        className="mt-4 px-6 py-2 bg-purple-600 rounded-xl font-semibold hover:bg-purple-700 transition"
      >
        {loading ? "Analyzing..." : "Analyze Emotion"}
      </button>

      {result && (
        <div className="mt-6 bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-lg">
          <h2 className="text-xl font-bold text-yellow-400 mb-2">{result.cluster}</h2>
          <p className="text-gray-300 mb-3">{result.insight}</p>

          <div className="grid md:grid-cols-2 gap-3 text-sm">
            {Object.entries(result.tone_scores).map(([tone, val]) => (
              <p key={tone} className="text-gray-400">
                {tone}: <span className="text-yellow-400">{(val * 100).toFixed(1)}%</span>
              </p>
            ))}
          </div>

          <p className="mt-3 text-sm text-gray-400 italic">
            ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Value Density: <span className="text-yellow-400 font-semibold">{result.value_density}%</span>
          </p>
        </div>
      )}
    </div>
  );
}

