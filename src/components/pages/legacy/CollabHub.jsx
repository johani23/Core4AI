// ============================================================
// ðŸ’Ž Core4.AI â€“ CollabHub.jsx (v4.0 â€œUnified Collab + Merchant Loopâ€)
// ------------------------------------------------------------
// âœ… Full bridge with CoreSyncContext.launchCampaign()
// âœ… Displays live campaign updates (ROI / Status / Conversion)
// âœ… Real-time feedback loop from backend WebSocket
// ============================================================

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useCoreSync } from "@context/CoreSyncContext";

// ðŸ§© Temporary mock members
const mockTribeMembers = [
  {
    id: 1,
    name: "Lina Styles",
    tribe: "Fashion Tribe",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    conversion: 2.3,
  },
  {
    id: 2,
    name: "Maya Events",
    tribe: "Event Tribe",
    avatar: "https://randomuser.me/api/portraits/women/57.jpg",
    conversion: 3.8,
  },
  {
    id: 3,
    name: "Sam Tech",
    tribe: "Tech Tribe",
    avatar: "https://randomuser.me/api/portraits/men/21.jpg",
    conversion: 4.2,
  },
  {
    id: 4,
    name: "Noor Editz",
    tribe: "Creative Tribe",
    avatar: "https://randomuser.me/api/portraits/women/70.jpg",
    conversion: 3.1,
  },
];

