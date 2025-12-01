import React, { useEffect, useState } from "react";
import API_BASE_URL from "./config";

function Community() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const handlePost = () => {
    if (!username || !newPost) {
      alert("Please enter a username and post content");
      return;
    }

    fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, content: newPost }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts([data, ...posts]);
        setNewPost("");
      })
      .catch((err) => console.error("Error posting message:", err));
  };

  return (
    <div>
      <h2>🌐 Community</h2>
      <input
        type="text"
        placeholder="Your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Write something..."
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
      />
      <button onClick={handlePost}>Post</button>

      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <strong>{post.username}</strong>: {post.content} <br />
            <small>{post.created_at}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Community;
