// ============================================================================
// Core4.AI – PricingCenter (FINAL – RENDER SAFE)
// ============================================================================

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackToMerchant from "@/components/common/BackToMerchant";

const API = import.meta.env.VITE_API_BASE_URL;

export default function PricingCenter() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [mit, setMit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const pRes = await fetch(
          `${API}/api/merchant/products/${productId}`
        );
        if (!pRes.ok) return;

        setProduct(await pRes.json());

        const mRes = await fetch(
          `${API}/api/merchant/products/${productId}/mit`
        );
        const m = await mRes.json();
        if (m.status === "ready") setMit(m);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [productId]);

  if (loading) return <div className="mt-24 text-center">⏳ تحميل…</div>;

  if (!product || !mit) {
    return (
      <div className="mt-24 text-center">
        <h2 className="text-xl font-bold">البيانات غير مكتملة</h2>
        <button
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded"
          onClick={() => navigate("/merchant/products")}
        >
          العودة إلى المنتجات
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto" dir="rtl">
      <BackToMerchant />

      <h1 className="text-2xl font-bold mb-6">تحليل التسعير (MIT)</h1>

      <div className="bg-white p-6 rounded shadow">
        <p>المنتج: {product.name}</p>
        <p>السعر الذكي: {mit.smart_price} ريال</p>
        <p>
          نطاق السوق: {mit.market_floor} – {mit.market_ceiling}
        </p>
      </div>
    </div>
  );
}
