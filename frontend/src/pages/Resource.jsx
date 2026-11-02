
import { useMemo, useState } from "react";
import {
  Search,
  Code2,
  Globe,
  BookOpen,
  Terminal,
  Database,
  Brain,
  ExternalLink,
  ArrowUpRight,
  Layers,
  Sparkles,
  X,
} from "lucide-react";

const resources = [
  {
    title: "MDN Web Docs",
    description:
      "A complete reference for HTML, CSS, JavaScript, and modern web development.",
    category: "Web Development",
    type: "Documentation",
    icon: Globe,
    url: "https://developer.mozilla.org/",
    level: "Beginner Friendly",
  },
  {
    title: "React Documentation",
    description:
      "Learn React concepts, components, hooks, state management, and more.",
    category: "Web Development",
    type: "Documentation",
    icon: Code2,
    url: "https://react.dev/",
    level: "Intermediate",
  },
  {
    title: "Node.js Documentation",
    description:
      "Explore Node.js APIs, asynchronous programming, and backend development.",
    category: "Backend",
    type: "Documentation",
    icon: Terminal,
    url: "https://nodejs.org/docs/latest/api/",
    level: "Intermediate",
  },
  {
    title: "MongoDB University",
    description:
      "Explore free learning resources and courses on MongoDB and databases.",
    category: "Database",
    type: "Courses",
    icon: Database,
    url: "https://learn.mongodb.com/",
    level: "All Levels",
  },
  {
    title: "freeCodeCamp",
    description:
      "Practice coding through interactive lessons, certifications, and projects.",
    category: "Web Development",
    type: "Practice",
    icon: Code2,
    url: "https://www.freecodecamp.org/",
    level: "Beginner Friendly",
  },
  {
    title: "GitHub Skills",
    description:
      "Learn GitHub workflows, repositories, collaboration, and version control.",
    category: "Tools",
    type: "Learning",
    icon: Code2,
    url: "https://skills.github.com/",
    level: "Beginner Friendly",
  },
  {
    title: "GeeksforGeeks",
    description:
      "Explore DSA, programming concepts, computer science subjects, and interview preparation.",
    category: "DSA & Interview",
    type: "Practice",
    icon: Brain,
    url: "https://www.geeksforgeeks.org/",
    level: "All Levels",
  },
  {
    title: "Roadmap.sh",
    description:
      "Follow structured roadmaps for frontend, backend, DevOps, and other tech careers.",
    category: "Career",
    type: "Roadmaps",
    icon: Layers,
    url: "https://roadmap.sh/",
    level: "All Levels",
  },
  {
    title: "LeetCode",
    description:
      "Sharpen problem-solving skills with coding challenges and interview questions.",
    category: "DSA & Interview",
    type: "Practice",
    icon: Brain,
    url: "https://leetcode.com/",
    level: "Intermediate",
  },
  {
    title: "Tailwind CSS",
    description:
      "Learn utility-first CSS and build responsive interfaces efficiently.",
    category: "Web Development",
    type: "Documentation",
    icon: Code2,
    url: "https://tailwindcss.com/docs",
    level: "Beginner Friendly",
  },
  {
    title: "Express.js",
    description:
      "Understand routing, middleware, APIs, and server-side development with Express.",
    category: "Backend",
    type: "Documentation",
    icon: Terminal,
    url: "https://expressjs.com/",
    level: "Intermediate",
  },
  {
    title: "PostgreSQL",
    description:
      "Explore relational databases, SQL queries, and PostgreSQL documentation.",
    category: "Database",
    type: "Documentation",
    icon: Database,
    url: "https://www.postgresql.org/docs/",
    level: "Intermediate",
  },
];

const categories = [
  "All",
  "Web Development",
  "Backend",
  "Database",
  "DSA & Interview",
  "Tools",
  "Career",
];

