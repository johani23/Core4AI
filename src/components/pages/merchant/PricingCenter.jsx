import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackToMerchant from "@/components/common/BackToMerchant";
import { apiFetch } from "@/lib/api";

export default function PricingCenter() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [mit, setMit] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setProduct(await apiFetch(`/api/merchant/products/${productId}`));
        const m = await apiFetch(`/api/merchant/products/${productId}/mit`);
        if (m.status === "ready") setMit(m);
      } catch {
        setProduct(null);
      }
    }
    load();
  }, [productId]);

  if (!product)
    return <div className="text-center mt-20">المنتج غير موجود</div>;

  return (
    <div className="max-w-4xl mx-auto" dir="rtl">
      <BackToMerchant />

      <h1 className="text-2xl font-bold mb-6">{product.name}</h1>

      {mit ? (
        <div className="bg-white p-6 rounded shadow">
          <p>السعر الذكي: {mit.smart_price}</p>
          <p>
            النطاق: {mit.market_floor} – {mit.market_ceiling}
          </p>
        </div>
      ) : (
        <p>تحليل MIT غير جاهز</p>
      )}

      <button
        onClick={() => navigate("/merchant/products")}
        className="mt-6 px-6 py-3 bg-gray-200 rounded"
      >
        العودة
      </button>
    </div>
  );
}
