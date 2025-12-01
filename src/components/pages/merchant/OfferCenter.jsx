// ============================================================================
// ðŸ’š Core4.AI â€“ OfferCenter.jsx (v4 â€œOffer Builder Suiteâ€)
// ----------------------------------------------------------------------------
// Merchants can create discounts, bundles, and promo codes
// â€¢ Ready for backend integration
// â€¢ Clean UI, 100% Tailwind
// ============================================================================

import React, { useState } from "react";
import { TagIcon, GiftIcon, KeyIcon } from "@heroicons/react/24/outline";

export default function OfferCenter() {
  const [discounts, setDiscounts] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [promoCodes, setPromoCodes] = useState([]);

  // Temporary demo fields
  const [discountValue, setDiscountValue] = useState("");
  const [bundleName, setBundleName] = useState("");
  const [promoCode, setPromoCode] = useState("");

  // ----------------------------------------------
  // Add Discount
  // ----------------------------------------------
  const addDiscount = () => {
    if (!discountValue.trim()) return;
    setDiscounts((prev) => [...prev, { id: Date.now(), value: discountValue }]);
    setDiscountValue("");
  };

  // ----------------------------------------------
  // Add Bundle
  // ----------------------------------------------
  const addBundle = () => {
    if (!bundleName.trim()) return;
    setBundles((prev) => [...prev, { id: Date.now(), name: bundleName }]);
    setBundleName("");
  };

  // ----------------------------------------------
  // Add Promo Code
  // ----------------------------------------------
  const addPromo = () => {
    if (!promoCode.trim()) return;
    setPromoCodes((prev) => [...prev, { id: Date.now(), code: promoCode }]);
    setPromoCode("");
  };

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Offer Center</h1>
        <p className="text-gray-500 mt-1">Create discounts, bundles and promo codes.</p>
      </div>

      {/* DISCOUNT CREATOR */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <TagIcon className="w-6 h-6 text-green-600" />
          Create Discount
        </h2>

        <input
          type="text"
          placeholder="Discount (e.g., 20% off)"
          className="w-full p-3 rounded-lg border bg-gray-50"
          value={discountValue}
          onChange={(e) => setDiscountValue(e.target.value)}
        />

        <button
          onClick={addDiscount}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
        >
          Add Discount
        </button>

        <ul className="space-y-2 pt-4">
          {discounts.map((d) => (
            <li
              key={d.id}
              className="bg-gray-100 text-gray-800 p-3 rounded-lg border"
            >
              ðŸ’¸ {d.value}
            </li>
          ))}
        </ul>
      </div>

      {/* BUNDLE CREATOR */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <GiftIcon className="w-6 h-6 text-purple-600" />
          Create Bundle
        </h2>

        <input
          type="text"
          placeholder="Bundle Name (e.g., Summer Combo)"
          className="w-full p-3 rounded-lg border bg-gray-50"
          value={bundleName}
          onChange={(e) => setBundleName(e.target.value)}
        />

        <button
          onClick={addBundle}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
        >
          Add Bundle
        </button>

        <ul className="space-y-2 pt-4">
          {bundles.map((b) => (
            <li
              key={b.id}
              className="bg-gray-100 text-gray-800 p-3 rounded-lg border"
            >
              ðŸŽ {b.name}
            </li>
          ))}
        </ul>
      </div>

      {/* PROMO CODE CREATOR */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <KeyIcon className="w-6 h-6 text-blue-600" />
          Create Promo Code
        </h2>

        <input
          type="text"
          placeholder="Promo Code (e.g., CORE4AI25)"
          className="w-full p-3 rounded-lg border bg-gray-50"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />

        <button
          onClick={addPromo}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        >
          Add Promo
        </button>

        <ul className="space-y-2 pt-4">
          {promoCodes.map((p) => (
            <li
              key={p.id}
              className="bg-gray-100 text-gray-800 p-3 rounded-lg border"
            >
              ðŸ”‘ {p.code}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
