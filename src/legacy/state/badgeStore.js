// badgeStore.js

export function getBadge(points) {
  if (points >= 500) {
    return { icon: "👑", label: "Core4 Icon" };
  } else if (points >= 200) {
    return { icon: "🚀", label: "Trend Setter" };
  } else if (points >= 50) {
    return { icon: "⭐", label: "Rising Star" };
  } else {
    return { icon: "✨", label: "Newbie" };
  }
}
