// ============================================================================
// 💚 Core4.AI – MerchantAnalytics.jsx (Arabic RTL Premium Edition)
// ============================================================================
// - Arabic Clean Text
// - RTL layout
// - نفس الواجهة تماماً بدون أي تغيير في التصميم
// ============================================================================

import React, { useEffect, useState } from "react";
import BackToMerchant from "@/components/common/BackToMerchant";
import { motion } from "framer-motion";

export default function MerchantAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load analytics data (placeholder)
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await fetch("/api/merchant/analytics");
      const json = await res.json();
      setAnalytics(json);
      setLoading(false);
    };

    load();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6" dir="rtl">
      <BackToMerchant />

      <h1 className="text-3xl font-extrabold text-purple-600 mb-8 text-center">
        تحليلات التاجر — Core4.AI
      </h1>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-400 animate-pulse">
          جاري تحميل التحليلات…
        </p>
      )}

      {!loading && analytics && (
        <div className="space-y-10">

          {/* ================================ */}
          {/* القسم الأول: ملخص الأداء */}
          {/* ================================ */}
          <motion.div
            className="core-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="section-subtitle text-green-700">ملخص الأداء</h2>

            <p>• إجمالي المبيعات: {analytics.total_sales} ريال</p>
            <p>• عدد الطلبات: {analytics.orders_count}</p>
            <p>• عدد العملاء: {analytics.customers_count}</p>
          </motion.div>

          {/* ================================ */}
          {/* القسم الثاني: أعلى المنتجات أداءً */}
          {/* ================================ */}
          <motion.div
            className="core-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="section-subtitle text-blue-700">
              أفضل المنتجات أداءً
            </h2>

            {analytics.top_products.length === 0 && (
              <p className="text-gray-500">لا يوجد بيانات منتجات.</p>
            )}

            {analytics.top_products.map((product, i) => (
              <div
                key={i}
                className="flex justify-between border-b py-2 last:border-none"
              >
                <p className="font-bold text-gray-800">{product.name}</p>
                <p className="text-green-700 font-semibold">
                  {product.sales} عملية
                </p>
              </div>
            ))}
          </motion.div>

          {/* ================================ */}
          {/* القسم الثالث: أداء الحملات */}
          {/* ================================ */}
          <motion.div
            className="core-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="section-subtitle text-yellow-700">
              أداء الحملات التسويقية
            </h2>

            {analytics.campaigns.length === 0 && (
              <p className="text-gray-500">لا توجد حملات.</p>
            )}

            {analytics.campaigns.map((camp, i) => (
              <div
                key={i}
                className="flex justify-between border-b py-2 last:border-none"
              >
                <div>
                  <p className="font-bold">{camp.name}</p>
                  <p className="text-gray-600 text-sm">
                    معدل التحويل: {Math.round(camp.conversion_rate * 100)}%
                  </p>
                </div>
                <p className="text-purple-700 font-semibold">
                  {camp.revenue} ريال
                </p>
              </div>
            ))}
          </motion.div>

          {/* ================================ */}
          {/* القسم الرابع: شرائح الجمهور */}
          {/* ================================ */}
          <motion.div
            className="core-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="section-subtitle text-pink-700">شرائح الجمهور</h2>

            {analytics.segments.length === 0 && (
              <p className="text-gray-500">لا توجد شرائح.</p>
            )}

            {analytics.segments.map((seg, i) => (
              <div
                key={i}
                className="flex justify-between border-b py-2 last:border-none"
              >
                <p className="font-bold">{seg.name}</p>
                <p className="text-blue-600 font-semibold">
                  {Math.round(seg.percent * 100)}%
                </p>
              </div>
            ))}
          </motion.div>

        </div>
      )}
    </div>
  );
}
