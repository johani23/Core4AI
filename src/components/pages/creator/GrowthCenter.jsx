// ============================================================================
// 💚 Core4.AI — GrowthCenter PRO v6 (FINAL)
// Analytics + Tribe Insights + AI Growth Summary
// ✨ Designed by Sama — Engineered by Noor
// ============================================================================

import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  BarChart3,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
  Activity,
  Gauge,
} from "lucide-react";

export default function GrowthCenter() {
  return (
    <div
      className="min-h-screen w-full bg-gray-100 text-gray-900 p-8"
      style={{ direction: "rtl" }}
    >
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">
          📊 مركز النمو والتحليل
        </h1>
        <p className="text-gray-500 mt-2">
          رؤية شاملة لأداءك — عبر القبائل، الصيغ، الوقت، وتوصيات الذكاء الاصطناعي.
        </p>
      </div>

      {/* TOP KPI BOXES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-5xl mx-auto">
        <KPI
          icon={<TrendingUp className="text-purple-600" />}
          title="مشاهدات الأسبوع"
          value="124,900"
          trend="+12%"
        />
        <KPI
          icon={<BarChart3 className="text-blue-600" />}
          title="معدل التفاعل"
          value="8.4%"
          trend="+5%"
        />
        <KPI
          icon={<Users className="text-green-600" />}
          title="نمو المتابعين"
          value="+980"
          trend="+3%"
        />
      </div>

      {/* TRIBE INSIGHTS */}
      <div className="bg-white rounded-2xl shadow-md p-8 mb-10 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          👥 أداء القبائل (Tribe Insights)
        </h2>

        <div className="space-y-5">
          <TribeRow tribe="Techy Tribe" value={87} trend="up" />
          <TribeRow tribe="Fashionists" value={62} trend="up" />
          <TribeRow tribe="EventGoers" value={44} trend="down" />
        </div>
      </div>

      {/* CONTENT FORMAT */}
      <div className="bg-white rounded-2xl shadow-md p-8 mb-10 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">🎥 أي صيغة محتوى تناسبك أكثر؟</h2>

        <FormatRow label="Reels" percent={92} color="bg-purple-500" />
        <FormatRow label="Static Photos" percent={75} color="bg-blue-500" />
        <FormatRow label="Stories" percent={40} color="bg-gray-400" />
      </div>
      {/* AI GROWTH SUMMARY — NEW BLOCK */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-2xl shadow-md p-8 mb-12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-yellow-700 flex items-center gap-2">
          <Gauge className="text-yellow-600" /> ملخص النمو من Core4.AI
        </h2>

        <p className="text-gray-800 text-lg font-semibold mb-4">
          🔮 تحليل شامل للأداء خلال آخر 7 أيام:
        </p>

        <ul className="space-y-3 text-gray-700">
          <li>• أفضل وقت للنشر: <span className="font-bold text-purple-700">٦:٣٠ مساءً</span></li>
          <li>• أعلى قبيلة تفاعلًا: <span className="font-bold text-green-700">Techy Tribe</span></li>
          <li>• أفضل صيغة محتوى: <span className="font-bold text-blue-700">ريلز — 12 ثانية</span></li>
          <li>• نسبة الاحتفاظ بالجمهور ارتفعت: <span className="font-bold text-yellow-700">+5%</span></li>
        </ul>

        <div className="mt-6 bg-white border border-yellow-200 rounded-xl p-4 shadow-sm">
          <h3 className="font-bold text-yellow-700 mb-2">✨ توصية Core4.AI</h3>
          <p className="text-gray-700 leading-relaxed">
            استمر في نشر محتوى تقني سريع بصيغة ريلز بين الساعة ٦–٨ مساءً،  
            مع استعمال هاشتاقات Techy + Innovation — هذا النوع يحصل على أعلى نمو حالياً.
          </p>
        </div>
      </div>

      {/* DAILY MISSIONS */}
      <div className="bg-purple-50 rounded-2xl shadow-inner p-8 mb-12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-purple-700">
          <Activity className="text-purple-600" /> مهام اليوم 🔥
        </h2>

        <ul className="space-y-4">
          <Mission text="رد على 5 تعليقات." />
          <Mission text="انشر صورة أو فيديو خلال نصف ساعة." />
          <Mission text="استخدم 3 هاشتاقات جديدة." />
        </ul>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTS — Reusable UI Pieces
// ============================================================================

function KPI({ icon, title, value, trend }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white shadow-md rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <p className="text-gray-500 font-semibold">{title}</p>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-bold">{value}</h3>
        <span className="text-green-600 text-sm">{trend}</span>
      </div>
    </motion.div>
  );
}

function TribeRow({ tribe, value, trend }) {
  return (
    <div className="flex justify-between items-center border-b pb-3">
      <span className="font-semibold">{tribe}</span>

      <div className="flex items-center gap-2">
        <span className="text-lg font-bold">{value}%</span>
        {trend === "up" ? (
          <ArrowUpRight className="text-green-600" />
        ) : (
          <ArrowDownRight className="text-red-600" />
        )}
      </div>
    </div>
  );
}

function FormatRow({ label, percent, color }) {
  return (
    <div className="mb-5">
      <p className="font-bold mb-1">{label}</p>

      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className={`h-4 ${color} rounded-full`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      <p className="text-sm text-gray-500 mt-1">{percent}% أداء</p>
    </div>
  );
}

function Mission({ text }) {
  return (
    <li className="bg-white border border-purple-200 p-4 rounded-xl text-purple-800 font-semibold shadow-sm">
      {text}
    </li>
  );
}
