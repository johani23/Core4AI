import React, { useEffect, useState } from "react";

export default function CohesionScore() {
  const [score, setScore] = useState(75);

  useEffect(() => {
    const interval = setInterval(() => {
      setScore(Math.floor(Math.random() * 41) + 60); // 60-100
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cohesion-card">
      <h3>Ã°Å¸â€Â¥ Cohesion Score</h3>
      <div
        className="circle"
        style={{
          background: `conic-gradient(
            ${score > 80 ? "limegreen" : score > 70 ? "orange" : "red"} ${score}%,
            #eee 0
          )`
        }}
      >
        <div className="inner">{score}%</div>
      </div>
      <p>Team Alignment & Engagement</p>
    </div>
  );
}

