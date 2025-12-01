// ============================================================================
// 💚 Core4.AI – PurchasesList.jsx (Amazon-Style v2 – Final Clean Version)
// ============================================================================

import React from "react";
import BuyerLayout from "../../buyer/BuyerLayout";
import { useNavigate } from "react-router-dom";
import PurchasesStatusBadge from "../../buyer/PurchasesStatusBadge";

export default function PurchasesList() {
  const navigate = useNavigate();

  // Mock data (replace with backend later)
  const items = [
    {
      id: 1,
      name: "Smart Kettle X1",
      status: "Delivered",
      date: "2025-11-20",
      img: "https://i.imgur.com/IOhNf5b.png",
    },
    {
      id: 2,
      name: "Wireless Earbuds Pro",
      status: "In Transit",
      date: "2025-11-28",
      img: "https://i.imgur.com/gP2Yx88.png",
    },
    {
      id: 3,
      name: "Air Purifier Max",
      status: "Preparing",
      date: "2025-11-30",
      img: "https://i.imgur.com/Z7xV6Q5.png",
    },
  ];

  return (
    <BuyerLayout
      title="My Purchases"
      subtitle="سجل جميع مشترياتك مع حالة التسليم – شبيه Amazon."
    >
      <div className="space-y-5">

        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/buyer/purchases/${item.id}`)}
            className="flex gap-4 items-center border border-slate-800 bg-slate-900/70 hover:bg-slate-900 transition-colors 
                       rounded-2xl p-4 cursor-pointer"
          >
            {/* Product Image */}
            <img
              src={item.img}
              alt={item.name}
              className="w-20 h-20 rounded-xl object-cover border border-slate-700"
            />

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-slate-100 font-semibold text-base md:text-lg">
                {item.name}
              </h3>

              <div className="mt-1">
                <PurchasesStatusBadge status={item.status} />
              </div>

              <p className="text-slate-500 text-xs mt-1">
                Order date: {item.date}
              </p>
            </div>

            {/* Arrow */}
            <div className="text-slate-500 text-lg pr-2">›</div>
          </div>
        ))}

      </div>
    </BuyerLayout>
  );
}
