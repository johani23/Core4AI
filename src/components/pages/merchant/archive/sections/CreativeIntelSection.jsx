// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ CreativeStudioSection.jsx (v8.0 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œPOST Sync + onLoadedÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ============================================================================


export default function CreativeStudioSection({ product, onLoaded }) {
  const [creative, setCreative] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) generateCreative();
  }, [product]);

  const generateCreative = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/creative/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_name: product.name,
          message: `ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â  Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ ${product.name}`,
          tone: "friendly",
          target_audience: "Saudi Youth"
        })
      });

      const data = await res.json();
      setCreative(data);
      onLoaded && onLoaded(data);

    } catch (err) {
      console.error(err);
      setCreative({ error: "ÃƒÂ¢Ã‚ÂÃ…â€™ Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â´Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¯ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â­ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Â°" });
    }

    setLoading(false);
  };

  return (
    <div className="bg-white border rounded-xl p-6 mt-6 shadow-sm">
      <h2 className="text-xl font-bold text-green-700 mb-4">
        ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨ Creative Studio ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â­ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Â° ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¹Ãƒâ„¢Ã…Â 
      </h2>

      {loading && <p className="text-gray-500">ÃƒÂ¢Ã‚ÂÃ‚Â³ ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â  ÃƒËœÃ‚Â¥Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â´ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¹ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦</p>}

      {creative && (
        <div className="bg-gray-50 border p-4 rounded">
          <h3 className="font-bold mb-2">ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¬ Storyboard</h3>
          <ul className="list-disc pl-6 text-gray-700">
            {creative?.storyboard?.map((s, i) => (
              <li key={i}>{s.script}</li>
            ))}
          </ul>

          <h3 className="font-bold mt-4">ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¤ Hooks</h3>
          <ul className="list-disc pl-6">
            {creative?.ads?.slice(0, 3).map((ad, i) => (
              <li key={i}>{ad.hook}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


