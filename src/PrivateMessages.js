import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PrivateMessages({ userId = 1 }) {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  // Fetch friends
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/friends/${userId}`)
      .then((res) => setFriends(res.data.friends || []))
      .catch((err) => console.error("Error fetching friends:", err));
  }, [userId]);

  // Fetch messages with selected friend
  useEffect(() => {
    if (selectedFriend) {
      axios
        .get(`http://127.0.0.1:8000/messages/${userId}/${selectedFriend.id}`)
        .then((res) => setMessages(res.data.messages || []))
        .catch((err) => console.error("Error fetching messages:", err));
    }
  }, [selectedFriend]);

  // Send message
  const handleSend = async () => {
    if (!newMsg.trim() || !selectedFriend) return;

    try {
      await axios.post(
        `http://127.0.0.1:8000/messages/${userId}/${selectedFriend.id}`,
        {
          text: newMsg,
          sender: `User${userId}`,
        }
      );

      setMessages([...messages, { sender: `User${userId}`, text: newMsg }]);
      setNewMsg("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mt-4">
      <h2 className="text-xl font-bold mb-3">💌 Private Messages</h2>

      {/* Select friend */}
      <div className="mb-3">
        <select
          value={selectedFriend?.id || ""}
          onChange={(e) =>
            setSelectedFriend(
              friends.find((f) => f.id === parseInt(e.target.value))
            )
          }
          className="border rounded px-2 py-1 w-full"
        >
          <option value="">-- Select a friend --</option>
          {friends.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>
      </div>

      {selectedFriend ? (
        <>
          {/* Messages */}
          <div className="h-40 overflow-y-auto border rounded p-2 mb-3">
            {messages.length === 0 ? (
              <p className="text-gray-500">
                No messages with {selectedFriend.name} yet...
              </p>
            ) : (
              messages.map((m, idx) => (
                <div key={idx} className="mb-1">
                  <strong>{m.sender}:</strong> {m.text}
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Write a message..."
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              className="flex-1 border rounded px-2 py-1"
            />
            <button
              onClick={handleSend}
              className="bg-purple-600 text-white px-3 py-1 rounded"
            >
              Send
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500">Select a friend to start messaging.</p>
      )}
    </div>
  );
}
