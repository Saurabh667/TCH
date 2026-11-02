
import { useState } from "react";
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  CalendarDays,
  Search,
  ArrowUpRight,
  ClipboardList,
  Sparkles,
  Code2,
  Users,
  X,
} from "lucide-react";

const applications = [
  {
    id: "TCH-2026-001",
    title: "Web Development Workshop",
    description:
      "Hands-on workshop covering modern frontend development with React.",
    type: "Workshop",
    appliedOn: "October 25, 2026",
    eventDate: "November 15, 2026",
    status: "Approved",
  },
  {
    id: "TCH-2026-002",
    title: "Hackathon 2026",
    description:
      "Build innovative solutions, collaborate with developers, and compete with other teams.",
    type: "Hackathon",
    appliedOn: "October 28, 2026",
    eventDate: "November 22, 2026",
    status: "Pending",
  },
  {
    id: "TCH-2026-003",
    title: "Technical Team Recruitment",
    description:
      "Application for joining the technical team of The Coders Hub.",
    type: "Recruitment",
    appliedOn: "October 20, 2026",
    eventDate: "November 10, 2026",
    status: "Rejected",
  },
];

const filters = ["All", "Pending", "Approved", "Rejected"];

const statusConfig = {
  Pending: {
    icon: Clock,
    className:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    description: "Your application is being reviewed.",
  },
  Approved: {
    icon: CheckCircle2,
    className:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    description: "Congratulations! Your application is approved.",
  },
  Rejected: {
    icon: XCircle,
    className:
      "bg-red-500/10 text-red-600 dark:text-red-400",
    description: "This application was not selected.",
  },
};

