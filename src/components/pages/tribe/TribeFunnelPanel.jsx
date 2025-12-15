// ============================================================================
// 💚 Core4.AI – Funnel Panel (Member-Level Funnel Visualization)
// ============================================================================

import React from "react";
import { useTribeFunnel } from "@/context/TribeFunnelContext";

export default function TribeFunnelPanel({ product }) {
  const { evaluateAllMembers } = useTribeFunnel();

  if (!product) return null;

  const results = evaluateAllMembers(product);

  return (
    <div className="bg-white/10 border border-white/20 p-6 rounded-2xl text-white space-y-4">
      <h2 className="text-xl font-bold text-purple-300">📊 خريطة التأثير (Funnel Map)</h2>

      <p className="text-gray-300">
        تحليل كامل لدور كل عضو في القبيلة داخل رحلة العميل MIT Funnel.
      </p>

      <div className="space-y-4 mt-4">
        {results.map((r, i) => (
          <div
            key={i}
            className="p-4 bg-white/5 border border-white/10 rounded-xl"
          >
            <h3 className="text-lg font-bold">{r.member.name}</h3>

            <p className="text-sm text-purple-300 font-bold">
              المرحلة: {translate(r.funnelStage)}
            </p>

            <p className="text-sm mt-1 text-gray-300">{r.description}</p>

            <p className="text-sm mt-1">
              🎬 المحتوى المقترح: <b>{r.suggestedContent}</b>
            </p>

            <p className="text-sm mt-1">
              📣 CTA: <b>{r.cta}</b>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function translate(f) {
  return {
    awareness: "Awareness – الوعي",
    consideration: "Consideration – التفكير",
    conversion: "Conversion – اتخاذ القرار",
    advocacy: "Advocacy – الترويج",
  }[f];
}
