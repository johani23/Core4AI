import React from "react";

function YourCircle({ points }) {
  // Ã˜Â§Ã™â€žÃ™â€ Ã™â€šÃ˜Â·Ã˜Â© Ã˜ÂªÃ˜ÂªÃ˜Â­Ã˜Â±Ã™Æ’ Ã™â€žÃ™â€žÃ˜Â¯Ã˜Â§Ã˜Â®Ã™â€ž Ã˜Â­Ã˜Â³Ã˜Â¨ Ã˜Â§Ã™â€žÃ™â€ Ã™â€šÃ˜Â§Ã˜Â·
  const progress = Math.min(points, 100); // Ã˜Â§Ã™â€žÃ˜Â­Ã˜Â¯ Ã˜Â§Ã™â€žÃ˜Â£Ã™â€šÃ˜ÂµÃ™â€° 100

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-8 w-full max-w-2xl text-center">
      <h2 className="text-2xl font-bold mb-4">Ã¢Â­â€¢ Your Circle</h2>
      <p className="text-gray-600 mb-6">
        The more you interact, the closer you get to your circle.
      </p>

      <div className="relative flex items-center justify-center">
        {/* Ã˜Â§Ã™â€žÃ˜Â¯Ã˜Â§Ã˜Â¦Ã˜Â±Ã˜Â© */}
        <div className="w-48 h-48 rounded-full border-4 border-blue-300 flex items-center justify-center">
          <span className="text-sm text-gray-500">Your Circle</span>
        </div>

        {/* Ã˜Â§Ã™â€žÃ™â€ Ã™â€šÃ˜Â·Ã˜Â© (Ã˜ÂªÃ™â€šÃ˜ÂªÃ˜Â±Ã˜Â¨ Ã™â€¦Ã˜Â¹ Ã˜Â§Ã™â€žÃ™â€ Ã™â€šÃ˜Â§Ã˜Â·) */}
        <div
          className="absolute bg-blue-600 rounded-full"
          style={{
            width: "20px",
            height: "20px",
            bottom: `${50 - progress / 2}%`,
            left: `${progress}%`,
            transition: "all 0.5s ease",
          }}
        ></div>
      </div>
    </div>
  );
}

export default YourCircle;

