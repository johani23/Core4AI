import React from "react";
import { NavLink } from "react-router-dom";
import { useCoreSync } from "@/context/CoreSyncContext";
import { appTabs } from "@/config/AppTabs";

export default function Navbar() {
  const { role, setRole } = useCoreSync();

  const roles = [
    "buyer",
    "creator",
    "merchant",
    "tribeLeader",
    "council",
    "admin",
  ];

  return (
    <nav className="w-full bg-white shadow-sm border-b px-6 py-3 flex items-center justify-between">

      <div className="text-2xl font-bold text-green-700">
        Core4<span className="text-gray-900">AI</span>
      </div>

      <div className="flex space-x-6">
        {appTabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg font-medium transition ${
                isActive ? "bg-green-600 text-white" : "text-gray-700"
              }`
            }
          >
            {tab.icon} {tab.label}
          </NavLink>
        ))}
      </div>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="px-3 py-2 rounded-lg border bg-gray-100"
      >
        {roles.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
    </nav>
  );
}
