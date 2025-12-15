// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ BuyerConfidence.jsx (Phase 7 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Confidence Score UI)
// ============================================================================


export default function BuyerConfidence() {
  const [product, setProduct] = useState("");
  const [result, setResult] = useState(null);

  const calc = async () => {
    const res = await fetch("/api/confidence/calc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_name: product }),
    });

    const data = await res.json();
    setResult(data);
  };

  const get = async () => {
    const res = await fetch("/api/confidence/get", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_name: product }),
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white border rounded-xl shadow">

      <h2 className="text-xl font-bold text-green-700 mb-4">
        ÃƒÂ¢Ã‚Â­Ã‚Â Buyer Confidence Score
      </h2>

      <input
        type="text"
        placeholder="ÃƒËœÃ‚Â§ÃƒËœÃ‚Â³Ãƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬..."
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        className="w-full p-3 border rounded mb-3"
      />

      <button
        onClick={calc}
        className="w-full bg-green-700 text-white py-3 rounded-lg mb-2"
      >
        ÃƒËœÃ‚Â­ÃƒËœÃ‚Â³ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¨ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â«Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â©
      </button>

      <button
        onClick={get}
        className="w-full bg-gray-700 text-white py-3 rounded-lg"
      >
        ÃƒËœÃ‚Â¬Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¨ ÃƒËœÃ‚Â¢ÃƒËœÃ‚Â®ÃƒËœÃ‚Â± Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒâ„¢Ã…Â ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â©
      </button>

      {result && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <p><strong>WTP Avg:</strong> {result.wtp}</p>
          <p><strong>Sentiments:</strong> {Array.isArray(result.sentiments) ? result.sentiments.join(", ") : ""}</p>
          <p><strong>Confidence:</strong> {result.confidence}%</p>
        </div>
      )}
    </div>
  );
}


