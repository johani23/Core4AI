// ============================================================
// ðŸ’š Core4.AI â€“ GrowAndEarn.jsx (BETA Edition)
// ------------------------------------------------------------
// â€¢ Fully rebuilt for Saudi Minimal Theme
// â€¢ Clean layout, stable, no WS dependencies
// â€¢ Focused on "10 samples" + tribe alignment
// ============================================================

import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import { FiSend } from "react-icons/fi";

export default function GrowAndEarn() {
  const [text, setText] = useState("");
  const [samples, setSamples] = useState([]);
  const SAMPLE_LIMIT = 10;

  const submitSample = async () => {
    if (!text.trim()) return;
    if (samples.length >= SAMPLE_LIMIT) {
      toast.error("You reached the 10-sample limit.");
      return;
    }

    try {
      const res = await axios.post("/api/analyze_content", {
        text,
        creator_id: "beta-user",
      });

      setSamples([...samples, res.data.result]);
      setText("");

      toast.success("Sample added!");
    } catch (e) {
      toast.error("Server error â€” try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-6">

      {/* Header */}
      <h1 className="text-3xl font-bold text-[#006C35] mb-4">
        Create Your AI Fingerprint
      </h1>
      <p className="text-gray-600 text-sm mb-8">
        Share up to <b>10 authentic samples</b> of your thinking, style, and curiosity.
        Once complete, your <span className="text-[#006C35] font-semibold">Tribe Alignment Certificate</span> unlocks automatically.
      </p>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
          placeholder="Write a short thought, idea, or captionâ€¦"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={submitSample}
          className="bg-[#006C35] text-white px-6 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
        >
          <FiSend size={16} />
          Add
        </button>
      </div>

      {/* Progress */}
      <div className="mt-4 text-sm text-gray-500">
        Samples Collected:{" "}
        <span className="font-bold text-[#006C35]">
          {samples.length} / {SAMPLE_LIMIT}
        </span>
      </div>

      {/* Sample Cards */}
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        {samples.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm"
          >
            <div className="text-sm text-gray-700 mb-2">
              <b>Suggested Tribe:</b> {s.tribe_suggestion}
            </div>

            <div className="text-xs text-gray-500">
              Quality Score: {s.quality_score}  
              <br />
              Final Value Score: {s.final_score}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
