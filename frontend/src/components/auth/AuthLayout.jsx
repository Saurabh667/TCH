import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useLocation, useOutlet } from "react-router-dom";
import AuthBranding from "./AuthBranding";

const EASE = [0.22, 1, 0.36, 1];
const PANEL_DURATION = 0.75;
const DESKTOP_QUERY = "(min-width: 1024px)";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia(DESKTOP_QUERY).matches
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
  const panelTransition = { duration: PANEL_DURATION, ease: EASE };

  return (
    <MotionConfig reducedMotion="user">
      <div className="no-scrollbar relative flex h-dvh w-full flex-col overflow-x-hidden overflow-y-auto bg-[#080D19] text-white lg:block lg:overflow-hidden">
        {/* Branding panel: left on /login, right on /signup */}
        <motion.aside
          aria-label="About The Coders Hub"
          initial={false}
          animate={{ x: swap ? "100%" : "0%" }}
          transition={panelTransition}
          className="relative z-10 shrink-0 lg:absolute lg:top-0 lg:left-0 lg:h-full lg:w-1/2"
        >
          <AuthBranding />
        </motion.aside>

        {/* Form panel: right on /login, left on /signup */}
        <motion.main
          initial={false}
          animate={{ x: swap ? "-100%" : "0%" }}
          transition={panelTransition}
          className="relative isolate flex-1 lg:absolute lg:top-0 lg:right-0 lg:h-full lg:w-1/2"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(0,207,255,0.08),transparent_70%)]"
          />
          <div className="no-scrollbar lg:h-full lg:overflow-y-auto">
            <div className="flex items-center justify-center px-5 py-10 sm:px-10 lg:min-h-full lg:py-8">
              <div className="w-full max-w-[420px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.45, ease: EASE, delay: 0.1 },
                    }}
                    exit={{ opacity: 0, y: -10, transition: { duration: 0.18 } }}
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