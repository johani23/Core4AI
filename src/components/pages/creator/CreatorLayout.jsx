// ============================================================================
// 💜 Core4.AI – CreatorLayout PRO v4 (FIXED IMPORT PATH)
// ============================================================================

import React from "react";
import CreatorSidebar from "@/components/pages/creator/components/CreatorSidebar";

export default function CreatorLayout({ children }) {
  return (
    <div
      className="min-h-screen flex gap-6 p-6 bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white"
      dir="rtl"
    >
      {/* Sidebar */}
      <aside className="hidden lg:block sticky top-6 h-fit">
        <CreatorSidebar />
      </aside>

      {/* Page Content */}
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
