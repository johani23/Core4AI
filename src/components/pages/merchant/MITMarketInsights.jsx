// ============================================================================
// 💚 Core4.AI – MITMarketInsights (FINAL – NO FALSE 404)
// ============================================================================

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackToMerchant from "@/components/common/BackToMerchant";

const API = import.meta.env.VITE_API_BASE_URL;

export default function MITMarketInsights() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [mit, setMit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const pRes = await fetch(
          `${API}/api/merchant/products/${id}`
        );
        if (!pRes.ok) return;

        setProduct(await pRes.json());

        const mRes = await fetch(
          `${API}/api/merchant/products/${id}/mit`
        );
        const m = await mRes.json();
        if (m.status === "ready") setMit(m);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div className="mt-24 text-center">⏳ تحميل…</div>;

  if (!product) {
    return (
      <div className="mt-24 text-center">
        <h2 className="font-bold">المنتج غير موجود</h2>
        <button onClick={() => navigate("/merchant/products")}>
          العودة
        </button>
      </div>
    );
  }

  if (!mit) {
    return (
      <div className="mt-24 text-center">
        <h2 className="font-bold">تحليل السوق غير جاهز</h2>
        <button onClick={() => navigate("/merchant/products")}>
          العودة
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto" dir="rtl">
      <BackToMerchant />

      <h1 className="text-2xl font-bold mb-6">تحليل السوق (MIT)</h1>

      <div className="bg-white p-6 rounded shadow">
        <p>السعر الذكي: {mit.smart_price}</p>
        <p>
          السوق: {mit.market_floor} – {mit.market_ceiling}
        </p>
      </div>
    </div>
  );
}
