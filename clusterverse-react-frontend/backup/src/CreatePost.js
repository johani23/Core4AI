import React, { useState } from "react";
import FeedbackModel from "./FeedbackModel";

export default function CreatePost({ onPointsEarned, accumulated }) {
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [audience, setAudience] = useState("Community");

  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim() && !file) {
      alert("Please enter some content or attach a file.");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    formData.append("audience", audience);
    if (file) formData.append("file", file);

    try {
      // 1ï¸âƒ£ Save the post
      await fetch("http://127.0.0.1:8000/posts", {
        method: "POST",
        body: formData,
      });

      // 2ï¸âƒ£ Evaluate the post
      const evalRes = await fetch("http://127.0.0.1:8000/evaluate-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, username: "You" }),
      });

      const evalData = await evalRes.json();
      setResult(evalData);
      setShowModal(true);

      if (evalData.success) {
        onPointsEarned(evalData.details.total);
      }

      // Reset form
      setContent("");
      setFile(null);
    } catch (err) {
      console.error("Error submitting post:", err);
      setResult({ success: false, details: { total: 0 }, error: "Server error" });
      setShowModal(true);
    }
  };

  return (
    <div style={{ padding: "12px", background: "white", borderRadius: "8px", marginBottom: "10px" }}>
      <h2>âœï¸ Create Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Share something meaningful..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: "100%", minHeight: "60px", marginBottom: "8px" }}
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ marginBottom: "8px" }}
        />

        <select
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          style={{ marginRight: "8px" }}
        >
          <option value="Community">Community</option>
          <option value="Global">Global</option>
        </select>

        <button type="submit" style={{ background: "#4F46E5", color: "white", padding: "6px 12px", borderRadius: "6px" }}>
          Post
        </button>
      </form>

      {/* Feedback popup */}
      <FeedbackModel
        show={showModal}
        onClose={() => setShowModal(false)}
        result={result}
        accumulated={accumulated}
      />
    </div>
  );
}
