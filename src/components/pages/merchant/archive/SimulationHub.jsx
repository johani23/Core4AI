// ============================================================
// ðŸ’Ž Core4.AI â€“ SimulationHub.jsx (v FINAL â€“ Buyer Pulse Integrated)
// ------------------------------------------------------------
// âœ… Animated circular wallets (Influencer Tokens)
// âœ… Tribe Split Visualization
// âœ… Merchant Sales Live
// âœ… Buyer Pulse (Tokens, R&D, Referrals, Influence Score)
// âœ… Real-time WebSocket Feed (/ws/synaptic)
// ============================================================

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import SimulationBuyerPulse from "@components/SimulationBuyerPulse";

export default function SimulationHub() {
  const [flywheel, setFlywheel] = useState({
    wallets: {},
    tribes: {},
    merchants: {},
    buyer: null,
  });

  const [wsConn, setWsConn] = useState(null);
  const [mode, setMode] = useState("solo");
  const [lastEvent, setLastEvent] = useState(null);

  // ------------------------------------------------------------
  // ðŸ”Œ Real-time WebSocket Connection (synaptic)
  // ------------------------------------------------------------
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/synaptic");

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);

      setFlywheel((prev) => ({
        ...prev,
        buyer: data.buyer ?? prev.buyer, // â† NEW BUYER SNAPSHOT
      }));
    };

    setWsConn(ws);
    return () => ws.close();
  }, []);

  // ------------------------------------------------------------
  // ðŸ§ª Trigger Fake Conversion (for Merchant + Influencer Tokens)
  // ------------------------------------------------------------
  const triggerConversion = async () => {
    const event = {
      influencer: "Ava",
      tribes: mode === "cooperative" ? ["Fashion", "Event"] : ["Fashion"],
      merchant: "UrbanGear",
      sales_value: Math.random() * 400 + 100,
      conversion_rate: Math.random() * 0.05 + 0.01,
      cooperative: mode === "cooperative",
    };

    await fetch("http://localhost:8000/flywheel/conversion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });

    setLastEvent(event);
  };

  return (
    <div className="p-8 text-white bg-gradient-to-br from-[#0e0920] to-[#1a1038] min-h-screen">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-cyan-300">ðŸª™ Tokenized Flywheel</h1>

      {/* Mode Controls */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setMode("solo")}
          className={`px-4 py-2 rounded-lg ${
            mode === "solo" ? "bg-cyan-500" : "bg-gray-600"
          }`}
        >
          Solo Mode
        </button>

        <button
          onClick={() => setMode("cooperative")}
          className={`px-4 py-2 rounded-lg ${
            mode === "cooperative" ? "bg-violet-500" : "bg-gray-600"
          }`}
        >
          Cooperative Mode
        </button>

        <button
          onClick={triggerConversion}
          className="px-4 py-2 bg-emerald-500 rounded-lg"
        >
          Trigger Conversion
        </button>
      </div>

      {/* ============================================================
          ðŸŸ¦ REAL-TIME GRID (Influencer, Tribe, Merchant, Buyer)
         ============================================================ */}
      <div className="grid grid-cols-3 gap-6">

        {/* Influencer Wallets */}
        <WalletCard
          title="Influencer Wallets"
          data={flywheel.wallets}
          color="cyan"
        />

        {/* Tribe Pools */}
        <TribeCard
          title="Tribe Pools"
          data={flywheel.tribes}
          color="violet"
          lastEvent={lastEvent}
        />

        {/* Merchant Sales */}
        <Card
          title="Merchant Sales"
          data={flywheel.merchants}
          color="orange"
        />

        {/* Buyer Pulse ðŸ’š */}
        <div className="col-span-3">
          <SimulationBuyerPulse data={flywheel.buyer} />
        </div>
      </div>

      {/* Floating animation when cooperative mode triggers */}
      <AnimatePresence>
        {lastEvent?.cooperative && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="fixed bottom-10 right-10 bg-violet-600 text-white px-6 py-3 rounded-full shadow-lg"
          >
            ðŸ¤ Tribe Collaboration Activated:{" "}
            {lastEvent.tribes.join(" + ")} share profits!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
      {/* â­ Buyer Event Stream  */}
<div className="col-span-3">
  <BuyerEventStream events={flywheel.buyer?.events || []} />
</div>

// ------------------------------------------------------------
// ðŸª™ Animated Wallet Card (Circular Progress)
// ------------------------------------------------------------
function WalletCard({ title, data }) {
  return (
    <div className="p-4 rounded-2xl bg-opacity-20 border border-cyan-400 relative overflow-hidden">
      <h2 className="text-cyan-300 text-xl font-semibold mb-3">{title}</h2>

      {Object.keys(data).length === 0 ? (
        <p className="text-gray-400">No wallets yet</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {Object.entries(data).map(([name, value]) => (
            <CircularWallet key={name} name={name} value={value} />
          ))}
        </div>
      )}
    </div>
  );
}

function CircularWallet({ name, value }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min((value % 100) / 100, 1) * circumference;

  return (
    <motion.div className="relative flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <svg width="90" height="90" className="mb-2">
        <circle cx="45" cy="45" r={radius} stroke="#2a2e45" strokeWidth="8" fill="none" />
        <motion.circle
          cx="45"
          cy="45"
          r={radius}
          stroke="#00ffff"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.2 }}
        />
      </svg>
      <span className="text-sm text-white font-semibold">{name}</span>
      <span className="text-xs text-cyan-300">{value.toFixed(2)} tokens</span>
    </motion.div>
  );
}

// ------------------------------------------------------------
// ðŸ¤ Tribe Split Visualization
// ------------------------------------------------------------
function TribeCard({ title, data, lastEvent }) {
  return (
    <motion.div
      className="p-4 rounded-2xl border border-violet-400 relative"
      animate={{ borderColor: lastEvent?.cooperative ? "#a78bfa" : "#6b21a8" }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-violet-300 text-xl font-semibold mb-3">{title}</h2>

      {Object.keys(data).length === 0 ? (
        <p className="text-gray-400">No tribe activity yet</p>
      ) : (
        <ul className="space-y-2">
          {Object.entries(data).map(([tribe, val]) => (
            <motion.li
              key={tribe}
              className="flex justify-between text-sm"
              animate={{
                scale: lastEvent?.tribes?.includes(tribe) ? 1.1 : 1,
                color: lastEvent?.tribes?.includes(tribe) ? "#c4b5fd" : "#ffffff",
              }}
              transition={{ type: "spring", stiffness: 180, damping: 10 }}
            >
              <span>{tribe}</span>
              <span className="font-mono">{val.toFixed(2)} tokens</span>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

// ------------------------------------------------------------
// ðŸ’° Merchant Sales Card
// ------------------------------------------------------------
function Card({ title, data, color }) {
  return (
    <motion.div className={`p-4 rounded-2xl bg-opacity-20 border border-${color}-400`} whileHover={{ scale: 1.03 }}>
      <h2 className={`text-${color}-300 text-xl font-semibold mb-3`}>{title}</h2>

      {Object.keys(data).length === 0 ? (
        <p className="text-gray-400">No data yet</p>
      ) : (
        <ul className="space-y-2">
          {Object.entries(data).map(([k, v]) => (
            <li key={k} className="flex justify-between text-sm">
              <span>{k}</span>
              <span className="text-white font-mono">{v.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
