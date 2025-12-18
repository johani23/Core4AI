// ============================================================================
// 💚 Core4.AI – AddProductWizard (FINAL – PRODUCTION SAFE)
// Auto-create Product + Auto-run MIT
// ============================================================================

import React, { useState } from "react";
import BackToMerchant from "@/components/common/BackToMerchant";
import { motion } from "framer-motion";

export default function AddProductWizard() {
  const [step, setStep] = useState(1);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    competitor_price: "",
    features: [],
    media: [],
  });

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  // ============================================================================
  // SAVE PRODUCT (CORRECT + MIT AUTO)
  // ============================================================================
  const saveProduct = async () => {
    if (!product.name || !product.price) {
      alert("⚠️ الرجاء إدخال اسم المنتج والسعر.");
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

      // ✅ IMPORTANT: trailing slash
      const res = await fetch("/api/merchant/products/", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        throw new Error("CREATE_FAILED");
      }

      const data = await res.json();
      const productId = data.id;

      // ✅ AUTO RUN MIT
      await fetch(`/api/merchant/products/${productId}/mit`, {
        method: "POST",
      });

      alert("✔ تم حفظ المنتج وتشغيل التسعير الذكي بنجاح");
      window.location.href = "/merchant/products";
    } catch (err) {
      console.error(err);
      alert("❌ فشل حفظ المنتج — تحقق من الاتصال بالخادم");
    }
  };

  // ============================================================================
  // UI
  // ============================================================================
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
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />

          <input
            type="number"
            className="border p-3 w-full mb-4"
            placeholder="السعر"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: Number(e.target.value) })
            }
          />

          <input
            type="number"
            className="border p-3 w-full mb-4"
            placeholder="أقرب سعر منافس"
            value={product.competitor_price}
            onChange={(e) =>
              setProduct({
                ...product,
                competitor_price: Number(e.target.value),
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
            onClick={next}
          >
            التالي →
          </button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div className="bg-white rounded-xl p-8 shadow">
          <input
            type="file"
            className="mb-6"
            onChange={(e) =>
              setProduct({ ...product, media: Array.from(e.target.files) })
            }
          />

          <div className="flex justify-between">
            <button onClick={back}>← رجوع</button>
            <button onClick={saveProduct} className="bg-green-600 text-white px-6 py-3 rounded">
              ✔ حفظ المنتج
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
