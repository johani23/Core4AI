// ============================================================================
// 📈 Core4.AI – MerchantBuyerInsights (Demo Panel)
// Visualizing Buyer Events from EventBus (Mocked)
// ============================================================================

import React from "react";
import CorePanel from "@/components/ui/CorePanel";

export default function MerchantBuyerInsights() {
  // Mocked analytics – later will come from backend
  const data = {
    mostViewedProducts: [
      { name: "Smart Kettle X1", views: 120 },
      { name: "Wireless Earbuds Pro", views: 95 },
    ],
    featureReviews: [
      { feature: "عزل الضوضاء", avgMatch: 4.2, count: 37 },
      { feature: "تسخين سريع", avgMatch: 3.8, count: 21 },
    ],
    funnel: {
      views: 500,
      quickviews: 230,
      addToCart: 150,
      purchases: 75,
    },
  };

  const funnelConversion = {
    viewToQuick: ((data.funnel.quickviews / data.funnel.views) * 100).toFixed(1),
    quickToCart: ((data.funnel.addToCart / data.funnel.quickviews) * 100).toFixed(1),
    cartToPurchase: ((data.funnel.purchases / data.funnel.addToCart) * 100).toFixed(1),
  };

  return (
    <div className="min-h-screen bg-[#05070A] text-white p-8" dir="rtl">

      <h1 className="text-3xl font-bold text-emerald-400 mb-6">
        Buyer Insights Dashboard 📈
      </h1>

      {/* FUNNEL PANEL */}
      <CorePanel className="mb-8">
        <h2 className="text-xl font-bold text-purple-300 mb-3">
          مسار التفاعل (Funnel)
        </h2>
        <p className="text-gray-300 text-sm mb-2">
          المشاهدات: {data.funnel.views}
        </p>
        <p className="text-gray-300 text-sm mb-2">
          Quick Views: {data.funnel.quickviews} ({funnelConversion.viewToQuick}% من المشاهدات)
        </p>
        <p className="text-gray-300 text-sm mb-2">
          Add to Cart: {data.funnel.addToCart} ({funnelConversion.quickToCart}% من الـ QuickView)
        </p>
        <p className="text-gray-300 text-sm mb-1">
          Purchases: {data.funnel.purchases} ({funnelConversion.cartToPurchase}% من السلة)
        </p>
      </CorePanel>

      {/* MOST VIEWED PRODUCTS */}
      <CorePanel className="mb-8">
        <h2 className="text-xl font-bold text-purple-300 mb-3">
          أكثر المنتجات مشاهدة 👁
        </h2>
        <ul className="space-y-2 text-sm">
          {data.mostViewedProducts.map((p, i) => (
            <li key={i} className="flex justify-between">
              <span>{p.name}</span>
              <span className="text-gray-300">{p.views} مشاهدة</span>
            </li>
          ))}
        </ul>
      </CorePanel>

      {/* FEATURE REVIEWS */}
      <CorePanel>
        <h2 className="text-xl font-bold text-purple-300 mb-3">
          أداء الميزات المروّجة 🔍
        </h2>
        <ul className="space-y-2 text-sm">
          {data.featureReviews.map((f, i) => (
            <li key={i} className="flex justify-between">
              <span>{f.feature}</span>
              <span className="text-gray-300">
                متوسط تطابق: {f.avgMatch}/5 — ({f.count} تقييم)
              </span>
            </li>
          ))}
        </ul>
      </CorePanel>
    </div>
  );
}
