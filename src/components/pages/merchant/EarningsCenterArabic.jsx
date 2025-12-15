// ============================================================================
// 💚 Core4.AI – EarningsCenterArabic.jsx (Arabic RTL Premium Edition)
// ============================================================================
// - إصلاح كافة النصوص العربية (UTF-8)
// - ترتيب RTL كامل
// - الحفاظ 100% على UI و Tailwind و Layout
// ============================================================================

import React, { useEffect, useState } from "react";
import BackToMerchant from "@/components/common/BackToMerchant";

export default function EarningsCenterArabic() {
  const [earnings, setEarnings] = useState([]);
  const [total, setTotal] = useState(0);

  // تحميل بيانات الأرباح (قابلة للتبديل لاحقاً)
  useEffect(() => {
    const demo = [
      { id: 1, influencer: "أحمد القحطاني", amount: 850, date: "2025-01-14" },
      { id: 2, influencer: "لوليا", amount: 620, date: "2025-01-10" },
      { id: 3, influencer: "سما", amount: 1130, date: "2025-01-06" },
    ];

    setEarnings(demo);
    setTotal(demo.reduce((sum, e) => sum + e.amount, 0));
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6" dir="rtl">
      <BackToMerchant />

      {/* Header */}
      <h1 className="text-4xl font-extrabold text-green-700 mb-10 text-center">
        مركز الأرباح — Core4.AI
      </h1>

      {/* Summary */}
      <div className="bg-green-100 border border-green-300 p-6 rounded-xl text-center mb-8">
        <p className="text-xl font-bold text-green-700">
          إجمالي المدفوعات للمؤثرين
        </p>
        <p className="text-4xl font-extrabold text-green-800 mt-2">
          {total} ريال
        </p>
      </div>

      {/* Earnings List */}
      <div className="core-card space-y-4">
        <h2 className="section-subtitle text-green-700">سجل المدفوعات</h2>

        {earnings.length === 0 && (
          <p className="text-gray-500 text-sm">لا توجد مدفوعات حتى الآن.</p>
        )}

        {earnings.map((e) => (
          <div
            key={e.id}
            className="flex justify-between border-b pb-3 last:border-none"
          >
            <div>
              <p className="font-bold text-gray-900">{e.influencer}</p>
              <p className="text-gray-500 text-sm">{e.date}</p>
            </div>

            <p className="font-bold text-green-700">{e.amount} ريال</p>
          </div>
        ))}
      </div>
    </div>
  );
}
