// ============================================================================
// 💚 Core4.AI – MIT Market Insights
// Concept-Rich Edition (Elasticity • EVC • Demand Plateau)
// Supports :id and :productId
// ============================================================================

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackToMerchant from "@/components/common/BackToMerchant";

export default function MITMarketInsights() {
  const { id, productId } = useParams();
  const pid = id || productId;

  const [product, setProduct] = useState(null);
  const [mit, setMit] = useState(null);
  const [loading, setLoading] = useState(true);

  // --------------------------------------------------------------------------
  // LOAD DATA
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (!pid) {
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const [pRes, mRes] = await Promise.all([
          fetch(`/api/merchant/products/${pid}`),
          fetch(`/api/merchant/products/${pid}/mit`)
        ]);

        if (!pRes.ok || !mRes.ok) throw new Error();

        setProduct(await pRes.json());
        setMit(await mRes.json());
      } catch {
        setProduct(null);
        setMit(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [pid]);

  // --------------------------------------------------------------------------
  // GUARDS
  // --------------------------------------------------------------------------
  if (loading)
    return <Center>⏳ جاري تحميل تحليل السوق (MIT)...</Center>;

  if (!product)
    return <Center error>❗ المنتج غير موجود</Center>;

  if (!mit)
    return (
      <div className="max-w-5xl mx-auto p-6" dir="rtl">
        <BackToMerchant />
        <Box title="⚠️ تحليل MIT غير جاهز">
          لم يتم حساب تحليل السوق لهذا المنتج بعد.
        </Box>
      </div>
    );

  // --------------------------------------------------------------------------
  // MIT CORE CONCEPTS
  // --------------------------------------------------------------------------

  const smartPrice = Number(mit.smart_price);
  const floor = Number(mit.market_floor);
  const ceiling = Number(mit.market_ceiling);

  // 1️⃣ Elasticity (proxy)
  const elasticity =
    smartPrice < floor ? 2.2 :
    smartPrice > ceiling ? 0.6 :
    1.1;

  // 2️⃣ Demand Plateau (sweet spot)
  const plateauMin = floor * 1.05;
  const plateauMax = ceiling * 0.95;
  const inPlateau = smartPrice >= plateauMin && smartPrice <= plateauMax;

  // 3️⃣ EVC — Economic Value to Customer
  const evc =
    product.price +
    (elasticity > 1 ? 0.15 * product.price : 0.05 * product.price);

  // 4️⃣ Decision Zone
  const decisionZone =
    smartPrice < floor ? "Underpriced" :
    smartPrice > ceiling ? "Overpriced" :
    "Value-Optimal";

  // --------------------------------------------------------------------------
  // SCENARIO SIMULATION (Real MIT thinking)
  // --------------------------------------------------------------------------
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

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------
  return (
    <div className="max-w-5xl mx-auto p-6" dir="rtl">
      <BackToMerchant />

      <h1 className="text-3xl font-extrabold mb-8 text-center">
        تحليل السوق (MIT) — منطق القرار
      </h1>

      {/* PRODUCT + PRICE */}
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

      {/* ELASTICITY + EVC */}
      <Box title="🧠 منطق MIT (القيمة والطلب)">
        <Line
          label="حساسية السعر (Elasticity)"
          value={elasticity.toFixed(2)}
        />
        <Line
          label="القيمة الاقتصادية للعميل (EVC)"
          value={`${evc.toFixed(0)} ريال`}
        />
        <p className="text-sm text-gray-600 mt-3">
          {inPlateau
            ? "السعر داخل Plateau الطلب — زيادة السعر لا تؤثر بقوة على التحويل."
            : "السعر خارج Plateau — الطلب حساس لأي تغيير."}
        </p>
      </Box>

      {/* SCENARIOS */}
      <Box title="🔁 محاكاة القرار (Demand vs Channel)">
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
const Center = ({ children, error }) => (
  <div className={`p-8 text-center ${error ? "text-red-600" : "text-gray-500"}`} dir="rtl">
    {children}
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
