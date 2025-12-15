import React, { useEffect, useState, useRef } from "react";
import PricingIntelligence from "./pricing/../PricingIntelligence";

export default function PricingDemo() {
  const [merchantId] = useState("merchant_001");
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  // AI Assistant
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);
  const [memory, setMemory] = useState({
    last_price: null,
    last_risk: null,
    direction: null,
  });

  const chatRef = useRef(null);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat]);

  // -------------------------
  // LOAD PRODUCTS
  // -------------------------
  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/analytics/products/${merchantId}`);
      const json = await res.json();
      setProducts(json);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  // -------------------------
  // LOAD ALL PANELS FOR AI CONTEXT
  // -------------------------
  const loadPanelData = async (productId) => {
    const endpoints = [
      "overview",
      "breakdown",
      "elasticity",
      "demand-curve",
      "evc",
      "recommendation",
      "commission",
    ];

    const results = {};

    for (let e of endpoints) {
      try {
        const res = await fetch(`/api/pricing/${e}/${productId}`);
        results[e] = await res.json();
      } catch {
        results[e] = {};
      }
    }

    return results;
  };

  // -------------------------
  // SEND MESSAGE TO AI
  // -------------------------
  const askAssistant = async (forcedPrompt = null) => {
    const text = forcedPrompt || question;
    if (!text.trim()) return;

    // Add user message
    setChat((prev) => [...prev, { from: "user", text }]);
    setQuestion("");

    // Load context for AI
    const context = await loadPanelData(selected);

    const payload = {
      question: text,
      memory,
      context,
    };

    const res = await fetch("/api/pricing/copilot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    const reply =
      data.rewrite ||
      data.strong ||
      data.short ||
      "AI Assistant could not generate a response.";

    // Update memory
    let updatedMemory = { ...memory };

    if (context?.recommendation?.suggested_price) {
      updatedMemory.last_price = context.recommendation.suggested_price;
    }

    if (context.elasticity?.elasticity_label) {
      updatedMemory.last_risk = context.elasticity.elasticity_label;
    }

    if (reply.includes("raise")) updatedMemory.direction = "UP";
    if (reply.includes("lower")) updatedMemory.direction = "DOWN";

    setMemory(updatedMemory);

    // Add AI message
    setChat((prev) => [...prev, { from: "ai", text: reply }]);
  };

  // -------------------------
  // APPLY AI PRICE
  // -------------------------
  const applyAIPrice = async () => {
    const context = await loadPanelData(selected);
    const newPrice =
      context?.recommendation?.suggested_price ||
      context?.overview?.suggested_price ||
      null;

    if (!newPrice) return alert("No recommended price found.");

    await fetch(`/api/product/${selected}/update-price`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: newPrice }),
    });

    alert(`Price updated to ${newPrice} SAR`);
  };

  // -------------------------
  // SMART ASK (Button Phrases)
  // -------------------------
  const smartAsk = (text) => askAssistant(text);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">

      <h1 className="text-4xl font-bold text-green-400 mb-10">
        Pricing Intelligence v21.5 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Demo + AI Coach
      </h1>

      {/* Product Selector */}
      <div className="bg-gray-800 p-6 rounded-2xl mb-10">
        <h2 className="text-2xl font-semibold mb-4">Select Product</h2>

        {loading && <p className="text-gray-400">Loading productsÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦</p>}

        <div className="grid md:grid-cols-3 gap-4">
          {products.map((p) => (
            <button
              key={p.product_id}
              onClick={() => {
                setSelected(p.product_id);
                setChat([]);
                setMemory({
                  last_price: null,
                  last_risk: null,
                  direction: null,
                });
              }}
              className={`p-4 rounded-xl border ${
                selected === p.product_id
                  ? "bg-green-600 border-green-400"
                  : "bg-gray-700 border-gray-600 hover:bg-gray-600"
              }`}
            >
              <p className="text-lg font-semibold">{p.name}</p>
              <p className="text-gray-400 text-sm">{p.price} SAR</p>
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Intelligence */}
      {selected ? (
        <div className="bg-gray-800 p-6 rounded-2xl mb-10">
          <PricingIntelligence productId={selected} />

          <button
            onClick={applyAIPrice}
            className="mt-6 bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold"
          >
            ÃƒÂ¢Ã…Â¡Ã‚Â¡ Apply AI Price
          </button>
        </div>
      ) : (
        <p className="text-gray-400 text-lg">
          Select a product to load full Pricing Intelligence analysis.
        </p>
      )}

      {/* AI COACH */}
      {selected && (
        <div className="mt-10 bg-gray-800 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold text-yellow-300 mb-4">
            ÃƒÂ°Ã…Â¸Ã‚Â¤Ã¢â‚¬â€œ Pricing Coach v21 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Smart AI Assistant
          </h2>

          {/* Smart Suggestions */}
          <div className="flex gap-3 overflow-x-auto pb-3 mb-4">
            <button
              onClick={() => smartAsk("Should I raise the price?")}
              className="bg-gray-700 px-4 py-2 rounded-xl text-sm"
            >
              Raise price?
            </button>

            <button
              onClick={() => smartAsk("Explain the elasticity tab.")}
              className="bg-gray-700 px-4 py-2 rounded-xl text-sm"
            >
              Explain Elasticity
            </button>

            <button
              onClick={() => smartAsk("Explain the EVC tab.")}
              className="bg-gray-700 px-4 py-2 rounded-xl text-sm"
            >
              Explain EVC
            </button>

            <button
              onClick={() => smartAsk("Explain the breakdown tab.")}
              className="bg-gray-700 px-4 py-2 rounded-xl text-sm"
            >
              Explain Breakdown
            </button>

            <button
              onClick={() => smartAsk("Explain final recommendation.")}
              className="bg-gray-700 px-4 py-2 rounded-xl text-sm"
            >
              Final Recommendation
            </button>

            <button
              onClick={() => smartAsk("What does demand curve indicate?")}
              className="bg-gray-700 px-4 py-2 rounded-xl text-sm"
            >
              Demand Curve?
            </button>
          </div>

          {/* Chat Window */}
          <div
            ref={chatRef}
            className="bg-gray-900 p-4 rounded-xl border border-gray-700 h-72 overflow-y-auto space-y-4"
          >
            {chat.map((m, i) => (
              <div
                key={i}
                className={`max-w-[70%] p-3 rounded-xl ${
                  m.from === "user"
                    ? "bg-green-600 ml-auto text-white"
                    : "bg-gray-700 text-gray-200"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="mt-4 flex gap-4">
            <textarea
              placeholder="Ask anythingÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦"
              className="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl text-white"
              rows={2}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />

            <button
              onClick={() => askAssistant()}
              className="bg-green-600 hover:bg-green-500 px-6 py-3 rounded-xl font-semibold"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

