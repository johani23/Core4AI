// ============================================================================
// ðŸ’Ž Core4.AI â€“ TribeExchangeHub.jsx (v161 â€œInter-Tribe Marketâ€)
// ============================================================================

import React, { useState } from "react";
import { useCoreSync } from "@/context/CoreSyncContext";

function computeRate(fromValue, toValue) {
  return parseFloat((toValue / fromValue).toFixed(3));
}

export default function TribeExchangeHub() {
  const { tribes } = useCoreSync();

  const [fromTribe, setFromTribe] = useState("Adventurers");
  const [toTribe, setToTribe] = useState("Techy");
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);

  const fromData = tribes.find((t) => t.name === fromTribe) || { tokenValue: 1 };
  const toData = tribes.find((t) => t.name === toTribe) || { tokenValue: 1 };

  const rate = computeRate(fromData.tokenValue, toData.tokenValue);
  const fee = 0.02;
  const received = amount * rate * (1 - fee);

  const handleExchange = () => {
    if (fromTribe === toTribe) return setMessage("âš ï¸ Choose different tribes.");
    if (amount <= 0) return setMessage("âš ï¸ Invalid amount.");

    const entry = {
      id: Date.now(),
      from: fromTribe,
      to: toTribe,
      amount,
      received: received.toFixed(2),
      rate,
      time: new Date().toLocaleTimeString(),
    };

    setHistory((p) => [entry, ...p.slice(0, 4)]);
    setMessage(
      `âœ… Swapped ${amount} ${fromTribe} â†’ ${received.toFixed(
        2
      )} ${toTribe} (rate ${rate}, fee 2%)`
    );
  };

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-bold text-pink-400">ðŸ’± Tribe Exchange Market</h2>

      {/* Exchange Box */}
      <div className="bg-[#111827] border border-gray-700 rounded-2xl p-5 space-y-4">
        <div className="grid grid-cols-2 gap-6">

          {/* From Tribe */}
          <div>
            <label className="text-sm text-gray-400">From Tribe</label>
            <select
              className="w-full bg-[#0d1117] border border-gray-600 rounded-lg p-2 text-gray-200"
              value={fromTribe}
              onChange={(e) => setFromTribe(e.target.value)}
            >
              {tribes.map((t) => (
                <option key={t.name}>{t.name}</option>
              ))}
            </select>
          </div>

          {/* To Tribe */}
          <div>
            <label className="text-sm text-gray-400">To Tribe</label>
            <select
              className="w-full bg-[#0d1117] border border-gray-600 rounded-lg p-2 text-gray-200"
              value={toTribe}
              onChange={(e) => setToTribe(e.target.value)}
            >
              {tribes.map((t) => (
                <option key={t.name}>{t.name}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Amount + Exchange */}
        <div className="grid grid-cols-3 gap-4 items-center">
          <div>
            <label className="text-sm text-gray-400">Amount</label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className="w-full bg-[#0d1117] border border-gray-600 rounded-lg p-2 text-gray-200"
            />
          </div>

          <div className="text-sm text-gray-400 mt-6">
            1 {fromTribe} = {rate} {toTribe}
          </div>

          <button
            onClick={handleExchange}
            className="mt-5 bg-green-600 hover:bg-green-500 text-white rounded-lg py-2"
          >
            Exchange Now
          </button>
        </div>

        {message && (
          <p className="text-xs text-gray-300 bg-[#0d1117] p-2 rounded-lg mt-3 border border-gray-700">
            {message}
          </p>
        )}
      </div>

      {/* History */}
      <div className="bg-[#111827] border border-gray-700 rounded-2xl p-5">
        <h3 className="text-pink-400 font-semibold mb-2">ðŸ“œ Recent Trades</h3>

        {history.length === 0 ? (
          <p className="text-gray-500 text-sm">No trades yet.</p>
        ) : (
          <table className="w-full text-sm text-gray-300">
            <thead className="border-b border-gray-700 text-gray-400">
              <tr>
                <th className="py-1 text-left">Time</th>
                <th className="py-1 text-left">From â†’ To</th>
                <th className="py-1 text-right">Amount</th>
                <th className="py-1 text-right">Received</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.id} className="border-b border-gray-800">
                  <td className="py-1">{h.time}</td>
                  <td className="py-1">
                    {h.from} â†’ {h.to}
                  </td>
                  <td className="py-1 text-right">{h.amount}</td>
                  <td className="py-1 text-right">{h.received}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
