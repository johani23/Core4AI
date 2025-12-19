// ============================================================================
// 🛒 Core4.AI – BuyerProduct v4 PREMIUM EDITION (Ultra Clean)
// ============================================================================

import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useBuyer } from "@/context/BuyerContext";

// Fallback image
const DEFAULT_IMG =
  "https://images.unsplash.com/photo-1526404757714-4b4f9b2114f9?auto=format&fit=crop&w=800&q=80";

export default function BuyerProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const { addToCart } = useCart();
  const { recentViewed, addRecent } = useBuyer();

  // Load product if passed from BuyerFeed
  const initialProduct = location.state?.product || null;

  const [product, setProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(!initialProduct);
  const [error, setError] = useState(false);

  // ✅ BACKEND BASE URL (الحاسم)
  const API_BASE =
    import.meta.env.VITE_API_URL || "https://core4ai-backend-o3ie.onrender.com";

  // ---------------------------------------------------------------------------
  // FETCH PRODUCT FROM API IF NOT PASSED FROM FEED
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (product) return;

    async function load() {
      try {
        setLoading(true);

        // ✅ التعديل الحاسم هنا
        const res = await fetch(`${API_BASE}/api/products/${id}`);
        if (!res.ok) throw new Error("Not found");

        const data = await res.json();

        const normalized = {
          id: data.id,
          name: data.name,
          img: data.image_url || DEFAULT_IMG,
          price: data.price,
          tribe: data.tribe || "عام",
          drop: data.drop || "-10%",
          stock: data.stock ?? 5,
          description: data.description || "لا يوجد وصف متاح.",
          features: data.features || [],
        };

        setProduct(normalized);
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id, product, API_BASE]);

  // Add to recent viewed
  useEffect(() => {
    if (!product) return;
    if (!recentViewed.some((v) => v.id === product.id)) {
      addRecent(product);
    }
  }, [product]);

  // Skeleton loader
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0E] text-white px-6 py-8 animate-pulse">
        <div className="w-full h-[340px] bg-white/10 rounded-2xl mb-6"></div>
        <div className="w-40 h-6 bg-white/10 rounded mb-3"></div>
        <div className="w-24 h-4 bg-white/10 rounded mb-6"></div>
        <div className="w-full h-32 bg-white/10 rounded mb-4"></div>
        <div className="w-full h-10 bg-white/10 rounded mb-3"></div>
        <div className="w-full h-10 bg-white/10 rounded"></div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return <div className="p-6 text-red-400">⚠️ المنتج غير موجود.</div>;
  }

  // Stock label
  const stockStatus = () => {
    if (product.stock === 0) return "❌ غير متوفر";
    if (product.stock <= 3) return "⏳ كمية قليلة";
    return "🟢 متوفر";
  };

  return (
    <div className="min-h-screen bg-[#0D0D0E] text-white px-6 py-8">
      {/* Product Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 rounded-2xl overflow-hidden"
      >
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-[340px] object-cover rounded-2xl border border-white/10 shadow-lg"
        />
      </motion.div>

      {/* Title + Price */}
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

      <div className="flex items-center gap-3 text-lg mb-3">
        <p className="text-emerald-400 font-semibold">SAR {product.price}</p>
        <span className="text-red-400 text-sm">{product.drop}</span>
      </div>

      <p className="text-sm">{stockStatus()}</p>

      {/* AI Insight */}
      <div className="bg-purple-900/20 border border-purple-700/20 rounded-xl p-4 my-6 text-purple-200 text-sm leading-relaxed">
        🔮 تم اقتراح هذا المنتج بناءً على نمط قبيلتك ({product.tribe})
        وسلوكك الشرائي داخل Core4.AI.
      </div>

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">الوصف</h2>
        <p className="text-gray-300 leading-relaxed text-sm">
          {product.description}
        </p>
      </div>

      {/* Features */}
      {product.features.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">المميزات</h2>
          <ul className="text-gray-300 text-sm space-y-1">
            {product.features.map((f, i) => (
              <li key={i}>• {f}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col gap-3 mt-10">
        <button
          className="bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-xl font-semibold"
          onClick={() => navigate(-1)}
        >
          👁 رجوع للصفحة السابقة
        </button>

        <button
          className={`py-3 rounded-xl font-semibold ${
            product.stock > 0
              ? "bg-emerald-600 hover:bg-emerald-500 text-white"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
          onClick={() => product.stock > 0 && addToCart(product)}
        >
          🛒 أضف للسلة
        </button>
      </div>
    </div>
  );
}
