// ============================================================================
// 💚 Core4.AI – Merchant.jsx (Arabic RTL Clean Edition)
// ============================================================================
// - إزالة الشريط الأخضر المكسّر
// - ترويسة عربية واضحة
// - RTL
// - نفس الـ Tab Navigation
// ============================================================================

import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Merchant() {
  const tabs = [
    { path: "/merchant/dashboard", label: "لوحة التحكم" },
    { path: "/merchant/products", label: "المنتجات" },
    { path: "/merchant/pricing", label: "ذكاء التسعير" },
    { path: "/merchant/creative", label: "الاستديو الإبداعي" },
    { path: "/merchant/campaigns", label: "الحملات" },
    { path: "/merchant/earnings", label: "الأرباح" },
    { path: "/merchant/analytics", label: "التحليلات" },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-6" dir="rtl">

      {/* HEADER FIXED */}
      <h1 className="text-3xl font-bold text-green-500 mb-4 text-right">
        مركز التاجر — Core4.AI
      </h1>

      {/* TABS */}
      <div className="flex flex-row-reverse space-x-4 space-x-reverse border-b border-gray-700 pb-3">
        {tabs.map((t) => (
          <NavLink
            key={t.path}
            to={t.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-md font-semibold transition ${
                isActive
                  ? "bg-green-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700"
              }`
            }
          >
            {t.label}
          </NavLink>
        ))}
      </div>

      {/* CONTENT */}
      <div className="pt-6">
        <Outlet />
      </div>
    </div>
  );
}
