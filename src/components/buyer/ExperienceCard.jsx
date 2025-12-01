
import React from "react";

export default function ExperienceCard({ experience }) {
  if (!experience) return null;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] uppercase tracking-wide">
            {experience.product || "منتج"}
          </span>
          <span className="text-slate-500">•</span>
          <span>{experience.date}</span>
        </div>
        <span className="text-xs text-emerald-300">
          {experience.status === "hot" ? "🔥 Hot Post" : "📝 Review"}
        </span>
      </div>
      <p className="text-sm text-slate-100 whitespace-pre-line">{experience.text}</p>
      <div className="flex items-center justify-between mt-1 text-xs text-slate-400">
        <span>
          👍 {experience.likes} · 💬 {experience.comments} · 👀 {experience.impressions}
        </span>
        {experience.sentiment && (
          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] uppercase tracking-wide">
            {experience.sentiment}
          </span>
        )}
      </div>
    </div>
  );
}
