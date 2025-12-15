import React, { useState } from "react";

export default function InnerCircle() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [nominations, setNominations] = useState({});
  const members = ["Aisha", "Omar", "Lina", "Yusuf"];

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: messages.length + 1, text: input }]);
    setInput("");
  };

  const handleNominate = (name) => {
    setNominations((prev) => ({ ...prev, [name]: true }));
    console.log(`Nomination submitted for: ${name}`);
  };

  return (
    <div className="card">
      <h2>Ã°Å¸â€˜Â¥ Inner Circle</h2>
      <div className="chat-box">
        {messages.map((m) => (
          <div key={m.id} className="chat-msg">{m.text}</div>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <h3>Ã°Å¸â€â€™ Secret Nominations</h3>
      <ul>
        {members.map((m) => (
          <li key={m}>
            {m}
            <button onClick={() => handleNominate(m)}>Nominate</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

