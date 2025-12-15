// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ MerchantProductCard.jsx (Saudi Minimal)
// ------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Reusable product card for merchant dashboard
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Clean white/green Saudi design
// ============================================================


export default function MerchantProductCard({ product, onClick }) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-xl shadow-sm 
                 hover:shadow-md transition cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="h-44 w-full object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>

        {/* Price + CTA */}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-[#006C35]">
            {product.price} SAR
          </span>

          <button
            className="bg-[#006C35] text-white px-4 py-2 rounded-lg
                       hover:bg-green-700 transition"
          >
            ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¹ÃƒËœÃ‚Â¯Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾
          </button>
        </div>
      </div>
    </div>
  );
}


