import React, { useEffect, useState } from "react";
import logo from "./assets/core4ai-logo.png"; // Ã˜Â¶Ã˜Â¹ Ã˜Â§Ã™â€žÃ˜Â´Ã˜Â¹Ã˜Â§Ã˜Â± Ã™â€¡Ã™â€ Ã˜Â§ Ã˜Â¯Ã˜Â§Ã˜Â®Ã™â€ž Ã™â€¦Ã˜Â¬Ã™â€žÃ˜Â¯ assets

export default function SplashScreen({ onFinish }) {
  const taglines = [
    "4 Roles Ã¢â‚¬Â¢ 1 Team Ã¢â‚¬Â¢ Endless Challenges",
    "Stronger Together Ã¢â‚¬Â¢ Smarter With AI",
    "Compete Ã¢â‚¬Â¢ Collaborate Ã¢â‚¬Â¢ Win as One",
    "Your Core Team Ã¢â‚¬Â¢ Powered by AI"
  ];

  const [tagline, setTagline] = useState("");

  useEffect(() => {
    const randomTagline = taglines[Math.floor(Math.random() * taglines.length)];
    setTagline(randomTagline);

    const timer = setTimeout(() => {
      onFinish();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-screen">
      <img src={logo} alt="Core4.AI Logo" className="splash-logo-img" />
      <p className="splash-tagline">{tagline}</p>
    </div>
  );
}

