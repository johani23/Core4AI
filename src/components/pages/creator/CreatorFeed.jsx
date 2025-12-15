// ============================================================================
// 💜 Core4.AI – CreatorFeed FINAL PRO v4 (2025)
// Unified With CreatorLayout + Safe Rendering + Dark Premium Theme
// ============================================================================

import React from "react";
import { useCreator } from "@/context/CreatorContext";
import { motion } from "framer-motion";
import CreatorLayout from "./CreatorLayout";

export default function CreatorFeed() {
  const { creatorPosts } = useCreator();

  return (
    <CreatorLayout>
      <div
        className="p-10 min-h-screen text-white space-y-8"
        dir="rtl"
        style={{
          background: "linear-gradient(to bottom right, #0e0e0e, #1c1a2f)",
          borderRadius: "24px",
        }}
      >
        {/* HEADER */}
        <h1 className="text-3xl font-bold text-purple-300">📝 منشوراتك</h1>

        {/* POSTS LIST */}
        <div className="space-y-8">
          {creatorPosts.map((p) => (
            <motion.div
              key={p.id}
              className="bg-white/10 border border-white/10 p-6 rounded-3xl shadow-xl backdrop-blur-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* TEXT */}
              {p.text && (
                <p className="text-lg mb-4 leading-relaxed">{p.text}</p>
              )}

              {/* IMAGE */}
              {p.image && (
                <img
                  src={p.image}
                  alt=""
                  className="w-full max-h-96 object-cover rounded-xl mb-4"
                />
              )}

              {/* VIDEO */}
              {p.video && (
                <video
                  src={p.video}
                  controls
                  className="w-full rounded-xl mb-4"
                />
              )}

              {/* GIF */}
              {p.gif && (
                <img
                  src={p.gif}
                  alt=""
                  className="w-full max-h-96 object-cover rounded-xl mb-4"
                />
              )}

              {/* POLL */}
              {Array.isArray(p.poll) && (
                <div className="mt-4 space-y-2">
                  {p.poll.map((choice, i) => (
                    <div
                      key={i}
                      className="bg-white/5 border border-white/20 p-3 rounded-xl text-gray-200 text-sm"
                    >
                      {choice}
                    </div>
                  ))}
                </div>
              )}

              {/* STATS */}
              <div className="flex gap-6 text-gray-400 text-sm mt-6">
                <span>👁 {p.views || 0}</span>
                <span>❤️ {p.likes || 0}</span>
                <span>💾 {p.saves || 0}</span>
              </div>

              {/* DATE */}
              <p className="text-xs text-gray-500 mt-3">
                {p.createdAt
                  ? new Date(p.createdAt).toLocaleString()
                  : "—"}
              </p>
            </motion.div>
          ))}

          {/* NO POSTS STATE */}
          {creatorPosts.length === 0 && (
            <p className="text-gray-400 text-center text-lg mt-20">
              لا توجد منشورات بعد — ابدأ رحلتك الإبداعية الآن 🎬✨
            </p>
          )}
        </div>
      </div>
    </CreatorLayout>
  );
}
