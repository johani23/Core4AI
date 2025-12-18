// src/components/pages/merchant/PricingCenter.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackToMerchant from "@/components/common/BackToMerchant";
import { apiFetch } from "@/lib/api";

export default function PricingCenter() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [mit, setMit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    async function load() {
      try {
        const p = await apiFetch(`/api/merchant/products/${productId}`);
        setProduct(p);

        const m = await apiFetch(`/api/merchant/products/${productId}/mit`);
        if (m.status === "ready") {
          setMit(m);
        } else {
          setMit(null);
        }
      } catch (err) {
        console.error("PricingCenter load error:", err);
        setProduct(null);
        setMit(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [productId]);

  if (loading) {
    return <Message msg="جاري تحميل تحليل التسعير…" />;
  }

  if (!product || !mit) {
    return (
      <Notice
        title="البيانات غير مكتملة"
        description="لا يمكن عرض التسعير الذكي قبل استكمال بيانات المنتج."
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

  return (
    <div className="max-w-4xl mx-auto" dir="rtl">
      <BackToMerchant />

      <Box title="المنتج">
        <Line label="الاسم" value={product.name} />
        <Line label="السعر الحالي" value={`${product.price} ريال`} />
      </Box>

      <Box title="تحليل السوق (MIT)">
        <Line label="السعر الذكي" value={`${mit.smart_price} ريال`} />
        <Line
          label="نطاق السوق"
          value={`${mit.market_floor} – ${mit.market_ceiling} ريال`}
        />
      </Box>
    </div>
  );
}

/* UI helpers */
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
