import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search, Plus, CalendarDays, MapPin,
  Pencil, Trash2, Eye, RefreshCw
} from "lucide-react";
import { getEvents, deleteEvent } from "../../services/events";

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const loadEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getEvents();
      const data = response.data;
      setEvents(
        Array.isArray(data) ? data :
        Array.isArray(data?.results) ? data.results :
        Array.isArray(data?.events) ? data.events : []
      );
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await deleteEvent(id);
      await loadEvents();
    } catch (err) {
      alert(err.response?.data?.detail || "Could not delete event.");
    }
  };

  const filtered = events.filter((event) => {
    const title = (event.title || event.name || "").toLowerCase();
    const matchesSearch = title.includes(search.toLowerCase());
    const eventStatus = (event.status || "unknown").toLowerCase();
    const matchesStatus = status === "all" || eventStatus === status;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visibleEvents = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
            TCH / Events
          </p>
          <h1 className="mt-2 text-3xl font-extrabold">Manage Events</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Create, view and manage all club events.
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={loadEvents} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
            <RefreshCw size={18} />
          </button>
          <Link to="/dashboard/events/create" className="flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 font-bold text-white hover:bg-cyan-700">
            <Plus size={18} /> Create Event
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-[#0B1220]">
          <Search size={19} className="text-slate-400" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search events..."
            className="w-full bg-transparent py-4 text-sm outline-none"
          />
        </div>
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none dark:border-slate-800 dark:bg-[#0B1220]"
        >
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {error && <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">{error}</div>}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0B1220]">
        <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
          <h2 className="font-bold">All Events</h2>
          <span className="text-sm text-slate-500">{filtered.length} events</span>
        </div>

        {loading ? (
          <p className="p-8 text-center text-slate-500">Loading events...</p>
        ) : visibleEvents.length === 0 ? (
          <div className="p-12 text-center">
            <CalendarDays size={38} className="mx-auto text-slate-300" />
            <h3 className="mt-4 font-bold">No events found</h3>
            <p className="mt-2 text-sm text-slate-500">Try changing your search or create an event.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-900">
                <tr>
                  <th className="px-5 py-4">Event</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Venue</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {visibleEvents.map((event) => {
                  const id = event.id ?? event.pk;
                  const eventDate = event.start_date || event.event_date || event.date;
                  const eventStatus = event.status || "Unknown";

                  return (
                    <tr key={id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                      <td className="px-5 py-4 font-semibold">{event.title || event.name || "Untitled"}</td>
                      <td className="px-5 py-4 text-slate-500">{eventDate ? new Date(eventDate).toLocaleDateString("en-IN") : "—"}</td>
                      <td className="px-5 py-4 text-slate-500">{event.venue || event.location || "—"}</td>
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold capitalize text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">{eventStatus}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-3">
                          {id && <Link title="View" to={`/dashboard/events/${id}`} className="text-slate-500 hover:text-cyan-600"><Eye size={18} /></Link>}
                          {id && <Link title="Edit" to={`/dashboard/events/${id}/edit`} className="text-slate-500 hover:text-cyan-600"><Pencil size={18} /></Link>}
                          {id && <button title="Delete" onClick={() => handleDelete(id)} className="text-slate-500 hover:text-red-500"><Trash2 size={18} /></button>}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-200 p-4 dark:border-slate-800">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40 dark:border-slate-700">Previous</button>
            <span className="text-sm text-slate-500">Page {page} of {totalPages}</span>
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40 dark:border-slate-700">Next</button>
          </div>
        )}
      </div>
    </div>
  );
}
