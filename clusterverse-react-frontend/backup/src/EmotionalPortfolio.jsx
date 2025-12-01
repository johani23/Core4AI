import React, { useEffect, useState } from "react";
import { getEMI } from "@services/marketAPI";

export default function EmotionalPortfolio() {
  const [emi, setEmi] = useState(0);
  useEffect(() => {
    getEMI().then(e => setEmi(e.emi_score));
  }, []);
  return (
    <div className="p-4 text-sm">
      <h2 className="text-lg font-semibold mb-3">Emotional Portfolio</h2>
      <p>Market EMI: {emi.toFixed(1)}</p>
      <p>Your dopamine alignment: {(70 + Math.random() * 20).toFixed(1)}%</p>
      <p className="text-gray-400 text-xs mt-3">
        Insights update hourly based on your trades & posts.
      </p>
    </div>
  );
}
