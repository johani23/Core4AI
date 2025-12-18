// src/components/pages/merchant/AddProductWizard.jsx

import { useState } from "react";
import BackToMerchant from "@/components/common/BackToMerchant";
import { motion } from "framer-motion";
import { apiFetch } from "@/lib/api";

export default function AddProductWizard() {
  const [step, setStep] = useState(1);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    competitor_price: "",
  });

  async function saveProduct() {
    if (!product.name || !product.price) {
      alert("اسم المنتج والسعر مطلوبان");
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

      const created = await apiFetch("/api/merchant/products/", {
        method: "POST",
        body: form,
      });

      await apiFetch(`/api/merchant/products/${created.id}/mit`, {
        method: "POST",
      });

      alert("✔ تم إنشاء المنتج وتشغيل التسعير الذكي");
      window.location.href = "/merchant/products";
    } catch (err) {
      console.error(err);
      alert("❌ فشل حفظ المنتج");
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6" dir="rtl">
      <BackToMerchant />

      {step === 1 && (
        <motion.div className="bg-white p-6 rounded shadow">
          <input
            className="border p-3 w-full mb-3"
            placeholder="اسم المنتج"
            value={product.name}
            onChange={(e) =>
              setProduct({ ...product, name: e.target.value })
            }
          />
          <input
            type="number"
            className="border p-3 w-full mb-3"
            placeholder="السعر"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
          />
          <button onClick={() => setStep(2)}>التالي</button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div className="bg-white p-6 rounded shadow">
          <button onClick={saveProduct} className="bg-green-600 text-white px-6 py-3 rounded">
            ✔ حفظ المنتج
          </button>
        </motion.div>
      )}
    </div>
  );
}
