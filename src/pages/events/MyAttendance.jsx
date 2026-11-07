import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, ClipboardCheck, RefreshCw } from "lucide-react";
import { getMyAttendance } from "../../services/events";

const getList = (data) =>
  Array.isArray(data) ? data :
  Array.isArray(data?.results) ? data.results :
  Array.isArray(data?.attendance) ? data.attendance : [];

export default function MyAttendance() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getMyAttendance();
      setItems(getList(data));
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to load attendance.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const present = items.filter((item) =>
    ["present", "attended"].includes((item.status || "").toLowerCase())
  ).length;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 dark:bg-[#080F1C] dark:text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-cyan-600">TCH / My Activities</p>
            <h1 className="mt-2 text-3xl font-extrabold">My Attendance</h1>
            <p className="mt-2 text-sm text-slate-500">Your event attendance history.</p>
          </div>
          <button onClick={load} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700"><RefreshCw size={18} /></button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0B1220]">
            <p className="text-sm text-slate-500">Total attendance records</p>
            <p className="mt-2 text-3xl font-extrabold">{loading ? "..." : items.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0B1220]">
            <p className="text-sm text-slate-500">Marked present</p>
            <p className="mt-2 text-3xl font-extrabold text-emerald-600">{loading ? "..." : present}</p>
          </div>
        </div>

        {error && <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">{error}</p>}

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0B1220]">
          <table className="w-full min-w-[550px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-900">
              <tr><th className="px-5 py-4">Event</th><th className="px-5 py-4">Date</th><th className="px-5 py-4">Attendance</th><th className="px-5 py-4">Details</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr><td colSpan="4" className="p-8 text-center text-slate-500">Loading...</td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan="4" className="p-8 text-center text-slate-500">No attendance records found.</td></tr>
              ) : items.map((item, index) => {
                const event = item.event || item;
                const id = event.id || event.event_id;
                const status = item.status || "Not marked";
                const date = event.start_date || event.event_date || item.date;

                return (
                  <tr key={item.id || index}>
                    <td className="px-5 py-4 font-semibold">{event.title || event.name || "Event"}</td>
                    <td className="px-5 py-4 text-slate-500">{date ? new Date(date).toLocaleDateString("en-IN") : "—"}</td>
                    <td className="px-5 py-4"><span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold capitalize text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">{status}</span></td>
                    <td className="px-5 py-4">{id ? <Link to={`/events/${id}`} className="font-semibold text-cyan-600">View Event</Link> : "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
