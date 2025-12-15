// ======================================================================
// 💚 BackToMerchant.jsx — زر الرجوع لمنطقة التاجر (Fixed UTF-8)
// ======================================================================
// - تم إصلاح الترميز بالكامل
// - إعادة كتابة النصوص العربية بشكل نظيف
// - الحفاظ على نفس التصميم والحركة
// ======================================================================

import { motion } from "framer-motion";

export default function BackToMerchant() {
  return (
    <motion.button
      onClick={() => (window.location.href = "/merchant")}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="
        fixed top-4 left-4 z-50
        bg-gradient-to-r from-green-700 to-green-500
        text-white font-extrabold tracking-wide
        px-5 py-2 rounded-full shadow-xl
        border border-green-300
        backdrop-blur-md
        flex items-center gap-2
      "
      dir="rtl"
    >
      <span className="text-yellow-300 text-lg">⬅️</span>
      <span>الرجوع لمنطقة التاجر</span>
    </motion.button>
  );
}
