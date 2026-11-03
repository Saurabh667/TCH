import { Link } from "react-router-dom";
import Reveal from "../components/about/Reveal";
import SectionHeading from "../components/about/SectionHeading";
import MemberCard from "../components/about/MemberCard";

import tchImage from "../assets/tch-logo.jpeg";

import {
  ArrowRight,
  Users,
  Rocket,
  Lightbulb,
  Target,
  Eye,
  Globe,
  Heart,
  Terminal,
  Zap,
  Code2,
  Laptop,
  GraduationCap,
  ImagePlus,
} from "lucide-react";

import tchData from "../data/members.json";

const founders = [
  {
    id: 1,
    name: "Raj Singh",
    role: "Founder",
    image: "/teamImg/founders/raj singh.jpeg",
    description:
      "Helped establish The Coders Hub and build a platform where students can explore technology, collaborate, and grow.",
  },
  {
    id: 2,
    name: "Praveen Dubey",
    role: "Founder",
    image: "/teamImg/founders/praveen dubey.jpeg",
    description:
      "Played an important role in building The Coders Hub and shaping its vision as a student-driven technical community.",
  },
];

const values = [
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
];

function PhotoPlaceholder({ label = "Photo coming soon" }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-cyan-600 dark:text-cyan-400">
      <ImagePlus size={30} strokeWidth={1.5} />
      <span className="text-xs">{label}</span>
    </div>
  );
}

