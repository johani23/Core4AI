// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ ProductPicker.jsx (v3.2 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ FIXED KEYS + FIXED NAVIGATION)
// ============================================================================

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ProductPicker() {
  const merchantId = "merchant_001";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/merchant/${merchantId}/products`
      );
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.products || [];
      setProducts(list);
    } catch (err) {
      toast.error("ÃƒÂ¢Ã‚ÂÃ…â€™ Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â´Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¦Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª");
    }
    setLoading(false);
  };

  const selectProduct = (product) => {
    navigate("/merchant/campaign-builder", {
      state: { product },    // ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ FIXED ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â unified with ProductList
    });
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-green-700 mb-6">
        ÃƒËœÃ‚Â§ÃƒËœÃ‚Â®ÃƒËœÃ‚ÂªÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â©
      </h2>

      {loading && <p className="text-gray-600">ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product.id || product.name}   // ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ FIXED KEY
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
              ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â±:{" "}
              <span className="text-green-700 font-semibold">
                {product.price} ÃƒËœÃ‚Â±.ÃƒËœÃ‚Â³
              </span>
            </p>

            {product.description && (
              <p className="text-gray-600 text-sm mt-2">{product.description}</p>
            )}

            {product.features?.length > 0 && (
              <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-1">
                {product.features.map((f, i) => (
                  <li key={i} className="text-sm">
                    {f}
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={() => selectProduct(product)}
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


