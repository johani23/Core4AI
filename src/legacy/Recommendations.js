import React from "react";

function Recommendations({ points }) {
  // Ã˜Â¯Ã˜Â§Ã™â€žÃ˜Â© Ã™â€žÃ˜ÂªÃ™Ë†Ã™â€žÃ™Å Ã˜Â¯ Ã˜Â§Ã™â€žÃ˜ÂªÃ™Ë†Ã˜ÂµÃ™Å Ã˜Â§Ã˜Âª Ã™â€¦Ã˜Â¹ Ã˜Â§Ã™â€žÃ™â€ Ã™â€šÃ˜Â§Ã˜Â· Ã˜Â§Ã™â€žÃ™â€¦Ã˜Â­Ã˜ÂªÃ™â€¦Ã™â€žÃ˜Â©
  const getRecommendations = () => {
    if (points < 20) {
      return {
        text: "Try posting about your daily activities or hobbies to get more involved! You could earn up to 30 points.",
        maxPoints: 30,
      };
    } else if (points < 50) {
      return {
        text: "You're doing great! Try engaging with others' posts or share a photo from a recent event. You might earn up to 50 points.",
        maxPoints: 50,
      };
    } else {
      return {
        text: "Awesome! You're close to your Circle. Share a thoughtful post or a short video on a topic you love, and earn up to 100 points!",
        maxPoints: 100,
      };
    }
  };

  const recommendation = getRecommendations();

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-8 w-full max-w-2xl text-center">
      <h2 className="text-2xl font-bold mb-4">Ã¢Å“Â¨ Recommendations</h2>
      <p className="text-gray-700">
        {recommendation.text}
      </p>
      <p className="text-green-600 mt-4">
        Potential points: {recommendation.maxPoints}
      </p>
    </div>
  );
}

export default Recommendations;

