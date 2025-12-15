import React, { useState } from "react";
import { calcMonadic } from "../../api/pricing";

export default function MonadicTool() {
  const [prices, setPrices] = useState([""]);
  const [buys, setBuys] = useState([""]);
  const [respondents, setRespondents] = useState("");
  const [points, setPoints] = useState([]);

  const addRow = () => {
    setPrices([...prices, ""]);
    setBuys([...buys, ""]);
  };

  const updatePrice = (v, i) => {
    const a = [...prices];
    a[i] = v;
    setPrices(a);
  };

  const updateBuy = (v, i) => {
    const a = [...buys];
    a[i] = v;
    setBuys(a);
  };

  const calculate = async () => {
    const res = await calcMonadic({
      prices: prices.map(p => parseFloat(p)),
      buys: buys.map(b => parseInt(b)),
      total_respondents: parseInt(respondents)
    });

    setPoints(res.data.points);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow border">
      <h2 className="text-xl font-bold text-green-700 mb-4">
        Monadic Demand Curve
      </h2>

      <input
        className="border p-2 rounded w-full mb-4"
        placeholder="Total Respondents"
        value={respondents}
        type="number"
        onChange={(e) => setRespondents(e.target.value)}
      />

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
            placeholder="Buys"
            value={buys[i]}
            type="number"
            onChange={(e) => updateBuy(e.target.value, i)}
          />
        </div>
      ))}

      <button className="bg-gray-200 px-3 py-1 rounded" onClick={addRow}>
        + Add Row
      </button>

      <button
        onClick={calculate}
        className="ml-3 bg-green-600 text-white px-4 py-2 rounded"
      >
        Calculate
      </button>

      {points.length > 0 && (
        <div className="mt-5 p-4 bg-green-50 border rounded">
          <h3 className="font-bold mb-3">Demand Curve</h3>
          {points.map((p, i) => (
            <p key={i}>Price {p.price}: {(p.buy_rate * 100).toFixed(1)}% buy rate</p>
          ))}
        </div>
      )}
    </div>
  );
}

