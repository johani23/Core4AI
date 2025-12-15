// ============================================================================
// Core4.AI – MerchantSidebar.jsx (Arabic RTL Premium Edition)
// ============================================================================
// - Arabic UI
// - RTL support
// - Demand-first extension (no design change)
// ============================================================================

import React from "react";
import { NavLink } from "react-router-dom";

import {
  Squares2X2Icon,
  SignalIcon,
  CubeIcon,
  TagIcon,
  SparklesIcon,
  MegaphoneIcon,
  BanknotesIcon,
  BeakerIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export default function MerchantSidebar() {
  const items = [
    {
      label: "لوحة التحكم",
      to: "/merchant/dashboard",
      icon: Squares2X2Icon,
    },

    // NEW: Demand Signals (Buyer RND)
    {
      label: "إشارات الطلب",
      to: "/merchant/demand-signals",
      icon: SignalIcon,
    },

    {
      label: "المنتجات",
      to: "/merchant/products",
      icon: CubeIcon,
    },
    {
      label: "ذكاء التسعير",
      to: "/merchant/pricing",
      icon: TagIcon,
    },
    {
      label: "الاستديو الإبداعي",
      to: "/merchant/creative",
      icon: SparklesIcon,
    },
    {
      label: "الحملات",
      to: "/merchant/campaigns",
      icon: MegaphoneIcon,
    },
    {
      label: "الأرباح",
      to: "/merchant/earnings",
      icon: BanknotesIcon,
    },
    {
      label: "البحث والتطوير",
      to: "/merchant/rnd",
      icon: BeakerIcon,
    },
    {
      label: "التحليلات",
      to: "/merchant/analytics",
      icon: ChartBarIcon,
    },
  ];

  return (
    <aside
      className="w-64 bg-white border-l shadow-sm p-6 space-y-6"
      style={{ direction: "rtl" }}
    >
      <h2 className="text-2xl font-bold text-green-600 mb-4 text-right">
        مركز التاجر
      </h2>

      <nav className="space-y-2">
        {items.map((item, i) => (
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
    </aside>
  );
}
