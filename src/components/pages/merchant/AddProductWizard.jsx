// ======================================================================
// ðŸ’š AddProductWizard.jsx â€” Saudi Premium + Core4AI Pricing Integration
// ======================================================================

import React, { useState } from "react";
import BackToMerchant from "@/components/common/BackToMerchant";
import { motion } from "framer-motion";

export default function AddProductWizard() {
  const [step, setStep] = useState(1);

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [feature, setFeature] = useState("");

  const [competitorName, setCompetitorName] = useState("");
  const [competitorPrice, setCompetitorPrice] = useState("");

  const [featureValue, setFeatureValue] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  const calculatePrice = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/merchant/pricing/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_price: Number(price),
          competitor_price: Number(competitorPrice),
          feature_value: Number(featureValue),
        }),
      });

      const data = await res.json();
      setResult(data);

      // Save pricing for campaign
      localStorage.setItem("core4ai_pricing", JSON.stringify(data));
    } catch (e) {
      console.error("Pricing error:", e);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 page-wrapper">

      <BackToMerchant />

      <h1 className="text-3xl font-extrabold text-green-700 mb-8">
        Ø£Ø¶Ù Ù…Ù†ØªØ¬Ùƒ
      </h1>

      {/* ---------------- STEP 1 ---------------- */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="core-card">
          <h2 className="section-title">Ø¹Ø±Ù‘ÙÙ†Ø§ Ø¨Ù…Ù†ØªØ¬Ùƒ</h2>

          <input className="input mb-4" placeholder="Ø§Ø³Ù… Ø§Ù„Ù…Ù†ØªØ¬"
            value={productName} onChange={(e) => setProductName(e.target.value)} />

          <input className="input mb-4" placeholder="Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ø­Ø§Ù„ÙŠ"
            value={price} onChange={(e) => setPrice(e.target.value)} />

          <input className="input" placeholder="Ø§Ù„Ù…ÙŠØ²Ø© Ø§Ù„Ù…Ù…ÙŠØ²Ø© Ù„Ù„Ù…Ù†ØªØ¬"
            value={feature} onChange={(e) => setFeature(e.target.value)} />

          <button className="btn-green w-full mt-6" onClick={next}>Ø§Ù„ØªØ§Ù„ÙŠ</button>
        </motion.div>
      )}

      {/* ---------------- STEP 2 ---------------- */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="core-card">
          <h2 className="section-title">Ù‚Ø§Ø±ÙÙ† Ø¨Ù…Ù†ØªØ¬ Ø§Ù„Ù…Ù†Ø§ÙØ³</h2>

          <input className="input mb-4" placeholder="Ø§Ø³Ù… Ø§Ù„Ù…Ù†Ø§ÙØ³"
            value={competitorName} onChange={(e) => setCompetitorName(e.target.value)} />

          <input className="input" placeholder="Ø³Ø¹Ø± Ø§Ù„Ù…Ù†Ø§ÙØ³"
            value={competitorPrice} onChange={(e) => setCompetitorPrice(e.target.value)} />

          <div className="flex justify-between mt-6">
            <button className="btn-gray" onClick={back}>Ø±Ø¬ÙˆØ¹</button>
            <button className="btn-green" onClick={next}>Ø§Ù„ØªØ§Ù„ÙŠ</button>
          </div>
        </motion.div>
      )}

      {/* ---------------- STEP 3 ---------------- */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="core-card">
          <h2 className="section-title">ÙƒÙ… ØªØ³ØªØ§Ù‡Ù„ Ù…ÙŠØ²ØªÙƒØŸ</h2>
          <p className="text-gray-600 mb-4">
            Ø§Ø³Ø£Ù„ Ø¹Ù…Ù„Ø§Ø¡Ùƒ: ÙƒÙ… ØªØ³ØªØ§Ù‡Ù„ Ù‡Ø°Ù‡ Ø§Ù„Ù…ÙŠØ²Ø© Ø²ÙŠØ§Ø¯Ø© Ø¨Ø§Ù„Ø³Ø¹Ø±ØŸ
          </p>

          <button className="btn-blue w-full mb-5">ðŸ“Ž Ù†Ø³Ø® Ø±Ø§Ø¨Ø· Ø§Ù„Ø§Ø³ØªØ¨ÙŠØ§Ù†</button>

          <input className="input" placeholder="Ù‚ÙŠÙ…Ø© Ø§Ù„Ù…ÙŠØ²Ø© (Ù…Ù† Ø§Ù„Ù†Ø§Ø³)"
            value={featureValue} onChange={(e) => setFeatureValue(e.target.value)} />

          <div className="flex justify-between mt-6">
            <button className="btn-gray" onClick={back}>Ø±Ø¬ÙˆØ¹</button>
            <button className="btn-green" onClick={next}>Ø§Ù„ØªØ§Ù„ÙŠ</button>
          </div>
        </motion.div>
      )}

      {/* ---------------- STEP 4 ---------------- */}
      {step === 4 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="core-card">
          <h2 className="section-title">Ø£ÙØ¶Ù„ Ø³Ø¹Ø± Ù„Ù…Ù†ØªØ¬Ùƒ</h2>

          {!result && (
            <button
              onClick={calculatePrice}
              className="btn-green w-full mb-6"
              disabled={loading}
            >
              {loading ? "â³ Ø¬Ø§Ø±ÙŠ Ø§Ù„Ø­Ø³Ø§Ø¨..." : "Ø§Ø­Ø³Ø¨ Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ø¢Ù†"}
            </button>
          )}

          {result && (
            <>
              <p className="font-bold text-green-700 text-lg">
                Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ù…Ù‚ØªØ±Ø­: {result.best_price} Ø±ÙŠØ§Ù„
              </p>

              <p className="text-gray-700 mt-2">
                Ø§Ù„Ù†Ø·Ø§Ù‚ Ø§Ù„Ù…Ù‚Ø¨ÙˆÙ„: {result.range}
              </p>

              <p className="text-gray-500 mt-1">
                Ø±Ø¯Ø© ÙØ¹Ù„ Ø§Ù„Ù†Ø§Ø³: {result.reaction}
              </p>

              <button
                className="btn-yellow w-full mt-8"
                onClick={() => (window.location.href = "/merchant/campaign")}
              >
                ðŸ“ˆ Ø§Ø¨Ø¯Ø£ Ø­Ù…Ù„Ø© ØªØ³ÙˆÙŠÙ‚
              </button>
            </>
          )}
        </motion.div>
      )}

    </div>
  );
}
