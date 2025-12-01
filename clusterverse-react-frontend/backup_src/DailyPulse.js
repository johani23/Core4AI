import React, { useState } from "react";

export default function DailyPulse({ onAddPoints }) {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async () => {
    if (!answer.trim()) return;

    try {
      const res = await fetch("http://127.0.0.1:8000/evaluate-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: 1, text: answer }),
      });

      const data = await res.json();
      if (data.reward) {
        onAddPoints(data.points); // ✅ Add points dynamically
        setFeedback(`✅ ${data.message}`);
      } else {
        setFeedback(`⚠️ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setFeedback("❌ Error sending your answer. Try again later.");
    }
  };

  return (
    <div>
      <h2>✨ Daily Pulse</h2>
      <p>☀️ ما أجمل لحظة في يومك حتى الآن؟</p>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="اكتب لحظتك هنا..."
        style={{ width: "100%", padding: "6px", marginBottom: "6px" }}
      />

      <button
        onClick={handleSubmit}
        style={{
          padding: "6px 12px",
          background: "#4f46e5",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
        }}
      >
        Submit
      </button>

      {feedback && <p style={{ marginTop: "8px" }}>{feedback}</p>}
    </div>
  );
}
