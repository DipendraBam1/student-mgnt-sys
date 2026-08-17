import { NavLink } from "react-router-dom";

const MENU_ITEMS = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: "⌂",
  },
  {
    label: "Students",
    path: "/students",
    icon: "♙",
  },
  {
    label: "Courses",
    path: "/courses",
    icon: "▣",
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white">
      
       <div className="flex h-20 items-center border-b border-gray-200 px-6">
        <h1 className="bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-2xl font-extrabold text-transparent">
          Academia
        </h1>
      </div>

       <nav className="p-4">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Menu
        </p>

        <div className="space-y-1">
          {MENU_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <span className="text-lg">
                {item.icon}
              </span>

              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

       <div className="absolute bottom-0 w-full border-t border-gray-200 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600">
          <span>↪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}