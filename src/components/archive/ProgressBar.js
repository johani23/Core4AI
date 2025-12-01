import React from "react";
import "./ProgressBar.css";

function ProgressBar({ value, max }) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
