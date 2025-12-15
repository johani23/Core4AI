// ============================================================================
// 💚 Core4.AI – BuyerCheckout v2 (Clean + API Ready)
// ============================================================================

import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function BuyerCheckout() {
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state?.product;

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0D0D0E] text-white p-6">
        المنتج غير موجود.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0E] text-white px-6 py-8">

      {/* ---------------------------------------- */}
      {/* 🧾 Checkout Title */}
      {/* ---------------------------------------- */}
      <h1 className="text-2xl font-bold text-purple-300 mb-6">
        إتمام الطلب
      </h1>

      {/* ---------------------------------------- */}
      {/* PRODUCT SUMMARY */}
      {/* ---------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-lg mb-8"
      >
        <div className="flex items-center gap-4">

          <img
            src={product.img}
            alt={product.name}
            className="w-28 h-28 rounded-xl object-cover border border-white/10"
          />

          <div className="flex-1">
            <h2 className="text-lg font-semibold">{product.name}</h2>

            <p className="text-emerald-400 mt-1 font-semibold">
              SAR {product.price}
            </p>

            <p className="text-gray-400 text-sm mt-1">الكمية: 1</p>
          </div>
        </div>
      </motion.div>

      {/* ---------------------------------------- */}
      {/* DELIVERY INFO */}
      {/* ---------------------------------------- */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-lg mb-8">
        <h3 className="text-lg font-semibold mb-2">معلومات التوصيل</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          📍 سيتم إضافة عنوان التوصيل في الإصدار القادم.  
          حاليًا سيتم اعتبار الطلب ضمن نطاق التوصيل القياسي.
        </p>
      </div>

      {/* ---------------------------------------- */}
      {/* PAYMENT INFO */}
      {/* ---------------------------------------- */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-lg mb-10">
        <h3 className="text-lg font-semibold mb-2">الدفع</h3>

        <p className="text-gray-400 text-sm mb-4">
          💳 سيتم إضافة وسائل الدفع لاحقًا.
        </p>

        <button
          className="w-full bg-purple-600 hover:bg-purple-500 transition text-white py-3 rounded-xl font-semibold"
          onClick={() => navigate(`/buyer/success`, { state: { product } })}
        >
          إكمال الطلب
        </button>
      </div>
    </div>
  );
}
