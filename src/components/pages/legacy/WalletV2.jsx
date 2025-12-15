// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ WalletV2.jsx (Enhanced v55)
// ------------------------------------------------------------
// Real-time wallet + transactions + token delta
// ============================================================


export default function WalletV2() {
  const [wallets, setWallets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const [walletRes, txRes] = await Promise.all([
        fetch("http://127.0.0.1:8000/creators").then((r) => r.json()),
        fetch("http://127.0.0.1:8000/transactions").then((r) => r.json()).catch(() => ({ transactions: [] }))
      ]);
      setWallets(walletRes.creators || []);
      setTransactions(txRes.transactions || []);
    } catch (err) {
      console.error("Wallet fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 7000);
    return () => clearInterval(interval);
  }, []);

  if (loading)
    return <div className="text-center text-gray-400 mt-20">Loading wallet data...</div>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã‚Â° Creator Wallets Overview</h1>

      <table className="w-full mb-10 border-collapse">
        <thead>
          <tr className="border-b border-gray-700 text-left text-purple-300">
            <th>Name</th>
            <th>Tribe</th>
            <th>VIS</th>
            <th>Token Price</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {wallets.map((w) => (
            <tr
              key={w.id}
              className="border-b border-gray-800 hover:bg-gray-900 transition"
            >
              <td>{w.name}</td>
              <td>{w.tribe}</td>
              <td className="text-green-400">{w.vis_score.toFixed(3)}</td>
              <td>{w.token_price.toFixed(2)} CT</td>
              <td className="text-blue-300">{w.balance.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-2xl font-semibold mb-2 text-yellow-400">
        ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾ Recent Transactions
      </h2>
      <div className="bg-gray-900 rounded-xl p-4 max-h-[400px] overflow-y-auto">
        {transactions.length === 0 ? (
          <div className="text-gray-500 text-center py-10">No transactions yet.</div>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th>#</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr
                  key={t.id || i}
                  className="border-b border-gray-800 hover:bg-gray-800 transition"
                >
                  <td>{i + 1}</td>
                  <td>{t.sender}</td>
                  <td>{t.receiver}</td>
                  <td className="text-green-400">{t.amount}</td>
                  <td>{t.type}</td>
                  <td>{new Date(t.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}


