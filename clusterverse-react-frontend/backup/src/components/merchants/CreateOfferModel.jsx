import React, { useState } from "react";
import { createOffer } from "@/services/merchantAPI";

export default function CreateOfferModal({ isOpen, onClose, onCreated }) {
  const [form, setForm] = useState({
    merchant_id: "",
    creator_id: "",
    description: "",
    discount_value: "",
    allocated_tokens: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createOffer({
        merchant_id: Number(form.merchant_id),
        creator_id: Number(form.creator_id),
        description: form.description,
        discount_value: Number(form.discount_value),
        allocated_tokens: Number(form.allocated_tokens),
      });
      setMessage("âœ… Offer created successfully!");
      onCreated?.();
      setTimeout(() => {
        setMessage("");
        onClose();
      }, 1500);
    } catch (err) {
      setMessage("âŒ Error creating offer");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-96 text-white"
      >
        <h2 className="text-xl font-bold mb-4">ðŸ›ï¸ New Merchant Offer</h2>
        {["merchant_id", "creator_id", "description", "discount_value", "allocated_tokens"].map((key) => (
          <div key={key} className="mb-3">
            <label className="text-sm text-gray-400 block mb-1 capitalize">
              {key.replace("_", " ")}
            </label>
            <input
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-sm"
              type={key.includes("value") || key.includes("tokens") ? "number" : "text"}
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full py-2 bg-yellow-500 text-black rounded-xl font-semibold hover:bg-yellow-400 transition"
        >
          {loading ? "Submitting..." : "Create Offer"}
        </button>
        {message && <p className="text-center text-sm mt-3">{message}</p>}
      </form>
    </div>
  );
}
