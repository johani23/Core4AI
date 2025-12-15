// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ ClusterBoard.jsx (MVP-34 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œUnified WS + AI Sentiment ReadyÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Uses unified WebSocket endpoint: /ws
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Compatible with MVP-34 backend (AI Sentiment Engine)
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Graceful fallback if WS disconnects
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Periodic polling backup every 6s
// ============================================================


const API_BASE = "http://127.0.0.1:8000";

export default function ClusterBoard() {
  const [tribes, setTribes] = useState([]);
  const [status, setStatus] = useState("ConnectingÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦");
  const [lastUpdate, setLastUpdate] = useState(null);

  // ------------------------------------------------------------
  // ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â  Load market tribes initially + establish unified WebSocket
  // ------------------------------------------------------------
  useEffect(() => {
    loadMarketTribes();

    const ws = new WebSocket("ws://127.0.0.1:8000/ws");

    ws.onopen = () => {
      console.log("ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Connected to /ws");
      setStatus("Live");
    };

    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);

        // Handle broadcast from sentiment engine or market
        if (msg.type === "sentiment_update") {
          // Example broadcast from backend: update mood or scores
          console.log("ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â  Sentiment update:", msg);
        }

        if (msg.event === "market_update" && msg.tribes) {
          setTribes(msg.tribes);
          setLastUpdate(new Date().toLocaleTimeString());
        }
      } catch (err) {
        console.warn("ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â Invalid WS payload", err);
      }
    };

    ws.onerror = () => setStatus("Disconnected");

    ws.onclose = () => {
      console.warn("ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â WebSocket closed, switching to polling.");
      setStatus("PollingÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦");
      const poll = setInterval(loadMarketTribes, 6000);
      return () => clearInterval(poll);
    };

    return () => ws.close();
  }, []);

  // ------------------------------------------------------------
  // ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¡ Backup HTTP fetch if WS is unavailable
  // ------------------------------------------------------------
  async function loadMarketTribes() {
    try {
      const res = await fetch(`${API_BASE}/market`);
      const data = await res.json();

      // Mock mapping for display (no /market/tribes in MVP-34)
      const mockTribes = [
        { id: 1, name: "Core4AI 001", price: data.price + 0.1, trend: "neutral" },
        { id: 2, name: "Core4AI 002", price: data.price - 0.05, trend: "neutral" },
        { id: 3, name: "Core4AI 003", price: data.price, trend: "neutral" },
      ];

      setTribes(mockTribes);
      setLastUpdate(new Date().toLocaleTimeString());
      setStatus("Online");
    } catch (err) {
      console.error("ÃƒÂ¢Ã‚ÂÃ…â€™ Cannot reach backend:", err);
      setStatus("Offline");
    }
  }

  // ------------------------------------------------------------
  // ÃƒÂ°Ã…Â¸Ã¢â‚¬â€œÃ‚Â¼ÃƒÂ¯Ã‚Â¸Ã‚Â Render
  // ------------------------------------------------------------
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-4">ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â  Cluster Market Board</h1>
      <p className="text-sm text-gray-400 mb-6">
        Status: <span className="text-yellow-400">{status}</span> ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Last update:{" "}
        {lastUpdate || "ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â"}
      </p>

      {tribes.length === 0 ? (
        <p className="text-gray-500">Loading tribe dataÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tribes.map((t) => (
            <div
              key={t.id}
              className="bg-gradient-to-b from-gray-800 to-gray-900 p-4 rounded-2xl shadow-md border border-gray-700 transition-all hover:scale-[1.02]"
            >
              <h2 className="text-xl font-semibold mb-1">
                {t.name || `Tribe ${t.id}`}
              </h2>
              <p className="text-yellow-300 text-lg">
                ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â° {t.price?.toFixed(2) ?? "ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â"} C4T
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Trend:{" "}
                <span
                  className={
                    t.trend === "up"
                      ? "text-green-400"
                      : t.trend === "down"
                      ? "text-red-400"
                      : "text-gray-400"
                  }
                >
                  {t.trend || "neutral"}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


