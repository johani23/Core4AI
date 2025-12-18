// ============================================================================
// Core4.AI – PricingCenter
// FINAL DECISION INTELLIGENCE VERSION (UX COMPLETE + Render-Safe)
// ============================================================================

import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import BackToMerchant from "@/components/common/BackToMerchant";

// ---------------------------------------------------------------------------
// 🔑 Backend base URL (DEV vs PROD)
// ---------------------------------------------------------------------------
const API_BASE =
  import.meta.env.MODE === "production"
    ? "https://core4ai-backend.onrender.com"
    : "";

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
    async function load() {
      try {
        // --- Load product ---
        const pRes = await fetch(
          `${API_BASE}/api/merchant/products/${productId}`
        );
        if (!pRes.ok) {
          setProduct(null);
          setMit(null);
          return;
        }

        const p = await pRes.json();
        setProduct(p);

        // --- Load MIT ---
        const mRes = await fetch(
          `${API_BASE}/api/merchant/products/${productId}/mit`
        );

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

        // --- Load RND (optional) ---
        if (demandSignal?.id) {
          const rRes = await fetch(
            `${API_BASE}/api/rnd/value-insights?intention_id=${demandSignal.id}`
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
  // INCOMPLETE DATA (UX ACTIONABLE)
  // ============================================================================
  if (!product || !mit) {
    return (
      <div className="max-w-3xl mx-auto mt-24 text-center" dir="rtl">
        <h2 className="text-2xl font-bold mb-4">البيانات غير مكتملة</h2>

        <p className="text-gray-500 mb-8">
          لا يمكن حساب التسعير الذكي (MIT) قبل استكمال بيانات المنتج
          وربطه بتحليل السوق.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() =>
              navigate(`/merchant/products/${productId}/edit`)
            }
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
          >
            ✏️ استكمال بيانات المنتج
          </button>

          <button
            onClick={() => navigate("/merchant/products")}
            className="px-6 py-3 bg-gray-200 rounded-lg font-bold hover:bg-gray-300"
          >
            📦 العودة إلى المنتجات
          </button>
        </div>
      </div>
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
          هذا القرار مبني على طلب حقيقي من العملاء قبل إنشاء المنتج،
          وتحليل السوق (MIT)، وتقييم العملاء للميزة نفسها.
        </p>
      </Box>

      <Box title="المنتج">
        <Line label="الاسم" value={product.name} />
        <Line label="السعر الحالي" value={`${product.price} ريال`} />
      </Box>

      <Box title="تحليل السوق (MIT)">
        <Line
          label="السعر الذكي المقترح"
          value={`${mit.smart_price} ريال`}
        />
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
            <Line
              label="حساسية السعر"
              value={rnd.elasticity_label}
            />
          </Box>

          <Box title="تقييم العملاء للميزة">
            <Line label="أهمية الميزة" value={`${rnd.importance}/5`} />
            <Line label="تميّز الميزة" value={`${rnd.uniqueness}/5`} />
            <Line label="الرضا المتوقع" value={`${rnd.satisfaction}/5`} />

            {rnd.satisfaction < rnd.importance && (
              <p className="text-yellow-700 font-bold mt-4">
                ⚠️ تنبيه: العملاء يرون الميزة مهمة لكنهم غير متأكدين
                أنها ستلبي توقعهم بالكامل. قد تحتاج تحسين المنتج
                أو توضيح قيمته بشكل أفضل.
              </p>
            )}
          </Box>
        </>
      )}

      <Box title="ماذا تفعل الآن؟">
        <p className="text-sm text-gray-700 leading-relaxed">
          القرار النهائي بيدك:
          <br />– إذا السعر أعلى من تصور العملاء: خفّض السعر أو حسّن القيمة  
          <br />– إذا الميزة قوية: يمكنك إطلاق حملة تحويل مباشرة  
          <br />– إذا الميزة غير واضحة: حملة تعليمية أولًا
        </p>
      </Box>
    </div>
  );
}

// ============================================================================
// UI HELPERS
// ============================================================================
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

const Message = ({ msg }) => (
  <div className="text-center text-gray-500 mt-24">{msg}</div>
);
