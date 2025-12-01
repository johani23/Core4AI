import React from "react";

export default function CoreHeader({ title, subtitle, icon }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <span className="text-[#CBA65C] text-3xl">{icon}</span>
        <h1 className="text-3xl font-bold text-[#1F8C4D]">{title}</h1>
      </div>
      {subtitle && (
        <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
      )}
    </div>
  );
}
