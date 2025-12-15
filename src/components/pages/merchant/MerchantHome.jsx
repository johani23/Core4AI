// ============================================================================
// 💚 Core4.AI – MerchantHome.jsx (Saudi Premium – Clean RTL Edition)
// ============================================================================
// - واجهة التاجر الرئيسية مع Product Matching Panel
// - RTL Clean
// ============================================================================

import { motion } from "framer-motion";
import BackToMerchant from "@/components/common/BackToMerchant";
import ProductInfluencerSuggestions from "./ProductInfluencerSuggestions";
import { products } from "@/data/products";
import InfluencerMatchTop3Panel from "./InfluencerMatchTop3Panel";


export default function MerchantHome() {
  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 page-wrapper" dir="rtl">
      
      {/* زر الرجوع */}
      <BackToMerchant />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-extrabold text-green-600 drop-shadow-xl">
          مركز التاجر — Core4.AI
        </h1>

        <p className="text-gray-600 mt-4 text-lg leading-relaxed">
          منصة ذكية تساعدك في تحليل الأسعار، إدارة الحملات، اختيار المؤثرين
          المناسبين، وتحقيق أقصى ربح عبر نظام تسعير وتوصيات مدعومة بالذكاء
          الاصطناعي.
        </p>
      </motion.div>

      {/* Product - Influencer Matching */}
      <ProductInfluencerSuggestions product={products[0]} />
      <InfluencerMatchTop3Panel product={products[0]} />


      {/* BUTTONS GRID */}
      <div className="grid grid-cols-1 gap-6 mt-10">

        {/* إضافة منتج */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          className="btn-green text-xl py-5"
          onClick={() => (window.location.href = "/merchant/add-product")}
        >
          ➕ أضِف منتج جديد
        </motion.button>

        {/* بناء حملة */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          className="btn-blue text-xl py-5"
          onClick={() => (window.location.href = "/merchant/campaign")}
        >
          📢 إنشاء حملة تسويقية
        </motion.button>

        {/* الأرباح */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          className="btn-yellow text-xl py-5"
          onClick={() => (window.location.href = "/merchant/earnings")}
        >
          💰 مركز الأرباح
        </motion.button>

        {/* اختيار المؤثرين */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          className="btn-purple text-xl py-5"
          onClick={() => (window.location.href = "/merchant/influencers")}
        >
          👑 المؤثرون المختارون
        </motion.button>

        {/* التحليلات */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          className="btn-pink text-xl py-5"
          onClick={() => (window.location.href = "/merchant/analytics")}
        >
          📊 تحليلات الأسعار والأداء
        </motion.button>

      </div>
    </div>
  );
}
