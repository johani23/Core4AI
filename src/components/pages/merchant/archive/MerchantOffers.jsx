// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ MerchantOffers.jsx (v5.2 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œCinematic + Collab IntegrationÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¬ YouTube-style visual marketplace for live campaigns
// ÃƒÂ°Ã…Â¸Ã‚Â¤Ã‚Â Integrated with CollabHub for Solo / Team Up promotions
// ÃƒÂ°Ã…Â¸Ã‚ÂªÃ¢â‚¬Å¾ Auto-saves selected offer in sessionStorage before redirect
// ============================================================

import { motion, AnimatePresence } from "framer-motion";
import { Play, Users, Sparkles, X, Heart, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// ------------------------------------------------------------
// ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â  Demo Campaigns
// ------------------------------------------------------------
const campaignsData = [
  {
    id: 1,
    name: "UrbanGear X1 Sneakers",
    brand: "UrbanGear",
    commission: "2ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“6%",
    tribes: ["Fashion Tribe", "Event Tribe"],
    thumbnail:
      "https://images.unsplash.com/photo-1606813902987-838b1a33b8a6?auto=format&fit=crop&w=1200&q=80",
    desc: "Join the hottest streetwear drop this season. Showcase UrbanGearÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢s limited X1 sneakers and earn up to 6% commission.",
    views: 48200,
    likes: 2500,
    influencers: 326,
    video:
      "https://cdn.pixabay.com/vimeo/251388123/sneakers-15489.mp4?width=1200",
  },
  {
    id: 2,
    name: "Techy Fitness Band",
    brand: "Techy",
    commission: "3ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“5%",
    tribes: ["Health Tribe", "Tech Tribe"],
    thumbnail:
      "https://images.unsplash.com/photo-1598970434795-0c54fe7c0643?auto=format&fit=crop&w=1200&q=80",
    desc: "Empower wellness. Promote TechyÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢s AI-powered fitness band that tracks dopamine, sleep, and energy metrics in real-time.",
    views: 31800,
    likes: 1900,
    influencers: 279,
    video:
      "https://cdn.pixabay.com/vimeo/377784892/fitness-30680.mp4?width=1200",
  },
  {
    id: 3,
    name: "NovaTech Smart Lens",
    brand: "NovaTech",
    commission: "4ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“8%",
    tribes: ["Tech Tribe", "Creator Tribe"],
    thumbnail:
      "https://images.unsplash.com/photo-1612892126027-bb87697e06c8?auto=format&fit=crop&w=1200&q=80",
    desc: "AI-enhanced lens for creators. Earn tokens for every unboxing video that converts.",
    views: 62400,
    likes: 3300,
    influencers: 411,
    video:
      "https://cdn.pixabay.com/vimeo/515054038/camera-69695.mp4?width=1200",
  },
  {
    id: 4,
    name: "GlowX Skincare Serum",
    brand: "GlowX",
    commission: "3ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“7%",
    tribes: ["Beauty Tribe", "Health Tribe"],
    thumbnail:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07c?auto=format&fit=crop&w=1200&q=80",
    desc: "Promote GlowXÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢s new serum that combines AI skin analysis with clean ingredients. Perfect for lifestyle creators.",
    views: 29400,
    likes: 2100,
    influencers: 352,
    video:
      "https://cdn.pixabay.com/vimeo/239948252/beauty-12207.mp4?width=1200",
  },
];

// ------------------------------------------------------------
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Component
// ------------------------------------------------------------
export default function MerchantOffers() {
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(null);
  const [trendingIndex, setTrendingIndex] = useState(0);
  const navigate = useNavigate();

  // ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â  Auto-scroll trending carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setTrendingIndex((prev) => (prev + 1) % campaignsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬ Promote handler ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ redirects to CollabHub
  const handlePromote = (campaign) => {
    sessionStorage.setItem("selectedOffer", JSON.stringify({
      title: campaign.name,
      merchant: campaign.brand,
      commission: campaign.commission,
      description: campaign.desc,
      thumbnail: campaign.thumbnail,
    }));
    toast.success(`ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬ Preparing promotion for ${campaign.name}`);
    navigate("/collab");
  };

  // ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥ Trending Campaign
  const trending = campaignsData[trendingIndex];

  return (
    <div className="space-y-10">
      {/* ===================================================== */}
      {/* ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¬ Trending Now Section */}
      {/* ===================================================== */}
      <div className="relative">
        <motion.div
          key={trending.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-lg"
        >
          <img
            src={trending.thumbnail}
            alt={trending.name}
            className="w-full h-64 object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¥ Trending Now
                </h2>
                <h3 className="text-2xl font-extrabold text-purple-300">
                  {trending.name}
                </h3>
                <p className="text-gray-300 text-sm mb-2">{trending.brand}</p>
              </div>
              <motion.button
                onClick={() => setModal(trending)}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-sm px-4 py-2 rounded-md shadow-lg hover:opacity-90"
              >
                ÃƒÂ¢Ã¢â‚¬â€œÃ‚Â¶ Watch Campaign
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ===================================================== */}
      {/* ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Âª Campaign Gallery */}
      {/* ===================================================== */}
      <div>
        <h1 className="text-3xl font-extrabold text-yellow-400 flex items-center gap-2">
          ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Âª Merchant Offers
        </h1>
        <p className="text-gray-400 text-sm mb-4">
          Discover live campaigns ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â collaborate, promote, and earn tokenized
          rewards.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaignsData.map((c) => (
            <motion.div
              key={c.id}
              whileHover={{ scale: 1.02 }}
              className="relative bg-[#111827] rounded-2xl overflow-hidden border border-gray-700 shadow-md group"
            >
              {/* Thumbnail */}
              <div className="relative">
                <img
                  src={c.thumbnail}
                  alt={c.name}
                  className="w-full h-48 object-cover transition-all group-hover:opacity-80"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center"
                >
                  <Play size={42} className="text-white opacity-80" />
                </motion.div>
                <div className="absolute top-3 left-3 bg-purple-600/80 text-xs px-2 py-0.5 rounded-md text-white">
                  {c.commission}
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-purple-300 mb-1">
                  {c.name}
                </h3>
                <p className="text-xs text-gray-400 mb-2">
                  By {c.brand} ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ {c.views.toLocaleString()} views
                </p>
                <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                  {c.desc}
                </p>

                {/* Stats */}
                <div className="flex justify-between items-center text-gray-400 text-xs mb-2">
                  <span className="flex items-center gap-1">
                    <Eye size={13} /> {Math.floor(c.views / 1000)}K
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart size={13} className="text-pink-500" />{" "}
                    {Math.floor(c.likes / 1000)}K
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={13} /> {c.influencers}
                  </span>
                </div>

                {/* Tribes */}
                <div className="flex gap-2 flex-wrap mb-3">
                  {c.tribes.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] bg-gray-800 text-purple-300 px-2 py-1 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setModal(c)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-md border border-purple-400 text-purple-300 hover:bg-purple-600/20 transition-all"
                  >
                    ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â€šÂ¬ View
                  </button>
                  <button
                    onClick={() => handlePromote(c)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-all ${
                      selected === c.name
                        ? "bg-green-600 text-white"
                        : "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90"
                    }`}
                  >
                    {selected === c.name ? "ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Promoting" : "ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬ Promote"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ===================================================== */}
      {/* ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¥ Modal (Video Preview) */}
      {/* ===================================================== */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-[#111827] border border-gray-700 rounded-2xl p-6 w-[90%] sm:w-[600px] text-white relative shadow-2xl"
            >
              <button
                onClick={() => setModal(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>

              <h2 className="text-xl font-bold text-purple-400 mb-3 flex items-center gap-2">
                ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¬ {modal.name}
              </h2>

              {/* Video Preview */}
              <div className="rounded-xl overflow-hidden mb-4 border border-gray-700">
                <video
                  src={modal.video}
                  controls
                  autoPlay
                  loop
                  muted
                  className="w-full h-64 object-cover"
                ></video>
              </div>

              <p className="text-sm text-gray-300 mb-3">{modal.desc}</p>
              <div className="flex gap-2 mb-4 flex-wrap">
                {modal.tribes.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] bg-gray-800 text-purple-300 px-2 py-1 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => handlePromote(modal)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-semibold px-6 py-2 rounded-md hover:opacity-90 transition"
              >
                ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬ Promote This Campaign
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================================== */}
      {/* ÃƒÂ°Ã…Â¸Ã…â€™Ã…Â¸ Footer Tip */}
      {/* ===================================================== */}
      <div className="flex items-center justify-center mt-8 text-xs text-gray-500 italic">
        <Sparkles size={14} className="text-purple-400 mr-1" />
        Tip: High-performing campaigns get featured in the Trending carousel.
      </div>
    </div>
  );
}


