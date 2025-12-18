import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackToMerchant from "@/components/common/BackToMerchant";
import { motion } from "framer-motion";
import { getMerchantProducts, getProductMIT } from "@/services/api";

export default function ProductCenter() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const data = await getMerchantProducts();

        const normalized = data.map((p) => ({
          ...p,
          mit: null,
        }));

        setProducts(normalized);

        // Load MIT asynchronously
        normalized.forEach(async (p) => {
          try {
            const mit = await getProductMIT(p.id);
            if (mit?.status === "ready") {
              setProducts((prev) =>
                prev.map((x) =>
                  x.id === p.id ? { ...x, mit } : x
                )
              );
            }
          } catch {
            // silent fail
          }
        });
      } catch {
        setProducts([]);
      }
    }

    load();
  }, []);

  return (
    <div className="max-w-6xl mx-auto" dir="rtl">
      <BackToMerchant />

      <div className="flex justify-between items-center mt-6 mb-10">
        <h1 className="text-3xl font-extrabold">مركز المنتجات</h1>

        <button
          onClick={() => navigate("/merchant/add-product")}
          className="px-6 py-3 bg-green-600 text-white rounded-lg"
        >
          ➕ إضافة منتج
        </button>
      </div>

      {!products.length && (
        <p className="text-center text-gray-500 mt-20">
          لا توجد منتجات
        </p>
      )}

      {products.length > 0 && (
        <motion.table
          className="w-full bg-white rounded-xl shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <thead>
            <tr className="border-b text-right">
              <th className="p-4">المنتج</th>
              <th className="p-4">السعر</th>
              <th className="p-4">MIT</th>
              <th className="p-4">عمليات</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-4">{p.name}</td>
                <td className="p-4">{p.price}</td>
                <td className="p-4">
                  {p.mit ? p.mit.smart_price : "—"}
                </td>

                <td className="p-4 space-x-2 space-x-reverse">
                  {/* MIT Pricing */}
                  <button
                    onClick={() =>
                      navigate(`/merchant/pricing/${p.id}`)
                    }
                    className="px-3 py-2 bg-blue-600 text-white rounded"
                  >
                    التسعير
                  </button>

                  {/* MIT Market Insights */}
                  <button
                    onClick={() =>
                      navigate(`/merchant/market-insights/${p.id}`)
                    }
                    className="px-3 py-2 bg-purple-600 text-white rounded"
                  >
                    تحليل السوق
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </motion.table>
      )}
    </div>
  );
}
