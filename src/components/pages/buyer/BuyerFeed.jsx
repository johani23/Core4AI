// ============================================================================
// 💚 Core4.AI – BuyerFeed (FIRST OFFICIAL RELEASE)
// Clean • Stable • Buyer-first • Signal-aware (passive)
// No auto-optimization • No risky acceleration
// ============================================================================

import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useAudience } from "@/context/AudienceContext";
import { useBuyer } from "@/context/BuyerContext";
import { useCart } from "@/context/CartContext";
import { useQuickView } from "@/context/QuickViewContext";

import BuyerLayout from "@/components/pages/buyer/BuyerLayout";
import CorePanel from "@/components/ui/CorePanel";
import FloatingCartButton from "@/components/cart/FloatingCartButton";
import CartDrawer from "@/components/cart/CartDrawer";
import QuickViewModal from "@/components/quickview/QuickViewModal";

// Passive signal hook (no decisions)
import { pushDemand } from "@/services/demand";

export default function BuyerFeed() {
  const navigate = useNavigate();

  // Contexts
  const { persona } = useAudience();
  const { wishlist, toggleWishlist, recentViewed, addRecent } = useBuyer();
  const { addToCart } = useCart();
  const { openQuickView } = useQuickView();

  // State
  const [products, setProducts] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const loaderRef = useRef(null);

  // Backend
  const API_BASE =
    import.meta.env.VITE_API_URL || "https://core4ai-backend-o3ie.onrender.com";

  const FALLBACK_IMG =
    "https://images.unsplash.com/photo-1526404757714-4b4f9b2114f9?auto=format&fit=crop&w=800&q=80";

  // ---------------------------------------------------------------------------
  // Load products (no ranking tricks, no manipulation)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(`${API_BASE}/api/products`);
        const data = await res.json();

        const normalized = data.map((p) => ({
          id: p.id,
          name: p.name,
          img: p.image_url || FALLBACK_IMG,
          price: p.price,
          tribe: p.tribe || "General",
          rating: p.rating || 4.7,
          stock: p.stock ?? 5,
          drop: p.drop || "-",
        }));

        setProducts(normalized);
      } catch (e) {
        console.error("BuyerFeed: failed to load products", e);
      }
    }

    loadProducts();
  }, [API_BASE]);

  // ---------------------------------------------------------------------------
  // Gentle ranking (non-exploitive)
  // ---------------------------------------------------------------------------
  const rankedProducts = useMemo(() => {
    if (!persona) return products;

    return [...products]
      .map((p) => ({
        ...p,
        _score:
          (persona.tribe === p.tribe ? 20 : 0) +
          (wishlist.some((w) => w.id === p.id) ? 10 : 0) +
          (recentViewed.some((v) => v.id === p.id) ? 5 : 0),
      }))
      .sort((a, b) => b._score - a._score);
  }, [products, persona, wishlist, recentViewed]);

  const visibleProducts = rankedProducts.slice(0, visibleCount);

  // ---------------------------------------------------------------------------
  // Infinite scroll (safe, predictable)
  // ---------------------------------------------------------------------------
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
  }, [rankedProducts]);

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------
  const stockLabel = (s) => {
    if (s === 0) return { text: "غير متوفر", color: "text-red-400" };
    if (s <= 3) return { text: "كمية محدودة", color: "text-yellow-400" };
    return { text: "متوفر", color: "text-emerald-400" };
  };

  // ---------------------------------------------------------------------------
  // UI
  // ---------------------------------------------------------------------------
  return (
    <BuyerLayout
      title="الاقتراحات الذكية"
      subtitle="منتجات تناسب تفضيلاتك بدون ضغط أو تلاعب"
    >
      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate("/buyer/rnd")}
          className="px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold"
        >
          مختبر نوايا السوق
        </button>
      </div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {visibleProducts.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <CorePanel className="flex flex-col">
              {/* Wishlist */}
              <button
                className="absolute top-3 left-4 text-xl"
                onClick={() => toggleWishlist(p)}
              >
                {wishlist.some((w) => w.id === p.id) ? "♥" : "♡"}
              </button>

              {/* Image */}
              <img
                src={p.img}
                alt={p.name}
                className="w-full h-[220px] object-cover rounded-xl mb-4 cursor-pointer"
                onClick={() => {
                  addRecent(p);

                  // Passive signal only
                  pushDemand({
                    event: "view_product",
                    product_id: p.id,
                    buyer_cluster: persona?.cluster ?? "General",
                    context: { source: "buyer_feed" },
                  });

                  navigate(`/buyer/product/${p.id}`, {
                    state: { product: p },
                  });
                }}
              />

              {/* Info */}
              <div className="text-right">
                <h3 className="text-lg font-bold">{p.name}</h3>

                <p className="text-emerald-400 mt-1 font-semibold">
                  SAR {p.price}
                  <span className="text-gray-400 text-sm ml-2">
                    {p.drop}
                  </span>
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

                {p.stock > 0 && (
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

                      // Passive signal
                      pushDemand({
                        event: "add_to_cart",
                        product_id: p.id,
                        buyer_cluster: persona?.cluster ?? "General",
                        price_hint: p.price,
                        context: { source: "buyer_feed" },
                      });

                      setDrawerOpen(true);
                    }}
                  >
                    أضف للسلة
                  </button>
                )}
              </div>
            </CorePanel>
          </motion.div>
        ))}
      </div>

      {/* Infinite loader */}
      <div ref={loaderRef} className="flex justify-center mt-10">
        {visibleCount < rankedProducts.length && (
          <div className="animate-pulse text-gray-400">
            جاري تحميل المزيد
          </div>
        )}
      </div>

      {/* Overlays */}
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <FloatingCartButton onClick={() => setDrawerOpen(true)} />
      <QuickViewModal />
    </BuyerLayout>
  );
}
