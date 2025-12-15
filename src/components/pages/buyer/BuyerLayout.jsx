// ============================================================================
// 💚 Core4.AI – BuyerLayout (SAUDI SAFE VERSION)
// - Does NOT override CoreLayout
// - NO full-screen wrappers
// - NO background colors
// - Only adds section title + spacing
// ============================================================================

import React from "react";

export default function BuyerLayout({ title, subtitle, children }) {
  return (
    <div className="w-full" dir="rtl">

      {/* Page Section Header */}
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h1 className="text-2xl font-bold text-purple-300 mb-1">
              {title}
            </h1>
          )}

          {subtitle && (
            <p className="text-gray-400 text-sm">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Content Area */}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}
