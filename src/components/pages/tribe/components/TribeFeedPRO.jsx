// ============================================================================
// 💚 Core4.AI – TribeFeed PRO (2025 Edition)
// ----------------------------------------------------------------------------
// - Text Posts
// - Image Upload
// - GIF URLs
// - Emoji Reactions
// - Simple Polls
// - Discord-style UI
// ============================================================================

import React, { useState } from "react";
import { useTribe } from "@/context/TribeContext";

export default function TribeFeedPRO() {
  const { selectedTribe } = useTribe();

  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "عضو ١",
      content: "أول منشور في القبيلة! 🔥",
      time: "قبل 3 ساعات",
      image: null,
      reactions: { fire: 3, heart: 1, laugh: 0 },
      poll: null,
    },
  ]);

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [gifUrl, setGifUrl] = useState("");
  const [pollOptions, setPollOptions] = useState([""]);
  const [isPollMode, setIsPollMode] = useState(false);

  // ---------------------------------------------------------------------------
  // HANDLE IMAGE UPLOAD
  // ---------------------------------------------------------------------------
  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  }

  // ---------------------------------------------------------------------------
  // ADD POST
  // ---------------------------------------------------------------------------
  function addPost() {
    if (!text.trim() && !image && !gifUrl && !pollOptions.filter(Boolean).length)
      return;

    const newPost = {
      id: Date.now(),
      user: "أنت",
      content: text,
      time: "الآن",
      image,
      gif: gifUrl,
      poll: isPollMode ? pollOptions.filter(Boolean) : null,
      reactions: { fire: 0, heart: 0, laugh: 0 },
    };

    setPosts([newPost, ...posts]);
    setText("");
    setImage(null);
    setGifUrl("");
    setPollOptions([""]);
    setIsPollMode(false);
  }

  // ---------------------------------------------------------------------------
  // ADD REACTION
  // ---------------------------------------------------------------------------
  function react(id, type) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, reactions: { ...p.reactions, [type]: p.reactions[type] + 1 } }
          : p
      )
    );
  }

  // ---------------------------------------------------------------------------

  return (
    <div className="space-y-6" dir="rtl">
      <h2 className="text-2xl font-bold text-pink-300 mb-4">
        موجز قبيلة {selectedTribe?.name} 📝
      </h2>

      {/* INPUT CARD */}
      <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-xl space-y-4">

        {/* TEXT AREA */}
        <textarea
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="اكتب شيئًا للقبيلة…"
          className="w-full bg-transparent text-white p-2 resize-none outline-none placeholder-gray-400"
        ></textarea>

        {/* IMAGE PREVIEW */}
        {image && (
          <img src={image} alt="uploaded" className="rounded-xl max-h-60 object-cover" />
        )}

        {/* GIF PREVIEW */}
        {gifUrl && (
          <img src={gifUrl} alt="gif" className="rounded-xl max-h-60 object-cover" />
        )}

        {/* POLL MODE */}
        {isPollMode && (
          <div className="space-y-3">
            <h3 className="text-purple-300 font-bold">🗳️ خيارات الاستطلاع:</h3>
            {pollOptions.map((opt, idx) => (
              <input
                key={idx}
                type="text"
                value={opt}
                onChange={(e) =>
                  setPollOptions((prev) => {
                    const updated = [...prev];
                    updated[idx] = e.target.value;
                    return updated;
                  })
                }
                placeholder={`الخيار ${idx + 1}`}
                className="w-full bg-white/5 text-white p-2 rounded-lg border border-white/10"
              />
            ))}

            <button
              onClick={() => setPollOptions([...pollOptions, ""])}
              className="px-3 py-1 bg-purple-600 rounded-lg text-sm"
            >
              + إضافة خيار
            </button>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 flex-wrap">

          <label className="bg-blue-600 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-500">
            📷 صورة
            <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
          </label>

          <button
            onClick={() => setIsPollMode(!isPollMode)}
            className="bg-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-500"
          >
            🗳️ استطلاع
          </button>

          <input
            type="text"
            placeholder="رابط GIF"
            className="bg-white/5 p-2 rounded-lg border border-white/10 flex-1"
            value={gifUrl}
            onChange={(e) => setGifUrl(e.target.value)}
          />

          <button
            onClick={addPost}
            className="bg-purple-600 px-6 py-2 rounded-lg hover:bg-purple-500 transition"
          >
            نشر
          </button>
        </div>
      </div>

      {/* POSTS LIST */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-xl space-y-3"
          >
            {/* HEADER */}
            <div className="flex justify-between text-gray-300 text-sm">
              <span className="text-purple-300 font-bold">{post.user}</span>
              <span>{post.time}</span>
            </div>

            {/* CONTENT */}
            {post.content && <p className="text-white whitespace-pre-line">{post.content}</p>}
            {post.image && <img src={post.image} className="rounded-xl mt-3" />}
            {post.gif && <img src={post.gif} className="rounded-xl mt-3" />}

            {/* POLL */}
            {post.poll && (
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 mt-3">
                <h4 className="text-purple-300 mb-2 font-bold">🗳️ استطلاع:</h4>
                {post.poll.map((opt, idx) => (
                  <div key={idx} className="text-gray-200 mb-1">
                    - {opt}
                  </div>
                ))}
              </div>
            )}

            {/* REACTIONS */}
            <div className="flex gap-4 mt-4 text-lg">
              <button onClick={() => react(post.id, "fire")}>🔥 {post.reactions.fire}</button>
              <button onClick={() => react(post.id, "heart")}>❤️ {post.reactions.heart}</button>
              <button onClick={() => react(post.id, "laugh")}>😂 {post.reactions.laugh}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
