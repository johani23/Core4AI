// ============================================================================
// 💚 Core4.AI — CreatePost.jsx (v10 FINAL — Polished + Stable + AI Enhanced)
// Designed by Sama — Engineered by Noor
// ============================================================================

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Image as ImageIcon,
  Hash,
  Users,
  PlayCircle,
  PenLine,
  Sparkles,
  Copy,
  Gauge,
  Lightbulb,
} from "lucide-react";

import {
  generateCaptionAI,
  generateHashtagsAI,
  generateOfferAI,
  generatePreviewAI,
} from "@/services/aiService";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [media, setMedia] = useState(null);
  const [tribe, setTribe] = useState("");
  const [offer, setOffer] = useState("");

  const [generatedTags, setGeneratedTags] = useState([]);
  const [preview, setPreview] = useState(null);

  const [loadingCaption, setLoadingCaption] = useState(false);
  const [loadingTags, setLoadingTags] = useState(false);
  const [loadingOffer, setLoadingOffer] = useState(false);
  const [loadingPreview, setLoadingPreview] = useState(false);

  // -------------------------------
  // MEDIA UPLOAD
  // -------------------------------
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) setMedia(URL.createObjectURL(file));
  };

  // -------------------------------
  // AI CAPTION
  // -------------------------------
  const handleCaptionAI = async () => {
    setLoadingCaption(true);
    const aiText = await generateCaptionAI();
    setCaption(aiText);
    setLoadingCaption(false);
  };

  // -------------------------------
  // AI HASHTAGS
  // -------------------------------
  const handleHashtagAI = async () => {
    setLoadingTags(true);
    const tags = await generateHashtagsAI(caption);
    setGeneratedTags(tags);
    setLoadingTags(false);
  };

  // -------------------------------
  // OFFER AI
  // -------------------------------
  const handleOfferAI = async () => {
    if (!offer) return alert("اختر عرضاً أولاً");
    if (!tribe) return alert("اختر القبيلة");

    setLoadingOffer(true);

    const text = await generateOfferAI(offer, tribe);

    // Prevent duplicate injection
    if (!caption.includes(text)) {
      setCaption((prev) => prev + "\n\n" + text);
    }

    setLoadingOffer(false);
  };

  // -------------------------------
  // SMART PREVIEW AI
  // -------------------------------
  const handleSmartPreview = async () => {
    setLoadingPreview(true);
    const result = await generatePreviewAI(caption, tribe, generatedTags);
    setPreview(result);
    setLoadingPreview(false);
  };

  return (
    <div
      className="min-h-screen bg-gray-100 text-gray-900 p-10"
      style={{ direction: "rtl" }}
    >

      {/* HEADER */}
      <div className="mb-12 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold">✍️ إنشاء منشور جديد</h1>
        <p className="text-gray-500 mt-2">مدعوم بذكاء Core4.AI</p>
      </div>

      {/* MAIN WRAPPER */}
      <div className="bg-white rounded-2xl shadow-lg p-10 space-y-12 max-w-3xl mx-auto">

        {/* CAPTION INPUT */}
        <div>
          <label className="font-semibold text-lg flex items-center gap-2 mb-3">
            <PenLine size={20} className="text-purple-600" />
            النص (Caption)
          </label>

          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="
              w-full bg-gray-50 border border-gray-300 rounded-xl p-4
              focus:ring-2 focus:ring-purple-400 outline-none min-h-[120px]
            "
            placeholder="اكتب نص المنشور..."
          />

          {/* Caption AI */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            disabled={loadingCaption}
            onClick={handleCaptionAI}
            className={`
              mt-3 px-5 py-2 rounded-xl text-sm flex items-center gap-2
              ${loadingCaption ? "bg-purple-300" : "bg-purple-600 hover:bg-purple-700 text-white"}
            `}
          >
            <Sparkles size={18} />
            {loadingCaption ? "جاري التوليد..." : "توليد نص بالذكاء الاصطناعي"}
          </motion.button>
        </div>

        {/* MEDIA UPLOAD */}
        <div>
          <label className="font-semibold text-lg flex items-center gap-2 mb-3">
            <ImageIcon size={20} className="text-blue-600" />
            رفع صورة أو فيديو
          </label>

          <div className="
            border-2 border-dashed border-gray-300 bg-gray-50
            p-10 rounded-xl text-center relative
          ">
            <Upload size={40} className="text-gray-400 mx-auto" />
            <p className="text-gray-500 mt-2">اضغط للرفع أو اسحب الملف هنا</p>

            {/* FIXED: relative container + absolute input */}
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          {media && (
            <img
              src={media}
              className="rounded-xl mt-6 max-h-80 object-cover mx-auto shadow-md"
            />
          )}
        </div>

        {/* AI HASHTAGS */}
        <div>
          <label className="font-semibold text-lg flex items-center gap-2 mb-3">
            <Hash size={20} className="text-pink-600" />
            هاشتاقات بالذكاء الاصطناعي
          </label>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            disabled={loadingTags}
            onClick={handleHashtagAI}
            className={`
              px-5 py-2 rounded-xl text-sm flex items-center gap-2
              ${loadingTags ? "bg-pink-300" : "bg-pink-600 hover:bg-pink-700 text-white"}
            `}
          >
            <Sparkles size={18} />
            {loadingTags ? "جاري التوليد..." : "توليد هاشتاقات"}
          </motion.button>

          {generatedTags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {generatedTags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}

              <button
                onClick={() =>
                  navigator.clipboard.writeText(generatedTags.join(" "))
                }
                className="flex items-center gap-1 text-purple-700 underline mt-2"
              >
                <Copy size={16} /> نسخ الكل
              </button>
            </div>
          )}
        </div>

        {/* TRIBE SELECTION */}
        <div>
          <label className="font-semibold text-lg flex items-center gap-2 mb-3">
            <Users size={20} className="text-green-600" />
            القبيلة المستهدفة
          </label>

          <select
            value={tribe}
            onChange={(e) => setTribe(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3"
          >
            <option value="">بدون تحديد</option>
            <option value="techy">Techy Tribe</option>
            <option value="fashionists">Fashionists</option>
            <option value="eventgoers">EventGoers</option>
          </select>
        </div>

        {/* OFFER SECTION */}
        <div>
          <label className="font-semibold text-lg flex items-center gap-2 mb-3">
            <PlayCircle size={20} className="text-orange-500" />
            إضافة عرض ترويجي (اختياري)
          </label>

          <select
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3"
          >
            <option value="">لا يوجد</option>
            <option value="سماعات لاسلكية">خصم على سماعات</option>
            <option value="أدوات المنزل">خصم على منتجات المنزل</option>
            <option value="إكسسوارات تقنية">خصم على إكسسوارات تقنية</option>
          </select>

          {offer && (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              disabled={loadingOffer}
              onClick={handleOfferAI}
              className={`
                mt-3 px-5 py-2 rounded-xl text-sm flex items-center gap-2
                ${loadingOffer ? "bg-orange-300" : "bg-orange-500 hover:bg-orange-600 text-white"}
              `}
            >
              <Sparkles size={16} />
              {loadingOffer ? "جاري التوليد..." : "توليد نص ترويجي"}
            </motion.button>
          )}
        </div>

        {/* SMART PREVIEW */}
        <div>
          <label className="font-semibold text-lg flex items-center gap-2 mb-3">
            <Gauge size={20} className="text-indigo-600" />
            تحليل المنشور قبل النشر
          </label>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            disabled={loadingPreview}
            onClick={handleSmartPreview}
            className={`
              px-5 py-2 rounded-xl text-sm flex items-center gap-2
              ${loadingPreview ? "bg-indigo-300" : "bg-indigo-600 hover:bg-indigo-700 text-white"}
            `}
          >
            <Lightbulb size={18} />
            {loadingPreview ? "جاري التحليل..." : "تحليل ذكي"}
          </motion.button>

          {/* PREVIEW CARD */}
          {preview && (
            <div className="mt-6 bg-gray-50 border border-gray-300 rounded-xl p-6 space-y-4">
              <h3 className="text-xl font-bold text-gray-800">🔮 نتائج التحليل</h3>

              <p className="text-lg font-semibold text-gray-700">
                التقييم العام:
                <span className="text-indigo-700"> {preview.score} / 100</span>
              </p>

              <p className="text-lg">
                أفضل قبيلة:
                <span className="font-bold text-purple-700">
                  {" "}{preview.bestTribe}
                </span>
              </p>

              {/* Suggestions */}
              <div>
                <h4 className="font-semibold mb-2">اقتراحات التحسين:</h4>
                <ul className="list-disc pr-6 text-gray-700">
                  {preview.suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* PUBLISH BUTTON */}
        <div className="pt-2">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="
              bg-purple-600 text-white w-full py-4 rounded-2xl
              text-xl font-bold shadow-md hover:bg-purple-700
            "
            onClick={() => alert("🚀 تم نشر المنشور بنجاح!")}
          >
            نشر الآن
          </motion.button>
        </div>

      </div>
    </div>
  );
}
