// ============================================================================
// 💜 Core4.AI – CollabMode FINAL PRO v3 (2025)
// For Creators to send & receive collaboration requests
// ============================================================================

import React, { useState } from "react";
import { motion } from "framer-motion";
import CreatorLayout from "./CreatorLayout";

export default function CollabMode() {
  const [collabs, setCollabs] = useState([
    { id: 1, name: "Techy Store", status: "pending" },
    { id: 2, name: "Fashion Hub", status: "accepted" },
  ]);

  const [brands] = useState([
    "Urban Gear",
    "Techy Fitness",
    "Beauty Line",
    "Healthy Living",
  ]);

  const [selected, setSelected] = useState("");
  const [message, setMessage] = useState("");

  function sendRequest() {
    if (!selected) return;

    setCollabs([
      ...collabs,
      {
        id: Date.now(),
        name: selected,
        status: "pending",
        message,
      },
    ]);

    setSelected("");
    setMessage("");
  }

  return (
    <CreatorLayout>
      <div className="min-h-screen p-10 text-white space-y-10" dir="rtl">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-purple-300 flex items-center gap-2">
          🤝 فرص التعاون
        </h1>

        {/* SEND NEW REQUEST */}
        <motion.div
          className="bg-white/10 border border-white/20 p-8 rounded-3xl backdrop-blur-xl shadow-xl space-y-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-bold text-purple-200">إرسال طلب تعاون جديد</h2>

          {/* BRAND SELECT */}
          <select
            className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">اختر الجهة</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          {/* MESSAGE */}
          <textarea
            className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white h-28 focus:outline-none"
            placeholder="اكتب رسالة قصيرة (اختياري)…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* SUBMIT */}
          <button
            onClick={sendRequest}
            className="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold shadow-lg"
          >
            إرسال الطلب 🚀
          </button>
        </motion.div>

        {/* EXISTING REQUESTS */}
        <div className="space-y-4">
          {collabs.map((c) => (
            <motion.div
              key={c.id}
              className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md shadow-xl flex justify-between items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div>
                <p className="font-bold">{c.name}</p>
                {c.message && (
                  <p className="text-sm text-gray-400 mt-1">{c.message}</p>
                )}
              </div>

              <StatusBadge status={c.status} />
            </motion.div>
          ))}
        </div>

      </div>
    </CreatorLayout>
  );
}

/* BADGE COMPONENT --------------------------------------------------------- */
function StatusBadge({ status }) {
  const styles = {
    pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    accepted: "bg-green-500/20 text-green-300 border-green-600/30",
    rejected: "bg-red-500/20 text-red-300 border-red-600/30",
  };

  const text = {
    pending: "قيد الانتظار",
    accepted: "مقبول",
    rejected: "مرفوض",
  };

  return (
    <span
      className={`px-4 py-2 rounded-xl border text-sm font-semibold ${styles[status]}`}
    >
      {text[status]}
    </span>
  );
}
