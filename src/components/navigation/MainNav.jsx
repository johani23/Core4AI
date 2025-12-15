// ============================================================================
// 🇸🇦 MainNav — Stable Original Version
// ============================================================================

import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Activity,
  Sparkles,
  ShoppingBag,
  Store,
  Users
} from "lucide-react";

const navItems = [
  { to: "/", label: "الرئيسية", icon: <Home size={25} /> },
  { to: "/pulse", label: "النبض", icon: <Activity size={25} /> },
  { to: "/creator", label: "المبدع", icon: <Sparkles size={25} /> },
  { to: "/buyer/feed", label: "المشتري", icon: <ShoppingBag size={25} /> },
  { to: "/merchant/dashboard", label: "التاجر", icon: <Store size={25} /> },
  { to: "/tribe", label: "القبائل", icon: <Users size={25} /> },
];

export default function MainNav() {
  return (
    <nav
      className="
        fixed bottom-0 left-0 w-full z-40
        bg-[#111111] border-t border-white/10
        h-20 flex justify-around items-center
        backdrop-blur-lg
      "
    >
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `
              flex flex-col items-center gap-1 
              w-full py-2 
              transition-all duration-300

              ${
                isActive
                  ? "text-purple-400 scale-105 font-bold"
                  : "text-gray-400 hover:text-white"
              }
            `
          }
        >
          {item.icon}
          <span className="text-xs tracking-wide">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
