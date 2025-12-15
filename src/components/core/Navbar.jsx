// ============================================================================
// 🌙 Core4.AI – Navbar v5 (2025 Edition – Tribe Integrated + Notifications)
// - Proper RTL Tabs
// - Tribe Tab + Notification Badge
// - Smooth Active states
// ============================================================================

import React from "react";
import { NavLink } from "react-router-dom";
import { useCoreSync } from "@/context/CoreSyncContext";
import { useTribe } from "@/context/TribeContext";

export default function Navbar() {
  const { role, setRole } = useCoreSync();
  const { unread } = useTribe(); // <-- Tribe Notifications

  const roles = [
    { value: "buyer", label: "المشتري 🛒" },
    { value: "creator", label: "المؤثر 🎥" },
    { value: "merchant", label: "التاجر 🛍️" },
    { value: "tribeLeader", label: "رئيس القبيلة 👑" },
    { value: "council", label: "المجلس 🧠" },
    { value: "admin", label: "المدير ⚙️" },
  ];

  // -------------------------------------------------------------------------
  // PUBLIC NAV TABS
  // -------------------------------------------------------------------------

  const tabs = [
    { path: "/", label: "الرئيسية", icon: "🏠" },
    { path: "/feed", label: "الخلاصات", icon: "🎥" },
    { path: "/grow", label: "النمو", icon: "🚀" },
    { path: "/creator", label: "المنشئ", icon: "🎬" },
    { path: "/buyer/home", label: "المشتري", icon: "🛒" },
    { path: "/merchant", label: "التاجر", icon: "🏪" },
    { path: "/audience/dashboard", label: "الجمهور", icon: "🎧" },

    // ⭐ NEW — My Tribe
    { path: "/tribe", label: "قبيلتي 🔥", icon: "🔥" },

    // Existing Tribe data pages
    { path: "/tribe/leaderboard", label: "القبائل", icon: "👥" },

    { path: "/influence", label: "التأثير", icon: "⚡" },
    { path: "/wallet", label: "المحفظة", icon: "💰" },
    { path: "/pulse", label: "النبض", icon: "🌐" },
    { path: "/role", label: "الدور", icon: "🎭" },
  ];

  // -------------------------------------------------------------------------
  // NAVBAR UI
  // -------------------------------------------------------------------------

  return (
    <nav
      className="
        w-full bg-[#0A0F12]/80 
        backdrop-blur-xl 
        border-b border-white/10 
        px-6 py-4 
        flex items-center justify-between
        sticky top-0 z-50
      "
      dir="rtl"
    >
      {/* LOGO */}
      <div className="text-2xl font-extrabold text-purple-400 tracking-wide">
        Core4<span className="text-white">.AI</span>
      </div>

      {/* NAV TABS */}
      <div className="flex gap-5 items-center">
        {tabs.map((t) => (
          <NavLink
            key={t.path}
            to={t.path}
            className={({ isActive }) =>
              `
              relative
              px-3 py-2 rounded-xl text-sm font-medium transition 
              flex items-center gap-1
              ${
                isActive
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/40 scale-[1.03]"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }
              `
            }
          >
            <span className="text-lg">{t.icon}</span>
            <span>{t.label}</span>

            {/* ⭐ NOTIFICATION BADGE FOR MY TRIBE */}
            {t.path === "/tribe" && unread && (
              <span
                className="
                  absolute -top-1 -left-1 
                  w-3 h-3 rounded-full 
                  bg-purple-500 animate-pulse
                  shadow-md shadow-purple-400/50
                "
              ></span>
            )}
          </NavLink>
        ))}
      </div>

      {/* ROLE SWITCHER */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="
          px-3 py-2 rounded-lg 
          bg-[#11161A] text-gray-200 border border-white/10
          focus:ring-2 focus:ring-purple-500
        "
      >
        {roles.map((r) => (
          <option
            key={r.value}
            value={r.value}
            className="bg-[#0A0F12] text-white"
          >
            {r.label}
          </option>
        ))}
      </select>
    </nav>
  );
}
