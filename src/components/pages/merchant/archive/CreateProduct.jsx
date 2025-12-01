import React, { useState } from "react";
import toast from "react-hot-toast";

export default function CreateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const merchantId = "merchant_001";

  const handleCreate = async () => {
    if (!name || !price || !category) {
      toast.error("âŒ ÙŠØ±Ø¬Ù‰ ØªØ¹Ø¨Ø¦Ø© Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø­Ù‚ÙˆÙ„");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/merchant/${merchantId}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price: parseFloat(price),
          category,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("âœ… ØªÙ… Ø¥Ø¶Ø§ÙØ© Ø§Ù„Ù…Ù†ØªØ¬ Ø¨Ù†Ø¬Ø§Ø­");
        setName("");
        setPrice("");
        setCategory("");
      } else {
        toast.error(data.error || "âŒ Ø­Ø¯Ø« Ø®Ø·Ø£ Ø£Ø«Ù†Ø§Ø¡ Ø¥Ø¶Ø§ÙØ© Ø§Ù„Ù…Ù†ØªØ¬");
      }
    } catch (err) {
      toast.error("âŒ ÙØ´Ù„ Ø§Ù„Ø§ØªØµØ§Ù„ Ø¨Ø§Ù„Ø®Ø§Ø¯Ù…");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-gray-900 text-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-green-400">Ø¥Ø¶Ø§ÙØ© Ù…Ù†ØªØ¬ Ø¬Ø¯ÙŠØ¯</h2>

      <div className="mb-4">
        <label className="block mb-2">Ø§Ø³Ù… Ø§Ù„Ù…Ù†ØªØ¬</label>
        <input
          type="text"
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ù…Ø«Ø§Ù„: Ø³Ù…Ø§Ø¹Ø© Ø¨Ù„ÙˆØªÙˆØ«"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Ø§Ù„Ø³Ø¹Ø± (Ø±ÙŠØ§Ù„)</label>
        <input
          type="number"
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Ù…Ø«Ø§Ù„: 199"
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

      <button
        onClick={handleCreate}
        disabled={loading}
        className={`w-full py-3 text-lg rounded-xl font-bold transition ${
          loading
            ? "bg-gray-700 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Ø¬Ø§Ø±ÙŠ Ø§Ù„Ø¥Ø¶Ø§ÙØ©..." : "Ø¥Ø¶Ø§ÙØ© Ø§Ù„Ù…Ù†ØªØ¬"}
      </button>
    </div>
  );
}
