// ============================================================================
// ðŸ’š Core4.AI â€“ AddProduct.jsx (v6.1 FIXED)
// ============================================================================

import React, { useState } from "react";
import toast from "react-hot-toast";
import UnifiedPricing from "@/components/pricing/UnifiedPricing";

export default function AddProduct() {
  const merchantId = "merchant_001";

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newProductId, setNewProductId] = useState(null);

  const addFeature = () => {
    if (!featureInput.trim()) return;
    setFeatures([...features, featureInput.trim()]);
    setFeatureInput("");
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const submitProduct = async () => {
    if (!name.trim() || !price.trim()) {
      toast.error("âŒ Ø§Ù„Ø±Ø¬Ø§Ø¡ Ø¥Ø¯Ø®Ø§Ù„ Ø§Ø³Ù… Ø§Ù„Ù…Ù†ØªØ¬ ÙˆØ§Ù„Ø³Ø¹Ø±");
      return;
    }

    const payload = {
      product_id: `prd_${Date.now()}`,
      name,
      price: parseFloat(price),
      image_url: imageUrl,
      description,
      features,
    };

    setLoading(true);

    try {
      const res = await fetch(
        `/api/merchant/${merchantId}/add-product`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        toast.success("âœ”ï¸ ØªÙ… Ø¥Ø¶Ø§ÙØ© Ø§Ù„Ù…Ù†ØªØ¬ Ø¨Ù†Ø¬Ø§Ø­");
        setNewProductId(payload.product_id);

        // Reset form
        setName("");
        setPrice("");
        setImageUrl("");
        setDescription("");
        setFeatureInput("");
        setFeatures([]);
      } else {
        toast.error("âŒ Ø­Ø¯Ø« Ø®Ø·Ø£ Ø£Ø«Ù†Ø§Ø¡ Ø¥Ø¶Ø§ÙØ© Ø§Ù„Ù…Ù†ØªØ¬");
      }

    } catch (err) {
      toast.error("âŒ Ù„Ø§ ÙŠÙ…ÙƒÙ† Ø§Ù„Ø§ØªØµØ§Ù„ Ø¨Ø§Ù„Ø®Ø§Ø¯Ù…");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-900 text-white p-8 rounded-xl shadow-lg">

      <h1 className="text-3xl font-bold mb-6 text-green-300">
        Ø¥Ø¶Ø§ÙØ© Ù…Ù†ØªØ¬ Ø¬Ø¯ÙŠØ¯
      </h1>

      {/* NAME */}
      <label className="block mb-2 text-md font-semibold">Ø§Ø³Ù… Ø§Ù„Ù…Ù†ØªØ¬</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 rounded bg-gray-800 border border-gray-700 mb-4"
        placeholder="Ù…Ø«Ø§Ù„: Ø³Ø§Ø¹Ø© Ø°ÙƒÙŠØ©"
      />

      {/* PRICE */}
      <label className="block mb-2 text-md font-semibold">Ø§Ù„Ø³Ø¹Ø± (Ø±.Ø³)</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full p-3 rounded bg-gray-800 border border-gray-700 mb-4"
        placeholder="149"
      />

      {/* IMAGE URL */}
      <label className="block mb-2 text-md font-semibold">Ø±Ø§Ø¨Ø· Ø§Ù„ØµÙˆØ±Ø©</label>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="w-full p-3 rounded bg-gray-800 border border-gray-700 mb-4"
        placeholder="https://image.jpg"
      />

      {/* DESCRIPTION */}
      <label className="block mb-2 text-md font-semibold">ÙˆØµÙ Ø§Ù„Ù…Ù†ØªØ¬</label>
      <textarea
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 rounded bg-gray-800 border border-gray-700 mb-4"
        placeholder="Ø§ÙƒØªØ¨ ÙˆØµÙÙ‹Ø§ Ø¬Ø°Ø§Ø¨Ù‹Ø§ Ù„Ù„Ù…Ù†ØªØ¬"
      />

      {/* FEATURES */}
      <label className="block mb-2 text-md font-semibold">Ù…Ù…ÙŠØ²Ø§Øª Ø§Ù„Ù…Ù†ØªØ¬</label>

      <div className="flex gap-3 mb-3">
        <input
          type="text"
          value={featureInput}
          onChange={(e) => setFeatureInput(e.target.value)}
          className="flex-grow p-3 rounded bg-gray-800 border border-gray-700"
          placeholder="Ù…Ø«Ø§Ù„: Ù…Ù‚Ø§ÙˆÙ… Ù„Ù„Ù…Ø§Ø¡ / Ø¨Ø·Ø§Ø±ÙŠØ© Ø·ÙˆÙŠÙ„Ø©"
        />
        <button
          onClick={addFeature}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
        >
          Ø¥Ø¶Ø§ÙØ©
        </button>
      </div>

      {/* FEATURE LIST */}
      <div className="mb-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-gray-800 p-2 rounded mb-2"
          >
            <span>{f}</span>
            <button
              onClick={() => removeFeature(i)}
              className="text-red-400 hover:text-red-600 text-lg font-bold"
            >
              âœ•
            </button>
          </div>
        ))}
      </div>

      {/* SUBMIT BUTTON */}
      <button
        onClick={submitProduct}
        disabled={loading}
        className="w-full bg-green-700 hover:bg-green-800 text-white p-4 rounded-xl text-lg font-semibold"
      >
        {loading ? "â³ Ø¬Ø§Ø±ÙŠ Ø§Ù„Ø¥Ø¶Ø§ÙØ©..." : "Ø¥Ø¶Ø§ÙØ© Ø§Ù„Ù…Ù†ØªØ¬ âœ”"}
      </button>

      {/* UNIFIED PRICING AFTER SUCCESS */}
      {newProductId && (
        <div className="mt-10 bg-white p-6 rounded-xl text-black">
          <UnifiedPricing productId={newProductId} />
        </div>
      )}

    </div>
  ); // <<< THIS WAS MISSING!
}
