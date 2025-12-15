// badgeStore.js

export function getBadge(points) {
  if (points >= 500) {
    return { icon: "ðŸ‘‘", label: "Core4 Icon" };
  } else if (points >= 200) {
    return { icon: "ðŸš€", label: "Trend Setter" };
  } else if (points >= 50) {
    return { icon: "â­", label: "Rising Star" };
  } else {
    return { icon: "âœ¨", label: "Newbie" };
  }
}
