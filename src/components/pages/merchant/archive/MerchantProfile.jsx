// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ MerchantProfile.jsx ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Core4.AI (v1.0 BETA RELEASE)
// ----------------------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ New Merchant Profile page
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ AI Pricing Summary + UnifiedPricing
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Compact, clean and ready for Beta
// ============================================================================

import UnifiedPricing from "@/components/pricing/UnifiedPricing";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MerchantProfile() {
  const navigate = useNavigate();
  const merchantId = "merchant_001";

  const [merchant, setMerchant] = useState({
    name: "Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â§ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â°Ãƒâ„¢Ã†â€™Ãƒâ„¢Ã…Â ",
    avatar: "https://i.imgur.com/1Q9Z1Zm.png",
    plan: "Free Beta Plan",
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/merchant/${merchantId}/products`)
      .then((res) => {
        const list = Array.isArray(res.data)
          ? res.data
          : res.data.products || [];
        setProducts(list);
      })
      .catch(() => console.log("Error loading products"));
  }, []);

  const topProduct = products.length > 0 ? products[0] : null;

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">

      {/* HEADER */}
      <div className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow border">
        <img
          src={merchant.avatar}
          alt="avatar"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h1 className="text-3xl font-bold text-green-700">{merchant.name}</h1>
          <p className="text-gray-500">{merchant.plan}</p>
        </div>
      </div>

      {/* AI PRICING SUMMARY */}
      <div className="bg-white rounded-2xl shadow border p-6">
        <h2 className="text-xl font-bold text-green-600 mb-4">
          ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â®ÃƒËœÃ‚Âµ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â°Ãƒâ„¢Ã†â€™ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ÃƒËœÃ‚ÂµÃƒËœÃ‚Â·Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¹Ãƒâ„¢Ã…Â  Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â±
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â±ÃƒËœÃ‚Â¶ Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã†â€™ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â¸ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚Â£Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¶Ãƒâ„¢Ã¢â‚¬Å¾ Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â  Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Â­Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â© ÃƒËœÃ‚ÂªÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â°Ãƒâ„¢Ã†â€™ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ÃƒËœÃ‚ÂµÃƒËœÃ‚Â·Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¹Ãƒâ„¢Ã…Â .
        </p>

        {topProduct ? (
          <div className="bg-gray-50 p-4 rounded-xl border">
            <UnifiedPricing
              productId={topProduct.product_id || topProduct.id}
            />
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ Ãƒâ„¢Ã…Â Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â¯ Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â¯.</p>
        )}
      </div>

      {/* TOP PRODUCTS */}
      <div>
        <h2 className="text-xl font-bold text-green-600 mb-4">
          ÃƒËœÃ‚Â£Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¶Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â£ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡Ãƒâ„¢Ã¢â‚¬Â¹
        </h2>

        {products.length === 0 && (
          <p className="text-gray-500 text-sm">Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ Ãƒâ„¢Ã…Â ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â¶ÃƒËœÃ‚Â§Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â­ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â° ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¢Ãƒâ„¢Ã¢â‚¬Â .</p>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {products.slice(0, 3).map((p) => (
            <div
              key={p.product_id}
              className="bg-white p-4 shadow rounded-xl border"
            >
              <h3 className="font-bold text-gray-800">{p.name}</h3>
              <p className="text-gray-500 text-sm mb-3">{p.price} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³</p>

              <button
                onClick={() =>
                  navigate("/merchant/campaign-builder", { state: { product: p } })
                }
                className="mt-2 bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700"
              >
                ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬ ÃƒËœÃ‚Â¨Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡ ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â©
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid md:grid-cols-3 gap-4">
        <button
          onClick={() => navigate("/merchant/add-product")}
          className="bg-purple-600 text-white p-4 rounded-xl shadow hover:bg-purple-700"
        >
          ÃƒÂ¢Ã…Â¾Ã¢â‚¬Â¢ ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â¶ÃƒËœÃ‚Â§Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â¯Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¯
        </button>

        <button
          onClick={() => navigate("/merchant/products/list")}
          className="bg-gray-800 text-white p-4 rounded-xl shadow hover:bg-gray-900"
        >
          ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¦ ÃƒËœÃ‚Â¬Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¹ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª
        </button>

        <button
          onClick={() => navigate("/merchant/campaigns")}
          className="bg-blue-600 text-white p-4 rounded-xl shadow hover:bg-blue-700"
        >
          ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â´ÃƒËœÃ‚Â·ÃƒËœÃ‚Â©
        </button>
      </div>
    </div>
  );
}


