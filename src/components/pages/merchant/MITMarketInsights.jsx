// ============================================================================
// 💚 Core4.AI – MITMarketInsights (FINAL – RICH DECISION INTELLIGENCE)
// Executive Report • Market Intelligence • Actionable Decisions
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
  // LOAD DATA
  // ============================================================================
  useEffect(() => {
    async function load() {
      try {
        const p = await apiFetch(`/api/merchant/products/${id}`);
        const m = await apiFetch(`/api/merchant/products/${id}/mit`);
        setProduct(p);
        setMit(m);
      } catch {
        setProduct(null);
        setMit(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  // ============================================================================
  // STATES
  // ============================================================================
  if (loading) {
    return (
      <div className="p-12 text-center text-gray-500" dir="rtl">
        ⏳ جاري بناء تحليل السوق…
      </div>
    );
  }

  if (!product || !mit || mit.status !== "ready") {
    return (
      <div className="p-12 text-center text-gray-500" dir="rtl">
        ❌ لا تتوفر بيانات كافية لبناء تحليل السوق لهذا المنتج
      </div>
    );
  }

  const smart = Number(mit.smart_price);
  const floor = Number(mit.market_floor);
  const ceiling = Number(mit.market_ceiling);

  // ============================================================================
  // DECISION INTELLIGENCE
  // ============================================================================
  let verdict = "Launch";
  let verdictColor = "text-green-700";
  let verdictIcon = "🟢";
  let decisionZone = "Value-Optimal";
  let riskLevel = "منخفض";
  let elasticity = "متوسطة";
  let plateau = "داخل Plateau الطلب";
  let evc = "القيمة المدركة أعلى من السعر";

  let executiveSummary =
    "السعر المقترح يقع داخل النطاق المثالي للسوق، مما يسمح بالإطلاق بثقة دون مخاطر سعرية مباشرة.";

  let recommendation =
    "نوصي بالانتقال مباشرة إلى التسعير واعتماد السعر الحالي مع إمكانية إطلاق حملة تحويل.";

  if (smart < floor) {
    verdict = "Adjust";
    verdictColor = "text-yellow-700";
    verdictIcon = "🟡";
    decisionZone = "Underpriced";
    riskLevel = "متوسط (هامش ربح)";
    elasticity = "منخفضة";
    plateau = "داخل Plateau الطلب";
    evc = "القيمة المدركة أعلى بكثير من السعر";
    executiveSummary =
      "السعر أقل من القيمة السوقية، مما قد يؤدي إلى فقدان هامش ربح محتمل دون زيادة حقيقية في الطلب.";
    recommendation =
      "نوصي برفع السعر تدريجيًا أو تحسين الرسالة التسويقية قبل التوسع.";
  }

  if (smart > ceiling) {
    verdict = "Hold";
    verdictColor = "text-red-700";
    verdictIcon = "🔴";
    decisionZone = "Overpriced";
    riskLevel = "مرتفع (طلب)";
    elasticity = "عالية";
    plateau = "خارج Plateau الطلب";
    evc = "القيمة المدركة أقل من السعر";
    executiveSummary =
      "السعر أعلى من تحمّل السوق الحالي، مما قد يؤثر سلبًا على التحويل والطلب.";
    recommendation =
      "نوصي بتخفيض السعر أو تحسين القيمة المدركة قبل أي إطلاق أو حملة.";
  }

  // ============================================================================
  // UI – EXECUTIVE REPORT
  // ============================================================================
  return (
    <div className="max-w-4xl mx-auto mt-10" dir="rtl">
      <BackToMerchant />

      <h1 className="text-3xl font-extrabold mb-6 text-center">
        تقرير تنفيذي — تحليل السوق (MIT)
      </h1>

      {/* VERDICT */}
      <div className={`text-center text-xl font-bold mb-8 ${verdictColor}`}>
        {verdictIcon} القرار التنفيذي: {verdict}
      </div>

      {/* EXECUTIVE SUMMARY */}
      <Section title="الخلاصة التنفيذية">
        <p>{executiveSummary}</p>
      </Section>

      {/* MARKET POSITION */}
      <Section title="موقع المنتج في السوق">
        <Row label="السعر الذكي (MIT)" value={`${smart} ريال`} />
        <Row label="نطاق السوق المقبول" value={`${floor} – ${ceiling} ريال`} />
        <Row label="منطقة القرار" value={decisionZone} />
      </Section>

      {/* DEMAND INTELLIGENCE */}
      <Section title="سلوك الطلب وحساسية السعر">
        <Row label="حساسية الطلب (Elasticity)" value={elasticity} />
        <Row label="استقرار الطلب" value={plateau} />
        <Row label="مستوى المخاطرة" value={riskLevel} />
      </Section>

      {/* CUSTOMER VALUE */}
      <Section title="القيمة الاقتصادية للعميل (EVC)">
        <p>{evc}</p>
      </Section>

      {/* SCENARIOS */}
      <Section title="السيناريوهات المحتملة">
        <ul className="list-disc pr-6 space-y-2">
          <li>
            <b>الإطلاق الآن:</b> مناسب إذا كان الهدف سرعة الدخول للسوق.
          </li>
          <li>
            <b>تعديل السعر:</b> مناسب لتعظيم الهامش أو تقليل المخاطر.
          </li>
          <li>
            <b>تحسين القيمة أولًا:</b> مناسب قبل حملات واسعة.
          </li>
        </ul>
      </Section>

      {/* RECOMMENDATION */}
      <Section title="التوصية التنفيذية">
        <p>{recommendation}</p>
      </Section>

      {/* ACTIONS */}
      <div className="flex justify-center gap-4 mb-16">
        <button
          onClick={() => navigate(`/merchant/pricing/${id}`)}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          الانتقال إلى التسعير
        </button>

        <button
          onClick={() => navigate("/merchant/products")}
          className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          العودة إلى المنتجات
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
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="font-bold text-lg mb-3">{title}</h2>
      {children}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b py-2 last:border-b-0">
      <span className="text-gray-600">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
