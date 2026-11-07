import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft, Pencil, CalendarDays, MapPin,
  Users, Clock, Image as ImageIcon
} from "lucide-react";
import { getEventById, getParticipants, getOrganizers } from "../../services/events";

const listFrom = (data) =>
  Array.isArray(data) ? data :
  Array.isArray(data?.results) ? data.results :
  Array.isArray(data?.participants) ? data.participants :
  Array.isArray(data?.organizers) ? data.organizers : [];

export default function EventOverview() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const results = await Promise.allSettled([
        getEventById(eventId),
        getParticipants(eventId),
        getOrganizers(eventId),
      ]);

      if (results[0].status === "fulfilled") {
        setEvent(results[0].value.data);
      } else {
        setError(results[0].reason?.response?.data?.detail || "Unable to load event.");
      }

      if (results[1].status === "fulfilled") {
        setParticipants(listFrom(results[1].value.data));
      }
      if (results[2].status === "fulfilled") {
        setOrganizers(listFrom(results[2].value.data));
      }
      setLoading(false);
    };
    load();
  }, [eventId]);

  if (loading) return <p className="p-8 text-slate-500">Loading event details...</p>;
  if (error || !event) return <div className="rounded-xl bg-red-50 p-5 text-red-700">{error || "Event not found."}</div>;

  const date = event.start_date || event.event_date || event.date;
  const title = event.title || event.name || "Untitled Event";

  const details = [
    { label: "Date", value: date ? new Date(date).toLocaleString("en-IN") : "Not provided", icon: CalendarDays },
    { label: "Venue", value: event.venue || event.location || "Not provided", icon: MapPin },
    { label: "Capacity", value: event.capacity ?? "Not provided", icon: Users },
    { label: "Duration / End", value: event.end_date ? new Date(event.end_date).toLocaleString("en-IN") : "Not provided", icon: Clock },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <Link to="/dashboard/events/manage" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-cyan-600">
        <ArrowLeft size={17} /> Back to Events
      </Link>

      {event.banner && (
        <img src={event.banner} alt={title} className="h-56 w-full rounded-2xl object-cover sm:h-72" />
      )}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-semibold text-cyan-600">TCH / Event Overview</p>
          <h1 className="mt-2 text-3xl font-extrabold">{title}</h1>
          <span className="mt-3 inline-flex rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold capitalize text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">
            {event.status || "Status unavailable"}
          </span>
        </div>
        <Link to={`/dashboard/events/${eventId}/edit`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-bold text-white">
          <Pencil size={17} /> Edit Event
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {details.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0B1220]">
            <Icon size={21} className="text-cyan-600" />
            <p className="mt-4 text-xs text-slate-500">{label}</p>
            <p className="mt-1 break-words font-bold">{value}</p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#0B1220]">
        <h2 className="text-lg font-bold">About this event</h2>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600 dark:text-slate-300">
          {event.description || "No description provided."}
        </p>
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#0B1220]">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Participants</h2>
            <Link to={`/dashboard/events/${eventId}/participants`} className="text-sm font-semibold text-cyan-600">Manage →</Link>
          </div>
          <p className="mt-4 text-3xl font-extrabold">{participants.length}</p>
          <p className="mt-1 text-sm text-slate-500">Records returned by the API</p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#0B1220]">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Organizers</h2>
            <Link to={`/dashboard/events/${eventId}/organizers`} className="text-sm font-semibold text-cyan-600">Manage →</Link>
          </div>
          <p className="mt-4 text-3xl font-extrabold">{organizers.length}</p>
          <p className="mt-1 text-sm text-slate-500">Assigned organizers</p>
        </section>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link to={`/dashboard/events/${eventId}/attendance`} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold dark:border-slate-700">
          <Users size={17} /> Attendance
        </Link>
        <Link to={`/dashboard/events/${eventId}/gallery`} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold dark:border-slate-700">
          <ImageIcon size={17} /> Event Gallery
        </Link>
      </div>
    </div>
  );
}
