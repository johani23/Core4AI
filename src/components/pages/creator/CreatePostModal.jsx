// ============================================================================
// 💜 Core4.AI – CreatePostModal FINAL PRO v4 (2025)
// ============================================================================
import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useCreator } from "@/context/CreatorContext";

export default function CreatePostModal({ open, onClose }) {
  const { addCreatorPost, addCreatorXP } = useCreator();

  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [gif, setGif] = useState("");
  const [poll1, setPoll1] = useState("");
  const [poll2, setPoll2] = useState("");

  if (!open) return null;

  function handleSubmit() {
    const post = {
      id: Date.now(),
      text,
      image,
      gif,
      video,
      poll: poll1 && poll2 ? [poll1, poll2] : null,
      createdAt: new Date().toISOString(),
      views: Math.floor(Math.random() * 200),
      likes: Math.floor(Math.random() * 100),
      saves: Math.floor(Math.random() * 40),
    };

    addCreatorPost(post);

    let xp = 10;
    if (image) xp += 5;
    if (video) xp += 15;
    if (gif) xp += 8;
    if (poll1 && poll2) xp += 12;

    addCreatorXP(xp);
    onClose();
  }

  const inputClass =
    "w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none";

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xl z-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-[#1b1a22] w-full max-w-xl p-8 rounded-3xl border border-white/10 shadow-xl text-white space-y-6"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-purple-300">إنشاء منشور جديد</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-300 hover:text-white" />
          </button>
        </div>

        {/* TEXT */}
        <textarea
          className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none"
          rows={3}
          placeholder="اكتب شيئًا…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* MEDIA INPUTS */}
        <input
          type="text"
          className={inputClass}
          placeholder="رابط صورة"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <input
          type="text"
          className={inputClass}
          placeholder="رابط فيديو"
          value={video}
          onChange={(e) => setVideo(e.target.value)}
        />

        <input
          type="text"
          className={inputClass}
          placeholder="رابط GIF"
          value={gif}
          onChange={(e) => setGif(e.target.value)}
        />

        {/* POLL */}
        <div>
          <p className="text-purple-300 font-semibold mb-2">استطلاع (اختياري)</p>
          <input
            className={inputClass}
            placeholder="الخيار الأول"
            value={poll1}
            onChange={(e) => setPoll1(e.target.value)}
          />

          <input
            className={`${inputClass} mt-3`}
            placeholder="الخيار الثاني"
            value={poll2}
            onChange={(e) => setPoll2(e.target.value)}
          />
        </div>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 mt-6 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-lg shadow-lg"
        >
          نشر المنشور 🚀
        </button>
      </motion.div>
    </motion.div>
  );
}
