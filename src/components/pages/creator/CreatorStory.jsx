// ============================================================================
// 💜 Core4.AI – CreatorStory FINAL v1
// A Minimal Viewer for Story Content
// ============================================================================

import React from "react";
import { useParams } from "react-router-dom";

export default function CreatorStory() {
  const { id } = useParams();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white p-10"
      dir="rtl"
      style={{
        background: "linear-gradient(to bottom right, #0e0e0e, #1a1828)",
      }}
    >
      <h1 className="text-3xl font-bold text-purple-300 mb-4">📺 Story #{id}</h1>

      <div className="w-full max-w-lg bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-xl shadow-lg">
        <p className="text-gray-300 text-center py-20">
          Story Viewer Placeholder — سيتم توصيله لاحقًا بالباكند.
        </p>
      </div>
    </div>
  );
}
