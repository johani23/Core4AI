// ============================================================================
// 💚 Core4.AI – ProductCenter (FINAL – PRODUCTION SAFE)
// FIXED API PATHS + MERCHANT ID
// ============================================================================

import React, { useEffect, useState } from "react";
import BackToMerchant from "@/components/common/BackToMerchant";
import { useInfluence } from "@/context/InfluenceScoreContext";
import { motion } from "framer-motion";
import { getMerchantProducts } from "@/services/api";

export default function ProductCenter() {
  const [products, setProducts] = useState([]);
  const { calculateFitScore, predictCommercialSuccess } = useInfluence();

  // 🔒 مؤقت – لاحقًا من auth
  const merchantId = "merchant_001";

  // ========================================================================
  // LOAD PRODUCTS (FIXED)
  // ========================================================================
  useEffect(() => {
    async function load() {
      try {
        const data = await getMerchantProducts(merchantId);

        if (!Array.isArray(data)) {
          console.error("Expected array, got:", data);
          setProducts([]);
          return;
        }

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

        // MIT loading (optional, non-blocking)
        normalized.forEach((prod) => loadMIT(prod.id));
      } catch (err) {
        console.error("❌ Product load failed:", err.message);
        setProducts([]);
      }
    }

    load();
  }, []);

  // ========================================================================
  // LOAD MIT (SAFE)
  // ========================================================================
  async function loadMIT(productId) {
    try {
      const res = await fetch(`/api/merchant/${merchantId}/products/${productId}/mit`);
      if (!res.ok) return;

      const data = await res.json();
      if (data.status === "not_ready") return;

      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, mit: data } : p))
      );
    } catch (err) {
      console.warn("MIT not available for product", productId);
    }
  }

  // ========================================================================
  // UI
  // ========================================================================
  return (
    <div className="max-w-6xl mx-auto" dir="rtl">
      <BackToMerchant />

      <div className="flex justify-between items-center mt-6 mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">
          مركز المنتجات (MIT Pricing)
        </h1>

        <button
          onClick={() => (window.location.href = "/merchant/add-product")}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold"
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
          <table className="w-full text-right border-collapse">
            <thead className="bg-gray-100 border-b">
              <tr className="text-gray-600 text-sm font-semibold">
                <th className="p-4">المنتج</th>
                <th className="p-4">السعر & MIT</th>
                <th className="p-4">الملاءمة</th>
                <th className="p-4">النجاح</th>
                <th className="p-4">عمليات</th>
              </tr>
            </thead>

            <tbody>
              {products.map((prod) => {
                const fit = calculateFitScore(prod);
                const proj = predictCommercialSuccess(prod);

                return (
                  <tr key={prod.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <p className="font-bold">{prod.name}</p>
                      <p className="text-sm text-gray-500">{prod.category}</p>
                    </td>

                    <td className="p-4 text-sm">
                      <div>السعر: <b>{prod.price}</b> ريال</div>
                      <div>المنافس: <b>{prod.competitor_price || prod.price}</b> ريال</div>

                      {prod.mit && (
                        <div className="mt-2 text-purple-700 text-xs">
                          💡 ذكي: {prod.mit.smart_price}
                        </div>
                      )}
                    </td>

                    <td className="p-4 font-bold">{fit}</td>
                    <td className="p-4 font-bold">{proj}%</td>

                    <td className="p-4">
                      <button
                        className="px-3 py-2 bg-gray-200 rounded"
                        onClick={() =>
                          (window.location.href =
                            `/merchant/add-product?edit=${prod.id}`)
                        }
                      >
                        ✏️ تعديل
                      </button>
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
