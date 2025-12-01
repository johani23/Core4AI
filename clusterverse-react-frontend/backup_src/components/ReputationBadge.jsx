import React from "react";
import { getBadge } from "../state/badgeStore";

function ReputationBadge({ points }) {
  const badge = getBadge(points);

  return (
    <span className="inline-flex items-center px-2 py-1 text-sm font-medium bg-gray-100 rounded-full shadow-sm">
      <span className="mr-1">{badge.icon}</span>
      {badge.label}
    </span>
  );
}

export default ReputationBadge;
