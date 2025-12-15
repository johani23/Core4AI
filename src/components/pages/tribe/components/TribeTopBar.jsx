// ============================================================================
// 💚 Core4.AI – TribeTopBar PRO v2 (2025 Updated Edition)
// ----------------------------------------------------------------------------
// Appears only on Tribe pages
// Provides quick navigation between all tribe modules
// Added Profile + Challenges + better ordering
// ============================================================================

import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function TribeTopBar() {
  const location = useLocation();

  // Only show on tribe-related routes
  if (!location.pathname.startsWith("/tribe")) return null;

  const links = [
    { path: "/tribe", label: "الرئيسية", icon: "🔥" },
    { path: "/tribe/profile", label: "ملف القبيلة", icon: "🏅" },
    { path: "/tribe/challenges", label: "التحديات", icon: "🎯" },
    { path: "/tribe/dashboard", label: "لوحة التحكم", icon: "📊" },
    { path: "/tribe/exchange", label: "السوق", icon: "💱" },
    { path: "/tribe/leaderboard", label: "القبائل", icon: "👥" },
    { path: "/tribe/stats", label: "التحليلات", icon: "📈" },
    { path: "/tribe/lens", label: "عدسة القبيلة", icon: "🔍" },
  ];

  return (
    <div
      className="
        mt-4 mb-6
        flex gap-4 justify-center
        p-3
        rounded-xl
        bg-white/10 border border-white/10
        backdrop-blur-xl
        shadow-lg
      "
      dir="rtl"
    >
      {links.map((l) => (
        <NavLink
          key={l.path}
          to={l.path}
          className={({ isActive }) =>
            `
            flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold transition
            ${
              isActive
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/40 scale-[1.05]"
                : "text-gray-300 hover:bg-white/10 hover:text-white"
            }
            `
          }
        >
          <span>{l.icon}</span> {l.label}
        </NavLink>
      ))}
    </div>
  );
}
