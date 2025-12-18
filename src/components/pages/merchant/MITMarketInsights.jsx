// ============================================================================
// 💚 Core4.AI – MIT Market Insights
// FINAL – Concept-Rich + Actionable UX
// Elasticity • EVC • Demand Plateau
// Supports :id and :productId
// ============================================================================

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackToMerchant from "@/components/common/BackToMerchant";

export default function MITMarketInsights() {
  const { id, productId } = useParams();
  const pid = id || productId;
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [mit, setMit] = useState(null);
  const [loading, setLoading] = useState(true);

  // ============================================================================
  // LOAD DATA
  // ============================================================================
  useEffect(() => {
  if (!pid) {
    setLoading(false);
    return;
  }

  async function load() {
    try {
      // --- Load product ---
      const pRes = await fetch(`/api/merchant/products/${pid}`);
      if (!pRes.ok) {
        setProduct(null);
        setMit(null);
        return;
      }
      const p = await pRes.json();
      setProduct(p);

      // --- Load MIT ---
      const mRes = await fetch(`/api/merchant/products/${pid}/mit`);
      if (mRes.ok) {
        const m = await mRes.json();
        if (m.status === "ready") {
          setMit(m);
        } else {
          setMit(null);
        }
      } else {
        setMit(null);
      }
    } catch {
      // ❗ لا تمس المنتج هنا
      setMit(null);
    } finally {
      setLoading(false);
    }
  }

  load();
}, [pid]);


  // ============================================================================
  // LOADING
  // ============================================================================
  if (loading) {
    return <Center>⏳ جاري تحميل تحليل السوق (MIT)…</Center>;
  }

  // ============================================================================
  // PRODUCT NOT FOUND
  // ============================================================================
  if (!product) {
    return (
      <Notice
        title="❗ المنتج غير موجود"
        description="لم نتمكن من العثور على هذا المنتج. قد يكون محذوفًا أو لم يتم إنشاؤه بعد."
        actions={[
          {
            label: "📦 العودة إلى المنتجات",
            onClick: () => navigate("/merchant/products"),
            primary: true
          }
        ]}
      />
    );
  }

  // ============================================================================
  // MIT NOT READY
  // ============================================================================
  if (!mit) {
    return (
      <Notice
        title="⚠️ تحليل السوق غير جاهز"
        description="لم يتم حساب تحليل السوق (MIT) لهذا المنتج بعد. يحتاج المنتج إلى بيانات مكتملة ليتم تحليله."
        actions={[
          {
            label: "✏️ استكمال بيانات المنتج",
            onClick: () => navigate(`/merchant/products/${pid}/edit`),
            primary: true
          },
          {
            label: "📦 العودة إلى المنتجات",
            onClick: () => navigate("/merchant/products")
          }
        ]}
      />
    );
  }

  // ============================================================================
  // MIT CORE CONCEPTS
  // ============================================================================
  const smartPrice = Number(mit.smart_price);
  const floor = Number(mit.market_floor);
  const ceiling = Number(mit.market_ceiling);

  // 1️⃣ Elasticity (proxy)
  const elasticity =
    smartPrice < floor ? 2.2 :
    smartPrice > ceiling ? 0.6 :
    1.1;

  // 2️⃣ Demand Plateau
  const plateauMin = floor * 1.05;
  const plateauMax = ceiling * 0.95;
  const inPlateau = smartPrice >= plateauMin && smartPrice <= plateauMax;

  // 3️⃣ EVC
  const evc =
    product.price +
    (elasticity > 1 ? 0.15 * product.price : 0.05 * product.price);

  // 4️⃣ Decision Zone
  const decisionZone =
    smartPrice < floor ? "Underpriced" :
    smartPrice > ceiling ? "Overpriced" :
    "Value-Optimal";

  // ============================================================================
  // SCENARIO SIMULATION
  // ============================================================================
  const marketSize = 1000;

  const scenarios = [
    {
      key: "creator",
      title: "المؤثر الفردي (Creator)",
      conversion: 0.035,
      costFactor: 1.4,
      logic: "تحويل أسرع لكن حساسية أعلى للسعر."
    },
    {
      key: "tribe",
      title: "قائد قبيلة (Tribe Leader)",
      conversion: 0.02,
      costFactor: 0.7,
      logic: "طلب أبطأ لكن استقرار وولاء أعلى."
    }
  ];

  function simulate(s) {
    const buyers = Math.round(marketSize * s.conversion);
    const revenue = buyers * smartPrice;
    const cost = buyers * floor * s.costFactor;
    return { buyers, revenue, net: revenue - cost };
  }

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <div className="max-w-5xl mx-auto p-6" dir="rtl">
      <BackToMerchant />

      <h1 className="text-3xl font-extrabold mb-8 text-center">
        تحليل السوق (MIT) — منطق القرار
      </h1>

      <Box title="📦 المنتج والسعر">
        <Line label="المنتج" value={product.name} />
        <Line label="السعر الذكي (MIT)" value={`${smartPrice} ريال`} />
        <Line label="نطاق السوق المقبول" value={`${floor} – ${ceiling} ريال`} />
        <Line
          label="منطقة القرار"
          value={
            decisionZone === "Value-Optimal"
              ? "🟢 تسعير أمثل"
              : decisionZone === "Underpriced"
              ? "🟡 أقل من القيمة"
              : "🔴 أعلى من تحمّل السوق"
          }
        />
      </Box>

      <Box title="🧠 منطق MIT (القيمة والطلب)">
        <Line label="حساسية السعر (Elasticity)" value={elasticity.toFixed(2)} />
        <Line label="القيمة الاقتصادية للعميل (EVC)" value={`${evc.toFixed(0)} ريال`} />
        <p className="text-sm text-gray-600 mt-3">
          {inPlateau
            ? "السعر داخل Plateau الطلب — زيادة السعر لا تؤثر بقوة على التحويل."
            : "السعر خارج Plateau — الطلب حساس لأي تغيير."}
        </p>
      </Box>

      <Box title="🔁 محاكاة القرار (Demand × Channel)">
        {scenarios.map((s) => {
          const r = simulate(s);
          return (
            <div key={s.key} className="border rounded-lg p-4 mb-4">
              <h3 className="font-bold mb-1">{s.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{s.logic}</p>

              <Line label="نسبة التحويل" value={`${(s.conversion * 100).toFixed(1)}%`} />
              <Line label="عدد المشترين" value={r.buyers} />
              <Line label="الإيراد المتوقع" value={`${r.revenue.toFixed(0)} ريال`} />

              <p className={`mt-3 font-bold ${r.net > 0 ? "text-green-700" : "text-red-600"}`}>
                صافي النتيجة: {r.net.toFixed(0)} ريال
              </p>
            </div>
          );
        })}
      </Box>
    </div>
  );
}

// ============================================================================
// UI HELPERS
// ============================================================================
const Center = ({ children }) => (
  <div className="p-8 text-center text-gray-500" dir="rtl">
    {children}
  </div>
);

const Notice = ({ title, description, actions }) => (
  <div className="max-w-3xl mx-auto mt-24 text-center" dir="rtl">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <p className="text-gray-500 mb-8">{description}</p>

    <div className="flex justify-center gap-4 flex-wrap">
      {actions.map((a, i) => (
        <button
          key={i}
          onClick={a.onClick}
          className={`px-6 py-3 rounded-lg font-bold ${
            a.primary
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {a.label}
        </button>
      ))}
    </div>
  </div>
);

const Box = ({ title, children }) => (
  <div className="bg-white border rounded-xl shadow-sm p-6 mb-6">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    {children}
  </div>
);

const Line = ({ label, value }) => (
  <p className="flex justify-between border-b py-2">
    <span>{label}</span>
    <span className="font-bold">{value}</span>
  </p>
);
