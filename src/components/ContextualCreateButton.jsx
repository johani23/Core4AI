// ============================================================================
// 💚 Core4.AI – ContextualCreateButton.jsx (Arabic RTL Premium FIX Edition)
// ============================================================================
// - تم مسح كل النصوص المكسّرة (UTF-8 Clean)
// - إضافة نصوص عربية واضحة حسب نوع الصفحة
// - إصلاح سبب الشريط الأخضر الذي كان يظهر أعلى الشاشة
// - الحفاظ على UI والتكامل مع CreatePostModal كما هو
// ============================================================================

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CreatePostModal from "@components/CreatePostModal";

export default function ContextualCreateButton({ page, userRole }) {
  const [open, setOpen] = useState(false);

  // إخفاء الخيارات حسب الدور
  if (userRole === "buyer" && page !== "offers") return null;
  if (userRole === "creator" && page === "offers") return null;

  // ===== Arabic Labels per Page =====
  const getLabel = () => {
    switch (page) {
      case "offers":
        return "إضافة عرض";
      case "feed":
        return "منشور جديد";
      case "promote":
        return "الترويج لمنتج";
      case "collab":
        return "بدء تعاون جديد";
      default:
        return "إضافة";
    }
  };

  return (
    <>
      {/* Main Button */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05 }}
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition shadow-md"
        dir="rtl"
      >
        {getLabel()}
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <CreatePostModal
            open={open}
            onClose={() => setOpen(false)}
            context={page}
            userRole={userRole}
          />
        )}
      </AnimatePresence>
    </>
  );
}
