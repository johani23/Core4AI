// ============================================================================
// ðŸ’š Core4.AI â€“ CampaignBuilder.jsx (v7.0 â€œUnified Product Context Fixâ€)
// -----------------------------------------------------------------------------
// â€¢ FIXED: Product from URL â†’ state â†’ passed to ALL sections
// â€¢ FIXED: Removed â€œÙ„Ù… ÙŠØªÙ… ØªØ­Ø¯ÙŠØ¯ Ø§Ù„Ù…Ù†ØªØ¬â€ errors
// â€¢ Smart fallback when no product selected
// ============================================================================

import React, { useEffect, useState } from "react";
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
        toast.error("ÙØ´Ù„ Ù‚Ø±Ø§Ø¡Ø© Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…Ù†ØªØ¬");
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
          Ù„Ù… ÙŠØªÙ… ØªØ­Ø¯ÙŠØ¯ Ø§Ù„Ù…Ù†ØªØ¬ Ø¨Ø¹Ø¯.
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
              "Ù„Ø§ ØªÙˆØ¬Ø¯ ØµÙˆØ±Ø©"
            )}
          </div>

          {/* Details */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold text-green-700">{product.name}</h2>

            <p className="text-sm text-gray-600 mt-1">{product.description}</p>

            <p className="mt-2 text-green-800 font-semibold">
              Ø§Ù„Ø³Ø¹Ø±: {product.price} Ø±.Ø³
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
