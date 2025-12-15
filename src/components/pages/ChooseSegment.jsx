import React from "react";
import { useNavigate } from "react-router-dom";
import { useCoreSync } from "@/context/CoreSyncContext";

export default function ChooseSegment() {
  const navigate = useNavigate();
  const { setRole } = useCoreSync();

  const roles = [
    { id: "merchant", label: "التاجر", icon: "🏪", path: "/merchant/dashboard" },
    { id: "buyer", label: "المشتري", icon: "🛒", path: "/buyer/feed" },
    { id: "creator", label: "المنشئ", icon: "🎬", path: "/creator" },
    { id: "tribe_member", label: "عضو قبيلة", icon: "🔥", path: "/tribe" },
    { id: "tribe_leader", label: "قائد قبيلة", icon: "👑", path: "/tribe/dashboard" },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-start pt-12 px-6">

      <h1 className="text-3xl font-extrabold text-purple-700 mb-8">
        اختر دورك
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
        {roles.map((r) => (
          <button
            key={r.id}
            onClick={() => { setRole(r.id); navigate(r.path); }}
            className="bg-white border border-gray-300 rounded-xl p-5 shadow hover:shadow-lg hover:border-purple-500 transition"
          >
            <div className="text-4xl mb-3">{r.icon}</div>
            <div className="text-xl font-semibold">{r.label}</div>
          </button>
        ))}
      </div>

    </div>
  );
}
