import React from "react";
import "./FeedbackModel.css";

export default function FeedbackModel({ show, onClose, result, accumulated }) {
  if (!show) return null;

  const { success, details, feedback } = result || {};
  const totalPoints = details?.total ?? 0;

  const nextLevel = Math.ceil(accumulated / 50) * 50 || 50;
  const progress = Math.min((accumulated / nextLevel) * 100, 100);

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${success ? "success" : "fail"}`}>
        <h3>{success ? "ðŸŽ‰ Points Earned!" : "âš ï¸ No Points This Time"}</h3>
        <p>
          {success
            ? "Great contribution! Points awarded ðŸŽŠ"
            : "Try to add more depth or context to earn points."}
        </p>

        {details && (
          <ul>
            <li>Usefulness: {details.usefulness ?? 0}</li>
            <li>Emotional Depth: {details.emotional ?? 0}</li>
            <li>Knowledge Value: {details.knowledge ?? 0}</li>
            <li>Innovation: {details.innovation ?? 0}</li>
            <li><b>Total Score (this post): {totalPoints}</b></li>
          </ul>
        )}

        {feedback && <p style={{ color: "#f43f5e" }}>{feedback}</p>}

        <div style={{ marginTop: "15px" }}>
          <p><b>Accumulated Score:</b> {accumulated}</p>
          <p>
            Next Ring at {nextLevel} points
            <br />
            <progress value={progress} max="100"></progress> {progress.toFixed(1)}%
          </p>
        </div>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
