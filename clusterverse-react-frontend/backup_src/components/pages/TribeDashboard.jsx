// 💎 TribeDashboard – Tribe Pulse + Deposit
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const API_BASE = "http://127.0.0.1:8000";

export default function TribeDashboard() {
  const { tribeName } = useParams();
  const [tribe, setTribe] = useState(null);
  const [members, setMembers] = useState([]);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [pulse, setPulse] = useState(0);

  async function fetchTribeData() {
    try {
      const res = await fetch(`${API_BASE}/tribes/${tribeName}/pool`);
      const data = await res.json();
      setTribe(data);
      setMembers(data.members || []);
      setPulse(Math.min(100, (data.pool_balance % 100) + 20));
    } catch (err) {
      console.error("Error fetching tribe:", err);
    } finally {
      setLoading(false);
    }
  }

  async function deposit() {
    try {
      await fetch(`${API_BASE}/tribes/${tribeName}/deposit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ member_id: 1, amount: parseFloat(amount) }),
      });
      setAmount("");
      fetchTribeData();
    } catch (err) {
      console.error("Deposit error:", err);
    }
  }

  useEffect(() => {
    fetchTribeData();
  }, [tribeName]);

  if (loading) return <p className="text-center mt-10 text-gray-400 animate-pulse">Loading Tribe Dashboard…</p>;
  if (!tribe) return <p className="text-center mt-10 text-red-400">Tribe not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">{tribe.badge} {tribeName} Tribe</h1>
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="bg-gradient-to-r from-cyan-500 to-blue-700 rounded-xl p-4 text-center shadow-lg"
      >
        <p className="text-lg font-semibold">💓 Pulse: {pulse}%</p>
        <div className="w-full bg-gray-800 h-3 rounded-full mt-2">
          <div className="bg-cyan-400 h-3 rounded-full" style={{ width: `${pulse}%` }} />
        </div>
      </motion.div>

      <div className="bg-gray-900/70 border border-gray-800 rounded-xl p-4 space-y-4">
        <p>💰 Pool Balance: <span className="font-bold text-cyan-400">{tribe.pool_balance.toFixed(2)} C4T</span></p>
        <p>👥 Members: {members.length}</p>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 bg-gray-800 text-white rounded-lg p-2 border border-gray-700 focus:ring-2 focus:ring-cyan-600"
          />
          <button
            onClick={deposit}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Deposit
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">🏅 Top Contributors</h2>
        <div className="space-y-2">
          {members.map((m, i) => (
            <div key={m.id} className="flex justify-between bg-gray-900 p-2 rounded-lg border border-gray-800">
              <span>{i + 1}. {m.username}</span>
              <span className="text-cyan-400 font-semibold">{m.contribution_score.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
