// ============================================================================
// Ã°Å¸â€™Å¡ Core4 Ã˜Â­Ã™Å Ã˜Â§Ã˜ÂªÃ™Æ’ Ã¢â‚¬â€œ HayatikSettings.jsx (v1.1 FIXED)
// ============================================================================


export default function HayatikSettings() {
  const [sleep, setSleep] = useState("");
  const [coffee, setCoffee] = useState("");
  const [energy, setEnergy] = useState("");
  const [cleaning, setCleaning] = useState("");
  const [shoppingStyle, setShoppingStyle] = useState("");
  const [budget, setBudget] = useState("");

  const save = () => {
    const data = {
      sleep,
      coffee,
      energy,
      cleaning,
      shoppingStyle,
      budget,
    };

    console.log("Hayatik Settings Saved:", data);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8 text-[#1A1A1A]">

      {/* Title */}
      <h1 className="text-3xl font-semibold mb-8 text-[#2A2F32]">
        Ã˜Â¥Ã˜Â¹Ã˜Â¯Ã˜Â§Ã˜Â¯Ã˜Â§Ã˜Âª Ã˜Â­Ã™Å Ã˜Â§Ã˜ÂªÃ™Æ’
      </h1>

      {/* FIXED CLASSNAME */}
      <p className="text-gray-500 mb-6 text-sm">
        Ã˜Â¹Ã˜Â¯Ã™â€˜Ã™â€ž Ã˜ÂªÃ™ÂÃ˜Â¶Ã™Å Ã™â€žÃ˜Â§Ã˜Âª Ã™Å Ã™Ë†Ã™â€¦Ã™Æ’ Ã™â€žÃ™Å Ã˜Â¹Ã˜Â±Ã™Â Core4 Ã˜Â­Ã™Å Ã˜Â§Ã˜ÂªÃ™Æ’ Ã˜Â¨Ã˜Â´Ã™Æ’Ã™â€ž Ã˜Â£Ã™ÂÃ˜Â¶Ã™â€ž.
      </p>

      {/* Sleep Preference */}
      <div className="mb-8">
        <label className="block text-[#4CAF9B] font-semibold mb-2">
          Ã™â€ Ã™Ë†Ã™â€¦Ã™Æ’ Ã˜Â¹Ã˜Â§Ã˜Â¯Ã˜Â©Ã˜Å¸
        </label>

        <select
          className="w-full bg-[#F7F8F9] border rounded-xl p-3"
          value={sleep}
          onChange={(e) => setSleep(e.target.value)}
        >
          <option value="">Ã˜Â§Ã˜Â®Ã˜ÂªÃ˜Â±</option>
          <option>Ã˜Â£Ã™â€ Ã˜Â§Ã™â€¦ Ã˜Â¨Ã˜Â¯Ã˜Â±Ã™Å </option>
          <option>Ã˜Â£Ã™â€ Ã˜Â§Ã™â€¦ Ã™â€¦Ã˜ÂªÃ˜Â£Ã˜Â®Ã˜Â±</option>
          <option>Ã˜Â­Ã˜Â³Ã˜Â¨ Ã˜Â§Ã™â€žÃ™Å Ã™Ë†Ã™â€¦</option>
        </select>
      </div>

      {/* Coffee Preference */}
      <div className="mb-8">
        <label className="block text-[#4CAF9B] font-semibold mb-2">
          Ã™â€šÃ™â€¡Ã™Ë†Ã˜ÂªÃ™Æ’ Ã˜Â§Ã™â€žÃ™â€¦Ã™ÂÃ˜Â¶Ã™â€žÃ˜Â©Ã˜Å¸
        </label>
        <select
          className="w-full bg-[#F7F8F9] border rounded-xl p-3"
          value={coffee}
          onChange={(e) => setCoffee(e.target.value)}
        >
          <option value="">Ã˜Â§Ã˜Â®Ã˜ÂªÃ˜Â±</option>
          <option>Ã™â€¦Ã˜Â®Ã˜ÂªÃ˜ÂµÃ˜Â©</option>
          <option>Ã˜Â¹Ã˜Â§Ã˜Â¯Ã™Å Ã˜Â©</option>
          <option>Ã˜Â¨Ã˜Â¯Ã™Ë†Ã™â€  Ã™â€šÃ™â€¡Ã™Ë†Ã˜Â©</option>
        </select>
      </div>

      {/* Energy Level */}
      <div className="mb-8">
        <label className="block text-[#4CAF9B] font-semibold mb-2">
          Ã˜Â¹Ã˜Â§Ã˜Â¯Ã˜Â©Ã™â€¹ Ã™â€¦Ã˜Â³Ã˜ÂªÃ™Ë†Ã™â€° Ã™â€ Ã˜Â´Ã˜Â§Ã˜Â·Ã™Æ’Ã˜Å¸
        </label>
        <select
          className="w-full bg-[#F7F8F9] border rounded-xl p-3"
          value={energy}
          onChange={(e) => setEnergy(e.target.value)}
        >
          <option value="">Ã˜Â§Ã˜Â®Ã˜ÂªÃ˜Â±</option>
          <option>Ã™â€ Ã˜Â´Ã˜Â§Ã˜Â· Ã˜Â¹Ã˜Â§Ã™â€žÃ™Å </option>
          <option>Ã˜Â¹Ã˜Â§Ã˜Â¯Ã™Å </option>
          <option>Ã™â€¦Ã™â€ Ã˜Â®Ã™ÂÃ˜Â¶</option>
        </select>
      </div>

      {/* Cleaning Preference */}
      <div className="mb-8">
        <label className="block text-[#4CAF9B] font-semibold mb-2">
          Ã˜ÂªÃ˜Â±Ã˜ÂªÃ™Å Ã˜Â¨ Ã™Ë†Ã™â€ Ã˜Â¸Ã˜Â§Ã™ÂÃ˜Â© Ã™Å Ã™Ë†Ã™â€¦Ã™Æ’Ã˜Å¸
        </label>
        <select
          className="w-full bg-[#F7F8F9] border rounded-xl p-3"
          value={cleaning}
          onChange={(e) => setCleaning(e.target.value)}
        >
          <option value="">Ã˜Â§Ã˜Â®Ã˜ÂªÃ˜Â±</option>
          <option>Ã˜Â£Ã˜Â­Ã˜Â¨ Ã˜Â£Ã˜Â±Ã˜ÂªÃ™â€˜Ã˜Â¨ Ã™Å Ã™Ë†Ã™â€¦Ã™Å Ã™â€¹Ã˜Â§</option>
          <option>Ã˜ÂªÃ˜Â±Ã˜ÂªÃ™Å Ã˜Â¨ Ã˜Â£Ã˜Â³Ã˜Â¨Ã™Ë†Ã˜Â¹Ã™Å </option>
          <option>Ã˜Â¹Ã™â€žÃ™â€° Ã˜Â­Ã˜Â³Ã˜Â¨ Ã˜Â§Ã™â€žÃ˜Â­Ã˜Â§Ã˜Â¬Ã˜Â©</option>
        </select>
      </div>

      {/* Shopping Style */}
      <div className="mb-8">
        <label className="block text-[#4CAF9B] font-semibold mb-2">
          Ã˜Â³Ã˜ÂªÃ˜Â§Ã™Å Ã™â€žÃ™Æ’ Ã™ÂÃ™Å  Ã˜Â§Ã™â€žÃ˜ÂªÃ˜Â³Ã™Ë†Ã™â€šÃ˜Å¸
        </label>
        <select
          className="w-full bg-[#F7F8F9] border rounded-xl p-3"
          value={shoppingStyle}
          onChange={(e) => setShoppingStyle(e.target.value)}
        >
          <option value="">Ã˜Â§Ã˜Â®Ã˜ÂªÃ˜Â±</option>
          <option>Ã˜Â£Ã˜Â­Ã˜Â¨ Ã˜Â§Ã™â€žÃ˜Â£Ã˜Â´Ã™Å Ã˜Â§Ã˜Â¡ Ã˜Â§Ã™â€žÃ˜Â¹Ã™â€¦Ã™â€žÃ™Å Ã˜Â©</option>
          <option>Ã˜Â£Ã˜Â­Ã˜Â¨ Ã˜Â§Ã™â€žÃ˜Â£Ã˜Â´Ã™Å Ã˜Â§Ã˜Â¡ Ã˜Â§Ã™â€žÃ™ÂÃ˜Â®Ã™â€¦Ã˜Â©</option>
          <option>Ã˜Â£Ã™ÂÃ˜Â¶Ã™â€ž Ã˜Â§Ã™â€žÃ™â€šÃ™Å Ã™â€¦Ã˜Â© Ã™â€¦Ã™â€šÃ˜Â§Ã˜Â¨Ã™â€ž Ã˜Â§Ã™â€žÃ˜Â³Ã˜Â¹Ã˜Â±</option>
        </select>
      </div>

      {/* Budget */}
      <div className="mb-10">
        <label className="block text-[#4CAF9B] font-semibold mb-2">
          Ã™â€¦Ã™Å Ã˜Â²Ã˜Â§Ã™â€ Ã™Å Ã˜Â© Ã™â€¦Ã˜Â´Ã˜ÂªÃ˜Â±Ã™Å Ã˜Â§Ã˜ÂªÃ™Æ’ Ã˜Â§Ã™â€žÃ™Å Ã™Ë†Ã™â€¦Ã™Å Ã˜Â©Ã˜Å¸
        </label>
        <select
          className="w-full bg-[#F7F8F9] border rounded-xl p-3"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        >
          <option value="">Ã˜Â§Ã˜Â®Ã˜ÂªÃ˜Â±</option>
          <option>Ã™â€¦Ã™â€ Ã˜Â®Ã™ÂÃ˜Â¶Ã˜Â©</option>
          <option>Ã™â€¦Ã˜ÂªÃ™Ë†Ã˜Â³Ã˜Â·Ã˜Â©</option>
          <option>Ã˜Â¹Ã˜Â§Ã™â€žÃ™Å Ã˜Â©</option>
        </select>
      </div>

      {/* Save Button */}
      <button
        onClick={save}
        className="w-full bg-[#4CAF9B] text-white py-4 rounded-2xl text-lg font-medium shadow-md hover:opacity-90 transition"
      >
        Ã˜Â­Ã™ÂÃ˜Â¸ Ã˜Â¥Ã˜Â¹Ã˜Â¯Ã˜Â§Ã˜Â¯Ã˜Â§Ã˜Âª Ã˜Â­Ã™Å Ã˜Â§Ã˜ÂªÃ™Å 
      </button>
    </div>
  );
}


