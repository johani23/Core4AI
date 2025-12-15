// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ ProductInfluencerAssign.jsx (Saudi Edition)
// ------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Fetch suggested influencers for a product
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Assign influencer ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ product
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Add audience promoters
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ See expected conversion, tribe match & impact
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Fully tied to API v203
// ============================================================

import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { FiUsers, FiStar, FiCheck, FiArrowRight, FiTrendingUp } from "react-icons/fi";

export default function ProductInfluencerAssign() {
  const { productId } = useParams();
  
  const [product, setProduct] = useState(null);
  const [influencers, setInfluencers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [impact, setImpact] = useState(null);
  const [saving, setSaving] = useState(false);

  // ------------------------------------------------------------
  // Load Product
  // ------------------------------------------------------------
  useEffect(() => {
    fetch(`/api/product/${productId}`)
      .then((res) => res.json())
      .then(setProduct)
      .catch((e) => console.error("Product Load Error:", e));
  }, [productId]);

  // ------------------------------------------------------------
  // Load Suggested Influencers
  // ------------------------------------------------------------
  useEffect(() => {
    fetch(`/api/merchant/suggest_influencers/${productId}`)
      .then((res) => res.json())
      .then((data) => setInfluencers(data.recommended_influencers))
      .catch((e) => console.error("Influencer Suggest Error:", e));
  }, [productId]);


  // ------------------------------------------------------------
  // Toggle influencer selection
  // ------------------------------------------------------------
  const toggleSelect = (influencer) => {
    if (selected.find((s) => s.name === influencer.name)) {
      setSelected(selected.filter((s) => s.name !== influencer.name));
    } else {
      setSelected([...selected, influencer]);
    }
  };

  // ------------------------------------------------------------
  // Save influencer assignment
  // ------------------------------------------------------------
  const saveAssignments = async () => {
    setSaving(true);

    const res = await fetch(`/api/merchant/assign_influencers/${productId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        influencers: selected.map((s) => s.name),
      }),
    });

    const data = await res.json();
    setImpact(data.impact || null);
    setSaving(false);
  };


  if (!product) {
    return (
      <div className="min-h-screen text-center text-white pt-20">
        ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â  ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-[#002b16] text-white">
      
      {/* ------------------------------------------------------ */}
      {/* HEADER */}
      {/* ------------------------------------------------------ */}
      <motion.h1
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-extrabold mb-4 text-[#4cff9b]"
      >
        ÃƒËœÃ‚Â§ÃƒËœÃ‚Â®ÃƒËœÃ‚ÂªÃƒâ„¢Ã…Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¤ÃƒËœÃ‚Â«ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â  Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬
      </motion.h1>

      <p className="text-gray-300 mb-8">
        Ãƒâ„¢Ã¢â‚¬Å¡Ãƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â§ÃƒËœÃ‚Â®ÃƒËœÃ‚ÂªÃƒâ„¢Ã…Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¤ÃƒËœÃ‚Â«ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â  Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â·Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¡ ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â© ÃƒËœÃ‚ÂªÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¡ Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬ËœÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬.
      </p>

      {/* PRODUCT BOX */}
      <div className="mb-10 bg-[#01341c] p-6 rounded-xl border border-[#1d6642] flex items-center gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-32 h-32 object-cover rounded-xl border border-[#145f3a]"
        />
        <div>
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-gray-400">{product.description}</p>
          <p className="text-[#4cff9b] font-bold mt-2">
            {product.price} ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------ */}
      {/* INFLUENCERS LIST */}
      {/* ------------------------------------------------------ */}
      <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
        <FiUsers /> ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¤ÃƒËœÃ‚Â«ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚ÂªÃƒËœÃ‚Â±ÃƒËœÃ‚Â­Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â 
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {influencers.map((inf, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl border ${
              selected.find((s) => s.name === inf.name)
                ? "border-[#4cff9b] bg-[#003c22]"
                : "border-[#1d6642] bg-[#012d1a]"
            } cursor-pointer`}
            onClick={() => toggleSelect(inf)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">{inf.name}</h3>
              {selected.find((s) => s.name === inf.name) && (
                <FiCheck className="text-[#4cff9b] text-xl" />
              )}
            </div>

            <p className="text-gray-300 mt-1">ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â©: {inf.tribe}</p>

            <p className="mt-1 text-[#4cff9b] font-semibold flex items-center gap-2">
              <FiStar /> ÃƒËœÃ‚ÂªÃƒËœÃ‚Â£ÃƒËœÃ‚Â«Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â±: {inf.score}
            </p>
          </motion.div>
        ))}
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={saveAssignments}
        disabled={saving}
        className="mt-6 bg-[#00b462] hover:bg-[#009a52] px-6 py-3 rounded-lg font-bold text-lg w-full"
      >
        {saving ? "ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¸..." : "ÃƒËœÃ‚Â­Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¸ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¤ÃƒËœÃ‚Â«ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â  ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â®ÃƒËœÃ‚ÂªÃƒËœÃ‚Â§ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â "}
      </button>

      {/* ------------------------------------------------------ */}
      {/* IMPACT RESULT */}
      {/* ------------------------------------------------------ */}
      {impact && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-[#01341c] p-6 rounded-xl border border-[#1d6642]"
        >
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            <FiTrendingUp /> ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â£ÃƒËœÃ‚Â«Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¹ Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â©
          </h3>

          <p className="text-lg text-[#4cff9b] font-semibold">
            {impact.predicted_conversion}% Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â¯Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¹
          </p>

          <p className="text-gray-300 mt-2">
            {impact.description}
          </p>
        </motion.div>
      )}

    </div>
  );
}


