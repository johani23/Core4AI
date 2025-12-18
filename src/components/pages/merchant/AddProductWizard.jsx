import React, { useState } from "react";
import BackToMerchant from "@/components/common/BackToMerchant";
import { motion } from "framer-motion";
import { apiFetch } from "@/lib/api";

export default function AddProductWizard() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    competitor_price: "",
    description: "",
  });

  async function saveProduct() {
    try {
      const form = new FormData();
      form.append("name", product.name);
      form.append("price", Number(product.price));
      form.append(
        "competitor_price",
        Number(product.competitor_price || product.price)
      );
      form.append("description", product.description);

      const created = await apiFetch("/api/merchant/products/", {
        method: "POST",
        body: form,
      });

      await apiFetch(
        `/api/merchant/products/${created.id}/mit`,
        { method: "POST" }
      );

      window.location.href = "/merchant/products";
    } catch {
      alert("❌ فشل حفظ المنتج");
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-12" dir="rtl">
      <BackToMerchant />

      <motion.div className="bg-white p-8 rounded-xl shadow">
        <input
          className="border p-3 w-full mb-4"
          placeholder="اسم المنتج"
          onChange={(e) =>
            setProduct({ ...product, name: e.target.value })
          }
        />

        <input
          type="number"
          className="border p-3 w-full mb-4"
          placeholder="السعر"
          onChange={(e) =>
            setProduct({ ...product, price: e.target.value })
          }
        />

        <input
          type="number"
          className="border p-3 w-full mb-4"
          placeholder="سعر المنافس"
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
          onChange={(e) =>
            setProduct({
              ...product,
              description: e.target.value,
            })
          }
        />

        <button
          onClick={saveProduct}
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          حفظ المنتج
        </button>
      </motion.div>
    </div>
  );
}
