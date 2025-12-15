// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Wallet.jsx (MVP-38 Safe XP Edition)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Optional chaining to prevent crashes
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Adds link to AI Arena Twin test
// ============================================================

import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://127.0.0.1:8000";

export default function Wallet() {
  const [wallet, setWallet] = useState(null);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [badges, setBadges] = useState([]);
  const [reward, setReward] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/wallet/1`);
        if (!res.ok) throw new Error("wallet not found");
        const data = await res.json();
        setWallet(data);
        setXp(data.xp || 0);
        setLevel(data.level || 1);
        setBadges(data.badges || []);
      } catch {
        setWallet({ balance: 1000, symbol: "C4T" });
      }
    }
    load();
  }, []);

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws");
    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.type === "reward") {
          setWallet((p) => ({ ...p, balance: msg.new_balance || p.balance }));
          setXp(msg.xp_total || xp);
          setLevel(msg.level || level);
          setBadges(msg.all_badges || badges);
          const text = msg.message || "Reward received!";
          setReward(text);
          setTimeout(() => setReward(null), 5000);
        }
      } catch {}
    };
    return () => ws.close();
  }, [xp, level, badges]);

  if (!wallet)
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-yellow-400 animate-pulse">
        Loading walletÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦
      </div>
    );

  const { balance, symbol } = wallet;

  return (
    <div className="p-6 min-h-screen bg-black text-white relative">
      <motion.h1
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-yellow-400 mb-6"
      >
        ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â° My Core4 Wallet
      </motion.h1>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-md mx-auto shadow-lg">
        {/* Balance */}
        <div className="flex justify-between mb-3">
          <span className="text-gray-400">Balance</span>
          <span className="text-emerald-400 text-2xl font-bold">
            {balance?.toFixed?.(2) ?? "0.00"} {symbol ?? "C4T"}
          </span>
        </div>

        {/* XP */}
        <div className="mt-6">
          <p className="text-sm text-zinc-400 mb-1">
            Level {level} ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Experience
          </p>
          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
              animate={{ width: `${Math.min(xp, 100)}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-xs text-zinc-500 mt-1">{xp} / 100 XP</p>
        </div>

        {/* Badges */}
        <div className="mt-6">
          <p className="text-sm text-zinc-400 mb-2">Achievements</p>
          <div className="flex flex-wrap gap-2">
            {badges.length === 0 && (
              <span className="text-xs text-zinc-500">No badges yet</span>
            )}
            {badges.map((b, i) => (
              <motion.span
                key={i}
                className="bg-gradient-to-r from-yellow-500 to-amber-400 text-black px-2 py-1 rounded-lg text-xs font-semibold shadow"
                whileHover={{ scale: 1.1 }}
              >
                {b}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-8">
          <button
            onClick={() => navigate("/groups")}
            className="py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-400 text-black font-semibold hover:from-emerald-400 hover:to-green-300 transition-all"
          >
            ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â¥ My Group
          </button>
          <button
            onClick={() => navigate("/rewards")}
            className="py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-400 text-black font-semibold hover:from-yellow-400 hover:to-amber-300 transition-all"
          >
            ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â Rewards
          </button>
        </div>

        {/* ÃƒÂ°Ã…Â¸Ã‚ÂªÃ…Â¾ New Twin Button */}
        <button
          onClick={() => (window.location.href = "/ai-arena")}
          className="mt-6 w-full py-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-semibold hover:from-fuchsia-400 hover:to-purple-500 transition-all"
        >
          ÃƒÂ°Ã…Â¸Ã‚ÂªÃ…Â¾ Test My AI Twin
        </button>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {reward && (
          <motion.div
            className="fixed bottom-6 right-6 bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
          >
            {reward}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


