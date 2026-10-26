import logo from "../../assets/tch-logo.jpeg";

const FEATURES = [
  {
    title: "Discover",
    text: "Events & opportunities",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </>
    ),
  },
  {
    title: "Connect",
    text: "Meet fellow developers",
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    title: "Collaborate",
    text: "Projects & ideas",
    icon: (
      <>
        <line x1="6" x2="6" y1="3" y2="15" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M18 9a9 9 0 0 1-9 9" />
      </>
    ),
  },
  {
    title: "Grow",
    text: "Skills & experience",
    icon: (
      <>
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </>
    ),
  },
];

const gridMask =
  "radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 100%)";

const gridStyle = {
  backgroundImage:
    "radial-gradient(circle at 0 0, rgba(0,207,255,0.18) 1.5px, transparent 2px)," +
    "linear-gradient(rgba(0,100,160,0.06) 1px, transparent 1px)," +
    "linear-gradient(90deg, rgba(0,100,160,0.06) 1px, transparent 1px)",
  backgroundSize: "44px 44px",
  maskImage: gridMask,
  WebkitMaskImage: gridMask,
};

function Logo({ className }) {
  return (
    <img
      src={logo}
      alt="The Coders Hub logo"
      className={`${className} rounded-xl border border-cyan-200 bg-[#0B2342] object-contain`}
    />
  );
}

function FeatureIcon({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export default function AuthBranding() {
  return (
    <div className="relative h-full overflow-hidden border-b border-[#B9CDE8] bg-[#EAF4FC] transition-colors duration-300 lg:border-b-0 lg:border-r lg:border-[#B9CDE8] dark:border-cyan-900/30 dark:bg-[linear-gradient(160deg,#0B1425_0%,#080D19_100%)]">
      {/* TCH grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 dark:opacity-100"
        style={gridStyle}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl dark:bg-[#00CFFF]/15"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-sky-300/25 blur-3xl dark:bg-[#38A8FF]/15"
      />

      {/* Compact branding on mobile and tablet */}
      <div className="relative z-10 flex items-center gap-3 px-5 py-5 sm:px-10 lg:hidden">
        <Logo className="h-11 w-11 shrink-0" />

        <div>
          <p className="text-base font-semibold leading-tight text-[#102B4E] dark:text-white">
            The Coders Hub
          </p>
          <p className="mt-1 text-[10px] font-semibold tracking-[0.28em] text-cyan-700 dark:text-[#00CFFF]">
            BUILD · CONNECT · INNOVATE
          </p>
        </div>
      </div>

      {/* Desktop branding and features */}
      <div className="no-scrollbar relative z-10 hidden h-full overflow-y-auto lg:block">
        <div className="mx-auto flex min-h-full w-full max-w-[42rem] flex-col justify-between gap-8 px-[clamp(1.5rem,3.5vw,3rem)] py-[clamp(1.75rem,6vh,3.5rem)]">
          <header className="flex items-center gap-3.5">
            <Logo className="h-12 w-12 shrink-0" />

            <div>
              <p className="text-base font-semibold leading-tight text-[#102B4E] dark:text-white">
                The Coders Hub
              </p>
              <p className="mt-1.5 text-[10px] font-semibold tracking-[0.28em] text-cyan-700 dark:text-[#00CFFF]">
                BUILD · CONNECT · INNOVATE
              </p>
            </div>
          </header>

          <div>
            <h1 className="text-[length:clamp(1.875rem,4.8vh,2.875rem)] font-semibold leading-[1.15] tracking-tight text-[#102B4E] dark:text-white">
              Think beyond.
              <br />
              <span className="bg-gradient-to-r from-[#009ACB] to-[#2588E8] bg-clip-text text-transparent dark:from-[#00CFFF] dark:to-[#38A8FF]">
                Build what&apos;s next.
              </span>
            </h1>

            <p className="mt-[clamp(1rem,2.8vh,1.75rem)] max-w-[34rem] text-[length:clamp(0.8125rem,1.75vh,0.9375rem)] leading-[1.75] text-[#42638F] dark:text-slate-400">
              Discover opportunities, connect with fellow developers, explore
              technology events, and turn your ideas into real projects. Your
              next big idea starts with the right community.
            </p>

            <ul className="mt-[clamp(1.75rem,5vh,3rem)] grid grid-cols-2 gap-4">
              {FEATURES.map((feature) => (
                <li
                  key={feature.title}
                  className="flex items-center gap-3.5 rounded-2xl border border-[#B9CDE8] bg-white px-4 py-[clamp(0.875rem,2.2vh,1.25rem)] transition duration-300 hover:border-cyan-400 hover:shadow-md hover:shadow-cyan-900/5 dark:border-cyan-900/50 dark:bg-[#0B1425]/80 dark:hover:border-cyan-500/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B2342] text-[#00CFFF]">
                    <FeatureIcon>{feature.icon}</FeatureIcon>
                  </span>

                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-[#102B4E] dark:text-white">
                      {feature.title}
                    </span>
                    <span className="mt-1 block text-xs leading-snug text-[#526D91] dark:text-slate-400">
                      {feature.text}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <footer className="text-xs text-[#607B9E] dark:text-slate-500">
            A community for curious minds and bold ideas.
          </footer>
        </div>
      </div>
    </div>
  );
}
