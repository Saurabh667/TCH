
import { useMemo, useState } from "react";
import {
  Bell,
  Search,
  Pin,
  CalendarDays,
  ArrowUpRight,
  Megaphone,
  Sparkles,
  Info,
  Trophy,
  Users,
  X,
} from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "Welcome to The Coders Hub!",
    description:
      "Welcome to the official platform of The Coders Hub. Stay connected with us for the latest club updates, technical events, workshops, hackathons, and exciting opportunities.",
    category: "General",
    date: "November 02, 2026",
    pinned: true,
    icon: Megaphone,
    tag: "Club Update",
  },
  {
    id: 2,
    title: "Something Exciting Is Coming!",
    description:
      "We're working on exciting opportunities for our community. Keep an eye on this space for upcoming events, technical sessions, and announcements.",
    category: "Events",
    date: "Coming Soon",
    pinned: false,
    icon: Sparkles,
    tag: "Coming Soon",
  },
];

const categories = ["All", "General", "Events", "Workshops", "Hackathons"];

const categoryStyles = {
  General: "text-cyan-500 bg-cyan-500/10",
  Events: "text-blue-500 bg-blue-500/10",
  Workshops: "text-emerald-500 bg-emerald-500/10",
  Hackathons: "text-orange-500 bg-orange-500/10",
};

export default function Announcements() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const pinnedAnnouncements = filteredAnnouncements.filter(
    (item) => item.pinned
  );

  const regularAnnouncements = filteredAnnouncements.filter(
    (item) => !item.pinned
  );

  return (
    <main className="announcements-page min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#07111f] dark:text-white">
      {/* Hero */}
      <section className="relative px-5 pb-12 pt-20 sm:px-8 lg:px-16 lg:pb-16 lg:pt-28">
        <div className="announcement-grid pointer-events-none absolute inset-0 opacity-40" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400">
            <Bell size={15} />
            Stay in the Loop
          </div>

          <div className="grid items-center gap-10 md:grid-cols-[1.3fr_0.7fr]">
            <div>
              <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                What's Happening at{" "}
                <span className="announcement-gradient">TCH?</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
                The latest updates, important notices, opportunities, and
                everything happening inside The Coders Hub community.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-2">
                  <Users size={16} className="text-cyan-500" />
                  The TCH Community
                </span>
                <span className="h-1 w-1 rounded-full bg-cyan-500" />
                <span>Stay Updated. Stay Connected.</span>
              </div>
            </div>

            <div className="relative mx-auto flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72">
              <div className="absolute inset-3 rounded-full border border-cyan-500/20" />
              <div className="absolute inset-8 rounded-full border border-cyan-500/30" />
              <div className="absolute inset-14 rounded-full bg-cyan-400/10 blur-2xl" />

              <div className="relative flex h-32 w-32 items-center justify-center rounded-[2rem] border border-cyan-400/40 bg-white shadow-xl shadow-cyan-500/10 dark:bg-[#102238]">
                <Megaphone size={62} className="text-cyan-500" />
              </div>

              <div className="absolute right-7 top-8 rounded-xl border border-cyan-500/20 bg-white p-3 shadow-lg dark:bg-[#102238]">
                <Bell size={21} className="text-cyan-500" />
              </div>

              <div className="absolute bottom-9 left-5 rounded-xl border border-cyan-500/20 bg-white p-3 shadow-lg dark:bg-[#102238]">
                <Sparkles size={21} className="text-cyan-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Announcement Section */}
      <section className="px-5 pb-24 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-cyan-500">
                Notice Board
              </p>
              <h2 className="text-3xl font-bold sm:text-4xl">
                Latest Announcements
              </h2>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                Don't miss out on what's new in our community.
              </p>
            </div>

            <div className="relative w-full md:max-w-xs">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search announcements..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-10 text-sm outline-none transition focus:border-cyan-500 dark:border-cyan-500/20 dark:bg-[#0c1b2c] dark:text-white"
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

          {/* Filters */}
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
                  activeCategory === category
                    ? "border-cyan-500 bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                    : "border-slate-200 bg-white text-slate-600 hover:border-cyan-500 hover:text-cyan-600 dark:border-cyan-500/20 dark:bg-[#0c1b2c] dark:text-slate-300 dark:hover:text-cyan-400"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Pinned Announcements */}
          {pinnedAnnouncements.length > 0 && (
            <div className="mb-12">
              <div className="mb-5 flex items-center gap-2">
                <Pin size={17} className="text-cyan-500" />
                <h3 className="text-lg font-bold">Pinned Announcement</h3>
              </div>

              {pinnedAnnouncements.map((item) => (
                <AnnouncementCard key={item.id} item={item} featured />
              ))}
            </div>
          )}

          {/* Regular Announcements */}
          {regularAnnouncements.length > 0 && (
            <div>
              <h3 className="mb-5 text-lg font-bold">Recent Updates</h3>
              <div className="grid gap-5 md:grid-cols-2">
                {regularAnnouncements.map((item) => (
                  <AnnouncementCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredAnnouncements.length === 0 && (
            <div className="rounded-3xl border border-dashed border-cyan-500/30 bg-white px-6 py-16 text-center dark:bg-[#0c1b2c]">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10">
                <Info size={30} className="text-cyan-500" />
              </div>
              <h3 className="text-xl font-bold">No Announcements Found</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400">
                We couldn't find anything matching your search. Try another
                keyword or select a different category.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
                className="mt-6 rounded-xl bg-cyan-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-cyan-600"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-5 pb-20 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 p-8 text-center sm:p-12 dark:from-cyan-500/10 dark:to-blue-500/10">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15">
            <Trophy size={28} className="text-cyan-500" />
          </div>

          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Be Part of Something Bigger.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
            Stay active, explore opportunities, and keep building with The
            Coders Hub.
          </p>
        </div>
      </section>
    </main>
  );
}

function AnnouncementCard({ item, featured = false }) {
  const Icon = item.icon;

  return (
    <article
      className={`announcement-card group relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/10 dark:bg-[#0c1b2c] ${
        featured ? "p-7 sm:p-9" : ""
      }`}
    >
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-500/5 blur-3xl transition group-hover:bg-cyan-500/10" />

      <div className="relative">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
            <Icon size={23} className="text-cyan-500" />
          </div>

          {item.pinned && (
            <span className="flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400">
              <Pin size={12} />
              Pinned
            </span>
          )}
        </div>

        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              categoryStyles[item.category] ||
              "bg-cyan-500/10 text-cyan-500"
            }`}
          >
            {item.category}
          </span>
          <span className="text-xs font-medium text-slate-400">
            {item.tag}
          </span>
        </div>

        <h3 className="text-xl font-bold leading-snug transition group-hover:text-cyan-500 sm:text-2xl">
          {item.title}
        </h3>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400">
          {item.description}
        </p>

        <div className="mt-7 flex items-center justify-between border-t border-slate-200 pt-5 dark:border-cyan-500/10">
          <span className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <CalendarDays size={15} className="text-cyan-500" />
            {item.date}
          </span>

          <ArrowUpRight
            size={19}
            className="text-slate-400 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-500"
          />
        </div>
      </div>
    </article>
  );
}
