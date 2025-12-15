import React from "react";

function Card({ children }) {
  return (
    <div className="bg-white p-4 shadow rounded mb-4">{children}</div>
  );
}

export default Card;

