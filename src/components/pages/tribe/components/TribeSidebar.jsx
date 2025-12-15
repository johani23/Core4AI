// ============================================================================
// 💚 Core4.AI – TribeSidebar FINAL 2025 (Stable + Fully Synced)
// - Supports Honor Member
// - Supports Challenge Feed / Creator / Ranking
// - Supports Tribe Products
// - Supports Recruitment Badge (based on lifecycle stage)
// ============================================================================

import React from "react";
import { NavLink } from "react-router-dom";
import { useTribe } from "@/context/TribeContext";

export default function TribeSidebar({ theme }) {
  const {
    honorMember,
    members,
    lifecycleStage,
    selectedTribe,
  } = useTribe();

  // --------------------------------------------
  // Recruitment badge count (based on lifecycle stage)
  // --------------------------------------------
  const recruitCount = members.filter((m) => {
    const xp = m.xp || 0;

    if (xp > 600) return true;     // recruit
    if (xp > 1000) return true;    // motivate
    return false;
  }).length;

  // --------------------------------------------
  // Sidebar Links
  // --------------------------------------------
  const links = [
    { path: "/tribe", label: "الرئيسية", icon: "🔥" },
    { path: "/tribe/dashboard", label: "لوحة التحكم", icon: "📊" },
    { path: "/tribe/leaderboard", label: "لوحة الشرف", icon: "🏆" },
    { path: "/tribe/products", label: "منتجات القبيلة", icon: "🛒" },

    { path: "/tribe/challenges", label: "تحديات القبيلة", icon: "🧩" },
    { path: "/tribe/challenges/create", label: "ابتكار تحدٍ", icon: "✨" },
    { path: "/tribe/challenges/ranking", label: "ترتيب المشاركين", icon: "⭐" },

    {
      path: "/tribe/recruitment",
      label: "المرشحون للتجنيد",
      icon: "🚀",
      badge: recruitCount,
    },

    { path: "/tribe/wars", label: "حرب القبائل", icon: "⚔️" },
    { path: "/tribe/stats", label: "تحليلات القبيلة", icon: "📈" },
    { path: "/tribe/seasons", label: "المواسم", icon: "🌙" },
  ];

  // --------------------------------------------
  // RENDER
  // --------------------------------------------
  return (
    <div
      className="
        w-60 h-full bg-white/10 border border-white/10
        backdrop-blur-xl rounded-3xl p-6 flex flex-col gap-4 shadow-xl
      "
      dir="rtl"
    >
      {/* Header */}
      <h2
        className="text-xl font-bold mb-4"
        style={{ color: theme?.primary || "#c084fc" }}
      >
        ⚡ مركز القبيلة
      </h2>

      {/* Honor Member */}
      {honorMember && (
        <div className="bg-purple-700/20 p-3 rounded-xl text-center border border-purple-400 shadow-md">
          <p className="text-purple-300 text-sm font-bold">🌟 روح القبيلة</p>
          <p className="text-white font-bold mt-1">{honorMember.name}</p>
        </div>
      )}

      {/* Links */}
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `
            flex items-center justify-between px-4 py-3 rounded-xl text-sm 
            font-semibold cursor-pointer transition-all
            ${isActive
              ? "text-white shadow-lg scale-[1.03]"
              : "text-gray-300 hover:bg-white/10 hover:text-white"}
          `
          }
          style={({ isActive }) =>
            isActive
              ? {
                  backgroundColor: theme?.primary || "#9333ea",
                  boxShadow: `0 0 12px ${theme?.glow || "rgba(200,0,255,0.4)"}`,
                }
              : {}
          }
        >
          <span className="flex items-center gap-2">
            {link.label}

            {link.badge > 0 && (
              <span
                className="
                  bg-purple-600 text-white text-xs font-bold 
                  px-2 py-0.5 rounded-full shadow-md
                "
              >
                {link.badge}
              </span>
            )}
          </span>

          <span className="text-lg">{link.icon}</span>
        </NavLink>
      ))}

      {/* Invite Button */}
      <NavLink
        to={`/invite/${selectedTribe?.name || ""}`}
        className="
          flex items-center justify-between 
          px-4 py-3 rounded-xl text-sm font-semibold cursor-pointer
          bg-purple-600 hover:bg-purple-500 text-white shadow-md mt-4
        "
      >
        <span>دعوة عضو</span>
        <span className="text-lg">🔗</span>
      </NavLink>
    </div>
  );
}
