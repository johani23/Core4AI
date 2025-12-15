import React from "react";

function YourCircle({ points }) {
  // Ø§Ù„Ù†Ù‚Ø·Ø© ØªØªØ­Ø±Ùƒ Ù„Ù„Ø¯Ø§Ø®Ù„ Ø­Ø³Ø¨ Ø§Ù„Ù†Ù‚Ø§Ø·
  const progress = Math.min(points, 100); // Ø§Ù„Ø­Ø¯ Ø§Ù„Ø£Ù‚ØµÙ‰ 100

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-8 w-full max-w-2xl text-center">
      <h2 className="text-2xl font-bold mb-4">â­• Your Circle</h2>
      <p className="text-gray-600 mb-6">
        The more you interact, the closer you get to your circle.
      </p>

      <div className="relative flex items-center justify-center">
        {/* Ø§Ù„Ø¯Ø§Ø¦Ø±Ø© */}
        <div className="w-48 h-48 rounded-full border-4 border-blue-300 flex items-center justify-center">
          <span className="text-sm text-gray-500">Your Circle</span>
        </div>

        {/* Ø§Ù„Ù†Ù‚Ø·Ø© (ØªÙ‚ØªØ±Ø¨ Ù…Ø¹ Ø§Ù„Ù†Ù‚Ø§Ø·) */}
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
