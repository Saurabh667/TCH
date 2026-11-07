import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, MapPin, RefreshCw } from "lucide-react";
import { getMyRegistrations } from "../../services/events";

const getList = (data) =>
  Array.isArray(data) ? data :
  Array.isArray(data?.results) ? data.results :
  Array.isArray(data?.registrations) ? data.registrations : [];

export default function MyRegistrations() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getMyRegistrations();
      setItems(getList(data));
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to load registrations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 dark:bg-[#080F1C] dark:text-white">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-cyan-600">TCH / My Activities</p>
            <h1 className="mt-2 text-3xl font-extrabold">My Registrations</h1>
            <p className="mt-2 text-sm text-slate-500">Events you have registered for.</p>
          </div>
          <button onClick={load} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
            <RefreshCw size={18} />
          </button>
        </div>

        {error && <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">{error}</p>}

        {loading ? (
          <p className="py-12 text-center text-slate-500">Loading registrations...</p>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-700">
            <CalendarDays size={38} className="mx-auto text-slate-400" />
            <h2 className="mt-4 text-lg font-bold">No registrations yet</h2>
            <p className="mt-2 text-sm text-slate-500">Explore events and register for something exciting.</p>
            <Link to="/events" className="mt-5 inline-flex rounded-xl bg-cyan-600 px-5 py-3 text-sm font-bold text-white">Explore Events</Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => {
              const event = item.event || item;
              const id = event.id || event.event_id || item.event_id;
              const date = event.start_date || event.event_date || event.date;

              return (
                <article key={item.id || id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0B1220]">
                  {event.banner && <img src={event.banner} alt={event.title || "Event"} className="h-44 w-full object-cover" />}
                  <div className="space-y-3 p-5">
                    <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold capitalize text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">{item.status || "Registered"}</span>
                    <h2 className="text-lg font-bold">{event.title || event.name || "Event"}</h2>
                    <p className="flex items-center gap-2 text-sm text-slate-500"><CalendarDays size={16} /> {date ? new Date(date).toLocaleString("en-IN") : "Date not provided"}</p>
                    <p className="flex items-center gap-2 text-sm text-slate-500"><MapPin size={16} /> {event.venue || event.location || "Venue not provided"}</p>
                    {id && <Link to={`/events/${id}`} className="inline-flex pt-2 text-sm font-bold text-cyan-600">View Event →</Link>}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
