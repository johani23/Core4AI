// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ MerchantProductList.jsx (v6.0 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ AI Apply Price + Opportunity Score)
// ============================================================================

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import UnifiedPricingCompact from "@/components/pricing/UnifiedPricingCompact";
import { calculateOpportunityScore } from "@/components/pricing/OpportunityScore";

export default function MerchantProductList() {
  const navigate = useNavigate();
  const merchantId = "merchant_001";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/merchant/${merchantId}/products`);
      const data = await res.json();

      const list = Array.isArray(data) ? data : data.products || [];

      setProducts(list);
    } catch (err) {
      toast.error("ÃƒÂ¢Ã‚ÂÃ…â€™ Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â´Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª");
    }
    setLoading(false);
  };

  // APPLY AI PRICE (global method)
  const applyAIPrice = async (productId, price) => {
    try {
      const res = await fetch(`/api/product/${productId}/update-price`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price }),
      });

      if (res.ok) {
        toast.success("ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬â€œ ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚ÂªÃƒËœÃ‚Â·ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¡ ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â°Ãƒâ„¢Ã†â€™ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ÃƒËœÃ‚ÂµÃƒËœÃ‚Â·Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¹Ãƒâ„¢Ã…Â ");
        loadProducts(); // refresh
      } else {
        toast.error("ÃƒÂ¢Ã‚ÂÃ…â€™ Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â´Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚ÂªÃƒËœÃ‚Â·ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â±");
      }
    } catch (e) {
      toast.error("ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â´Ãƒâ„¢Ã†â€™Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ÃƒËœÃ‚ÂªÃƒËœÃ‚ÂµÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â®ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¯Ãƒâ„¢Ã¢â‚¬Â¦");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">

      <h2 className="text-2xl font-bold text-green-700 mb-6">
        Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â§ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â±
      </h2>

      {loading && (
        <div className="text-center text-gray-500 mb-4">
          ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾...
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product.product_id || product.id || product.name}
            className="p-4 bg-white border rounded-xl shadow hover:shadow-md transition"
          >

            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4 border"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â¯ ÃƒËœÃ‚ÂµÃƒâ„¢Ã‹â€ ÃƒËœÃ‚Â±ÃƒËœÃ‚Â©
              </div>
            )}

            <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>

            <p className="text-gray-700 text-sm mt-1">
              ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â :{" "}
              <span className="font-semibold text-green-700">
                {product.price} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³
              </span>
            </p>

            <p className="text-gray-600 text-sm mt-2">
              {product.description}
            </p>

            {/* ÃƒÂ¢Ã‚Â­Ã‚Â AI Pricing Snapshot */}
            <div className="mt-4 bg-gray-50 p-4 rounded-xl border">
              <UnifiedPricingCompact
                productId={product.product_id}
                onExpand={() => navigate(`/merchant/product/${product.product_id}`)}
              />
            </div>

            {/* ÃƒÂ¢Ã‚Â­Ã‚Â Opportunity Score (0ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“100) */}
            {product.ai_price && product.optimal_price && (
              <p className="text-sm mt-3 font-semibold text-blue-600 bg-blue-50 p-2 rounded-lg">
                Opportunity Score:{" "}
                {calculateOpportunityScore({
                  elasticity: -1,
                  optimalPrice: product.optimal_price,
                  merchantPrice: product.price,
                  suggestedPrice: product.ai_price,
                  revenueAtOptimal: product.optimal_price * 10,
                  revenueAtCurrent: product.price * 10,
                })} / 100
              </p>
            )}

            {/* ÃƒÂ¢Ã‚Â­Ã‚Â APPLY AI PRICE BUTTON */}
            <button
              onClick={() =>
                applyAIPrice(
                  product.product_id,
                  product.ai_price || product.recommended_price || product.price
                )
              }
              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
            >
              ÃƒËœÃ‚ÂªÃƒËœÃ‚Â·ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚ÂªÃƒËœÃ‚Â±ÃƒËœÃ‚Â­ ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬â€œ
            </button>

            <button
              onClick={() =>
                navigate("/merchant/campaign-builder", {
                  state: { product },
                })
              }
              className="mt-4 w-full bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg font-semibold"
            >
              ÃƒÂ¢Ã…â€œÃ¢â‚¬Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Â³ÃƒËœÃ‚ÂªÃƒËœÃ‚Â®ÃƒËœÃ‚Â¯Ãƒâ„¢Ã¢â‚¬Â¦ Ãƒâ„¢Ã¢â‚¬Â¡ÃƒËœÃ‚Â°ÃƒËœÃ‚Â§ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}


