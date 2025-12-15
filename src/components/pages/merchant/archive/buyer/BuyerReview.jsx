// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ BuyerReview.jsx (Phase 6 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Buyer Review Input)
// ============================================================================


export default function BuyerReview() {
  const [product, setProduct] = useState("");
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const load = async () => {
    if (!product) return;
    const res = await fetch("/api/review/list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_name: product }),
    });
    const data = await res.json();
    setReviews(data.reviews);
  };

  const send = async () => {
    await fetch("/api/review/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_name: product, review }),
    });
    setReview("");
    load();
  };

  useEffect(() => {
    load();
  }, [product]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white border rounded-xl shadow">

      <h2 className="text-xl font-bold text-green-700 mb-4">
        ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â ÃƒËœÃ‚Â¢ÃƒËœÃ‚Â±ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â´ÃƒËœÃ‚ÂªÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â  (Buyer Reviews)
      </h2>

      <input
        type="text"
        placeholder="ÃƒËœÃ‚Â§ÃƒËœÃ‚Â³Ãƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        className="w-full p-3 border rounded mb-3"
      />

      <textarea
        placeholder="ÃƒËœÃ‚Â§Ãƒâ„¢Ã†â€™ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¨ ÃƒËœÃ‚Â±ÃƒËœÃ‚Â£Ãƒâ„¢Ã…Â Ãƒâ„¢Ã†â€™..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="w-full p-3 border rounded mb-3"
        rows={3}
      />

      <button
        onClick={send}
        className="w-full bg-green-700 text-white py-3 rounded-lg"
      >
        ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â±ÃƒËœÃ‚Â³ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾
      </button>

      <div className="mt-6 space-y-3">
        {reviews.map((r, i) => (
          <div key={i} className="p-3 border rounded bg-gray-50">
            <p className="font-semibold">{r.review}</p>
            <p className="text-sm text-gray-600">
              {r.sentiment} (score {r.score})
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}


