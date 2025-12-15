// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ CreativeStudio.jsx (v5.0 FIXED ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Stable + Safe + API-Aligned)
// ============================================================================

import toast from "react-hot-toast";

export default function CreativeStudio({ productName }) {
  const [creative, setCreative] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!productName) return;
    generateCreative();
  }, [productName]);

  const generateCreative = async () => {
    if (!productName) return;

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/creative/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_name: productName,
          message: `Introducing ${productName}`,
          tone: "friendly",
          target: "Saudi Youth",
        }),
      });

      const data = await res.json();
      setCreative(data);

    } catch (err) {
      console.error(err);
      toast.error("ÃƒÂ¢Ã‚ÂÃ…â€™ Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â´Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¯ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â­ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Â° ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¹Ãƒâ„¢Ã…Â ");
    }

    setLoading(false);
  };

  if (!productName) {
    return (
      <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-xl border shadow text-center">
        Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ Ãƒâ„¢Ã…Â ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­ÃƒËœÃ‚Â¯Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¯ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â¯.
      </div>
    );
  }

  const safe = (arr) => (Array.isArray(arr) ? arr : []);

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-xl shadow border">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-green-700">
            Creative Studio ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ÃƒËœÃ‚Â³ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¯Ãƒâ„¢Ã…Â Ãƒâ„¢Ã‹â€  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¹Ãƒâ„¢Ã…Â 
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¯ ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¦Ãƒâ„¢Ã…Â  Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Â¡ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã‚ÂÃƒâ„¢Ã…Â ÃƒËœÃ‚Â¯Ãƒâ„¢Ã…Â Ãƒâ„¢Ã‹â€  + Hooks + Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â­ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Â° ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¡ÃƒËœÃ‚Â².
          </p>
          <p className="mt-2 text-sm text-gray-700">
            ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬: <span className="font-semibold">{productName}</span>
          </p>
        </div>

        <button
          onClick={generateCreative}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-green-700 text-white text-sm font-semibold hover:bg-green-800 disabled:opacity-60"
        >
          {loading ? "ÃƒÂ¢Ã‚ÂÃ‚Â³ ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¯..." : "ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾ ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¯"}
        </button>
      </div>

      {loading && (
        <p className="text-gray-600 text-sm">ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â  ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¯ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â­ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Â° ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¹Ãƒâ„¢Ã…Â ...</p>
      )}

      {/* CONTENT */}
      {!loading && creative && (
        <div className="space-y-10">

          {/* STORYBOARD */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¬ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â Ãƒâ„¢Ã‹â€ </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {safe(creative.storyboard).map((scene, idx) => (
                <div key={idx} className="p-4 bg-gray-50 border rounded-lg shadow-sm">
                  <p className="font-bold text-green-700 mb-1">
                    Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â´Ãƒâ„¢Ã¢â‚¬Â¡ÃƒËœÃ‚Â¯ {scene.scene} ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ {scene.shot}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">{scene.script}</p>
                  <p className="text-xs text-gray-500">{scene.camera}</p>
                </div>
              ))}
            </div>
          </div>

          {/* HOOKS */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â² Hooks</h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              {safe(creative.hooks).map((h, idx) => (
                <li key={idx}>{h}</li>
              ))}
            </ul>
          </div>

          {/* TIKTOK PACK */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¥ TikTok Pack</h3>

            <div className="space-y-3">
              {safe(creative.tiktok_pack).map((item, idx) => (
                <div key={idx} className="p-4 bg-gray-50 border rounded-lg">
                  <p className="font-bold">{item.format}</p>
                  <p className="text-sm text-gray-700">{item.script}</p>
                </div>
              ))}
            </div>
          </div>

          {/* REELS PACK */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">ÃƒÂ°Ã…Â¸Ã…Â½Ã…Â¾ÃƒÂ¯Ã‚Â¸Ã‚Â Reels Pack</h3>

            <div className="space-y-3">
              {safe(creative.reels_pack).map((item, idx) => (
                <div key={idx} className="p-4 bg-gray-50 border rounded-lg">
                  <p className="font-bold">{item.hook}</p>
                  <p className="text-sm text-gray-700">{item.script}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CAROUSEL PACK */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">ÃƒÂ°Ã…Â¸Ã¢â‚¬â€œÃ‚Â¼ÃƒÂ¯Ã‚Â¸Ã‚Â Carousel Pack</h3>

            <div className="space-y-3">
              {safe(creative.carousel_pack).map((item, idx) => (
                <div key={idx} className="p-4 bg-gray-50 border rounded-lg">
                  <p className="font-bold">{item.title}</p>
                  <p className="text-sm text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {!loading && !creative && (
        <p className="mt-4 text-sm text-gray-500">
          Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ Ãƒâ„¢Ã…Â ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¯ ÃƒËœÃ‚Â£Ãƒâ„¢Ã…Â  Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â­ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Â° ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â¯. ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¶ÃƒËœÃ‚ÂºÃƒËœÃ‚Â· "ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¯".
        </p>
      )}
    </div>
  );
}


