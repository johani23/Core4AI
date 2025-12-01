// ======================================================================
// ðŸ’š CampaignWizard.jsx â€” Saudi Premium
// ======================================================================

import React, { useEffect, useState } from "react";
import BackToMerchant from "@/components/common/BackToMerchant";
import { motion } from "framer-motion";

export default function CampaignWizard() {
  const [step, setStep] = useState(1);
  const [pricingData, setPricingData] = useState(null);

  useEffect(() => {
    const p = localStorage.getItem("core4ai_pricing");
    if (p) setPricingData(JSON.parse(p));
  }, []);

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 page-wrapper">

      <BackToMerchant />

      <h1 className="text-3xl font-extrabold text-blue-600 mb-8">
        Ø³ÙŽÙˆÙ‘Ù Ø­Ù…Ù„Ø© ØªØ³ÙˆÙŠÙ‚
      </h1>

      {/* ---------------- STEP 1 ---------------- */}
      {step === 1 && (
        <motion.div className="core-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="section-title">ÙˆØ´ Ù‡Ø¯Ù Ø­Ù…Ù„ØªÙƒØŸ</h2>

          {pricingData && (
            <div className="bg-yellow-100 border border-yellow-300 p-3 rounded-lg mb-5">
              <p className="font-bold text-black">ðŸ”Ž ØªÙˆØµÙŠØ© Core4AI:</p>
              <p className="text-gray-700">Ø§Ù„Ø³Ø¹Ø± Ø§Ù„Ù…Ù‚ØªØ±Ø­: {pricingData.best_price} Ø±ÙŠØ§Ù„</p>
              <p className="text-gray-700">Ø§Ù„Ù†Ø·Ø§Ù‚ Ø§Ù„Ù…Ù‚Ø¨ÙˆÙ„: {pricingData.range}</p>
            </div>
          )}

          <button className="btn-green w-full mb-3">Ø£Ø¨ØºÙ‰ Ù…Ø¨ÙŠØ¹Ø§Øª</button>
          <button className="btn-blue w-full mb-3">Ø£Ø¨ØºÙ‰ Ø²ÙŠØ§Ø±Ø§Øª</button>
          <button className="btn-gray w-full">Ù…Ø´Ø§Ù‡Ø¯Ø§Øª / ÙˆØ¹ÙŠ</button>

          <button onClick={next} className="btn-green w-full mt-6">
            Ø§Ù„ØªØ§Ù„ÙŠ
          </button>
        </motion.div>
      )}

      {/* ---------------- STEP 2 ---------------- */}
      {step === 2 && (
        <motion.div className="core-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="section-title">Ù…Ù† Ø¬Ù…Ù‡ÙˆØ±ÙƒØŸ</h2>

          <div className="grid grid-cols-2 gap-3">
            <button className="btn-gray">Ø´Ø¨Ø§Ø¨</button>
            <button className="btn-gray">Ø¹ÙˆØ§Ø¦Ù„</button>
            <button className="btn-gray">Ø·Ù„Ø§Ø¨</button>
            <button className="btn-gray">ÙØ¦Ø© Ø±Ø§Ù‚ÙŠØ©</button>
            <button className="btn-gray">Ø§Ù„Ø±ÙŠØ§Ø¶</button>
            <button className="btn-gray">Ø¬Ø¯Ø©</button>
            <button className="btn-gray">Ø§Ù„Ø´Ø±Ù‚ÙŠØ©</button>
            <button className="btn-gray">Ø§Ù„Ø¬Ù†ÙˆØ¨</button>
          </div>

          <div className="flex justify-between mt-6">
            <button className="btn-gray" onClick={back}>Ø±Ø¬ÙˆØ¹</button>
            <button className="btn-green" onClick={next}>Ø§Ù„ØªØ§Ù„ÙŠ</button>
          </div>
        </motion.div>
      )}

      {/* ---------------- STEP 3 ---------------- */}
      {step === 3 && (
        <motion.div className="core-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="section-title">Ø§Ø®ØªØ± Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ†</h2>

          {pricingData?.elasticity > 1 && (
            <div className="bg-red-100 border border-red-300 p-3 rounded-lg mb-5">
              <p className="font-bold text-black">âš  ØªÙ†Ø¨ÙŠÙ‡:</p>
              <p className="text-gray-700">Ø§Ù„Ø³Ø¹Ø± Ø­Ø³Ø§Ø³â€¦ Ù†ÙˆØµÙ‘ÙŠ ØªØ®ØªØ§Ø± Ù…Ø¤Ø«Ø±ÙŠÙ† Ø£ÙƒØ«Ø±.</p>
            </div>
          )}

          <button
            className="btn-blue w-full"
            onClick={() => (window.location.href = "/merchant/influencers")}
          >
            Ø§Ø¹Ø±Ø¶ Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ† Ø§Ù„Ù…Ù‚ØªØ±Ø­ÙŠÙ†
          </button>

          <div className="flex justify-between mt-6">
            <button className="btn-gray" onClick={back}>Ø±Ø¬ÙˆØ¹</button>
            <button className="btn-green" onClick={next}>Ø§Ù„ØªØ§Ù„ÙŠ</button>
          </div>
        </motion.div>
      )}

      {/* ---------------- STEP 4 ---------------- */}
      {step === 4 && (
        <motion.div className="core-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="section-title">Ø§Ù„Ø¹Ù…ÙˆÙ„Ø§Øª</h2>

          <input className="input mb-4" placeholder="Ù†Ø³Ø¨Ø© Ø§Ù„Ø¹Ù…ÙˆÙ„Ø© (%)" />
          <input className="input mb-4" placeholder="Ù…Ø¨Ù„Øº Ø«Ø§Ø¨Øª (Ø§Ø®ØªÙŠØ§Ø±ÙŠ)" />
          <input className="input mb-4" placeholder="Bonus Ø¥Ø°Ø§ ØªØ­Ù‚Ù‘Ù‚ Ù‡Ø¯Ù Ù…Ø¹ÙŠÙ†" />

          <div className="flex justify-between mt-6">
            <button className="btn-gray" onClick={back}>Ø±Ø¬ÙˆØ¹</button>

            <button
              className="btn-yellow"
              onClick={() => (window.location.href = "/merchant/campaign-summary")}
            >
              Ù…Ù„Ø®Øµ Ø§Ù„Ø­Ù…Ù„Ø©
            </button>
          </div>
        </motion.div>
      )}

    </div>
  );
}
