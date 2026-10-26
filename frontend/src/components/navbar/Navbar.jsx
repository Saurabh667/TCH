
// import { useEffect, useState } from "react";
// import { Link, NavLink, useLocation } from "react-router-dom";
// import { Menu, X, ArrowUpRight, UserRound } from "lucide-react";
// import logo from "../../assets/tch-logo.jpeg";
// import ThemeToggle from "../common/ThemeToggle";

// const navLinks = [
// { name: "Home", path: "/" },
// { name: "About", path: "/about" },
// { name: "Events", path: "/events" },
// { name: "Announcements", path: "/announcements" },
// { name: "Resources", path: "/resources" },
// { name: "Gallery", path: "/gallery" },
// ];

// export default function Navbar() {
// const [menuOpen, setMenuOpen] = useState(false);

// const [isLoggedIn, setIsLoggedIn] = useState(
// () =>
// Boolean(
// localStorage.getItem("access") ||
// sessionStorage.getItem("access")
// )
// );

// const location = useLocation();

// useEffect(() => {
// setMenuOpen(false);
// }, [location.pathname]);

// useEffect(() => {
//   const syncAuth = () => {
//     setIsLoggedIn(
//       Boolean(
//         localStorage.getItem("access") ||
//           sessionStorage.getItem("access")
//       )
//     );
//   };

//   window.addEventListener("storage", syncAuth);
//   window.addEventListener("auth-change", syncAuth);

//   return () => {
//     window.removeEventListener("storage", syncAuth);
//     window.removeEventListener("auth-change", syncAuth);
//   };
// }, []);

// useEffect(() => {
// setIsLoggedIn(
// Boolean(
// localStorage.getItem("access") ||
// sessionStorage.getItem("access")
// )
// );
// }, [location.pathname]);

// const navLinkClass = ({ isActive }) =>
// `relative whitespace-nowrap py-2 text-sm font-semibold
//     transition-colors duration-200
//     after:absolute after:bottom-0 after:left-0 after:h-0.5
//     after:bg-cyan-600 after:transition-all after:duration-300
//     ${
//       isActive
//         ? "text-cyan-700 after:w-full dark:text-cyan-400"
//         : "text-slate-700 after:w-0 hover:text-cyan-700 hover:after:w-full dark:text-slate-300 dark:hover:text-cyan-400"
//     }`;

// const loginButton = isLoggedIn ? ( <Link
//    to="/profile"
//    aria-label="My profile"
//    title="My profile"
//    className="inline-flex h-11 w-11 items-center justify-center
//      rounded-xl border border-slate-200 bg-white
//      text-slate-800 shadow-sm transition duration-200
//      hover:border-cyan-600 hover:bg-cyan-50 hover:text-cyan-700
//      focus-visible:outline-none focus-visible:ring-2
//      focus-visible:ring-cyan-600
//      dark:border-slate-700 dark:bg-slate-900
//      dark:text-white dark:hover:border-cyan-400
//      dark:hover:bg-cyan-400/10 dark:hover:text-cyan-300"
//  > <UserRound size={22} /> </Link>
// ) : ( <Link
//    to="/login"
//    className="group inline-flex items-center justify-center
//      gap-2 rounded-xl bg-slate-900 px-5 py-3
//      text-sm font-semibold text-white shadow-sm
//      transition duration-200 hover:bg-cyan-700
//      focus-visible:outline-none focus-visible:ring-2
//      focus-visible:ring-cyan-600
//      dark:border dark:border-cyan-400/30
//      dark:bg-cyan-400/10 dark:text-cyan-300
//      dark:hover:bg-cyan-400/20"
//  >
// Login <ArrowUpRight
//      size={17}
//      className="transition-transform
//        group-hover:-translate-y-0.5
//        group-hover:translate-x-0.5"
//    /> </Link>
// );

// return ( <header
//    className="sticky top-0 z-50 border-b
//      border-slate-200 bg-white/95 text-slate-900
//      shadow-sm backdrop-blur-xl
//      transition-colors duration-300
//      dark:border-slate-800/80
//      dark:bg-[#070B14]/95 dark:text-white"
//  > <nav
//      className="mx-auto flex min-h-[80px] max-w-[1600px]
//        items-center justify-between gap-6
//        px-5 sm:px-8 lg:px-12"
//    >
// {/* Brand */} <Link
//        to="/"
//        className="group flex shrink-0 items-center gap-3"
//        aria-label="The Coders Hub home"
//      > <img
//          src={logo}
//          alt="The Coders Hub logo"
//          className="h-12 w-12 rounded-xl border
//            border-slate-200 object-cover
//            dark:border-slate-700"
//        />


//       <div className="leading-tight">
//         <h1
//           className="text-[25px] font-extrabold
//             tracking-tight text-slate-950 dark:text-white"
//         >
//           TCH
//         </h1>

//         <p
//           className="mt-1 text-[10px] font-bold
//             tracking-[0.19em] text-slate-600
//             dark:text-slate-400"
//         >
//           THE CODERS HUB
//         </p>
//       </div>
//     </Link>

