// ============================================================================
// 💚 Core4.AI – Tribe Moderation Center (FINAL v2)
// ----------------------------------------------------------------------------
// - Review Join Requests
// - Review Reports
// - Only Leader + Officer can access
// ============================================================================

import React from "react";
import { useTribe } from "@/context/TribeContext";

export default function TribeModeration() {
  const {
    role,
    reports,
    joinRequests,
    approveJoin,
    rejectJoin,
    resolveReport,
  } = useTribe();

  // No access for regular members
  if (role !== "Leader" && role !== "Officer") {
    return (
      <div className="text-center text-gray-300 mt-20 text-xl" dir="rtl">
        ❌ ليس لديك صلاحية الوصول
      </div>
    );
  }

  return (
    <div className="p-10 text-white space-y-12" dir="rtl">
      <h1 className="text-3xl font-bold text-purple-300">
        ⚔️ مركز الإشراف — Moderation Center
      </h1>

      {/* ---------------- JOIN REQUESTS ---------------- */}
      <section className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-xl">
        <h2 className="text-2xl font-bold text-blue-300 mb-4">
          📨 طلبات الانضمام
        </h2>

        {joinRequests.length === 0 && (
          <p className="text-gray-400">لا توجد طلبات حالياً</p>
        )}

        {joinRequests.map((req) => (
          <div
            key={req.id}
            className="bg-white/10 p-4 rounded-xl border border-white/10 mb-3"
          >
            <p className="text-gray-200">العضو: {req.name}</p>
            <p className="text-gray-400 text-sm">
              الوقت: {new Date(req.time).toLocaleString()}
            </p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => approveJoin(req.id)}
                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500"
              >
                ✔ قبول
              </button>
              <button
                onClick={() => rejectJoin(req.id)}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500"
              >
                ✖ رفض
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* ---------------- REPORTS ---------------- */}
      <section className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-xl">
        <h2 className="text-2xl font-bold text-red-300 mb-4">🚨 البلاغات</h2>

        {reports.length === 0 && (
          <p className="text-gray-400">لا توجد بلاغات</p>
        )}

        {reports.map((r) => (
          <div
            key={r.id}
            className="bg-white/10 p-4 rounded-xl border border-white/10 mb-3"
          >
            <p>رقم البلاغ: {r.id}</p>
            <p>منشور رقم: {r.postId}</p>
            <p>السبب: {r.reason}</p>
            <p className="text-gray-400">الحالة: {r.status}</p>

            {r.status === "pending" && (
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => resolveReport(r.id, "approved")}
                  className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg"
                >
                  ✔ قبول
                </button>

                <button
                  onClick={() => resolveReport(r.id, "rejected")}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-500 rounded-lg"
                >
                  ✖ رفض
                </button>

                <button
                  onClick={() => resolveReport(r.id, "deleted")}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg"
                >
                  🗑 حذف المنشور
                </button>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
