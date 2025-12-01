import React, { useState } from "react";
import axios from "axios";

export default function UploadPanel() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [name, setName] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("tribe_id", 1);
    const res = await axios.post("http://127.0.0.1:8000/creator/upload", formData);
    setResult(res.data);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Upload Your Content</h2>
      <input type="text" placeholder="Your name" onChange={e => setName(e.target.value)} className="border p-2 mb-4 w-full"/>
      <input type="file" onChange={e => setFile(e.target.files[0])} className="mb-4"/>
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">Upload & Analyze</button>
      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold">Result</h3>
          <p>Level: {result.level}</p>
          <p>Score: {result.score}</p>
          <p>Assigned Tribe: {result.tribe_assigned}</p>
        </div>
      )}
    </div>
  );
}
