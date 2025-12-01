import React from "react";

export default function CorePanel({ children, className = "" }) {
  return (
    <div
      className={`
        bg-[#0D1317] 
        border border-[#1F8C4D]/30 
        shadow-[0_0_25px_rgba(0,108,53,0.15)] 
        rounded-2xl 
        p-6 
        ${className}
      `}
    >
      {children}
    </div>
  );
}