//     {/* Desktop navigation */}
//     <div className="hidden items-center gap-5 lg:flex xl:gap-7">
//       {navLinks.map((link) => (
//         <NavLink
//           key={link.path}
//           to={link.path}
//           end={link.path === "/"}
//           className={navLinkClass}
//         >
//           {link.name}
//         </NavLink>
//       ))}
//     </div>

//     {/* Desktop actions */}
//     <div className="hidden shrink-0 items-center gap-3 lg:flex">
//       {loginButton}
//       <ThemeToggle />
//     </div>

//     {/* Mobile actions */}
//     <div className="flex items-center gap-2 lg:hidden">
//       <ThemeToggle />

//       <button
//         type="button"
//         onClick={() => setMenuOpen((prev) => !prev)}
//         aria-label={menuOpen ? "Close menu" : "Open menu"}
//         aria-expanded={menuOpen}
//         className="flex h-10 w-10 items-center
//           justify-center rounded-xl border
//           border-slate-200 bg-white text-slate-800
//           transition hover:border-cyan-600
//           dark:border-slate-700 dark:bg-slate-900
//           dark:text-white dark:hover:border-cyan-400"
//       >
//         {menuOpen ? <X size={21} /> : <Menu size={21} />}
//       </button>
//     </div>
//   </nav>

//   {/* Mobile menu */}
//   <div
//     className={`overflow-hidden border-t
//       transition-all duration-300 lg:hidden
//       ${
//         menuOpen
//           ? "max-h-[520px] border-slate-200 opacity-100 dark:border-slate-800"
//           : "max-h-0 border-transparent opacity-0"
//       }`}
//   >
//     <div
//       className="space-y-1 bg-white px-5 py-4
//         sm:px-8 dark:bg-[#070B14]"
//     >
//       {navLinks.map((link) => (
//         <NavLink
//           key={link.path}
//           to={link.path}
//           end={link.path === "/"}
//           className={({ isActive }) =>
//             `block rounded-lg px-4 py-3
//             text-sm font-semibold transition ${
//               isActive
//                 ? "bg-cyan-50 text-cyan-800 dark:bg-cyan-400/10 dark:text-cyan-300"
//                 : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
//             }`
//           }
//         >
//           {link.name}
//         </NavLink>
//       ))}

//       <div className="flex justify-start pt-3">
//         {loginButton}
//       </div>
//     </div>
//   </div>
// </header>


// );
// }



import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight, UserRound } from "lucide-react";
import logo from "../../assets/tch-logo.jpeg";
import ThemeToggle from "../common/ThemeToggle";

const publicLinks = [
{ name: "Home", path: "/" },
{ name: "About", path: "/about" },
{ name: "Events", path: "/events" },
{ name: "Announcements", path: "/announcements" },
{ name: "Resources", path: "/resources" },
{ name: "Gallery", path: "/gallery" },
];

const adminLinks = [
{ name: "Admin Dashboard", path: "/admin/dashboard" },
{ name: "Manage Members", path: "/admin/members" },
{ name: "Manage Core Team", path: "/admin/core-team" },
];

const teamLinks = [
{ name: "Team Dashboard", path: "/team/dashboard" },
{ name: "Manage Events", path: "/team/events" },
{ name: "Manage Announcements", path: "/team/announcements" },
];

const memberLinks = [
{ name: "My Applications", path: "/my-applications" },
];

const hasAccessToken = () =>
Boolean(
localStorage.getItem("access") ||
sessionStorage.getItem("access")
);

const getStoredUser = () => {
try {
const storedUser =
localStorage.getItem("user") ||
sessionStorage.getItem("user");

return storedUser ? JSON.parse(storedUser) : null;

} catch {
return null;
}
};

