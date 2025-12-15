// ============================================================================
// 💜 Core4.AI – CollabMode FINAL PRO v3 (FIXED + CreatorLayout)
// ============================================================================

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTribe } from "@/context/TribeContext";
import { useCreator } from "@/context/CreatorContext";
import CreatorLayout from "./CreatorLayout";

export default function CollabMode() {
  const { members, computeLifecycleFromXP } = useTribe();
  const { creatorRank } = useCreator();

  const [collabRequests, setCollabRequests] = useState([]);

  const candidates = useMemo(() => {
    return members
      .map((m) => {
        const { stage, progress } = computeLifecycleFromXP(m.xp || 0);
        const talentScore = Math.floor(m.xp / 10 + progress);
        return { ...m, stage, progress, talentScore };
      })
      .filter((m) => m.stage === "recruit" || m.stage === "motivate")
      .sort((a, b) => b.talentScore - a.talentScore);
  }, [members]);

  function sendCollabRequest(member) {
    setCollabRequests((prev) => [
      ...prev,
      { id: Date.now(), name: member.name, stage: member.stage },
    ]);
  }

  return (
    <CreatorLayout>
      <div
        className="min-h-screen p-10 text-white space-y-10"
        dir="rtl"
        style={{ background: "linear-gradient(to bottom right, #0f0f0f, #1d1530)" }}
      >
        {/* HEADER */}
        <motion.div
          className="bg-white/10 p-8 rounded-3xl border border-white/20 backdrop-blur-xl shadow-xl flex justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-4xl font-bold text-purple-300">🤝 وضع التعاون – Collab Mode</h1>
            <p className="text-gray-300 mt-2">أفضل أعضاء القبيلة الجاهزين للتعاون معك.</p>
          </div>

          <div className="text-center">
            <p className="text-sm text-purple-200">رتبتك كمؤثر</p>
            <p className="text-3xl font-bold text-yellow-300">{creatorRank}</p>
          </div>
        </motion.div>

        {/* CANDIDATES */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {candidates.map((c) => (
            <motion.div
              key={c.id}
              className="bg-white/10 border border-white/20 p-6 rounded-3xl shadow-xl backdrop-blur-xl"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-4">
                <img
                  src={`https://i.pravatar.cc/150?u=${c.id}`}
                  className="w-16 h-16 rounded-full border border-white/20"
                />
                <div>
                  <p className="text-xl font-bold">{c.name}</p>
                  <p className="text-gray-300 text-sm">{c.role}</p>
                </div>
              </div>

              <p className="mt-4 font-semibold text-purple-300">
                Talent Score: <span className="text-yellow-300">{c.talentScore}</span>
              </p>

              <p className="mt-1 text-sm text-gray-300">
                {c.stage === "recruit" ? "جاهز للتجنيد" : "نخبة القبيلة"}
              </p>

              <div className="mt-3 w-full bg-white/10 h-2 rounded-full">
                <motion.div
                  animate={{ width: `${c.progress}%` }}
                  className="h-full bg-purple-400 rounded-full"
                />
              </div>

              <button
                onClick={() => sendCollabRequest(c)}
                className="mt-5 w-full bg-purple-600 hover:bg-purple-500 py-2 rounded-xl font-bold shadow-lg"
              >
                🤝 إرسال طلب تعاون
              </button>
            </motion.div>
          ))}
        </section>

        {/* COLLAB REQUESTS */}
        {collabRequests.length > 0 && (
          <motion.div
            className="bg-white/10 border border-white/20 p-8 rounded-3xl backdrop-blur-xl mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-green-300 mb-4">📬 طلبات التعاون المرسلة</h2>

            <ul className="space-y-3 text-gray-300">
              {collabRequests.map((r) => (
                <li
                  key={r.id}
                  className="bg-white/5 p-4 rounded-xl border border-white/10"
                >
                  تم إرسال طلب تعاون إلى{" "}
                  <span className="text-white">{r.name}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </CreatorLayout>
  );
}
