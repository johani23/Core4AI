// ============================================================================
// Ã°Å¸â€™Å¡ Core4 Ã˜Â­Ã™Å Ã˜Â§Ã˜ÂªÃ™Æ’ Ã¢â‚¬â€œ HayatikHome.jsx (v3 Ã¢â‚¬â€ Tribe Integration)
// ============================================================================


// Components
import HayatikSuggestions from "./HayatikSuggestions";
import HayatikFlow from "./HayatikFlow";
import HayatikAutoMode from "./HayatikAutoMode";
import TribeBlock from "./TribeBlock";

export default function HayatikHome() {
  const [snapshot, setSnapshot] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [flow, setFlow] = useState(null);
  const [tribes, setTribes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHayatik();
  }, []);

  const loadHayatik = async () => {
    try {
      // Snapshot demo
      const snap = {
        mood: "Ã™â€¦Ã˜Â±Ã˜ÂªÃ˜Â§Ã˜Â­",
        needs: ["Ã™â€šÃ™â€¡Ã™Ë†Ã˜Â©", "Ã˜ÂªÃ™â€ Ã˜Â¸Ã™Å Ã™â€¦ Ã˜Â§Ã™â€žÃ™Å Ã™Ë†Ã™â€¦", "Ã˜Â¹Ã˜Â±Ã˜Â¶ Ã™â€¦Ã™â€ Ã˜Â§Ã˜Â³Ã˜Â¨"],
        today: ["Ã˜Â§Ã™â€šÃ˜ÂªÃ˜Â±Ã˜Â§Ã˜Â­Ã˜Â§Ã˜Âª Ã˜Â¬Ã˜Â¯Ã™Å Ã˜Â¯Ã˜Â© Ã™â€žÃ™Æ’", "Ã™â€¦Ã™â€ Ã˜ÂªÃ˜Â¬Ã˜Â§Ã˜Âª Ã˜Â¹Ã™â€žÃ™â€° Ã˜Â­Ã˜Â³Ã˜Â¨ Ã˜Â­Ã™Å Ã˜Â§Ã˜ÂªÃ™Æ’"],
      };

      // Smart Suggestions demo
      const sug = {
        products: [
          "Ã™â€¦Ã™â€ Ã˜Â¸Ã™Â Ã˜Â£Ã˜Â±Ã˜Â¶Ã™Å Ã˜Â§Ã˜Âª Ã™â€¦Ã™â€¦Ã˜ÂªÃ˜Â§Ã˜Â²",
          "Ã™â€šÃ™â€¡Ã™Ë†Ã˜Â© Ã™Æ’Ã™Ë†Ã™â€žÃ™Ë†Ã™â€¦Ã˜Â¨Ã™Å Ã˜Â© Ã™â€¦Ã˜Â­Ã™â€¦Ã˜ÂµÃ˜Â©",
          "Ã˜Â³Ã™â€¦Ã˜Â§Ã˜Â¹Ã˜Â§Ã˜Âª Ã™Å Ã™Ë†Ã™â€¦Ã™Å Ã˜Â© Ã˜Â®Ã™ÂÃ™Å Ã™ÂÃ˜Â©",
        ],
        creators: ["Ã˜Â±Ã™Å Ã™â€¦ Ã˜Â³Ã˜ÂªÃ˜Â§Ã™Å Ã™â€ž", "Ã™ÂÃ™â€¡Ã˜Â¯ Ã™â€žÃ˜Â§Ã™Å Ã™Â", "Ã˜Â³Ã˜Â§Ã˜Â±Ã˜Â© Ã™ÂÃ™â€žÃ™Ë†"],
        merchants: ["Ã˜Â¯Ã˜Â§Ã™â€ Ã™Ë†Ã˜Â¨", "Ã™Æ’Ã˜Â§Ã˜Â±Ã™ÂÃ™Ë†Ã˜Â±", "Ã˜Â®Ã˜Â¯Ã™â€¦Ã˜Â§Ã˜Âª Ã˜ÂªÃ™â€ Ã˜Â¸Ã™Å Ã™Â"],
        lifestyle: ["Ã˜Â±Ã™Ë†Ã˜ÂªÃ™Å Ã™â€  Ã˜ÂµÃ˜Â¨Ã˜Â§Ã˜Â­Ã™Å  Ã˜Â£Ã˜Â³Ã˜Â±Ã˜Â¹", "Checklist Ã™â€žÃ™â€žÃ˜Â­Ã™Å Ã˜Â§Ã˜Â© Ã˜Â§Ã™â€žÃ™Å Ã™Ë†Ã™â€¦Ã™Å Ã˜Â©"],
      };

      // Flow demo
      const flowDemo = [
        {
          time: "Ã˜Â§Ã™â€žÃ˜ÂµÃ˜Â¨Ã˜Â§Ã˜Â­",
          title: "Ã˜ÂªÃ™â€ Ã˜Â¸Ã™Å Ã™â€¦ Ã™Å Ã™Ë†Ã™â€¦Ã™Æ’",
          details: "Ã˜Â§Ã™â€šÃ˜ÂªÃ˜Â±Ã˜Â§Ã˜Â­Ã˜Â§Ã˜Âª Ã˜Â¨Ã˜Â³Ã™Å Ã˜Â·Ã˜Â© Ã˜ÂªÃ˜Â³Ã˜Â§Ã˜Â¹Ã˜Â¯Ã™Æ’ Ã˜ÂªÃ˜Â¨Ã˜Â¯Ã˜Â£ Ã™Å Ã™Ë†Ã™â€¦Ã™Æ’ Ã˜Â¨Ã˜Â´Ã™Æ’Ã™â€ž Ã˜Â£Ã˜Â³Ã™â€¡Ã™â€ž.",
        },
        {
          time: "Ã˜Â§Ã™â€žÃ˜Â¸Ã™â€¡Ã˜Â±",
          title: "Ã˜Â§Ã˜Â­Ã˜ÂªÃ™Å Ã˜Â§Ã˜Â¬ Ã˜Â¨Ã˜Â³Ã™Å Ã˜Â·",
          details: "Ã™â€šÃ™â€¡Ã™Ë†Ã˜Â© Ã˜Â£Ã™Ë† Ã˜Â¨Ã˜Â±Ã™Å Ã™Æ’ Ã˜Â³Ã˜Â±Ã™Å Ã˜Â¹ Ã™Å Ã™â€ Ã˜Â§Ã˜Â³Ã˜Â¨ Ã™â€¦Ã˜Â²Ã˜Â§Ã˜Â¬Ã™Æ’.",
        },
        {
          time: "Ã˜Â§Ã™â€žÃ™â€¦Ã˜Â³Ã˜Â§Ã˜Â¡",
          title: "Ã˜Â±Ã˜Â§Ã˜Â­Ã˜Â© Ã™Ë†Ã™â€¡Ã˜Â¯Ã™Ë†Ã˜Â¡",
          details: "Ã˜Â¹Ã™â€ Ã˜Â§Ã˜ÂµÃ˜Â± Ã˜ÂªÃ˜Â³Ã˜Â§Ã˜Â¹Ã˜Â¯Ã™Æ’ Ã˜ÂªÃ™â€ Ã™â€¡Ã™Å  Ã™Å Ã™Ë†Ã™â€¦Ã™Æ’ Ã˜Â¨Ã˜Â±Ã˜Â§Ã˜Â­Ã˜Â©.",
        },
      ];

      // Tribe Info Demo
      const tribeInfo = {
        primary: "Adventurers",
        secondary: "Techy",

        primaryColor: "#FF6B35",
        secondaryColor: "#1E90FF",

        primaryPersonality: "Ã˜ÂªÃ˜Â­Ã˜Â¨ Ã˜Â§Ã™â€žÃ˜ÂªÃ˜ÂºÃ™Å Ã™Å Ã˜Â± Ã™Ë†Ã˜Â§Ã™â€žÃ˜ÂªÃ˜Â¬Ã˜Â§Ã˜Â±Ã˜Â¨ Ã™Ë†Ã˜Â±Ã™Ë†Ã˜Â­ Ã˜Â§Ã™â€žÃ™â€¦Ã˜ÂºÃ˜Â§Ã™â€¦Ã˜Â±Ã˜Â©.",
        secondaryPersonality: "Ã˜Â´Ã˜Â®Ã˜Âµ Ã˜Â¹Ã™â€¦Ã™â€žÃ™Å  Ã™Å Ã˜Â­Ã˜Â¨ Ã˜Â§Ã™â€žÃ˜Â°Ã™Æ’Ã˜Â§Ã˜Â¡ Ã™Ë†Ã˜Â§Ã™â€žÃ˜ÂªÃ™â€šÃ™â€ Ã™Å Ã˜Â§Ã˜Âª Ã˜Â§Ã™â€žÃ˜Â­Ã˜Â¯Ã™Å Ã˜Â«Ã˜Â©.",

        primaryInfluencers: ["Ã˜Â±Ã™Å Ã™â€ Ã˜Â§Ã˜Â¯ Ã˜Â§Ã™â€žÃ™â€¦Ã˜ÂºÃ˜Â§Ã™â€¦Ã˜Â±Ã˜Â©", "Ã™ÂÃ™â€¡Ã˜Â¯ Ã˜ÂªÃ˜Â±Ã˜Â§Ã™ÂÃ™â€ž"],
        secondaryInfluencers: ["Ã˜ÂªÃ˜Â±Ã™Æ’Ã™Å  Ã˜Â§Ã™â€žÃ˜ÂªÃ™â€šÃ™â€ Ã™Å ", "Ã˜Â³Ã˜Â§Ã˜Â±Ã˜Â© Digital"],
      };

      setSnapshot(snap);
      setSuggestions(sug);
      setFlow(flowDemo);
      setTribes(tribeInfo);

    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] px-6 py-8">

      {/* Title */}
      <h1 className="text-3xl font-semibold mb-8 text-[#2A2F32]">
        Core4 <span className="text-[#4CAF9B]">Ã˜Â­Ã™Å Ã˜Â§Ã˜ÂªÃ™Æ’</span>
      </h1>

      {/* Snapshot Card */}
      <div className="bg-[#F7F8F9] rounded-2xl shadow-sm p-6 mb-10">
        {loading ? (
          <p className="text-gray-400">...Ã™Å Ã˜ÂªÃ™â€¦ Ã˜Â§Ã™â€žÃ˜ÂªÃ˜Â­Ã™â€¦Ã™Å Ã™â€ž</p>
        ) : (
          <>
            <h2 className="text-xl font-medium mb-3 text-[#333]">
              Ã™â€¦Ã™â€žÃ˜Â®Ã˜Âµ Ã™Å Ã™Ë†Ã™â€¦Ã™Æ’
            </h2>

            <div className="mb-4">
              <span className="font-semibold text-[#4CAF9B]">Ã˜Â§Ã™â€žÃ™â€¦Ã˜Â²Ã˜Â§Ã˜Â¬:</span>{" "}
              {snapshot.mood}
            </div>

            <div className="mb-4">
              <span className="font-semibold text-[#4CAF9B]">
                Ã˜Â§Ã˜Â­Ã˜ÂªÃ™Å Ã˜Â§Ã˜Â¬Ã˜Â§Ã˜Âª Ã˜Â¨Ã˜Â³Ã™Å Ã˜Â·Ã˜Â©:
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {snapshot.needs.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white rounded-full text-sm shadow-sm border"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-semibold text-[#4CAF9B]">
                Ã˜Â§Ã™â€žÃ™Å Ã™Ë†Ã™â€¦ Ã™Å Ã˜Â¹Ã˜Â¬Ã˜Â¨Ã™Æ’:
              </span>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                {snapshot.today.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      {/* Smart Suggestions */}
      <HayatikSuggestions data={suggestions} />

      {/* Tribe Identity Section */}
      <TribeBlock tribes={tribes} />

      {/* Daily Flow */}
      <HayatikFlow flow={flow} />

      {/* Auto Mode */}
      <HayatikAutoMode
        onActivate={() => console.log("Hayatik Auto Mode Activated")}
      />

    </div>
  );
}


