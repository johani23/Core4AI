// ============================================================================
// 💜 Core4.AI — CreateOffer.jsx (v4 FINAL)
// واجهة إنشاء عرض ترويجي لصانع المحتوى — مبسّطة + جميلة + عملية
// Designed by Sama — Engineered by Noor
// ============================================================================

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tag, Sparkles, CheckCircle2, Coins, ArrowRight } from "lucide-react";

export default function CreateOffer() {
  const [title, setTitle] = useState("");
  const [discount, setDiscount] = useState("");
  const [tribe, setTribe] = useState("");
  const [aiText, setAiText] = useState("");
  const [loading, setLoading] = useState(false);

  const tribes = [
    { id: "techy", name: "Techy Tribe" },
    { id: "fashionists", name: "Fashionists" },
    { id: "event", name: "EventGoers" },
  ];

  // ------- AI GENERATOR (placeholder logic) -------
  const generateOfferText = async () => {
    if (!title || !discount || !tribe) {
      alert("يرجى تعبئة كل الحقول قبل توليد النص ✨");
      return;
    }

    setLoading(true);

    // Mocked AI result
    setTimeout(() => {
      setAiText(
        `🔥 عرض خاص من أجل ${tribe}!\n` +
          `المنتج: ${title}\n` +
          `احصل الآن على خصم بقيمة ${discount}% لمدة محدودة!\n` +
          `✨ العرض حصري لجمهورك — انطلق!`
      );
      setLoading(false);
    }, 1200);
  };

  return (
    <div
      className="min-h-screen bg-gray-100 text-gray-900 p-10"
      style={{ direction: "rtl" }}
    >
      {/* HEADER */}
      <div className="max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold flex items-center gap-2">
          🎁 إنشاء عرض ترويجي
        </h1>
        <p className="text-gray-500 mt-1">
          صمّم عرضًا احترافيًا لجمهورك بدعم الذكاء الاصطناعي من Core4.AI.
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white shadow-lg rounded-3xl p-10 max-w-3xl mx-auto space-y-10">

        {/* Offer Title */}
        <div>
          <label className="font-semibold text-lg flex items-center gap-2 mb-2">
            <Tag className="text-purple-600" size={20} /> عنوان العرض
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="مثال: سماعات لاسلكية — موديل X"
            className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>

        {/* Discount */}
        <div>
          <label className="font-semibold text-lg flex items-center gap-2 mb-2">
            <Coins className="text-green-600" size={20} /> نسبة الخصم
          </label>
          <input
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="مثال: 20"
            type="number"
            className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>

        {/* Tribe */}
        <div>
          <label className="font-semibold text-lg flex items-center gap-2 mb-2">
            <ArrowRight className="text-blue-600" size={20} /> القبيلة المستهدفة
          </label>

          <select
            value={tribe}
            onChange={(e) => setTribe(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3"
          >
            <option value="">اختر القبيلة</option>
            {tribes.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* AI Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          disabled={loading}
          onClick={generateOfferText}
          className={`w-full py-3 rounded-xl text-lg font-semibold flex items-center justify-center gap-2
            ${loading ? "bg-purple-300" : "bg-purple-600 hover:bg-purple-700 text-white"}`}
        >
          <Sparkles size={20} />
          {loading ? "جاري توليد النص..." : "توليد نص ترويجي بالذكاء الاصطناعي"}
        </motion.button>

        {/* AI RESULT */}
        {aiText && (
          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 whitespace-pre-line text-purple-800">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <CheckCircle2 className="text-purple-600" />
              النص الترويجي الجاهز ✨
            </h3>
            <p className="leading-relaxed">{aiText}</p>
          </div>
        )}

        {/* PUBLISH BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="bg-purple-600 text-white w-full py-4 rounded-2xl text-xl font-bold shadow-md hover:bg-purple-700"
          onClick={() => alert("تم إنشاء العرض بنجاح! 🚀")}
        >
          نشر العرض الآن
        </motion.button>
      </div>
    </div>
  );
}
