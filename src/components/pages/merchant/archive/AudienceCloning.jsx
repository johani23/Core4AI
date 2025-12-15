// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ AudienceCloning.jsx (v1.0 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œSaudi Lookalike EngineÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ----------------------------------------------------------------------------
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Generates buyer seeds + lookalikes (1% | 2% | 5% | 10%)
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Behavioral segmentation engine (Saudi Market Version)
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Interest stacking for Meta + TikTok
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Exportable audience profiles (JSON / CSV)
// ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Designed for merchants to scale ads intelligently
// ============================================================================

import {
  FiUsers,
  FiTarget,
  FiDownload,
  FiLayers,
  FiActivity,
  FiSearch,
  FiZap,
  FiFileText,
} from "react-icons/fi";

export default function AudienceCloning() {
  const [productName, setProductName] = useState("");
  const [tribe, setTribe] = useState("");
  const [seedSize, setSeedSize] = useState(500);
  const [results, setResults] = useState(null);

  const TRIBES = ["Techy", "Fashionists", "EventGoers", "Adventurers"];

  const buildAudience = () => {
    if (!productName || !tribe) return;

    const interestLayers = {
      Techy: [
        "AI",
        "Smartphones",
        "Coding",
        "Tech Youtubers",
        "Electronics stores",
      ],
      Fashionists: [
        "Makeup",
        "Luxury brands",
        "Influencers (Saudi)",
        "Lifestyle bloggers",
        "Fashion magazines",
      ],
      EventGoers: [
        "Restaurants",
        "Events in Riyadh",
        "Concerts",
        "Food festivals",
        "Snapchat Public Places",
      ],
      Adventurers: [
        "Camping",
        "Outdoors",
        "Hiking",
        "Travel",
        "Adventure vloggers",
      ],
    };

    const behavior = {
      Techy: [
        "Purchases electronics often",
        "Follows tech creators",
        "Engages with product review videos",
      ],
      Fashionists: [
        "High engagement with beauty/fashion ads",
        "Adds to cart late at night",
        "Influence-driven behavior",
      ],
      EventGoers: [
        "Weekend activity spenders",
        "High food delivery frequency",
        "Checks Snap Maps 'Hot Spots'",
      ],
      Adventurers: [
        "Outdoor purchase patterns",
        "Follows travel influencers",
        "Loves gear reviews",
      ],
    };

    const lookalikes = {
      "1%": seedSize * 50,
      "2%": seedSize * 100,
      "5%": seedSize * 250,
      "10%": seedSize * 500,
    };

    setResults({
      tribe,
      productName,
      seedSize,
      interests: interestLayers[tribe],
      behavior: behavior[tribe],
      lookalikes,
    });
  };

  const exportCSV = () => {
    const csv =
      "audience, size\n" +
      Object.entries(results.lookalikes)
        .map(([k, v]) => `${k},${v}`)
        .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "audience_lookalikes.csv";
    a.click();
  };

  return (
    <div className="space-y-10">

      <h1 className="text-3xl font-extrabold text-[#4cff9b] flex items-center gap-3">
        <FiUsers /> E9 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Audience Cloning Engine
      </h1>
      <p className="text-gray-300">
        ÃƒËœÃ‚Â¨Ãƒâ„¢Ã¢â‚¬Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¡ ÃƒËœÃ‚Â¬Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¡Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â± ÃƒËœÃ‚Â´ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â¡ÃƒËœÃ‚Â© (Lookalike Audiences) ÃƒËœÃ‚Â¨ÃƒËœÃ‚Â¬Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¯ÃƒËœÃ‚Â© ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â© Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¡ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³ÃƒËœÃ‚Â¹Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¯Ãƒâ„¢Ã…Â .
      </p>

      {/* INPUTS */}
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
          {TRIBES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        <input
          type="number"
          value={seedSize}
          onChange={(e) => setSeedSize(Number(e.target.value))}
          className="w-full px-4 py-3 bg-[#002015] border border-[#145536] text-white rounded-lg"
          placeholder="Seed audience size"
        />

        <button
          onClick={buildAudience}
          className="w-full py-3 bg-[#4cff9b] text-black font-extrabold rounded-lg flex items-center justify-center gap-2"
        >
          <FiTarget /> ÃƒËœÃ‚ÂªÃƒâ„¢Ã‹â€ Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¯ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¬Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â¡Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â±
        </button>
      </div>

      {/* RESULTS */}
      {results && (
        <div className="space-y-10">

          <Section
            title="ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â¨Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â© ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â®ÃƒËœÃ‚ÂªÃƒËœÃ‚Â§ÃƒËœÃ‚Â±ÃƒËœÃ‚Â©"
            icon={<FiLayers />}
            content={results.tribe}
          />

          <SectionList
            title="ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¡ÃƒËœÃ‚ÂªÃƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¬Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã¢â‚¬Â¡Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â± (Interest Layers)"
            icon={<FiSearch />}
            items={results.interests}
          />

          <SectionList
            title="ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â³Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã‹â€ Ãƒâ„¢Ã†â€™Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â§ÃƒËœÃ‚Âª ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â´ÃƒËœÃ‚Â±ÃƒËœÃ‚Â§ÃƒËœÃ‚Â¦Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â© (Behavioral Signals)"
            icon={<FiActivity />}
            items={results.behavior}
          />

          <div className="bg-[#01341c] border border-[#1b6647] p-6 rounded-xl">
            <h2 className="text-xl text-[#4cff9b] font-bold flex items-center gap-2">
              <FiZap /> Lookalike Sizes (Saudi Market)
            </h2>
            <ul className="list-disc ml-6 text-gray-300 space-y-2 mt-3">
              {Object.entries(results.lookalikes).map(([k, v]) => (
                <li key={k}>
                  {k} Audience ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ <span className="text-white font-bold">{v} users</span>
                </li>
              ))}
            </ul>

            <button
              onClick={exportCSV}
              className="mt-5 bg-[#4cff9b] text-black px-4 py-2 rounded-md font-bold flex items-center gap-2"
            >
              <FiDownload /> Export CSV
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, icon, content }) {
  return (
    <div className="bg-[#002015] border border-[#145536] p-6 rounded-xl">
      <h2 className="text-xl text-[#4cff9b] font-bold flex items-center gap-2">
        {icon} {title}
      </h2>
      <p className="text-white text-2xl font-bold mt-3">{content}</p>
    </div>
  );
}

function SectionList({ title, icon, items }) {
  return (
    <div className="bg-[#01341c] border border-[#1b6647] p-6 rounded-xl">
      <h2 className="text-xl text-[#4cff9b] font-bold flex items-center gap-2">
        {icon} {title}
      </h2>
      <ul className="list-disc ml-6 text-gray-300 space-y-2 mt-3">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}


