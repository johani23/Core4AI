// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ OnboardingTour.jsx (v2.3 ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œLive Anchors EditionÃƒÂ¢Ã¢â€šÂ¬Ã‚Â)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Waits until elements exist before running
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Highlights navbar, D-Index, and Analytics
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Works with Framer Motion transitions
// ============================================================

import Joyride, { STATUS } from "react-joyride";
import { motion } from "framer-motion";

export default function OnboardingTour() {
  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState([]);
  const [ready, setReady] = useState(false);

  // ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â­ Watch for DOM availability
  useEffect(() => {
    const checkElements = () => {
      const hasNav = document.querySelector("#core-nav");
      const hasDIndex = document.querySelector("#core-dindex");
      const hasAnalytics = document.querySelector("#core-analytics");
      if (hasNav && hasDIndex && hasAnalytics) setReady(true);
    };
    checkElements();
    const observer = setInterval(checkElements, 500);
    return () => clearInterval(observer);
  }, []);

  // ÃƒÂ¢Ã…â€œÃ‚Â¨ Define tour steps when ready
  useEffect(() => {
    if (!ready) return;
    setSteps([
      {
        target: "#core-nav",
        content: "This is your main navigation bar ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â switch between Creator, Merchant, and Buyer modes.",
        disableBeacon: true,
      },
      {
        target: "#core-dindex",
        content: "Your D-Index shows the live influence health of the entire network.",
      },
      {
        target: "#core-analytics",
        content: "Click here anytime to explore detailed performance analytics.",
      },
    ]);
  }, [ready]);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
      localStorage.setItem("tour_completed", "true");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col items-center justify-center text-gray-200 bg-gradient-to-b from-black via-gray-900 to-gray-950 p-8"
    >
      <h1 className="text-3xl font-bold text-purple-400 mb-4">ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Â¹ Welcome to Core4.AI</h1>
      <p className="text-gray-400 mb-6 max-w-md text-center">
        LetÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢s take a quick tour to help you understand the features and navigate
        between Merchant, Creator, and Audience dashboards.
      </p>

      <button
        onClick={() => setRun(true)}
        disabled={!ready}
        className={`px-5 py-2 rounded-full shadow-md transition ${
          ready ? "bg-purple-600 hover:bg-purple-700 text-white" : "bg-gray-700 text-gray-400 cursor-not-allowed"
        }`}
      >
        {ready ? "Start Tour" : "Preparing..."}
      </button>

      {ready && (
        <Joyride
          steps={steps}
          run={run}
          continuous
          scrollToFirstStep
          showSkipButton
          showProgress
          callback={handleJoyrideCallback}
          styles={{
            options: {
              zIndex: 10000,
              primaryColor: "#9b5de5",
              backgroundColor: "#1a1a1a",
              textColor: "#f3f4f6",
            },
          }}
        />
      )}
    </motion.div>
  );
}


