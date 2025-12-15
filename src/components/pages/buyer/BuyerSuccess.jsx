// ============================================================================
// 🎉 Core4.AI – BuyerSuccess (Order Complete – API Edition)
// ============================================================================

import { useNavigate, useLocation } from "react-router-dom";

export default function BuyerSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  // The Checkout page should navigate with: { state: { order: res.data } }
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="min-h-screen bg-[#0D0D0E] text-white flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-bold text-red-400 mb-4">لا يوجد طلب.</h1>

        <button
          onClick={() => navigate("/buyer/feed")}
          className="bg-purple-600 hover:bg-purple-500 text-white rounded-xl py-3 px-6 font-semibold"
        >
          العودة للمنتجات
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0E] text-white flex flex-col items-center justify-center px-6 text-center">

      {/* Success Title */}
      <h1 className="text-3xl font-bold text-emerald-400 mb-4">
        تم إتمام الطلب بنجاح 🎉
      </h1>

      {/* Order Summary */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 shadow-xl w-full max-w-md">

        <p className="text-lg mb-3">
          رقم الطلب:
          <span className="text-purple-300 font-semibold mx-2">{order.id}</span>
        </p>

        <p className="text-lg mb-3">
          المنتج:
          <span className="text-purple-300 font-semibold mx-2">
            {order.product_name || order.product || "—"}
          </span>
        </p>

        <p className="text-gray-300">
          شكراً لثقتك في Core4.AI 💜  
          سيتم معالجة الطلب خلال وقت قصير.
        </p>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/buyer/feed")}
        className="bg-purple-600 hover:bg-purple-500 text-white rounded-xl py-3 px-6 font-semibold mt-4"
      >
        العودة للمنتجات
      </button>
    </div>
  );
}
