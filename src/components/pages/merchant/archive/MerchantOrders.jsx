// ============================================================
// ðŸ‡¸ðŸ‡¦ Core4.AI â€“ MerchantProductList.jsx
// Saudi Commerce Elite Edition â€” v4.0
// ------------------------------------------------------------
// âœ” Fetch merchant products: /api/merchant/{id}/products
// âœ” Saudi ZGlass UI + Royal Gradient
// âœ” Product Cards + ProductIQ Button
// âœ” Adapted for full Saudi Identity
// ============================================================

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiPlus, FiTrendingUp, FiDollarSign } from "react-icons/fi";
import toast from "react-hot-toast";

export default function MerchantProductList() {
  const merchantId = "merchant_001"; // (Later from Auth)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch merchant products
  useEffect(() => {
    fetch(`/api/merchant/${merchantId}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data || []);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Ø®Ø·Ø£ Ø£Ø«Ù†Ø§Ø¡ ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ù…Ù†ØªØ¬Ø§Øª");
        setLoading(false);
      });
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Ø¬Ø§Ø±ÙŠ ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ù…Ù†ØªØ¬Ø§Øª...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-10 bg-gradient-to-b 
                 from-[#031A11] via-[#062014] to-black text-white"
      dir="rtl"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex justify-between items-center mb-10"
      >
        <h1
          className="text-4xl font-extrabold 
                     text-transparent bg-clip-text
                     bg-gradient-to-r from-green-400 to-green-600"
        >
          Ù…Ù†ØªØ¬Ø§Øª Ø§Ù„ØªØ§Ø¬Ø±
        </h1>

        <Link to="/merchant/add-product">
          <button className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-2xl text-lg font-bold flex items-center gap-2">
            <FiPlus size={20} /> Ø¥Ø¶Ø§ÙØ© Ù…Ù†ØªØ¬
          </button>
        </Link>
      </motion.div>

      {/* If no products */}
      {products.length === 0 && (
        <div className="text-center text-gray-300 mt-20 text-xl">
          Ù„Ø§ ØªÙˆØ¬Ø¯ Ù…Ù†ØªØ¬Ø§Øª Ø­ØªÙ‰ Ø§Ù„Ø¢Ù†.
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
        {products.map((p, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 
                       p-5 rounded-3xl shadow-lg flex flex-col"
          >
            {/* Image */}
            <div className="w-full h-52 rounded-2xl overflow-hidden mb-4">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name */}
            <h2 className="text-xl font-bold mb-1">{p.name}</h2>

            {/* Description */}
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {p.description || "Ù„Ø§ ÙŠÙˆØ¬Ø¯ ÙˆØµÙ"}
            </p>

            {/* Price */}
            <div className="flex items-center gap-2 text-green-300 text-lg mb-4">
              <FiDollarSign size={20} />
              <span className="font-bold">{p.price} Ø±ÙŠØ§Ù„</span>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">

              {/* ProductIQ */}
              <Link to={`/merchant/product/${p.id}/intel`}>
                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                  <FiTrendingUp /> ProductIQ
                </button>
              </Link>

              {/* Edit (future) */}
              <button className="px-4 py-2 rounded-xl text-sm font-bold bg-white/10 border border-white/20 text-gray-300 cursor-not-allowed">
                ØªØ¹Ø¯ÙŠÙ„
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