export default function CollabHub() {
  const { campaigns = [], launchCampaign } = useCoreSync();
  const [offer, setOffer] = useState(null);
  const [mode, setMode] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastOfferCheck, setLastOfferCheck] = useState(null);

  // ðŸ§  Load selected offer initially
  useEffect(() => {
    const saved = sessionStorage.getItem("selectedOffer");
    if (saved) {
      try {
        setOffer(JSON.parse(saved));
        setLastOfferCheck(saved);
      } catch {
        setOffer(null);
      }
    }
  }, []);

  // ðŸ”„ Watch for new offer (live sync from MerchantHub)
  useEffect(() => {
    const interval = setInterval(() => {
      const current = sessionStorage.getItem("selectedOffer");
      if (current !== lastOfferCheck) {
        setLastOfferCheck(current);
        if (current) {
          try {
            const parsed = JSON.parse(current);
            setOffer(parsed);
            toast.success(`ðŸ“¦ Offer "${parsed.title}" loaded`);
          } catch {
            setOffer(null);
          }
        } else {
          setOffer(null);
        }
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [lastOfferCheck]);

  // ðŸ’¹ Power Calculation
  const basePower = offer ? 5 : 0;
  const multiplier = mode === "team" ? 1.15 : 1.0;
  const teamPower = selectedMembers.reduce(
    (sum, m) => sum + m.conversion * multiplier,
    0
  );
  const totalPower = Math.min(basePower + (mode === "team" ? teamPower : 0), 100);

  // ðŸ§© Member Selection
  const toggleMember = (member) => {
    setSelectedMembers((prev) => {
      const exists = prev.find((m) => m.id === member.id);
      return exists
        ? prev.filter((m) => m.id !== member.id)
        : [...prev, { ...member, commission: 5 }];
    });
  };

  // ðŸ’° Edit commission
  const updateCommission = (id, val) => {
    const value = parseFloat(val) || 0;
    setSelectedMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, commission: value } : m))
    );
  };

  // ðŸš€ Launch Campaign
  const handleCreateCampaign = async () => {
    if (!offer) return toast.error("Please select an offer first!");
    if (!mode) return toast.error("Select collaboration mode.");

    const totalCommission = selectedMembers.reduce(
      (sum, m) => sum + (m.commission || 0),
      0
    );
    if (totalCommission > 100) {
      return toast.error("Commission shares exceed 100% limit.");
    }

    setLoading(true);
    toast.loading("ðŸ§© Preparing campaign...");
    try {
      const payload = {
        merchant: offer.merchant || "Unknown",
        name: offer.title || "Untitled Campaign",
        tribes: selectedMembers.map((m) => m.tribe),
        creators: selectedMembers.map((m) => m.name),
        budget: offer.budget || 1000,
        mode,
        totalPower,
        totalCommission,
      };

      const result = await launchCampaign(payload);
      toast.dismiss();

      if (result?.status === "ACTIVE") {
        toast.success(`ðŸš€ Campaign ${result.campaign_id} launched successfully!`);
      } else {
        toast.success("âš¡ Campaign dispatched (awaiting sync)");
      }

      sessionStorage.removeItem("selectedOffer");
      setOffer(null);
      setMode("");
      setSelectedMembers([]);
    } catch (err) {
      toast.dismiss();
      toast.error("âŒ Launch failed. Check backend connection.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent flex items-center gap-2">
          ðŸ¤ Collaboration Hub
        </h1>
        <p className="text-gray-300 text-sm">
          Choose your mode â€” go solo for full rewards or team up for reach and shared gains.
        </p>
      </div>

      {/* Offer Preview */}
      {offer ? (
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-[#111827] border border-gray-700 rounded-xl p-5 shadow-md"
        >
          <div className="flex items-center gap-4">
            <img
              src={offer.thumbnail || "https://via.placeholder.com/120"}
              alt={offer.title || "Offer"}
              className="w-28 h-28 object-cover rounded-md"
            />
            <div>
              <h2 className="text-lg font-semibold text-pink-400">
                {offer.title || "Unnamed Offer"}
              </h2>
              <p className="text-sm text-gray-400 line-clamp-2">
                {offer.description || "No description available."}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Merchant: {offer.merchant || "Unknown"} â€¢ Commission:{" "}
                <span className="text-green-400">
                  {offer.commission || "N/A"}%
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <p className="text-gray-500 italic">
          No offer selected. Go to{" "}
          <span className="text-purple-400 font-semibold">Merchant Offers</span> to choose one.
        </p>
      )}

      {/* Mode Selection */}
      <div className="flex gap-4">
        {["solo", "team"].map((m) => (
          <motion.button
            key={m}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMode(m)}
            className={`flex-1 py-3 rounded-md font-semibold border transition-all ${
              mode === m
                ? m === "solo"
                  ? "bg-purple-600 border-purple-400 ring-2 ring-purple-300"
                  : "bg-pink-600 border-pink-400 ring-2 ring-pink-300"
                : "bg-[#111827] border-gray-700 hover:bg-gray-800"
            }`}
          >
            {m === "solo" ? "ðŸ§ Go Solo" : "ðŸ¤ Team Up"}
          </motion.button>
        ))}
      </div>

      {/* Team Mode Section */}
      {mode === "team" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#111827] border border-gray-700 rounded-xl p-5 shadow-md"
        >
          <h3 className="text-lg font-bold text-pink-400 mb-3">Invite Your Tribe ðŸ’«</h3>
          <p className="text-sm text-gray-400 mb-4">
            Select members to collaborate with you. Assign commission shares for each.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {mockTribeMembers.map((member) => {
              const isSelected = selectedMembers.some((m) => m.id === member.id);
              const memberData = selectedMembers.find((m) => m.id === member.id);
              return (
                <motion.div
                  key={member.id}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => toggleMember(member)}
                  className={`cursor-pointer p-3 rounded-lg border transition-all ${
                    isSelected
                      ? "border-pink-500 bg-pink-900/20"
                      : "border-gray-700 bg-black/40 hover:bg-gray-800/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover border border-gray-700"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-white flex items-center gap-1">
                        {member.name}
                        {isSelected && (
                          <span className="text-[10px] text-pink-400 border border-pink-500 px-1 rounded">
                            Invited
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-gray-400">{member.tribe}</p>
                      <p className="text-xs text-green-400">âš¡ {member.conversion}% CR</p>
                    </div>
                  </div>

                  {isSelected && (
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={memberData?.commission || ""}
                      onChange={(e) =>
                        updateCommission(member.id, e.target.value)
                      }
                      className="mt-2 w-full bg-black/50 border border-gray-700 text-xs text-center rounded-md text-white py-1"
                      placeholder="Commission %"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="text-sm text-gray-400 mt-4">
            ðŸ’¹ <span className="text-purple-400 font-semibold">Projected Conversion Power:</span>{" "}
            <span className="text-green-400 font-bold">{totalPower.toFixed(1)}%</span>
          </div>
        </motion.div>
      )}

      {/* Create Campaign Button */}
      <button
        disabled={!offer || !mode || loading}
        onClick={handleCreateCampaign}
        className="w-full bg-gradient-to-r from-purple-400/80 to-pink-400/80 py-3 rounded-md text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-40"
      >
        {loading ? "â³ Launching..." : "ðŸš€ Create Campaign"}
      </button>

      {/* ðŸ“Š Live Campaign Feed */}
      {campaigns.length > 0 && (
        <div className="bg-[#111827] border border-gray-700 rounded-xl p-5 shadow-md mt-8">
          <h3 className="text-lg font-semibold text-purple-400 mb-3">
            Active Campaigns ({campaigns.length})
          </h3>
          <div className="space-y-2 text-sm">
            {campaigns.map((c, i) => (
              <div
                key={i}
                className="border-b border-gray-700 pb-2 last:border-none"
              >
                <div className="flex justify-between items-center">
                  <span>
                    <b>{c.merchant}</b> â€” {c.category || c.name}
                  </span>
                  <span className="text-green-400 font-semibold">
                    ROI: {c.conversion ? c.conversion.toFixed(1) : "--"}%
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  Tribe: {c.tribe || "â€”"} â€¢ Member: {c.member || "â€”"} â€¢{" "}
                  <span className="text-pink-400">{c.status || "Active"}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
