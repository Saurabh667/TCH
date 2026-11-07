import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, MapPin, Users } from "lucide-react";
import {
  getEventById,
  registerForEvent,
  cancelEventRegistration,
} from "../../services/events";

export default function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getEventById(eventId);
      setEvent(data);
      setRegistration(data.registration || data.my_registration || null);
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to load event.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [eventId]);

  const handleRegister = async () => {
    setWorking(true);
    setError("");
    setMessage("");
    try {
      const { data } = await registerForEvent(eventId);
      setRegistration(data.registration || data);
      setMessage(data.message || "Registration successful!");
      await load();
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to register for this event.");
    } finally {
      setWorking(false);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel your registration?")) return;
    setWorking(true);
    setError("");
    setMessage("");
    try {
      const { data } = await cancelEventRegistration(eventId);
      setRegistration(null);
      setMessage(data.message || "Registration cancelled.");
      await load();
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to cancel registration.");
    } finally {
      setWorking(false);
    }
  };

  if (loading) return <p className="p-12 text-center text-slate-500">Loading event...</p>;

  if (!event) return (
    <div className="p-12 text-center">
      <p className="font-bold">{error || "Event not found."}</p>
      <Link to="/events" className="mt-4 inline-block text-cyan-600">Back to events</Link>
    </div>
  );

  const date = event.start_date || event.event_date || event.date;
  const title = event.title || event.name || "Event";
  const registered = Boolean(registration);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 dark:bg-[#080F1C] dark:text-white">
      <div className="mx-auto max-w-5xl space-y-7">
        <Link to="/events" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-cyan-600">
          <ArrowLeft size={17} /> Back to Events
        </Link>

        {event.banner && <img src={event.banner} alt={title} className="h-64 w-full rounded-2xl object-cover sm:h-96" />}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-[#0B1220]">
          <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold capitalize text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">{event.status || "Event"}</span>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{title}</h1>
          <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-600 dark:text-slate-300">{event.description || "No description available."}</p>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-900"><CalendarDays className="text-cyan-600" /><div><p className="text-xs text-slate-500">Date</p><p className="mt-1 text-sm font-semibold">{date ? new Date(date).toLocaleString("en-IN") : "Not provided"}</p></div></div>
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-900"><MapPin className="text-cyan-600" /><div><p className="text-xs text-slate-500">Venue</p><p className="mt-1 text-sm font-semibold">{event.venue || event.location || "Not provided"}</p></div></div>
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-900"><Users className="text-cyan-600" /><div><p className="text-xs text-slate-500">Capacity</p><p className="mt-1 text-sm font-semibold">{event.capacity ?? "Not provided"}</p></div></div>
          </div>

          {error && <p className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">{error}</p>}
          {message && <p className="mt-6 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">{message}</p>}

          <div className="mt-8">
            {registered ? (
              <button disabled={working} onClick={handleCancel} className="rounded-xl border border-red-200 px-6 py-3 text-sm font-bold text-red-600 disabled:opacity-50">
                {working ? "Please wait..." : "Cancel Registration"}
              </button>
            ) : (
              <button disabled={working || event.status === "cancelled"} onClick={handleRegister} className="rounded-xl bg-cyan-600 px-6 py-3 text-sm font-bold text-white disabled:opacity-50">
                {working ? "Please wait..." : "Register for Event"}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
