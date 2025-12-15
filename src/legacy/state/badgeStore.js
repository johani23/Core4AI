// badgeStore.js

export function getBadge(points) {
  if (points >= 500) {
    return { icon: "Ã°Å¸â€˜â€˜", label: "Core4 Icon" };
  } else if (points >= 200) {
    return { icon: "Ã°Å¸Å¡â‚¬", label: "Trend Setter" };
  } else if (points >= 50) {
    return { icon: "Ã¢Â­Â", label: "Rising Star" };
  } else {
    return { icon: "Ã¢Å“Â¨", label: "Newbie" };
  }
}

