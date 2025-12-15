// ============================================================================
// 💚 Core4.AI – MerchantDecisionSimulator
// Cost • Margin • Discount • Risk Guard
// ============================================================================

import React, { useState, useEffect } from "react";

export default function MerchantDecisionSimulator({ basePrice, mitPrice }) {
  const [fixedCost, setFixedCost] = useState(0);
  const [variableCost, setVariableCost] = useState(0);
  const [otherCost, setOtherCost] = useState(0);
  const [discount, setDiscount] = useState(0);

  const totalCost =
    Number(fixedCost) + Number(variableCost) + Number(otherCost);

  const safePrice = totalCost * 1.15; // 15% safety margin
  const finalPrice = mitPrice - discount;
  const profit = finalPrice - totalCost;
  const risky = finalPrice < safePrice;

  useEffect(() => {
    localStorage.setItem(
      "core4ai_merchant_decision",
      JSON.stringify({
        fixedCost,
        variableCost,
        otherCost,
        discount,
        totalCost,
        safePrice,
        mitPrice,
        finalPrice,
        profit,
        risky,
        beneficiary: "Merchant → Treasury → Campaign ROI",
      })
    );
  }, [
    fixedCost,
    variableCost,
    otherCost,
    discount,
    totalCost,
    safePrice,
    mitPrice,
    finalPrice,
    profit,
    risky,
  ]);

  return (
    <div className="bg-white border rounded-xl p-6 mt-10 shadow-sm">
      <h2 className="text-xl font-bold mb-4">🧮 محاكاة قرار التاجر</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="التكلفة الثابتة" value={fixedCost} set={setFixedCost} />
        <Input label="التكلفة المتغيرة" value={variableCost} set={setVariableCost} />
        <Input label="تكاليف أخرى" value={otherCost} set={setOtherCost} />
        <Input label="الخصم المقترح" value={discount} set={setDiscount} />
      </div>

      <div className="mt-6 text-sm space-y-1">
        <p>💰 إجمالي التكلفة: <b>{totalCost} ريال</b></p>
        <p>🛡️ أقل سعر آمن: <b>{safePrice.toFixed(2)} ريال</b></p>
        <p>🎯 سعر MIT: <b>{mitPrice} ريال</b></p>
        <p>💸 السعر بعد الخصم: <b>{finalPrice} ريال</b></p>
        <p className={profit >= 0 ? "text-green-700" : "text-red-600"}>
          📈 الربح المتوقع: <b>{profit} ريال</b>
        </p>
      </div>

      {risky && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          ⚠️ تحذير: الخصم الحالي قد يؤدي إلى خسارة أو ربح ضعيف.
        </div>
      )}
    </div>
  );
}

function Input({ label, value, set }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => set(e.target.value)}
        className="w-full mt-1 border rounded-lg p-2"
      />
    </div>
  );
}
