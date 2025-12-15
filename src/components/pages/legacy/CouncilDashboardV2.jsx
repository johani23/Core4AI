// ============================================================
// ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â  Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ CouncilDashboardV2.jsx (MVP-53.3)
// ------------------------------------------------------------
// Council members vote ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ triggers VIS + token updates
// ============================================================


const API_BASE = "http://127.0.0.1:8000";

export default function CouncilDashboardV2() {
  const [creators, setCreators] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/creators`)
      .then((res) => res.json())
      .then((data) => setCreators(data.creators || []));
  }, []);

  async function handleVote(id, rating, sentiment) {
    const payload = {
      creator_id: id,
      council_member: "Council-AI",
      rating,
      sentiment,
    };
    const res = await fetch(`${API_BASE}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setMessage(`ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Vote recorded for Creator #${id} ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ New VIS ${data.new_VIS}`);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-400 mb-4">
        League Council v2 Dashboard
      </h1>
      {message && (
        <div className="mb-4 text-green-400 text-sm">{message}</div>
      )}
      <table className="w-full text-left border-t border-gray-700">
        <thead className="text-gray-400 text-sm uppercase tracking-wider">
          <tr>
            <th>Name</th>
            <th>VIS</th>
            <th>Price</th>
            <th>Vote</th>
          </tr>
        </thead>
        <tbody>
          {creators.map((c) => (
            <tr
              key={c.id}
              className="border-b border-gray-800 hover:bg-gray-900"
            >
              <td>{c.name}</td>
              <td className="text-green-400">{c.vis_score.toFixed(3)}</td>
              <td className="text-blue-400">{c.token_price.toFixed(2)}</td>
              <td>
                <button
                  onClick={() => handleVote(c.id, 1, 0.7)}
                  className="px-3 py-1 bg-yellow-500 text-black rounded-md hover:bg-yellow-400"
                >
                  ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ‚Â Upvote
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


