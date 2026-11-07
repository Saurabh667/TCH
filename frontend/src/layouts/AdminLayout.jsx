
import { useEffect, useState } from "react";
import {
  NavLink,
  Navigate,
  Outlet,
  Link,
} from "react-router-dom";

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

import { getEvents } from "../services/events";

function getStoredUser() {
  try {
    const stored =
      localStorage.getItem("user") ||
      sessionStorage.getItem("user");

    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [defaultEventId, setDefaultEventId] = useState(null);
  const [eventsLoading, setEventsLoading] = useState(true);

  const user = getStoredUser();
  const role = user?.role;

  useEffect(() => {
    let cancelled = false;

    const fetchDefaultEvent = async () => {
      try {
        const response = await getEvents();
        const data = response.data;

        const events = Array.isArray(data)
          ? data
          : data?.results || data?.events || [];

        if (!cancelled && events.length > 0) {
          setDefaultEventId(events[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        if (!cancelled) {
          setEventsLoading(false);
        }
      }
    };

    fetchDefaultEvent();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!["admin", "core_team"].includes(role)) {
    return <Navigate to="/" replace />;
  }

  const eventPath = (section) =>
    defaultEventId
      ? `/dashboard/events/${defaultEventId}/${section}`
      : "/dashboard/events/manage";

  // Each sidebar option appears only once.
  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard/events",
      icon: LayoutDashboard,
      end: true,
    },
    {
      label: "Manage Events",
      path: "/dashboard/events/manage",
      icon: CalendarDays,
    },
    {
      label: "Participants",
      path: eventPath("participants"),
      icon: Users,
      requiresEvent: true,
    },
    {
      label: "Organizers",
      path: eventPath("organizers"),
      icon: UserRoundCog,
      requiresEvent: true,
    },
    {
      label: "Attendance",
      path: eventPath("attendance"),
      icon: ClipboardCheck,
      requiresEvent: true,
    },
    {
      label: "Gallery",
      path: eventPath("gallery"),
      icon: Images,
      requiresEvent: true,
    },
    {
      label: "Analytics",
      path: "/dashboard/events/analytics",
      icon: ChartNoAxesCombined,
    },
  ];

  const sidebar = (
    <>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            TCH <span className="text-cyan-600">Dashboard</span>
          </h2>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Event Management
          </p>
        </div>

        <button
          onClick={() => setMobileOpen(false)}
          className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 space-y-1 p-4">
        <p className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-slate-400">
          Event Workspace
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          const disabled =
            item.requiresEvent &&
            (eventsLoading || !defaultEventId);

          return (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.end}
              onClick={() => setMobileOpen(false)}
              aria-disabled={disabled}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                  disabled
                    ? "pointer-events-none opacity-40 text-slate-500"
                    : isActive
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

      {/* Back to Website */}
      <div className="border-t border-slate-200 p-4 dark:border-slate-800">
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
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

      {/* Mobile Header */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#0B1220] lg:hidden">
        <span className="font-extrabold">
          TCH <span className="text-cyan-600">Dashboard</span>
        </span>

        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg border border-slate-200 p-2 dark:border-slate-700"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </div>

      <div className="flex min-h-screen">

        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0B1220] lg:flex">
          {sidebar}
        </aside>

        {/* Mobile Sidebar */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-black/60"
              aria-label="Close menu overlay"
            />

            <aside className="relative flex h-full w-72 flex-col bg-white dark:bg-[#0B1220]">
              {sidebar}
            </aside>
          </div>
        )}

        {/* Page Content */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
