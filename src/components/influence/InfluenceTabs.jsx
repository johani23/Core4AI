import { NavLink } from "react-router-dom";

export default function InfluenceTabs() {
  const tabs = [
    { label: "الرئيسية", to: "/influence/home" },
    { label: "تحليلات", to: "/influence/analytics" },
    { label: "العروض", to: "/influence/deals" },
    { label: "المهام", to: "/influence/missions" },
    { label: "المتجر", to: "/influence/shop" },
    { label: "المحفظة", to: "/influence/wallet" },
    { label: "الترتيب", to: "/influence/leaderboard" },
  ];

  return (
    <div className="flex gap-4 px-8 py-4 text-white text-sm" dir="rtl">
      {tabs.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg ${
              isActive ? "bg-purple-600 text-white" : "bg-white/10 text-gray-300"
            }`
          }
        >
          {t.label}
        </NavLink>
      ))}
    </div>
  );
}
