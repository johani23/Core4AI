// ============================================================================
// 💚 Core4.AI – BuyerClaims.jsx
// Claim Center (Pre-Beta placeholder, clean and stable)
// ============================================================================

import React, { useState } from "react";
import BuyerLayout from "../../buyer/BuyerLayout";

export default function BuyerClaims() {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitted(true);
  };

  return (
    <BuyerLayout
      title="Claim Center"
      subtitle="لو التجربة سيئة… اكتب بلاغك، ونحن نراجع ونعوضك إذا كان البلاغ صحيح."
    >
      <div className="max-w-2xl space-y-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <h2 className="text-sm md:text-base font-semibold text-slate-50 mb-2">
            Report a bad experience
          </h2>

          <p className="text-xs md:text-sm text-slate-300 mb-3">
            صف ما حدث بهدوء وبدون مبالغة. النظام يقارن بلاغك بتجارب مشترين آخرين،
            وإذا تأكد النمط يتم تفعيل التعويض تلقائيًا.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs md:text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              rows={6}
              placeholder="مثال: طلبت المنتج من الفرع الفلاني، ووصلني بمستوى جودة أقل من المتوقع..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-xs md:text-sm font-medium bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
            >
              Submit claim (Demo)
            </button>
          </form>

          {submitted && (
            <p className="mt-3 text-[11px] text-emerald-300">
              تم تسجيل بلاغك (تجريبيًا). في النسخة الكاملة سيتم تحليله وربطه ببيانات
              بقية المشترين لتحديد الأهلية للتعويض.
            </p>
          )}
        </div>
      </div>
    </BuyerLayout>
  );
}
