
import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useLocation, useOutlet } from "react-router-dom";
import AuthBranding from "./AuthBranding";

const EASE = [0.22, 1, 0.36, 1];
const PANEL_DURATION = 0.75;
const DESKTOP_QUERY = "(min-width: 1024px)";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(DESKTOP_QUERY).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event) => setIsDesktop(event.matches);

    setIsDesktop(mql.matches);
    mql.addEventListener("change", onChange);

    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
}

export default function AuthLayout() {
  const location = useLocation();
  const outlet = useOutlet();
  const isDesktop = useIsDesktop();

  const isSignup = location.pathname.startsWith("/signup");
  const swap = isDesktop && isSignup;

  const panelTransition = {
    duration: PANEL_DURATION,
    ease: EASE,
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="no-scrollbar relative flex h-dvh w-full flex-col overflow-x-hidden overflow-y-auto bg-[#EAF4FC] text-[#102B4E] transition-colors duration-300 dark:bg-[#080D19] dark:text-slate-100 lg:block lg:overflow-hidden">

        {/* Branding panel */}
        <motion.aside
          aria-label="About The Coders Hub"
          initial={false}
          animate={{ x: swap ? "100%" : "0%" }}
          transition={panelTransition}
          className="relative z-10 shrink-0 lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2"
        >
          <AuthBranding />
        </motion.aside>

        {/* Form panel */}
        <motion.main
          initial={false}
          animate={{ x: swap ? "-100%" : "0%" }}
          transition={panelTransition}
          className="relative isolate flex-1 bg-[#EAF4FC] text-[#102B4E] transition-colors duration-300 dark:bg-[#080D19] dark:text-slate-100 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"
        >
          {/* Subtle TCH cyan glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,207,255,0.12),transparent_70%)]"
          />

          <div className="no-scrollbar lg:h-full lg:overflow-y-auto">
            <div className="flex min-h-full items-center justify-center px-5 py-8 sm:px-10 lg:px-8 lg:py-8 xl:px-12">

              {/* No extra outer card */}
              <div className="w-full max-w-[620px] text-[#102B4E] transition-colors duration-300 dark:text-slate-100">

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.45,
                        ease: EASE,
                        delay: 0.1,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      transition: { duration: 0.18 },
                    }}
                  >
                    {outlet}
                  </motion.div>
                </AnimatePresence>

              </div>
            </div>
          </div>
        </motion.main>
      </div>
    </MotionConfig>
  );
}
