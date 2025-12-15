// ============================================================
// ðŸ’Ž Core4.AI â€“ Navbar.jsx (MVP-27: Market Pulse Integration)
// ============================================================

import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const base =
    "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200";
  const active =
    "bg-gradient-to-r from-yellow-500/80 to-yellow-400 text-black shadow-lg";
  const idle =
    "text-zinc-300 hover:text-yellow-400 hover:bg-zinc-800/60";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-yellow-500/20">
      <div className="flex items-center justify-between px-4 md:px-8 py-2">
        {/* ðŸ§  Brand */}
        <div className="font-bold text-lg tracking-wide text-white">
          Core4.<span className="text-yellow-400">AI</span>
        </div>

        {/* ðŸ§­ Navigation Links */}
        <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
          <NavLink
            to="/feed"
            className={({ isActive }) =>
              `${base} ${isActive ? active : idle}`
            }
          >
            ðŸ’¬ Feed
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${base} ${isActive ? active : idle}`
            }
          >
            ðŸ“Š Dashboard
          </NavLink>

          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              `${base} ${isActive ? active : idle}`
            }
          >
            ðŸ… Leaderboard
          </NavLink>

          <NavLink
            to="/groups"
            className={({ isActive }) =>
              `${base} ${isActive ? active : idle}`
            }
          >
            ðŸ‘¥ Groups
          </NavLink>

          <NavLink
            to="/challenges"
            className={({ isActive }) =>
              `${base} ${isActive ? active : idle}`
            }
          >
            ðŸ”¥ Challenges
          </NavLink>

          <NavLink
            to="/rewards"
            className={({ isActive }) =>
              `${base} ${isActive ? active : idle}`
            }
          >
            ðŸŽ Rewards
          </NavLink>

          <NavLink
            to="/spotlight"
            className={({ isActive }) =>
              `${base} ${isActive ? active : idle}`
            }
          >
            âœ¨ Spotlight
          </NavLink>

          <NavLink
            to="/clusterboard"
            className={({ isActive }) =>
              `${base} ${isActive ? active : idle}`
            }
          >
            ðŸŒ ClusterBoard
          </NavLink>

          <NavLink
            to="/wallet"
            className={({ isActive }) =>
              `${base} ${isActive ? active : idle}`
            }
          >
            ðŸ’° Wallet
          </NavLink>

          <NavLink
            to="/market"
            className={({ isActive }) =>
              `${base} ${isActive ? active : idle}`
            }
          >
            ðŸª™ Market
          </NavLink>

          {/* ðŸ’¹ NEW â€“ Market Pulse */}
          <NavLink
            to="/market/pulse"
            className={({ isActive }) =>
              `${base} ${isActive ? active : idle}`
            }
          >
            ðŸ’¹ Market Pulse
          </NavLink>

          {/* ðŸ† NEW â€“ Tribe Leaderboard */}
          <NavLink
            to="/tribes/leaderboard"
            className={({ isActive }) =>
              `${base} ${isActive ? active : idle}`
            }
          >
            ðŸ† Tribe Leaders
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
