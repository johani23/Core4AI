// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ BuyerWTP.jsx (Phase 5 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Buyer Pricing Input Screen)
// ============================================================================


export default function BuyerWTP() {
  const [feature, setFeature] = useState("");
  const [value, setValue] = useState("");
  const [avg, setAvg] = useState(null);

  const submit = async () => {
    const res = await fetch("/api/wtp/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        feature,
        value: parseFloat(value)
      })
    });

    const data = await res.json();
    setAvg(data.avg);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white border rounded-xl shadow">

      <h2 className="text-xl font-bold text-green-700 mb-4">
        ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Âµ Ãƒâ„¢Ã†â€™Ãƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¯Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¹ Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¨Ãƒâ„¢Ã¢â‚¬Å¾ Ãƒâ„¢Ã¢â‚¬Â¡ÃƒËœÃ‚Â°Ãƒâ„¢Ã¢â‚¬Â¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â²ÃƒËœÃ‚Â©ÃƒËœÃ…Â¸
      </h2>

      <input
        type="text"
        placeholder="Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â«ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾: inverter / silent"
        value={feature}
        onChange={e => setFeature(e.target.value)}
        className="w-full p-3 border rounded mb-3"
      />

      <input
        type="number"
        placeholder="Ãƒâ„¢Ã†â€™Ãƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚ÂªÃƒËœÃ‚Â³ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Å¡ Ãƒâ„¢Ã¢â‚¬Â¡ÃƒËœÃ‚Â°Ãƒâ„¢Ã¢â‚¬Â¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â²ÃƒËœÃ‚Â©ÃƒËœÃ…Â¸"
        value={value}
        onChange={e => setValue(e.target.value)}
        className="w-full p-3 border rounded mb-3"
      />

      <button
        onClick={submit}
        className="w-full bg-green-700 text-white py-3 rounded-lg"
      >
        ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â±ÃƒËœÃ‚Â³ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾
      </button>

      {avg !== null && (
        <p className="mt-4 text-center font-bold text-green-800">
          Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ ÃƒËœÃ‚Â³ÃƒËœÃ‚Â· Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â§ Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¯Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Â¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â´ÃƒËœÃ‚ÂªÃƒËœÃ‚Â±Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Â  Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¡ÃƒËœÃ‚Â°Ãƒâ„¢Ã¢â‚¬Â¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â²ÃƒËœÃ‚Â©: {avg} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³
        </p>
      )}
    </div>
  );
}


