import React, { useEffect, useState } from "react";
import { getEMI, getMarketAdvice } from "@services/marketAPI";
import { motion } from "framer-motion";

export default function EMIWidget() {
  const [emi, setEmi] = useState(null);
  const [sent, setSent] = useState(0);
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const e = await getEMI();
        setEmi(e.emi_score.toFixed(1));
        setSent(e.avg_sentiment.toFixed(2));
        const a = await getMarketAdvice();
        setAdvice(a.advice);
      } catch (err) {
        console.error("EMI fetch error", err);
      }
    }
    load();
    const timer = setInterval(load, 60000);
    return () => clearInterval(timer);
  }, []);

  const color =
    emi >= 70 ? "text-green-400" : emi <= 40 ? "text-red-400" : "text-yellow-300";

  return (
    <motion.div
      className="rounded-2xl bg-gradient-to-r from-purple-900/40 to-pink-800/30 p-3 shadow-md flex flex-col items-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-xs uppercase tracking-wider text-gray-300">
        Emotional Market Index
      </h3>
      <motion.span
        className={`text-2xl font-bold ${color}`}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {emi ?? "--"}
      </motion.span>
      <p className="text-xs text-gray-400 mt-1">Sentiment {sent}</p>
      <p className="text-[10px] text-gray-300 mt-2 text-center">{advice}</p>
    </motion.div>
  );
}
