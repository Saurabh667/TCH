
import { useState } from "react";
import { UserRound } from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

import SocialLink from "./SocialLink";

const teamColors = {
  tech: "from-cyan-500 to-blue-600",
  "event-management": "from-blue-600 to-indigo-600",
  "social-media": "from-pink-500 to-purple-600",
  design: "from-violet-500 to-fuchsia-600",
  "video-editing": "from-amber-500 to-orange-600",
};

export default function MemberCard({ member, index = 0, teams = [] }) {
  const [imageError, setImageError] = useState(false);

  const team = teams.find((item) => item.id === member.teamId);
  const gradient =
    teamColors[member.teamId] || "from-cyan-500 to-blue-600";

  return (
    <article
      className="group relative isolate h-[360px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-400/70 hover:shadow-xl dark:border-white/10 dark:bg-[#101713]"
      style={{ transitionDelay: `${(index % 4) * 50}ms` }}
      tabIndex={0}
    >
      {/* Member Photo */}
      {member.profile?.photo && !imageError ? (
        <img
          src={member.profile.photo}
          alt={member.fullName}
          loading="lazy"
          onError={() => setImageError(true)}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      ) : (
        <div
          className={`absolute inset-0 grid place-items-center bg-gradient-to-br ${gradient}`}
        >
          <UserRound
            size={64}
            strokeWidth={1.2}
            className="text-white/80"
          />
        </div>
      )}

      {/* Photo Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/15 to-black/5" />

      {/* Default Details */}
      <div className="absolute inset-x-0 bottom-0 p-5 text-white transition duration-300 group-hover:opacity-0 group-focus-within:opacity-0">
        <h3 className="text-xl font-extrabold leading-tight">
          {member.fullName}
        </h3>

        <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
          {member.position}
        </p>
      </div>

      {/* Hover Details */}
      <div className="absolute inset-0 flex flex-col justify-end overflow-y-auto bg-[#07100c]/95 p-5 text-white opacity-0 transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
          {team?.name || "TCH Member"}
        </p>

        <h3 className="mt-2 text-xl font-extrabold">
          {member.fullName}
        </h3>

        <p className="mt-1 text-sm font-semibold text-emerald-300">
          {member.position}
        </p>

        {member.profile?.introduction && (
          <p className="mt-3 text-sm leading-6 text-slate-200">
            {member.profile.introduction}
          </p>
        )}

        {member.profile?.skills?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {member.profile.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-emerald-400/25 bg-emerald-400/10 px-2 py-1 text-xs text-emerald-100"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Social Links */}
        <div className="mt-4 flex items-center gap-2">
          <SocialLink
            href={member.socialLinks?.linkedin}
            label={`${member.fullName} on LinkedIn`}
          >
            <FaLinkedin size={17} />
          </SocialLink>

          <SocialLink
            href={member.socialLinks?.github}
            label={`${member.fullName} on GitHub`}
          >
            GH
          </SocialLink>

          <SocialLink
            href={member.socialLinks?.instagram}
            label={`${member.fullName} on Instagram`}
          >
            <FaInstagram size={17} />
          </SocialLink>
        </div>
      </div>
    </article>
  );
}
