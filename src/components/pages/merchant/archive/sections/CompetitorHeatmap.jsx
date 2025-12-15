// ============================================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â¡ CompetitorHeatmap.jsx (Phase 6 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Competitor Heatmap)
// ============================================================================


export default function CompetitorHeatmap({ product, productIQ }) {
  const [points, setPoints] = useState([]);

  const load = async () => {
    const res = await fetch("/api/competitor/heatmap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_name: product.name,
        competitor_name: productIQ.competitor.name,
        competitor_price: productIQ.competitor.price
      })
    });

    const data = await res.json();
    setPoints(data.points || []);
  };

  useEffect(() => {
    if (product && productIQ) load();
  }, [product, productIQ]);

  return (
    <div className="p-6 bg-white border rounded-xl shadow mt-6">
      <h2 className="text-xl font-bold text-green-700 mb-4">
        ÃƒÂ°Ã…Â¸Ã¢â‚¬â€Ã‚ÂºÃƒÂ¯Ã‚Â¸Ã‚Â Competitor Heatmap
      </h2>

      <div className="relative w-full h-64 bg-gray-100 border rounded-xl">
        {points.map((p, i) => (
          <div
            key={i}
            className="absolute flex items-center gap-1"
            style={{
              left: `${p.x}%`,
              bottom: `${p.y}%`,
              transform: "translate(-50%, 50%)",
            }}
          >
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <span className="text-xs text-gray-700 font-semibold">
              {p.name} ({p.price})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}


