// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ FeedTester.jsx (v1.0 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œCredibility QA HarnessÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Sends auto-generated posts to /api/content/score
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Displays AI score breakdowns including Credibility
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Polls /credibility/heatmap to show Tribe Trust Index
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Works independently from Feed.jsx
// ============================================================


const API_BASE = "http://127.0.0.1:8000";

const samplePosts = [
  "AI will replace 90% of jobs by 2030!",
  "Laughter reduces stress by 30% according to health studies.",
  "The Moon is made of cheese.",
  "Regular exercise improves memory retention by 25%.",
  "Cats can detect earthquakes before humans do.",
];

export default function FeedTester() {
  const [results, setResults] = useState([]);
  const [trust, setTrust] = useState({});
  const [loading, setLoading] = useState(false);

  const sendPost = async (text, creator_id = "testerA") => {
    const res = await fetch(`${API_BASE}/api/content/score`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ creator_id, text }),
    });
    const data = await res.json();
    return data;
  };

  const runTest = async () => {
    setLoading(true);
    setResults([]);
    for (let i = 0; i < samplePosts.length; i++) {
      const data = await sendPost(samplePosts[i]);
      setResults((prev) => [...prev, data]);
      await new Promise((r) => setTimeout(r, 800)); // delay between posts
    }
    setLoading(false);
  };

  const fetchTrustMap = async () => {
    const res = await fetch(`${API_BASE}/credibility/heatmap`);
    const data = await res.json();
    setTrust(data);
  };

  useEffect(() => {
    fetchTrustMap();
    const interval = setInterval(fetchTrustMap, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-8 py-10">
      <h1 className="text-2xl font-bold mb-2 text-center">
        ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â  Core4.AI FeedTester
      </h1>
      <p className="text-center text-gray-400 mb-8">
        Auto-evaluates 5 demo posts ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ monitors Tribe Trust Heatmap
      </p>

      <div className="text-center mb-8">
        <button
          onClick={runTest}
          disabled={loading}
          className={`px-6 py-2 rounded-lg font-semibold ${
            loading ? "bg-zinc-700 text-gray-400" : "bg-purple-700 hover:bg-purple-600"
          }`}
        >
          {loading ? "Testing..." : "Run Feed Test"}
        </button>
      </div>

      {/* Tribe Trust Heatmap */}
      <div className="bg-zinc-900 p-4 rounded-xl max-w-3xl mx-auto mb-10">
        <h2 className="text-lg font-semibold mb-2 text-purple-400">
          ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â­ Tribe Trust Index
        </h2>
        {Object.keys(trust).length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {Object.entries(trust).map(([tribe, value]) => (
              <div
                key={tribe}
                className="bg-zinc-800 rounded-lg p-3 border border-zinc-700"
              >
                <p className="font-medium text-gray-300">{tribe}</p>
                <p
                  className={`text-xl font-bold ${
                    value > 0.75
                      ? "text-green-400"
                      : value > 0.5
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {(value * 100).toFixed(1)}%
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No data yet...</p>
        )}
      </div>

      {/* Results */}
      <div className="max-w-4xl mx-auto space-y-6">
        {results.map((r, i) => (
          <div
            key={i}
            className="bg-zinc-900 p-4 rounded-xl border border-zinc-800"
          >
            <p className="text-sm text-gray-400 mb-2">
              #{i + 1} ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â <span className="text-gray-300">{r.tribe}</span>
            </p>
            <p className="text-white mb-3 italic">
              {samplePosts[i] || "Sample text"}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div>ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¡ Insight: <span className="text-blue-400">{r.insight}%</span></div>
              <div>ÃƒÂ¢Ã…â€œÃ‚Â¨ Originality: <span className="text-green-400">{r.originality}%</span></div>
              <div>ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥ Engagement: <span className="text-yellow-400">{r.engagement}%</span></div>
              <div>ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â­ Credibility: <span className="text-purple-400">{r.credibility}%</span></div>
            </div>
            <div className="mt-2 text-gray-400 text-xs">
              Score: <span className="text-white">{(r.score * 100).toFixed(1)}%</span> ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Tokens:{" "}
              <span className="text-amber-400">{r.tokens}</span> ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Dopamine:{" "}
              <span className="text-pink-400">{r.dopamine}</span>
            </div>
            {r.credibility < 50 && (
              <p className="text-red-400 text-xs mt-1">
                ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â Low credibility detected (possible misinformation)
              </p>
            )}
          </div>
        ))}
      </div>

      {!results.length && (
        <p className="text-center text-gray-600 mt-10 text-sm">
          Press ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œRun Feed TestÃƒÂ¢Ã¢â€šÂ¬Ã‚Â to send 5 posts for evaluation.
        </p>
      )}
    </div>
  );
}