export default function About() {
  const teams = tchData.teams || [];
  const members = tchData.members || [];

  const activeMembers = members.filter(
    (member) => member.isActive !== false
  );

  const teamLeadCount = members.filter((member) =>
    /lead/i.test(member.position || "")
  ).length;

  const stats = [
    {
      value: teams.length.toString().padStart(2, "0"),
      label: "Teams",
    },
    {
      value: teamLeadCount.toString().padStart(2, "0"),
      label: "Leadership Roles",
    },
  ];

  return (
    <main className="about-page-bg relative isolate min-h-screen overflow-hidden text-slate-900 transition-colors duration-300 dark:text-white">

      <style>{`
        /* =====================================
           ABOUT PAGE - LIGHT MODE
        ===================================== */
        .about-page-bg {
          background-color: #f4f8fc;
          background-image:
            radial-gradient(circle at 8% 12%, rgba(0, 170, 220, 0.09) 0, transparent 220px),
            radial-gradient(circle at 24% 38%, rgba(0, 120, 255, 0.06) 0, transparent 200px),
            radial-gradient(circle at 46% 17%, rgba(0, 170, 220, 0.07) 0, transparent 220px),
            radial-gradient(circle at 72% 29%, rgba(0, 120, 255, 0.06) 0, transparent 230px),
            radial-gradient(circle at 91% 48%, rgba(0, 170, 220, 0.07) 0, transparent 210px),
            linear-gradient(145deg, #f4f8fc 0%, #eaf2fa 48%, #f7faff 100%);
          color: #102b4e;
        }

        /* =====================================
           ABOUT PAGE - DARK MODE
        ===================================== */
        .dark .about-page-bg {
          background-color: #050b14;
          background-image:
            radial-gradient(circle at 8% 12%, rgba(0, 207, 255, 0.15) 0, transparent 260px),
            radial-gradient(circle at 24% 38%, rgba(0, 207, 255, 0.15) 0, transparent 230px),
            radial-gradient(circle at 46% 17%, rgba(0, 207, 255, 0.15) 0, transparent 250px),
            radial-gradient(circle at 72% 29%, rgba(0, 207, 255, 0.15) 0, transparent 280px),
            radial-gradient(circle at 91% 48%, rgba(0, 207, 255, 0.15) 0, transparent 250px),
            radial-gradient(circle at 14% 76%, rgba(0, 207, 255, 0.15) 0, transparent 240px),
            radial-gradient(circle at 58% 83%, rgba(0, 207, 255, 0.15) 0, transparent 270px),
            radial-gradient(circle at 86% 91%, rgba(0, 207, 255, 0.15) 0, transparent 230px),
            linear-gradient(145deg, #050b14 0%, #071322 48%, #050b14 100%);
          color: #f8fafc;
        }

        /* =====================================
           LOGO FLOATING ANIMATION
        ===================================== */
        .about-logo-float {
          animation: aboutLogoFloat 4.5s ease-in-out infinite;
          will-change: transform;
        }

        /* =====================================
           LOGO BORDER + SUBTLE CYAN GLOW
        ===================================== */
        .about-logo-frame {
          position: relative;
          isolation: isolate;
          padding: 2px;
          border-radius: 1.8rem;

          background: linear-gradient(
            135deg,
            #00cfff,
            #087cff,
            #00cfff
          );

          background-size: 200% 200%;

          box-shadow:
            0 0 5px rgba(0, 207, 255, 0.55),
            0 0 14px rgba(0, 170, 255, 0.28),
            0 0 26px rgba(0, 130, 255, 0.12);

          animation: aboutBorderFlow 5s ease-in-out infinite;
        }

        /* Subtle glow on all four sides */
        .about-logo-frame::before {
          content: "";
          position: absolute;
          inset: -12px;
          z-index: -1;
          border-radius: 2rem;

          background: radial-gradient(
            ellipse at center,
            rgba(0, 180, 255, 0.13) 0%,
            rgba(0, 130, 255, 0.055) 45%,
            transparent 72%
          );

          filter: blur(16px);
          pointer-events: none;
        }

        .about-logo-frame img {
          display: block;
          width: 100%;
          border-radius: calc(1.8rem - 2px);
        }

        @keyframes aboutLogoFloat {
          0%, 100% {
            transform: translateY(-34px);
          }

          50% {
            transform: translateY(-46px);
          }
        }

        @keyframes aboutBorderFlow {
          0%, 100% {
            background-position: 0% 50%;
          }

          50% {
            background-position: 100% 50%;
          }
        }

        /* Mobile animation */
        @media (max-width: 767px) {
          .about-logo-float {
            animation: aboutLogoFloatMobile 4.5s ease-in-out infinite;
          }

          @keyframes aboutLogoFloatMobile {
            0%, 100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-8px);
            }
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .about-logo-float,
          .about-logo-frame {
            animation: none;
          }

          .about-logo-float {
            transform: none;
          }
        }

        /* =====================================
           SHARED DETAILS
        ===================================== */
        .about-gradient-text {
          background: linear-gradient(
            100deg,
            #ffffff 0%,
            #4de5ff 42%,
            #168bff 100%
          );

          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Dark panels */
        .about-panel {
          background: linear-gradient(
            135deg,
            rgba(11, 23, 40, 0.94),
            rgba(5, 11, 20, 0.96)
          );

          box-shadow:
            0 18px 55px rgba(0, 0, 0, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.025);
        }

        .about-soft-glow {
          text-shadow: 0 0 28px rgba(0, 207, 255, 0.13);
        }

        /* =====================================
           LIGHT THEME TEXT
        ===================================== */
        html:not(.dark) .about-page-bg h1,
        html:not(.dark) .about-page-bg h2,
        html:not(.dark) .about-page-bg h3,
        html:not(.dark) .about-page-bg h4 {
          color: #102b4e;
        }

        html:not(.dark) .about-page-bg .text-white:not(.about-gradient-text) {
          color: #102b4e;
        }

        html:not(.dark) .about-page-bg .text-slate-300,
        html:not(.dark) .about-page-bg .text-slate-400 {
          color: #52677f;
        }

        html:not(.dark) .about-page-bg .text-cyan-400,
        html:not(.dark) .about-page-bg .text-cyan-500 {
          color: #007fa8;
        }

        html:not(.dark) .about-page-bg .about-gradient-text {
          background: linear-gradient(
            100deg,
            #102b4e 0%,
            #008eae 48%,
            #176fe5 100%
          );

          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        /* Light mode cards */
        html:not(.dark) .about-page-bg .about-panel {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.97),
            rgba(235, 244, 252, 0.97)
          );

          border-color: rgba(20, 105, 150, 0.18);

          box-shadow:
            0 18px 45px rgba(16, 43, 78, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        html:not(.dark) .about-page-bg .border-slate-700,
        html:not(.dark) .about-page-bg .border-slate-800 {
          border-color: rgba(16, 73, 112, 0.18);
        }

        html:not(.dark) .about-page-bg .divide-slate-700 > :not([hidden]) ~ :not([hidden]) {
          border-color: rgba(16, 73, 112, 0.18);
        }

        html:not(.dark) .about-page-bg [class~="bg-[#101e30]"] {
          background-color: #e5eff8;
        }

        html:not(.dark) .about-page-bg .text-white.bg-cyan-500,
        html:not(.dark) .about-page-bg a.bg-cyan-500,
        html:not(.dark) .about-page-bg a.bg-cyan-600 {
          color: #ffffff;
        }

        /* Dark mode panels */
        .dark .about-page-bg .about-panel {
          background: linear-gradient(
            135deg,
            rgba(11, 23, 40, 0.94),
            rgba(5, 11, 20, 0.96)
          );
        }

        /* Team member names - Always White in Both Themes */
#team h3 {
  color: #ffffff !important;
}
  /* Bright Cyan Borders */
#founders article,
.about-page-bg section .about-panel {
  border: 1px solid #00cfff !important;
}

/* Slightly brighter on hover */
#founders article:hover,
.about-page-bg section .about-panel:hover {
  border-color: #00e5ff !important;
  box-shadow: 0 0 12px rgba(0, 207, 255, 0.18);
}
      `}</style>

      {/* =====================================
          INTRODUCTION
      ===================================== */}
      <section className="border-b border-cyan-400/15 bg-transparent px-6 py-10 sm:px-10 sm:py-12 lg:px-[8%]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[0.8fr_1.2fr] lg:gap-14">

          <Reveal>
            <div className="about-logo-float mx-auto w-full max-w-[340px]">
              <div className="about-logo-frame">
                <img
                  src={tchImage}
                  alt="The Coders Hub"
                  className="aspect-[4/3] w-full rounded-3xl object-cover"
                />
              </div>

              <p className="mt-4 text-center text-sm font-bold tracking-wide text-cyan-400">
                Learn. Build. Innovate.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="max-w-3xl">

              <div className="mb-4 flex items-center gap-3">
                <span className="h-6 w-1 rounded-full bg-cyan-500" />

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 sm:text-sm">
                  Bundelkhand University · CSE Department
                </p>
              </div>

              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                About{" "}
                <span className="about-gradient-text">
                  The Coders Hub.
                </span>
              </h1>

              <p className="mt-6 text-sm leading-8 text-slate-300 sm:text-base">
                The Coders Hub (TCH) is a student-driven technical
                club of the Computer Science and Engineering
                Department at Bundelkhand University, Jhansi.
                The club operates under the guidance of our
                Head of Department, Dr. Priyanka Pande.
              </p>

              <p className="mt-4 text-sm leading-8 text-slate-300 sm:text-base">
                TCH brings together students who share an interest
                in technology, programming, innovation, and
                software development. It provides a platform to
                explore new ideas, exchange knowledge, and gain
                experiences beyond the classroom.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-cyan-400"
                >
                  Join TCH
                  <ArrowRight size={17} />
                </Link>

                <a
                  href="#founders"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-sm font-bold text-white transition hover:border-cyan-300/70 hover:shadow-[0_12px_40px_rgba(0,207,255,0.10)]"
                >
                  Meet Our Founders
                  <Users size={17} />
                </a>
              </div>

              <div className="mt-8 grid max-w-md grid-cols-2 divide-x divide-slate-700 border-y border-slate-700">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="px-5 py-4 first:pl-0"
                  >
                    <p className="text-3xl font-black text-white">
                      {stat.value}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================
          FACULTY GUIDANCE
      ===================================== */}
      <section className="px-6 py-10 sm:px-10 sm:py-12 lg:px-[8%]">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-cyan-400/20 about-panel">

              <div className="grid items-center gap-4 md:grid-cols-[0.7fr_1.3fr]">

                <div className="p-6 sm:p-8">
                  <div className="relative mx-auto h-[260px] w-[210px] overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#101e30]">

                    <PhotoPlaceholder label="Faculty Photograph" />

                    <img
                      src="/teamImg/faculty/hod%20priyanka%20maam.jpeg"
                      alt="Dr. Priyanka Pande"
                      className="relative z-10 h-full w-full object-cover object-top"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                </div>

                <div className="px-6 pb-8 sm:px-8 sm:py-8 md:pl-2">

                  <p className="text-xs font-bold tracking-[0.25em] text-cyan-400">
                    FACULTY GUIDANCE
                  </p>

                  <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
                    Guided by{" "}
                    <span className="about-gradient-text">
                      Experience.
                    </span>
                  </h2>

                  <h3 className="mt-5 text-xl font-bold text-white sm:text-2xl">
                    Dr. Priyanka Pande
                  </h3>

                  <p className="mt-2 text-sm font-semibold text-cyan-400">
                    Head of Department · CSE
                  </p>

                  <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-400 sm:text-base">
                    The Coders Hub has been established under
                    the guidance of Dr. Priyanka Pande, Head
                    of the Department of Computer Science and
                    Engineering, Bundelkhand University. Her
                    guidance and support provide the club with
                    an academic foundation to encourage students
                    towards technical learning, innovation,
                    and collaboration.
                  </p>

                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================
          TECHNICAL COMMUNITY
      ===================================== */}
      <section className="px-6 py-8 sm:px-10 sm:py-10 lg:px-[8%]">
        <div className="mx-auto max-w-7xl">

          <SectionHeading
            eyebrow="BEYOND THE CLASSROOM"
            title="A Space for"
            highlight="Technology"
            description="A community built around curiosity, technical exploration, and the desire to create something meaningful."
          />

          <div className="grid gap-6 md:grid-cols-2">

            <Reveal>
              <div className="h-full rounded-3xl border border-cyan-400/15 about-panel p-7 sm:p-9">

                <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-400">
                  <Code2 size={27} />
                </div>

                <h3 className="text-2xl font-black text-white">
                  Explore Technology
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  Technology is constantly evolving. TCH encourages
                  students to explore programming, web development,
                  artificial intelligence, emerging tools, and other
                  areas of computer science.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="h-full rounded-3xl border border-cyan-400/15 about-panel p-7 sm:p-9">

                <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-400">
                  <Laptop size={27} />
                </div>

                <h3 className="text-2xl font-black text-white">
                  Build With Purpose
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  Technical knowledge becomes meaningful when
                  applied. Students are encouraged to experiment,
                  develop solutions, work on projects, and turn
                  concepts into practical implementations.
                </p>
              </div>
            </Reveal>

          </div>

          <Reveal delay={150}>
            <div className="mt-6 rounded-3xl border border-cyan-400/20 about-panel p-7 sm:p-8">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-cyan-500 text-white">
                  <GraduationCap size={29} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">
                    Learn Together. Grow Together.
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    We believe that sharing knowledge, collaborating
                    with peers, and learning from different perspectives
                    helps students become better developers and
                    problem-solvers.
                  </p>
                </div>

              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* =====================================
          FOUNDERS
      ===================================== */}
      <section
        id="founders"
        className="scroll-mt-24 border-y border-cyan-400/15 bg-transparent px-6 py-12 sm:px-10 sm:py-14 lg:px-[8%]"
      >
        <div className="mx-auto max-w-7xl">

          <SectionHeading
            eyebrow="THE PEOPLE WHO STARTED IT"
            title="Meet Our"
            highlight="Founders"
            description="The individuals behind the vision and foundation of The Coders Hub."
          />

          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">

            {founders.map((founder, index) => (
              <Reveal key={founder.id} delay={index * 100}>

                <article className="group overflow-hidden rounded-2xl border border-cyan-400/15 about-panel transition hover:-translate-y-1 hover:border-cyan-300/70 hover:shadow-[0_12px_40px_rgba(0,207,255,0.10)] hover:shadow-lg">

                  <div className="relative mx-auto mt-5 h-52 w-44 overflow-hidden rounded-xl border border-cyan-400/20 bg-[#101e30]">

                    <PhotoPlaceholder />

                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="relative z-10 h-full w-full object-cover object-top"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>

                  <div className="p-5 text-center">

                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                      {founder.role}
                    </p>

                    <h3 className="mt-2 text-xl font-black text-white">
                      {founder.name}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {founder.description}
                    </p>

                  </div>
                </article>

              </Reveal>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================
          MISSION & VISION
      ===================================== */}
      <section className="px-6 py-12 sm:px-10 sm:py-14 lg:px-[8%]">
        <div className="mx-auto max-w-7xl">

          <SectionHeading
            eyebrow="OUR PURPOSE"
            title="Driven by"
            highlight="Purpose"
            description="Our mission and vision guide the way we learn, collaborate, and build the future together."
          />

          <div className="grid gap-6 md:grid-cols-2">

            <Reveal>
              <div className="h-full rounded-3xl border border-cyan-400/15 about-panel p-7 transition hover:border-cyan-300/70 hover:shadow-[0_12px_40px_rgba(0,207,255,0.10)] sm:p-9">

                <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-400">
                  <Target size={27} />
                </div>

                <h3 className="text-2xl font-black text-white">
                  Our Mission
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
                  To create an environment where students can develop
                  technical expertise, work on meaningful projects,
                  share knowledge, and gain practical experience
                  beyond the classroom.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="h-full rounded-3xl border border-cyan-400/15 about-panel p-7 transition hover:border-cyan-300/70 hover:shadow-[0_12px_40px_rgba(0,207,255,0.10)] sm:p-9">

                <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-400">
                  <Eye size={27} />
                </div>

                <h3 className="text-2xl font-black text-white">
                  Our Vision
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
                  To build a community of innovative, confident,
                  and collaborative students who use technology
                  to solve real-world problems and make a
                  positive impact.
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* =====================================
          OUR VALUES
      ===================================== */}
      <section className="border-y border-cyan-400/15 bg-transparent px-6 py-12 sm:px-10 sm:py-14 lg:px-[8%]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">

          <Reveal>
            <span className="text-xs font-bold tracking-[0.25em] text-cyan-400">
              WHAT WE BELIEVE
            </span>

            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              Values that
              <br />
              <span className="about-gradient-text">
                move us forward.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-8 text-slate-400 sm:text-base">
              A strong community grows when people support each
              other, stay curious, and take responsibility for
              what they create. These principles shape our work
              and culture.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">

            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <Reveal key={value.title} delay={index * 60}>
                  <div className="h-full rounded-2xl border border-cyan-400/15 about-panel p-6 transition hover:-translate-y-1 hover:border-cyan-300/70 hover:shadow-[0_12px_40px_rgba(0,207,255,0.10)]">

                    <Icon
                      size={25}
                      className="text-cyan-400"
                    />

                    <h3 className="mt-4 font-bold text-white">
                      {value.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {value.description}
                    </p>

                  </div>
                </Reveal>
              );
            })}

          </div>
        </div>
      </section>

      {/* =====================================
          CORE TEAM
      ===================================== */}
      <section
        id="team"
        className="scroll-mt-24 px-6 py-12 sm:px-10 sm:py-14 lg:px-[8%]"
      >
        <div className="mx-auto mb-8 max-w-7xl">

          <p className="text-xs font-bold tracking-[0.25em] text-cyan-400">
            THE PEOPLE BEHIND TCH
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Core <span className="about-gradient-text">Team</span>
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
            Hover over a profile to learn more about our members
            and explore their social links.
          </p>
        </div>

        <div className="mx-auto max-w-7xl">

          {activeMembers.length > 0 ? (
            <div className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-5">

              {activeMembers.map((member, index) => (
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
            <div className="rounded-2xl border border-dashed border-slate-700 px-6 py-12 text-center">

              <Users
                size={36}
                className="mx-auto text-cyan-400"
              />

              <p className="mt-4 font-semibold text-slate-300">
                Team members will be displayed here soon.
              </p>

            </div>
          )}

        </div>
      </section>

      {/* =====================================
          JOIN TCH
      ===================================== */}
      <section className="px-6 pb-14 pt-4 sm:px-10 sm:pb-16 lg:px-[8%]">
        <Reveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-cyan-400/20 about-panel px-6 py-12 text-center sm:px-12 sm:py-14">

            <div className="pointer-events-none absolute -right-16 -top-20 h-24 w-24 rounded-full bg-cyan-400/5 blur-2xl" />

            <div className="pointer-events-none absolute -bottom-20 -left-16 h-24 w-24 rounded-full bg-cyan-400/5 blur-2xl" />

            <div className="relative z-10">

              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-400">
                <Rocket size={27} />
              </div>

              <p className="mt-6 text-xs font-bold tracking-[0.25em] text-cyan-400">
                YOUR JOURNEY STARTS HERE
              </p>

              <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Be a part of
                <span className="mt-2 block about-gradient-text">
                  The Coders Hub.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Connect with fellow developers, explore new
                technologies, share ideas, and make your
                journey in tech more meaningful.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">

                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-bold text-white transition hover:-translate-y-1 hover:bg-cyan-400"
                >
                  Join TCH
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 font-bold text-white transition hover:border-cyan-300/70 hover:shadow-[0_12px_40px_rgba(0,207,255,0.10)]"
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