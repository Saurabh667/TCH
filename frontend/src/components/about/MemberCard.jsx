
import { useEffect, useState } from "react";
import { UserRound } from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import SocialLink from "./SocialLink";

const teamColors = {
  tech: "from-cyan-500 to-blue-600",
  "event-management": "from-blue-600 to-indigo-600",
  "social-media": "from-cyan-500 to-blue-600",
  design: "from-blue-500 to-cyan-600",
  "video-editing": "from-cyan-600 to-blue-700",
};

const teamPhotos = {
  shikha: "/teamImg/Shikha.jpg",
  adarsh: "/teamImg/Adarsh.jpg",
  saurabh: "/teamImg/saurabh5.png",
  devanshu: "/teamImg/Devanshu.jpg",
  ayush: "/teamImg/Ayush.jpg",
  disha: "/teamImg/Disha.jpg",
  kalyani: "/teamImg/Kalyani.jpg",
  kishan: "/teamImg/Kishan.jpg",
  niraj: "/teamImg/Niraj.jpg",
  sakshi: "/teamImg/Sakshi.jpg",
};

export default function MemberCard({
  member,
  index = 0,
  teams = [],
}) {
  const fullName = member.fullName || "";
  const firstName = fullName.trim().split(/\s+/)[0].toLowerCase();

  const localImage = teamPhotos[firstName] || null;
  const profileImage = member.profile?.photo || null;

  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [member.id, profileImage]);

  const imageSrc = imageFailed
    ? profileImage !== localImage
      ? localImage
      : null
    : profileImage || localImage;

  const team = teams.find(
    (item) => item.id === member.teamId
  );

  const gradient =
    teamColors[member.teamId] || "from-cyan-500 to-blue-600";

  return (
    <article
      className="group relative isolate h-[360px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-400/70 hover:shadow-xl dark:border-white/10 dark:bg-[#101e30]"
      style={{
        transitionDelay: `${(index % 4) * 50}ms`,
      }}
      tabIndex={0}
    >
      {/* Member Photo - Always Clear */}
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={fullName}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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

      {/* Hover-only Gradient Overlay */}
      <div
        className="
          absolute inset-0 z-10
          bg-gradient-to-t
         from-[#071426]/70
via-[#071426]/70
          to-transparent
          opacity-0
          transition-opacity duration-500
          group-hover:opacity-100
          group-focus-within:opacity-100
        "
      />

      {/* Default Details */}
      <div
        className="
          absolute inset-x-0 bottom-0 z-20 p-5 text-white
          transition-opacity duration-300
          group-hover:opacity-0
          group-focus-within:opacity-0
        "
      >
        <h3 className="text-xl font-extrabold leading-tight drop-shadow-lg">
          {fullName}
        </h3>

        <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 drop-shadow-lg">
          {member.position}
        </p>
      </div>

      {/* Hover Details - Transparent Gradient Background */}
      <div
        className="
          absolute inset-0 z-20
          flex flex-col justify-end
          overflow-y-auto p-5 text-white
          opacity-0
          transition-opacity duration-500
          group-hover:opacity-100
          group-focus-within:opacity-100
        "
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
          {team?.name || "TCH Member"}
        </p>

        <h3 className="mt-2 text-xl font-extrabold drop-shadow-md">
          {fullName}
        </h3>

        <p className="mt-1 text-sm font-semibold text-cyan-300">
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
                className="rounded-md border border-cyan-400/25 bg-cyan-400/10 px-2 py-1 text-xs text-cyan-100"
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
            label={`${fullName} on LinkedIn`}
          >
            <FaLinkedin size={17} />
          </SocialLink>

          <SocialLink
            href={member.socialLinks?.github}
            label={`${fullName} on GitHub`}
          >
            GH
          </SocialLink>

          <SocialLink
            href={member.socialLinks?.instagram}
            label={`${fullName} on Instagram`}
          >
            <FaInstagram size={17} />
          </SocialLink>
        </div>
      </div>
    </article>
  );
}
