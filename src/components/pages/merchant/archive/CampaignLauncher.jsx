// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ CampaignLauncher.jsx (E13 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œAuto Campaign + QR TrackingÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ----------------------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Auto Campaign Creation
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ QR Tracking per Influencer
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Creator Reward Integration
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Campaign Modes: Standard / Events / Seeding
// ============================================================================

import {
  FiPlayCircle,
  FiUsers,
  FiLink,
  FiCamera,
  FiGift,
  FiMapPin,
  FiSend,
  FiTrendingUp,
} from "react-icons/fi";
import QRCode from "react-qr-code";

export default function CampaignLauncher() {
  const [productName, setProductName] = useState("");
  const [tribe, setTribe] = useState("");
  const [mode, setMode] = useState("standard");
  const [campaign, setCampaign] = useState(null);

  const TRIBE_INFLUENCERS = {
    Techy: ["@TechFahd", "@AIReviewers", "@SaudiGamerX"],
    Fashionists: ["@LamaStyle", "@NoorBeauty", "@MahaTrends"],
    EventGoers: ["@SnapCity", "@ConcertGCC", "@FOMO_King"],
    Adventurers: ["@SaudiHikers", "@CampWithMe", "@DesertNomad"],
  };

  const launchCampaign = () => {
    if (!productName || !tribe) return;

    const id = "CAMP-" + Math.random().toString(36).substr(2, 6).toUpperCase();

    const influencers = TRIBE_INFLUENCERS[tribe] || [];

    const influencerLinks = influencers.map((inf) => ({
      influencer: inf,
      track_url: `https://core4.ai/t/${id}/${inf.replace("@", "")}`,
      qr_data: `core4.ai/t/${id}/${inf.replace("@", "")}`,
      reward_per_sale: Math.floor(Math.random() * 18 + 7) + " SAR",
    }));

    setCampaign({
      id,
      product: productName,
      tribe,
      mode,
      influencers: influencerLinks,
      global_qr: `core4.ai/t/${id}/public`,
      created_at: new Date().toLocaleString(),
    });
  };

  return (
    <div className="space-y-10">

      {/* Header */}
      <h1 className="text-3xl font-extrabold text-[#4cff9b] flex items-center gap-3">
        <FiPlayCircle /> E13 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Auto Campaign Launcher
      </h1>

      <p className="text-gray-300">
        ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â¸ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¦ Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â´ÃƒËœÃ‚Â¦ ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â© Ãƒâ„¢Ã†â€™ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â©: ÃƒËœÃ‚Â±Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â· + QR + ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ ÃƒËœÃ‚Â²Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¹ Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¤ÃƒËœÃ‚Â«ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â  + Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã†â€™ÃƒËœÃ‚Â§Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¢ÃƒËœÃ‚Âª Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª.
      </p>

      {/* Form */}
      <div className="bg-[#01341c] border border-[#1b6647] p-6 rounded-xl space-y-5">
        <input
          placeholder="ÃƒËœÃ‚Â§ÃƒËœÃ‚Â³Ãƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full px-4 py-3 bg-[#002015] border border-[#145536] text-white rounded-lg"
        />

        <select
          value={tribe}
          onChange={(e) => setTribe(e.target.value)}
          className="w-full px-4 py-3 bg-[#002015] border border-[#145536] text-white rounded-lg"
        >
          <option value="">ÃƒËœÃ‚Â§ÃƒËœÃ‚Â®ÃƒËœÃ‚ÂªÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â©</option>
          <option value="Techy">Techy</option>
          <option value="Fashionists">Fashionists</option>
          <option value="EventGoers">EventGoers</option>
          <option value="Adventurers">Adventurers</option>
        </select>

        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="w-full px-4 py-3 bg-[#002015] border border-[#145536] text-white rounded-lg"
        >
          <option value="standard">Standard Campaign</option>
          <option value="events">Events Mode (Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¹ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª)</option>
          <option value="seeding">Seeding Mode (Ãƒâ„¢Ã¢â‚¬Â¡ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â§Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â§)</option>
        </select>

        <button
          onClick={launchCampaign}
          className="w-full py-3 bg-[#4cff9b] text-black font-extrabold rounded-lg flex items-center justify-center gap-2"
        >
          ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â·Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â©
        </button>
      </div>

      {/* Campaign Results */}
      {campaign && (
        <div className="bg-[#01341c] border border-[#1b6647] p-6 rounded-xl space-y-10">

          {/* Basic Info */}
          <h2 className="text-2xl font-bold text-[#4cff9b]">
            ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚Â¥Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â´ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â© ÃƒËœÃ‚Â¨Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚Â­ ÃƒÂ°Ã…Â¸Ã…Â½Ã¢â‚¬Â°
          </h2>

          <p className="text-gray-300">ÃƒËœÃ‚Â±Ãƒâ„¢Ã¢â‚¬Å¡Ãƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â©: {campaign.id}</p>
          <p className="text-gray-300">ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬: {campaign.product}</p>
          <p className="text-gray-300">ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â©: {campaign.tribe}</p>
          <p className="text-gray-300">ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¶ÃƒËœÃ‚Â¹: {campaign.mode}</p>

          <hr className="border-[#1b6647]" />

          {/* Global QR */}
          <div>
            <h3 className="text-xl font-bold text-[#4cff9b] flex items-center gap-2">
              <FiLink /> QR ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¦ Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â©
            </h3>
            <div className="mt-3 bg-white p-4 inline-block rounded-lg">
              <QRCode value={campaign.global_qr} size={150} />
            </div>
            <p className="text-gray-400 text-sm mt-2">{campaign.global_qr}</p>
          </div>

          {/* Influencers */}
          <div className="space-y-8">
            <h3 className="text-xl font-bold text-[#4cff9b] flex items-center gap-2">
              <FiUsers /> ÃƒËœÃ‚Â±Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â· ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚ÂªÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¹ + QR Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã†â€™Ãƒâ„¢Ã¢â‚¬Å¾ Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¤ÃƒËœÃ‚Â«ÃƒËœÃ‚Â±
            </h3>

            {campaign.influencers.map((inf, idx) => (
              <div
                key={idx}
                className="bg-[#002015] border border-[#145536] p-5 rounded-lg"
              >
                <h4 className="text-[#4cff9b] font-bold">{inf.influencer}</h4>
                <p className="text-gray-300 mt-1">{inf.track_url}</p>
                <p className="text-gray-500 text-sm">
                  Reward: {inf.reward_per_sale}
                </p>

                <div className="bg-white p-3 inline-block mt-3 rounded-lg">
                  <QRCode value={inf.qr_data} size={120} />
                </div>
              </div>
            ))}
          </div>

          {/* Rewards Logic */}
          <div>
            <h3 className="text-xl font-bold text-[#4cff9b] flex items-center gap-2">
              <FiTrendingUp /> Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â¸ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã†â€™ÃƒËœÃ‚Â§Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¢ÃƒËœÃ‚Âª
            </h3>

            <ul className="text-gray-300 mt-3 space-y-2">
              <li>ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Ãƒâ„¢Ã†â€™Ãƒâ„¢Ã¢â‚¬Å¾ ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â© ÃƒËœÃ‚Â´ÃƒËœÃ‚Â±ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡ ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬Â Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã†â€™ÃƒËœÃ‚Â§Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â£ÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â§ÃƒËœÃ‚Â´ÃƒËœÃ‚Â±ÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¤ÃƒËœÃ‚Â«ÃƒËœÃ‚Â±</li>
              <li>ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ ÃƒËœÃ‚Â±Ãƒâ„¢Ã‚ÂÃƒËœÃ‚Â¹ Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â³ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Â° ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â© (dopamine + token)</li>
              <li>ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­ÃƒËœÃ‚Â³Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â  D-Index</li>
              <li>ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â¹Ãƒâ„¢Ã¢â‚¬Â¦ ÃƒËœÃ‚ÂªÃƒËœÃ‚Â±ÃƒËœÃ‚Â´Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â­ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¤ÃƒËœÃ‚Â«ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â  Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¯Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â©</li>
            </ul>
          </div>

        </div>
      )}
    </div>
  );
}


