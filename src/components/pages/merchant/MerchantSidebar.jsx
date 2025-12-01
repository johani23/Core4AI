import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/merchant/dashboard", label: "Dashboard" },
  { to: "/merchant/products", label: "Products" },
  { to: "/merchant/pricing", label: "Pricing Intelligence" },
  { to: "/merchant/creative", label: "Creative Studio" },
  { to: "/merchant/campaigns", label: "Campaign Builder" },
  { to: "/merchant/offers", label: "Offer Center" },
  { to: "/merchant/earnings", label: "Earnings" },
  { to: "/merchant/analytics", label: "Analytics" },
];

export default function MerchantSidebar() {
  return (
    <aside className="w-64 bg-white shadow-xl h-full">
      <div className="text-2xl text-green-700 font-bold px-6 py-5 border-b">
        Merchant Panel
      </div>

      <nav className="p-4 space-y-2">
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg font-medium ${
                isActive
                  ? "bg-green-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
