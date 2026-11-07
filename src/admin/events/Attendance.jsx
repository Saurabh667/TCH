import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, RefreshCw, Save } from "lucide-react";
import {
  getEventAttendance,
  updateAttendance,
  bulkUpdateAttendance,
} from "../../services/events";

const getList = (data) =>
  Array.isArray(data) ? data :
  Array.isArray(data?.results) ? data.results :
  Array.isArray(data?.attendance) ? data.attendance : [];

export default function Attendance() {
  const { eventId } = useParams();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getEventAttendance(eventId);
      setRecords(getList(data));
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to load attendance.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [eventId]);

  const changeLocalStatus = (id, status) => {
    setRecords((current) =>
      current.map((item) =>
        (item.registration_id || item.id) === id
          ? { ...item, status }
          : item
      )
    );
  };

  const saveOne = async (record) => {
    const id = record.registration_id || record.id;
    try {
      await updateAttendance(id, { status: record.status });
      await load();
    } catch (err) {
      alert(err.response?.data?.detail || "Unable to update attendance.");
    }
  };

  const saveAll = async () => {
    const entries = records.map((record) => ({
      registration_id: record.registration_id || record.id,
      status: record.status,
    })).filter((record) => record.registration_id);

    if (!entries.length) return;

    setSaving(true);
    try {
      await bulkUpdateAttendance(eventId, { attendance: entries });
      await load();
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Bulk attendance failed. Please confirm the payload format with the backend team."
      );
    } finally {
      setSaving(false);
    }
  };

  const presentCount = records.filter((item) =>
    ["present", "attended"].includes((item.status || "").toLowerCase())
  ).length;

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <Link to={`/dashboard/events/${eventId}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-cyan-600">
        <ArrowLeft size={17} /> Back to Event
      </Link>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-cyan-600">TCH / Events / Attendance</p>
          <h1 className="mt-2 text-3xl font-extrabold">Attendance Management</h1>
          <p className="mt-2 text-sm text-slate-500">Track attendance for registered participants.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={load} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
            <RefreshCw size={18} />
          </button>
          <button disabled={saving || loading || !records.length} onClick={saveAll} className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-bold text-white disabled:opacity-50">
            <Save size={17} /> {saving ? "Saving..." : "Save All"}
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0B1220]">
          <p className="text-sm text-slate-500">Total records</p>
          <p className="mt-2 text-3xl font-extrabold">{records.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0B1220]">
          <p className="text-sm text-slate-500">Marked present</p>
          <p className="mt-2 text-3xl font-extrabold text-emerald-600">{presentCount}</p>
        </div>
      </div>

      {error && <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">{error}</div>}

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0B1220]">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-900">
            <tr>
              <th className="px-5 py-4">Participant</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Attendance</th>
              <th className="px-5 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {loading ? (
              <tr><td colSpan="4" className="p-8 text-center text-slate-500">Loading attendance...</td></tr>
            ) : records.length === 0 ? (
              <tr><td colSpan="4" className="p-8 text-center text-slate-500">No attendance records found.</td></tr>
            ) : records.map((record) => {
              const id = record.registration_id || record.id;
              const user = record.user || record.member || {};
              const name = record.full_name || record.name || user.full_name || user.name || "Member";
              const email = record.email || user.email || "—";

              return (
                <tr key={id || email}>
                  <td className="px-5 py-4 font-semibold">{name}</td>
                  <td className="px-5 py-4 text-slate-500">{email}</td>
                  <td className="px-5 py-4">
                    <select
                      value={record.status || "absent"}
                      onChange={(e) => changeLocalStatus(id, e.target.value)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                    >
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                    </select>
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => saveOne(record)} className="rounded-lg bg-cyan-50 px-3 py-2 text-xs font-bold text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">
                      Save
                    </button>
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
