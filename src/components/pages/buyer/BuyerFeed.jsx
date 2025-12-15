// ============================================================================
// Core4.AI – BuyerFeed (CLEAN FINAL VERSION)
// No emojis • Stable JSX • Cart + Wishlist + RND working
// ============================================================================

import { useAudience } from "@/context/AudienceContext";
import { useBuyer } from "@/context/BuyerContext";
import { useCart } from "@/context/CartContext";
import { useQuickView } from "@/context/QuickViewContext";

import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import CorePanel from "@/components/ui/CorePanel";
import FloatingCartButton from "../../cart/FloatingCartButton";
import CartDrawer from "../../cart/CartDrawer";
import QuickViewModal from "../../quickview/QuickViewModal";
import BuyerLayout from "@/components/pages/buyer/BuyerLayout";

export default function BuyerFeed() {
  const navigate = useNavigate();

  const { persona } = useAudience();
  const { wishlist, toggleWishlist, recentViewed, addRecent } = useBuyer();
  const { addToCart } = useCart();
  const { openQuickView } = useQuickView();

  const [products, setProducts] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const loaderRef = useRef(null);

  window.__open_cart_drawer = () => setDrawerOpen(true);

  const FALLBACK_IMG =
    "https://images.unsplash.com/photo-1526404757714-4b4f9b2114f9?auto=format&fit=crop&w=800&q=80";

  // --------------------------------------------------------------------------
  // Load products
  // --------------------------------------------------------------------------
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        const normalized = data.map((p) => ({
          id: p.id,
          name: p.name,
          img: p.image_url || FALLBACK_IMG,
          price: p.price,
          tribe: p.tribe || "General",
          rating: p.rating || 4.7,
          stock: p.stock ?? 5,
          drop: p.drop || "-10%",
        }));

        setProducts(normalized);
      } catch (err) {
        console.error("Failed to load products", err);
      }
    }

    load();
  }, []);

  // --------------------------------------------------------------------------
  // Ranking logic
  // --------------------------------------------------------------------------
  const ranked = useMemo(() => {
    if (!persona) return products;

    return products
      .map((p) => ({
        ...p,
        _score:
          (persona.tribe === p.tribe ? 40 : 0) +
          (wishlist.some((w) => w.id === p.id) ? 15 : 0) +
          (recentViewed.some((v) => v.id === p.id) ? 10 : 0) +
          (p.rating >= 4.8 ? 20 : 0) +
          (p.stock === 0 ? -20 : p.stock <= 3 ? 5 : 0),
      }))
      .sort((a, b) => b._score - a._score);
  }, [products, persona, wishlist, recentViewed]);

  const visibleProducts = ranked.slice(0, visibleCount);

  // --------------------------------------------------------------------------
  // Infinite scroll
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((v) => v + 6);
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [ranked]);

  // --------------------------------------------------------------------------
  // Helpers
  // --------------------------------------------------------------------------
  const stockLabel = (s) => {
    if (s === 0) return { text: "غير متوفر", color: "text-red-400" };
    if (s <= 3) return { text: "كمية قليلة", color: "text-yellow-400" };
    return { text: "متوفر", color: "text-emerald-400" };
  };

  // --------------------------------------------------------------------------
  // UI
  // --------------------------------------------------------------------------
  return (
    <BuyerLayout
      title="الاقتراحات الذكية"
      subtitle="هذه المنتجات تناسب تفضيلاتك"
    >
      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate("/buyer/rnd")}
          className="px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold"
        >
          مختبر نوايا السوق
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleProducts.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CorePanel className="p-4 rounded-2xl relative shadow-lg flex flex-col">
              <button
                className="absolute top-3 left-4 text-xl"
                onClick={() => toggleWishlist(p)}
              >
                {wishlist.some((w) => w.id === p.id) ? "♥" : "♡"}
              </button>

              <img
                src={p.img}
                alt={p.name}
                onClick={() => {
                  addRecent(p);
                  navigate(`/buyer/product/${p.id}`, {
                    state: { product: p },
                  });
                }}
                className="w-full h-[220px] object-cover rounded-xl mb-4 cursor-pointer"
              />

              <div className="text-right">
                <h3 className="text-lg font-bold">{p.name}</h3>

                <p className="text-emerald-400 mt-1 font-semibold">
                  SAR {p.price}
                  <span className="text-red-400 text-sm ml-2">{p.drop}</span>
                </p>

                <p className={`mt-2 ${stockLabel(p.stock).color}`}>
                  {stockLabel(p.stock).text}
                </p>

                <button
                  className="mt-4 w-full bg-purple-600 hover:bg-purple-500 text-white rounded-xl py-2 text-sm font-semibold"
                  onClick={() => openQuickView(p)}
                >
                  عرض سريع
                </button>

                {p.stock > 0 ? (
                  <button
                    className="mt-2 w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-2 text-sm font-semibold"
                    onClick={() => {
                      addToCart({
                        product_id: p.id,
                        name: p.name,
                        price: p.price,
                        image_url: p.img,
                        quantity: 1,
                      });
                      setDrawerOpen(true);
                    }}
                  >
                    أضف للسلة
                  </button>
                ) : (
                  <button
                    disabled
                    className="mt-2 w-full bg-gray-700 text-gray-400 rounded-xl py-2 text-sm font-semibold cursor-not-allowed"
                  >
                    غير متوفر
                  </button>
                )}

                <button
                  className="mt-2 w-full bg-gray-800 hover:bg-gray-700 text-purple-300 rounded-xl py-2 text-sm font-semibold"
                  onClick={() => navigate("/buyer/rnd")}
                >
                  اقترح سعر أو اطلب ميزة
                </button>
              </div>
            </CorePanel>
          </motion.div>
        ))}
      </div>

      <div ref={loaderRef} className="flex justify-center mt-10">
        {visibleCount < ranked.length && (
          <div className="animate-pulse text-gray-400">
            جاري تحميل المزيد
          </div>
        )}
      </div>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <FloatingCartButton onClick={() => setDrawerOpen(true)} />
      <QuickViewModal />
    </BuyerLayout>
  );
}
