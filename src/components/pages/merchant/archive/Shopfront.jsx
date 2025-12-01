// ============================================================
// ðŸ‡¸ðŸ‡¦ Core4.AI â€“ Shopfront.jsx
// Saudi Premium Storefront â€” v5.0
// ------------------------------------------------------------
// âœ” Fetch merchant products: /api/merchant/{merchantId}/products
// âœ” Royal Saudi UI (Green + Gold + Glass)
// âœ” Product cards + Buy Now + skeletons
// âœ” Checkout starter â†’ /api/checkout/start
// ============================================================

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Shopfront() {
  const { merchantId } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Merchant Products
  useEffect(() => {
    fetch(`/api/merchant/${merchantId}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data || []);
        setLoading(false);
      })
      .catch(() => {
        console.log("Error fetching products");
        setLoading(false);
      });
  }, [merchantId]);

  // Start Checkout
  const buyNow = async (productId) => {
    try {
      const res = await fetch("/api/checkout/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          buyer_id: "guest_001",
          creator_id: null,
          tribe_id: null,
        }),
      });

      const data = await res.json();
      if (data.session_id) {
        navigate(`/payment/${data.session_id}`);
      }
    } catch (err) {
      console.log("Checkout Error:", err);
    }
  };

  return (
    <div
      className="min-h-screen p-10 bg-gradient-to-b 
                 from-[#041B11] via-[#072818] to-black text-white"
      dir="rtl"
    >
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-4xl font-extrabold mb-12 text-transparent bg-clip-text
                   bg-gradient-to-r from-green-400 to-green-600"
      >
        Ù…ØªØ¬Ø± Ø§Ù„ØªØ§Ø¬Ø±
      </motion.h1>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-white/10 h-72 rounded-3xl"
            ></div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && products.length === 0 && (
        <div className="text-center text-gray-300 text-xl mt-20">
          Ù„Ø§ ØªÙˆØ¬Ø¯ Ù…Ù†ØªØ¬Ø§Øª Ù„Ù‡Ø°Ø§ Ø§Ù„ØªØ§Ø¬Ø± Ø­Ø§Ù„ÙŠØ§Ù‹.
        </div>
      )}

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((p, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 
                       rounded-3xl overflow-hidden shadow-lg hover:shadow-green-500/20 
                       transition-all"
          >
            {/* Product Image */}
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-56 object-cover rounded-t-3xl"
            />

            {/* Content */}
            <div className="p-6 space-y-3">
              <h2 className="text-xl font-bold">{p.name}</h2>

              <p className="text-green-300 font-semibold text-lg">
                {p.price} Ø±ÙŠØ§Ù„
              </p>

              <p className="text-gray-300 text-sm line-clamp-2">{p.description}</p>

              {/* Buttons */}
              <div className="flex justify-between mt-4">

                <button
                  onClick={() => navigate(`/merchant/product/${p.id}/intel`)}
                  className="px-4 py-2 text-sm rounded-xl bg-white/20 
                             border border-white/30 hover:bg-white/10"
                >
                  Ø°ÙƒØ§Ø¡ Ø§Ù„Ù…Ù†ØªØ¬
                </button>

                <button
                  onClick={() => buyNow(p.id)}
                  className="px-4 py-2 text-sm rounded-xl bg-green-600 
                             hover:bg-green-700 text-white shadow-lg"
                >
                  Ø§Ø´ØªØ±ÙŠ Ø§Ù„Ø¢Ù†
                </button>

              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
