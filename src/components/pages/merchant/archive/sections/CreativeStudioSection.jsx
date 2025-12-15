// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ CreativeStudioSection.jsx (v6.0 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ FINAL STABLE / Zero Crash)
// ============================================================================


export default function CreativeStudioSection({ product, onLoaded }) {
  const [creative, setCreative] = useState(null);
  const [loading, setLoading] = useState(false);

  const safe = (arr) => (Array.isArray(arr) ? arr : []);

  useEffect(() => {
    if (product) generateCreative();
  }, [product]);

  const generateCreative = async () => {
    setLoading(true);
    setCreative(null);

    try {
      const res = await fetch("/api/creative/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_name: product.name,
          message: `ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â  Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ ${product.name}`,
          tone: "friendly",
          target: "Saudi Youth",
        }),
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

  if (!product) return null;

  return (
    <div className="bg-white border rounded-xl p-6 mt-6 shadow-sm">
      <h2 className="text-xl font-bold text-green-700 mb-4">
        ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¨ Creative Studio ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¯ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â­ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Â° ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¹Ãƒâ„¢Ã…Â 
      </h2>

      {loading && (
        <p className="text-gray-500">ÃƒÂ¢Ã‚ÂÃ‚Â³ ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â  ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¯ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â­ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Â°ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦</p>
      )}

      {/* ERROR */}
      {creative?.error && (
        <p className="text-red-600">{creative.error}</p>
      )}

      {/* CONTENT */}
      {!loading && creative && !creative.error && (
        <div className="bg-gray-50 border rounded-lg p-4 mt-4 space-y-8">

          {/* STORYBOARD */}
          <div>
            <h3 className="font-bold mb-2">ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¬ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â  ÃƒËœÃ‚Â¨Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â±ÃƒËœÃ‚Â¯</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              {safe(creative.storyboard).map((s, i) => (
                <li key={i}>
                  Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â´Ãƒâ„¢Ã¢â‚¬Â¡ÃƒËœÃ‚Â¯ {s.scene}: {s.script} ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â ({s.shot})
                </li>
              ))}
            </ul>
          </div>

          {/* HOOKS */}
          <div>
            <h3 className="font-bold mt-6 mb-2">ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â² Hooks</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              {safe(creative.hooks).map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>

          {/* TIKTOK PACK */}
          <div>
            <h3 className="font-bold mt-6 mb-2">ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¥ TikTok Pack</h3>
            <ul className="space-y-2 pl-1">
              {safe(creative.tiktok_pack).map((item, i) => (
                <li key={i} className="p-3 bg-white border rounded">
                  <p className="font-bold">{item.format}</p>
                  <p className="text-sm text-gray-700">{item.script}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* REELS PACK */}
          <div>
            <h3 className="font-bold mt-6 mb-2">ÃƒÂ°Ã…Â¸Ã…Â½Ã…Â¾ÃƒÂ¯Ã‚Â¸Ã‚Â Reels Pack</h3>
            <ul className="space-y-2 pl-1">
              {safe(creative.reels_pack).map((item, i) => (
                <li key={i} className="p-3 bg-white border rounded">
                  <p className="font-bold">{item.hook}</p>
                  <p className="text-sm text-gray-700">{item.script}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* CAROUSEL PACK */}
          <div>
            <h3 className="font-bold mt-6 mb-2">ÃƒÂ°Ã…Â¸Ã¢â‚¬â€œÃ‚Â¼ÃƒÂ¯Ã‚Â¸Ã‚Â Carousel Pack</h3>
            <ul className="space-y-2 pl-1">
              {safe(creative.carousel_pack).map((item, i) => (
                <li key={i} className="p-3 bg-white border rounded">
                  <p className="font-bold">{item.title}</p>
                  <p className="text-sm text-gray-700">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  );
}


