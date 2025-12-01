import React from "react";

export default function CoreButton({
  label,
  onClick,
  variant = "primary",
  className = "",
}) {
  const styles = {
    primary:
      "bg-[#006C35] hover:bg-[#1F8C4D] text-white shadow-[0_0_15px_rgba(0,108,53,0.35)]",
    danger:
      "bg-[#DC2626] hover:bg-[#b91c1c] text-white shadow-[0_0_15px_rgba(220,38,38,0.35)]",
    secondary:
      "bg-[#11161A] hover:bg-[#1b2227] text-green-300 border border-[#1F8C4D]/40",
  };

  return (
    <button
      onClick={onClick}
      className={`px-5 py-3 rounded-xl font-semibold transition-all text-sm ${styles[variant]} ${className}`}
    >
      {label}
    </button>
  );
}
