// ============================================================================
// Core4.AI – MerchantLayout (FINAL RELEASE + DEMAND SIGNALS)
// CLEAN NAVIGATION — DEMAND-FIRST MERCHANT UX
// ============================================================================

import React from "react";
import { Outlet, NavLink } from "react-router-dom";

import {
  Squares2X2Icon,
  CubeIcon,
  TagIcon,
  SparklesIcon,
  MegaphoneIcon,
  BanknotesIcon,
  ChartBarIcon,
  TicketIcon,
  ChartPieIcon,
  SignalIcon,
} from "@heroicons/react/24/outline";

export default function MerchantLayout() {
  const menu = [
    {
      icon: Squares2X2Icon,
      label: "لوحة التحكم",
      to: "/merchant/dashboard",
    },

    // NEW: Demand Signals (Buyer RND)
    {
      icon: SignalIcon,
      label: "إشارات الطلب",
      to: "/merchant/demand-signals",
    },

    {
      icon: CubeIcon,
      label: "المنتجات",
      to: "/merchant/products",
    },
    {
      icon: TagIcon,
      label: "التسعير",
      to: "/merchant/pricing",
    },
    {
      icon: SparklesIcon,
      label: "الاستديو الإبداعي",
      to: "/merchant/creative",
    },
    {
      icon: MegaphoneIcon,
      label: "الحملات",
      to: "/merchant/campaigns",
    },
    {
      icon: TicketIcon,
      label: "العروض والخصومات",
      to: "/merchant/offers",
    },

    // MIT Market Analysis
    {
      icon: ChartPieIcon,
      label: "تحليل السوق (MIT)",
      to: "/merchant/market-insights",
    },

    {
      icon: BanknotesIcon,
      label: "الأرباح",
      to: "/merchant/earnings",
    },
    {
      icon: ChartBarIcon,
      label: "التحليلات",
      to: "/merchant/analytics",
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100" dir="rtl">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-l shadow-sm p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-green-600 mb-6 text-right">
          مركز التاجر
        </h2>

        <nav className="space-y-2 flex-1">
          {menu.map((item, i) => (
            <NavLink
              key={i}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition flex-row-reverse ${
                  isActive
                    ? "bg-green-600 text-white shadow"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="text-xs text-gray-400 text-center mt-10">
          Core4.AI • Merchant Suite
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-8 bg-white border-l">
        <Outlet />
      </main>
    </div>
  );
}
