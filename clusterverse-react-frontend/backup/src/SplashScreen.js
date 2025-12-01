import React, { useEffect, useState } from "react";
import logo from "./assets/core4ai-logo.png"; // ضع الشعار هنا داخل مجلد assets

export default function SplashScreen({ onFinish }) {
  const taglines = [
    "4 Roles • 1 Team • Endless Challenges",
    "Stronger Together • Smarter With AI",
    "Compete • Collaborate • Win as One",
    "Your Core Team • Powered by AI"
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
