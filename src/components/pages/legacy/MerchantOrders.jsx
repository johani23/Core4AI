// ============================================================
// ðŸ’š Core4.AI â€“ MerchantOrders.jsx (Saudi Minimal Style)
// ------------------------------------------------------------
// â€¢ Merchant order history
// â€¢ Clean white/green dashboard
// ============================================================

import React, { useState } from "react";

export default function MerchantOrders() {
  const [merchantId, setMerchantId] = useState("");
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    if (!merchantId.trim()) return;

    const res = await fetch(`http://localhost:8000/merchant/${merchantId}/orders`);
    const data = await res.json();
    setOrders(data);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">

      {/* Header */}
      <h1 className="text-3xl font-bold text-[#006C35] mb-8">
        Ø³Ø¬Ù„ Ø§Ù„Ø·Ù„Ø¨Ø§Øª
      </h1>

      {/* Merchant ID Input */}
      <div className="max-w-lg mb-10">
        <label className="block text-gray-700 font-medium mb-2">
          Ø±Ù‚Ù… Ø§Ù„ØªØ§Ø¬Ø± (Merchant ID)
        </label>

        <div className="flex gap-3">
          <input
            type="text"
            className="flex-grow border border-gray-300 rounded-lg px-4 py-2"
            value={merchantId}
            onChange={(e) => setMerchantId(e.target.value)}
            placeholder="Ø£Ø¯Ø®Ù„ Ø±Ù‚Ù… Ø§Ù„ØªØ§Ø¬Ø±"
          />

          <button
            onClick={loadOrders}
            className="bg-[#006C35] text-white px-5 rounded-lg hover:bg-green-700"
          >
            ØªØ­Ù…ÙŠÙ„
          </button>
        </div>
      </div>

      {/* Orders Table */}
      {orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-xl">
            <thead className="bg-[#006C35] text-white">
              <tr>
                <th className="px-4 py-3 text-right">Ø±Ù‚Ù… Ø§Ù„Ø¬Ù„Ø³Ø©</th>
                <th className="px-4 py-3 text-right">Ø§Ø³Ù… Ø§Ù„Ù…Ù†ØªØ¬</th>
                <th className="px-4 py-3 text-right">Ø§Ù„Ø³Ø¹Ø±</th>
                <th className="px-4 py-3 text-right">Ø±Ù‚Ù… Ø§Ù„Ù…Ø´ØªØ±ÙŠ</th>
                <th className="px-4 py-3 text-right">Ø§Ù„Ø­Ø§Ù„Ø©</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr key={o.session_id} className="border-t border-gray-200">
                  <td className="px-4 py-3 text-right">{o.session_id}</td>
                  <td className="px-4 py-3 text-right">{o.product?.name}</td>
                  <td className="px-4 py-3 text-right text-[#006C35] font-bold">
                    {o.product?.price} SAR
                  </td>
                  <td className="px-4 py-3 text-right">{o.buyer_id || "-"}</td>

                  <td className="px-4 py-3 text-right">
                    {o.status === "paid" ? (
                      <span className="text-green-600 font-semibold">ØªÙ… Ø§Ù„Ø¯ÙØ¹</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Ù„Ù… ÙŠØªÙ… Ø§Ù„Ø¯ÙØ¹</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-lg mt-10">
          Ù„Ø§ ØªÙˆØ¬Ø¯ Ø·Ù„Ø¨Ø§Øª Ø­Ø§Ù„ÙŠØ§Ù‹ â€” Ù‚Ù… Ø¨ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø³Ø¬Ù„ Ø¨Ø±Ù‚Ù… Ø§Ù„ØªØ§Ø¬Ø±
        </p>
      )}
    </div>
  );
}