const types = [
  "All Types",
  "Documentation",
  "Courses",
  "Practice",
  "Learning",
  "Roadmaps",
];

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeType, setActiveType] = useState("All Types");
  const [search, setSearch] = useState("");

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesCategory =
        activeCategory === "All" ||
        resource.category === activeCategory;

      const matchesType =
        activeType === "All Types" ||
        resource.type === activeType;

      const searchText = search.toLowerCase();

      const matchesSearch =
        resource.title.toLowerCase().includes(searchText) ||
        resource.description.toLowerCase().includes(searchText) ||
        resource.category.toLowerCase().includes(searchText);

      return matchesCategory && matchesType && matchesSearch;
    });
  }, [activeCategory, activeType, search]);

  const clearFilters = () => {
    setActiveCategory("All");
    setActiveType("All Types");
    setSearch("");
  };

  return (
    <main className="resources-page min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#07111f] dark:text-white">

      {/* HERO SECTION */}
      <section className="relative px-5 pb-16 pt-20 sm:px-8 lg:px-16 lg:pt-28">
        <div className="resources-grid pointer-events-none absolute inset-0 opacity-40" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[1.3fr_0.7fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400">
              <Sparkles size={15} />
              Your Learning Starts Here
            </div>

            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Explore. Learn.{" "}
              <span className="resources-gradient">
                Build.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
              Your one-stop destination for developer resources.
              Discover documentation, learning platforms, coding
              tools, and everything you need to level up your skills.
            </p>

            <div className="mt-8">
              <a
                href="#explore-resources"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-1 hover:bg-cyan-600"
              >
                Explore Resources
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>

          {/* HERO ILLUSTRATION */}
          <div className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80">
            <div className="absolute inset-3 rounded-full border border-cyan-500/20" />
            <div className="absolute inset-10 rounded-full border border-cyan-500/30" />
            <div className="absolute inset-16 rounded-full bg-cyan-500/10 blur-2xl" />

            <div className="relative flex h-36 w-36 items-center justify-center rounded-[2rem] border border-cyan-400/40 bg-white shadow-xl shadow-cyan-500/10 dark:bg-[#102238]">
              <BookOpen size={65} className="text-cyan-500" />
            </div>

            <div className="absolute right-7 top-9 rounded-2xl border border-cyan-500/20 bg-white p-4 shadow-lg dark:bg-[#102238]">
              <Code2 size={24} className="text-cyan-500" />
            </div>

            <div className="absolute bottom-9 left-5 rounded-2xl border border-cyan-500/20 bg-white p-4 shadow-lg dark:bg-[#102238]">
              <Terminal size={24} className="text-cyan-500" />
            </div>

            <div className="absolute bottom-10 right-5 rounded-2xl border border-cyan-500/20 bg-white p-3 shadow-lg dark:bg-[#102238]">
              <Brain size={22} className="text-cyan-500" />
            </div>
          </div>
        </div>
      </section>

      {/* RESOURCE LIBRARY */}
      <section
        id="explore-resources"
        className="scroll-mt-24 px-5 pb-24 sm:px-8 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">

          <div className="mb-9">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-cyan-500">
              Resource Library
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Find Your Next Learning Resource
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
              Handpicked platforms and tools to support your developer journey.
            </p>
          </div>

          {/* SEARCH AND TYPE FILTER */}
          <div className="mb-7 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search resources, technologies..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-11 text-sm outline-none transition focus:border-cyan-500 dark:border-cyan-500/20 dark:bg-[#0c1b2c] dark:text-white"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-500"
                  aria-label="Clear search"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            <select
              value={activeType}
              onChange={(e) => setActiveType(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-cyan-500 dark:border-cyan-500/20 dark:bg-[#0c1b2c] dark:text-white"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* CATEGORY FILTER */}
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition-all ${
                  activeCategory === category
                    ? "border-cyan-500 bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                    : "border-slate-200 bg-white text-slate-600 hover:border-cyan-500 hover:text-cyan-600 dark:border-cyan-500/20 dark:bg-[#0c1b2c] dark:text-slate-300 dark:hover:text-cyan-400"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* RESULTS COUNT */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing{" "}
              <span className="font-bold text-cyan-500">
                {filteredResources.length}
              </span>{" "}
              resources
            </p>

            {(search ||
              activeCategory !== "All" ||
              activeType !== "All Types") && (
              <button
                onClick={clearFilters}
                className="text-sm font-semibold text-cyan-600 hover:text-cyan-500 dark:text-cyan-400"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* RESOURCE CARDS */}
          {filteredResources.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map((resource) => {
                const Icon = resource.icon;

                return (
                  <article
                    key={resource.title}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-cyan-500/20 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/10 dark:bg-[#0c1b2c]"
                  >
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/5 blur-3xl transition group-hover:bg-cyan-500/15" />

                    <div className="relative flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
                        <Icon
                          size={24}
                          className="text-cyan-500"
                        />
                      </div>

                      <span className="rounded-full bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                        {resource.type}
                      </span>
                    </div>

                    <div className="relative mt-6 flex-1">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-cyan-500">
                        {resource.category}
                      </p>

                      <h3 className="text-xl font-bold transition group-hover:text-cyan-500">
                        {resource.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                        {resource.description}
                      </p>
                    </div>

                    <div className="relative mt-6 flex items-center justify-between border-t border-slate-200 pt-5 dark:border-cyan-500/10">
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {resource.level}
                      </span>

                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Explore ${resource.title}`}
                        className="flex items-center gap-2 text-sm font-bold text-cyan-600 transition hover:gap-3 dark:text-cyan-400"
                      >
                        Explore
                        <ExternalLink size={15} />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-cyan-500/30 bg-white px-6 py-16 text-center dark:bg-[#0c1b2c]">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10">
                <Search size={30} className="text-cyan-500" />
              </div>

              <h3 className="text-xl font-bold">
                No Resources Found
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400">
                We couldn't find any resources matching your search.
                Try another keyword or change the filters.
              </p>

              <button
                onClick={clearFilters}
                className="mt-6 rounded-xl bg-cyan-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-cyan-600"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="px-5 pb-20 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 px-6 py-12 text-center sm:px-12">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15">
            <Sparkles size={28} className="text-cyan-500" />
          </div>

          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Keep Learning. Keep Building.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
            Every expert was once a beginner. Explore, experiment,
            and create something amazing with The Coders Hub.
          </p>
        </div>
      </section>
    </main>
  );
}
