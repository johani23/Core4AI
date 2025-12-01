import React from "react";

function CirclesBoard({ points }) {
  // تحديد الدائرة الأقرب بناءً على النقاط
  const getActiveCircle = () => {
    if (points < 20) return "Travelers";
    if (points < 40) return "Book Lovers";
    if (points < 60) return "Event Enthusiasts";
    if (points < 80) return "Health & Fitness";
    return "Creatives & Artists";
  };

  const activeCircle = getActiveCircle();

  const circles = [
    { name: "Travelers 🌍", key: "Travelers" },
    { name: "Book Lovers 📚", key: "Book Lovers" },
    { name: "Event Enthusiasts 🎉", key: "Event Enthusiasts" },
    { name: "Health & Fitness 🏋️", key: "Health & Fitness" },
    { name: "Creatives & Artists 🎨", key: "Creatives & Artists" },
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-8 w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-6 text-center">🌐 Your Circles</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
        {circles.map((circle) => (
          <div
            key={circle.key}
            className={`p-4 rounded-full border-4 ${
              activeCircle === circle.key
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 bg-gray-100"
            }`}
          >
            <span
              className={`block font-semibold ${
                activeCircle === circle.key ? "text-blue-700" : "text-gray-600"
              }`}
            >
              {circle.name}
            </span>
            {activeCircle === circle.key && (
              <p className="mt-2 text-sm text-green-600">✨ You are here!</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CirclesBoard;
