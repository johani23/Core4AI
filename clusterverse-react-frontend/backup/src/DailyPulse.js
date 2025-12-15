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
        onAddPoints(data.points); // âœ… Add points dynamically
        setFeedback(`âœ… ${data.message}`);
      } else {
        setFeedback(`âš ï¸ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setFeedback("âŒ Error sending your answer. Try again later.");
    }
  };

  return (
    <div>
      <h2>âœ¨ Daily Pulse</h2>
      <p>â˜€ï¸ Ù…Ø§ Ø£Ø¬Ù…Ù„ Ù„Ø­Ø¸Ø© ÙÙŠ ÙŠÙˆÙ…Ùƒ Ø­ØªÙ‰ Ø§Ù„Ø¢Ù†ØŸ</p>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Ø§ÙƒØªØ¨ Ù„Ø­Ø¸ØªÙƒ Ù‡Ù†Ø§..."
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
