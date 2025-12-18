import React, { useState } from "react";
import BackToMerchant from "@/components/common/BackToMerchant";
import { motion } from "framer-motion";
import { apiFetch } from "@/lib/api";

export default function AddProductWizard() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    competitor_price: "",
    description: "",
  });

  async function saveProduct() {
    if (!product.name || !product.price) {
      alert("⚠️ الاسم والسعر مطلوبان");
      return;
    }

    try {
      setLoading(true);

      const form = new FormData();
      form.append("name", product.name.trim());
      form.append("price", Number(product.price));
      form.append(
        "competitor_price",
        Number(product.competitor_price || product.price)
      );
      form.append("description", product.description || "");

      // 1️⃣ إنشاء المنتج
      const created = await apiFetch("/api/merchant/products/", {
        method: "POST",
        body: form,
      });

      // 2️⃣ تشغيل MIT
      await apiFetch(`/api/merchant/products/${created.id}/mit`, {
        method: "POST",
      });

      // 3️⃣ فتح تحليل السوق تلقائيًا
      window.location.href = `/merchant/market-insights/${created.id}`;

    } catch (err) {
      console.error("Save product failed:", err);
      alert("❌ فشل حفظ المنتج");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-12" dir="rtl">
      <BackToMerchant />

      <motion.div
        className="bg-white p-8 rounded-xl shadow"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
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
          className="border p-3 w-full mb-6"
          placeholder="وصف المنتج"
          value={product.description}
          onChange={(e) =>
            setProduct({
              ...product,
              description: e.target.value,
            })
          }
        />

        <button
          onClick={saveProduct}
          disabled={loading}
          className={`px-6 py-3 rounded text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "جاري الحفظ..." : "حفظ المنتج"}
        </button>
      </motion.div>
    </div>
  );
}
