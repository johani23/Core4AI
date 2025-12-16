// ============================================================================
// 💚 Core4.AI – MerchantProductList (CLEAN MVP VERSION)
// ============================================================================

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import UnifiedPricingCompact from "@/components/pricing/UnifiedPricingCompact";

export default function MerchantProductList() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // --------------------------------------------------------------------------
  // Load products for current merchant
  // --------------------------------------------------------------------------
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/merchant/products");

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await res.json();
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (error) {
      toast.error("فشل تحميل المنتجات");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------------------------------
  // Apply AI price
  // --------------------------------------------------------------------------
  const applyAIPrice = async (productId, price) => {
    try {
      const res = await fetch(`/api/product/${productId}/update-price`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price }),
      });

      if (!res.ok) {
        throw new Error("Failed to apply AI price");
      }

      toast.success("تم تطبيق السعر الذكي بنجاح");
      fetchProducts();
    } catch (error) {
      toast.error("تعذر تطبيق السعر الذكي");
      console.error(error);
    }
  };

  // --------------------------------------------------------------------------
  // UI
  // --------------------------------------------------------------------------
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-green-700">
          منتجات التاجر
        </h2>

        <button
          onClick={() => navigate("/merchant/add-product")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
        >
          + إضافة منتج جديد
        </button>
      </div>

      {loading && (
        <div className="text-center text-gray-500 mb-6">
          جارٍ تحميل المنتجات...
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          لا توجد منتجات بعد — ابدأ بإضافة منتج جديد.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-xl p-4 shadow hover:shadow-md transition"
          >
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400">
                لا توجد صورة
              </div>
            )}

            <h3 className="text-lg font-bold text-gray-900">
              {product.name}
            </h3>

            <p className="text-sm text-gray-600 mt-1">
              {product.description}
            </p>

            <p className="text-sm mt-2">
              السعر الحالي:
              <span className="font-semibold text-green-700 mr-2">
                {product.price} ر.س
              </span>
            </p>

            <div className="mt-4">
              <UnifiedPricingCompact productId={product.id} />
            </div>

            <button
              onClick={() =>
                applyAIPrice(
                  product.id,
                  product.ai_price || product.price
                )
              }
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
            >
              تطبيق السعر الذكي
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
