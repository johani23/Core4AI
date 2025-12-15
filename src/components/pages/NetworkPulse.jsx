// ============================================================================
// 🔮 Core4.AI – Pulse v1 (Creator Economy Edition – Noor Final)
// ============================================================================

import { motion } from "framer-motion";

export default function NetworkPulse() {
  return (
    <div className="min-h-screen bg-[#0D0D0E] text-white px-6 py-8">

      {/* ------------------------------------- */}
      {/* 🔮 HERO BANNER */}
      {/* ------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-purple-900/40 to-purple-700/20 
                   border border-purple-600/30 rounded-2xl p-6 mb-10 shadow-xl"
      >
        <h1 className="text-2xl font-bold text-purple-300 mb-2">
          نبض Core4 اليوم 🔮
        </h1>
        <p className="text-gray-300 text-sm leading-relaxed">
          ارتفاع في تفاعل القبائل، وزيادة في منشورات المبدعين، وتحسن في حركة المشتريات خلال آخر 24 ساعة.
        </p>
      </motion.div>


      {/* ------------------------------------- */}
      {/* ⚡ MOMENTUM METRICS (3 CARDS) */}
      {/* ------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">

        {/* Creators */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-1">نشاط المبدعين 🎬</h3>
          <p className="text-purple-300 font-bold text-xl">+22%</p>
          <p className="text-gray-400 text-sm">32 منشور جديد اليوم</p>
        </motion.div>

        {/* Tribes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-1">تفاعل القبائل ⚡</h3>
          <p className="text-purple-300 font-bold text-xl">+14%</p>
          <p className="text-gray-400 text-sm">٨٫٢ معدل التفاعل العام</p>
        </motion.div>

        {/* Buyers */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-1">حركة المشتري 🛒</h3>
          <p className="text-purple-300 font-bold text-xl">+19%</p>
          <p className="text-gray-400 text-sm">تحسن في الطلبات المقترحة</p>
        </motion.div>

      </div>


      {/* ------------------------------------- */}
      {/* 🤖 AI INSIGHT */}
      {/* ------------------------------------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-purple-800/20 border border-purple-600/20 rounded-2xl p-5 mb-10"
      >
        <h3 className="text-lg font-semibold text-purple-300 mb-2">تحليل الذكاء الاصطناعي 🤖</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          يتوقع النظام زيادة نشاط قبيلة Techy خلال الساعات القادمة  
          بناءً على معدل التفاعل، حركة المحتوى، وسلوك الشراء الحالي.
        </p>
      </motion.div>


      {/* ------------------------------------- */}
      {/* 🔁 ACTIVITY STREAM (TICKER FEED) */}
      {/* ------------------------------------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-lg"
      >
        <h3 className="text-lg font-semibold mb-3">تيار النشاط اللحظي 🔁</h3>

        <div className="space-y-2 text-gray-300 text-sm">
          <div>🟣 TribeTechy ↑ زيادة في النقاشات</div>
          <div>⚡ FlashDeals ↑ ارتفاع عمليات التصفح</div>
          <div>🎬 CreatorPosts ↑ زيادة في المحتوى المنشور</div>
          <div>🛒 BuyerShift → استقرار في حركة الشراء</div>
          <div>🔥 TribeWars ↑ ارتفاع التحديات بين القبائل</div>
        </div>
      </motion.div>

    </div>
  );
}
