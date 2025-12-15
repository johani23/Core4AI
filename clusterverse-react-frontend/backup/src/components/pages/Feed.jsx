// ============================================================
// ðŸ’Ž Core4.AI â€“ Feed.jsx (MVP-28-Live)
// ------------------------------------------------------------
// Posts trigger mock sentiment analysis & token reward.
// Real-time WebSocket pushes tribe mood/token updates.
// ============================================================

import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [user] = useState({ id: 1, tribe_id: 1, username: "CoreUser" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws");
    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.type === "sentiment_update")
        console.log("ðŸ’« Sentiment event:", msg.data);
      if (msg.type === "token_transfer")
        console.log("ðŸ’° Token flow:", msg.data);
      if (msg.type === "market_pulse")
        console.log("ðŸ“ˆ Market pulse:", msg.data.time);
    };
    return () => ws.close();
  }, []);

  async function handlePost() {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API}/sentiment/analyze`, {
        user_id: user.id,
        tribe_id: user.tribe_id,
        text,
      });
      const { label, polarity } = res.data;
      const newPost = {
        id: posts.length + 1,
        user: user.username,
        text,
        mood: label,
        polarity,
      };
      setPosts([newPost, ...posts]);
      setText("");
      // random reward
      if (Math.random() > 0.6) {
        await axios.post(`${API}/token/transfer`, {
          sender_id: 1,
          receiver_id: user.id,
          tribe_id: user.tribe_id,
          amount: Math.round(Math.random() * 5 + 1),
          sentiment_link: label,
        });
      }
    } catch (e) {
      console.error("âŒ Error:", e);
    }
    setLoading(false);
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">ðŸ—ž Tribe Feed</h1>
      <div className="bg-gray-800 p-4 rounded-xl mb-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-gray-900 rounded-lg p-3 mb-3 resize-none"
          rows={3}
          placeholder="Share your vibe..."
        />
        <button
          onClick={handlePost}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
        >
          {loading ? "Analyzing..." : "Post & Analyze"}
        </button>
      </div>
      <div className="space-y-4">
        {posts.map((p) => (
          <div key={p.id} className="bg-gray-900 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold">{p.user}</span>
              <span
                className={`text-sm ${
                  p.polarity > 0
                    ? "text-green-400"
                    : p.polarity < 0
                    ? "text-red-400"
                    : "text-yellow-300"
                }`}
              >
                {p.mood}
              </span>
            </div>
            <p className="opacity-80">{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
