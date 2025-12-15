// ============================================================================
// 💡 InfluenceDeals.jsx — عروض التأثير (العمولات – الروابط – الإحصائيات)
// ============================================================================

import React, { useState } from "react";

export default function InfluenceDeals() {
  const [products] = useState([
    {
      id: 1,
      name: "مستخلص الشاي الأخضر",
      commission: "12%",
      clicks: 140,
      conversions: 18,
    },
    {
      id: 2,
      name: "سماعات X3 اللاسلكية",
      commission: "15%",
      clicks: 90,
      conversions: 11,
    },
    {
      id: 3,
      name: "قارورة اللياقة الذكية",
      commission: "10%",
      clicks: 210,
      conversions: 32,
    },
  ]);

  const generatePromo = (productName) => {
    const promo = `https://core4.ai/promo/${productName.replace(/\s+/g, "")}`;
    navigator.clipboard.writeText(promo);
    alert("تم نسخ رابط العرض:\n" + promo);
  };

  return (
    <div className="p-6 space-y-6" dir="rtl">
      <h1 className="text-2xl font-bold text-purple-300">عروض التأثير</h1>

      <p className="text-gray-400 text-sm">
        هذه العروض مخصصة لك لزيادة قوة التأثير وكسب عمولات أعلى. انسخ الرابط وابدأ الترويج.
      </p>

      <div className="space-y-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-xl"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="text-lg font-semibold text-white">{p.name}</div>

                <div className="text-gray-400 text-sm">
                  العمولة:{" "}
                  <span className="text-green-300 font-bold">{p.commission}</span>
                </div>

                <div className="text-xs text-gray-500 mt-1">
                  النقرات: {p.clicks} — التحويلات: {p.conversions}
                </div>
              </div>

              {/* زر نسخ الرابط */}
              <button
                onClick={() => generatePromo(p.name)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm font-semibold"
              >
                نسخ رابط الترويج
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
