import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, RefreshCw, Download,
  CalendarDays, Users, ClipboardCheck
} from "lucide-react";
import {
  getEventAnalytics,
  exportAllEventAnalytics,
} from "../../services/events";

const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
};

export default function EventAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getEventAnalytics();
      setAnalytics(data);
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to load analytics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const exportCSV = async () => {
    setExporting(true);
    try {
      const { data } = await exportAllEventAnalytics();
      downloadBlob(data, "tch-event-analytics.csv");
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to export CSV.");
    } finally {
      setExporting(false);
    }
  };

  const metrics = [
    {
      label: "Total Events",
      value: analytics?.total_events,
      icon: CalendarDays,
    },
    {
      label: "Total Registrations",
      value: analytics?.total_registrations,
      icon: Users,
    },
    {
      label: "Total Attendance",
      value: analytics?.total_attendance,
      icon: ClipboardCheck,
    },
  ];

  const extraStats = analytics && typeof analytics === "object"
    ? Object.entries(analytics).filter(([key, value]) =>
        !["total_events", "total_registrations", "total_attendance"].includes(key) &&
        ["string", "number"].includes(typeof value)
      )
    : [];

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <Link to="/dashboard/events" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-cyan-600">
        <ArrowLeft size={17} /> Back to Dashboard
      </Link>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-cyan-600">TCH / Events / Analytics</p>
          <h1 className="mt-2 text-3xl font-extrabold">Event Analytics</h1>
          <p className="mt-2 text-sm text-slate-500">Overview of event performance and engagement.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={load} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
            <RefreshCw size={18} />
          </button>
          <button onClick={exportCSV} disabled={exporting} className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-bold text-white disabled:opacity-50">
            <Download size={17} /> {exporting ? "Exporting..." : "Export CSV"}
          </button>
        </div>
      </div>

      {error && <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">{error}</div>}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#0B1220]">
            <div className="inline-flex rounded-xl bg-cyan-50 p-3 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">
              <Icon size={22} />
            </div>
            <p className="mt-5 text-sm text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-extrabold">
              {loading ? "..." : value ?? "—"}
            </p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#0B1220]">
        <h2 className="text-lg font-bold">Additional Analytics</h2>
        {loading ? (
          <p className="mt-4 text-sm text-slate-500">Loading statistics...</p>
        ) : extraStats.length ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {extraStats.map(([key, value]) => (
              <div key={key} className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-xs capitalize text-slate-500">{key.replaceAll("_", " ")}</p>
                <p className="mt-2 text-xl font-bold">{String(value)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-500">No additional statistics were returned by the API.</p>
        )}
      </section>
    </div>
  );
}
