import React from "react";

const ShareButtons = ({ link }) => {
  const copyLink = () => {
    navigator.clipboard.writeText(link);
    alert("Link copied!");
  };

  return (
    <div className="flex gap-2 mt-2">
      <button 
        onClick={copyLink} 
        className="px-3 py-1 bg-blue-500 text-white rounded-md"
      >
        Copy Link
      </button>
      <button className="px-3 py-1 bg-pink-500 text-white rounded-md">Instagram</button>
      <button className="px-3 py-1 bg-black text-white rounded-md">TikTok</button>
      <button className="px-3 py-1 bg-sky-500 text-white rounded-md">Twitter</button>
    </div>
  );
};

export default ShareButtons;

