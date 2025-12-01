// ============================================================================
// ðŸ’š Core4.AI â€“ ProductPicker.jsx (v3.2 â€“ FIXED KEYS + FIXED NAVIGATION)
// ============================================================================

import React, { useEffect, useState } from "react";
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
      toast.error("âŒ ÙØ´Ù„ ØªØ­Ù…ÙŠÙ„ Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ù…Ù†ØªØ¬Ø§Øª");
    }
    setLoading(false);
  };

  const selectProduct = (product) => {
    navigate("/merchant/campaign-builder", {
      state: { product },    // âœ… FIXED â€” unified with ProductList
    });
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-green-700 mb-6">
        Ø§Ø®ØªØ± Ø§Ù„Ù…Ù†ØªØ¬ Ù„Ø¨Ø¯Ø¡ Ø§Ù„Ø­Ù…Ù„Ø©
      </h2>

      {loading && <p className="text-gray-600">Ø¬Ø§Ø±ÙŠ Ø§Ù„ØªØ­Ù…ÙŠÙ„...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product.id || product.name}   // âœ… FIXED KEY
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
                Ù„Ø§ ØªÙˆØ¬Ø¯ ØµÙˆØ±Ø©
              </div>
            )}

            <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>

            <p className="text-gray-700 text-sm mt-1">
              Ø§Ù„Ø³Ø¹Ø±:{" "}
              <span className="text-green-700 font-semibold">
                {product.price} Ø±.Ø³
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
              âœ” Ø§Ø³ØªØ®Ø¯Ù… Ù‡Ø°Ø§ Ø§Ù„Ù…Ù†ØªØ¬
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}
