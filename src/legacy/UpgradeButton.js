import React, { useState } from "react";
import axios from "axios";

function UpgradeButton() {
  const [upgraded, setUpgraded] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleUpgrade = async () => {
    try {
      const res = await axios.post("http://localhost:8000/upgrade/1"); // Ã°Å¸â€˜Ë† Sama's ID in URL
      setResponseMessage("Ã¢Å“â€¦ " + res.data.message);
      setUpgraded(true);
    } catch (err) {
      setResponseMessage("Ã¢ÂÅ’ Upgrade failed: " + (err.response?.data?.detail || err.message));
      setUpgraded(true);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {!upgraded ? (
        <button onClick={handleUpgrade} style={{ padding: "10px 20px", fontSize: "16px" }}>
          Ã°Å¸Å¡â‚¬ Upgrade Sama
        </button>
      ) : (
        <p style={{ fontSize: "18px", color: "green" }}>
          Ã¢Å“â€¦ {responseMessage}
        </p>
      )}
    </div>
  );
}

export default UpgradeButton;

