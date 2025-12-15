// ============================================================
// ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…Â½ Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ UploadDashboard.jsx (MVP-83 Influencer Academy)
// ------------------------------------------------------------
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Uploads creator clips ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ /creator/analyze
// ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ Shows score, level, tribe match, and feedback
// ============================================================


export default function UploadDashboard() {
  const [creatorId, setCreatorId] = useState(1);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [tribe, setTribe] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Select a file first!");
    const formData = new FormData();
    formData.append("creator_id", creatorId);
    formData.append("file", file);

    // Step 1: Analyze clip
    const res = await fetch("http://127.0.0.1:8000/creator/analyze", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setResult(data);

    // Step 2: Tribe reassign
    const res2 = await fetch(
      `http://127.0.0.1:8000/tribe/reassign?creator_id=${creatorId}&score=${data.score}`,
      { method: "POST" }
    );
    const tribeData = await res2.json();
    setTribe(tribeData);

    // Step 3: Feedback
    const res3 = await fetch(`http://127.0.0.1:8000/feedback/${creatorId}`);
    const fbData = await res3.json();
    setFeedback(fbData);
  };

  return (
    <div className="p-6 bg-zinc-900 text-white rounded-2xl shadow-xl flex flex-col gap-5">
      <h2 className="text-xl font-semibold">ÃƒÂ°Ã…Â¸Ã…Â½Ã‚Â¯ Upload & Assessment</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="bg-zinc-800 p-2 rounded"
      />
      <button
        onClick={handleUpload}
        className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded font-medium"
      >
        Upload & Analyze
      </button>

      {result && (
        <div className="border-t border-zinc-700 pt-3 text-sm">
          <p>
            Score: <span className="text-emerald-400">{result.score}</span>
          </p>
          <p>Level: {result.level_name}</p>
        </div>
      )}

      {tribe && (
        <div className="border-t border-zinc-700 pt-3 text-sm">
          <p>
            Tribe Match:{" "}
            <span className="text-sky-400">{tribe.tribe_name}</span> (
            {tribe.reason})
          </p>
        </div>
      )}

      {feedback && (
        <div className="border-t border-zinc-700 pt-3 text-sm">
          <p className="font-semibold">Tips:</p>
          <ul className="list-disc list-inside text-emerald-400">
            {feedback.tips.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
          <p className="mt-2 text-sm opacity-80">
            Next Challenge: {feedback.next_challenge}
          </p>
        </div>
      )}
    </div>
  );
}


