
import {
  Users,
  Code2,
  Lightbulb,
  ExternalLink,
  MessageSquareText,
} from "lucide-react";
import { FaGithub,FaLinkedin } from "react-icons/fa";

const teamLabels = {
  tech: "Tech Team",
  event_management: "Event Management Team",
  content_creation: "Content Creation Team",
  undecided: "Not Decided Yet",
};

function InfoGroup({ icon: Icon, title, children }) {
  return (
    <div className="rounded-xl border border-slate-200 p-5 dark:border-slate-700">
      <div className="mb-4 flex items-center gap-2">
        <Icon size={18} className="text-cyan-600 dark:text-cyan-400" />

        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          {title}
        </h3>
      </div>

      {children}
    </div>
  );
}

function TagList({ items, emptyText }) {
  if (!Array.isArray(items) || items.length === 0) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {emptyText}
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-800 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function SocialLink({ href, icon: Icon, label }) {
  if (!href) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 opacity-60 dark:border-slate-700">
        <Icon size={19} className="text-slate-500" />

        <span className="text-sm text-slate-500 dark:text-slate-400">
          {label} not added
        </span>
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 p-3 transition hover:border-cyan-500 hover:bg-cyan-50 dark:border-slate-700 dark:hover:border-cyan-400 dark:hover:bg-cyan-400/5"
    >
      <Icon size={19} className="shrink-0 text-cyan-700 dark:text-cyan-400" />

      <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
        {label}
      </span>

      <ExternalLink size={15} className="shrink-0 text-slate-400" />
    </a>
  );
}

export default function ClubInfo({ application }) {
  const preferredTeam = application?.preferred_team
    ? teamLabels[application.preferred_team] ||
      application.preferred_team
    : "Not selected";

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#0b1422] sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-400">
          <Users size={22} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">
            Club Profile
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Your interests, skills, and community involvement
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Preferred team */}
        <InfoGroup icon={Users} title="Preferred Team">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {preferredTeam}
          </p>
        </InfoGroup>

        {/* Skills */}
        <InfoGroup icon={Code2} title="Skills">
          <TagList
            items={application?.skills}
            emptyText="No skills added yet."
          />
        </InfoGroup>

        {/* Areas of interest */}
        <InfoGroup icon={Lightbulb} title="Areas of Interest">
          <TagList
            items={application?.areas_of_interest}
            emptyText="No interests added yet."
          />
        </InfoGroup>

        {/* Social profiles */}
        <InfoGroup icon={ExternalLink} title="Social Profiles">
          <div className="space-y-3">
            <SocialLink
              href={application?.github_url}
              icon={FaGithub}
              label="GitHub"
            />

            <SocialLink
              href={application?.linkedin_url}
              icon={FaLinkedin}
              label="LinkedIn"
            />
          </div>
        </InfoGroup>

        {/* Reason for joining */}
        <div className="md:col-span-2">
          <InfoGroup
            icon={MessageSquareText}
            title="Why I Want to Join TCH"
          >
            <p className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-600 dark:text-slate-400">
              {application?.reason_to_join ||
                "You haven't added your reason for joining yet."}
            </p>
          </InfoGroup>
        </div>
      </div>
    </section>
  );
}
