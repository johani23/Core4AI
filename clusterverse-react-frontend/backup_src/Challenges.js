import React, { useEffect, useState } from "react";

export default function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/challenges")
      .then((res) => res.json())
      .then((data) => {
        setChallenges(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching challenges:", err);
        setLoading(false);
      });
  }, []);

  const completeChallenge = (challengeId) => {
    const userId = 1; // ðŸ”§ replace with logged-in user later
    fetch(`http://127.0.0.1:8000/challenges/complete?user_id=${userId}&challenge_id=${challengeId}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((err) => console.error("Error completing challenge:", err));
  };

  if (loading) return <p>Loading challenges...</p>;

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-lg mt-6">
      <h2 className="text-lg font-semibold mb-4">ðŸŽ¯ Challenges</h2>
      <ul className="space-y-3">
        {challenges.map((c) => (
          <li
            key={c.id}
            className="flex justify-between items-center bg-gray-700 px-4 py-2 rounded-lg"
          >
            <div>
              <strong>{c.title}</strong>
              <p className="text-sm text-gray-300">{c.description}</p>
              <span className="text-xs text-yellow-400">+{c.points} pts</span>
            </div>
            <button
              className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg text-sm"
              onClick={() => completeChallenge(c.id)}
            >
              Complete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
