// ============================================================================
// 💚 Core4.AI – Join Requests Center (Leader/Officer Only)
// ============================================================================
import React from "react";
import { useTribe } from "@/context/TribeContext";

export default function JoinRequestsPage() {
  const { joinRequests, approveJoin, rejectJoin, role } = useTribe();

  if (role !== "Leader" && role !== "Officer") {
    return (
      <div className="text-center text-gray-300 mt-20 text-xl" dir="rtl">
        ❌ ليس لديك صلاحية الوصول
      </div>
    );
  }

  return (
    <div className="p-10 text-white space-y-8" dir="rtl">
      <h1 className="text-3xl font-bold text-purple-300">📨 طلبات الانضمام</h1>

      {joinRequests.length === 0 && (
        <p className="text-gray-400">لا توجد طلبات حالياً</p>
      )}

      {joinRequests.map((req) => (
        <div
          key={req.id}
          className="bg-white/10 border border-white/20 p-6 rounded-2xl space-y-3 shadow"
        >
          <p>العضو: {req.name}</p>
          <p>الوقت: {new Date(req.time).toLocaleString()}</p>

          <div className="flex gap-4 pt-2">
            <button
              onClick={() => approveJoin(req.id)}
              className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-500"
            >
              ✔ قبول
            </button>

            <button
              onClick={() => rejectJoin(req.id)}
              className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500"
            >
              ✖ رفض
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
