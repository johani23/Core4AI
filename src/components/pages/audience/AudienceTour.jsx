// ============================================================================
// 💚 Core4.AI – AudienceTour.jsx (Arabic Clean Edition)
// ============================================================================
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AudienceTour() {
  const navigate = useNavigate();

  const steps = [
    {
      icon: "🔥",
      title: "شاهد أفضل المحتويات",
      text: "استكشف منشورات مرتّبة حسب التأثير الحقيقي — مش مجرد لايكات.",
    },
    {
      icon: "👥",
      title: "تابع القبائل الذكية",
      text: "كل قبيلة تمثّل مجال مهاري. متابعتها يضبط لك التجربة بالكامل.",
    },
    {
      icon: "✨",
      title: "أثّر في المنصة",
      text: "تفاعلك وتصويتك يرفع صناع المحتوى المميزين ويقلل من الضجيج.",
    },
    {
      icon: "🚀",
      title: "طوّر وضعك وقت ما تبغى",
      text: "تقدر تنتقل لوضع المؤثر بأي وقت — وتاريخ تفاعلك يبني مصداقيتك.",
    },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white px-8 py-14 flex flex-col items-center"
      style={{ direction: "rtl" }}
    >
      <motion.h1
        className="text-4xl font-extrabold mb-10 text-center"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        جولة الجمهور 🌟
      </motion.h1>

      <div className="w-full max-w-3xl space-y-6">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 shadow-xl hover:border-purple-500 transition"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.18 }}
          >
            <div className="flex items-center gap-4 mb-2">
              <span className="text-3xl">{s.icon}</span>
              <h2 className="text-xl font-semibold">{s.title}</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">{s.text}</p>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={() => navigate("/home")}
        className="mt-10 bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-pink-500/40 transition"
        whileHover={{ scale: 1.05 }}
      >
        الدخول إلى المنصة →
      </motion.button>
    </div>
  );
}
