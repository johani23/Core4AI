// ============================================================================
// 💚 Core4.AI – AddProductWizard (FINAL – PRODUCTION SAFE)
// Auto-create Product + Auto-run MIT
// ============================================================================

import React, { useState } from "react";
import BackToMerchant from "@/components/common/BackToMerchant";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API_BASE_URL;

export default function AddProductWizard() {
  const [step, setStep] = useState(1);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    competitor_price: "",
    media: [],
    features: [],
  });

  const saveProduct = async () => {
    if (!product.name || !product.price) {
      alert("⚠️ أدخل اسم المنتج والسعر");
      return;
    }

    try {
      const form = new FormData();
      form.append("name", product.name);
      form.append("price", Number(product.price));
      form.append("category", product.category);
      form.append("description", product.description);
      form.append(
        "competitor_price",
        Number(product.competitor_price || product.price)
      );
      form.append("features", JSON.stringify(product.features));

      if (product.media.length > 0) {
        form.append("file", product.media[0]);
      }

      // ✅ CREATE PRODUCT
      const res = await fetch(`${API}/api/merchant/products/`, {
        method: "POST",
        body: form,
      });

      if (!res.ok) throw new Error("CREATE_FAILED");

      const { id } = await res.json();

      // ✅ AUTO RUN MIT
      await fetch(`${API}/api/merchant/products/${id}/mit`, {
        method: "POST",
      });

      window.location.href = "/merchant/products";
    } catch (e) {
      console.error(e);
      alert("❌ فشل حفظ المنتج");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6" dir="rtl">
      <BackToMerchant />

      <h1 className="text-4xl font-extrabold mb-10">إضافة منتج جديد</h1>

      {step === 1 && (
        <motion.div className="bg-white rounded-xl p-8 shadow">
          <input
            className="border p-3 w-full mb-4"
            placeholder="اسم المنتج"
            value={product.name}
            onChange={(e) =>
              setProduct({ ...product, name: e.target.value })
            }
          />

          <input
            type="number"
            className="border p-3 w-full mb-4"
            placeholder="السعر"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
          />

          <input
            type="number"
            className="border p-3 w-full mb-4"
            placeholder="سعر المنافس"
            value={product.competitor_price}
            onChange={(e) =>
              setProduct({
                ...product,
                competitor_price: e.target.value,
              })
            }
          />

          <textarea
            className="border p-3 w-full mb-4"
            placeholder="وصف المنتج"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />

          <button
            className="bg-green-600 text-white px-6 py-3 rounded"
            onClick={() => setStep(2)}
          >
            التالي →
          </button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div className="bg-white rounded-xl p-8 shadow">
          <input
            type="file"
            onChange={(e) =>
              setProduct({
                ...product,
                media: Array.from(e.target.files),
              })
            }
          />

          <div className="flex justify-between mt-6">
            <button onClick={() => setStep(1)}>← رجوع</button>
            <button
              onClick={saveProduct}
              className="bg-green-600 text-white px-6 py-3 rounded"
            >
              ✔ حفظ المنتج
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
