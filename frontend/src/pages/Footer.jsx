
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Mail,
  MapPin,
} from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "../assets/tch-logo.jpeg";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Events", path: "/events" },
  { name: "Announcements", path: "/announcements" },
  { name: "Resources", path: "/resources" },
  { name: "Gallery", path: "/gallery" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-cyan-400/15 bg-[#050b14] text-slate-300">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-blue-600/10 blur-[100px]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:px-10 md:grid-cols-2 lg:grid-cols-4 lg:px-12">
        {/* BRAND */}
        <div>
          <Link to="/" className="inline-flex items-center gap-4">
            <img
              src={logo}
              alt="The Coders Hub logo"
              className="h-16 w-16 rounded-xl object-contain"
            />

            <div>
              <h2 className="text-3xl font-black tracking-tight text-white">
                TCH
              </h2>
              <p className="text-[10px] font-bold tracking-[0.2em] text-slate-400">
                THE CODERS HUB
              </p>
            </div>
          </Link>

          <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
            A community for curious minds, creative builders and future
            innovators. Learn, connect and build something meaningful.
          </p>

          {/* SOCIAL LINKS */}
          <div className="mt-5 flex gap-3">
            <a
              href="https://www.instagram.com/thecodershub_/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-11 w-11 place-items-center rounded-xl border border-slate-700 bg-white/[0.03] transition hover:-translate-y-1 hover:border-pink-400/50"
            >
              <FaInstagram
                size={23}
                className="text-[#E4405F] transition-transform hover:scale-110"
              />
            </a>

            <a
              href="https://www.linkedin.com/in/the-coders-hub-club-41354a362/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid h-11 w-11 place-items-center rounded-xl border border-slate-700 bg-white/[0.03] transition hover:-translate-y-1 hover:border-blue-400/50"
            >
              <FaLinkedin
                size={23}
                className="text-[#0A66C2] transition-transform hover:scale-110"
              />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="mb-5 text-sm font-bold text-white">
            Quick Links
          </h3>

          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="group inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-cyan-400"
                >
                  {link.name}
                  <ArrowUpRight
                    size={13}
                    className="opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COMMUNITY */}
        <div>
          <h3 className="mb-5 text-sm font-bold text-white">
            Our Community
          </h3>

          <p className="text-sm leading-7 text-slate-400">
            Great ideas begin with curious people. Join TCH to explore
            technology, collaborate on projects and keep learning.
          </p>

          <Link
            to="/signup"
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-400 transition hover:gap-3"
          >
            Join the community
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="mb-5 text-sm font-bold text-white">
            Get in Touch
          </h3>

          <a
            href="mailto:thecodershub.bu@gmail.com"
            className="flex items-start gap-3 text-sm leading-6 text-slate-400 transition hover:text-cyan-400"
          >
            <Mail size={18} className="mt-1 shrink-0 text-cyan-400" />
            <span>
              Have a question or collaboration idea?
              <br />
              thecodershub.bu@gmail.com
            </span>
          </a>

          <div className="mt-4 flex items-start gap-3 text-sm leading-6 text-slate-400">
            <MapPin size={18} className="mt-1 shrink-0 text-cyan-400" />
            <span>
              Bundelkhand University,
              <br />
              Jhansi, Uttar Pradesh, India
            </span>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="relative border-t border-slate-800/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-xs text-slate-500 sm:px-10 md:flex-row md:items-center md:justify-between lg:px-12">
          <p>
            © {new Date().getFullYear()} The Coders Hub. All rights reserved.
          </p>

          <p>
            Made with <span className="text-cyan-400">♥</span> by the TCH community.
          </p>
        </div>
      </div>
    </footer>
  );
}
