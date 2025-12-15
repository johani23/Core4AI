import React from "react";

export default function PowerRing({ value = 0, label = "Power" }) {
  const percent = Math.min(Math.max(value, 0), 100);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full rotate-[-90deg]">
          <circle
            cx="56"
            cy="56"
            r="45"
            stroke="#1F2A33"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="56"
            cy="56"
            r="45"
            stroke="#1F8C4D"
            strokeWidth="10"
            strokeDasharray={2 * Math.PI * 45}
            strokeDashoffset={
              2 * Math.PI * 45 - (percent / 100) * (2 * Math.PI * 45)
            }
            strokeLinecap="round"
            fill="none"
            className="transition-all duration-700"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center text-center">
          <span className="text-lg font-bold text-[#CBA65C]">
            {Math.round(percent)}%
          </span>
        </div>
      </div>

      <p className="text-gray-300 text-sm mt-2">{label}</p>
    </div>
  );
}

