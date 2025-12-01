import React, { useEffect, useState } from "react";

function Community() {
  const [posts, setPosts] = useState([
    { id: 1, content: "🚀 First post in the community!", author: "Noor" },
    { id: 2, content: "🎉 Excited to join Core4!", author: "Sama" },
  ]);

  return (
    <div className="p-6 bg-white shadow-md rounded-xl">
      <h1 className="text-2xl font-bold mb-4">🌍 Community</h1>
      <div className="space-y-4">
        {posts.map((p) => (
          <div key={p.id} className="p-4 border rounded bg-gray-50">
            <p>{p.content}</p>
            <span className="text-sm text-gray-500">- {p.author}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Community;
