// ============================================================================
// 💎 Core4.AI — CreatorDashboardOS (Dark Mode Premium v2)
// Now Wrapped in CreatorLayout + Connected with CreatorContext
// ============================================================================

import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Sparkles,
  Zap,
  PieChart,
  Activity,
  Eye,
  Heart,
} from "lucide-react";

import CreatorLayout from "./CreatorLayout";
import { useCreator } from "@/context/CreatorContext";

export default function CreatorDashboardOS() {
  const { creatorXP, creatorRank, creatorPosts } = useCreator();

  const views = creatorPosts.reduce((s, p) => s + (p.views || 0), 0);
  const likes = creatorPosts.reduce((s, p) => s + (p.likes || 0), 0);
  const saves = creatorPosts.reduce((s, p) => s + (p.saves || 0), 0);

  const engagementRate =
    views > 0 ? (((likes + saves) / views) * 100).toFixed(1) : 0;

  return (
    <CreatorLayout>
      <div className="min-h-screen text-white space-y-12" dir="rtl">

        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-extrabold flex items-center gap-3 text-purple-300">
            ✨ مركز التحكم لصانع المحتوى — OS
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            لوحة ذكاء اصطناعي متكاملة — أداءك، قبيلتك، وتحليل المحتوى… في مكان واحد.
          </p>
        </div>

        {/* TOP KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KPI title="مشاهدات الأسبوع" value={views} icon={<Eye className="text-purple-400" />} trend="+12%" />
          <KPI title="إعجابات" value={likes} icon={<Heart className="text-pink-400" />} trend="+4%" />
          <KPI title="معدل التفاعل" value={`${engagementRate}%`} icon={<TrendingUp className="text-green-400" />} trend="+5%" />
          <KPI title="الرتبة الحالية" value={creatorRank} icon={<Zap className="text-yellow-400" />} trend="🔥" />
        </div>

        {/* TRIBE INSIGHTS */}
        <Section title="أداء القبائل" icon={<Users className="text-purple-300" />}>
          <TribeRow tribe="Techy Tribe" percent={92} />
          <TribeRow tribe="Fashionists" percent={74} />
          <TribeRow tribe="EventGoers" percent={64} />
        </Section>

        {/* FORMAT PERFORMANCE */}
        <Section title="أداء أنواع المحتوى" icon={<PieChart className="text-blue-300" />}>
          <FormatRow label="Reels" percent={92} color="bg-purple-500" />
          <FormatRow label="الصور" percent={75} color="bg-blue-500" />
          <FormatRow label="Stories" percent={40} color="bg-gray-500" />
        </Section>

        {/* AI INSIGHTS */}
        <Section title="توصيات الذكاء الاصطناعي" icon={<Sparkles className="text-yellow-300" />}>
          <AIItem text="⏰ أفضل وقت للنشر اليوم: ٦:٣٠ مساءً" />
          <AIItem text="🎥 أفضل صيغة محتوى: ريلز — 12 ثانية" />
          <AIItem text="🔥 الترند الأقوى لجمهورك: Techy Reviews" />
          <AIItem text="🏷 هاشتاقات مقترحة: techy • ai • innovation • SaudiMakers" />
        </Section>

        {/* MISSIONS */}
        <Section title="مهام اليوم" icon={<Activity className="text-purple-400" />}>
          <Mission text="انشر ريلز 12 ثانية" reward="+20 XP" />
          <Mission text="رد على 5 تعليقات" reward="+10 XP" />
          <Mission text="استخدم هاشتاقات Techy" reward="+15 XP" />
        </Section>

      </div>
    </CreatorLayout>
  );
}

/* COMPONENTS --------------------------------------------------------------- */

function Section({ title, icon, children }) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        {icon} {title}
      </h2>
      {children}
    </div>
  );
}

function KPI({ icon, title, value, trend }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 shadow-lg"
    >
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <p className="text-gray-300">{title}</p>
      </div>

      <h3 className="text-3xl font-bold">{value}</h3>
      <p className="text-green-400 text-sm mt-1">{trend}</p>
    </motion.div>
  );
}

function TribeRow({ tribe, percent }) {
  return (
    <div className="mb-4">
      <p className="text-lg font-semibold text-gray-200 mb-2">{tribe}</p>

      <div className="w-full bg-gray-700/50 h-3 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1 }}
          className="h-3 bg-purple-500 rounded-full"
        />
      </div>

      <p className="text-sm text-gray-400 mt-1">{percent}% توافق</p>
    </div>
  );
}

function FormatRow({ label, percent, color }) {
  return (
    <div className="mb-4">
      <p className="font-bold text-gray-200 mb-1">{label}</p>

      <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1 }}
          className={`h-3 rounded-full ${color}`}
        />
      </div>

      <p className="text-sm text-gray-400 mt-1">{percent}% أداء</p>
    </div>
  );
}

function AIItem({ text }) {
  return (
    <li className="bg-white/5 border border-white/10 p-4 rounded-xl shadow-md">
      {text}
    </li>
  );
}

function Mission({ text, reward }) {
  return (
    <li className="bg-purple-900/20 border border-purple-700 p-4 rounded-xl flex justify-between items-center text-gray-200">
      <span>{text}</span>
      <span className="text-purple-300 font-bold">{reward}</span>
    </li>
  );
}
