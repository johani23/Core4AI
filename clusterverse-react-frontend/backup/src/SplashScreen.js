import React, { useEffect, useState } from "react";
import logo from "./assets/core4ai-logo.png"; // Ø¶Ø¹ Ø§Ù„Ø´Ø¹Ø§Ø± Ù‡Ù†Ø§ Ø¯Ø§Ø®Ù„ Ù…Ø¬Ù„Ø¯ assets

export default function SplashScreen({ onFinish }) {
  const taglines = [
    "4 Roles â€¢ 1 Team â€¢ Endless Challenges",
    "Stronger Together â€¢ Smarter With AI",
    "Compete â€¢ Collaborate â€¢ Win as One",
    "Your Core Team â€¢ Powered by AI"
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
