
import { useEffect, useRef } from "react";
import {
  ArrowRight,
  Code2,
  Lightbulb,
  Users,
  Rocket,
  Laptop,
  GitBranch,
  Sparkles,
  Terminal,
  BookOpen,
  Zap,
  Cpu,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Laptop,
    title: "Workshops & Tech Sessions",
    description:
      "Explore new technologies, learn from others and turn knowledge into practical skills.",
  },
  {
    icon: Users,
    title: "Hackathons & Community",
    description:
      "Connect with curious minds, exchange ideas and solve problems together.",
  },
  {
    icon: Code2,
    title: "Projects & Collaboration",
    description:
      "Build meaningful projects with developers who love creating things.",
  },
  {
    icon: Rocket,
    title: "Learn. Experiment. Grow.",
    description:
      "Challenge yourself, discover new tools and bring your ideas to life.",
  },
];

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      element.classList.add("opacity-100", "translate-y-0");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("opacity-100", "translate-y-0");
          observer.unobserve(element);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`translate-y-8 opacity-0 transition-all duration-700 ease-out ${className}`}
    >
      {children}
    </div>
  );
}

function FloatingIcon({ icon: Icon, className = "", delay = "0s" }) {
  return (
    <div
      style={{ animationDelay: delay }}
      className={`absolute z-20 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/30 bg-white/90 text-cyan-600 shadow-[0_0_30px_rgba(0,153,255,0.18)] backdrop-blur-xl animate-[float_4s_ease-in-out_infinite] sm:h-14 sm:w-14 ${className}`}
    >
      <Icon size={25} />
    </div>
  );
}

