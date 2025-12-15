// ============================================================================
// Core4.AI – PricingCenter
// FINAL DECISION INTELLIGENCE VERSION
// ============================================================================

import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import BackToMerchant from "@/components/common/BackToMerchant";

export default function PricingCenter() {
  const { productId } = useParams();
  const location = useLocation();

  const demandSignal = location.state?.demandSignal || null;

  const [product, setProduct] = useState(null);
  const [mit, setMit] = useState(null);
  const [rnd, setRnd] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const pRes = await fetch(`/api/merchant/products/${productId}`);
        if (!pRes.ok) return;
        const p = await pRes.json();
        setProduct(p);

        const mRes = await fetch(`/api/merchant/products/${productId}/mit`);
        if (mRes.ok) setMit(await mRes.json());

        // 🔑 الصحيح: ربط RND بإشارة الطلب
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

  if (loading) return <Message msg="جاري تحميل التحليل…" />;
  if (!product || !mit) return <Message msg="البيانات غير مكتملة." />;

  return (
    <div className="max-w-4xl mx-auto" dir="rtl">
      <BackToMerchant />

      <Box title="لماذا هذا التحليل؟">
        <p className="text-sm text-gray-700">
          هذا القرار مبني على طلب حقيقي من العملاء قبل إنشاء المنتج،
          وتحليل السوق، وتقييم العملاء للميزة نفسها.
        </p>
      </Box>

      <Box title="المنتج">
        <p><b>الاسم:</b> {product.name}</p>
        <p><b>السعر الحالي:</b> {product.price} ريال</p>
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
              <p className="text-yellow-700 font-bold mt-3">
                تنبيه: العملاء يرون الميزة مهمة لكنهم غير متأكدين أنها
                ستلبي توقعهم بالكامل. قد تحتاج تحسين المنتج أو شرح قيمته.
              </p>
            )}
          </Box>
        </>
      )}

      <Box title="ماذا تفعل الآن؟">
        <p className="text-sm text-gray-700">
          القرار النهائي بيدك:
          <br />– إذا السعر أعلى من تصور العملاء: خفّض السعر أو حسّن القيمة  
          <br />– إذا الميزة قوية: يمكنك حملة تحويل مباشرة  
          <br />– إذا الميزة غير واضحة: حملة تعليمية أولًا
        </p>
      </Box>
    </div>
  );
}

// ---------------------------------------------------------------------------
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
  <div className="text-center text-gray-500 mt-20">{msg}</div>
);
