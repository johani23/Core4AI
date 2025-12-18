// ============================================================================
// 💚 Core4.AI – MITMarketInsights
// EXECUTIVE DECISION REPORT (Board-Level UX)
// MIT = Strategic Recommendation (NOT Mandatory Pricing)
// ============================================================================

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackToMerchant from "@/components/common/BackToMerchant";
import { apiFetch } from "@/lib/api";

export default function MITMarketInsights() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [mit, setMit] = useState(null);
  const [loading, setLoading] = useState(true);

  // ============================================================================
  // LOAD PRODUCT + MIT
  // ============================================================================
  useEffect(() => {
    async function load() {
      try {
        const p = await apiFetch(`/api/merchant/products/${id}`);
        const m = await apiFetch(`/api/merchant/products/${id}/mit`);

        if (m?.status !== "ready") {
          setMit(null);
        } else {
          setMit(m);
        }

        setProduct(p);
      } catch {
        setProduct(null);
        setMit(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-24 text-gray-500">جاري التحليل...</div>;
  }

  if (!product || !mit) {
    return (
      <div className="text-center mt-24">
        <h2 className="text-xl font-bold mb-4">تحليل السوق غير متوفر</h2>
        <button
          onClick={() => navigate("/merchant/products")}
          className="px-6 py-3 bg-green-600 text-white rounded"
        >
          العودة إلى المنتجات
        </button>
      </div>
    );
  }

  // ============================================================================
  // DERIVED INSIGHTS
  // ============================================================================
  const smartPrice = Number(mit.smart_price);
  const floor = Number(mit.market_floor);
  const ceiling = Number(mit.market_ceiling);

  const inPlateau = smartPrice >= floor && smartPrice <= ceiling;

  const elasticityLabel = inPlateau ? "متوسطة" : "مرتفعة";
  const riskLevel = inPlateau ? "منخفض" : "مرتفع";
  const decisionZone = inPlateau ? "Value-Optimal" : "Outside-Optimal";

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <div className="max-w-5xl mx-auto p-6" dir="rtl">
      <BackToMerchant />

      {/* ========================================================= */}
      {/* HEADER */}
      {/* ========================================================= */}
      <h1 className="text-3xl font-extrabold text-center mb-2">
        تقرير تنفيذي – تحليل السوق (MIT)
      </h1>

      <p className="text-center text-green-600 font-bold mb-8">
        القرار التنفيذي: Launch
      </p>

      {/* ========================================================= */}
      {/* EXECUTIVE DECISION FRAMING */}
      {/* ========================================================= */}
      <Section title="إطار القرار التنفيذي">
        <ul className="list-disc pr-6 space-y-2 text-sm">
          <li>
            <b>MIT Pricing</b> يُستخدم كتوصية ذكية مرجعية، وليس سعرًا إلزاميًا.
          </li>
          <li>
            السعر الحالي يقع ضمن النطاق الآمن للسوق، مما يسمح بالتنفيذ بثقة.
          </li>
          <li>
            القرار النهائي يبقى بيد الإدارة وفق استراتيجية الدخول وهوامش الربح.
          </li>
          <li>
            يُنصح بإطلاق حملة تحويل أولية للتحقق من استجابة السوق قبل أي تعديل.
          </li>
        </ul>
      </Section>

      {/* ========================================================= */}
      {/* MARKET POSITION */}
      {/* ========================================================= */}
      <Section title="موقع المنتج في السوق">
        <KeyValue label="السعر الذكي (MIT)" value={`${smartPrice} ريال`} />
        <KeyValue
          label="نطاق السوق المقبول"
          value={`${floor} – ${ceiling} ريال`}
        />
        <KeyValue label="منطقة القرار" value={decisionZone} />
      </Section>

      {/* ========================================================= */}
      {/* DEMAND BEHAVIOR */}
      {/* ========================================================= */}
      <Section title="سلوك الطلب وحساسية السعر">
        <KeyValue label="حساسية الطلب (Elasticity)" value={elasticityLabel} />
        <KeyValue label="استقرار الطلب" value="داخل Plateau الطلب" />
        <KeyValue label="مستوى المخاطرة" value={riskLevel} />
      </Section>

      {/* ========================================================= */}
      {/* EVC */}
      {/* ========================================================= */}
      <Section title="القيمة الاقتصادية للعميل (EVC)">
        <p className="text-sm text-gray-600">
          القيمة المدركة للعميل أعلى من السعر الحالي، مما يعزز احتمالية التحويل
          دون الحاجة إلى خصومات فورية.
        </p>
      </Section>

      {/* ========================================================= */}
      {/* SCENARIOS */}
      {/* ========================================================= */}
      <Section title="السيناريوهات المحتملة">
        <ul className="list-disc pr-6 space-y-2 text-sm">
          <li>
            <b>الإطلاق الآن:</b> مناسب إذا كان الهدف سرعة الدخول للسوق.
          </li>
          <li>
            <b>تعديل السعر:</b> لاحقًا لتعظيم الهامش أو تقليل المخاطر.
          </li>
          <li>
            <b>تحسين القيمة أولًا:</b> قبل حملات واسعة النطاق.
          </li>
        </ul>
      </Section>

      {/* ========================================================= */}
      {/* FINAL RECOMMENDATION */}
      {/* ========================================================= */}
      <Section title="التوصية التنفيذية">
        <p className="text-sm text-gray-700">
          نوصي بالانتقال إلى تنفيذ التسعير الحالي، مع اعتماد MIT كمرجع استراتيجي
          للتوجيه وليس كالتزام سعري، وإطلاق حملة تحويل أولية لقياس استجابة السوق
          قبل أي تعديل.
        </p>
      </Section>

      {/* ========================================================= */}
      {/* ACTIONS */}
      {/* ========================================================= */}
      <div className="flex justify-center gap-4 mt-10">
        <button
          onClick={() => navigate("/merchant/products")}
          className="px-6 py-3 bg-gray-200 rounded"
        >
          العودة إلى المنتجات
        </button>

        <button
          onClick={() => navigate(`/merchant/pricing/${id}`)}
          className="px-6 py-3 bg-green-600 text-white rounded"
        >
          الانتقال إلى تنفيذ التسعير
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// UI HELPERS
// ============================================================================
function Section({ title, children }) {
  return (
    <div className="bg-white border rounded-xl p-6 mb-6 shadow-sm">
      <h2 className="font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function KeyValue({ label, value }) {
  return (
    <div className="flex justify-between border-b py-2 text-sm">
      <span>{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
