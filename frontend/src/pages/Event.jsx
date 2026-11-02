
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  MapPin,
  ArrowUpRight,
  Code2,
  Trophy,
  Users,
  Lightbulb,
  Rocket,
  Laptop,
  Mic2,
  Sparkles,
  CalendarPlus,
  ArrowRight,
  Bell,
} from "lucide-react";

const categories = [
  { name: "All Events", icon: Sparkles },
  { name: "Hackathons", icon: Trophy },
  { name: "Workshops", icon: Laptop },
  { name: "Tech Talks", icon: Mic2 },
  { name: "Competitions", icon: Code2 },
];

const eventTypes = [
  {
    icon: Trophy,
    title: "Hackathons",
    description:
      "Build innovative solutions, collaborate with developers, and turn your ideas into reality.",
    tag: "BUILD",
  },
  {
    icon: Laptop,
    title: "Workshops",
    description:
      "Get hands-on experience with modern technologies, tools, and development practices.",
    tag: "LEARN",
  },
  {
    icon: Mic2,
    title: "Tech Talks",
    description:
      "Explore new technologies and learn from experienced developers and industry experts.",
    tag: "EXPLORE",
  },
  {
    icon: Lightbulb,
    title: "Competitions",
    description:
      "Challenge yourself, test your skills, and showcase your technical creativity.",
    tag: "COMPETE",
  },
];

