// ============================================================================
// 💚 Core4.AI – ProductCenter
// FINAL MIT-AWARE VERSION (CLEAN & SAFE)
// ============================================================================

import React, { useEffect, useState } from "react";
import BackToMerchant from "@/components/common/BackToMerchant";
import { useInfluence } from "@/context/InfluenceScoreContext";
import { motion } from "framer-motion";

export default function ProductCenter() {
  const [products, setProducts] = useState([]);
  const { calculateFitScore, predictCommercialSuccess } = useInfluence();

  // ========================================================================
  // LOAD PRODUCTS
  // ========================================================================
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/merchant/products/");
        const data = await res.json();

        const normalized = data.map((p) => ({
          id: p.id,
          name: p.name,
          category: p.category || "غير محدد",
          price: p.price,
          competitor_price: p.competitor_price,
          image_url: p.image_url,
          features: p.features || [],
          mit: null,
        }));

        setProducts(normalized);

        // Load MIT per product (non-blocking, SAFE)
        normalized.forEach((prod) => loadMIT(prod.id));
      } catch (err) {
        console.error("❌ Product load failed:", err);
      }
    }

    load();
  }, []);

  // ========================================================================
  // LOAD MIT (READ-ONLY, SAFE)
  // ========================================================================
  async function loadMIT(productId) {
    try {
      const res = await fetch(
        `/api/merchant/products/${productId}/mit`
      );

      if (!res.ok) return;

      const data = await res.json();

      // ignore not_ready
      if (data.status === "not_ready") return;

      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, mit: data } : p
        )
      );
    } catch (err) {
      console.error("❌ MIT load failed:", err);
    }
  }

  // ========================================================================
  // UI
  // ========================================================================
  return (
    <div className="max-w-6xl mx-auto" dir="rtl">
      <BackToMerchant />

      {/* HEADER */}
      <div className="flex justify-between items-center mt-6 mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">
          مركز المنتجات (MIT Pricing)
        </h1>

        <button
          onClick={() => (window.location.href = "/merchant/add-product")}
          className="btn-green px-6 py-3"
        >
          ➕ إضافة منتج جديد
        </button>
      </div>

      {!products.length && (
        <p className="text-gray-500 text-center mt-20 text-lg">
          لا توجد منتجات بعد — ابدأ بإضافة منتج.
        </p>
      )}

      {products.length > 0 && (
        <motion.div
          className="bg-white border rounded-xl shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <table className="w-full border-collapse text-right">
            <thead className="bg-gray-100 border-b">
              <tr className="text-gray-600 text-sm font-semibold">
                <th className="p-4">المنتج</th>
                <th className="p-4">السعر & MIT</th>
                <th className="p-4">الملاءمة (AI)</th>
                <th className="p-4">النجاح المتوقع</th>
                <th className="p-4">عمليات</th>
              </tr>
            </thead>

            <tbody>
              {products.map((prod) => {
                const fit = calculateFitScore(prod);
                const proj = predictCommercialSuccess(prod);

                return (
                  <tr
                    key={prod.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    {/* PRODUCT */}
                    <td className="p-4">
                      <p className="font-bold text-gray-900">{prod.name}</p>
                      <p className="text-gray-500 text-sm">{prod.category}</p>
                    </td>

                    {/* PRICE + MIT */}
                    <td className="p-4 text-sm text-gray-800">
                      <div>
                        السعر الأساسي: <b>{prod.price}</b> ريال
                      </div>
                      <div>
                        سعر المنافس:{" "}
                        <b>{prod.competitor_price || prod.price}</b> ريال
                      </div>

                      {prod.mit && (
                        <div className="mt-2 text-purple-700">
                          <div>
                            💡 السعر الذكي:{" "}
                            <b>{prod.mit.smart_price}</b> ريال
                          </div>
                          <div className="text-xs text-gray-600">
                            النطاق: {prod.mit.market_floor} –{" "}
                            {prod.mit.market_ceiling}
                          </div>
                          <div className="text-xs text-green-600 font-semibold">
                            رفع التحويل: {prod.mit.conversion_lift}
                          </div>
                        </div>
                      )}
                    </td>

                    {/* AI FIT */}
                    <td className="p-4 font-bold">{fit} / 200</td>

                    {/* SUCCESS */}
                    <td className="p-4 font-bold">{proj}%</td>

                    {/* ACTIONS */}
                    <td className="p-4">
                      <div className="flex gap-2 flex-row-reverse">
                        <button
                          className="px-3 py-2 bg-blue-600 text-white rounded-lg"
                          onClick={() =>
                            (window.location.href =
                              `/merchant/campaign?product=${prod.id}`)
                          }
                        >
                          🚀 حملة
                        </button>

                        <button
                          className="px-3 py-2 bg-green-600 text-white rounded-lg"
                          onClick={() =>
                            (window.location.href =
                              `/merchant/pricing/${prod.id}`)
                          }
                        >
                          💰 تسعير
                        </button>

                        <button
                          className="px-3 py-2 bg-purple-600 text-white rounded-lg"
                          onClick={() =>
                            (window.location.href =
                              `/merchant/market-insights/${prod.id}`)
                          }
                        >
                          📊 MIT
                        </button>

                        <button
                          className="px-3 py-2 bg-gray-200 rounded-lg"
                          onClick={() =>
                            (window.location.href =
                              `/merchant/add-product?edit=${prod.id}`)
                          }
                        >
                          ✏️ تعديل
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
