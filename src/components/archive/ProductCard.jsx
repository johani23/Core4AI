// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ ProductCard.jsx (v1.0 "Unified Product Tile")
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â Used in MerchantProductList.jsx
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â Consistent Dashboard look
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â Buttons ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Intelligence + Buy Simulation
// ============================================================

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <motion.div
      className="bg-gray-900/60 rounded-2xl shadow-xl border border-gray-800 
                 backdrop-blur p-6 flex flex-col hover:shadow-2xl transition-all"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover rounded-xl mb-4 border border-gray-700"
      />

      {/* Title */}
      <h2 className="text-xl font-bold mb-1">{product.name}</h2>

      {/* Price */}
      <p className="text-green-300 font-semibold mb-2">${product.price}</p>

      {/* Description */}
      <p className="text-gray-400 text-sm flex-grow">{product.description}</p>

      {/* CTA Buttons */}
      <div className="mt-6 flex gap-3">

        {/* View Intelligence */}
        <button
          onClick={() => navigate(`/merchant/product/${product.id}/intel`)}
          className="flex-1 py-2 rounded-xl 
                     bg-purple-600 hover:bg-purple-700 
                     transition font-semibold text-sm"
        >
          Intelligence
        </button>

        {/* Simulate Buy */}
        <button
          onClick={() => navigate(`/checkout/${product.id}`)}
          className="flex-1 py-2 rounded-xl 
                     bg-blue-600 hover:bg-blue-700 
                     transition font-semibold text-sm"
        >
          Buy
        </button>

      </div>
    </motion.div>
  );
}


