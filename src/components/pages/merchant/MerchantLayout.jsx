export default function MerchantLayout({ children }) {
  const menu = [
    { icon: Squares2X2Icon, label: "Dashboard", to: "/merchant/dashboard" },
    { icon: CubeIcon, label: "Products", to: "/merchant/products" },
    { icon: TagIcon, label: "Pricing", to: "/merchant/pricing" },
    { icon: SparklesIcon, label: "Creative Studio", to: "/merchant/creative" },
    { icon: MegaphoneIcon, label: "Campaigns", to: "/merchant/campaigns" },
    { icon: BanknotesIcon, label: "Earnings", to: "/merchant/earnings" },
    { icon: ChartBarIcon, label: "Analytics", to: "/merchant/analytics" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r shadow-sm p-6 space-y-6">
        <h2 className="text-2xl font-bold text-green-600 mb-2">
          Merchant Hub
        </h2>

        <nav className="space-y-2">
          {menu.map((item, i) => (
            <NavLink
              key={i}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-green-600 text-white shadow"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* CONTENT AREA */}
      <main className="flex-1 p-8">
        
        {/* TOP BAR */}
        <div className="bg-white shadow p-4 mb-6 rounded-xl border">
          <h1 className="text-xl font-bold text-gray-900">Merchant Panel</h1>
        </div>

        {/* CHILDREN (instead of Outlet) */}
        <div className="mt-6">
          {children}
        </div>
      </main>
    </div>
  );
}
