// ============================================================================
// 💚 Core4 حياتك – HayatikAutoMode.jsx (v1 Minimal AI Action Button)
// ============================================================================

import React, { useState } from "react";

export default function HayatikAutoMode({ onActivate }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);

    // simulate AI action
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      onActivate && onActivate();
    }, 800);
  };

  return (
    <div className="mt-14 mb-20">
      <button
        onClick={handleClick}
        className={`w-full py-4 rounded-2xl text-lg font-medium shadow-md transition
          ${done ? "bg-[#2B8A6F]" : "bg-[#4CAF9B] hover:opacity-90"} 
          text-white`}
      >
        {loading
          ? "… جاري التحسين"
          : done
          ? "✓ تم تحسين يومك"
          : "تحسين حياتي"}
      </button>

      {done && (
        <p className="text-center text-[#4CAF9B] mt-3 text-sm">
          تم ضبط يومك على الإعدادات المثالية ✨
        </p>
      )}
    </div>
  );
}
