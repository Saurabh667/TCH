import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { getEventById, updateEvent } from "../../services/events";

const emptyForm = {
  title: "",
  description: "",
  category: "",
  start_date: "",
  end_date: "",
  venue: "",
  capacity: "",
  status: "draft",
};

const toLocalDateTime = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000)
    .toISOString()
    .slice(0, 16);
};

export default function EditEvent() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const { data } = await getEventById(eventId);
        setForm({
          title: data.title || "",
          description: data.description || "",
          category: data.category || "",
          start_date: toLocalDateTime(data.start_date || data.event_date),
          end_date: toLocalDateTime(data.end_date),
          venue: data.venue || data.location || "",
          capacity: data.capacity ?? "",
          status: data.status || "draft",
        });
      } catch (err) {
        setError(err.response?.data?.detail || "Unable to load event.");
      } finally {
        setLoading(false);
      }
    };
    loadEvent();
  }, [eventId]);

  const handleChange = (e) =>
    setForm((current) => ({ ...current, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await updateEvent(eventId, {
        ...form,
        capacity: form.capacity === "" ? null : Number(form.capacity),
      });
      navigate(`/dashboard/events/${eventId}`);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        (err.response?.data ? JSON.stringify(err.response.data) : "Unable to update event.")
      );
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900";

  if (loading) return <p className="p-8 text-slate-500">Loading event...</p>;

  return (
    <div className="mx-auto max-w-4xl space-y-7">
      <Link to={`/dashboard/events/${eventId}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-cyan-600">
        <ArrowLeft size={17} /> Back to Event
      </Link>

      <div>
        <p className="text-sm font-semibold text-cyan-600">TCH / Events / Edit</p>
        <h1 className="mt-2 text-3xl font-extrabold">Edit Event</h1>
      </div>

      {error && <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 dark:border-slate-800 dark:bg-[#0B1220]">
        <div>
          <label className="mb-2 block text-sm font-semibold">Event Title *</label>
          <input required name="title" value={form.title} onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">Description *</label>
          <textarea required rows={5} name="description" value={form.description} onChange={handleChange} className={inputClass} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold">Category</label>
            <input name="category" value={form.category} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Venue *</label>
            <input required name="venue" value={form.venue} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Start Date *</label>
            <input required type="datetime-local" name="start_date" value={form.start_date} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">End Date</label>
            <input type="datetime-local" name="end_date" value={form.end_date} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Capacity</label>
            <input type="number" min="1" name="capacity" value={form.capacity} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end dark:border-slate-800">
          <Link to={`/dashboard/events/${eventId}`} className="rounded-xl border px-5 py-3 text-center text-sm font-semibold dark:border-slate-700">Cancel</Link>
          <button disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 text-sm font-bold text-white disabled:opacity-60">
            <Save size={17} /> {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
