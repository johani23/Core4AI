// ============================================================================
// Ã°Å¸â€™Å¡ Core4 Ã˜Â­Ã™Å Ã˜Â§Ã˜ÂªÃ™Æ’ Ã¢â‚¬â€œ HayatikShoppingPicks.jsx (v1 Minimal Lifestyle Catalog)
// ============================================================================


export default function HayatikShoppingPicks() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    // Later Ã¢â€ â€™ connect to /api/hayatik/shopping
    const demo = [
      {
        title: "Ã™â€¦Ã™â€ Ã˜Â¸Ã™Â Ã˜Â£Ã˜Â±Ã˜Â¶Ã™Å Ã˜Â§Ã˜Âª Ã™ÂÃ™â€ Ã˜Â¯Ã™â€šÃ™Å ",
        desc: "Ã™Å Ã˜Â¹Ã˜Â·Ã™Å  Ã™â€žÃ™â€¦Ã˜Â¹Ã˜Â© Ã™ÂÃ˜Â®Ã™â€¦Ã˜Â© Ã™Ë†Ã™Å Ã˜Â®Ã™â€žÃ™â€˜Ã™Å  Ã˜Â±Ã™Å Ã˜Â­Ã˜Â© Ã˜Â§Ã™â€žÃ˜Â¨Ã™Å Ã˜Âª Ã™â€ Ã˜Â¸Ã™Å Ã™ÂÃ˜Â©.",
        price: "29 Ã˜Â±Ã™Å Ã˜Â§Ã™â€ž",
      },
      {
        title: "Ã™â€šÃ™â€¡Ã™Ë†Ã˜Â© Ã™â€¦Ã˜Â­Ã™â€¦Ã˜ÂµÃ˜Â© Ã™â€¦Ã˜Â®Ã˜ÂªÃ˜ÂµÃ˜Â©",
        desc: "Ã˜ÂªÃ™â€ Ã˜Â§Ã˜Â³Ã˜Â¨ Ã™â€¦Ã˜Â²Ã˜Â§Ã˜Â¬Ã™Æ’ Ã™Ë†Ã˜ÂªÃ˜Â¶Ã˜Â¨Ã˜Â· Ã˜ÂµÃ˜Â¨Ã˜Â§Ã˜Â­Ã™Æ’.",
        price: "38 Ã˜Â±Ã™Å Ã˜Â§Ã™â€ž",
      },
      {
        title: "Ã™â€¦Ã™â€ Ã˜Â§Ã˜Â¯Ã™Å Ã™â€ž Ã™â€¦Ã˜Â¹Ã˜Â·Ã˜Â±Ã˜Â©",
        desc: "Ã™â€¦Ã˜Â«Ã˜Â§Ã™â€žÃ™Å Ã˜Â© Ã™â€žÃ™â€žÃ˜Â§Ã˜Â³Ã˜ÂªÃ˜Â®Ã˜Â¯Ã˜Â§Ã™â€¦ Ã˜Â§Ã™â€žÃ™Å Ã™Ë†Ã™â€¦Ã™Å .",
        price: "12 Ã˜Â±Ã™Å Ã˜Â§Ã™â€ž",
      },
      {
        title: "Ã™â€¦Ã™â€ Ã˜Â¸Ã™Â Ã˜Â£Ã˜Â³Ã˜Â·Ã˜Â­ Ã™â€¦Ã˜ÂªÃ˜Â¹Ã˜Â¯Ã˜Â¯",
        desc: "Ã™â€žÃ˜ÂªÃ˜Â±Ã˜ÂªÃ™Å Ã˜Â¨ Ã™Ë†Ã˜ÂªÃ™â€ Ã˜Â¸Ã™Å Ã™â€¦ Ã˜Â£Ã˜Â³Ã˜Â±Ã˜Â¹ Ã˜Â¨Ã˜Â¯Ã™Ë†Ã™â€  Ã˜Â¹Ã™â€ Ã˜Â§Ã˜Â¡.",
        price: "18 Ã˜Â±Ã™Å Ã˜Â§Ã™â€ž",
      },
      {
        title: "Ã˜Â´Ã™â€¦Ã˜Â¹Ã˜Â© Ã˜Â±Ã™Ë†Ã˜Â§Ã˜Â¦Ã˜Â­ Ã™â€¦Ã™â€¡Ã˜Â¯Ã˜Â¦Ã˜Â©",
        desc: "Ã˜Â£Ã˜Â¬Ã™Ë†Ã˜Â§Ã˜Â¡ Ã™â€¦Ã˜Â³Ã˜Â§Ã˜Â¦Ã™Å Ã˜Â© Ã™â€¡Ã˜Â§Ã˜Â¯Ã˜Â¦Ã˜Â© Ã™Ë†Ã™â€¦Ã˜Â±Ã™Å Ã˜Â­Ã˜Â©.",
        price: "54 Ã˜Â±Ã™Å Ã˜Â§Ã™â€ž",
      },
    ];

    setItems(demo);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8 text-[#1A1A1A]">

      {/* Title */}
      <h1 className="text-3xl font-semibold mb-8 text-[#2A2F32]">
        Ã™â€¦Ã™â€ Ã˜ÂªÃ˜Â¬Ã˜Â§Ã˜Âª Ã˜ÂªÃ™â€ Ã˜Â§Ã˜Â³Ã˜Â¨ Ã˜Â­Ã™Å Ã˜Â§Ã˜ÂªÃ™Æ’
      </h1>

      {/* Loading */}
      {!items && (
        <p className="text-gray-400 text-center py-6">...Ã™Å Ã˜ÂªÃ™â€¦ Ã˜Â§Ã™â€žÃ˜ÂªÃ˜Â­Ã™â€¦Ã™Å Ã™â€ž</p>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {items &&
          items.map((item, i) => (
            <div
              key={i}
              className="p-6 bg-[#F7F8F9] rounded-2xl shadow-sm hover:shadow transition"
            >
              <h3 className="text-lg font-semibold text-[#4CAF9B]">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2">{item.desc}</p>

              <div className="mt-4 text-[#2A2F32] font-medium">
                {item.price}
              </div>

              <button
                className="mt-5 w-full py-3 rounded-xl bg-[#4CAF9B] text-white font-medium hover:opacity-90 transition"
                onClick={() => console.log("Added:", item.title)}
              >
                Ã˜Â£Ã˜Â¶Ã™Â Ã™â€žÃ™â€žÃ˜Â³Ã™â€žÃ˜Â©
              </button>
            </div>
          ))}

      </div>
    </div>
  );
}


