// ============================================================
// ðŸ’š Core4.AI â€“ PaymentSimulator.jsx (FINAL)
// ============================================================

import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function PaymentSimulator() {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const finishPayment = async (status) => {
    await axios.post("/api/checkout/confirm", {
      session_id: sessionId,
      status,
    });

    navigate(status === "paid" ? `/payment/success/${sessionId}` : `/payment/fail/${sessionId}`);
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-[#006C35] mb-6">Payment Simulator</h1>

      <button
        onClick={() => finishPayment("paid")}
        className="bg-[#006C35] text-white px-6 py-3 rounded-lg mr-4"
      >
        Approve Payment
      </button>

      <button
        onClick={() => finishPayment("failed")}
        className="bg-red-500 text-white px-6 py-3 rounded-lg"
      >
        Fail Payment
      </button>
    </div>
  );
}
