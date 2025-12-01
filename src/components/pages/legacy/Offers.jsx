// ============================================================
// ðŸ’Ž Core4.AI â€“ Offers.jsx (v3.6 â€œInteractive Marketplace Hubâ€)
// ------------------------------------------------------------
// âœ… Search + Category + Sort controls
// âœ… Stable Amazon-style layout (no 3D transforms)
// âœ… Adds â€œPromoteâ€ flow for creators â†’ saves to sessionStorage
// âœ… Toast feedback + hover animation polish
// ============================================================

import React, { useEffect, useState, useMemo } from "react";
import {
  FaTags,
  FaClock,
  FaFire,
  FaShoppingCart,
  FaSearch,
  FaRocket,
} from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("popular");
  const [query, setQuery] = useState("");

  // ðŸ§± Mock data (replace later with API)
  useEffect(() => {
    setOffers([
      {
        id: 1,
        merchant: "UrbanGear",
        title: "Wireless Headset Pro X",
        category: "Tech",
        img: "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=600",
        price: 149.99,
        discount: 25,
        cashback: 2.5,
        expires: "2d 4h",
        rating: 4.8,
      },
      {
        id: 2,
        merchant: "BrandX",
        title: "Smart Fitness Watch",
        category: "Fashion",
        img: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=600",
        price: 99.0,
        discount: 35,
        cashback: 3.2,
        expires: "1d 12h",
        rating: 4.5,
      },
      {
        id: 3,
        merchant: "Techy",
        title: "AI Keyboard â€“ Creator Edition",
        category: "Tech",
        img: "https://images.pexels.com/photos/276466/pexels-photo-276466.jpeg?auto=compress&cs=tinysrgb&w=600",
        price: 189.0,
        discount: 15,
        cashback: 1.8,
        expires: "3d 10h",
        rating: 4.9,
      },
      {
        id: 4,
        merchant: "NovaWear",
        title: "Luxury Minimalist Hoodie",
        category: "Fashion",
        img: "https://images.pexels.com/photos/7679468/pexels-photo-7679468.jpeg?auto=compress&cs=tinysrgb&w=600",
        price: 59.9,
        discount: 20,
        cashback: 1.2,
        expires: "5d 2h",
        rating: 4.2,
      },
    ]);
  }, []);

  // ðŸ” Filtering + sorting
  const filtered = useMemo(() => {
    return offers
      .filter((o) =>
        category === "All" ? true : o.category.toLowerCase() === category.toLowerCase()
      )
      .filter((o) => o.title.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => {
        if (sort === "discount") return b.discount - a.discount;
        if (sort === "cashback") return b.cashback - a.cashback;
        if (sort === "price_low") return a.price - b.price;
        if (sort === "price_high") return b.price - a.price;
        return b.rating - a.rating;
      });
  }, [offers, category, sort, query]);

  // ðŸª™ Promote flow â†’ save offer for CollabHub or PromoteAndEarn
  const handlePromote = (offer) => {
    sessionStorage.setItem("selectedOffer", JSON.stringify(offer));
    toast.success(`ðŸš€ ${offer.title} added to Collaboration Hub!`);
  };

  return (
    <div className="p-8 text-gray-100 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-pink-400">
          <FaTags /> Marketplace Offers
        </h1>

        {/* Search + Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search offers..."
              className="pl-8 pr-3 py-2 rounded-lg border border-gray-700 bg-gray-900 text-sm text-gray-200 w-48 sm:w-64 focus:ring-1 focus:ring-pink-500 outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <select
            className="border border-gray-700 rounded-lg p-2 bg-gray-900 text-sm text-gray-200"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All</option>
            <option>Tech</option>
            <option>Fashion</option>
          </select>

          <select
            className="border border-gray-700 rounded-lg p-2 bg-gray-900 text-sm text-gray-200"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="popular">Sort by: Popular</option>
            <option value="discount">Highest Discount</option>
            <option value="cashback">Best Cashback</option>
            <option value="price_low">Price: Low â†’ High</option>
            <option value="price_high">Price: High â†’ Low</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((offer) => (
          <motion.div
            key={offer.id}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-900 rounded-xl border border-gray-800 shadow hover:shadow-pink-500/20 transition-all p-4 flex flex-col"
          >
            <img
              src={offer.img}
              alt={offer.title}
              className="rounded-lg mb-3 h-40 w-full object-cover"
            />

            <div className="flex justify-between items-start mb-1">
              <h2 className="font-semibold text-base text-gray-100 leading-tight">
                {offer.title}
              </h2>
              <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-md">
                {offer.discount}% OFF
              </span>
            </div>

            <p className="text-sm text-gray-400 mb-2">
              by <span className="font-medium text-gray-200">{offer.merchant}</span>
            </p>

            <div className="flex justify-between items-center mt-auto">
              <div>
                <p className="text-lg font-bold text-gray-100">${offer.price}</p>
                <p className="text-xs text-green-400">+{offer.cashback} C4T cashback</p>
              </div>

              {/* Dual buttons: Buy or Promote */}
              <div className="flex flex-col gap-1 items-end">
                <button
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm px-3 py-1.5 rounded-md flex items-center gap-1 hover:opacity-90"
                  onClick={() => toast.success(`ðŸ›’ Added ${offer.title} to cart!`)}
                >
                  <FaShoppingCart /> Shop
                </button>
                <button
                  className="bg-gradient-to-r from-purple-500 to-blue-600 text-white text-xs px-3 py-1 rounded-md flex items-center gap-1 hover:opacity-90"
                  onClick={() => handlePromote(offer)}
                >
                  <FaRocket /> Promote
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
              <span className="flex items-center gap-1">
                <FaClock /> {offer.expires}
              </span>
              <span className="flex items-center gap-1 text-orange-400">
                <FaFire /> Hot Deal
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-gray-500 mt-12 text-sm">
          No offers match your search. Try adjusting filters.
        </div>
      )}
    </div>
  );
}
