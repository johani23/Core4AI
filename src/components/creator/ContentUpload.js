import React, { useState } from "react";

export default function ContentUpload() {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) return;
    alert(`Ã¢Å“â€¦ Content submitted: ${content}`);
    setContent("");
  };

  return (
    <div className="card">
      <h2>Ã°Å¸â€œÂ Upload Content</h2>
      <textarea
        rows="4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your content idea..."
      />
      <button className="tab-btn mt-3" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

