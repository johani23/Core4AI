// ============================================================================
// 💚 Core4.AI – MerchantTopbar.jsx (Arabic RTL Premium Edition)
// ============================================================================
// - Arabic UI
// - RTL layout
// - نفس التصميم 100%
// ============================================================================

import React from "react";

export default function MerchantTopbar() {
  return (
    <header
      className="h-16 bg-white shadow flex items-center justify-between px-6"
      dir="rtl"
    >
      {/* RIGHT SIDE - TITLE */}
      <h1 className="text-xl font-semibold text-gray-800">
        منصة التاجر — Core4.AI
      </h1>

      {/* LEFT SIDE - PROFILE */}
      <div className="flex items-center gap-4 flex-row-reverse">
        <span className="text-gray-600 font-medium">مرحباً أيها التاجر</span>

        <img
          src="https://ui-avatars.com/api/?name=M"
          alt="Avatar"
          className="w-10 h-10 rounded-full border"
        />
      </div>
    </header>
  );
}
