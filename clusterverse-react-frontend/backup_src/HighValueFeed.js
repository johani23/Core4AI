import React, { useState, useEffect } from "react";

export default function HighValueFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/posts")
      .then((res) => res.json())
      .then(setPosts)
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <div>
      <h2>ðŸŒ Global Highlights</h2>
      {posts
        .filter((p) => p.scope === "global")
        .map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
              background: "#fef9c3",
            }}
          >
            <p>
              <strong>{post.user}:</strong> {post.content}
            </p>

            {post.media_url && (
              <div style={{ marginTop: "8px" }}>
                {post.media_type === "image" && (
                  <img
                    src={`http://127.0.0.1:8000${post.media_url}`}
                    alt="upload"
                    style={{ maxWidth: "100%", borderRadius: "6px" }}
                  />
                )}
                {post.media_type === "video" && (
                  <video
                    src={`http://127.0.0.1:8000${post.media_url}`}
                    controls
                    style={{ maxWidth: "100%", borderRadius: "6px" }}
                  />
                )}
                {post.media_type === "file" && (
                  <a
                    href={`http://127.0.0.1:8000${post.media_url}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    ðŸ“Ž Download File
                  </a>
                )}
              </div>
            )}

            {post.score && (
              <div style={{ marginTop: "6px", fontSize: "14px" }}>
                <p>ðŸ“Š <strong>Evaluation:</strong></p>
                <ul>
                  <li>Usefulness: {post.score.usefulness}</li>
                  <li>Emotional Depth: {post.score.emotional_depth}</li>
                  <li>Knowledge Value: {post.score.knowledge_value}</li>
                  <li>Innovation: {post.score.innovation}</li>
                  <li>Total Score: {post.score.total_score}</li>
                </ul>
                <p>{post.score.message}</p>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
