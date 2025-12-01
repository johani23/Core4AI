// ============================================================================
// ðŸ’š Core4.AI â€“ AnalyticsCenter.jsx (v6 â€œMerchant Analytics Suiteâ€)
// ----------------------------------------------------------------------------
// â€¢ Traffic overview
// â€¢ Conversion metrics
// â€¢ Revenue summaries
// â€¢ Top-performing products
// ============================================================================

import React, { useEffect, useState } from "react";
import {
  ChartBarIcon,
  CursorArrowRippleIcon,
  ShoppingCartIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

export default function AnalyticsCenter() {
  const [traffic, setTraffic] = useState([]);
  const [sales, setSales] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    // Mock traffic
    setTraffic([
      { label: "Monday", value: 1800 },
      { label: "Tuesday", value: 2100 },
      { label: "Wednesday", value: 2600 },
      { label: "Thursday", value: 2900 },
      { label: "Friday", value: 4300 },
      { label: "Saturday", value: 5100 },
      { label: "Sunday", value: 3200 },
    ]);

    // Mock sales
    setSales([
      { label: "Orders", value: 410 },
      { label: "Conversions", value: 125 },
      { label: "Abandoned Carts", value: 89 },
      { label: "Refunds", value: 12 },
    ]);

    // Mock top products
    setTopProducts([
      { name: "Smart Watch X", sales: 240 },
      { name: "Premium Backpack", sales: 180 },
      { name: "Wireless Earbuds", sales: 150 },
    ]);
  }, []);

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Center</h1>
        <p className="text-gray-500 mt-1">
          Traffic, performance, and behavior analytics â€” all in one place.
        </p>
      </div>

      {/* TRAFFIC BLOCK */}
      <div className="bg-white shadow p-6 rounded-xl space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <EyeIcon className="w-6 h-6 text-blue-600" />
          Weekly Traffic Overview
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4 text-center">
          {traffic.map((t, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-4 rounded-lg border space-y-1"
            >
              <p className="text-xs text-gray-500">{t.label}</p>
              <p className="text-xl font-bold text-blue-700">{t.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CONVERSION BLOCK */}
      <div className="bg-white shadow p-6 rounded-xl space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <CursorArrowRippleIcon className="w-6 h-6 text-purple-600" />
          Conversion Metrics
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {sales.map((s, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-4 rounded-lg border space-y-1"
            >
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className="text-xl font-bold text-purple-700">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TOP PRODUCTS BLOCK */}
      <div className="bg-white shadow p-6 rounded-xl space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <ShoppingCartIcon className="w-6 h-6 text-green-600" />
          Top Performing Products
        </h2>

        <div className="space-y-2">
          {topProducts.map((p, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-4 rounded-lg border flex justify-between items-center"
            >
              <p className="text-gray-700 font-semibold">{p.name}</p>
              <p className="text-green-700 font-bold">{p.sales} sales</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
