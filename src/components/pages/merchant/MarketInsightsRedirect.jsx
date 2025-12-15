import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MarketInsightsRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    async function go() {
      try {
        const res = await fetch("/api/merchant/products/");
        if (!res.ok) return;

        const products = await res.json();
        if (!products.length) return;

        navigate(`/merchant/market-insights/${products[0].id}`, { replace: true });
      } catch (e) {
        console.error("MIT redirect failed", e);
      }
    }

    go();
  }, [navigate]);

  return (
    <div className="text-center mt-20 text-gray-500" dir="rtl">
      ⏳ جاري تحميل تحليل السوق (MIT)...
    </div>
  );
}
