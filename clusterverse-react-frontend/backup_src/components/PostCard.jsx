// src/components/PostCard.jsx
import React, { useState } from "react";
import { useProfile } from "../context/ProfileContext";
import { votePost } from "../services/api";

const PostCard = ({ post }) => {
  const { addXP } = useProfile();
  const [votes, setVotes] = useState(post.votes || 0);

  const handleVote = async (type) => {
    const res = await votePost(post.id, type);
    setVotes(res.votes);
    addXP(5); // كل تصويت يعطي 5 XP
  };

  return (
    <div className="border p-4 rounded-2xl shadow-md bg-white mb-4">
      <h3 className="text-lg font-bold">{post.title}</h3>
      <p className="text-gray-700">{post.content}</p>

      <div className="flex items-center gap-3 mt-3">
        <button
          onClick={() => handleVote("up")}
          className="px-3 py-1 bg-green-100 hover:bg-green-200 rounded-lg"
        >
          👍
        </button>
        <button
          onClick={() => handleVote("down")}
          className="px-3 py-1 bg-red-100 hover:bg-red-200 rounded-lg"
        >
          👎
        </button>
        <span className="text-gray-600">Votes: {votes}</span>
      </div>
    </div>
  );
};

export default PostCard;
