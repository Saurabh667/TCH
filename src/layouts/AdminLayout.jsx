import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  UserRoundCog,
  ClipboardCheck,
  Images,
  ChartNoAxesCombined,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/dashboard/events", icon: LayoutDashboard, end: true },
  { label: "Manage Events", path: "/dashboard/events/manage", icon: CalendarDays },
  { label: "Participants", path: "/dashboard/events/participants", icon: Users },
  { label: "Organizers", path: "/dashboard/events/organizers", icon: UserRoundCog },
  { label: "Attendance", path: "/dashboard/events/attendance", icon: ClipboardCheck },
  { label: "Gallery", path: "/dashboard/events/gallery", icon: Images },
  { label: "Analytics", path: "/dashboard/events/analytics", icon: ChartNoAxesCombined },
];

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebar = (
    <>
      <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-extrabold">
            TCH <span className="text-cyan-500">Dashboard</span>
          </h2>
          <p className="mt-1 text-xs text-slate-500">Event Management</p>
        </div>
        <button onClick={() => setMobileOpen(false)} className="lg:hidden">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 space-y-1 p-4">
        <p className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-slate-400">
          Event Workspace
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-cyan-50 text-cyan-800 dark:bg-cyan-400/10 dark:text-cyan-300"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`
              }
            >
              <Icon size={19} />
              {item.label}
            </NavLink>
          );
        })}
      </div>

      <div className="border-t border-slate-200 p-4 dark:border-slate-800">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <ArrowLeft size={18} />
          Back to Website
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#070B14] dark:text-white">
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#0B1220] lg:hidden">
        <span className="font-extrabold">
          TCH <span className="text-cyan-500">Dashboard</span>
        </span>
        <button onClick={() => setMobileOpen(true)}>
          <Menu size={21} />
        </button>
      </div>

      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0B1220] lg:flex">
          {sidebar}
        </aside>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-black/60"
              aria-label="Close menu"
            />
            <aside className="relative flex h-full w-72 flex-col bg-white dark:bg-[#0B1220]">
              {sidebar}
            </aside>
          </div>
        )}

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
