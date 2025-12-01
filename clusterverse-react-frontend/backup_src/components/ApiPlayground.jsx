import React, { useState } from "react";
import {
  signup,
  getPosts,
  addPost,
  upvotePost,
  getChallenges,
  getClusters,
  getClusterShadow,
  getReputation,
  incrementReputation,
} from "../services/api"; // لاحظ ../ لأننا خرجنا من مجلد components

function ApiPlayground() {
  const [username, setUsername] = useState("");
  const [log, setLog] = useState([]);

  // Helper لعرض النتائج
  const logResult = (action, data) => {
    setLog((prev) => [...prev, `${action}: ${JSON.stringify(data)}`]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🚀 Core4AI API Test</h1>

      {/* Signup */}
      <div className="mb-4">
        <input
          className="border p-2 mr-2"
          placeholder="Enter username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={async () => {
            try {
              const res = await signup(username);
              logResult("Signup", res);
            } catch (err) {
              logResult("Signup Error", err.message);
            }
          }}
        >
          Signup
        </button>
      </div>

      {/* Posts */}
      <div className="mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          onClick={async () => {
            try {
              const res = await getPosts();
              logResult("Posts", res);
            } catch (err) {
              logResult("Posts Error", err.message);
            }
          }}
        >
          Get Posts
        </button>

        <button
          className="bg-purple-500 text-white px-4 py-2 rounded mr-2"
          onClick={async () => {
            try {
              const res = await addPost(1, "Hello Core4AI!");
              logResult("Add Post", res);
            } catch (err) {
              logResult("Add Post Error", err.message);
            }
          }}
        >
          Add Post
        </button>

        <button
          className="bg-orange-500 text-white px-4 py-2 rounded"
          onClick={async () => {
            try {
              const res = await upvotePost(1);
              logResult("Upvote Post", res);
            } catch (err) {
              logResult("Upvote Post Error", err.message);
            }
          }}
        >
          Upvote Post
        </button>
      </div>

      {/* Challenges */}
      <div className="mb-4">
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded"
          onClick={async () => {
            try {
              const res = await getChallenges();
              logResult("Challenges", res);
            } catch (err) {
              logResult("Challenges Error", err.message);
            }
          }}
        >
          Get Challenges
        </button>
      </div>

      {/* Clusters */}
      <div className="mb-4">
        <button
          className="bg-pink-500 text-white px-4 py-2 rounded mr-2"
          onClick={async () => {
            try {
              const res = await getClusters();
              logResult("Clusters", res);
            } catch (err) {
              logResult("Clusters Error", err.message);
            }
          }}
        >
          Get Clusters
        </button>

        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded"
          onClick={async () => {
            try {
              const res = await getClusterShadow("test-cluster");
              logResult("Cluster Shadow", res);
            } catch (err) {
              logResult("Cluster Shadow Error", err.message);
            }
          }}
        >
          Get Cluster Shadow
        </button>
      </div>

      {/* Reputation */}
      <div className="mb-4">
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded mr-2"
          onClick={async () => {
            try {
              const res = await getReputation();
              logResult("Reputation", res);
            } catch (err) {
              logResult("Reputation Error", err.message);
            }
          }}
        >
          Get Reputation
        </button>

        <button
          className="bg-teal-500 text-white px-4 py-2 rounded"
          onClick={async () => {
            try {
              const res = await incrementReputation();
              logResult("Increment Reputation", res);
            } catch (err) {
              logResult("Increment Reputation Error", err.message);
            }
          }}
        >
          Increment Reputation
        </button>
      </div>

      {/* Logs */}
      <div className="mt-6">
        <h2 className="font-bold">Logs:</h2>
        <pre className="bg-black text-green-400 p-4 rounded h-64 overflow-y-scroll">
          {log.join("\n")}
        </pre>
      </div>
    </div>
  );
}

export default ApiPlayground;
