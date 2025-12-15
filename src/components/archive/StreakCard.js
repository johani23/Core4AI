import React from "react";
import { apiUpdateStreak } from "../api";
import "./StreakCard.css";

const StreakCard = ({ user, onUserUpdate }) => {
  const claimDaily = async () => {
    try {
      await apiUpdateStreak(user.username);
      onUserUpdate(); // Ã¢Å“â€¦ refresh user stats
    } catch (err) {
      console.error("Error claiming daily points:", err);
    }
  };

  return (
    <div className="streak-card">
      <h3>Ã°Å¸â€Â¥ Daily Streak</h3>
      <p>@{user.username}</p>
      <p>Points: {user.points}</p>
      <p>Streak: {user.streak} days</p>
      <p>100 XP to next level</p>
      <button onClick={claimDaily}>Claim Daily Points</button>
    </div>
  );
};

export default StreakCard;

