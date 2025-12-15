import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCoreSync } from "@context/CoreSyncContext";

export default function LevelUpToast() {
  const { levelUps = [] } = useCoreSync() || {};
  const [visible, setVisible] = useState(false);
  const [latest, setLatest] = useState(null);

  // Watch for new level-up events
  useEffect(() => {
    if (levelUps.length === 0) return;
    const newEvent = levelUps[levelUps.length - 1];
    setLatest(newEvent);
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, [levelUps]);

  return (
    <AnimatePresence>
      {visible && latest && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.4 }}
          className="fixed top-6 right-6 bg-gradient-to-r from-fuchsia-600 via-pink-500 to-amber-400 
                     text-white px-5 py-3 rounded-2xl shadow-2xl z-50 flex items-center gap-3"
        >
          <span className="text-2xl">ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Â°</span>
          <div>
            <p className="font-bold text-sm tracking-wide">
              {latest.creator} reached <span className="text-amber-100">{latest.new_level}</span>!
            </p>
            <p className="text-xs text-fuchsia-100 opacity-90">
              XP {latest.xp?.toFixed?.(1)} ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ {new Date(latest.time).toLocaleTimeString()}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

