// ============================================================
// ðŸ‡¸ðŸ‡¦ Core4.AI â€“ SaudiHeader.jsx
// ============================================================

import React from "react";
import { Link } from "react-router-dom";
import { FiStore, FiPackage, FiPlusCircle } from "react-icons/fi";

export default function SaudiHeader() {
  return (
    <header className="bg-white shadow-sm border-b border-[#E8E8E8] py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">

        {/* Logo Area */}
        <div className="flex items-center gap-3">
          <img
            src="/saudi_logo.svg"
            className="h-10"
          />
          <div>
            <h1 className="text-xl font-extrabold text-[#006C35] tracking-tight">
              Core4.AI
            </h1>
            <p className="text-xs text-gray-500 -mt-1">Saudi Influence Commerce</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-8 text-[#004A26] font-medium">
          <Link to="/merchant-hub" className="hover:text-[#006C35] flex items-center gap-1">
            <FiStore /> Merchant Hub
          </Link>

          <Link to="/merchant/products/list" className="hover:text-[#006C35] flex items-center gap-1">
            <FiPackage /> Products
          </Link>

          <Link to="/merchant/add-product" className="hover:text-[#006C35] flex items-center gap-1">
            <FiPlusCircle /> Add Product
          </Link>
        </nav>
      </div>
    </header>
  );
}
