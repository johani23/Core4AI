import React from "react";

export default function MerchantTopbar() {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold text-gray-800">
        Core4AI Merchant Suite
      </h1>

      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Welcome, Merchant</span>
        <img
          src="https://ui-avatars.com/api/?name=M"
          alt="Avatar"
          className="w-10 h-10 rounded-full border"
        />
      </div>
    </header>
  );
}
