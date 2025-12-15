// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ PromoteAndEarn.jsx (v3.5 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œInteractive Commerce+ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Influencers upload/embed promo videos
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Viewers can like, dislike, comment, and buy
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Commission + reach bonus simulation
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Adds merchant payout + toast feedback
// ============================================================

import {
  FaBullhorn,
  FaHeart,
  FaThumbsDown,
  FaCommentDots,
  FaShoppingCart,
  FaUpload,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function PromoteAndEarn() {
  const [campaigns, setCampaigns] = useState([]);
  const [selected, setSelected] = useState(null);
  const [newComment, setNewComment] = useState("");

  // ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â± Mock Campaigns (replace with /api/promo/offers later)
  useEffect(() => {
    setCampaigns([
      {
        id: 1,
        title: "Wireless Headset Pro X",
        merchant: "UrbanGear",
        img: "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=600",
        price: 149.99,
        commission: 12,
        reachBonus: 0.1,
        video: null,
        likes: 32,
        dislikes: 3,
        comments: [],
        sales: 0,
      },
      {
        id: 2,
        title: "AI Keyboard ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Creator Edition",
        merchant: "Techy",
        img: "https://images.pexels.com/photos/276466/pexels-photo-276466.jpeg?auto=compress&cs=tinysrgb&w=600",
        price: 189.0,
        commission: 15,
        reachBonus: 0.12,
        video: null,
        likes: 10,
        dislikes: 1,
        comments: [],
        sales: 0,
      },
    ]);
  }, []);

  // ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬ Add Comment
  const handleComment = (id) => {
    if (!newComment.trim()) return;
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              comments: [
                ...c.comments,
                {
                  text: newComment,
                  time: new Date().toLocaleTimeString(),
                },
              ],
            }
          : c
      )
    );
    setNewComment("");
  };

  // ÃƒÂ¢Ã‚ÂÃ‚Â¤ÃƒÂ¯Ã‚Â¸Ã‚Â Like / ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ…Â½ Dislike
  const toggleReaction = (id, type) => {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              likes: type === "like" ? c.likes + 1 : c.likes,
              dislikes: type === "dislike" ? c.dislikes + 1 : c.dislikes,
            }
          : c
      )
    );
  };

  // ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â¤ Upload / Embed Video
  const handleUpload = (id) => {
    const fakeURL = prompt("Paste video URL (YouTube, TikTok, etc.):");
    if (fakeURL) {
      setCampaigns((prev) =>
        prev.map((c) => (c.id === id ? { ...c, video: fakeURL } : c))
      );
      toast.success("ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¥ Video linked successfully!");
    }
  };

  // ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ¢â‚¬â„¢ Simulate Purchase
  const handleBuy = (id) => {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, sales: c.sales + 1 }
          : c
      )
    );
    const item = campaigns.find((c) => c.id === id);
    if (item)
      toast.success(
        `ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Purchased ${item.title}! ${item.commission}% commission to influencer.`
      );
  };

  return (
    <div className="p-8 text-gray-100 space-y-8">
      <h1 className="text-2xl font-bold flex items-center gap-2 text-yellow-400">
        <FaBullhorn /> Promote & Earn
      </h1>
      <p className="text-gray-400 text-sm mb-4">
        Upload or link your promo videos, engage your audience, and earn commissions per sale or view.
      </p>

      {/* Campaign Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((c) => (
          <motion.div
            key={c.id}
            whileHover={{ scale: 1.02 }}
            className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-md flex flex-col"
          >
            <img
              src={c.img}
              alt={c.title}
              className="rounded-lg mb-3 h-40 w-full object-cover"
            />

            <h2 className="text-lg font-semibold text-white">{c.title}</h2>
            <p className="text-sm text-gray-400 mb-2">by {c.merchant}</p>

            {/* ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¥ Video Section */}
            {c.video ? (
              <iframe
                src={c.video}
                title={c.title}
                className="rounded-lg mb-3 w-full h-48 border border-gray-800"
                allowFullScreen
              ></iframe>
            ) : (
              <button
                onClick={() => handleUpload(c.id)}
                className="flex items-center justify-center gap-2 py-2 text-sm text-gray-300 border border-dashed border-gray-600 rounded-lg hover:bg-gray-800 transition-all"
              >
                <FaUpload /> Upload / Link Promo Video
              </button>
            )}

            {/* ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â° Stats + Commission */}
            <div className="text-xs text-gray-400 mb-3">
              <span className="text-yellow-400 font-semibold">
                {c.commission}% commission
              </span>{" "}
              +{" "}
              <span className="text-green-400 font-semibold">
                {c.reachBonus} C4T / 1K views
              </span>
              <p className="mt-1 text-gray-500">
                ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯ {c.sales} sales ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Est. Earnings:{" "}
                <span className="text-green-400 font-semibold">
                  ${(c.sales * (c.price * (c.commission / 100))).toFixed(2)}
                </span>
              </p>
            </div>

            {/* ÃƒÂ¢Ã‚ÂÃ‚Â¤ÃƒÂ¯Ã‚Â¸Ã‚Â Reactions */}
            <div className="flex items-center justify-between text-sm mb-3">
              <div className="flex gap-3">
                <button
                  onClick={() => toggleReaction(c.id, "like")}
                  className="flex items-center gap-1 text-gray-300 hover:text-pink-400"
                >
                  <FaHeart /> {c.likes}
                </button>
                <button
                  onClick={() => toggleReaction(c.id, "dislike")}
                  className="flex items-center gap-1 text-gray-300 hover:text-red-400"
                >
                  <FaThumbsDown /> {c.dislikes}
                </button>
                <button
                  onClick={() => setSelected(selected === c.id ? null : c.id)}
                  className="flex items-center gap-1 text-gray-300 hover:text-blue-400"
                >
                  <FaCommentDots /> {c.comments.length}
                </button>
              </div>

              <button
                onClick={() => handleBuy(c.id)}
                className="flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-3 py-1.5 rounded-md hover:opacity-90 text-xs"
              >
                <FaShoppingCart /> Buy Now
              </button>
            </div>

            {/* ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â¬ Comments */}
            {selected === c.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 border-t border-gray-700 pt-2 text-sm"
              >
                <div className="space-y-2 mb-2 max-h-32 overflow-y-auto pr-1">
                  {c.comments.length > 0 ? (
                    c.comments.map((com, i) => (
                      <div key={i} className="text-gray-300">
                        <span className="text-gray-500 text-xs mr-1">
                          {com.time} ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢
                        </span>
                        {com.text}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-xs">No comments yet.</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-grow bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 text-gray-200 text-xs focus:ring-1 focus:ring-yellow-500 outline-none"
                  />
                  <button
                    onClick={() => handleComment(c.id)}
                    className="text-xs bg-yellow-500 text-black px-2 rounded-md font-medium hover:bg-yellow-400"
                  >
                    Post
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}


