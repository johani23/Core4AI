// ============================================================
// ðŸ’š Core4.AI â€“ ProductInfluencerAssign.jsx (Saudi Edition)
// ------------------------------------------------------------
// â€¢ Fetch suggested influencers for a product
// â€¢ Assign influencer â†’ product
// â€¢ Add audience promoters
// â€¢ See expected conversion, tribe match & impact
// â€¢ Fully tied to API v203
// ============================================================

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { FiUsers, FiStar, FiCheck, FiArrowRight, FiTrendingUp } from "react-icons/fi";

export default function ProductInfluencerAssign() {
  const { productId } = useParams();
  
  const [product, setProduct] = useState(null);
  const [influencers, setInfluencers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [impact, setImpact] = useState(null);
  const [saving, setSaving] = useState(false);

  // ------------------------------------------------------------
  // Load Product
  // ------------------------------------------------------------
  useEffect(() => {
    fetch(`/api/product/${productId}`)
      .then((res) => res.json())
      .then(setProduct)
      .catch((e) => console.error("Product Load Error:", e));
  }, [productId]);

  // ------------------------------------------------------------
  // Load Suggested Influencers
  // ------------------------------------------------------------
  useEffect(() => {
    fetch(`/api/merchant/suggest_influencers/${productId}`)
      .then((res) => res.json())
      .then((data) => setInfluencers(data.recommended_influencers))
      .catch((e) => console.error("Influencer Suggest Error:", e));
  }, [productId]);


  // ------------------------------------------------------------
  // Toggle influencer selection
  // ------------------------------------------------------------
  const toggleSelect = (influencer) => {
    if (selected.find((s) => s.name === influencer.name)) {
      setSelected(selected.filter((s) => s.name !== influencer.name));
    } else {
      setSelected([...selected, influencer]);
    }
  };

  // ------------------------------------------------------------
  // Save influencer assignment
  // ------------------------------------------------------------
  const saveAssignments = async () => {
    setSaving(true);

    const res = await fetch(`/api/merchant/assign_influencers/${productId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        influencers: selected.map((s) => s.name),
      }),
    });

    const data = await res.json();
    setImpact(data.impact || null);
    setSaving(false);
  };


  if (!product) {
    return (
      <div className="min-h-screen text-center text-white pt-20">
        Ø¬Ø§Ø±ÙŠ ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ù…Ù†ØªØ¬...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-[#002b16] text-white">
      
      {/* ------------------------------------------------------ */}
      {/* HEADER */}
      {/* ------------------------------------------------------ */}
      <motion.h1
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-extrabold mb-4 text-[#4cff9b]"
      >
        Ø§Ø®ØªÙŠØ§Ø± Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ† Ù„Ù„Ù…Ù†ØªØ¬
      </motion.h1>

      <p className="text-gray-300 mb-8">
        Ù‚Ù… Ø¨Ø§Ø®ØªÙŠØ§Ø± Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ† Ø§Ù„Ù…Ù†Ø§Ø³Ø¨ÙŠÙ† Ù„Ø¥Ø·Ù„Ø§Ù‚ Ø­Ù…Ù„Ø© ØªØ³ÙˆÙŠÙ‚ ÙØ¹Ù‘Ø§Ù„Ø© Ù„Ù„Ù…Ù†ØªØ¬.
      </p>

      {/* PRODUCT BOX */}
      <div className="mb-10 bg-[#01341c] p-6 rounded-xl border border-[#1d6642] flex items-center gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-32 h-32 object-cover rounded-xl border border-[#145f3a]"
        />
        <div>
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-gray-400">{product.description}</p>
          <p className="text-[#4cff9b] font-bold mt-2">
            {product.price} Ø±ÙŠØ§Ù„
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------ */}
      {/* INFLUENCERS LIST */}
      {/* ------------------------------------------------------ */}
      <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
        <FiUsers /> Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ† Ø§Ù„Ù…Ù‚ØªØ±Ø­ÙŠÙ†
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {influencers.map((inf, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl border ${
              selected.find((s) => s.name === inf.name)
                ? "border-[#4cff9b] bg-[#003c22]"
                : "border-[#1d6642] bg-[#012d1a]"
            } cursor-pointer`}
            onClick={() => toggleSelect(inf)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">{inf.name}</h3>
              {selected.find((s) => s.name === inf.name) && (
                <FiCheck className="text-[#4cff9b] text-xl" />
              )}
            </div>

            <p className="text-gray-300 mt-1">Ø§Ù„Ù‚Ø¨ÙŠÙ„Ø©: {inf.tribe}</p>

            <p className="mt-1 text-[#4cff9b] font-semibold flex items-center gap-2">
              <FiStar /> ØªØ£Ø«ÙŠØ±: {inf.score}
            </p>
          </motion.div>
        ))}
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={saveAssignments}
        disabled={saving}
        className="mt-6 bg-[#00b462] hover:bg-[#009a52] px-6 py-3 rounded-lg font-bold text-lg w-full"
      >
        {saving ? "Ø¬Ø§Ø±ÙŠ Ø§Ù„Ø­ÙØ¸..." : "Ø­ÙØ¸ Ø§Ù„Ù…Ø¤Ø«Ø±ÙŠÙ† Ø§Ù„Ù…Ø®ØªØ§Ø±ÙŠÙ†"}
      </button>

      {/* ------------------------------------------------------ */}
      {/* IMPACT RESULT */}
      {/* ------------------------------------------------------ */}
      {impact && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-[#01341c] p-6 rounded-xl border border-[#1d6642]"
        >
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            <FiTrendingUp /> Ø§Ù„ØªØ£Ø«ÙŠØ± Ø§Ù„Ù…ØªÙˆÙ‚Ø¹ Ù„Ù„Ø­Ù…Ù„Ø©
          </h3>

          <p className="text-lg text-[#4cff9b] font-semibold">
            {impact.predicted_conversion}% Ù…Ø¹Ø¯Ù„ ØªØ­ÙˆÙŠÙ„ Ù…ØªÙˆÙ‚Ø¹
          </p>

          <p className="text-gray-300 mt-2">
            {impact.description}
          </p>
        </motion.div>
      )}

    </div>
  );
}
