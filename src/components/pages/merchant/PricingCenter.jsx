// ============================================================================
// Core4.AI – PricingCenter
// FINAL DECISION INTELLIGENCE VERSION (STABLE + CONSISTENT)
// ============================================================================

import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import BackToMerchant from "@/components/common/BackToMerchant";

export default function PricingCenter() {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const demandSignal = location.state?.demandSignal || null;

  const [product, setProduct] = useState(null);
  const [mit, setMit] = useState(null);
  const [rnd, setRnd] = useState(null);
  const [loading, setLoading] = useState(true);

  // ============================================================================
  // LOAD DATA
  // ============================================================================
  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    async function load() {
      try {
        // --- Load product ---
        const pRes = await fetch(`/api/merchant/products/${productId}`);
        if (!pRes.ok) {
          setProduct(null);
          setMit(null);
          return;
        }

        const p = await pRes.json();
        setProduct(p);

        // --- Load MIT ---
        const mRes = await fetch(`/api/merchant/products/${productId}/mit`);
        if (mRes.ok) {
          const m = await mRes.json();
          if (m.status === "ready") {
            setMit(m);
          } else {
            setMit(null); // ✅ MIT not ready is NOT an error
          }
        } else {
          setMit(null);
        }

        // --- Load RND (optional) ---
        if (demandSignal?.id) {
          const rRes = await fetch(
            `/api/rnd/value-insights?intention_id=${demandSignal.id}`
          );
          if (rRes.ok) setRnd(await rRes.json());
        }
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [productId, demandSignal]);

  // ============================================================================
  // LOADING
  // ============================================================================
  if (loading) {
    return <Message msg="جاري تحميل تحليل التسعير الذكي…" />;
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
            primary: true,
          },
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
        title="⚠️ البيانات غير مكتملة"
        description="لا يمكن حساب التسعير الذكي (MIT) قبل استكمال بيانات المنتج وربطه بتحليل السوق."
        actions={[
          {
            label: "✏️ استكمال بيانات المنتج",
            onClick: () => navigate(`/merchant/products/${productId}/edit`),
            primary: true,
          },
          {
            label: "📦 العودة إلى المنتجات",
            onClick: () => navigate("/merchant/products"),
          },
        ]}
      />
    );
  }

  // ============================================================================
  // MAIN VIEW
  // ============================================================================
  return (
    <div className="max-w-4xl mx-auto" dir="rtl">
      <BackToMerchant />

      <Box title="لماذا هذا التحليل؟">
        <p className="text-sm text-gray-700">
          هذا القرار مبني على تحليل السوق (MIT) وبيانات المنتج الفعلية
          بهدف الوصول إلى تسعير قابل للتحويل.
        </p>
      </Box>

      <Box title="المنتج">
        <Line label="الاسم" value={product.name} />
        <Line label="السعر الحالي" value={`${product.price} ريال`} />
      </Box>

      <Box title="تحليل السوق (MIT)">
        <Line label="السعر الذكي المقترح" value={`${mit.smart_price} ريال`} />
        <Line
          label="نطاق السوق المقبول"
          value={`${mit.market_floor} – ${mit.market_ceiling} ريال`}
        />
      </Box>

      {rnd && (
        <>
          <Box title="رأي العملاء عن السعر">
            <Line
              label="سعر السوق كما يراه العملاء"
              value={`${rnd.perceived_market_price} ريال`}
            />
            <Line
              label="السعر المناسب لهم"
              value={`${rnd.recommended_price} ريال`}
            />
            <Line label="حساسية السعر" value={rnd.elasticity_label} />
          </Box>

          <Box title="تقييم العملاء للميزة">
            <Line label="أهمية الميزة" value={`${rnd.importance}/5`} />
            <Line label="تميّز الميزة" value={`${rnd.uniqueness}/5`} />
            <Line label="الرضا المتوقع" value={`${rnd.satisfaction}/5`} />

            {rnd.satisfaction < rnd.importance && (
              <p className="text-yellow-700 font-bold mt-4">
                ⚠️ العملاء يرون الميزة مهمة لكن القيمة غير واضحة بالكامل.
              </p>
            )}
          </Box>
        </>
      )}

      <Box title="ماذا تفعل الآن؟">
        <p className="text-sm text-gray-700 leading-relaxed">
          – سعر أعلى من السوق؟ حسّن القيمة أو خفّض السعر  
          <br />– قيمة واضحة؟ أطلق حملة تحويل  
          <br />– غموض؟ حملة تعليمية أولًا
        </p>
      </Box>
    </div>
  );
}

// ============================================================================
// UI HELPERS
// ============================================================================
const Message = ({ msg }) => (
  <div className="text-center text-gray-500 mt-24">{msg}</div>
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
  <div className="bg-white border rounded-xl p-6 mb-6">
    <h2 className="font-bold mb-3">{title}</h2>
    {children}
  </div>
);

const Line = ({ label, value }) => (
  <div className="flex justify-between border-b py-2">
    <span>{label}</span>
    <span className="font-bold">{value}</span>
  </div>
);
