import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { createEvent } from "../../services/events";

const initialForm = {
  title: "",
  description: "",
  category: "",
  start_date: "",
  end_date: "",
  venue: "",
  capacity: "",
  status: "draft",
};

export default function CreateEvent() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createEvent({
        ...form,
        capacity: form.capacity ? Number(form.capacity) : null,
      });
      navigate("/dashboard/events/manage");
    } catch (err) {
      const data = err.response?.data;
      setError(
        data?.detail ||
        (data ? JSON.stringify(data) : "Unable to create event.")
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900";

  return (
    <div className="mx-auto max-w-4xl space-y-7">
      <Link to="/dashboard/events/manage" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-cyan-600">
        <ArrowLeft size={17} /> Back to Events
      </Link>

      <div>
        <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">TCH / Events / Create</p>
        <h1 className="mt-2 text-3xl font-extrabold">Create Event</h1>
        <p className="mt-2 text-sm text-slate-500">Fill in the event details below.</p>
      </div>

      {error && <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 dark:border-slate-800 dark:bg-[#0B1220]">
        <div>
          <label className="mb-2 block text-sm font-semibold">Event Title *</label>
          <input required name="title" value={form.title} onChange={handleChange} placeholder="Enter event title" className={inputClass} />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">Description *</label>
          <textarea required rows={5} name="description" value={form.description} onChange={handleChange} placeholder="Describe your event..." className={inputClass} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold">Category</label>
            <input name="category" value={form.category} onChange={handleChange} placeholder="Workshop, Hackathon..." className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Venue *</label>
            <input required name="venue" value={form.venue} onChange={handleChange} placeholder="Event location" className={inputClass} />
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
            <input type="number" min="1" name="capacity" value={form.capacity} onChange={handleChange} placeholder="Maximum participants" className={inputClass} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end dark:border-slate-800">
          <Link to="/dashboard/events/manage" className="rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-semibold dark:border-slate-700">Cancel</Link>
          <button disabled={loading} type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 text-sm font-bold text-white hover:bg-cyan-700 disabled:opacity-60">
            <Save size={17} /> {loading ? "Creating..." : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
}
