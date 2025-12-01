// ============================================================================
// ðŸ’š DemandCurve.jsx â€” MIT Phase 2 (Monadic Price Testing UI)
// ============================================================================
// Works with:
//   POST /api/pricing/monadic/start
//   POST /api/pricing/monadic/submit
//   GET  /api/pricing/monadic/curve/{productId}
// ============================================================================

import React, { useEffect, useState } from "react";

export default function DemandCurve({ productId }) {
  const [curve, setCurve] = useState(null);
  const [loading, setLoading] = useState(false);
  const [testPrices, setTestPrices] = useState("");
  const [votePrice, setVotePrice] = useState("");
  const [vote, setVote] = useState(1);

  // Load curve on open
  useEffect(() => {
    if (productId) loadCurve();
  }, [productId]);

  const loadCurve = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/pricing/monadic/curve/${productId}`);
      const json = await res.json();
      if (!json.error) setCurve(json);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // Start Test
  const startTest = async () => {
    const list = testPrices
      .split(",")
      .map((x) => parseFloat(x.trim()))
      .filter((x) => !isNaN(x));

    if (!list.length) return alert("â— Add at least one price.");

    const res = await fetch(`/api/pricing/monadic/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: productId,
        test_prices: list,
      }),
    });

    await res.json();
    await loadCurve();
  };

  // Submit Vote
  const submitVote = async () => {
    if (!votePrice) return alert("Choose a test price");

    await fetch(`/api/pricing/monadic/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: productId,
        price: Number(votePrice),
        vote: Number(vote),
      }),
    });

    await loadCurve();
  };

  if (loading)
    return (
      <div className="text-center text-gray-300 p-10">
        â³ Loading demand curve...
      </div>
    );

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl">

      <h2 className="text-2xl font-bold mb-6 text-green-400">
        MIT Demand Curve (Monadic Testing)
      </h2>


      {/* ======================== START TEST ======================== */}
      <div className="mb-8 p-4 bg-gray-800 rounded-xl border border-gray-700">
        <h3 className="font-semibold mb-2">Start Price Test</h3>

        <p className="text-sm text-gray-400 mb-2">
          Add prices separated by commas. Example: <br />
          <span className="text-gray-300">49, 59, 69</span>
        </p>

        <input
          type="text"
          value={testPrices}
          onChange={(e) => setTestPrices(e.target.value)}
          placeholder="45, 55, 65"
          className="w-full p-2 bg-gray-700 rounded mb-3"
        />

        <button
          onClick={startTest}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
        >
          Start Test
        </button>
      </div>


      {/* ======================== SUBMIT VOTE ======================== */}
      {curve?.curve && curve.curve.length > 0 && (
        <div className="mb-8 p-4 bg-gray-800 rounded-xl border border-gray-700">
          <h3 className="font-semibold mb-3">Submit Vote (Buy / No Buy)</h3>

          <select
            className="w-full p-2 bg-gray-700 rounded mb-3"
            value={votePrice}
            onChange={(e) => setVotePrice(e.target.value)}
          >
            <option value="">Choose priceâ€¦</option>
            {curve.curve.map((c, i) => (
              <option key={i} value={c.price}>
                {c.price} SAR
              </option>
            ))}
          </select>

          <select
            className="w-full p-2 bg-gray-700 rounded mb-3"
            value={vote}
            onChange={(e) => setVote(Number(e.target.value))}
          >
            <option value={1}>Buy (Yes)</option>
            <option value={0}>No Buy</option>
          </select>

          <button
            onClick={submitVote}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Submit Vote
          </button>
        </div>
      )}


      {/* ======================== DEMAND CURVE TABLE ======================== */}
      <div className="mb-8 p-4 bg-gray-800 rounded-xl border border-gray-700">
        <h3 className="font-semibold mb-3">Demand Curve Results</h3>

        {!curve?.curve || curve.curve.length === 0 ? (
          <p className="text-gray-400">No tests yet.</p>
        ) : (
          <table className="w-full text-left text-sm bg-gray-800 rounded-lg">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-2">Price</th>
                <th className="p-2">Buy Rate</th>
              </tr>
            </thead>
            <tbody>
              {curve.curve.map((p, i) => (
                <tr key={i} className="border-b border-gray-700">
                  <td className="p-2">{p.price} SAR</td>
                  <td className="p-2 text-green-400">{p.buy_rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>


      {/* ======================== SLOPE ======================== */}
      {curve?.slope !== undefined && (
        <div className="mb-6 p-4 bg-gray-800 rounded-xl">
          <h3 className="font-semibold mb-2">Demand Slope</h3>
          <p className="text-xl text-blue-300">{curve.slope}</p>
        </div>
      )}


      {/* ======================== OPTIMAL ZONE ======================== */}
      {curve?.optimal_price_zone && (
        <div className="mb-6 p-4 bg-gray-800 rounded-xl">
          <h3 className="font-semibold mb-2">Optimal Price Zone</h3>
          <p className="text-xl text-purple-300">
            {curve.optimal_price_zone.join(" â†’ ")} SAR
          </p>
        </div>
      )}

    </div>
  );
}
