// ===================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ MerchantHQ.jsx (Saudi Edition ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Unified Control Center)
// -------------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Multi-tab Saudi-styled HQ for merchants
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Connected to product endpoints + intel + campaigns + creators
// ===================================================================

import {
  FiBox,
  FiBarChart,
  FiTrendingUp,
  FiUsers,
  FiTarget,
  FiSettings,
  FiZap,
  FiRefreshCcw,
} from "react-icons/fi";

import MerchantOverview from "./MerchantOverview";
import MerchantProducts from "./MerchantProducts";
import MerchantCampaigns from "./MerchantCampaigns";
import MerchantAIAdvisor from "./MerchantAIAdvisor";
import MerchantCreatorMatch from "./MerchantCreatorMatch";
import MerchantOrders from "./MerchantOrders";
import MerchantTribeTargeting from "./MerchantTribeTargeting";
import MerchantSettings from "./MerchantSettings";

export default function MerchantHQ() {
  const [tab, setTab] = useState("overview");

  const tabs = [
    { id: "overview", icon: <FiBarChart />, label: "Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â¸ÃƒËœÃ‚Â±ÃƒËœÃ‚Â© ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â©" },
    { id: "products", icon: <FiBox />, label: "Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚ÂªÃƒËœÃ‚Â¬ÃƒËœÃ‚Â§ÃƒËœÃ‚ÂªÃƒâ„¢Ã…Â " },
    { id: "campaigns", icon: <FiTrendingUp />, label: "ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â­Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª" },
    { id: "advisor", icon: <FiZap />, label: "ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â³ÃƒËœÃ‚ÂªÃƒËœÃ‚Â´ÃƒËœÃ‚Â§ÃƒËœÃ‚Â± ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â°Ãƒâ„¢Ã†â€™Ãƒâ„¢Ã…Â " },
    { id: "creators", icon: <FiUsers />, label: "ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚ÂªÃƒËœÃ‚Â±ÃƒËœÃ‚Â§ÃƒËœÃ‚Â­ Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¤ÃƒËœÃ‚Â«ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â " },
    { id: "tribes", icon: <FiTarget />, label: "ÃƒËœÃ‚Â§ÃƒËœÃ‚Â³ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â¡ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â§Ãƒâ„¢Ã‚Â ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¦Ãƒâ„¢Ã¢â‚¬Å¾" },
    { id: "orders", icon: <FiRefreshCcw />, label: "ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â·Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª" },
    { id: "settings", icon: <FiSettings />, label: "ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¥ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª" },
  ];

  return (
    <div className="min-h-screen bg-[#002b16] text-white p-8">

      <h1 className="text-3xl font-extrabold text-[#4cff9b] mb-6">
        ÃƒÂ°Ã…Â¸Ã‚ÂÃ‚Â¬ Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â±Ãƒâ„¢Ã†â€™ÃƒËœÃ‚Â² ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â§ÃƒËœÃ‚Â¬ÃƒËœÃ‚Â± ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Core4.AI
      </h1>

      {/* ---------------- Tabs ---------------- */}
      <div className="flex gap-4 mb-6 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-5 py-2 rounded-lg flex items-center gap-2 text-sm font-bold
              ${
                tab === t.id
                  ? "bg-[#4cff9b] text-[#002b16]"
                  : "bg-[#01341c] text-gray-300 border border-[#1d6642]"
              }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* --------------- Render Tab --------------- */}
      <div className="mt-6">
        {tab === "overview" && <MerchantOverview />}
        {tab === "products" && <MerchantProducts />}
        {tab === "campaigns" && <MerchantCampaigns />}
        {tab === "advisor" && <MerchantAIAdvisor />}
        {tab === "creators" && <MerchantCreatorMatch />}
        {tab === "tribes" && <MerchantTribeTargeting />}
        {tab === "orders" && <MerchantOrders />}
        {tab === "settings" && <MerchantSettings />}
      </div>

    </div>
  );
}


