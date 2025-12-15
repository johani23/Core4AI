// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Welcome.jsx (v7 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œSaudi + Smart Auto Tour RedirectÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ============================================================================

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();
  const [country, setCountry] = useState("Saudi Arabia ÃƒÂ°Ã…Â¸Ã¢â‚¬Â¡Ã‚Â¸ÃƒÂ°Ã…Â¸Ã¢â‚¬Â¡Ã‚Â¦");

  // ------------------------------------------------------------
  // ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â Geo IP Lookup (Safe Fallback)
  // ------------------------------------------------------------
  useEffect(() => {
    fetch("https://ipapi.co/country_name/")
      .then((r) => r.text())
      .then((c) => c && setCountry(c))
      .catch(() => {});
  }, []);

  // ------------------------------------------------------------
  // ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â Auto redirect to /tour ON FIRST VISIT
  // ------------------------------------------------------------
  useEffect(() => {
    const seenTour = localStorage.getItem("seenTour");
    if (!seenTour) {
      localStorage.setItem("seenTour", "1");
      navigate("/tour");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white flex flex-col items-center justify-center px-8 py-20">

      <motion.img
        src="https://flagcdn.com/w320/sa.png"
        className="w-20 mb-6 rounded shadow-lg"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      />

      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Turn Your Influence Into Real Income ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â with Core4.AI
      </motion.h1>

      <p className="text-gray-400 text-sm mb-6">
        Accessing from:{" "}
        <span className="text-white font-semibold">{country}</span>
      </p>

      <motion.p
        className="text-gray-300 max-w-2xl text-center leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Core4.AI is the first AI-powered influence economy platform built for creators, merchants,
        tribe leaders, and communities across the GCC & MENA region.
      </motion.p>

      <motion.button
        onClick={() => navigate("/tour")}
        whileHover={{ scale: 1.05 }}
        className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 font-semibold shadow-lg"
      >
        Start Tour
      </motion.button>
    </div>
  );
}


