// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ CampaignBuilder.jsx (v7.0 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œUnified Product Context FixÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// -----------------------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ FIXED: Product from URL ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ state ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ passed to ALL sections
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ FIXED: Removed ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ Ãƒâ„¢Ã…Â ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­ÃƒËœÃ‚Â¯Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¯ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â errors
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Smart fallback when no product selected
// ============================================================================

import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

// components
import ProductIQ from "../merchant/ProductIQ";
import CompetitorTable from "../merchant/CompetitorTable";
import CreativeStudio from "../merchant/CreativeStudio";
import AdCalculator from "../merchant/AdCalculator";
import MerchantIntel from "../merchant/MerchantIntel";

export default function CampaignBuilder() {
  const location = useLocation();
  const [product, setProduct] = useState(null);

  // ------------------------------------------------------------
  // Extract product from URL
  // ------------------------------------------------------------
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const encoded = params.get("product");

    if (encoded) {
      try {
        const decoded = JSON.parse(decodeURIComponent(encoded));
        setProduct(decoded);
        console.log("Selected Product:", decoded);
      } catch (err) {
        console.error(err);
        toast.error("Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â´Ãƒâ„¢Ã¢â‚¬Å¾ Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â±ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡ÃƒËœÃ‚Â© ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬");
      }
    }
  }, [location.search]);

  // ------------------------------------------------------------
  // Render Product Header
  // ------------------------------------------------------------
  const renderProductHeader = () => {
    if (!product)
      return (
        <p className="text-center text-gray-500 py-10">
          Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ Ãƒâ„¢Ã…Â ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­ÃƒËœÃ‚Â¯Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¯ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â¯.
        </p>
      );

    return (
      <div className="p-6 bg-white border rounded-xl shadow-sm max-w-4xl mx-auto mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Image */}
          <div className="w-full h-40 bg-gray-100 rounded-lg flex justify-center items-center text-gray-500">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              "Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â¯ ÃƒËœÃ‚ÂµÃƒâ„¢Ã‹â€ ÃƒËœÃ‚Â±ÃƒËœÃ‚Â©"
            )}
          </div>

          {/* Details */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold text-green-700">{product.name}</h2>

            <p className="text-sm text-gray-600 mt-1">{product.description}</p>

            <p className="mt-2 text-green-800 font-semibold">
              ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â±: {product.price} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³
            </p>

            {product.features && (
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                {product.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ------------------------------------------------------------
  // MAIN UI
  // ------------------------------------------------------------
  return (
    <div className="px-6 max-w-6xl mx-auto pb-20">

      {renderProductHeader()}

      <div className="mt-10 space-y-10">

        {/* ProductIQ */}
        <ProductIQ selectedProduct={product} />

        {/* Competitor Table */}
        <CompetitorTable selectedProduct={product} />

        {/* Creative Studio */}
        <CreativeStudio selectedProduct={product} />

        {/* Ad Calculator */}
        <AdCalculator selectedProduct={product} />

        {/* Merchant Intel */}
        <MerchantIntel selectedProduct={product} />

      </div>
    </div>
  );
}