export default function MyApplications() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);

  const filteredApplications = applications.filter((application) => {
    const matchesFilter =
      activeFilter === "All" ||
      application.status === activeFilter;

    const matchesSearch =
      application.title.toLowerCase().includes(search.toLowerCase()) ||
      application.id.toLowerCase().includes(search.toLowerCase()) ||
      application.type.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const stats = [
    {
      label: "Total Applications",
      value: applications.length,
      icon: FileText,
      color: "text-cyan-500",
      bg: "bg-cyan-500/10",
    },
    {
      label: "Pending",
      value: applications.filter((a) => a.status === "Pending").length,
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      label: "Approved",
      value: applications.filter((a) => a.status === "Approved").length,
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Rejected",
      value: applications.filter((a) => a.status === "Rejected").length,
      icon: XCircle,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-5 pb-20 pt-24 text-slate-900 transition-colors duration-300 dark:bg-[#07111f] dark:text-white sm:px-8 lg:px-16">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <section className="relative mb-12 overflow-hidden rounded-3xl border border-cyan-500/20 bg-white p-7 dark:bg-[#0c1b2c] sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                <ClipboardList size={16} />
                Application Dashboard
              </div>

              <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
                My <span className="text-cyan-500">Applications.</span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                Track your applications, check their status, and
                stay updated on your journey with The Coders Hub.
              </p>
            </div>

            <div className="flex h-28 w-28 shrink-0 items-center justify-center self-center rounded-3xl border border-cyan-500/30 bg-cyan-500/10 md:h-36 md:w-36">
              <FileText size={65} className="text-cyan-500" />
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-cyan-500/15 bg-white p-5 transition hover:-translate-y-1 hover:border-cyan-400 dark:bg-[#0c1b2c] sm:p-6"
              >
                <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg}`}>
                  <Icon size={22} className={stat.color} />
                </div>

                <p className="text-2xl font-extrabold sm:text-3xl">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </section>

        {/* APPLICATION LIST */}
        <section>
          <div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-cyan-500">
                Your Activity
              </p>

              <h2 className="text-2xl font-bold sm:text-3xl">
                Application History
              </h2>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                All your submitted applications in one place.
              </p>
            </div>

            <div className="relative w-full md:max-w-xs">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search applications..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-10 text-sm outline-none focus:border-cyan-500 dark:border-cyan-500/20 dark:bg-[#0c1b2c] dark:text-white"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-500"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* FILTERS */}
          <div className="mb-8 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                  activeFilter === filter
                    ? "border-cyan-500 bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                    : "border-slate-200 bg-white text-slate-600 hover:border-cyan-500 hover:text-cyan-500 dark:border-cyan-500/20 dark:bg-[#0c1b2c] dark:text-slate-300"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* CARDS */}
          <div className="space-y-5">
            {filteredApplications.map((application) => {
              const status = statusConfig[application.status];
              const StatusIcon = status.icon;

              return (
                <article
                  key={application.id}
                  className="group rounded-2xl border border-cyan-500/15 bg-white p-6 transition-all duration-300 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/5 dark:bg-[#0c1b2c] sm:p-7"
                >
                  <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

                    <div className="flex gap-4">
                      <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 sm:flex">
                        {application.type === "Workshop" ? (
                          <Code2 size={26} className="text-cyan-500" />
                        ) : application.type === "Hackathon" ? (
                          <Sparkles size={26} className="text-cyan-500" />
                        ) : (
                          <Users size={26} className="text-cyan-500" />
                        )}
                      </div>

                      <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-600 dark:text-cyan-400">
                            {application.type}
                          </span>

                          <span className="text-xs text-slate-400">
                            {application.id}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold transition group-hover:text-cyan-500 sm:text-xl">
                          {application.title}
                        </h3>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                          {application.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-2">
                            <CalendarDays size={15} className="text-cyan-500" />
                            Applied: {application.appliedOn}
                          </span>

                          <span className="flex items-center gap-2">
                            <Clock size={15} className="text-cyan-500" />
                            Event: {application.eventDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-5 dark:border-cyan-500/10 lg:min-w-48 lg:flex-col lg:items-end lg:border-0 lg:pt-0">
                      <div className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold ${status.className}`}>
                        <StatusIcon size={15} />
                        {application.status}
                      </div>

                      <button
                        onClick={() => setSelectedApplication(application)}
                        className="flex items-center gap-2 text-sm font-bold text-cyan-600 transition hover:gap-3 dark:text-cyan-400"
                      >
                        View Details
                        <ArrowUpRight size={17} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* EMPTY STATE */}
          {filteredApplications.length === 0 && (
            <div className="rounded-3xl border border-dashed border-cyan-500/30 bg-white px-6 py-16 text-center dark:bg-[#0c1b2c]">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10">
                <FileText size={30} className="text-cyan-500" />
              </div>

              <h3 className="text-xl font-bold">
                No Applications Found
              </h3>

              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                No applications match your search or selected filter.
              </p>

              <button
                onClick={() => {
                  setActiveFilter("All");
                  setSearch("");
                }}
                className="mt-6 rounded-xl bg-cyan-500 px-6 py-3 text-sm font-bold text-white hover:bg-cyan-600"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>

        {/* BOTTOM MESSAGE */}
        <section className="mt-14 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 p-8 text-center sm:p-10">
          <Sparkles size={30} className="mx-auto text-cyan-500" />

          <h2 className="mt-4 text-2xl font-extrabold">
            Keep Exploring. Keep Growing.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
            Every opportunity is a chance to learn something new.
            Keep building your journey with The Coders Hub.
          </p>
        </section>
      </div>

      {/* APPLICATION DETAILS MODAL */}
      {selectedApplication && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedApplication(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl border border-cyan-500/20 bg-white p-7 shadow-2xl dark:bg-[#0c1b2c] sm:p-9"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
                <FileText size={24} className="text-cyan-500" />
              </div>

              <button
                onClick={() => setSelectedApplication(null)}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-cyan-500 dark:hover:bg-slate-800"
                aria-label="Close details"
              >
                <X size={21} />
              </button>
            </div>

            <p className="text-xs font-bold uppercase tracking-wider text-cyan-500">
              Application Details
            </p>

            <h2 className="mt-2 text-2xl font-extrabold">
              {selectedApplication.title}
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
              {selectedApplication.description}
            </p>

            <div className="mt-7 space-y-4 rounded-2xl bg-slate-50 p-5 dark:bg-[#07111f]">
              <Detail label="Application ID" value={selectedApplication.id} />
              <Detail label="Application Type" value={selectedApplication.type} />
              <Detail label="Applied On" value={selectedApplication.appliedOn} />
              <Detail label="Event Date" value={selectedApplication.eventDate} />

              <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Current Status
                </span>

                <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${statusConfig[selectedApplication.status].className}`}>
                  {selectedApplication.status}
                </span>
              </div>
            </div>

            <p className="mt-5 text-xs leading-6 text-slate-500 dark:text-slate-400">
              {statusConfig[selectedApplication.status].description}
            </p>

            <button
              onClick={() => setSelectedApplication(null)}
              className="mt-6 w-full rounded-xl bg-cyan-500 py-3 font-bold text-white transition hover:bg-cyan-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <span className="text-right text-sm font-semibold">
        {value}
      </span>
    </div>
  );
}
