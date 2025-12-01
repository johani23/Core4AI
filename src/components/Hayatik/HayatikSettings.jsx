// ============================================================================
// 💚 Core4 حياتك – HayatikSettings.jsx (v1.1 FIXED)
// ============================================================================

import React, { useState } from "react";

export default function HayatikSettings() {
  const [sleep, setSleep] = useState("");
  const [coffee, setCoffee] = useState("");
  const [energy, setEnergy] = useState("");
  const [cleaning, setCleaning] = useState("");
  const [shoppingStyle, setShoppingStyle] = useState("");
  const [budget, setBudget] = useState("");

  const save = () => {
    const data = {
      sleep,
      coffee,
      energy,
      cleaning,
      shoppingStyle,
      budget,
    };

    console.log("Hayatik Settings Saved:", data);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8 text-[#1A1A1A]">

      {/* Title */}
      <h1 className="text-3xl font-semibold mb-8 text-[#2A2F32]">
        إعدادات حياتك
      </h1>

      {/* FIXED CLASSNAME */}
      <p className="text-gray-500 mb-6 text-sm">
        عدّل تفضيلات يومك ليعرف Core4 حياتك بشكل أفضل.
      </p>

      {/* Sleep Preference */}
      <div className="mb-8">
        <label className="block text-[#4CAF9B] font-semibold mb-2">
          نومك عادة؟
        </label>

        <select
          className="w-full bg-[#F7F8F9] border rounded-xl p-3"
          value={sleep}
          onChange={(e) => setSleep(e.target.value)}
        >
          <option value="">اختر</option>
          <option>أنام بدري</option>
          <option>أنام متأخر</option>
          <option>حسب اليوم</option>
        </select>
      </div>

      {/* Coffee Preference */}
      <div className="mb-8">
        <label className="block text-[#4CAF9B] font-semibold mb-2">
          قهوتك المفضلة؟
        </label>
        <select
          className="w-full bg-[#F7F8F9] border rounded-xl p-3"
          value={coffee}
          onChange={(e) => setCoffee(e.target.value)}
        >
          <option value="">اختر</option>
          <option>مختصة</option>
          <option>عادية</option>
          <option>بدون قهوة</option>
        </select>
      </div>

      {/* Energy Level */}
      <div className="mb-8">
        <label className="block text-[#4CAF9B] font-semibold mb-2">
          عادةً مستوى نشاطك؟
        </label>
        <select
          className="w-full bg-[#F7F8F9] border rounded-xl p-3"
          value={energy}
          onChange={(e) => setEnergy(e.target.value)}
        >
          <option value="">اختر</option>
          <option>نشاط عالي</option>
          <option>عادي</option>
          <option>منخفض</option>
        </select>
      </div>

      {/* Cleaning Preference */}
      <div className="mb-8">
        <label className="block text-[#4CAF9B] font-semibold mb-2">
          ترتيب ونظافة يومك؟
        </label>
        <select
          className="w-full bg-[#F7F8F9] border rounded-xl p-3"
          value={cleaning}
          onChange={(e) => setCleaning(e.target.value)}
        >
          <option value="">اختر</option>
          <option>أحب أرتّب يوميًا</option>
          <option>ترتيب أسبوعي</option>
          <option>على حسب الحاجة</option>
        </select>
      </div>

      {/* Shopping Style */}
      <div className="mb-8">
        <label className="block text-[#4CAF9B] font-semibold mb-2">
          ستايلك في التسوق؟
        </label>
        <select
          className="w-full bg-[#F7F8F9] border rounded-xl p-3"
          value={shoppingStyle}
          onChange={(e) => setShoppingStyle(e.target.value)}
        >
          <option value="">اختر</option>
          <option>أحب الأشياء العملية</option>
          <option>أحب الأشياء الفخمة</option>
          <option>أفضل القيمة مقابل السعر</option>
        </select>
      </div>

      {/* Budget */}
      <div className="mb-10">
        <label className="block text-[#4CAF9B] font-semibold mb-2">
          ميزانية مشترياتك اليومية؟
        </label>
        <select
          className="w-full bg-[#F7F8F9] border rounded-xl p-3"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        >
          <option value="">اختر</option>
          <option>منخفضة</option>
          <option>متوسطة</option>
          <option>عالية</option>
        </select>
      </div>

      {/* Save Button */}
      <button
        onClick={save}
        className="w-full bg-[#4CAF9B] text-white py-4 rounded-2xl text-lg font-medium shadow-md hover:opacity-90 transition"
      >
        حفظ إعدادات حياتي
      </button>
    </div>
  );
}
