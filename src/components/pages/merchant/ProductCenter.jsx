// ============================================================================
// 💚 Core4.AI – ProductCenter (FINAL – PRODUCTION SAFE)
// ============================================================================

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackToMerchant from "@/components/common/BackToMerchant";
import { useInfluence } from "@/context/InfluenceScoreContext";
import { motion } from "framer-motion";
import { getMerchantProducts, getProductMIT } from "@/services/api";

export default function ProductCenter() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { calculateFitScore, predictCommercialSuccess } = useInfluence();

  // ============================================================================
  // LOAD PRODUCTS
  // ============================================================================
  useEffect(() => {
    async function load() {
      try {
        const data = await getMerchantProducts();

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
          mit: null,
        }));

        setProducts(normalized);

        // Load MIT asynchronously (non-blocking)
        normalized.forEach((p) => loadMIT(p.id));
      } catch (err) {
        console.error("❌ Product load failed:", err.message);
        setProducts([]);
      }
    }

    load();
  }, []);

  // ============================================================================
  // LOAD MIT DATA
  // ============================================================================
  async function loadMIT(productId) {
    try {
      const data = await getProductMIT(productId);
      if (data?.status === "not_ready") return;

      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, mit: data } : p
        )
      );
    } catch {
      // silent fail
    }
  }

  // ============================================================================
  // UI
  // ============================================================================
  return (
    <div className="max-w-6xl mx-auto" dir="rtl">
      <BackToMerchant />

      <div className="flex justify-between items-center mt-6 mb-10">
        <h1 className="text-3xl font-extrabold">
          مركز المنتجات (MIT Pricing)
        </h1>

        <button
          onClick={() => navigate("/merchant/add-product")}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
        >
          ➕ إضافة منتج جديد
        </button>
      </div>

      {!products.length && (
        <p className="text-gray-500 text-center mt-20">
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
              <tr className="text-sm font-semibold text-gray-600">
                <th className="p-4">المنتج</th>
                <th className="p-4">السعر & MIT</th>
                <th className="p-4">الملاءمة</th>
                <th className="p-4">النجاح</th>
                <th className="p-4">عمليات</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <b>{p.name}</b>
                    <div className="text-sm text-gray-500">
                      {p.category}
                    </div>
                  </td>

                  <td className="p-4 text-sm">
                    السعر: <b>{p.price}</b> ريال
                    <br />
                    المنافس: <b>{p.competitor_price}</b> ريال
                    {p.mit && (
                      <div className="text-purple-700 text-xs mt-1">
                        💡 ذكي: {p.mit.smart_price}
                      </div>
                    )}
                  </td>

                  <td className="p-4 font-bold">
                    {calculateFitScore(p)}
                  </td>

                  <td className="p-4 font-bold">
                    {predictCommercialSuccess(p)}%
                  </td>

                  <td className="p-4 space-x-2 space-x-reverse">
                    <button
                      className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() =>
                        navigate(`/merchant/products/${p.id}`)
                      }
                    >
                      👁️ عرض
                    </button>

                    <button
                      className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      onClick={() =>
                        navigate(`/merchant/products/${p.id}/edit`)
                      }
                    >
                      ✏️ تعديل
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
