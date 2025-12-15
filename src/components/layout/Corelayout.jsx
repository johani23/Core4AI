import React from "react";
import MainNav from "../navigation/MainNav";

export default function CoreLayout({ children }) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#F8F8FA] text-black">

      {/* TOP BAR */}
      <header
        className="
          h-16 flex items-center justify-between
          px-6 border-b
          bg-white
          border-gray-200
        "
      >
        <div className="font-extrabold text-xl tracking-wide flex items-center gap-1">
          <span className="text-purple-700">Core4</span>
          <span className="text-green-600">.AI</span>
        </div>

        <div className="w-9 h-9 rounded-full bg-purple-300" />
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 px-4 py-4 overflow-y-auto flex flex-col items-center justify-start">
        {children}
      </main>

      {/* BOTTOM NAV */}
      <MainNav />
    </div>
  );
}
