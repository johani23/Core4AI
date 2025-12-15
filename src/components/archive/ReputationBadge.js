import React, { useState, useEffect } from "react";
import { getReputation } from "../services/api";

function Reputation() {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    loadReputation();
  }, []);

  async function loadReputation() {
    const data = await getReputation();
    setPoints(data.points);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Ã¢Â­Â Reputation</h2>
      <p className="text-lg">Your points: <span className="font-bold">{points}</span></p>
    </div>
  );
}

export default Reputation;

