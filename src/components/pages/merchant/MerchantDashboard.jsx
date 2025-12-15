// ============================================================================
// 🏪 Core4.AI – Merchant Dashboard (Noor Final Clean + Purple Identity)
// ============================================================================

import React from "react";
import { motion } from "framer-motion";

export default function MerchantDashboard() {
  return (
    <div className="p-6 text-white">

      {/* ------------------------------------------------------------ */}
      {/* HEADER */}
      {/* ------------------------------------------------------------ */}
      <h1 className="text-3xl font-bold mb-2 text-purple-300">
        لوحة تحكم التاجر
      </h1>

      <p className="text-gray-400 mb-8 text-sm">
        نظرة سريعة على أداء متجرك داخل Core4.AI، تتضمن المبيعات، الحملات، والمنتجات النشطة.
      </p>

      {/* ------------------------------------------------------------ */}
      {/* KPIs ROW */}
      {/* ------------------------------------------------------------ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* Sales */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-2">المبيعات</h3>
          <p className="text-emerald-400 text-3xl font-bold">SAR 12,400</p>
          <p className="text-gray-400 text-sm mt-1">+18% آخر أسبوع</p>
        </motion.div>

        {/* Orders */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-2">الطلبات</h3>
          <p className="text-purple-300 text-3xl font-bold">83</p>
          <p className="text-gray-400 text-sm mt-1">5 طلبات جديدة اليوم</p>
        </motion.div>

        {/* Visitors */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-2">الزوار</h3>
          <p className="text-blue-300 text-3xl font-bold">1,248</p>
          <p className="text-gray-400 text-sm mt-1">+6% زيادة في التفاعل</p>
        </motion.div>

      </div>

      {/* ------------------------------------------------------------ */}
      {/* AI PRICING INSIGHT */}
      {/* ------------------------------------------------------------ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-purple-900/20 border border-purple-700/20 rounded-xl p-5 mb-10"
      >
        <h3 className="text-lg font-semibold text-purple-300 mb-2">
          🔮 توصية التسعير الذكية
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          تشير بيانات Core4.AI إلى أن المنتج "Wireless Earbuds Pro" قد يحقق
          أداء أفضل عند تعديل السعر إلى <span className="text-emerald-400 font-semibold">SAR 379</span>.
        </p>
      </motion.div>

      {/* ------------------------------------------------------------ */}
      {/* CAMPAIGN SNAPSHOT */}
      {/* ------------------------------------------------------------ */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-lg mb-10">
        <h3 className="text-lg font-semibold mb-4">📣 الحملات الإعلانية النشطة</h3>

        <div className="space-y-3 text-sm text-gray-300">
          <div className="flex justify-between">
            <span>حملة Flash Week</span>
            <span className="text-emerald-400 font-semibold">+42% تفاعل</span>
          </div>

          <div className="flex justify-between">
            <span>حملة Tribe Boost</span>
            <span className="text-purple-300 font-semibold">+23% ظهور</span>
          </div>

          <div className="flex justify-between">
            <span>حملة Product Highlight</span>
            <span className="text-blue-300 font-semibold">+11% وصول</span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* PRODUCTS PERFORMANCE */}
      {/* ------------------------------------------------------------ */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">🔥 المنتجات الأعلى أداءً</h3>

        <div className="space-y-3 text-sm">

          <div className="flex justify-between">
            <span>Smart Kettle X1</span>
            <span className="text-emerald-400">+18%</span>
          </div>

          <div className="flex justify-between">
            <span>Wireless Earbuds Pro</span>
            <span className="text-purple-300">+12%</span>
          </div>

          <div className="flex justify-between">
            <span>Travel Backpack Pro</span>
            <span className="text-blue-300">+9%</span>
          </div>

        </div>
      </div>

    </div>
  );
}
