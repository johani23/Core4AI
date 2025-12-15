import React, { useState } from "react";
import axios from "axios";

export default function LevelDashboard() {
  const [creator, setCreator] = useState("");
  const [feedback, setFeedback] = useState(null);

  const fetchFeedback = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/creator/feedback/${creator}`);
    setFeedback(res.data);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Check Your Level</h2>
      <input type="text" placeholder="Creator name" onChange={e => setCreator(e.target.value)} className="border p-2 mb-4 w-full"/>
      <button onClick={fetchFeedback} className="bg-green-500 text-white px-4 py-2 rounded">Get Feedback</button>
      {feedback && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <p><b>Level:</b> {feedback.level}</p>
          <p><b>Score:</b> {feedback.score}</p>
          <p><b>Tip:</b> {feedback.tip}</p>
        </div>
      )}
    </div>
  );
}

