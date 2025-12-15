// ============================================================================
// Core4.AI – CampaignBuilder (FINAL EXECUTION VERSION)
// Campaign = Execution layer ONLY
// ============================================================================

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BackToMerchant from "@/components/common/BackToMerchant";
import { useInfluence } from "@/context/InfluenceScoreContext";

export default function CampaignBuilder() {
  const location = useLocation();
  const productId = new URLSearchParams(window.location.search).get("product");

  const { aiMatchProductToInfluencer, predictCommercialSuccess } =
    useInfluence();

  const [product, setProduct] = useState(null);
  const [mit, setMIT] = useState(null);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [loading, setLoading] = useState(true);

  // --------------------------------------------------------------------------
  // Load Product + MIT
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (!productId) return;

    async function load() {
      setLoading(true);
      try {
        const pRes = await fetch(`/api/merchant/products/${productId}`);
        if (!pRes.ok) throw new Error();
        const p = await pRes.json();
        setProduct(p);

        const mRes = await fetch(`/api/merchant/products/${productId}/mit`);
        if (mRes.ok) {
          const m = await mRes.json();
          if (m.status !== "ready") {
            alert("يجب حساب السعر الذكي قبل إنشاء حملة.");
            return;
          }
          setMIT(m);
        }
      } catch {
        setProduct(null);
        setMIT(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [productId]);

  // --------------------------------------------------------------------------
  // AI Influencer
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (!product) return;

    const aiInf = aiMatchProductToInfluencer(product);
    if (!aiInf) return;

    setSelectedInfluencer({
      name: "المؤثر الأنسب حسب التحليل",
      projection: predictCommercialSuccess(product),
    });
  }, [product]);

  // --------------------------------------------------------------------------
  // Guards
  // --------------------------------------------------------------------------
  if (loading)
    return <Msg text="جاري تحميل بيانات الحملة…" />;

  if (!product || !mit)
    return <Msg text="بيانات غير مكتملة لإطلاق الحملة." />;

  // --------------------------------------------------------------------------
  // Launch Campaign (FINAL)
  // --------------------------------------------------------------------------
  async function launchCampaign() {
    const payload = {
      product_id: product.id,
      audience: "الجمهور العام",
      influencer: selectedInfluencer?.name || "غير محدد",
      recommended_price: Number(mit.smart_price),
      ai_success_score: Number(selectedInfluencer?.projection || 0),
    };

    try {
      const res = await fetch("/api/merchant/campaigns/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        alert("فشل إنشاء الحملة:\n" + JSON.stringify(err.detail, null, 2));
        return;
      }

      const data = await res.json();
      window.location.href = `/merchant/campaign-summary?id=${data.id}`;
    } catch {
      alert("فشل الاتصال بالخادم.");
    }
  }

  // --------------------------------------------------------------------------
  // UI
  // --------------------------------------------------------------------------
  return (
    <div className="max-w-4xl mx-auto" dir="rtl">
      <BackToMerchant />

      <h1 className="text-3xl font-extrabold mb-6">
        إطلاق حملة تسويقية
      </h1>

      <Box title="ملخص القرار">
        <p><b>المنتج:</b> {product.name}</p>
        <p><b>السعر الذكي:</b> {mit.smart_price} ريال</p>
        <p className="text-sm text-gray-600 mt-2">
          هذا السعر تم تحديده بناءً على السوق ورأي العملاء.
        </p>
      </Box>

      <Box title="المؤثر المقترح">
        <p>{selectedInfluencer?.name}</p>
        <p className="text-sm text-gray-600">
          نسبة النجاح المتوقعة: {selectedInfluencer?.projection}%
        </p>
      </Box>

      <button
        className="btn-green w-full py-3 mt-6"
        onClick={launchCampaign}
      >
        إطلاق الحملة
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// UI Helpers
// ---------------------------------------------------------------------------
const Msg = ({ text }) => (
  <div className="text-center text-gray-500 mt-20">{text}</div>
);

const Box = ({ title, children }) => (
  <div className="bg-white border rounded-xl p-6 mb-6">
    <h2 className="font-bold mb-3">{title}</h2>
    {children}
  </div>
);
