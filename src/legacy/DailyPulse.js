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
        onAddPoints(data.points); // Ã¢Å“â€¦ Add points dynamically
        setFeedback(`Ã¢Å“â€¦ ${data.message}`);
      } else {
        setFeedback(`Ã¢Å¡Â Ã¯Â¸Â ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setFeedback("Ã¢ÂÅ’ Error sending your answer. Try again later.");
    }
  };

  return (
    <div>
      <h2>Ã¢Å“Â¨ Daily Pulse</h2>
      <p>Ã¢Ëœâ‚¬Ã¯Â¸Â Ã™â€¦Ã˜Â§ Ã˜Â£Ã˜Â¬Ã™â€¦Ã™â€ž Ã™â€žÃ˜Â­Ã˜Â¸Ã˜Â© Ã™ÂÃ™Å  Ã™Å Ã™Ë†Ã™â€¦Ã™Æ’ Ã˜Â­Ã˜ÂªÃ™â€° Ã˜Â§Ã™â€žÃ˜Â¢Ã™â€ Ã˜Å¸</p>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Ã˜Â§Ã™Æ’Ã˜ÂªÃ˜Â¨ Ã™â€žÃ˜Â­Ã˜Â¸Ã˜ÂªÃ™Æ’ Ã™â€¡Ã™â€ Ã˜Â§..."
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

