// ============================================================================
// ðŸ’š Core4.AI â€“ ProductView.jsx
// Premium Saudi Product Page â€” v1.0
// ---------------------------------------------------------------------------
// âœ” Compatible with Shopfront v5.0
// âœ” Product details + features
// âœ” Buy Now â†’ /checkout/:productId
// âœ” RTL + Green/Gold Theme
// ============================================================================

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function ProductView() {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Product from Shopfront
  const [product, setProduct] = useState(location.state?.product || null);

  useEffect(() => {
    if (!product) loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const res = await fetch(`/api/product/${productId}`);
      const data = await res.json();
      setProduct(data);
    } catch (err) {
      toast.error("ÙØ´Ù„ ØªØ­Ù…ÙŠÙ„ Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ù„Ù…Ù†ØªØ¬");
    }
  };

  if (!product) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-gray-400 text-xl"
        dir="rtl"
      >
        â³ Ø¬Ø§Ø±ÙŠ ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ù…Ù†ØªØ¬â€¦
      </div>
    );
  }

  // BUY NOW
  const buyNow = () => {
    navigate(`/checkout/${product.id}`, { state: { product } });
  };

  return (
    <div
      className="min-h-screen px-6 py-10 bg-gradient-to-b 
                 from-black via-[#062016] to-black text-white"
      dir="rtl"
    >
      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-4xl font-extrabold mb-10 text-transparent bg-clip-text
                   bg-gradient-to-r from-green-400 to-green-600"
      >
        ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ù…Ù†ØªØ¬
      </motion.h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* IMAGE SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl 
                     border border-white/20 p-4 shadow-lg"
        >
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-96 object-cover rounded-2xl"
            />
          ) : (
            <div className="w-full h-96 bg-gray-700 rounded-2xl"></div>
          )}
        </motion.div>

        {/* INFO SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-green-400">{product.name}</h2>

          <p className="text-green-300 text-2xl font-semibold">
            {product.price} Ø±ÙŠØ§Ù„
          </p>

          <p className="text-gray-300 leading-relaxed">
            {product.description}
          </p>

          {product.features?.length > 0 && (
            <ul className="list-disc pr-6 text-gray-200 space-y-1 mt-4">
              {product.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          )}

          {/* BUY BUTTON */}
          <button
            onClick={buyNow}
            className="w-full py-4 rounded-2xl bg-green-600 hover:bg-green-700 
                       transition shadow-lg text-lg font-bold mt-6"
          >
            ðŸ›’ Ø§Ø´ØªØ±Ù Ø§Ù„Ø¢Ù†
          </button>
        </motion.div>
      </div>
    </div>
  );
}