function LaptopScene() {
  return (
    <div className="relative mx-auto flex min-h-[330px] w-full max-w-[570px] items-center justify-center overflow-hidden sm:min-h-[430px]">
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[90px] sm:h-96 sm:w-96" />

      <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200 [transform:translate(-50%,-50%)_rotateX(65deg)] sm:h-[360px] sm:w-[360px]" />

      <div className="absolute left-1/2 top-1/2 h-[210px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-dashed border-cyan-400/20 [transform:translate(-50%,-50%)_rotateX(65deg)_rotateZ(25deg)] sm:h-[290px] sm:w-[400px] motion-safe:animate-[spin_35s_linear_infinite]" />

      <div className="relative z-10 w-[82%] max-w-[420px] [transform:perspective(1000px)_rotateY(-12deg)_rotateX(5deg)] motion-safe:animate-[float_5s_ease-in-out_infinite]">
        <div className="relative overflow-hidden rounded-t-xl border-2 border-blue-400/70 bg-slate-900 p-2 shadow-[0_0_50px_rgba(0,132,255,0.22)] sm:p-3">
          <div className="overflow-hidden rounded-md border border-blue-300/10 bg-[#030914]">
            <div className="flex items-center gap-1.5 border-b border-blue-200 bg-[#0c192b] px-3 py-2.5">
              <span className="h-2 w-2 rounded-full bg-rose-400" />
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="ml-3 text-[9px] text-slate-500">
                tch.dev / playground
              </span>
            </div>

            <div className="flex gap-3 px-3 py-5 font-mono text-[9px] leading-[2] text-slate-300 sm:gap-5 sm:px-5 sm:py-7 sm:text-xs">
              <div className="flex flex-col text-slate-500">
                {Array.from({ length: 8 }, (_, i) => (
                  <span key={i}>{`0${i + 1}`}</span>
                ))}
              </div>

              <div className="min-w-0">
                <p>
                  <span className="text-purple-400">const</span>{" "}
                  community = {"{"}
                </p>
                <p className="pl-3">
                  <span className="text-sky-400">learn</span>:{" "}
                  <span className="text-emerald-300">true</span>,
                </p>
                <p className="pl-3">
                  <span className="text-sky-400">build</span>:{" "}
                  <span className="text-emerald-300">true</span>,
                </p>
                <p className="pl-3">
                  <span className="text-sky-400">connect</span>:{" "}
                  <span className="text-emerald-300">true</span>,
                </p>
                <p className="pl-3">
                  <span className="text-sky-400">innovate</span>:{" "}
                  <span className="text-emerald-300">true</span>
                </p>
                <p>{"};"}</p>
                <br />
                <p>
                  <span className="text-purple-400">function</span>{" "}
                  <span className="text-yellow-300">createFuture</span>() {"{"}
                </p>
                <p className="pl-3">
                  return <span className="text-emerald-300">"Together"</span>;
                </p>
                <p>{"}"}</p>
                <p className="mt-2 text-cyan-700 dark:text-cyan-400">// The Coders Hub ✦</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative -mt-px h-3 w-[112%] -translate-x-[5%] rounded-b-[50%] border border-blue-300/50 bg-gradient-to-b from-slate-300 via-blue-500 to-slate-800 shadow-[0_12px_22px_rgba(0,119,255,0.2)]">
          <div className="mx-auto h-1 w-[20%] rounded-b-lg bg-slate-700" />
        </div>
      </div>

      <FloatingIcon
        icon={Code2}
        className="left-[3%] top-[23%]"
        delay="-1s"
      />
      <FloatingIcon
        icon={Lightbulb}
        className="right-[12%] top-[8%]"
        delay="-2s"
      />
      <FloatingIcon
        icon={Users}
        className="bottom-[16%] right-[1%]"
        delay="-0.5s"
      />
      <FloatingIcon
        icon={Rocket}
        className="bottom-[10%] left-[12%]"
        delay="-3s"
      />

      <div className="absolute right-1 top-[33%] hidden items-center gap-2 rounded-xl border border-cyan-400/20 bg-white/95 px-3 py-2 text-[10px] text-cyan-800 dark:border-blue-400/20 dark:bg-[#0d1a2d] dark:text-cyan-300 shadow-xl sm:flex">
        <Sparkles size={14} className="text-cyan-400" />
        Ideas into reality
      </div>

      <div className="absolute bottom-[9%] left-0 hidden items-center gap-2 rounded-xl border border-blue-200 bg-white/95 px-3 py-2 text-[10px] text-blue-800 dark:border-blue-400/20 dark:bg-[#0d1a2d] dark:text-blue-300 sm:flex">
        <Terminal size={14} className="text-blue-400" />
        Build something awesome
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-slate-100 text-slate-900 selection:bg-cyan-200 selection:text-slate-900 transition-colors duration-300 dark:bg-[#060c17] dark:text-slate-100 dark:selection:bg-cyan-500 dark:selection:text-white">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes glow {
          0%, 100% { opacity: .35; transform: scale(.95); }
          50% { opacity: .8; transform: scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* HERO */}
      <section className="relative isolate grid items-center gap-4 border-b border-slate-300 px-6 dark:border-blue-400/10 pb-16 pt-14 sm:px-10 lg:min-h-[590px] lg:grid-cols-2 lg:px-[7%] lg:pb-20 lg:pt-16">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_5%_20%,rgba(0,155,255,0.13),transparent_38%),radial-gradient(ellipse_at_80%_50%,rgba(0,75,255,0.12),transparent_38%)]" />

        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(49,151,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(49,151,255,0.045)_1px,transparent_1px)] bg-[size:46px_46px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />

        <div className="relative z-10 mx-auto w-full max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-[10px] font-bold tracking-[0.2em] text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/[0.06] dark:text-cyan-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
            A COMMUNITY FOR BUILDERS
          </div>

          <h1 className="text-5xl font-black leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Think beyond.
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              Build what's next.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-sm leading-7 text-slate-700 sm:text-base sm:leading-8 dark:text-slate-400">
            Discover opportunities, connect with fellow developers, explore
            technology and turn your ideas into real projects. Your next big
            idea starts with the right community.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/about"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3.5 text-sm font-bold text-white shadow-[0_8px_30px_rgba(0,130,255,0.22)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,180,255,0.35)]"
            >
              Explore TCH
              <ArrowRight
                size={17}
                className="transition group-hover:translate-x-1"
              />
            </a>

            <a
              href="/signup"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-800 dark:border-blue-400/30 dark:bg-[#0b1626] dark:text-slate-100 transition hover:-translate-y-1 hover:border-cyan-400/60 hover:bg-cyan-400/[0.06]"
            >
              Join the Community
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex -space-x-2">
              {[Code2, Laptop, Users, Lightbulb].map((Icon, i) => (
                <div
                  key={i}
                  className="grid h-8 w-8 place-items-center rounded-full border-2 border-slate-100 bg-blue-100 text-cyan-700 dark:border-[#060c17] dark:bg-blue-500/20 dark:text-cyan-300"
                >
                  <Icon size={14} />
                </div>
              ))}
            </div>
            Curious minds. Creative builders. Future innovators.
          </div>
        </div>

        <LaptopScene />

        <div className="absolute bottom-0 left-0 flex w-full items-center justify-evenly gap-3 overflow-hidden border-t border-slate-300 bg-slate-100/95 px-3 py-3 text-[9px] font-bold tracking-[0.16em] text-slate-600 dark:border-blue-400/10 dark:bg-[#081321]/90 dark:text-slate-500 sm:text-[10px]">
          <span>CREATIVITY</span>
          <span className="text-cyan-700 dark:text-cyan-400">✳</span>
          <span>CODE</span>
          <span className="text-cyan-700 dark:text-cyan-400">✳</span>
          <span>COLLABORATION</span>
          <span className="hidden text-cyan-400 sm:inline">✳</span>
          <span className="hidden sm:inline">INNOVATION</span>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-b border-slate-300 bg-slate-100 py-4 dark:border-blue-400/10 dark:bg-[#081321]">
        <div className="flex w-max motion-safe:animate-[marquee_32s_linear_infinite]">
          {[0, 1, 2, 3].map((group) => (
            <div
              key={group}
              className="flex shrink-0 items-center gap-7 px-4 text-[10px] font-bold tracking-[0.2em] text-slate-700 dark:text-slate-300 sm:gap-10 sm:text-xs"
            >
              {["BUILD", "EXPLORE", "CREATE", "COLLABORATE", "INNOVATE"].map(
                (word) => (
                  <span key={word} className="whitespace-nowrap">
                    {word}
                    <span className="ml-7 text-cyan-400 sm:ml-10">✳</span>
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      {/* WHAT WE DO */}
      <section className="relative px-6 py-20 sm:px-10 sm:py-24 lg:px-[7%]">
        <div className="pointer-events-none absolute left-1/2 top-24 -z-0 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-600/10 blur-[100px]" />

        <Reveal className="relative mx-auto mb-12 max-w-2xl text-center">
          <span className="text-[10px] font-bold tracking-[0.22em] text-cyan-700 dark:text-cyan-400">
            WHAT WE DO
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Learn. Build. Collaborate.{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Grow.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-700 dark:text-slate-400">
            A place for curious minds to discover their potential and create
            meaningful things through technology.
          </p>
        </Reveal>

        <div className="relative grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;

            return (
              <Reveal key={feature.title} delay={i * 90}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-slate-300 bg-gradient-to-br from-white to-sky-50 p-6 dark:border-blue-400/15 dark:from-[#0d1a2d] dark:to-[#081321] transition duration-300 hover:-translate-y-2 hover:border-cyan-400/45 hover:shadow-[0_20px_50px_rgba(0,110,255,0.1)]">
                  <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition group-hover:bg-cyan-400/20" />

                  <div className="relative mb-6 flex items-center justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-xl border border-blue-200 bg-blue-500/10 text-cyan-700 transition duration-300 dark:text-cyan-300 group-hover:scale-110 group-hover:bg-blue-500/20">
                      <Icon size={24} />
                    </div>
                    <span className="font-mono text-xs text-slate-500">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="relative text-lg font-bold leading-snug text-slate-900 dark:text-slate-100">
                    {feature.title}
                  </h3>

                  <p className="relative mt-3 text-sm leading-6 text-slate-700 dark:text-slate-400">
                    {feature.description}
                  </p>

                  <div className="relative mt-6 flex items-center justify-between border-t border-slate-300 pt-4 text-[10px] dark:border-blue-400/10 font-bold tracking-[0.16em] text-cyan-700 dark:text-cyan-400">
                    <span>KEEP EXPLORING</span>
                    <ArrowRight
                      size={17}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ABOUT */}
      <section className="grid items-center gap-10 px-6 pb-20 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-[9%] lg:pb-28">
        <Reveal>
          <span className="text-[10px] font-bold tracking-[0.22em] text-cyan-700 dark:text-cyan-400">
            A LITTLE ABOUT US
          </span>

          <h2 className="mt-5 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl">
            More than a club.
            <br />
            A{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              community.
            </span>
          </h2>

          <p className="mt-6 max-w-lg text-sm leading-7 text-slate-700 sm:text-base sm:leading-8 dark:text-slate-400">
            The Coders Hub brings together learners, creators and
            problem-solvers who believe in learning by doing. We explore
            technology, share knowledge and turn ambitious ideas into real
            experiences.
          </p>

          <a
            href="/about"
            className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-cyan-400 transition hover:text-cyan-300"
          >
            Get to know us
            <ArrowRight
              size={17}
              className="transition group-hover:translate-x-1"
            />
          </a>
        </Reveal>

        <Reveal>
          <div className="relative mx-auto flex min-h-[330px] w-full max-w-lg items-center justify-center overflow-hidden">
            <div className="absolute h-64 w-64 rounded-full bg-blue-600/15 blur-[80px]" />
            <div className="absolute h-64 w-64 rounded-full border border-blue-300 [transform:rotateX(65deg)] dark:border-blue-400/20 motion-safe:animate-[spin_30s_linear_infinite]" />
            <div className="absolute h-52 w-80 rounded-[50%] border border-dashed border-cyan-400/25 [transform:rotateX(65deg)_rotateZ(35deg)]" />

            <div className="relative z-10 flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-3xl border border-blue-300 bg-gradient-to-br from-blue-100 to-white text-cyan-700 dark:border-blue-400/20 dark:from-blue-500/20 dark:to-[#0b1626] dark:text-cyan-300 shadow-[0_0_55px_rgba(0,132,255,0.2)] motion-safe:animate-[float_4s_ease-in-out_infinite] [transform:rotate(-8deg)]">
              <Code2 size={42} />
              <span className="text-xs font-black tracking-[0.25em]">TCH</span>
            </div>

            {[
              { icon: BookOpen, position: "left-[15%] top-[14%]" },
              { icon: Users, position: "right-[10%] top-[27%]" },
              { icon: Lightbulb, position: "bottom-[13%] right-[23%]" },
              { icon: GitBranch, position: "bottom-[20%] left-[9%]" },
            ].map(({ icon: Icon, position }, i) => (
              <div
                key={i}
                className={`absolute z-20 grid h-12 w-12 place-items-center rounded-xl border border-cyan-300 bg-white text-cyan-700 shadow-lg dark:border-cyan-400/20 dark:bg-[#0d1a2d] dark:text-cyan-300 ${position}`}
              >
                <Icon size={22} />
              </div>
            ))}

            <span className="absolute left-[6%] top-[45%] rounded-lg border border-blue-300 bg-white px-3 py-2 text-[9px] font-bold tracking-widest text-blue-700 dark:border-blue-400/20 dark:bg-[#0d1a2d] dark:text-blue-300">
              COLLABORATE
            </span>
            <span className="absolute right-[5%] bottom-[22%] rounded-lg border border-blue-300 bg-white px-3 py-2 text-[9px] font-bold tracking-widest text-blue-700 dark:border-blue-400/20 dark:bg-[#0d1a2d] dark:text-blue-300">
              INNOVATE
            </span>
          </div>
        </Reveal>
      </section>

      {/* FEATURED PANEL */}
      <Reveal className="mx-4 mb-16 sm:mx-8 lg:mx-[5%] lg:mb-24">
        <section className="relative grid overflow-hidden rounded-3xl border border-slate-300 bg-gradient-to-br from-white via-sky-50 to-blue-50 px-6 dark:border-blue-400/15 dark:from-[#0d1a2d] dark:via-[#0b1626] dark:to-[#081321] py-9 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-14 lg:py-12">
          <div className="pointer-events-none absolute -right-10 -top-20 h-72 w-72 rounded-full bg-blue-500/15 blur-[90px]" />

          <div className="relative z-10">
            <span className="text-[10px] font-bold tracking-[0.22em] text-cyan-700 dark:text-cyan-400">
              THE NEXT CHAPTER
            </span>

            <h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              Your ideas deserve
              <br />
              <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
                to be built.
              </span>
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-700 dark:text-slate-400">
              Explore events, discover new resources and find your next
              opportunity to create something remarkable.
            </p>

            <a
              href="/events"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3.5 text-sm font-bold text-white transition hover:-translate-y-1 hover:shadow-[0_10px_35px_rgba(0,150,255,0.25)]"
            >
              Explore Events <ArrowRight size={17} />
            </a>
          </div>

          <div className="relative flex min-h-[240px] items-center justify-center">
            <div className="absolute h-52 w-52 rounded-full border border-blue-400/25 [transform:rotateX(65deg)] motion-safe:animate-[spin_22s_linear_infinite]" />
            <div className="absolute h-40 w-64 rounded-[50%] border border-dashed border-cyan-400/25 [transform:rotateX(65deg)_rotateZ(35deg)]" />

            <div className="relative z-10 grid h-28 w-28 place-items-center rounded-3xl border border-blue-300 bg-gradient-to-br from-blue-100 to-white text-cyan-700 dark:border-blue-400/20 dark:from-blue-500/20 dark:to-[#0b1626] dark:text-cyan-300 shadow-[0_0_60px_rgba(0,140,255,0.25)] motion-safe:animate-[float_4s_ease-in-out_infinite] [transform:rotateX(10deg)_rotateY(-15deg)_rotateZ(8deg)]">
              <Code2 size={54} />
            </div>

            <div className="absolute left-[15%] top-[16%] grid h-11 w-11 place-items-center rounded-xl border border-blue-300 bg-white text-cyan-700 dark:border-blue-400/20 dark:bg-[#0d1a2d] dark:text-cyan-300">
              <Zap size={22} />
            </div>
            <div className="absolute bottom-[12%] right-[14%] grid h-11 w-11 place-items-center rounded-xl border border-blue-300 bg-white text-cyan-700 dark:border-blue-400/20 dark:bg-[#0d1a2d] dark:text-cyan-300">
              <Globe size={22} />
            </div>
            <div className="absolute right-[12%] top-[12%] grid h-11 w-11 place-items-center rounded-xl border border-blue-300 bg-white text-cyan-700 dark:border-blue-400/20 dark:bg-[#0d1a2d] dark:text-cyan-300">
              <Cpu size={22} />
            </div>
          </div>
        </section>
      </Reveal>

      {/* FINAL CTA */}
      <Reveal>
        <section className="relative isolate overflow-hidden px-6 py-16 text-center sm:py-24">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-[min(90%,600px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/15 blur-[100px]" />

          <span className="text-[10px] font-bold tracking-[0.25em] text-cyan-700 dark:text-cyan-400">
            YOUR MOVE
          </span>

          <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            The future starts
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              with people like you.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-slate-700 dark:text-slate-400 sm:text-base">
            Bring your curiosity. Find your people. Build something that
            matters.
          </p>

          <a
            href="/signup"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 text-sm font-bold text-white shadow-[0_10px_35px_rgba(0,130,255,0.2)] transition hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,180,255,0.3)]"
          >
            Become part of TCH <ArrowRight size={17} />
          </a>
        </section>
      </Reveal>
    </main>
  );
}
