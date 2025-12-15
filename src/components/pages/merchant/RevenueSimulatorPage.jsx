// ============================================================================
// 💚 Core4.AI – RevenueSimulatorPage.jsx
// ============================================================================

import React, { useEffect, useState } from "react";
import BackToMerchant from "@/components/common/BackToMerchant";
import RevenueSimulatorPanel from "./RevenueSimulatorPanel";

export default function RevenueSimulatorPage() {
  const [product, setProduct] = useState(null);
  const [pricing, setPricing] = useState(null);

  useEffect(() => {
    const p = localStorage.getItem("core4ai_new_product");
    if (p) setProduct(JSON.parse(p));

    const pr = localStorage.getItem("core4ai_pricing");
    if (pr) setPricing(JSON.parse(pr));
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 page-wrapper" dir="rtl">
      <BackToMerchant />

      <h1 className="text-3xl font-extrabold text-green-600 mb-8">
        محاكاة الإيرادات — Core4.AI
      </h1>

      {product ? (
        <RevenueSimulatorPanel product={product} pricing={pricing} />
      ) : (
        <p className="text-gray-500 text-center mt-20">لا يوجد منتج...</p>
      )}
    </div>
  );
}
