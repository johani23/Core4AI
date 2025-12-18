// src/components/pages/merchant/MITMarketInsights.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackToMerchant from "@/components/common/BackToMerchant";
import { apiFetch } from "@/lib/api";

export default function MITMarketInsights() {
  const { id, productId } = useParams();
  const pid = id || productId;
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [mit, setMit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pid) return;

    async function load() {
      try {
        const p = await apiFetch(`/api/merchant/products/${pid}`);
        setProduct(p);

        const m = await apiFetch(`/api/merchant/products/${pid}/mit`);
        setMit(m.status === "ready" ? m : null);
      } catch (err) {
        console.error("MITMarketInsights error:", err);
        setProduct(null);
        setMit(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [pid]);

  if (loading) return <Center>⏳ تحميل تحليل السوق…</Center>;

  if (!product) {
    return (
      <Notice
        title="المنتج غير موجود"
        description="لم يتم العثور على المنتج."
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

  if (!mit) {
    return (
      <Notice
        title="تحليل السوق غير جاهز"
        description="لم يتم حساب MIT لهذا المنتج بعد."
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

  return (
    <div className="max-w-4xl mx-auto p-6" dir="rtl">
      <BackToMerchant />

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

/* helpers */
const Center = ({ children }) => (
  <div className="p-8 text-center text-gray-500">{children}</div>
);

const Notice = ({ title, description, actions }) => (
  <div className="max-w-3xl mx-auto mt-24 text-center" dir="rtl">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <p className="text-gray-500 mb-8">{description}</p>
    <div className="flex justify-center gap-4">
      {actions.map((a, i) => (
        <button
          key={i}
          onClick={a.onClick}
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
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
