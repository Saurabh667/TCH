import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Search, RefreshCw } from "lucide-react";
import { getParticipants, updateRegistrationStatus } from "../../services/events";

const getList = (data) =>
  Array.isArray(data) ? data :
  Array.isArray(data?.results) ? data.results :
  Array.isArray(data?.participants) ? data.participants : [];

export default function Participants() {
  const { eventId } = useParams();
  const [participants, setParticipants] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getParticipants(eventId);
      setParticipants(getList(data));
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to load participants.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [eventId]);

  const changeStatus = async (registrationId, status) => {
    setUpdating(registrationId);
    try {
      await updateRegistrationStatus(registrationId, { status });
      await load();
    } catch (err) {
      alert(err.response?.data?.detail || "Unable to update registration status.");
    } finally {
      setUpdating(null);
    }
  };

  const filtered = participants.filter((person) => {
    const user = person.user || person.member || {};
    const name = person.full_name || person.name || user.full_name || user.name || "";
    const email = person.email || user.email || "";
    return `${name} ${email}`.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <Link to={`/dashboard/events/${eventId}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-cyan-600">
        <ArrowLeft size={17} /> Back to Event
      </Link>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-cyan-600">TCH / Events / Participants</p>
          <h1 className="mt-2 text-3xl font-extrabold">Participants</h1>
          <p className="mt-2 text-sm text-slate-500">View and manage event registrations.</p>
        </div>
        <button onClick={load} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold dark:border-slate-700">
          <RefreshCw size={17} /> Refresh
        </button>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-[#0B1220]">
        <Search size={18} className="text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or email..." className="w-full bg-transparent py-4 text-sm outline-none" />
      </div>

      {error && <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">{error}</div>}

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0B1220]">
        <table className="w-full min-w-[750px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-900">
            <tr>
              <th className="px-5 py-4">Participant</th>
              <th className="px-5 py-4">Department</th>
              <th className="px-5 py-4">Registration Date</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {loading ? (
              <tr><td colSpan="5" className="p-8 text-center text-slate-500">Loading participants...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan="5" className="p-8 text-center text-slate-500">No participants found.</td></tr>
            ) : filtered.map((person) => {
              const user = person.user || person.member || {};
              const id = person.registration_id || person.id;
              const name = person.full_name || person.name || user.full_name || user.name || "Member";
              const email = person.email || user.email || "—";
              const status = person.status || "pending";

              return (
                <tr key={id || email}>
                  <td className="px-5 py-4">
                    <p className="font-semibold">{name}</p>
                    <p className="mt-1 text-xs text-slate-500">{email}</p>
                  </td>
                  <td className="px-5 py-4 text-slate-500">{person.department || user.department || "—"}</td>
                  <td className="px-5 py-4 text-slate-500">
                    {person.created_at ? new Date(person.created_at).toLocaleDateString("en-IN") : "—"}
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold capitalize text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">{status}</span>
                  </td>
                  <td className="px-5 py-4">
                    {id ? (
                      <select
                        value={status}
                        disabled={updating === id}
                        onChange={(e) => changeStatus(id, e.target.value)}
                        className="rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs dark:border-slate-700 dark:bg-slate-900"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    ) : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
