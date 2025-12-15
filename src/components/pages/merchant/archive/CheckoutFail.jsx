// ============================================================
// ÃƒÂ¢Ã‚ÂÃ…â€™ CheckoutFail.jsx ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Core4.AI (Final)
// ============================================================

import { useParams, useNavigate } from "react-router-dom";

export default function CheckoutFail() {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-8 text-center max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-red-600">Payment Failed</h1>

      <p className="text-gray-600 mt-2 mb-6">
        The payment did not go through. Please try again.
      </p>

      <button
        onClick={() => navigate(-1)}
        className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
      >
        Try Again
      </button>
    </div>
  );
}


