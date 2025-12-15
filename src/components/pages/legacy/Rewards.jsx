// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Rewards.jsx (MVP-34.9 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œLive Hub EditionÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Real-time reward history
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Integrated with Wallet + XP + Achievements
// ============================================================

import { motion, AnimatePresence } from "framer-motion";

const API_BASE = "http://127.0.0.1:8000";

export default function Rewards() {
  const [rewards, setRewards] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [badges, setBadges] = useState([]);
  const [toast, setToast] = useState(null);

  // Load initial wallet info
  useEffect(() => {
    async function load() {
      const res = await fetch(`${API_BASE}/wallet/1`);
      const data = await res.json();
      setWallet(data);
      setXp(data.xp);
      setLevel(data.level);
      setBadges(data.badges);
    }
    load();
  }, []);

  // WebSocket listener
  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws");
    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.type === "reward") {
          setRewards((prev) => [msg, ...prev.slice(0, 19)]);
          setWallet((p) => ({ ...p, balance: msg.new_balance }));
          setXp(msg.xp_total);
          setLevel(msg.level);
          setBadges(msg.all_badges);
          setToast(`ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ +${msg.amount} C4T ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ +${msg.xp_gain} XP`);
          setTimeout(() => setToast(null), 4000);
        }
      } catch {}
    };
    return () => ws.close();
  }, []);

  if (!wallet)
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-yellow-400 animate-pulse">
        Loading rewardsÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold text-yellow-400 mb-4">
        ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â Live Rewards Center
      </h1>
      <p className="text-gray-400 text-sm mb-6">
        Balance: <span className="text-emerald-400 font-semibold">{wallet.balance.toFixed(2)} {wallet.symbol}</span> ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢
        Level {level} ({xp}/100 XP)
      </p>

      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4 max-w-2xl mx-auto">
        <h2 className="text-lg text-yellow-400 mb-3 font-semibold">Recent Rewards</h2>
        {rewards.length === 0 ? (
          <p className="text-zinc-500 text-sm">No rewards yet. Stay active!</p>
        ) : (
          <div className="space-y-3">
            {rewards.map((r, i) => (
              <motion.div
                key={i}
                className="bg-zinc-800 rounded-xl px-4 py-3 flex justify-between items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <p className="font-semibold text-amber-400">
                    +{r.amount} C4T ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ +{r.xp_gain} XP
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(r.timestamp).toLocaleTimeString()} ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Level {r.level}
                  </p>
                </div>
                <p className="text-sm text-gray-400">{r.new_badges?.join(", ")}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-6 right-6 bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


