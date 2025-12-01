import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function MerchantProductEdit() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const merchantId = "merchant_001";

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/merchant/${merchantId}/products/${productId}`
      );
      const data = await res.json();

      if (res.ok) {
        setName(data.name);
        setPrice(data.price);
        setCategory(data.category);
      } else {
        toast.error("âŒ ÙØ´Ù„ ØªØ­Ù…ÙŠÙ„ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…Ù†ØªØ¬");
      }
    } catch (err) {
      toast.error("âŒ Ø®Ø·Ø£ ÙÙŠ Ø§Ù„Ø§ØªØµØ§Ù„ Ø¨Ø§Ù„Ø®Ø§Ø¯Ù…");
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!name || !price || !category) {
      toast.error("âŒ ÙŠØ±Ø¬Ù‰ ØªØ¹Ø¨Ø¦Ø© Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø­Ù‚ÙˆÙ„");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(
        `/api/merchant/${merchantId}/products/${productId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            price: parseFloat(price),
            category,
          }),
        }
      );

      if (res.ok) {
        toast.success("âœ… ØªÙ… Ø­ÙØ¸ Ø§Ù„ØªØ¹Ø¯ÙŠÙ„Ø§Øª Ø¨Ù†Ø¬Ø§Ø­");
        navigate("/merchant/products");
      } else {
        toast.error("âŒ ÙØ´Ù„ Ø­ÙØ¸ Ø§Ù„ØªØ¹Ø¯ÙŠÙ„Ø§Øª");
      }
    } catch (err) {
      toast.error("âŒ Ø®Ø·Ø£ ÙÙŠ Ø§Ù„Ø§ØªØµØ§Ù„");
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!window.confirm("Ù‡Ù„ Ø£Ù†Øª Ù…ØªØ£ÙƒØ¯ Ù…Ù† Ø­Ø°Ù Ø§Ù„Ù…Ù†ØªØ¬ØŸ")) return;

    try {
      const res = await fetch(
        `/api/merchant/${merchantId}/products/${productId}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        toast.success("ðŸ—‘ï¸ ØªÙ… Ø­Ø°Ù Ø§Ù„Ù…Ù†ØªØ¬");
        navigate("/merchant/products");
      } else {
        toast.error("âŒ ÙØ´Ù„ Ø­Ø°Ù Ø§Ù„Ù…Ù†ØªØ¬");
      }
    } catch (err) {
      toast.error("âŒ Ø®Ø·Ø£ ÙÙŠ Ø§Ù„Ø§ØªØµØ§Ù„");
    }
  };

  if (loading)
    return (
      <div className="text-center text-gray-300 p-10">
        â³ Ø¬Ø§Ø±ÙŠ ØªØ­Ù…ÙŠÙ„ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…Ù†ØªØ¬...
      </div>
    );

  return (
    <div className="max-w-xl mx-auto bg-gray-900 text-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-green-400">
        âœï¸ ØªØ¹Ø¯ÙŠÙ„ Ø§Ù„Ù…Ù†ØªØ¬
      </h2>

      <div className="mb-4">
        <label className="block mb-2">Ø§Ø³Ù… Ø§Ù„Ù…Ù†ØªØ¬</label>
        <input
          type="text"
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Ø§Ù„Ø³Ø¹Ø± (Ø±ÙŠØ§Ù„)</label>
        <input
          type="number"
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2">Ø§Ù„ÙØ¦Ø©</label>
        <select
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Ø§Ø®ØªØ± Ø§Ù„ÙØ¦Ø©</option>
          <option value="electronics">Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠØ§Øª</option>
          <option value="fashion">Ø£Ø²ÙŠØ§Ø¡</option>
          <option value="beauty">Ø¹Ù†Ø§ÙŠØ© ÙˆØ¬Ù…Ø§Ù„</option>
          <option value="sports">Ø±ÙŠØ§Ø¶Ø©</option>
          <option value="home">Ù…Ù†Ø²Ù„</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`flex-1 py-3 rounded-xl font-bold transition ${
            saving
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {saving ? "Ø¬Ø§Ø±ÙŠ Ø§Ù„Ø­ÙØ¸..." : "Ø­ÙØ¸ Ø§Ù„ØªØ¹Ø¯ÙŠÙ„Ø§Øª"}
        </button>

        <button
          onClick={handleDelete}
          className="flex-1 py-3 rounded-xl font-bold bg-red-600 hover:bg-red-700"
        >
          Ø­Ø°Ù
        </button>
      </div>
    </div>
  );
}
