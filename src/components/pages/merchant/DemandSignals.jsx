// ============================================================================
// Core4.AI – DemandSignals (FINAL)
// للتاجر: هذه إشارات طلب من السوق
// ============================================================================

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CorePanel from "@/components/ui/CorePanel";

export default function DemandSignals() {
  const [signals, setSignals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/market-intentions")
      .then((r) => r.json())
      .then(setSignals);
  }, []);

  return (
    <div className="p-8" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">إشارات الطلب</h1>
      <p className="text-gray-600 mb-6">
        هذه رغبات حقيقية من العملاء. يمكنك إنشاء منتج بناءً عليها أو تجاهلها.
      </p>

      {signals.map((s) => (
        <CorePanel key={s.id} className="mb-4 p-4">
          <p className="font-bold">{s.feature_text}</p>
          <p className="text-sm text-gray-600">
            السعر المناسب لهم: {s.target_price} ريال
          </p>
          <button
            onClick={() =>
              navigate("/merchant/add-product", {
                state: { demandSignal: s },
              })
            }
            className="mt-3 bg-purple-600 text-white px-4 py-2 rounded"
          >
            إنشاء منتج بناءً على هذا الطلب
          </button>
        </CorePanel>
      ))}
    </div>
  );
}
