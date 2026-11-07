import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, RefreshCw } from "lucide-react";
import { getOrganizers, addOrganizer, removeOrganizer } from "../../services/events";

const getList = (data) =>
  Array.isArray(data) ? data :
  Array.isArray(data?.results) ? data.results :
  Array.isArray(data?.organizers) ? data.organizers : [];

export default function Organizers() {
  const { eventId } = useParams();
  const [organizers, setOrganizers] = useState([]);
  const [memberId, setMemberId] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getOrganizers(eventId);
      setOrganizers(getList(data));
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to load organizers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [eventId]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!memberId.trim()) return;
    setAdding(true);
    setError("");
    try {
      await addOrganizer(eventId, { member_id: memberId.trim() });
      setMemberId("");
      await load();
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        (err.response?.data ? JSON.stringify(err.response.data) : "Unable to assign organizer.")
      );
    } finally {
      setAdding(false);
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm("Remove this organizer from the event?")) return;
    try {
      await removeOrganizer(id);
      await load();
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to remove organizer.");
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-7">
      <Link to={`/dashboard/events/${eventId}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-cyan-600">
        <ArrowLeft size={17} /> Back to Event
      </Link>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-cyan-600">TCH / Events / Organizers</p>
          <h1 className="mt-2 text-3xl font-extrabold">Organizer Management</h1>
          <p className="mt-2 text-sm text-slate-500">Assign Core Team members to this event.</p>
        </div>
        <button onClick={load} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold dark:border-slate-700">
          <RefreshCw size={17} /> Refresh
        </button>
      </div>

      {error && <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">{error}</div>}

      <form onSubmit={handleAdd} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row dark:border-slate-800 dark:bg-[#0B1220]">
        <input
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          placeholder="Enter Core Team member ID"
          className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none focus:border-cyan-500 dark:border-slate-700"
        />
        <button disabled={adding || !memberId.trim()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-bold text-white disabled:opacity-50">
          <Plus size={18} /> {adding ? "Assigning..." : "Assign Organizer"}
        </button>
      </form>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0B1220]">
        <div className="border-b border-slate-200 p-5 dark:border-slate-800">
          <h2 className="font-bold">Assigned Organizers</h2>
          <p className="mt-1 text-sm text-slate-500">{organizers.length} organizer records</p>
        </div>

        {loading ? (
          <p className="p-8 text-center text-slate-500">Loading organizers...</p>
        ) : organizers.length === 0 ? (
          <p className="p-10 text-center text-sm text-slate-500">No organizers assigned yet.</p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {organizers.map((item) => {
              const user = item.user || item.member || {};
              const id = item.organizer_id || item.id;
              const name = item.full_name || item.name || user.full_name || user.name || "Core Team Member";
              const email = item.email || user.email || "—";

              return (
                <div key={id || email} className="flex items-center justify-between gap-4 p-5">
                  <div>
                    <p className="font-semibold">{name}</p>
                    <p className="mt-1 text-sm text-slate-500">{email}</p>
                  </div>
                  {id && (
                    <button onClick={() => handleRemove(id)} title="Remove organizer" className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30">
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
