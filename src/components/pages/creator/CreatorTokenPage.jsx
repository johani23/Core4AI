// ============================================================================
// 💎 Core4.AI — CreatorTokenPage PRO v3 (FINAL)
// Token Fundamentals + VIS Math + Integrated With CreatorLayout
// ============================================================================

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useParams } from "react-router-dom";
import CreatorLayout from "./CreatorLayout";

export default function CreatorTokenPage() {
  const { id } = useParams();
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Mock Data — replace with backend later
    setToken({
      id,
      name: "Creator #" + id,
      price: 1.24,
      delta: +12,
      vis: 0.834,
      lp: 42000,
      holders: 1278,
    });
  }, [id]);

  if (!token) return null;

  return (
    <CreatorLayout>
      <div className="min-h-screen p-10 text-white space-y-10" dir="rtl">

        {/* HEADER */}
        <h1 className="text-4xl font-extrabold mb-3 text-purple-300">
          💰 رمز {token.name} (C4T)
        </h1>

        <p className="text-gray-400 mb-10">
          السعر يعتمد على VIS + حجم التداول + الطلب داخل السوق.
        </p>

        {/* PRICE BOX */}
        <motion.div
          className="bg-white/5 border border-white/10 p-8 rounded-3xl shadow-xl backdrop-blur-xl max-w-xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-bold text-purple-200 mb-3">سعر الرمز الحالي</h2>

          <div className="flex items-center gap-4">
            <p className="text-5xl font-extrabold text-purple-400">
              {token.price.toFixed(2)} CT
            </p>

            {token.delta >= 0 ? (
              <ArrowUpRight className="text-green-400" size={40} />
            ) : (
              <ArrowDownRight className="text-red-400" size={40} />
            )}

            <span
              className={`font-bold text-xl ${
                token.delta >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {token.delta}%
            </span>
          </div>

          <p className="text-gray-400 text-sm mt-4">
            VIS {token.vis} • تداول {token.holders} مستخدم.
          </p>
        </motion.div>

        {/* LP SECTION */}
        <motion.div
          className="bg-white/5 border border-white/10 p-8 rounded-3xl shadow-xl backdrop-blur-xl max-w-xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-bold text-purple-200 mb-3">📊 سيولة الرمز (Liquidity Pool)</h2>

          <p className="text-gray-400 mb-3">
            حجم السيولة: {token.lp.toLocaleString()} SAR
          </p>

          <div className="w-full bg-white/10 h-4 rounded-full">
            <div
              className="bg-purple-500 h-4 rounded-full"
              style={{ width: `${Math.min(token.lp / 1000, 100)}%` }}
            ></div>
          </div>

          <p className="text-gray-400 text-sm mt-3">
            ارتفاع VIS يرفع الطلب ويرفع سعر الرمز تلقائيًا.
          </p>
        </motion.div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-3 max-w-xl">
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-lg shadow-lg"
          >
            شراء الرمز
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-full py-3 bg-gray-300 hover:bg-gray-200 text-gray-900 rounded-xl font-bold text-lg shadow-lg"
          >
            بيع الرمز
          </motion.button>
        </div>

      </div>
    </CreatorLayout>
  );
}
