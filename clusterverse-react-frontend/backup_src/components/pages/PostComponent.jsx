import React, { useState } from "react";
import { votePost } from "../../services/api";

function PostComponent({ posts, refresh }) {
  const [comments, setComments] = useState({});

  const handleVote = async (id, type) => {
    await votePost(id, type);
    refresh && refresh();
  };

  const handleAddComment = (id, text) => {
    if (!text.trim()) return;
    setComments((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), { user: "You", text }],
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {posts.map((p) => (
        <div
          key={p.id}
          className={`p-4 rounded shadow bg-white border transition hover:shadow-md ${
            p.type === "group" ? "border-blue-400" : "border-gray-200"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">{p.title}</h3>
            <span className="text-xs text-gray-500">{p.votes} votes</span>
          </div>

          {/* Group Badge */}
          {p.type === "group" && (
            <div className="mb-2">
              <span className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded-full">
                ðŸ·ï¸ Nominated by {p.groupName || "Group"}
              </span>
            </div>
          )}

          {/* Content */}
          <p className="text-sm text-gray-700 mb-2">{p.content}</p>

          {/* AI Tip */}
          {p.aiTip && (
            <p className="text-xs text-purple-600 mb-2">ðŸ’¡ {p.aiTip}</p>
          )}

          {/* Actions */}
          <div className="flex gap-3 mb-2">
            {p.type === "group" ? (
              <>
                <button
                  onClick={() => handleVote(p.id, "up")}
                  className="text-green-600 hover:underline"
                >
                  ðŸ‘ Nominate
                </button>
                <button
                  onClick={() => handleVote(p.id, "down")}
                  className="text-red-600 hover:underline"
                >
                  ðŸ‘Ž Reject
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleVote(p.id, "up")}
                  className="text-green-600 hover:underline"
                >
                  ðŸ‘ Upvote
                </button>
                <button
                  onClick={() => handleVote(p.id, "down")}
                  className="text-red-600 hover:underline"
                >
                  ðŸ‘Ž Downvote
                </button>
              </>
            )}
          </div>

          {/* Comments */}
          <div>
            <h4 className="text-xs font-semibold mb-1">ðŸ’¬ Comments</h4>
            <ul className="mb-2">
              {(comments[p.id] || []).map((c, i) => (
                <li
                  key={i}
                  className="text-sm bg-gray-100 rounded px-2 py-1 mb-1"
                >
                  <strong>{c.user}:</strong> {c.text}
                </li>
              ))}
            </ul>
            <CommentBox onAdd={(text) => handleAddComment(p.id, text)} />
          </div>
        </div>
      ))}
    </div>
  );
}

function CommentBox({ onAdd }) {
  const [text, setText] = useState("");
  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Write a comment..."
        className="border rounded p-1 flex-1 text-sm"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          onAdd(text);
          setText("");
        }}
        className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
      >
        Send
      </button>
    </div>
  );
}

export default PostComponent;
