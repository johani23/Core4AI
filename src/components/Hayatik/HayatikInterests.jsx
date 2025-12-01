// ============================================================================
// 💚 Core4 حياتك – HayatikInterests.jsx (v1 Minimal Luxury UI)
// ============================================================================

import React, { useState } from "react";

export default function HayatikInterests() {
  const categories = [
    "القهوة",
    "التسوق",
    "الرياضة",
    "التنظيم والترتيب",
    "التنظيف",
    "الراحة",
    "العناية الشخصية",
    "الأجهزة المنزلية",
    "التقنية",
    "المطاعم",
    "اللياقة",
    "السفر",
  ];

  const [selected, setSelected] = useState([]);

  const toggle = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((x) => x !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8 text-[#1A1A1A]">

      {/* Title */}
      <h1 className="text-3xl font-semibold mb-8 text-[#2A2F32]">
        اهتمامـاتــك
      </h1>

      <p classname="text-gray-500 mb-6 text-sm">
        اختر الأشياء اللي تعكس حياتك وذوقك.  
      </p>

      {/* Interests Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">

        {categories.map((item, i) => (
          <button
            key={i}
            onClick={() => toggle(item)}
            className={`py-3 px-4 rounded-xl shadow-sm border 
              text-sm transition font-medium
              ${
                selected.includes(item)
                  ? "bg-[#4CAF9B] text-white border-[#4CAF9B]"
                  : "bg-[#F7F8F9] text-[#2A2F32] hover:bg-[#EDEFF0]"
              }`}
          >
            {item}
          </button>
        ))}

      </div>

      {/* Save Button */}
      <button
        className="w-full bg-[#4CAF9B] text-white py-4 rounded-2xl text-lg font-medium shadow-md hover:opacity-90 transition mt-12"
        onClick={() => console.log("Interests Saved:", selected)}
      >
        حفظ اهتمامـاتــي
      </button>
    </div>
  );
}