export default function Navbar() {
const [menuOpen, setMenuOpen] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(hasAccessToken);
const [user, setUser] = useState(getStoredUser);

const location = useLocation();

// Close mobile menu after navigation.
useEffect(() => {
setMenuOpen(false);
}, [location.pathname]);

// Synchronize authentication and role information.
useEffect(() => {
const syncAuth = () => {
const tokenExists = hasAccessToken();
const storedUser = getStoredUser();

  setIsLoggedIn(tokenExists);
  setUser(tokenExists ? storedUser : null);
};

window.addEventListener("storage", syncAuth);
window.addEventListener("auth-change", syncAuth);

return () => {
  window.removeEventListener("storage", syncAuth);
  window.removeEventListener("auth-change", syncAuth);
};

}, []);

// Refresh authentication state after navigation.
useEffect(() => {
const tokenExists = hasAccessToken();

setIsLoggedIn(tokenExists);
setUser(tokenExists ? getStoredUser() : null);

}, [location.pathname]);

const role = user?.role;

// Select navigation links according to the user's role.
const roleLinks = !isLoggedIn
? []
: role === "admin"
? adminLinks
: role === "core_team"
? teamLinks
: role === "club_member"
? memberLinks
: [];

const navLinks = [...publicLinks, ...roleLinks];

const navLinkClass = ({ isActive }) =>
`relative whitespace-nowrap py-2 text-sm font-semibold
      transition-colors duration-200
      after:absolute after:bottom-0 after:left-0 after:h-0.5
      after:bg-cyan-600 after:transition-all after:duration-300
      ${
        isActive
          ? "text-cyan-700 after:w-full dark:text-cyan-400"
          : "text-slate-700 after:w-0 hover:text-cyan-700 hover:after:w-full dark:text-slate-300 dark:hover:text-cyan-400"
      }`;

const loginButton = isLoggedIn ? ( <Link
   to="/profile"
   aria-label="My profile"
   title="My profile"
   className="inline-flex h-11 w-11 items-center justify-center
     rounded-xl border border-slate-200 bg-white
     text-slate-800 shadow-sm transition duration-200
     hover:border-cyan-600 hover:bg-cyan-50 hover:text-cyan-700
     focus-visible:outline-none focus-visible:ring-2
     focus-visible:ring-cyan-600
     dark:border-slate-700 dark:bg-slate-900
     dark:text-white dark:hover:border-cyan-400
     dark:hover:bg-cyan-400/10 dark:hover:text-cyan-300"
 > <UserRound size={22} /> </Link>
) : ( <Link
   to="/login"
   className="group inline-flex items-center justify-center
     gap-2 rounded-xl bg-slate-900 px-5 py-3
     text-sm font-semibold text-white shadow-sm
     transition duration-200 hover:bg-cyan-700
     focus-visible:outline-none focus-visible:ring-2
     focus-visible:ring-cyan-600
     dark:border dark:border-cyan-400/30
     dark:bg-cyan-400/10 dark:text-cyan-300
     dark:hover:bg-cyan-400/20"
 >
Login <ArrowUpRight
     size={17}
     className="transition-transform
       group-hover:-translate-y-0.5
       group-hover:translate-x-0.5"
   /> </Link>
);

return ( <header
   className="sticky top-0 z-50 border-b
     border-slate-200 bg-white/95 text-slate-900
     shadow-sm backdrop-blur-xl
     transition-colors duration-300
     dark:border-slate-800/80
     dark:bg-[#070B14]/95 dark:text-white"
 > <nav
     className="mx-auto flex min-h-[80px] max-w-[1600px]
       items-center justify-between gap-6
       px-5 sm:px-8 lg:px-12"
   >
{/* Brand */} <Link
       to="/"
       className="group flex shrink-0 items-center gap-3"
       aria-label="The Coders Hub home"
     > <img
         src={logo}
         alt="The Coders Hub logo"
         className="h-12 w-12 rounded-xl border
           border-slate-200 object-cover
           dark:border-slate-700"
       />

      <div className="leading-tight">
        <h1
          className="text-[25px] font-extrabold
            tracking-tight text-slate-950 dark:text-white"
        >
          TCH
        </h1>

        <p
          className="mt-1 text-[10px] font-bold
            tracking-[0.19em] text-slate-600
            dark:text-slate-400"
        >
          THE CODERS HUB
        </p>
      </div>
    </Link>

    {/* Desktop navigation */}
    <div className="hidden items-center gap-5 lg:flex xl:gap-7">
      {navLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          end={link.path === "/"}
          className={navLinkClass}
        >
          {link.name}
        </NavLink>
      ))}
    </div>

    {/* Desktop actions */}
    <div className="hidden shrink-0 items-center gap-3 lg:flex">
      {loginButton}
      <ThemeToggle />
    </div>

    {/* Mobile actions */}
    <div className="flex items-center gap-2 lg:hidden">
      <ThemeToggle />

      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        className="flex h-10 w-10 items-center
          justify-center rounded-xl border
          border-slate-200 bg-white text-slate-800
          transition hover:border-cyan-600
          dark:border-slate-700 dark:bg-slate-900
          dark:text-white dark:hover:border-cyan-400"
      >
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>
    </div>
  </nav>

  {/* Mobile menu */}
  <div
    className={`overflow-hidden border-t
      transition-all duration-300 lg:hidden
      ${
        menuOpen
          ? "max-h-[700px] border-slate-200 opacity-100 dark:border-slate-800"
          : "max-h-0 border-transparent opacity-0"
      }`}
  >
    <div
      className="space-y-1 bg-white px-5 py-4
        sm:px-8 dark:bg-[#070B14]"
    >
      {navLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          end={link.path === "/"}
          className={({ isActive }) =>
            `block rounded-lg px-4 py-3
              text-sm font-semibold transition ${
                isActive
                  ? "bg-cyan-50 text-cyan-800 dark:bg-cyan-400/10 dark:text-cyan-300"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
              }`
          }
        >
          {link.name}
        </NavLink>
      ))}

      <div className="flex justify-start pt-3">
        {loginButton}
      </div>
    </div>
  </div>
</header>

);
}
