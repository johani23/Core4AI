// ============================================================================
// 💚 Core4.AI – OrderDetails.jsx (Amazon-Style Tracking v2 – Final Clean Version)
// ============================================================================

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import BuyerLayout from "../../buyer/BuyerLayout";
import PurchasesStatusBadge from "../../buyer/PurchasesStatusBadge";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock order (replace with backend later)
  const order = {
    id,
    name: "Smart Kettle X1",
    img: "https://i.imgur.com/IOhNf5b.png",
    seller: "Core4 Marketplace Seller",
    price: "249 SAR",
    status: "Delivered",
    placedOn: "2025-11-18",
    deliveredOn: "2025-11-20",
    tracking: [
      { step: "Order Placed", date: "2025-11-18" },
      { step: "Processing", date: "2025-11-19" },
      { step: "Shipped", date: "2025-11-19" },
      { step: "Out for Delivery", date: "2025-11-20" },
      { step: "Delivered", date: "2025-11-20" },
    ],
  };

  return (
    <BuyerLayout title={order.name} subtitle="تفاصيل الطلب بالكامل">

      {/* Header Card */}
      <div className="border border-slate-800 bg-slate-900/70 rounded-2xl p-5 flex gap-5 items-start mb-6">
        <img
          src={order.img}
          alt={order.name}
          className="w-28 h-28 rounded-xl border border-slate-700 object-cover"
        />

        <div className="flex-1">
          <h2 className="text-slate-100 text-xl font-semibold">{order.name}</h2>

          <div className="mt-1">
            <PurchasesStatusBadge status={order.status} />
          </div>

          <p className="text-slate-400 text-sm mt-2">
            Sold by: <span className="text-slate-300">{order.seller}</span>
          </p>

          <p className="text-emerald-400 text-sm font-semibold mt-1">
            Price: {order.price}
          </p>
        </div>
      </div>

      {/* Tracking Section */}
      <div className="border border-slate-800 bg-slate-900/70 rounded-2xl p-5 mb-6">
        <h3 className="text-slate-100 font-semibold text-lg mb-3">
          Tracking Timeline
        </h3>

        <ul className="space-y-2">
          {order.tracking.map((t, idx) => (
            <li key={idx} className="text-slate-300 text-sm">
              • <span className="font-medium">{t.step}</span>{" "}
              <span className="text-slate-500">— {t.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-xl text-sm font-semibold"
          onClick={() => navigate(`/buyer/activity`)}
        >
          Write Review
        </button>

        <button className="px-4 py-2 bg-purple-500 hover:bg-purple-400 text-white rounded-xl text-sm font-semibold">
          Track Package
        </button>

        <button
          className="px-4 py-2 bg-rose-500 hover:bg-rose-400 text-white rounded-xl text-sm font-semibold"
          onClick={() => navigate(`/buyer/claims`)}
        >
          Raise Claim
        </button>

        <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold">
          Reorder
        </button>
      </div>

    </BuyerLayout>
  );
}
