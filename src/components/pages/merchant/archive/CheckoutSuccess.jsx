// ============================================================
// ðŸŽ‰ CheckoutSuccess.jsx â€“ Core4.AI (Final)
// ============================================================

import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CheckoutSuccess() {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-8 text-center max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-green-700">Payment Successful ðŸŽ‰</h1>

      <p className="text-gray-600 mt-2 mb-6">
        Your purchase has been confirmed.
      </p>

      <button
        onClick={() => navigate("/home")}
        className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800"
      >
        Back to Home
      </button>
    </div>
  );
}
