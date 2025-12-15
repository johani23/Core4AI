// ============================================================================
// 💚 Core4.AI – TribeFeed.jsx (MVP v1)
// ----------------------------------------------------------------------------
// Simple tribe feed with mock posts + add new post
// Creates initial engagement inside the Tribe Layer
// ============================================================================

import React, { useState } from "react";
import { useTribe } from "@/context/TribeContext";

export default function TribeFeed() {
  const { selectedTribe } = useTribe();

  // Mock feed
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "عضو ١",
      content: "أهلاً بكم في القبيلة! 🔥",
      time: "قبل 3 ساعات",
    },
    {
      id: 2,
      user: "عضو ٢",
      content: "وش أحسن طريقة أجمع XP بسرعة؟ 😅",
      time: "قبل ساعة",
    },
  ]);

  const [newPost, setNewPost] = useState("");

  // Add new post
  function addPost() {
    if (!newPost.trim()) return;

    const post = {
      id: Date.now(),
      user: "أنت",
      content: newPost,
      time: "الآن",
    };

    setPosts((prev) => [post, ...prev]);
    setNewPost("");
  }

  return (
    <div className="space-y-4" dir="rtl">
      <h2 className="text-2xl font-bold text-pink-300">
        موجز قبيلة {selectedTribe?.name} 📝
      </h2>

      {/* Input box */}
      <div className="bg-white/5 p-4 rounded-xl border border-white/10">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="اكتب منشورًا للقبيلة…"
          className="w-full bg-transparent text-white p-2 outline-none resize-none"
          rows={3}
        ></textarea>

        <button
          onClick={addPost}
          className="mt-3 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition"
        >
          نشر
        </button>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((p) => (
          <div
            key={p.id}
            className="p-4 rounded-xl bg-white/5 border border-white/10"
          >
            <div className="flex justify-between mb-2">
              <span className="text-purple-300 font-semibold">{p.user}</span>
              <span className="text-gray-400 text-sm">{p.time}</span>
            </div>

            <p className="text-white whitespace-pre-line">{p.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