export default function Events() {
  const [activeCategory, setActiveCategory] = useState("All Events");

  return (
    <main className="events-page-bg min-h-screen overflow-hidden text-white">

      <style>{`
        .events-page-bg {
          background-color: #f4f8fc;
          background-image:
            radial-gradient(circle at 10% 12%, rgba(0, 180, 220, 0.09), transparent 250px),
            radial-gradient(circle at 90% 35%, rgba(0, 120, 255, 0.07), transparent 250px),
            linear-gradient(145deg, #f4f8fc, #eaf2fa 50%, #f7faff);
          color: #102b4e;
        }

        .dark .events-page-bg {
          background-color: #050b14;
          background-image:
            radial-gradient(circle at 10% 12%, rgba(0, 207, 255, 0.15), transparent 260px),
            radial-gradient(circle at 90% 35%, rgba(0, 207, 255, 0.12), transparent 280px),
            radial-gradient(circle at 50% 85%, rgba(0, 100, 255, 0.10), transparent 260px),
            linear-gradient(145deg, #050b14, #071322 50%, #050b14);
          color: #ffffff;
        }

        .events-panel {
          background: rgba(255, 255, 255, 0.78);
          border: 1px solid rgba(0, 145, 190, 0.22);
          box-shadow: 0 15px 45px rgba(16, 43, 78, 0.06);
          backdrop-filter: blur(14px);
        }

        .dark .events-panel {
          background: linear-gradient(145deg, rgba(11, 23, 40, 0.96), rgba(5, 11, 20, 0.96));
          border-color: rgba(0, 207, 255, 0.28);
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.18);
        }

        .events-gradient-text {
          background: linear-gradient(100deg, #00cfff, #1675ff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .events-grid-pattern {
          background-image: linear-gradient(rgba(0, 190, 255, 0.045) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 190, 255, 0.045) 1px, transparent 1px);
          background-size: 38px 38px;
          mask-image: linear-gradient(to bottom, black, transparent);
        }

        .event-orbit {
          animation: eventFloat 5s ease-in-out infinite;
        }

        @keyframes eventFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        .event-card {
          transition: transform 250ms ease, border-color 250ms ease, box-shadow 250ms ease;
        }

        .event-card:hover {
          transform: translateY(-6px);
          border-color: #00cfff;
          box-shadow: 0 15px 35px rgba(0, 180, 255, 0.10);
        }

        .dark .events-page-bg .event-muted {
          color: #94a3b8;
        }

        html:not(.dark) .events-page-bg .event-muted {
          color: #64748b;
        }

        html:not(.dark) .events-page-bg .event-heading {
          color: #102b4e;
        }

        .dark .events-page-bg .event-heading {
          color: #ffffff;
        }

        @media (prefers-reduced-motion: reduce) {
          .event-orbit { animation: none; }
          .event-card { transition: none; }
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="relative px-6 pb-16 pt-16 sm:px-10 sm:pb-24 sm:pt-24 lg:px-[8%]">
        <div className="events-grid-pattern pointer-events-none absolute inset-0" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">

          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-bold tracking-wider text-cyan-600 dark:text-cyan-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
              THE CODERS HUB · EVENTS
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl">
              Discover.
              <br />
              Participate.
              <br />
              <span className="events-gradient-text">
                Create.
              </span>
            </h1>

            <p className="event-muted mt-7 max-w-xl text-base leading-8 sm:text-lg">
              Where ideas meet innovation. Explore technical
              events, learn new skills, connect with fellow
              developers, and make every experience count.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#upcoming-events"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3.5 font-bold text-white transition hover:-translate-y-1 hover:bg-cyan-400"
              >
                Explore Events
                <ArrowRight size={18} />
              </a>

              <a
                href="#event-categories"
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/40 px-6 py-3.5 font-bold text-cyan-700 transition hover:border-cyan-400 dark:text-cyan-300"
              >
                Discover Activities
                <ArrowUpRight size={18} />
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-7 border-t border-cyan-500/20 pt-7">
              <div>
                <p className="text-2xl font-black event-heading">Learn</p>
                <p className="event-muted mt-1 text-xs">New technologies</p>
              </div>
              <div>
                <p className="text-2xl font-black event-heading">Build</p>
                <p className="event-muted mt-1 text-xs">Real-world projects</p>
              </div>
              <div>
                <p className="text-2xl font-black event-heading">Connect</p>
                <p className="event-muted mt-1 text-xs">Tech community</p>
              </div>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="event-orbit relative mx-auto w-full max-w-[410px]">
            <div className="absolute inset-8 rounded-full bg-cyan-400/20 blur-[80px]" />

            <div className="events-panel relative aspect-square overflow-hidden rounded-[2rem] p-6 sm:p-8">
              <div className="absolute right-6 top-6 text-cyan-500/60">
                <Sparkles size={24} />
              </div>

              <div className="flex h-full flex-col items-center justify-center">
                <div className="relative grid h-44 w-44 place-items-center rounded-full border border-cyan-400/40 bg-cyan-400/10 shadow-[0_0_60px_rgba(0,207,255,0.12)] sm:h-52 sm:w-52">
                  <div className="absolute inset-3 rounded-full border border-dashed border-cyan-400/50" />
                  <div className="grid h-28 w-28 place-items-center rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-xl sm:h-32 sm:w-32">
                    <Rocket size={65} strokeWidth={1.3} />
                  </div>
                </div>

                <h2 className="mt-8 text-2xl font-black event-heading">
                  Ideas Into Action
                </h2>

                <p className="event-muted mt-2 text-center text-sm">
                  Experience technology beyond classrooms.
                </p>

                <div className="mt-7 flex gap-3">
                  {[Code2, Trophy, Lightbulb, Users].map((Icon, index) => (
                    <div
                      key={index}
                      className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-400/25 bg-cyan-400/10 text-cyan-500"
                    >
                      <Icon size={19} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section
        id="upcoming-events"
        className="scroll-mt-24 px-6 py-16 sm:px-10 lg:px-[8%]"
      >
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold tracking-[0.25em] text-cyan-600 dark:text-cyan-400">
                MARK YOUR CALENDAR
              </p>
              <h2 className="event-heading mt-3 text-4xl font-black sm:text-5xl">
                Upcoming <span className="events-gradient-text">Events</span>
              </h2>
              <p className="event-muted mt-4 max-w-xl text-sm leading-7">
                Stay tuned for exciting opportunities to learn,
                collaborate, and showcase your skills.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-bold text-cyan-700 dark:text-cyan-300">
              <CalendarDays size={15} />
              Coming Soon
            </div>
          </div>

          {/* CATEGORY FILTERS */}
          <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const selected = activeCategory === category.name;

              return (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`flex shrink-0 items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                    selected
                      ? "border-cyan-500 bg-cyan-500 text-white"
                      : "border-cyan-500/25 bg-white/50 text-slate-600 hover:border-cyan-400 dark:bg-[#0b1728] dark:text-slate-300"
                  }`}
                >
                  <Icon size={16} />
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* EMPTY UPCOMING EVENTS STATE */}
          <div className="events-panel relative overflow-hidden rounded-3xl p-8 sm:p-14">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative mx-auto max-w-xl py-5 text-center">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-500">
                <CalendarPlus size={38} strokeWidth={1.4} />
              </div>

              <h3 className="event-heading mt-7 text-2xl font-black sm:text-3xl">
                Something Exciting Is Brewing!
              </h3>

              <p className="event-muted mt-4 text-sm leading-7">
                We are preparing exciting experiences for the
                TCH community. Our upcoming events will appear
                here as soon as they are announced.
              </p>

              <div className="mt-7 inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-400/10 px-5 py-3 text-sm font-bold text-cyan-700 dark:text-cyan-300">
                <Bell size={17} />
                Stay Connected
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* EVENT CATEGORIES */}
      <section
        id="event-categories"
        className="border-y border-cyan-400/20 bg-cyan-500/[0.025] px-6 py-16 sm:px-10 lg:px-[8%]"
      >
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 text-center">
            <p className="text-xs font-bold tracking-[0.25em] text-cyan-600 dark:text-cyan-400">
              WHAT'S HAPPENING AT TCH
            </p>

            <h2 className="event-heading mt-3 text-4xl font-black sm:text-5xl">
              Explore Our <span className="events-gradient-text">Activities</span>
            </h2>

            <p className="event-muted mx-auto mt-4 max-w-2xl text-sm leading-7">
              From coding challenges to interactive learning
              sessions, discover the different ways to be a part
              of our technical community.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {eventTypes.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="events-panel event-card group rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-cyan-400/10 text-cyan-600 dark:text-cyan-400">
                      <Icon size={25} />
                    </div>

                    <span className="text-[10px] font-black tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                      0{index + 1}
                    </span>
                  </div>

                  <p className="mt-7 text-[10px] font-bold tracking-[0.25em] text-cyan-600 dark:text-cyan-400">
                    {item.tag}
                  </p>

                  <h3 className="event-heading mt-2 text-xl font-black">
                    {item.title}
                  </h3>

                  <p className="event-muted mt-3 text-sm leading-7">
                    {item.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-xs font-bold text-cyan-600 transition group-hover:gap-3 dark:text-cyan-400">
                    Explore possibilities
                    <ArrowRight size={15} />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* PAST EVENTS */}
      <section className="px-6 py-16 sm:px-10 lg:px-[8%]">
        <div className="mx-auto max-w-7xl">

          <div className="mb-8">
            <p className="text-xs font-bold tracking-[0.25em] text-cyan-600 dark:text-cyan-400">
              OUR JOURNEY
            </p>

            <h2 className="event-heading mt-3 text-4xl font-black sm:text-5xl">
              Past <span className="events-gradient-text">Events</span>
            </h2>

            <p className="event-muted mt-4 max-w-xl text-sm leading-7">
              Take a look at the experiences and milestones
              from our community.
            </p>
          </div>

          <div className="events-panel flex flex-col items-center rounded-3xl border-dashed px-6 py-12 text-center sm:py-16">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-500">
              <Clock3 size={31} />
            </div>

            <h3 className="event-heading mt-5 text-xl font-black">
              Our Story Is Just Beginning
            </h3>

            <p className="event-muted mt-3 max-w-md text-sm leading-7">
              Event highlights, memories, and photo galleries
              will be showcased here as our community grows.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 sm:px-10 lg:px-[8%]">
        <div className="events-panel relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-cyan-400/30 px-6 py-14 text-center sm:px-12">

          <div className="pointer-events-none absolute -left-16 -top-20 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-16 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-500">
              <Users size={27} />
            </div>

            <p className="mt-6 text-xs font-bold tracking-[0.25em] text-cyan-600 dark:text-cyan-400">
              BE PART OF THE COMMUNITY
            </p>

            <h2 className="event-heading mx-auto mt-4 max-w-3xl text-3xl font-black sm:text-5xl">
              Don't Just Watch.
              <span className="events-gradient-text block">
                Be A Part Of It.
              </span>
            </h2>

            <p className="event-muted mx-auto mt-5 max-w-xl text-sm leading-7">
              Connect with fellow developers, explore new
              opportunities, and grow with The Coders Hub.
            </p>

            <Link
              to="/signup"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-7 py-3.5 font-bold text-white transition hover:-translate-y-1 hover:bg-cyan-400"
            >
              Join The Community
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
