import React, { useEffect, useState } from "react";

export default function PopUpQuestion({ userId }) {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [visible, setVisible] = useState(false);
  const [ring, setRing] = useState("Reflection");

  // Ã°Å¸Å¸Â¢ 1. Get user's closest ring from backend
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/closest-ring/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setRing(data.ring || "Reflection");

        // Ã°Å¸Å¸Â¢ 2. Get a pop-up question for that ring
        return fetch(`http://127.0.0.1:8000/popup-question/${data.ring}`);
      })
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data.question);
        setVisible(true);
      });
  }, [userId]);

  // Ã°Å¸Å¸Â¢ 3. Submit answer
  const handleSubmit = () => {
    fetch("http://127.0.0.1:8000/popup-answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        ring,
        question,
        answer,
      }),
    }).then(() => {
      setVisible(false);
    });
  };

  if (!visible || !question) return null;

  return (
    <div style={{
      position: "fixed", top: "30%", left: "30%",
      background: "white", padding: "20px", borderRadius: "8px",
      boxShadow: "0px 4px 8px rgba(0,0,0,0.2)", zIndex: 1000
    }}>
      <h3>Ã°Å¸â€™Â¡ Quick Question ({ring} Ring)</h3>
      <p>{question}</p>
      <input
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        style={{ width: "100%", padding: "6px", marginTop: "8px" }}
      />
      <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
        Submit
      </button>
    </div>
  );
}

