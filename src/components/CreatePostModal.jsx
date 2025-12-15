// ============================================================================
// 💚 Core4.AI – CreatePostModal.jsx (Arabic RTL Premium Edition — FIXED)
// ============================================================================
// - إزالة النصوص المكسّرة (UTF-8 Clean)
// - إصلاح جذري لمنع ظهور الشريط الأخضر
// - واجهة عربية كاملة حسب سياق الصفحة
// - لا تغيير في الـ Logic أو Integration مع PostsContext
// ============================================================================

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { usePosts } from "@context/PostsContext";

export default function CreatePostModal({ open, onClose, context = "feed", userRole }) {
  const { addPost } = usePosts();

  const [form, setForm] = useState({
    content: "",
    offerName: "",
    price: "",
    discount: "",
    commission: "",
    link: "",
    tribe: "",
    collaborators: [],
  });

  if (!open) return null;

  const set = (field, value) => setForm({ ...form, [field]: value });

  // ============================
  // Arabic Titles
  // ============================
  const titles = {
    feed: "✨ مشاركة قصة جديدة",
    offers: "🎁 إضافة عرض جديد",
    promote: "📣 ترويج منتج والتعاون",
    collab: "🤝 إطلاق حملة مشتركة",
  };

  const hints = {
    feed: "شارك أفكارك أو قصتك أو أي شيء تريد نشره.",
    offers: "أضِف منتجًا بالسعر والخصم والعمولة.",
    promote: "اختر القبيلة وادعُ الأعضاء للتعاون.",
    collab: "اكتب فكرة الحملة أو التعاون مع المؤثرين.",
  };

  const tribeMembers = [
    { id: "m1", name: "سما" },
    { id: "m2", name: "نور" },
    { id: "m3", name: "لوليا" },
    { id: "m4", name: "ريان" },
  ];

  const handleSubmit = () => {
    if (!form.content && !form.offerName) {
      alert("الرجاء كتابة المحتوى الأساسي.");
      return;
    }

    addPost({
      id: Date.now(),
      ...form,
      mode: context,
      role: userRole,
      likes: 0,
      comments: [],
      invitationsSent: form.collaborators?.length > 0,
    });

    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      dir="rtl"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="bg-[#111827] border border-gray-700 rounded-2xl p-6 w-[90%] sm:w-[480px] text-white relative shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-400 hover:text-white"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold text-purple-400 mb-1">
          {titles[context]}
        </h2>
        <p className="text-sm text-gray-400 mb-4">{hints[context]}</p>

        {/* FEED MODE */}
        {context === "feed" && (
          <textarea
            rows={3}
            placeholder="اكتب قصتك أو رأيك أو ماذا تفكر…"
            value={form.content}
            onChange={(e) => set("content", e.target.value)}
            className="inputBox"
          />
        )}

        {/* OFFERS MODE */}
        {context === "offers" && (
          <>
            <input
              placeholder="اسم المنتج"
              value={form.offerName}
              onChange={(e) => set("offerName", e.target.value)}
              className="inputBox"
            />
            <input
              type="number"
              placeholder="السعر (ريال)"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              className="inputBox"
            />
            <input
              type="number"
              placeholder="الخصم (%)"
              value={form.discount}
              onChange={(e) => set("discount", e.target.value)}
              className="inputBox"
            />
            <input
              type="number"
              placeholder="العمولة (%)"
              value={form.commission}
              onChange={(e) => set("commission", e.target.value)}
              className="inputBox"
            />
          </>
        )}

        {/* PROMOTE MODE */}
        {context === "promote" && (
          <>
            <select
              className="inputBox"
              value={form.tribe}
              onChange={(e) => set("tribe", e.target.value)}
            >
              <option value="">بدون قبيلة</option>
              <option value="Fashion Tribe">قبيلة الموضة</option>
              <option value="Event Tribe">قبيلة الفعاليات</option>
              <option value="Tech Tribe">قبيلة التقنية</option>
              <option value="Health Tribe">قبيلة الصحة</option>
            </select>

            <input
              placeholder="اسم العرض أو المنتج"
              value={form.offerName}
              onChange={(e) => set("offerName", e.target.value)}
              className="inputBox"
            />
            <input
              placeholder="رابط الفيديو أو الرابط الدعائي"
              value={form.link}
              onChange={(e) => set("link", e.target.value)}
              className="inputBox"
            />

            {form.tribe && (
              <div className="mt-3 bg-black/30 border border-gray-700 rounded-lg p-3">
                <p className="text-sm text-gray-300 mb-2 font-medium">
                  اختر المتعاونين من قبيلة{" "}
                  <span className="text-purple-400">{form.tribe}</span>:
                </p>

                {tribeMembers.map((m) => (
                  <div key={m.id} className="flex items-center justify-between mb-2">
                    <label className="flex items-center gap-2 text-sm text-gray-300">
                      <input
                        type="checkbox"
                        className="accent-purple-500"
                        checked={form.collaborators.some((c) => c.id === m.id)}
                        onChange={(e) => {
                          let updated = [...form.collaborators];
                          if (e.target.checked)
                            updated.push({ ...m, commission: 5 });
                          else
                            updated = updated.filter((c) => c.id !== m.id);
                          set("collaborators", updated);
                        }}
                      />
                      {m.name}
                    </label>

                    {form.collaborators.some((c) => c.id === m.id) && (
                      <input
                        type="number"
                        className="w-16 bg-black/50 border border-gray-700 text-xs text-center rounded-md text-white"
                        placeholder="%"
                        value={
                          form.collaborators.find((c) => c.id === m.id)?.commission || ""
                        }
                        onChange={(e) => {
                          const val = Number(e.target.value || 0);
                          set(
                            "collaborators",
                            form.collaborators.map((c) =>
                              c.id === m.id ? { ...c, commission: val } : c
                            )
                          );
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* COLLAB MODE */}
        {context === "collab" && (
          <>
            <input
              placeholder="عنوان الحملة"
              value={form.offerName}
              onChange={(e) => set("offerName", e.target.value)}
              className="inputBox"
            />
            <textarea
              rows={3}
              placeholder="اشرح فكرة التعاون…"
              value={form.content}
              onChange={(e) => set("content", e.target.value)}
              className="inputBox"
            />
          </>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-semibold px-6 py-2 rounded-md hover:opacity-90 transition mt-2"
        >
          {context === "offers" && "إضافة العرض"}
          {context === "feed" && "نشر الآن"}
          {context === "promote" && "إرسال الدعوات ونشر"}
          {context === "collab" && "إطلاق الحملة"}
        </button>
      </motion.div>
    </motion.div>
  );
}

// =============================
// Shared Input Style
// =============================
const inputBox =
  "w-full bg-black/40 border border-gray-700 rounded-lg p-3 text-sm text-white mb-3 focus:outline-none focus:ring-1 focus:ring-purple-500";
