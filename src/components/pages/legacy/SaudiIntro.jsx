// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ÃƒÂ°Ã…Â¸Ã¢â‚¬Â¡Ã‚Â¸ÃƒÂ°Ã…Â¸Ã¢â‚¬Â¡Ã‚Â¦ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ SaudiIntro.jsx (v1.0 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œSaudi Launch ScreenÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Shows Saudi flag + geolocation
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Lightweight, fast, TikTok-style welcome
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Auto continues to TourMenu
// ============================================================

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function SaudiIntro() {
  const navigate = useNavigate();
  const [country, setCountry] = useState("...");

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => setCountry(data.country_name || "your region"))
      .catch(() => setCountry("your region"));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center 
                    bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white px-6">

      {/* Saudi Flag */}
      <motion.img
        src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-32 mb-6 drop-shadow-xl"
      />

      {/* Welcome Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-3xl font-bold text-green-400"
      >
        ÃƒËœÃ‚Â£Ãƒâ„¢Ã¢â‚¬Â¡Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¹ Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â³Ãƒâ„¢Ã¢â‚¬Â¡Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¹ ÃƒËœÃ‚Â¨Ãƒâ„¢Ã†â€™ ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Â¹
      </motion.h1>

      {/* User Location */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-gray-300 mt-3"
      >
        Ãƒâ„¢Ã¢â‚¬Â  detected that you're visiting from:  
        <span className="text-green-300 font-semibold"> {country}</span>
      </motion.p>

      {/* CTA */}
      <motion.button
        onClick={() => navigate("/tour")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="mt-10 bg-green-600 text-white px-8 py-3 rounded-full 
                   text-lg font-semibold shadow-lg hover:bg-green-500 transition"
      >
        ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â£ ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ÃƒËœÃ‚Â±ÃƒËœÃ‚Â¨ÃƒËœÃ‚ÂªÃƒâ„¢Ã…Â 
      </motion.button>

    </div>
  );
}


