// ============================================================================
// 💡 AnimatedXPBar.jsx — XP Bar with Animation + Glow (Phase 3)
// ============================================================================

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AnimatedXPBar({ xp, xpToNext }) {
  const [progress, setProgress] = useState(0);       // قيمة التحريك
  const [glow, setGlow] = useState(false);           // تفعيل الوهج المؤقت

  const percent = (xp / xpToNext) * 100;

  // تحديث الخط عند تغير قيمة XP
  useEffect(() => {
    setProgress(percent);

    // تشغيل وهج مؤقت
    setGlow(true);
    const timer = setTimeout(() => setGlow(false), 600);

    return () => clearTimeout(timer);
  }, [xp]);

  return (
    <div className="w-full mt-4">
      <div className="text-sm text-gray-300 mb-1" dir="rtl">
        XP: {xp} / {xpToNext}
      </div>

      <div className="relative w-full h-4 bg-gray-700/40 rounded-full overflow-hidden">
        
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />

        {/* تأثير الوهج */}
        {glow && (
          <motion.div
            className="absolute inset-0 rounded-full bg-purple-400/40 blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 0.5 }}
          />
        )}
      </div>
    </div>
  );
}
