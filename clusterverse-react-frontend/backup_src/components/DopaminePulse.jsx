import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DopaminePulse({ userId = 1 }) {
  const [level, setLevel] = useState(0);

  useEffect(() => {
    async function fetchLevel() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/dopamine/profile/${userId}`);
        const data = await res.json();
        setLevel(data.current_level ?? 0);
      } catch {
        // fallback: gentle random oscillation if backend down
        setLevel((prev) => (prev + Math.random() * 10) % 100);
      }
    }
    fetchLevel();
    const interval = setInterval(fetchLevel, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  const clamped = Math.min(Math.max(level, 0), 100);
  const color =
    clamped > 80 ? "from-yellow-400 to-red-500" :
    clamped > 50 ? "from-sky-500 to-indigo-600" :
    "from-purple-600 to-pink-700";

  return (
    <motion.div
      className={`fixed bottom-5 right-5 rounded-full bg-gradient-to-r ${color}
                  flex items-center justify-center font-bold text-white shadow-lg`}
      style={{ width: 56, height: 56 }}
      animate={{
        scale: 1 + clamped / 150,
        opacity: [0.8, 1, 0.8],
        rotate: [0, 10, -10, 0],
      }}
      transition={{ duration: 1.8, repeat: Infinity }}
    >
      ⚡
    </motion.div>
  );
}
