import React, { useState } from "react";
import { calcEVC } from "../../api/pricing";

export default function EvcTool() {
  const [referencePrice, setReferencePrice] = useState("");
  const [diffValues, setDiffValues] = useState([""]);
  const [result, setResult] = useState(null);

  const handleAdd = () => {
    setDiffValues([...diffValues, ""]);
  };

  const handleChange = (value, index) => {
    const updated = [...diffValues];
    updated[index] = value;
    setDiffValues(updated);
  };

  const calculate = async () => {
    const payload = {
      reference_price: parseFloat(referencePrice),
      differentiation_values: diffValues.map((v) => parseFloat(v)),
    };

    const res = await calcEVC(payload);
    setResult(res.data);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow border">
      <h2 className="text-xl font-bold text-green-700 mb-4">EVC Calculator</h2>

      <div className="mb-4">
        <label className="font-semibold">Reference Price:</label>
        <input
          className="border p-2 rounded w-full mt-1"
          value={referencePrice}
          onChange={(e) => setReferencePrice(e.target.value)}
          type="number"
        />
      </div>

      <div className="mb-4">
        <label className="font-semibold">Differentiation Values:</label>
        {diffValues.map((v, i) => (
          <input
            key={i}
            className="border p-2 rounded w-full mt-1"
            value={v}
            type="number"
            onChange={(e) => handleChange(e.target.value, i)}
          />
        ))}
        <button
          className="mt-2 bg-gray-200 px-3 py-1 rounded"
          onClick={handleAdd}
        >
          + Add Value
        </button>
      </div>

      <button
        onClick={calculate}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Calculate
      </button>

      {result && (
        <div className="mt-5 p-4 bg-green-50 border rounded">
          <p><b>EVC:</b> {result.evc}</p>
          <p><b>Recommended Price:</b> {result.recommended_price}</p>
          <p><b>Penetration Price:</b> {result.penetration_price}</p>
        </div>
      )}
    </div>
  );
}

