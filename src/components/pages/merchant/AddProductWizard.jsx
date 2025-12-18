// ============================================================================
// 💚 Core4.AI – AddProductWizard (FINAL VERSION + Competitor Price Restored)
// Nearest Competitor • MIT Ready • Safe for Launch
// ============================================================================

import React, { useState, useEffect } from "react";
import BackToMerchant from "@/components/common/BackToMerchant";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

// ----------------------------------------------------------------------------
// AI FEATURE EXTRACTOR (lightweight heuristic)
// ----------------------------------------------------------------------------
function extractFeatures(product) {
  const { name, description, category } = product;
  const text = `${name} ${description} ${category}`.toLowerCase();

  const features = [];

  if (text.includes("quiet") || text.includes("silent")) {
    features.push({
      name: "محرك صامت",
      description: "يعمل بدون ضوضاء أثناء الاستخدام.",
      gap: true,
      strength: 8,
    });
  }

  if (text.includes("durable") || text.includes("strong") || text.includes("solid")) {
    features.push({
      name: "متانة عالية",
      description: "مصنوع من مواد تدوم لفترة طويلة.",
      gap: true,
      strength: 7,
    });
  }

  if (text.includes("smart") || text.includes("auto")) {
    features.push({
      name: "ميزة ذكية",
      description: "يعمل تلقائيًا لتحسين أداء الاستخدام.",
      gap: false,
      strength: 6,
    });
  }

  return features.slice(0, 3);
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function AddProductWizard() {
  const location = useLocation();
  const editId = new URLSearchParams(location.search).get("edit");
  const isEdit = Boolean(editId);

  const [step, setStep] = useState(1);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    media: [],
    features: [],
    competitor_price: "",
  });

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  // ----------------------------------------------------------------------------
  // LOAD PRODUCT (EDIT MODE)
  // ----------------------------------------------------------------------------
  useEffect(() => {
    if (!isEdit) return;

    async function loadProduct() {
      try {
        const res = await fetch(`/api/merchant/products/${editId}`);
        if (!res.ok) return;

        const data = await res.json();
        setProduct({
          name: data.name || "",
          price: data.price ?? "",
          category: data.category || "",
          description: data.description || "",
          media: [],
          features: data.features || [],
          competitor_price: data.competitor_price ?? "",
        });
      } catch (err) {
        console.error("Failed to load product", err);
      }
    }

    loadProduct();
  }, [isEdit, editId]);

  // ----------------------------------------------------------------------------
  // SAVE PRODUCT (POST / PUT)
  // ----------------------------------------------------------------------------
  const saveProduct = async () => {
    // Basic guards
    if (!product.name || !product.price) {
      alert("⚠️ الرجاء إدخال اسم المنتج والسعر.");
      return;
    }

    if (Number(product.competitor_price) < 0) {
      alert("⚠️ سعر المنافس غير صالح.");
      return;
    }

    try {
      const form = new FormData();

      form.append("name", product.name);
      form.append("price", Number(product.price));
      form.append("category", product.category);
      form.append("description", product.description);

      // ⭐ CRITICAL: nearest competitor price for MIT
      form.append(
        "competitor_price",
        Number(product.competitor_price || product.price)
      );

      form.append("features", JSON.stringify(product.features));

      if (product.media.length > 0) {
        form.append("file", product.media[0], product.media[0].name);
      }

      const method = "POST";
      const url = "/api/merchant/products/";

        ? `/api/merchant/products/${editId}`
        : "/api/merchant/products/";

      const res = await fetch(url, { method, body: form });
      if (!res.ok) {
        alert("⚠️ لم يتم الحفظ — تحقق من الخادم");
        return;
      }

      alert(isEdit ? "✔ تم حفظ التعديل بنجاح" : "✔ تم حفظ المنتج بنجاح");
      window.location.href = "/merchant/products";
    } catch (err) {
      console.error(err);
      alert("⚠️ حدث خطأ أثناء الحفظ");
    }
  };

  // ============================================================================
  // RENDER UI — 4 STEPS
  // ============================================================================
  return (
    <div className="max-w-4xl mx-auto mt-12 p-6" dir="rtl">
      <BackToMerchant />

      <h1 className="text-4xl font-extrabold text-gray-900 mb-10">
        {isEdit ? "تعديل المنتج" : "إضافة منتج جديد"}
      </h1>

      {/* =========================================================================
         STEP 1 — BASIC INFO
      ========================================================================= */}
      {step === 1 && (
        <motion.div className="bg-white rounded-2xl shadow-md p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">المعلومات الأساسية</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <input
              className="border rounded-lg p-3 w-full bg-gray-50 focus:ring focus:ring-green-200"
              placeholder="اسم المنتج"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />

            {/* Product Price */}
            <input
              className="border rounded-lg p-3 w-full bg-gray-50 focus:ring focus:ring-green-200"
              type="number"
              placeholder="السعر (ريال)"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: Number(e.target.value) })
              }
            />

            {/* Category */}
            <input
              className="border rounded-lg p-3 w-full bg-gray-50 focus:ring focus:ring-green-200"
              placeholder="الفئة / التصنيف"
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
            />

            {/* Nearest Competitor Price */}
            <input
              className="border rounded-lg p-3 w-full bg-gray-50 focus:ring focus:ring-purple-200"
              type="number"
              placeholder="أقرب سعر منافس مباشر (ريال)"
              value={product.competitor_price ?? ""}
              onChange={(e) =>
                setProduct({
                  ...product,
                  competitor_price: Number(e.target.value),
                })
              }
            />
          </div>

          <textarea
            className="border rounded-lg p-3 w-full bg-gray-50 mt-6 h-32 focus:ring focus:ring-green-200"
            placeholder="وصف المنتج"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />

          <div className="flex justify-between mt-10">
            <button
              className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
              onClick={() => (window.location.href = "/merchant/products")}
            >
              إلغاء
            </button>
            <button
              className="px-8 py-3 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700"
              onClick={next}
            >
              التالي →
            </button>
          </div>
        </motion.div>
      )}

      {/* =========================================================================
         STEP 2 — MEDIA
      ========================================================================= */}
      {step === 2 && (
        <motion.div className="bg-white rounded-2xl shadow-md p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">صور ووسائط المنتج</h2>

          <input
            type="file"
            multiple
            className="border rounded-lg p-3 w-full bg-gray-50"
            onChange={(e) =>
              setProduct({ ...product, media: Array.from(e.target.files) })
            }
          />

          <div className="flex justify-between mt-10">
            <button
              className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300"
              onClick={back}
            >
              ← رجوع
            </button>
            <button
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              onClick={next}
            >
              التالي →
            </button>
          </div>
        </motion.div>
      )}

      {/* =========================================================================
         STEP 3 — FEATURES
      ========================================================================= */}
      {step === 3 && (
        <motion.div className="bg-white rounded-2xl shadow-md p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">✨ ميزات المنتج</h2>

          <button
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            onClick={() =>
              setProduct({ ...product, features: extractFeatures(product) })
            }
          >
            🔮 استخراج الميزات تلقائيًا
          </button>

          <div className="flex justify-between mt-10">
            <button
              className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300"
              onClick={back}
            >
              ← رجوع
            </button>
            <button
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              onClick={next}
            >
              التالي →
            </button>
          </div>
        </motion.div>
      )}

      {/* =========================================================================
         STEP 4 — CONFIRMATION
      ========================================================================= */}
      {step === 4 && (
        <motion.div className="bg-white rounded-2xl shadow-md p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">تأكيد بيانات المنتج</h2>

          <p className="mb-2">الاسم: {product.name}</p>
          <p className="mb-2">السعر: {product.price} ريال</p>
          <p className="mb-2">الفئة: {product.category}</p>
          <p className="mb-2">
            سعر المنافس: {product.competitor_price || product.price} ريال
          </p>
          <p className="mb-6">{product.description}</p>

          <div className="flex justify-between mt-10">
            <button
              className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300"
              onClick={back}
            >
              ← رجوع
            </button>
            <button
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              onClick={saveProduct}
            >
              {isEdit ? "✔ حفظ التعديل" : "✔ حفظ المنتج"}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
