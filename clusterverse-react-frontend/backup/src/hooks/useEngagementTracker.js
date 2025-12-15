/**
 * ðŸ§  Core4.AI â€“ Engagement Tracker Hook
 * ----------------------------------------
 * Automatically logs engagement events (page view, scroll, click).
 * Uses recordEngagement() from api.js
 */

import { useEffect } from "react";
import { recordEngagement } from "@services/api";

export default function useEngagementTracker(page = "unknown") {
  useEffect(() => {
    // log page view
    recordEngagement(`view_${page}`, 1);

    const handleClick = () => recordEngagement(`click_${page}`, 0.5);
    const handleScroll = () => recordEngagement(`scroll_${page}`, 0.2);

    window.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);
}
