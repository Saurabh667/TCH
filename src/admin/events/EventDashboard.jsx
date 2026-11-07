import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Users,
  ClipboardCheck,
  Plus,
  RefreshCw,
  ArrowUpRight,
} from "lucide-react";
import { getEvents, getEventAnalytics } from "../../services/events";

const getList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.events)) return data.events;
  return [];
};

const getMetric = (data, keys) => {
  for (const key of keys) {
    if (data?.[key] != null) return data[key];
  }
  return null;
};

const formatDate = (value) => {
  if (!value) return "Date not available";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Date not available"
    : date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
};

export default function EventDashboard() {
  const [events, setEvents] = useState([]);
  const [eventCount, setEventCount] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    setLoading(true);
    setError("");

    const [eventResult, analyticsResult] = await Promise.allSettled([
      getEvents(),
      getEventAnalytics(),
    ]);

    if (eventResult.status === "fulfilled") {
      const data = eventResult.value.data;
      const list = getList(data);
      setEvents(list);
      setEventCount(
        typeof data?.count === "number" ? data.count : list.length
      );
    } else {
      setError(
        eventResult.reason?.response?.data?.detail ||
        "Unable to load events."
      );
    }

    if (analyticsResult.status === "fulfilled") {
      setAnalytics(analyticsResult.value.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const stats = [
    {
      label: "Total Events",
      value: eventCount,
      icon: CalendarDays,
    },
    {
      label: "Registrations",
      value: getMetric(analytics, [
        "total_registrations",
        "registrations_count",
        "registration_count",
      ]),
      icon: Users,
    },
    {
      label: "Attendance",
      value: getMetric(analytics, [
        "total_attendance",
        "attendance_count",
        "present_count",
      ]),
      icon: ClipboardCheck,
    },
  ];

  const upcomingEvents = events
    .filter((event) => {
      const date = new Date(
        event.start_date || event.event_date || event.date
      );
      return !Number.isNaN(date.getTime()) && date >= new Date();
    })
    .sort((a, b) =>
      new Date(a.start_date || a.event_date || a.date) -
      new Date(b.start_date || b.event_date || b.date)
    )
    .slice(0, 5);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
            TCH / Event Management
          </p>
          <h1 className="mt-2 text-3xl font-extrabold">
            Event Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage events, registrations and attendance.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={loadDashboard}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold dark:border-slate-700 dark:bg-slate-900"
          >
            <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>

          <Link
            to="/dashboard/events/create"
            className="flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-bold text-white hover:bg-cyan-700"
          >
            <Plus size={18} />
            Create Event
          </Link>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#0B1220]"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-cyan-50 p-3 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">
                  <Icon size={22} />
                </div>
                <ArrowUpRight size={18} className="text-slate-400" />
              </div>
              <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
              <h2 className="mt-1 text-3xl font-extrabold">
                {loading ? "..." : stat.value ?? "—"}
              </h2>
            </div>
          );
        })}
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0B1220]">
        <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold">Upcoming Events</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Your next scheduled TCH events.
            </p>
          </div>
          <Link
            to="/dashboard/events/manage"
            className="text-sm font-bold text-cyan-600 dark:text-cyan-400"
          >
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="p-6 text-sm text-slate-500">Loading events...</div>
        ) : upcomingEvents.length ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {upcomingEvents.map((event) => {
              const id = event.id ?? event.pk;
              return (
                <div
                  key={id ?? event.title}
                  className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center"
                >
                  <div>
                    <h3 className="font-bold">
                      {event.title || event.name || "Untitled Event"}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {formatDate(
                        event.start_date || event.event_date || event.date
                      )}
                      {event.venue || event.location
                        ? ` · ${event.venue || event.location}`
                        : ""}
                    </p>
                  </div>
                  {id && (
                    <Link
                      to={`/dashboard/events/${id}`}
                      className="text-sm font-semibold text-cyan-600 dark:text-cyan-400"
                    >
                      View details →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center">
            <CalendarDays size={38} className="mx-auto text-slate-300" />
            <h3 className="mt-4 font-bold">No upcoming events</h3>
            <p className="mt-2 text-sm text-slate-500">
              Create an event to get started.
            </p>
            <Link
              to="/dashboard/events/create"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-bold text-white"
            >
              <Plus size={17} /> Create Event
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
