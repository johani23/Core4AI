import React, { useState } from "react";
import axios from "axios";

function UpgradeButton() {
  const [upgraded, setUpgraded] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleUpgrade = async () => {
    try {
      const res = await axios.post("http://localhost:8000/upgrade/1"); // ðŸ‘ˆ Sama's ID in URL
      setResponseMessage("âœ… " + res.data.message);
      setUpgraded(true);
    } catch (err) {
      setResponseMessage("âŒ Upgrade failed: " + (err.response?.data?.detail || err.message));
      setUpgraded(true);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {!upgraded ? (
        <button onClick={handleUpgrade} style={{ padding: "10px 20px", fontSize: "16px" }}>
          ðŸš€ Upgrade Sama
        </button>
      ) : (
        <p style={{ fontSize: "18px", color: "green" }}>
          âœ… {responseMessage}
        </p>
      )}
    </div>
  );
}

export default UpgradeButton;
