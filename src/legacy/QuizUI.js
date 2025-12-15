// src/QuizUI.js
import React, { useState } from "react";
import "./index.css";

export default function QuizUI() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const roles = ["Seeker", "Explorer", "Connector", "Illuminator"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && role) {
      setSubmitted(true);
    } else {
      alert("Please enter your name and select a role!");
    }
  };

  return (
    <div className="quiz-container bg-gray-900 text-white p-6 rounded-xl shadow-lg max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Ã°Å¸â€œÂ Quiz</h2>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name input */}
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-3 rounded-lg text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Role selection */}
          <select
            className="w-full p-3 rounded-lg text-black"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select your role</option>
            {roles.map((r, index) => (
              <option key={index} value={r}>
                {r}
              </option>
            ))}
          </select>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold"
          >
            Submit Quiz
          </button>
        </form>
      ) : (
        <div className="result mt-6 text-center">
          <h3 className="text-xl font-bold">Ã°Å¸Å½â€° Welcome, {name}!</h3>
          <p className="mt-2">
            YouÃ¢â‚¬â„¢ve chosen the role: <span className="font-semibold">{role}</span>
          </p>
          <p className="mt-4 text-green-400">Your journey in Clusterverse begins Ã°Å¸Å¡â‚¬</p>
        </div>
      )}
    </div>
  );
}

