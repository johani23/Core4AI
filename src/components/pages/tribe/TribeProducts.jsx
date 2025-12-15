// ============================================================================
// 💚 Core4.AI – Tribe Product Board
// - Shows best members to promote each product
// - Links MIT clusters + Tribe influence engine
// ============================================================================

import React, { useEffect, useState } from "react";
import { useProductAffinity } from "@/context/TribeProductAffinity";
import { useAudience } from "@/context/AudienceContext";
import { useTribe } from "@/context/TribeContext";
import { motion } from "framer-motion";

export default function TribeProducts() {
  const { computeAll } = useProductAffinity();
  const { clusters } = useAudience();
  const { selectedTribe } = useTribe();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/merchant/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setProducts(JSON.parse(localStorage.getItem("core4ai_new_product") || "[]"));
      }
    }
    load();
  }, []);

  if (!clusters) return msg("⏳ تحليل الجمهور…");

  const topCluster = clusters[0];

  return (
    <div className="p-8 text-white" dir="rtl">
      <h1 className="text-3xl font-bold mb-6">
        🛒 منتجات مقترحة للقبيلة – {selectedTribe?.name}
      </h1>

      {products.map((p) => {
        const strongest =
          p.features?.length > 0
            ? p.features.reduce((a, b) => (a.strength > b.strength ? a : b))
            : null;

        const ranked = computeAll(p, topCluster);

        return (
          <motion.div
            key={p.id}
            className="bg-white/10 border border-white/20 p-6 rounded-2xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl font-bold">
              {p.name} – <span className="text-purple-300">{p.category}</span>
            </h2>

            <p className="text-gray-300 mt-2">
              الميزة الأقوى: {strongest?.name || "غير محدد"}
            </p>

            <p className="text-green-400 font-bold mt-1">
              أفضل شريحة جمهور: {topCluster.label}
            </p>

            <h3 className="font-bold text-lg mt-4">أفضل أعضاء للترويج 🔥</h3>

            {ranked.slice(0, 3).map((m, i) => (
              <div key={m.id} className="mt-2 p-3 bg-white/5 rounded-xl">
                <p className="font-bold">
                  {i + 1}. {m.name}
                </p>
                <p className="text-sm text-gray-400">درجة التوافق: {m.affinity}</p>
              </div>
            ))}

            <button
              className="mt-4 bg-purple-600 px-6 py-2 rounded-xl"
              onClick={() =>
                alert(`سيتم إرسال موجز التأثير لـ ${ranked[0].name} حول ${p.name}`)
              }
            >
              📩 إرسال موجز التأثير للعضو الأعلى
            </button>
          </motion.div>
        );
      })}
    </div>
  );
}

function msg(t) {
  return <div className="text-center text-gray-400 mt-20">{t}</div>;
}
