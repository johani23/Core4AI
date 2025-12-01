// ============================================================
// ðŸ’š Core4.AI â€“ MerchantSimulator.jsx (v1.0 â€œLive Intelligence Layerâ€)
// ------------------------------------------------------------
// ðŸ”¥ Real-time: D-Index + Tribe Shifts + Hot Products + Conversion Pulse
// ðŸ”¥ Pulls data through WebSocket (CoreSyncContext)
// ðŸ”¥ Runs its own micro-simulation for merchant products
// ============================================================

import React, { useEffect, useState } from "react";
import { useCoreSync } from "@context/CoreSyncContext";
import axios from "axios";
import { FiZap, FiActivity, FiTrendingUp, FiUsers } from "react-icons/fi";

export default function MerchantSimulator({ merchantId = "merchant-beta" }) {
  const { council } = useCoreSync(); // WS Live Data
  const [products, setProducts] = useState([]);
  const [pulse, setPulse] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await axios.get(`/merchant/${merchantId}/products`);
      setProducts(res.data);
    } catch (err) {
      console.log("Simulator Load Error", err);
    }
  };

  // ------------------------------------------------------------
  // ðŸ”¥ Micro Simulation Engine â€“ runs every 10 sec
  // ------------------------------------------------------------
  useEffect(() => {
    const timer = setInterval(() => {
      if (products.length === 0) return;

      const hotProduct =
        products[Math.floor(Math.random() * products.length)];

      const tribes = council?.tribes || [];
      const sorted = [...tribes].sort((a, b) => b.dopamine - a.dopamine);
      const bestTribe = sorted[0]?.name || "â€”";

      const conversionPulse = (Math.random() * 3 + 1).toFixed(1); // 1â€“4%

      setPulse({
        hotProduct: hotProduct?.name || "â€”",
        bestTribe,
        conversionPulse,
        dindex: council?.dindex || 50,
      });
    }, 10000);

    return () => clearInterval(timer);
  }, [products, council]);

  if (!pulse)
    return (
      <div className="text-gray-400 text-sm mt-8">
        Initializing real-time engineâ€¦
      </div>
    );

  return (
    <div className="mt-10 p-6 bg-green-50 border border-green-200 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-[#006C35] mb-4">
        ðŸ”¥ Real-Time Performance Simulation
      </h2>

      <div className="grid md:grid-cols-4 gap-6">

        {/* D-Index Live */}
        <div className="p-4 bg-white rounded-lg border border-green-100 shadow-sm">
          <FiZap className="text-green-600" size={24} />
          <p className="mt-2 text-gray-600 text-sm">D-Index</p>
          <p className="text-2xl font-bold text-green-700">
            {pulse.dindex.toFixed(1)}
          </p>
        </div>

        {/* Best Tribe */}
        <div className="p-4 bg-white rounded-lg border border-green-100 shadow-sm">
          <FiUsers className="text-purple-600" size={24} />
          <p className="mt-2 text-gray-600 text-sm">Best Tribe Right Now</p>
          <p className="text-lg font-bold text-gray-800">
            {pulse.bestTribe}
          </p>
        </div>

        {/* Hot Product */}
        <div className="p-4 bg-white rounded-lg border border-green-100 shadow-sm">
          <FiActivity className="text-red-600" size={24} />
          <p className="mt-2 text-gray-600 text-sm">Hot Product</p>
          <p className="text-lg font-semibold text-gray-900">
            {pulse.hotProduct}
          </p>
        </div>

        {/* Conversion Pulse */}
        <div className="p-4 bg-white rounded-lg border border-green-100 shadow-sm">
          <FiTrendingUp className="text-blue-700" size={24} />
          <p className="mt-2 text-gray-600 text-sm">Live Conversion Pulse</p>
          <p className="text-2xl font-bold text-blue-700">
            {pulse.conversionPulse}%
          </p>
        </div>

      </div>

    </div>
  );
}
