// ============================================================================
// ðŸ’š PricingCharts.jsx (v1.0 BETA)
// ----------------------------------------------------------------------------
// â€¢ Demand Curve  (Price vs Quantity)
// â€¢ Revenue Curve (Price vs Revenue)
// ============================================================================

import React from "react";
import {
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function PricingCharts({ points }) {
  if (!points || points.length === 0) {
    return (
      <div className="text-gray-500 text-center py-6">
        Ù„Ø§ ØªÙˆØ¬Ø¯ Ø¨ÙŠØ§Ù†Ø§Øª ÙƒØ§ÙÙŠØ© Ù„Ø¥Ù†Ø´Ø§Ø¡ Ø§Ù„Ø±Ø³Ù… Ø§Ù„Ø¨ÙŠØ§Ù†ÙŠ
      </div>
    );
  }

  const demandData = points.map((p) => ({
    price: Math.round(p.price),
    demand: Math.round(p.demand),
  }));

  const revenueData = points.map((p) => ({
    price: Math.round(p.price),
    revenue: Math.round(p.price * p.demand),
  }));

  return (
    <div className="space-y-10">

      {/* DEMAND CURVE */}
      <div className="bg-white border rounded-2xl p-6 shadow">
        <h3 className="text-xl font-semibold text-green-700 mb-3">
          ðŸ“‰ Demand Curve â€” Ø·Ù„Ø¨ Ø§Ù„Ø³ÙˆÙ‚ Ø­Ø³Ø¨ Ø§Ù„Ø³Ø¹Ø±
        </h3>

        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={demandData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="price" tickFormatter={(v) => `${v} Ø±.Ø³`} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="demand" stroke="#10b981" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* REVENUE CURVE */}
      <div className="bg-white border rounded-2xl p-6 shadow">
        <h3 className="text-xl font-semibold text-purple-700 mb-3">
          ðŸ’° Revenue Curve â€” Ø§Ù„Ø¥ÙŠØ±Ø§Ø¯Ø§Øª Ø§Ù„Ù…ØªÙˆÙ‚Ø¹Ø©
        </h3>

        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="price" tickFormatter={(v) => `${v} Ø±.Ø³`} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
