// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ SimulationBuyerPulse (v3.0 CINEMATIC)
// ------------------------------------------------------------
// Dynamic Halo + Badge + Shockwave + Live Stats
// Works directly with /ws/synaptic buyer snapshots
// ============================================================

import { motion } from "framer-motion";

// ---------------------------------------
// BADGE STYLES
// ---------------------------------------
const tierStyles = {
  "Newbie": {
    color: "#6b7280",
    glow: "0 0 8px #6b7280",
    badge: "ÃƒÂ°Ã…Â¸Ã‚Â§Ã…Â  Beginner",
    halo: "rgba(107, 114, 128, 0.15)"
  },
  "Active Buyer": {
    color: "#10b981",
    glow: "0 0 10px #10b981",
    badge: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Engaged",
    halo: "rgba(16, 185, 129, 0.25)"
  },
  "Rising Influencer": {
    color: "#f59e0b",
    glow: "0 0 12px #f59e0b",
    badge: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥ Rising Star",
    halo: "rgba(245, 158, 11, 0.35)"
  },
  "Influencer": {
    color: "#8b5cf6",
    glow: "0 0 15px #8b5cf6",
    badge: "ÃƒÂ¢Ã…Â¡Ã‚Â¡ Influencer Level I",
    halo: "rgba(139, 92, 246, 0.50)"
  }
};

// Shockwave animation
const shockwaveStyle = {
  position: "absolute",
  width: "180px",
  height: "180px",
  borderRadius: "9999px",
  border: "3px solid rgba(255,255,255,0.5)",
};

export default function SimulationBuyerPulse({ data }) {
  if (!data) {
    return (
      <div className="p-6 bg-black/20 rounded-2xl border border-gray-700">
        <p className="text-gray-400">Waiting for buyer data...</p>
      </div>
    );
  }

  // Dynamic Tier
  const tier = getTier(data);
  const style = tierStyles[tier];

  return (
    <div
      className="relative p-6 rounded-2xl mt-6"
      style={{
        border: `2px solid ${style.color}`,
        background: `linear-gradient(145deg, rgba(0,0,0,0.2), rgba(20,20,35,0.5))`,
        boxShadow: style.glow,
        overflow: "hidden",
      }}
    >
      {/* HALO */}
      <div
        className="absolute inset-0 blur-3xl"
        style={{ background: style.halo }}
      />

      {/* SHOCKWAVE (only for Rising/Influencer) */}
      {tier !== "Newbie" && tier !== "Active Buyer" && (
        <motion.div
          style={shockwaveStyle}
          initial={{ scale: 0.7, opacity: 0.5 }}
          animate={{
            scale: 2.4,
            opacity: 0,
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeOut",
          }}
          className="mx-auto"
        />
      )}

      {/* CONTENT */}
      <div className="relative">
        <h2
          className="text-2xl font-bold mb-3"
          style={{ color: style.color }}
        >
          ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ Buyer Pulse
        </h2>

        {/* Badge */}
        <div
          className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4"
          style={{
            background: style.halo,
            color: style.color,
            boxShadow: style.glow,
          }}
        >
          {style.badge}
        </div>

        {/* Stats */}
        <PulseStat label="Buyer ID" value={data.buyer_id} />
        <PulseStat label="Tokens" value={data.tokens} color={style.color} />
        <PulseStat label="R&D Score" value={data.r_and_d_score} />
        <PulseStat label="Referrals" value={data.referrals} />
        <PulseStat label="Influence Score" value={data.influence_score} color={style.color} />

        {/* CTA */}
        <button
          className="mt-4 px-4 py-2 rounded-lg text-white bg-gray-700 hover:bg-gray-600 text-sm"
        >
          Buyer Mode
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// SMALL COMPONENT FOR ANIMATED STATS
// ---------------------------------------------------------
function PulseStat({ label, value, color = "#fff" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="flex gap-2 text-sm text-gray-200"
    >
      <span className="font-semibold">{label}:</span>
      <span style={{ color }}>{value}</span>
    </motion.div>
  );
}

// ---------------------------------------------------------
// TIER LOGIC (same as backend but UI-side)
// ---------------------------------------------------------
function getTier(b) {
  const score = b.influence_score;

  if (score >= 25) return "Influencer";
  if (score >= 10) return "Rising Influencer";
  if (score >= 3) return "Active Buyer";
  return "Newbie";
}


