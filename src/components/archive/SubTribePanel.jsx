// ============================================================
// ðŸ’Ž Core4.AI â€“ SubTribePanel.jsx (v1.0 â€œInfluencer Cluster UIâ€)
// ------------------------------------------------------------
// â€¢ Create & manage closed Sub-Tribes
// â€¢ Invite members by ID
// â€¢ Auto-refresh stats every 10 s
// â€¢ Visual avatars with initials
// ------------------------------------------------------------

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Utility â†’ first-two-letters avatar
function Avatar({ name }) {
  const initials = name.slice(0, 2).toUpperCase();
  const colors = ["bg-purple-600", "bg-pink-600", "bg-blue-600", "bg-amber-600"];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div
      className={`${color} text-white rounded-full w-9 h-9 flex items-center justify-center text-sm font-bold`}
      title={name}
    >
      {initials}
    </div>
  );
}

export default function SubTribePanel({ userId = "U101" }) {
  const API = "http://127.0.0.1:8000";
  const [subtribeId, setSubtribeId] = useState("");
  const [form, setForm] = useState({ name: "", campaign_id: "", commission_split: 0.15 });
  const [invitee, setInvitee] = useState("");
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState("");

  // Auto refresh stats every 10 s
  useEffect(() => {
    let interval;
    if (subtribeId) {
      fetchStats();
      interval = setInterval(fetchStats, 10000);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subtribeId]);

  // ------------------------------------------------------------
  // API Calls
  // ------------------------------------------------------------
  const createSubTribe = async () => {
    setStatus("Creating sub-tribe...");
    try {
      const res = await fetch(`${API}/subtribe/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leader_id: userId,
          campaign_id: form.campaign_id,
          name: form.name,
          commission_split: parseFloat(form.commission_split),
        }),
      });
      const data = await res.json();
      setSubtribeId(data.subtribe_id);
      setStatus(`âœ… Sub-tribe created: ${data.subtribe_id}`);
    } catch (err) {
      setStatus("âŒ Failed to create sub-tribe");
    }
  };

  const inviteMember = async () => {
    if (!subtribeId || !invitee) return;
    setStatus(`Inviting ${invitee}...`);
    try {
      const res = await fetch(`${API}/subtribe/invite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subtribe_id: subtribeId, invitee_id: invitee }),
      });
      const data = await res.json();
      setStatus(`âœ… Invited ${data.invitee}`);
      setInvitee("");
      fetchStats();
    } catch {
      setStatus("âŒ Invite failed");
    }
  };

  const fetchStats = async () => {
    if (!subtribeId) return;
    try {
      const res = await fetch(`${API}/subtribe/stats?subtribe_id=${subtribeId}`);
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch {
      setStatus("âš ï¸ Unable to fetch stats");
    }
  };

  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  return (
    <div className="bg-gray-900 text-white rounded-2xl p-6 mt-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">ðŸ¤ Sub-Tribe Management</h2>

      {/* Create Sub-Tribe */}
      {!subtribeId && (
        <div className="mb-6">
          <h3 className="text-lg mb-2 font-semibold">Create Sub-Tribe</h3>
          <div className="grid grid-cols-3 gap-3">
            <input
              className="p-2 text-black rounded"
              placeholder="Sub-Tribe Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="p-2 text-black rounded"
              placeholder="Campaign ID"
              onChange={(e) => setForm({ ...form, campaign_id: e.target.value })}
            />
            <input
              className="p-2 text-black rounded"
              type="number"
              step="0.01"
              placeholder="Commission Split"
              onChange={(e) => setForm({ ...form, commission_split: e.target.value })}
            />
          </div>
          <button
            onClick={createSubTribe}
            className="mt-3 bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
          >
            Create
          </button>
        </div>
      )}

      {/* Invite & Stats */}
      {subtribeId && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Sub-Tribe ID: <span className="text-purple-400">{subtribeId}</span>
            </h3>
            <button
              className="text-sm bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
              onClick={fetchStats}
            >
              ðŸ”„ Refresh
            </button>
          </div>

          {/* Invite section */}
          <div className="flex gap-3 mb-6">
            <input
              className="p-2 text-black rounded flex-grow"
              placeholder="Invite member (User ID)"
              value={invitee}
              onChange={(e) => setInvitee(e.target.value)}
            />
            <button
              onClick={inviteMember}
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
            >
              Invite
            </button>
          </div>

          {/* Stats */}
          {stats ? (
            <div>
              <p className="text-sm text-gray-400 mb-2">
                Members ({stats.members?.length || 0})
              </p>
              <div className="space-y-2">
                {stats.members?.map((m) => (
                  <motion.div
                    key={m}
                    layout
                    className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar name={m} />
                      <span className="font-medium">{m}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">
                        Sales: {stats.stats?.sales || 0}
                      </p>
                      <p className="text-xs text-gray-400">
                        Tokens: {stats.stats?.tokens || 0}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-400">No data yet.</p>
          )}
        </div>
      )}

      {/* Status line */}
      {status && <p className="mt-4 text-sm text-gray-300">{status}</p>}
    </div>
  );
}
