import React, { useState } from "react";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [file, setFile] = useState(null);

  const handlePost = () => {
    if (newPost.trim() || file) {
      const post = {
        id: Date.now(),
        text: newPost,
        file: file ? URL.createObjectURL(file) : null,
      };
      setPosts([post, ...posts]);
      setNewPost("");
      setFile(null);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Ã°Å¸Å’Â Community Feed</h3>

      {/* Post Box */}
      <div style={styles.postBox}>
        <textarea
          style={styles.textarea}
          placeholder="Share your thoughts..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={styles.fileInput}
        />
        <button style={styles.button} onClick={handlePost}>
          Post
        </button>
      </div>

      {/* Posts List */}
      <div>
        {posts.length === 0 ? (
          <p style={styles.emptyText}>No posts yet. Be the first!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} style={styles.postCard}>
              {post.text && <p>{post.text}</p>}
              {post.file && (
                <div>
                  {post.file.endsWith(".mp4") ? (
                    <video controls style={styles.media}>
                      <source src={post.file} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={post.file} alt="upload" style={styles.media} />
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: "1.5rem",
    padding: "1rem",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  postBox: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  textarea: {
    width: "100%",
    height: "60px",
    padding: "0.5rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    resize: "none",
  },
  fileInput: {
    margin: "0.5rem 0",
  },
  button: {
    backgroundColor: "#6366f1",
    color: "#fff",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  emptyText: {
    color: "#666",
    fontStyle: "italic",
  },
  postCard: {
    backgroundColor: "#f9fafb",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "0.8rem",
  },
  media: {
    marginTop: "0.5rem",
    maxWidth: "100%",
    borderRadius: "8px",
  },
};

export default Feed;

