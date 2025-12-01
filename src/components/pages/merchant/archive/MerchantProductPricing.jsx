import React, { useEffect, useState } from "react";
import { calcEVC, calcElasticity, calcMonadic, calcBreakeven } from "../api/pricing";

export default function MerchantProductPricing({ product }) {
  const [evc, setEvc] = useState(null);
  const [elasticity, setElasticity] = useState(null);
  const [monadic, setMonadic] = useState(null);
  const [breakeven, setBreakeven] = useState(null);

  useEffect(() => {
    if (!product) return;
  }, [product]);

  return (
    <div className="space-y-4 p-4 bg-white rounded-xl shadow border">
      <h2 className="text-2xl font-bold text-green-700">
        Pricing Intelligence for: {product?.name}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Display EVC */}
        {evc && (
          <div className="border p-3 rounded bg-green-50">
            <h3 className="font-bold">EVC Results</h3>
            <p>EVC: {evc.evc}</p>
            <p>Recommended: {evc.recommended_price}</p>
            <p>Penetration: {evc.penetration_price}</p>
          </div>
        )}

        {elasticity && (
          <div className="border p-3 rounded bg-green-50">
            <h3 className="font-bold">Elasticity</h3>
            <p>{elasticity}</p>
          </div>
        )}

        {monadic && (
          <div className="border p-3 rounded bg-green-50">
            <h3 className="font-bold">Demand Curve</h3>
            {monadic.points.map((p, i) => (
              <p key={i}>Price {p.price}: {(p.buy_rate * 100).toFixed(1)}%</p>
            ))}
          </div>
        )}

        {breakeven && (
          <div className="border p-3 rounded bg-green-50">
            <h3 className="font-bold">Breakeven Units</h3>
            <p>{breakeven}</p>
          </div>
        )}
      </div>
    </div>
  );
}
