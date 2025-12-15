// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Reflection.jsx
// Awareness Mirror: record motive + display live awareness gain
// ============================================================

import { motion } from "framer-motion";

const API = "http://127.0.0.1:8000";

export default function Reflection() {
  const [motive, setMotive] = useState("");
  const [response, setResponse] = useState("");
  const [pulse, setPulse] = useState({ active_reflections: 0, avg_gain: 0 });

  useEffect(() => {
    // WebSocket live awareness feed
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/reflection");
    ws.onmessage = (msg) => {
      try {
        setPulse(JSON.parse(msg.data));
      } catch {}
    };
    return () => ws.close();
  }, []);

  async function submitReflection() {
    if (!motive) return;
    try {
      const res = await fetch(`${API}/pulse/reflect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: 1,
          content_id: 1,
          motive: motive,
        }),
      });
      const data = await res.json();
      setResponse(data.message);
      setMotive("");
    } catch (err) {
      console.error("Reflection error:", err);
      setResponse("Error submitting reflection.");
    }
  }

  const motives = [
    { key: "curiosity", label: "ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â€šÂ¬ Curiosity" },
    { key: "inspiration", label: "ÃƒÂ°Ã…Â¸Ã…â€™Ã…Â¸ Inspiration" },
    { key: "validation", label: "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬ Validation" },
    { key: "boredom", label: "ÃƒÂ°Ã…Â¸Ã‹Å“Ã‚Â´ Boredom" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">ÃƒÂ°Ã…Â¸Ã‚ÂªÃ…Â¾ Awareness Mirror</h2>

      {/* Live awareness stats */}
      <div className="bg-gray-900 p-4 rounded-2xl border border-gray-700 mb-6">
        <h3 className="text-lg font-semibold mb-2">Live Awareness Pulse</h3>
        <p className="text-gray-400 text-sm">
          Active reflections: {pulse.active_reflections}
        </p>
        <p className="text-gray-400 text-sm">
          Avg awareness gain: {pulse.avg_gain}
        </p>
      </div>

      {/* Reflection form */}
      <div className="bg-gray-900 p-4 rounded-2xl border border-gray-700">
        <h3 className="font-semibold mb-3 text-lg">
          What motivated your last action?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {motives.map((m) => (
            <motion.button
              whileTap={{ scale: 0.9 }}
              key={m.key}
              onClick={() => setMotive(m.key)}
              className={`px-3 py-2 rounded-xl text-sm border ${
                motive === m.key
                  ? "bg-yellow-500 text-black border-yellow-400"
                  : "border-gray-700 hover:border-yellow-400"
              }`}
            >
              {m.label}
            </motion.button>
          ))}
        </div>

        <button
          onClick={submitReflection}
          className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-xl text-sm font-semibold"
        >
          Submit Reflection
        </button>

        {response && (
          <p className="mt-4 text-sm text-yellow-400 animate-pulse">
            {response}
          </p>
        )}
      </div>
    </div>
  );
}


