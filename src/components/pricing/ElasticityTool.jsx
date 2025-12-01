import React, { useState } from "react";
import { calcElasticity } from "../../api/pricing";

export default function ElasticityTool() {
  const [prices, setPrices] = useState([""]);
  const [quantities, setQuantities] = useState([""]);
  const [result, setResult] = useState(null);

  const addRow = () => {
    setPrices([...prices, ""]);
    setQuantities([...quantities, ""]);
  };

  const updatePrice = (value, i) => {
    const arr = [...prices];
    arr[i] = value;
    setPrices(arr);
  };

  const updateQty = (value, i) => {
    const arr = [...quantities];
    arr[i] = value;
    setQuantities(arr);
  };

  const calculate = async () => {
    const payload = {
      prices: prices.map((x) => parseFloat(x)),
      quantities: quantities.map((x) => parseFloat(x)),
    };
    const res = await calcElasticity(payload);
    setResult(res.data.elasticity);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow border">
      <h2 className="text-xl font-bold text-green-700 mb-4">Elasticity Calculator</h2>

      {prices.map((p, i) => (
        <div key={i} className="flex gap-4 mb-3">
          <input
            className="border p-2 rounded w-1/2"
            placeholder="Price"
            value={p}
            type="number"
            onChange={(e) => updatePrice(e.target.value, i)}
          />
          <input
            className="border p-2 rounded w-1/2"
            placeholder="Quantity"
            value={quantities[i]}
            type="number"
            onChange={(e) => updateQty(e.target.value, i)}
          />
        </div>
      ))}

      <button
        className="bg-gray-200 px-3 py-1 rounded"
        onClick={addRow}
      >
        + Add Data Row
      </button>

      <button
        onClick={calculate}
        className="ml-3 bg-green-600 text-white px-4 py-2 rounded"
      >
        Calculate
      </button>

      {result !== null && (
        <div className="mt-5 p-4 bg-green-50 border rounded">
          <p><b>Elasticity:</b> {result}</p>
        </div>
      )}
    </div>
  );
}
