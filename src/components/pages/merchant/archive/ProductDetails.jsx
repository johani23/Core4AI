// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ ProductDetails.jsx ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â v22 ML Integrated Snapshot + Apply AI Price
// ============================================================================

import { useParams, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import CompetitorTable from "../../components/merchant/CompetitorTable";

export default function ProductDetails() {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [mlOverview, setMlOverview] = useState(null);
  const [mlRecommendation, setMlRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  // ============================================================================
  // LOAD PRODUCT + ML PRICING
  // ============================================================================

  useEffect(() => {
    load();
  }, [productId]);

  const load = async () => {
    try {
      // Load product (from merchant inventory)
      const p = await axios.get(`/api/merchant/merchant_001/products`);
      const found = p.data.find((x) => x.product_id === productId);
      setProduct(found || null);

      // Load ML pricing overview
      const over = await axios.get(`/api/pricing/overview/${productId}`);
      setMlOverview(over.data);

      // Load ML recommendation
      const rec = await axios.get(`/api/pricing/recommendation/${productId}`);
      setMlRecommendation(rec.data);

    } catch (err) {
      console.error("Error loading product:", err);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================================
  // APPLY AI PRICE (using ML recommended price)
  // ============================================================================

  const applyAIPrice = async () => {
    if (!mlRecommendation) return;

    setApplying(true);

    try {
      const newPrice = mlRecommendation.suggested_price;

      const res = await fetch(`/api/product/${productId}/update-price`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: newPrice }),
      });

      if (res.ok) {
        toast.success("ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬â€œ ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚ÂªÃƒËœÃ‚Â·ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚ÂªÃƒËœÃ‚Â±ÃƒËœÃ‚Â­ ÃƒËœÃ‚Â¨Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â­");
        load();
      } else {
        toast.error("ÃƒÂ¢Ã‚ÂÃ…â€™ Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â´Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚ÂªÃƒËœÃ‚Â·ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚ÂªÃƒËœÃ‚Â±ÃƒËœÃ‚Â­");
      }
    } catch (e) {
      toast.error("ÃƒÂ¢Ã‚ÂÃ…â€™ Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã†â€™Ãƒâ„¢Ã¢â‚¬Â  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ÃƒËœÃ‚ÂªÃƒËœÃ‚ÂµÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â®ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¯Ãƒâ„¢Ã¢â‚¬Â¦");
    }

    setApplying(false);
  };

  // ============================================================================
  // UI
  // ============================================================================

  if (loading) return <div className="p-6 text-gray-600">ÃƒÂ¢Ã‚ÂÃ‚Â³ ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾...</div>;
  if (!product) return <div className="p-6 text-red-600">ÃƒÂ¢Ã‚ÂÃ…â€™ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ ÃƒËœÃ‚ÂºÃƒâ„¢Ã…Â ÃƒËœÃ‚Â± Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¬Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¯.</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">

      {/* TITLE */}
      <h1 className="text-3xl font-extrabold text-[#006C35] mb-6">
        ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦ ÃƒËœÃ‚ÂªÃƒâ„¢Ã‚ÂÃƒËœÃ‚Â§ÃƒËœÃ‚ÂµÃƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬
      </h1>

      {/* PRODUCT CARD */}
      <div className="bg-white border p-6 rounded-xl shadow mb-8">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-60 object-cover rounded-md"
        />

        <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
        <p className="text-gray-600 mt-2">{product.description}</p>

        <p className="text-lg font-semibold mt-3">
          ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Âµ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â :{" "}
          <span className="text-green-700">{product.price} SAR</span>
        </p>

        {/* ML SNAPSHOT */}
        {mlOverview && (
          <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="text-xl font-bold mb-3">ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬â€œ Snapshot (ML v22)</h3>

            <p className="text-lg font-semibold text-green-700">
              ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚ÂªÃƒËœÃ‚Â±ÃƒËœÃ‚Â­: {mlOverview.suggested_price} SAR
            </p>

            <p className="text-gray-700 mt-1">
              ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â·ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â«ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â : {mlOverview.optimal_range}
            </p>

            <p className="text-gray-700 mt-3">
              ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ÃƒËœÃ‚Â³ÃƒËœÃ‚ÂªÃƒËœÃ‚Â±ÃƒËœÃ‚Â§ÃƒËœÃ‚ÂªÃƒâ„¢Ã…Â ÃƒËœÃ‚Â¬Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â©: {mlOverview.strategy}
            </p>

            <button
              onClick={applyAIPrice}
              disabled={applying}
              className="mt-4 px-5 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg font-semibold"
            >
              {applying ? "ÃƒÂ¢Ã‚ÂÃ‚Â³ ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â·ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¡..." : "Apply ML Price ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬â€œ"}
            </button>
          </div>
        )}
      </div>

      {/* COMPETITOR TABLE */}
      <h2 className="text-2xl font-bold mb-4">ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã…Â  Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â§ÃƒËœÃ‚Â±Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â³Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â </h2>
      <CompetitorTable intel={{}} />

      {/* CAMPAIGN */}
      <Link
        to={`/merchant/campaign-builder/${product.name}`}
        className="mt-8 inline-block px-6 py-3 bg-green-600 text-white rounded-lg shadow font-semibold"
      >
        ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬ ÃƒËœÃ‚Â¥Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â´ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡ ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¡ÃƒËœÃ‚Â°ÃƒËœÃ‚Â§ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬
      </Link>
    </div>
  );
}


