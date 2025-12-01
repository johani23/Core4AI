import React, { useEffect, useState } from "react";

export default function TokenStore() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/token-store")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">ðŸ’° Token Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">{item.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-3">{item.description}</p>
            <div className="text-fuchsia-500 font-bold">{item.cost} C4T</div>
          </div>
        ))}
      </div>
    </div>
  );
}
