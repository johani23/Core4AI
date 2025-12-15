// ============================================================================
// 💜 Core4.AI – CreatorProfile FINAL v2
// Polished Profile Design for Demo
// ============================================================================

import React from "react";
import { useCreator } from "@/context/CreatorContext";

export default function CreatorProfile() {
  const { creatorRank, creatorXP } = useCreator();

  return (
    <div
      className="p-10 min-h-screen text-white space-y-10"
      dir="rtl"
      style={{ background: "linear-gradient(to bottom right, #0e0e0e, #1a1828)" }}
    >
      <h1 className="text-4xl font-bold text-purple-300 mb-6">
        👤 الملف الشخصي
      </h1>

      <div className="bg-white/10 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-xl max-w-3xl mx-auto">
        <div className="flex items-center gap-6">
          <img
            src="https://i.pravatar.cc/200"
            className="w-32 h-32 rounded-3xl border border-white/20 shadow-lg"
          />

          <div>
            <p className="text-2xl font-bold text-white">Ahmed Creates</p>
            <p className="text-purple-300 font-semibold">الرتبة: {creatorRank}</p>
            <p className="text-gray-400 text-sm mt-1">
              الخبرة الحالية: {creatorXP} XP
            </p>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-lg font-bold mb-2 text-purple-300">نبذة</p>
          <p className="text-gray-300 leading-loose">
            صانع محتوى متخصص في التقنية والذكاء الاصطناعي. أحب تبسيط المفاهيم
            وتقديم محتوى إبداعي يفيد المجتمع السعودي.
          </p>
        </div>
      </div>
    </div>
  );
}
