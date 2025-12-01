import React, { useEffect, useState } from "react";

export default function DemandCurvePanel({ productId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productId) loadDemandCurve();
  }, [productId]);

  const loadDemandCurve = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/pricing/demand-curve/${productId}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      setData({ error: "Failed to load demand curve data" });
    }
    setLoading(false);
  };

  if (loading)
    return (
      <div className="text-center text-gray-300 p-10">
        â³ Loading demand curve...
      </div>
    );

  if (!data) return null;

  const card = "p-5 bg-gray-800/60 rounded-2xl border border-gray-700";

  return (
    <div className="space-y-8">

      {/* Title */}
      <h2 className="text-3xl font-bold text-green-400">
        Demand Curve Analysis
      </h2>

      {/* Summary */}
      <div className={card}>
        <h3 className="font-semibold text-gray-300 mb-2">Key Insight</h3>
        <p className="text-gray-300">{data.summary}</p>
      </div>

      {/* Demand Curve Chart (Custom SVG) */}
      <div className={card}>
        <h3 className="text-gray-300 font-semibold mb-3">
          Demand Curve (Price â†’ Quantity)
        </h3>

        <svg width="100%" height="260">
          {/* Draw curve */}
          {data.points && data.points.length > 1 && (
            <polyline
              fill="none"
              stroke="#00ff88"
              strokeWidth="3"
              points={data.points
                .map((p) => `${p.x},${p.y}`)
                .join(" ")}
            />
          )}

          {/* Draw points */}
          {data.points &&
            data.points.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="5"
                fill="#ffaa00"
              />
            ))}
        </svg>

        <p className="text-gray-400 text-sm mt-2">
          *Higher prices generally reduce the demand (MIT standard).*
        </p>
      </div>

      {/* Curve Zones */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className={card}>
          <h3 className="font-semibold text-gray-300 mb-2">
            Underpricing Zone
          </h3>
          <p className="text-blue-300">{data.zone_low}</p>
        </div>

        <div className={card}>
          <h3 className="font-semibold text-gray-300 mb-2">
            Optimal Zone
          </h3>
          <p className="text-green-300">{data.zone_optimal}</p>
        </div>

        <div className={card}>
          <h3 className="font-semibold text-gray-300 mb-2">
            Overpricing Zone
          </h3>
          <p className="text-red-300">{data.zone_high}</p>
        </div>

      </div>

      {/* Sensitivity */}
      <div className={card}>
        <h3 className="font-semibold text-gray-300 mb-2">
          Market Sensitivity
        </h3>

        <p className="text-purple-300 text-xl font-bold">
          {data.sensitivity_label}
        </p>

        <p className="text-gray-400 mt-2">
          {data.sensitivity_comment}
        </p>
      </div>

    </div>
  );
}
