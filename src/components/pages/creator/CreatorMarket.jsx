// ============================================================================
// 💎 Core4.AI — CreatorMarket PRO v3 (FINAL)
// Integrated With CreatorLayout + Dark Premium Theme
// ============================================================================

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CreatorLayout from "./CreatorLayout";

const API_BASE = "http://127.0.0.1:8000";

export default function CreatorMarket() {
  const [market, setMarket] = useState([]);
  const navigate = useNavigate();

  const fetchMarket = () => {
    fetch(`${API_BASE}/market`)
      .then((r) => r.json())
      .then((d) => setMarket(d.market || []))
      .catch(() => {
        // fallback mock if backend is offline
        setMarket([
          { name: "SamaTech", vis: 0.982, price: 12.5, vis_delta: 0.12 },
          { name: "NoorVision", vis: 0.771, price: 9.8, vis_delta: -0.04 },
          { name: "AishaCreates", vis: 0.653, price: 7.1, vis_delta: 0.03 },
        ]);
      });
  };

  useEffect(() => {
    fetchMarket();
    const i = setInterval(fetchMarket, 5000);
    return () => clearInterval(i);
  }, []);

  return (
    <CreatorLayout>
      <div className="min-h-screen p-10 text-white" dir="rtl">

        {/* HEADER */}
        <h1 className="text-4xl font-extrabold mb-10 text-yellow-400 flex gap-2">
          <Sparkles /> سوق صُنّاع المحتوى (Creator Market)
        </h1>

        {/* TABLE */}
        <table className="w-full border-t border-gray-900/60 text-sm">
          <thead>
            <tr className="text-gray-400">
              <th>#</th>
              <th>المنشئ</th>
              <th>VIS</th>
              <th>سعر الرمز</th>
              <th>الزخم</th>
              <th>فتح الصفحة</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {market.map((c, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-b border-gray-800 hover:bg-gray-900 cursor-pointer"
                >
                  <td className="p-2 text-gray-500">{i + 1}</td>
                  <td className="font-semibold">{c.name}</td>

                  <td className="text-green-400">{c.vis.toFixed(3)}</td>
                  <td className="text-blue-400">{c.price.toFixed(2)} CT</td>

                  {/* Momentum */}
                  <td className="w-1/3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(Math.abs(c.vis_delta) * 100, 100)}%`,
                      }}
                      className={`h-2 rounded-full ${
                        c.vis_delta >= 0 ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></motion.div>
                  </td>

                  <td>
                    <button
                      onClick={() => navigate(`/creator/token/${i + 1}`)}
                      className="text-yellow-400 underline hover:text-yellow-300"
                    >
                      فتح الرمز →
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </CreatorLayout>
  );
}
