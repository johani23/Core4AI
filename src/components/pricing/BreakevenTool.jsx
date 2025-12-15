import React, { useState } from "react";
import { calcBreakeven } from "../../api/pricing";

export default function BreakevenTool() {
  const [profit, setProfit] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [cost, setCost] = useState("");
  const [result, setResult] = useState(null);

  const calculate = async () => {
    const payload = {
      profit_current: parseFloat(profit),
      new_price: parseFloat(newPrice),
      variable_cost: parseFloat(cost)
    };

    const res = await calcBreakeven(payload);
    setResult(res.data.breakeven_units);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow border">
      <h2 className="text-xl font-bold text-green-700 mb-4">Breakeven Calculator</h2>

      <input
        className="border p-2 rounded w-full mb-3"
        placeholder="Current Profit"
        type="number"
        value={profit}
        onChange={(e) => setProfit(e.target.value)}
      />
      <input
        className="border p-2 rounded w-full mb-3"
        placeholder="New Price"
        type="number"
        value={newPrice}
        onChange={(e) => setNewPrice(e.target.value)}
      />
      <input
        className="border p-2 rounded w-full mb-4"
        placeholder="Variable Cost"
        type="number"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
      />

      <button
        onClick={calculate}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Calculate
      </button>

      {result !== null && (
        <div className="mt-5 p-4 bg-green-50 border rounded">
          <p><b>Breakeven Units:</b> {result}</p>
        </div>
      )}
    </div>
  );
}

