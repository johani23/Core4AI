import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Merchant() {
  const tabs = [
    { path: "/merchant/product", label: "Products" },
    { path: "/merchant/pricing", label: "Pricing Intelligence" },
    { path: "/merchant/creative", label: "Creative Studio" },
    { path: "/merchant/campaign", label: "Campaign Builder" },
    { path: "/merchant/rnd", label: "R&D Panel" },
    { path: "/merchant/simulation", label: "Simulation Hub" },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-6">
      <h1 className="text-3xl font-bold text-green-500 mb-4">ðŸ›’ Merchant Hub</h1>

      <div className="flex space-x-4 border-b border-gray-700 pb-3">
        {tabs.map((t) => (
          <NavLink
            key={t.path}
            to={t.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-md ${
                isActive ? "bg-green-600" : "bg-gray-800 hover:bg-gray-700"
              }`
            }
          >
            {t.label}
          </NavLink>
        ))}
      </div>

      <div className="pt-6">
        <Outlet />
      </div>
    </div>
  );
}
