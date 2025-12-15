// ============================================================================
// 💚 Core4.AI – MITPricing.jsx (Smart Pricing Engine UI – FINAL)
// ============================================================================
// - Shows Market, Influence, Tribe signals
// - Fetches recommended price
// - Recalculate button
// - Clean UI for Product Center
// ============================================================================

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

export default function MITPricing({ productId, onPriceUpdate }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Load MIT Pricing on mount
  const loadPricing = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/pricing/mit-calc?product_id=${productId}`);
      const json = await res.json();

      setData(json);

      // Send recommended price back to Product Center parent
      if (onPriceUpdate && json.recommended_price) {
        onPriceUpdate(json.recommended_price);
      }

    } catch (err) {
      setError("حدث خطأ أثناء تحميل التسعير الذكي.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPricing();
  }, [productId]);

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">MIT Pricing Engine</h2>

        <button
          onClick={loadPricing}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition"
        >
          <RefreshCw size={18} />
          إعادة الحساب
        </button>
      </div>

      {loading && <p className="text-gray-500">⏳ جاري تحميل التسعير الذكي…</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {/* Recommended Price */}
          <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
            <p className="text-sm text-gray-600">السعر الذكي المقترح</p>
            <p className="text-3xl font-bold text-purple-700">
              {data.recommended_price} ر.س
            </p>
          </div>

          {/* Market Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gray-50 border">
              <p className="text-sm text-gray-500">أقل سعر في السوق</p>
              <p className="text-lg font-semibold text-gray-700">
                {data.market_floor} ر.س
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gray-50 border">
              <p className="text-sm text-gray-500">أعلى سعر في السوق</p>
              <p className="text-lg font-semibold text-gray-700">
                {data.market_ceiling} ر.س
              </p>
            </div>
          </div>

          {/* Conversion Lift */}
          <div className="p-4 rounded-lg bg-green-50 border border-green-200">
            <p className="text-sm text-gray-600">تأثير التحويل</p>
            <p className="text-xl font-bold text-green-700">
              {data.conversion_lift}
            </p>
          </div>

          {/* Tribe Hotness */}
          <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
            <p className="text-sm text-gray-600">القبائل الأكثر اهتماماً</p>
            <p className="text-lg font-semibold text-yellow-800">
              {data.tribe_hotness}
            </p>
          </div>

          {/* Reasoning */}
          <div className="bg-gray-50 rounded-lg p-4 border">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              لماذا هذا السعر؟
            </p>

            <ul className="text-gray-600 list-disc pr-4 space-y-1">
              {data.reasoning?.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
}
