import React, { useEffect, useState } from "react";
import { calcEVC, calcElasticity, calcMonadic, calcBreakeven } from "@/api/pricing";

export default function PricingPanel({ product, onDiscount }) {
  const [evc, setEvc] = useState(null);
  const [elasticity, setElasticity] = useState(null);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (!product) return;

    const load = async () => {
      // EVC
      const evcRes = await calcEVC({
        reference_price: product.price,
        differentiation_values: [product.features.length * 2] // simple hook (later AI)
      });
      setEvc(evcRes.data);

      // ELASTICITY ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â placeholder random until data accumulates
      const elasticityRes = await calcElasticity({
        prices: [product.price - 10, product.price, product.price + 10],
        quantities: [120, 100, 80]
      });
      setElasticity(elasticityRes.data.elasticity);

      // DYNAMIC DISCOUNT
      const disc =
        elasticityRes.data.elasticity > -1 ? 5 :
        elasticityRes.data.elasticity > -2 ? 10 : 20;

      setDiscount(disc);
      if (onDiscount) onDiscount(disc);
    };

    load();
  }, [product, onDiscount]);

  if (!product) return null;

  return (
    <div className="p-4 border rounded-xl bg-white shadow mt-4">
      <h2 className="text-xl font-bold text-green-700 mb-2">
        Pricing Intelligence (MIT Integrated)
      </h2>

      {evc && (
        <div className="mb-3">
          <p className="font-semibold">EVC (Max Value): {evc.evc}</p>
          <p>Recommended: {evc.recommended_price}</p>
          <p>Penetration: {evc.penetration_price}</p>
        </div>
      )}

      {elasticity !== null && (
        <div className="mb-3">
          <p className="font-semibold">Elasticity: {elasticity}</p>
        </div>
      )}

      <div className="p-3 bg-green-50 border rounded">
        <h3 className="font-bold mb-1">Dynamic Discount Recommendation</h3>
        <p>{discount}% Suggested</p>
      </div>
    </div>
  );
}

