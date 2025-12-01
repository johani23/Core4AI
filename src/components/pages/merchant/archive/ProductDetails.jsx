// ============================================================================
// ðŸ’š ProductDetails.jsx â€” v22 ML Integrated Snapshot + Apply AI Price
// ============================================================================

import React, { useEffect, useState } from "react";
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
        toast.success("ðŸ¤– ØªÙ… ØªØ·Ø¨ÙŠÙ‚ Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ù…Ù‚ØªØ±Ø­ Ø¨Ù†Ø¬Ø§Ø­");
        load();
      } else {
        toast.error("âŒ ÙØ´Ù„ ØªØ·Ø¨ÙŠÙ‚ Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ù…Ù‚ØªØ±Ø­");
      }
    } catch (e) {
      toast.error("âŒ Ù„Ø§ ÙŠÙ…ÙƒÙ† Ø§Ù„Ø§ØªØµØ§Ù„ Ø¨Ø§Ù„Ø®Ø§Ø¯Ù…");
    }

    setApplying(false);
  };

  // ============================================================================
  // UI
  // ============================================================================

  if (loading) return <div className="p-6 text-gray-600">â³ Ø¬Ø§Ø± Ø§Ù„ØªØ­Ù…ÙŠÙ„...</div>;
  if (!product) return <div className="p-6 text-red-600">âŒ Ø§Ù„Ù…Ù†ØªØ¬ ØºÙŠØ± Ù…ÙˆØ¬ÙˆØ¯.</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">

      {/* TITLE */}
      <h1 className="text-3xl font-extrabold text-[#006C35] mb-6">
        ðŸ“¦ ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ù…Ù†ØªØ¬
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
          ðŸ’µ Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ø­Ø§Ù„ÙŠ:{" "}
          <span className="text-green-700">{product.price} SAR</span>
        </p>

        {/* ML SNAPSHOT */}
        {mlOverview && (
          <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="text-xl font-bold mb-3">ðŸ¤– Snapshot (ML v22)</h3>

            <p className="text-lg font-semibold text-green-700">
              Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ù…Ù‚ØªØ±Ø­: {mlOverview.suggested_price} SAR
            </p>

            <p className="text-gray-700 mt-1">
              Ø§Ù„Ù†Ø·Ø§Ù‚ Ø§Ù„Ù…Ø«Ø§Ù„ÙŠ: {mlOverview.optimal_range}
            </p>

            <p className="text-gray-700 mt-3">
              Ø§Ù„Ø§Ø³ØªØ±Ø§ØªÙŠØ¬ÙŠØ©: {mlOverview.strategy}
            </p>

            <button
              onClick={applyAIPrice}
              disabled={applying}
              className="mt-4 px-5 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg font-semibold"
            >
              {applying ? "â³ Ø¬Ø§Ø±ÙŠ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚..." : "Apply ML Price ðŸ¤–"}
            </button>
          </div>
        )}
      </div>

      {/* COMPETITOR TABLE */}
      <h2 className="text-2xl font-bold mb-4">ðŸ“Š Ù…Ù‚Ø§Ø±Ù†Ø© Ø§Ù„Ù…Ù†Ø§ÙØ³ÙŠÙ†</h2>
      <CompetitorTable intel={{}} />

      {/* CAMPAIGN */}
      <Link
        to={`/merchant/campaign-builder/${product.name}`}
        className="mt-8 inline-block px-6 py-3 bg-green-600 text-white rounded-lg shadow font-semibold"
      >
        ðŸš€ Ø¥Ù†Ø´Ø§Ø¡ Ø­Ù…Ù„Ø© Ù„Ù‡Ø°Ø§ Ø§Ù„Ù…Ù†ØªØ¬
      </Link>
    </div>
  );
}
