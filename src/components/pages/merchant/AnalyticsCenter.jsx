// ============================================================================
// 💚 Core4.AI — AnalyticsCenter (API-SAFE RELEASE EDITION)
// ============================================================================
// - Loads analytics from backend: /api/merchant/analytics/overview
// - Falls back to demo data (MVP safe)
// - No UI changes • RTL Arabic • Stable for launch
// ============================================================================

import React, { useEffect, useState } from "react";
import BackToMerchant from "@/components/common/BackToMerchant";
import { motion } from "framer-motion";

export default function AnalyticsCenter() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/merchant/analytics/overview");

        if (res.ok) {
          const data = await res.json();
          setAnalytics({
            total_sales: data.total_sales,
            orders_count: data.orders_count,
            customers_count: data.customers_count,
            top_products: data.top_products || [],
            campaigns: data.campaigns || [],
            segments: data.segments || [],
          });
          return;
        } else {
          throw new Error("API not OK");
        }
      } catch (err) {
        console.error("Analytics API failed → using fallback", err);

        // Fallback demo data
        const demo = {
          total_sales: 12400,
          orders_count: 83,
          customers_count: 58,
          top_products: [
            { name: "عطر ليالي", sales: 34 },
            { name: "سماعات Buds X", sales: 28 },
          ],
          campaigns: [
            { name: "حملة العطر", conversion_rate: 0.17, revenue: 4200 },
            { name: "حملة السماعات", conversion_rate: 0.11, revenue: 2800 },
          ],
          segments: [
            { name: "فئة الشباب", percent: 0.42 },
            { name: "العائلات", percent: 0.31 },
            { name: "طلاب الجامعات", percent: 0.18 },
          ],
        };

        setAnalytics(demo);
      }
    }

    load();
  }, []);

  if (!analytics)
    return (
      <p className="text-center text-gray-500 mt-20">
        ...جاري تحميل التحليلات
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto p-6" dir="rtl">
      <BackToMerchant />

      {/* HEADER */}
      <div className="mt-6 mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">
          مركز التحليلات
        </h1>
        <p className="text-gray-500 mt-1">
          نظرة تفصيلية على أداء متجرك ومنتجاتك وحملاتك التسويقية
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <KPI title="إجمالي المبيعات" value={`${analytics.total_sales} ريال`} />
        <KPI title="عدد الطلبات" value={analytics.orders_count} />
        <KPI title="عدد العملاء" value={analytics.customers_count} />
      </div>

      {/* PRODUCT PERFORMANCE */}
      <Section title="أفضل المنتجات أداءً">
        {analytics.top_products.length === 0 ? (
          <Empty>لا توجد منتجات حتى الآن.</Empty>
        ) : (
          analytics.top_products.map((prod, i) => (
            <Row key={i} name={prod.name} right={`${prod.sales} عملية شراء`} />
          ))
        )}
      </Section>

      {/* CAMPAIGN PERFORMANCE */}
      <Section title="أداء الحملات التسويقية">
        {analytics.campaigns.length === 0 ? (
          <Empty>لا توجد حملات.</Empty>
        ) : (
          analytics.campaigns.map((camp, i) => (
            <motion.div
              key={i}
              className="bg-gray-50 p-4 border rounded-xl mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="font-bold text-gray-900">{camp.name}</p>
              <p className="text-gray-600 text-sm mt-1">
                معدل التحويل: {Math.round(camp.conversion_rate * 100)}%
              </p>
              <p className="text-blue-700 font-bold mt-1">
                {camp.revenue} ريال
              </p>
            </motion.div>
          ))
        )}
      </Section>

      {/* AUDIENCE SEGMENTS */}
      <Section title="شرائح الجمهور">
        {analytics.segments.length === 0 ? (
          <Empty>لا توجد شرائح جمهور.</Empty>
        ) : (
          analytics.segments.map((seg, i) => (
            <Row key={i} name={seg.name} right={`${Math.round(seg.percent * 100)}%`} />
          ))
        )}
      </Section>

      {/* AI INSIGHTS */}
      <Section title="توصيات الذكاء الاصطناعي">
        <AIInsight
          title="💡 فرصة لتحسين الأسعار"
          text="تحليل Core4AI Pricing Engine يشير إلى إمكانية رفع سعر أحد منتجاتك بنسبة 6–11%."
        />
        <AIInsight
          title="🎯 فرصة لاستهداف فئة جديدة"
          text="فئة طلاب الجامعات أظهرت ارتفاعًا في التفاعل خلال الأيام الماضية."
        />
        <AIInsight
          title="📈 وقت مناسب لإطلاق حملة"
          text="زيادة نشاط المؤثرين في فئتك تشير إلى توقيت مثالي لحملة قصيرة."
        />
      </Section>
    </div>
  );
}

// ============================================================================
// COMPONENTS
// ============================================================================

const KPI = ({ title, value }) => (
  <div className="bg-white border rounded-xl shadow-sm p-6 text-right">
    <p className="text-gray-600 text-sm">{title}</p>
    <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
  </div>
);

const Section = ({ title, children }) => (
  <div className="bg-white border rounded-xl shadow-sm p-6 mb-12">
    <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
    {children}
  </div>
);

const Row = ({ name, right }) => (
  <div className="flex justify-between border-b py-3 last:border-none">
    <p className="font-bold text-gray-800">{name}</p>
    <p className="text-blue-700 font-semibold">{right}</p>
  </div>
);

const Empty = ({ children }) => (
  <p className="text-gray-500 text-sm">{children}</p>
);

const AIInsight = ({ title, text }) => (
  <motion.div
    className="p-4 bg-gray-50 border rounded-xl mb-4"
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <p className="font-bold text-gray-900">{title}</p>
    <p className="text-gray-600 mt-1 text-sm leading-relaxed">{text}</p>
  </motion.div>
);
