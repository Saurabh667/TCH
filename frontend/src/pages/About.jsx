import { Link } from "react-router-dom";
import Reveal from "../components/about/Reveal";
import SectionHeading from "../components/about/SectionHeading";
import MemberCard from "../components/about/MemberCard";

import tchImage from "../assets/tch-logo.jpeg" 

import {
  ArrowRight,
  Code2,
  Users,
  Rocket,
  Lightbulb,
  Laptop,
  CalendarDays,
  Target,
  Eye,
  Sparkles,
  Globe,
  Heart,
  Terminal,
  Zap,
  Layers3,
} from "lucide-react";

import tchData from "../data/members.json";

export default function About() {
  const teams = tchData.teams || [];
  const members = tchData.members || [];

  const teamLeadCount = members.filter((member) =>
    /lead/i.test(member.position || "")
  ).length;

  const stats = [
    {
      value: teams.length.toString().padStart(2, "0"),
      label: "Teams",
      icon: Layers3,
    },
    {
      value: teamLeadCount.toString().padStart(2, "0"),
      label: "Leadership Roles",
      icon: Target,
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-100 text-slate-900 selection:bg-cyan-200 selection:text-slate-900 transition-colors duration-300 dark:bg-[#060c17] dark:text-slate-100 dark:selection:bg-cyan-500 dark:selection:text-white">
      <style>{`
        @keyframes about-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @keyframes about-glow {
          0%, 100% { opacity: .35; transform: scale(.95); }
          50% { opacity: .75; transform: scale(1.08); }
        }

        .about-float {
          animation: about-float 5s ease-in-out infinite;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .about-float {
            animation: none;
          }
        }
      `}</style>

      {/* INTRODUCTION */}
      <section className="border-b border-slate-200 bg-white px-6 py-10 dark:border-slate-800 dark:bg-[#081321] sm:px-10 sm:py-12 lg:px-[8%]">
  <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-[0.8fr_1.2fr] lg:gap-12">

    {/* LEFT: Replaceable Illustration */}
    <Reveal>
      <div className="relative mx-auto w-full max-w-[320px]">
        {/* Background glow */}
        <div className="absolute inset-6 rounded-full bg-cyan-400/20 blur-3xl" />

        {/* Image container */}
        <div className="relative overflow-hidden rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-blue-100 p-3 dark:border-cyan-400/20 dark:from-[#102b3a] dark:via-[#0b1422] dark:to-[#10213c]">
          <img
            // src="/images/tch-about.png"
            src={tchImage}
            alt="The Coders Hub community illustration"
            className="aspect-[4/3] w-full rounded-2xl object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          {/* Decorative badge */}
          <div className="absolute bottom-6 left-6 rounded-xl border border-white/60 bg-white/90 px-3 py-2 shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-900/90">
            <p className="text-xs font-bold text-slate-900 dark:text-white">
              Learn. Build. Grow.
            </p>
            <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
              Together at TCH
            </p>
          </div>
        </div>

        {/* Decorative corner */}
        <div className="absolute -right-3 -top-3 -z-0 h-12 w-12 rounded-2xl border-2 border-dashed border-cyan-400/60" />
      </div>
    </Reveal>

    {/* RIGHT: About TCH Content */}
    <Reveal delay={100}>
      <div className="max-w-3xl">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-6 w-1 rounded-full bg-cyan-600 dark:bg-cyan-400" />

          <p className="text-xs font-bold uppercase tracking-[0.15em] text-cyan-700 dark:text-cyan-400 sm:text-sm">
            The Coders Hub · CSE Community
          </p>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          About TCH
        </h1>

        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base sm:leading-8">
          The Coders Hub is a student community where CSE students learn
          technology, collaborate on practical projects, share knowledge,
          and organize events. Our technical, event management, design,
          and content teams work together to create opportunities for
          students to develop their skills and turn ideas into reality.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-500"
          >
            Join the Community
            <ArrowRight size={16} />
          </Link>

          <a
            href="#team"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-cyan-600 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
          >
            Meet the Team
            <Users size={16} />
          </a>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid max-w-xl grid-cols-2 divide-x divide-slate-200 border-y border-slate-200 dark:divide-slate-700 dark:border-slate-700">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="px-3 py-4 first:pl-0 sm:px-6 sm:py-5"
            >
              <p className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                {stat.value}
              </p>

              <p className="mt-1 text-[11px] leading-5 text-slate-600 dark:text-slate-400 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Reveal>

  </div>
</section>
      {/* <section className="border-b border-slate-200 bg-white px-6 py-10 dark:border-slate-800 dark:bg-[#081321] sm:px-10 sm:py-12 lg:px-[8%]">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="max-w-4xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-6 w-1 rounded-full bg-cyan-600 dark:bg-cyan-400" />

                <p className="text-xs font-bold uppercase tracking-[0.15em] text-cyan-700 dark:text-cyan-400 sm:text-sm">
                  The Coders Hub · CSE Community
                </p>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                About TCH
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base sm:leading-8">
                The Coders Hub is a student community where CSE students learn
                technology, collaborate on practical projects, share knowledge,
                and organize events. Our technical, event management, design,
                and content teams work together to create opportunities for
                students to develop their skills and turn ideas into reality.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 rounded-lg bg-cyan-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-500"
                >
                  Join the Community
                  <ArrowRight size={16} />
                </Link>

                <a
                  href="#team"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-cyan-600 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
                >
                  Meet the Team
                  <Users size={16} />
                </a>
              </div>
            </div>
          </Reveal>

          <div className="mt-8 grid max-w-4xl grid-cols-2 divide-x divide-slate-200 border-y border-slate-200 dark:divide-slate-700 dark:border-slate-700">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="px-3 py-4 first:pl-0 sm:px-6 sm:py-5"
              >
                <p className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                  {stat.value}
                </p>

                <p className="mt-1 text-[11px] leading-5 text-slate-600 dark:text-slate-400 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ABOUT US */}
      <section className="px-6 py-20 sm:px-10 sm:py-24 lg:px-[8%]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <span className="text-[10px] font-bold tracking-[0.25em] text-cyan-700 dark:text-cyan-400 sm:text-xs">
              WHO WE ARE
            </span>

            <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              More than a club.
              <br />
              A{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                community.
              </span>
            </h2>

            <p className="mt-6 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base sm:leading-8">
              The Coders Hub brings together students who are eager to
              learn, build, collaborate, and grow. We believe that the
              best way to understand technology is to experiment with it,
              work with others, and transform ideas into real projects.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base sm:leading-8">
              From developing technical solutions to organizing events
              and creating digital content, our teams work together to
              build an active and welcoming student community.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Code2,
                  title: "Build",
                  description:
                    "Develop practical projects and turn ideas into working solutions.",
                },
                {
                  icon: Users,
                  title: "Collaborate",
                  description:
                    "Work together, exchange knowledge, and learn from one another.",
                },
                {
                  icon: Lightbulb,
                  title: "Innovate",
                  description:
                    "Explore new technologies and approach problems creatively.",
                },
                {
                  icon: Rocket,
                  title: "Grow",
                  description:
                    "Improve technical, communication, and leadership skills.",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-lg dark:border-slate-800 dark:bg-[#0b1422]"
                  >
                    <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-cyan-50 text-cyan-700 transition group-hover:bg-cyan-600 group-hover:text-white dark:bg-cyan-400/10 dark:text-cyan-400">
                      <Icon size={21} />
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>
            {/* MISSION & VISION */}
      <section className="border-y border-slate-200 bg-white px-6 py-20 dark:border-slate-800 dark:bg-[#081321] sm:px-10 sm:py-24 lg:px-[8%]">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="OUR PURPOSE"
            title="Driven by"
            highlight="Purpose"
            description="Our mission and vision guide the way we learn, collaborate, and build the future together."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-slate-200 bg-slate-50 p-7 transition hover:border-cyan-400 sm:p-9 dark:border-slate-800 dark:bg-[#0b1422]">
                <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-cyan-100 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-400">
                  <Target size={27} />
                </div>

                <h3 className="text-2xl font-black text-slate-950 dark:text-white">
                  Our Mission
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                  To create an environment where students can develop
                  technical expertise, work on meaningful projects, share
                  knowledge, and gain practical experience beyond the
                  classroom.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="h-full rounded-3xl border border-slate-200 bg-slate-50 p-7 transition hover:border-blue-400 sm:p-9 dark:border-slate-800 dark:bg-[#0b1422]">
                <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-400/10 dark:text-blue-400">
                  <Eye size={27} />
                </div>

                <h3 className="text-2xl font-black text-slate-950 dark:text-white">
                  Our Vision
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                  To build a community of innovative, confident, and
                  collaborative students who use technology to solve
                  real-world problems and make a positive impact.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="px-6 py-20 sm:px-10 sm:py-24 lg:px-[8%]">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="WHAT WE DO"
            title="Learn. Build."
            highlight="Create."
            description="We provide opportunities for students to explore technology, develop skills, and participate in collaborative activities."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Laptop,
                title: "Technical Workshops",
                description:
                  "Explore programming languages, development tools, and emerging technologies through practical learning.",
              },
              {
                icon: Code2,
                title: "Projects & Development",
                description:
                  "Collaborate on real projects, build applications, and strengthen problem-solving skills.",
              },
              {
                icon: CalendarDays,
                title: "Events & Hackathons",
                description:
                  "Participate in coding competitions, technical events, hackathons, and interactive sessions.",
              },
              {
                icon: Users,
                title: "Peer Learning",
                description:
                  "Share knowledge, discuss challenges, and learn together with fellow students.",
              },
              {
                icon: Sparkles,
                title: "Creative Content",
                description:
                  "Create engaging technical content, event announcements, graphics, and digital media.",
              },
              {
                icon: Globe,
                title: "Community Building",
                description:
                  "Connect students through collaboration, shared interests, and opportunities to grow.",
              },
            ].map((activity, index) => {
              const Icon = activity.icon;

              return (
                <Reveal key={activity.title} delay={(index % 3) * 70}>
                  <article className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-xl dark:border-slate-800 dark:bg-[#0b1422]">
                    <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-cyan-50 text-cyan-700 transition group-hover:bg-cyan-600 group-hover:text-white dark:bg-cyan-400/10 dark:text-cyan-400">
                      <Icon size={23} />
                    </div>

                    <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                      {activity.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                      {activity.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="border-y border-slate-200 bg-white px-6 py-20 dark:border-slate-800 dark:bg-[#081321] sm:px-10 sm:py-24 lg:px-[8%]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="text-[10px] font-bold tracking-[0.25em] text-cyan-700 dark:text-cyan-400 sm:text-xs">
              WHAT WE BELIEVE
            </span>

            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
              Values that
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                move us forward.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base sm:leading-8">
              A strong community grows when people support each other,
              stay curious, and take responsibility for what they create.
              These principles shape our work and culture.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Heart,
                title: "Inclusivity",
                description:
                  "Everyone deserves a welcoming place to learn and contribute.",
              },
              {
                icon: Lightbulb,
                title: "Curiosity",
                description:
                  "We keep exploring, experimenting, and asking questions.",
              },
              {
                icon: Zap,
                title: "Initiative",
                description:
                  "We encourage members to take ownership and turn ideas into action.",
              },
              {
                icon: Terminal,
                title: "Practical Learning",
                description:
                  "We learn by building, testing, sharing, and improving.",
              },
            ].map((value, index) => {
              const Icon = value.icon;

              return (
                <Reveal key={value.title} delay={index * 60}>
                  <div className="h-full rounded-2xl border border-slate-200 p-5 transition hover:border-cyan-400 dark:border-slate-800">
                    <Icon
                      size={24}
                      className="text-cyan-700 dark:text-cyan-400"
                    />

                    <h3 className="mt-4 font-bold text-slate-950 dark:text-white">
                      {value.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {value.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
            {/* CORE TEAM */}
      <section
        id="team"
        className="scroll-mt-24 px-6 py-14 sm:px-10 sm:py-16 lg:px-[8%]"
      >
        <div className="mx-auto mb-8 max-w-7xl">
          <p className="text-[10px] font-bold tracking-[0.25em] text-emerald-600 dark:text-emerald-400 sm:text-xs">
            THE PEOPLE BEHIND TCH
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            Core <span className="text-emerald-500">Team</span>
          </h2>

          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
            Hover over a profile to learn more about our members and explore
            their social links.
          </p>
        </div>

        <div className="mx-auto max-w-7xl">
          {members.filter((member) => member.isActive !== false).length > 0 ? (
            <div className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-5">
              {members
                .filter((member) => member.isActive !== false)
                .map((member, index) => (
                  <div
                    key={member.id}
                    className="w-[250px] flex-none snap-start sm:w-[280px]"
                  >
                    <MemberCard
                      member={member}
                      index={index}
                      teams={teams}
                    />
                  </div>
                ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center dark:border-slate-700">
              <Users
                size={36}
                className="mx-auto text-slate-400"
              />

              <p className="mt-4 font-semibold text-slate-700 dark:text-slate-300">
                Team members will be displayed here soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* JOIN THE COMMUNITY */}
      <section className="px-6 pb-20 pt-10 sm:px-10 sm:pb-24 lg:px-[8%]">
        <Reveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-cyan-200 bg-white px-6 py-12 text-center shadow-sm dark:border-cyan-400/20 dark:bg-[#0b1422] sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative z-10">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-cyan-100 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-400">
                <Rocket size={27} />
              </div>

              <p className="mt-6 text-[10px] font-bold tracking-[0.25em] text-cyan-700 dark:text-cyan-400 sm:text-xs">
                YOUR JOURNEY STARTS HERE
              </p>

              <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                Ready to be part of
                <span className="block bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 bg-clip-text text-transparent">
                  something bigger?
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                Join The Coders Hub, connect with like-minded students,
                explore new technologies, and start building your future.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-6 py-3 font-bold text-white transition hover:-translate-y-1 hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-500"
                >
                  Join TCH
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-bold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
                >
                  Explore Home
                  <Globe size={18} />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}