// ============================================================================
// 💡 PulseValue.jsx — نبضة عند تغير القيمة (Value Pulse Animation)
// ============================================================================

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function PulseValue({ value, children }) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setPulse(true);
    const timer = setTimeout(() => setPulse(false), 300);
    return () => clearTimeout(timer);
  }, [value]); // النبضة عند تغير القيمة

  return (
    <motion.div
      animate={pulse ? { scale: [1, 1.15, 1] } : {}}
      transition={{ duration: 0.3 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
