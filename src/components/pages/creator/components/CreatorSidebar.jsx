// ============================================================================
// 💜 Core4.AI – CreatorSidebar FINAL v4 (2025)
// Polished UI + Rank Display + Unified Styling
// ============================================================================

import React from "react";
import { NavLink } from "react-router-dom";
import { useCreator } from "@/context/CreatorContext";

export default function CreatorSidebar() {
  const { creatorRank } = useCreator();

  const links = [
    { path: "/creator", label: "الرئيسية", icon: "🏠" },
    { path: "/creator/feed", label: "المنشورات", icon: "📝" },
    { path: "/creator/analytics", label: "التحليلات", icon: "📊" },
    { path: "/creator/collabs", label: "فرص التعاون", icon: "🤝" },
    { path: "/creator/earnings", label: "الأرباح", icon: "💰" },
    { path: "/creator/settings", label: "الإعدادات", icon: "⚙️" },
  ];

  return (
    <div
      className="
        w-64 h-screen sticky top-0
        bg-white/10 border border-white/10 backdrop-blur-xl
        rounded-3xl p-6 flex flex-col gap-6 shadow-xl
      "
      dir="rtl"
    >

      {/* Rank Section */}
      <div className="text-center mb-2">
        <p className="text-sm text-purple-200">رتبتك</p>
        <p className="text-2xl font-bold text-yellow-300">{creatorRank}</p>
      </div>

      {/* Nav Links */}
      {links.map((l) => (
        <NavLink
          key={l.path}
          to={l.path}
          className={({ isActive }) =>
            `
              flex items-center justify-between px-4 py-3 rounded-xl
              text-sm font-semibold transition-all
              ${
                isActive
                  ? "bg-purple-600 text-white shadow-lg scale-[1.03]"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }
            `
          }
        >
          <span>{l.label}</span>
          <span>{l.icon}</span>
        </NavLink>
      ))}

      {/* Create Button */}
      <NavLink
        to="/creator/create"
        className="
          mt-auto bg-gradient-to-r from-purple-500 to-pink-500
          px-4 py-3 rounded-xl text-white text-center text-sm font-bold shadow-lg
        "
      >
        ➕ إنشاء منشور
      </NavLink>
    </div>
  );
}
