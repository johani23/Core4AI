// ============================================================================
// Ã°Å¸â€™Å¡ Core4 Ã˜Â­Ã™Å Ã˜Â§Ã˜ÂªÃ™Æ’ Ã¢â‚¬â€œ HayatikInterests.jsx (v1 Minimal Luxury UI)
// ============================================================================


export default function HayatikInterests() {
  const categories = [
    "Ã˜Â§Ã™â€žÃ™â€šÃ™â€¡Ã™Ë†Ã˜Â©",
    "Ã˜Â§Ã™â€žÃ˜ÂªÃ˜Â³Ã™Ë†Ã™â€š",
    "Ã˜Â§Ã™â€žÃ˜Â±Ã™Å Ã˜Â§Ã˜Â¶Ã˜Â©",
    "Ã˜Â§Ã™â€žÃ˜ÂªÃ™â€ Ã˜Â¸Ã™Å Ã™â€¦ Ã™Ë†Ã˜Â§Ã™â€žÃ˜ÂªÃ˜Â±Ã˜ÂªÃ™Å Ã˜Â¨",
    "Ã˜Â§Ã™â€žÃ˜ÂªÃ™â€ Ã˜Â¸Ã™Å Ã™Â",
    "Ã˜Â§Ã™â€žÃ˜Â±Ã˜Â§Ã˜Â­Ã˜Â©",
    "Ã˜Â§Ã™â€žÃ˜Â¹Ã™â€ Ã˜Â§Ã™Å Ã˜Â© Ã˜Â§Ã™â€žÃ˜Â´Ã˜Â®Ã˜ÂµÃ™Å Ã˜Â©",
    "Ã˜Â§Ã™â€žÃ˜Â£Ã˜Â¬Ã™â€¡Ã˜Â²Ã˜Â© Ã˜Â§Ã™â€žÃ™â€¦Ã™â€ Ã˜Â²Ã™â€žÃ™Å Ã˜Â©",
    "Ã˜Â§Ã™â€žÃ˜ÂªÃ™â€šÃ™â€ Ã™Å Ã˜Â©",
    "Ã˜Â§Ã™â€žÃ™â€¦Ã˜Â·Ã˜Â§Ã˜Â¹Ã™â€¦",
    "Ã˜Â§Ã™â€žÃ™â€žÃ™Å Ã˜Â§Ã™â€šÃ˜Â©",
    "Ã˜Â§Ã™â€žÃ˜Â³Ã™ÂÃ˜Â±",
  ];

  const [selected, setSelected] = useState([]);

  const toggle = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((x) => x !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8 text-[#1A1A1A]">

      {/* Title */}
      <h1 className="text-3xl font-semibold mb-8 text-[#2A2F32]">
        Ã˜Â§Ã™â€¡Ã˜ÂªÃ™â€¦Ã˜Â§Ã™â€¦Ã™â‚¬Ã˜Â§Ã˜ÂªÃ™â‚¬Ã™â‚¬Ã™Æ’
      </h1>

      <p classname="text-gray-500 mb-6 text-sm">
        Ã˜Â§Ã˜Â®Ã˜ÂªÃ˜Â± Ã˜Â§Ã™â€žÃ˜Â£Ã˜Â´Ã™Å Ã˜Â§Ã˜Â¡ Ã˜Â§Ã™â€žÃ™â€žÃ™Å  Ã˜ÂªÃ˜Â¹Ã™Æ’Ã˜Â³ Ã˜Â­Ã™Å Ã˜Â§Ã˜ÂªÃ™Æ’ Ã™Ë†Ã˜Â°Ã™Ë†Ã™â€šÃ™Æ’.  
      </p>

      {/* Interests Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">

        {categories.map((item, i) => (
          <button
            key={i}
            onClick={() => toggle(item)}
            className={`py-3 px-4 rounded-xl shadow-sm border 
              text-sm transition font-medium
              ${
                selected.includes(item)
                  ? "bg-[#4CAF9B] text-white border-[#4CAF9B]"
                  : "bg-[#F7F8F9] text-[#2A2F32] hover:bg-[#EDEFF0]"
              }`}
          >
            {item}
          </button>
        ))}

      </div>

      {/* Save Button */}
      <button
        className="w-full bg-[#4CAF9B] text-white py-4 rounded-2xl text-lg font-medium shadow-md hover:opacity-90 transition mt-12"
        onClick={() => console.log("Interests Saved:", selected)}
      >
        Ã˜Â­Ã™ÂÃ˜Â¸ Ã˜Â§Ã™â€¡Ã˜ÂªÃ™â€¦Ã˜Â§Ã™â€¦Ã™â‚¬Ã˜Â§Ã˜ÂªÃ™â‚¬Ã™â‚¬Ã™Å 
      </button>
    </div>
  );
}


