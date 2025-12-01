import React, { useState } from "react";

function Quiz({ setActiveTab }) {
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, answers }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit quiz");
      }

      const data = await response.json();
      alert(`Welcome ${data.name}! Your role: ${data.role}`);

      // بعد ما يخلص الكويز نحوله للـ Dashboard
      setActiveTab("dashboard");

    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Something went wrong while submitting the quiz.");
    }
  };

  return (
    <div className="quiz-container">
      <h2>Role Quiz</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {["I like to be the first to try new ideas, products, or trends.",
          "I enjoy analyzing details and figuring out the logic behind things.",
          "I often bring people together and make sure everyone feels included.",
          "I love brainstorming new solutions when problems arise."
        ].map((question, idx) => (
          <div key={idx}>
            <label>{question}</label>
            <select
              value={answers[idx]}
              onChange={(e) => handleAnswerChange(idx, e.target.value)}
              required
            >
              <option value="">Select...</option>
              <option value="1">1 - Disagree</option>
              <option value="2">2 - Neutral</option>
              <option value="3">3 - Agree</option>
              <option value="4">4 - Strongly Agree</option>
            </select>
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Quiz;
