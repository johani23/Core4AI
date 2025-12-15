// ============================================================================
// Ã°Å¸â€™Å¡ Core4 Ã˜Â­Ã™Å Ã˜Â§Ã˜ÂªÃ™Æ’ Ã¢â‚¬â€œ HayatikAutoMode.jsx (v1 Minimal AI Action Button)
// ============================================================================


export default function HayatikAutoMode({ onActivate }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);

    // simulate AI action
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      onActivate && onActivate();
    }, 800);
  };

  return (
    <div className="mt-14 mb-20">
      <button
        onClick={handleClick}
        className={`w-full py-4 rounded-2xl text-lg font-medium shadow-md transition
          ${done ? "bg-[#2B8A6F]" : "bg-[#4CAF9B] hover:opacity-90"} 
          text-white`}
      >
        {loading
          ? "Ã¢â‚¬Â¦ Ã˜Â¬Ã˜Â§Ã˜Â±Ã™Å  Ã˜Â§Ã™â€žÃ˜ÂªÃ˜Â­Ã˜Â³Ã™Å Ã™â€ "
          : done
          ? "Ã¢Å“â€œ Ã˜ÂªÃ™â€¦ Ã˜ÂªÃ˜Â­Ã˜Â³Ã™Å Ã™â€  Ã™Å Ã™Ë†Ã™â€¦Ã™Æ’"
          : "Ã˜ÂªÃ˜Â­Ã˜Â³Ã™Å Ã™â€  Ã˜Â­Ã™Å Ã˜Â§Ã˜ÂªÃ™Å "}
      </button>

      {done && (
        <p className="text-center text-[#4CAF9B] mt-3 text-sm">
          Ã˜ÂªÃ™â€¦ Ã˜Â¶Ã˜Â¨Ã˜Â· Ã™Å Ã™Ë†Ã™â€¦Ã™Æ’ Ã˜Â¹Ã™â€žÃ™â€° Ã˜Â§Ã™â€žÃ˜Â¥Ã˜Â¹Ã˜Â¯Ã˜Â§Ã˜Â¯Ã˜Â§Ã˜Âª Ã˜Â§Ã™â€žÃ™â€¦Ã˜Â«Ã˜Â§Ã™â€žÃ™Å Ã˜Â© Ã¢Å“Â¨
        </p>
      )}
    </div>
  );
}


