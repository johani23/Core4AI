// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ SocialPulse.jsx (MVP-34 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œUnified WS + Global Mood IndexÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Connects to unified WebSocket endpoint: /ws
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Listens for global 'sentiment_update' broadcasts
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Displays live Global Mood Index + Tribe Cards
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Fallback: auto-refresh from /market endpoint if WS closes
// ============================================================


const API_BASE = "http://127.0.0.1:8000";

export default function SocialPulse() {
  const [tribes, setTribes] = useState([]);
  const [globalMood, setGlobalMood] = useState(50.0);
  const [status, setStatus] = useState("ConnectingÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦");
  const [lastUpdate, setLastUpdate] = useState(null);

  // ------------------------------------------------------------
  // ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¡ Load tribes (initial snapshot)
  // ------------------------------------------------------------
  async function loadTribes() {
    try {
      const res = await fetch(`${API_BASE}/market`);
      const data = await res.json();

      // Generate static tribe placeholders from price baseline
      const base = data.price || 3.42;
      const fakeTribes = [
        { id: 1, name: "Core4AI 001", mood: globalMood, price: base + 0.1 },
        { id: 2, name: "Core4AI 002", mood: globalMood, price: base - 0.05 },
        { id: 3, name: "Core4AI 003", mood: globalMood, price: base },
      ];
      setTribes(fakeTribes);
      setLastUpdate(new Date().toLocaleTimeString());
      setStatus("Online");
    } catch (err) {
      console.error("ÃƒÂ¢Ã‚ÂÃ…â€™ Failed to load tribes:", err);
      setStatus("Offline");
    }
  }

  // ------------------------------------------------------------
  // ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â  WebSocket connection to unified /ws
  // ------------------------------------------------------------
  useEffect(() => {
    loadTribes();

    const ws = new WebSocket("ws://127.0.0.1:8000/ws");

    ws.onopen = () => {
      console.log("ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Connected to /ws");
      setStatus("Live");
    };

    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);

        // ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â© Handle AI Sentiment update
        if (msg.type === "sentiment_update" && msg.global_mood) {
          const newMood = msg.global_mood;
          setGlobalMood(newMood);

          // Update tribesÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ mood locally
          setTribes((prev) =>
            prev.map((t) => ({
              ...t,
              mood: newMood,
            }))
          );

          setLastUpdate(new Date().toLocaleTimeString());
        }

        // ÃƒÂ°Ã…Â¸Ã‚ÂªÃ¢â€žÂ¢ Optional market update broadcast
        if (msg.event === "market_update" && msg.tribes) {
          setTribes(msg.tribes);
          setLastUpdate(new Date().toLocaleTimeString());
        }
      } catch (err) {
        console.warn("ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â Invalid WS message:", err);
      }
    };

    ws.onerror = () => setStatus("Disconnected");
    ws.onclose = () => {
      console.warn("ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â WebSocket closed, enabling polling...");
      setStatus("PollingÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦");
      const poll = setInterval(loadTribes, 6000);
      return () => clearInterval(poll);
    };

    return () => ws.close();
  }, []);

  // ------------------------------------------------------------
  // ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨ Mood color logic
  // ------------------------------------------------------------
  const moodColor =
    globalMood > 65
      ? "text-red-400"
      : globalMood < 40
      ? "text-blue-400"
      : globalMood >= 45 && globalMood <= 55
      ? "text-green-400"
      : "text-purple-400";

  const moodLabel =
    globalMood > 65
      ? "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥ Excited"
      : globalMood < 40
      ? "ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â§ Low"
      : globalMood >= 45 && globalMood <= 55
      ? "ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¿ Calm"
      : "ÃƒÂ¢Ã…Â¡Ã‚Â¡ Mixed";

  // ------------------------------------------------------------
  // ÃƒÂ°Ã…Â¸Ã¢â‚¬â€œÃ‚Â¼ÃƒÂ¯Ã‚Â¸Ã‚Â Render
  // ------------------------------------------------------------
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-yellow-400">Social Pulse</h1>
        <div className="text-right">
          <p className="text-sm text-gray-400">
            Status: <span className="text-yellow-400">{status}</span>
          </p>
          <p className="text-xs text-gray-500">
            Last update: {lastUpdate || "ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â"}
          </p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">
        Global Mood Index:{" "}
        <span className={`${moodColor} font-bold`}>
          {globalMood.toFixed(1)}%
        </span>{" "}
        <span className="ml-2 text-sm text-gray-400">{moodLabel}</span>
      </h2>

      {/* ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â© Tribe Mood Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tribes.map((t) => (
          <div
            key={t.id}
            className="bg-gradient-to-b from-gray-800 to-gray-900 border border-green-700 rounded-2xl p-5 shadow-md transition-all hover:scale-[1.02]"
          >
            <h3 className="text-lg font-semibold mb-1">{t.name}</h3>
            <p className="text-gray-400 text-sm mb-2">
              ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â° Price: <span className="text-yellow-300">{t.price.toFixed(2)} C4T</span>
            </p>
            <p className={`text-lg font-bold ${moodColor}`}>
              Mood: {t.mood.toFixed(1)}%
            </p>
            <p className="text-xs text-gray-500 mt-1">0 interactions</p>
          </div>
        ))}
      </div>
    </div>
  );
}


