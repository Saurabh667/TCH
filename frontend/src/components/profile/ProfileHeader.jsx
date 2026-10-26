import { useRef } from "react";
import {
Camera,
ShieldCheck,
ShieldAlert,
UserRound,
Pencil,
} from "lucide-react";

export default function ProfileHeader({
profile,
onEdit,
onPictureChange,
savingPicture = false,
}) {
const fileInputRef = useRef(null);

const pictureUrl = profile?.profile_picture || null;

const roleLabel = {
club_member: "Club Member",
core_team: "Core Team",
admin: "Administrator",
};

const handlePictureSelect = (event) => {
const file = event.target.files?.[0];

if (file) {
  onPictureChange?.(file);
  event.target.value = "";
}

};

return ( <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-[#0b1422] sm:p-6 lg:p-8"> <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />

  {/* Main layout */}
  <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-6">
    {/* Profile picture and member details */}
    <div className="flex min-w-0 flex-1 items-start gap-4 sm:gap-6 lg:items-center">
      {/* Profile picture */}
      <div className="relative h-20 w-20 shrink-0 sm:h-28 sm:w-28">
        <div className="grid h-20 w-20 place-items-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800 sm:h-28 sm:w-28 sm:rounded-3xl">
          {pictureUrl ? (
            <img
              src={pictureUrl}
              alt={profile?.full_name || "Profile picture"}
              className="h-full w-full object-cover"
            />
          ) : (
            <UserRound
              size={36}
              strokeWidth={1.3}
              className="text-slate-400 sm:h-12 sm:w-12"
            />
          )}
        </div>

        {/* Change profile picture */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={savingPicture}
          aria-label="Change profile picture"
          title="Change profile picture"
          className="absolute -bottom-2 -right-2 grid h-9 w-9 place-items-center rounded-xl border-4 border-white bg-cyan-700 text-white transition hover:bg-cyan-800 disabled:opacity-60 dark:border-[#0b1422] dark:bg-cyan-600 dark:hover:bg-cyan-500 sm:h-10 sm:w-10"
        >
          {savingPicture ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Camera size={17} />
          )}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePictureSelect}
        />
      </div>

      {/* Member details */}
      <div className="min-w-0 flex-1 pt-1 lg:pt-0">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <h1 className="break-words text-lg font-black leading-tight tracking-tight text-slate-950 dark:text-white sm:text-2xl xl:text-3xl">
            {profile?.full_name || "TCH Member"}
          </h1>

          {profile?.is_email_verified ? (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400 sm:px-2.5 sm:text-xs">
              <ShieldCheck size={14} />
              Verified
            </span>
          ) : (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-[10px] font-semibold text-amber-700 dark:bg-amber-400/10 dark:text-amber-400 sm:px-2.5 sm:text-xs">
              <ShieldAlert size={14} />
              Unverified
            </span>
          )}
        </div>

        <p className="mt-2 break-all text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
          {profile?.email || ""}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:mt-4 sm:gap-2">
          <span className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-[10px] font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 sm:px-3 sm:text-xs">
            ID: {profile?.student_id || "—"}
          </span>

          <span className="rounded-lg bg-cyan-50 px-2 py-1.5 text-[10px] font-bold text-cyan-800 dark:bg-cyan-400/10 dark:text-cyan-300 sm:px-3 sm:text-xs">
            {roleLabel[profile?.role] || "Member"}
          </span>
        </div>
      </div>
    </div>

    {/* Edit profile button */}
    <button
      type="button"
      onClick={onEdit}
      className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-cyan-600 hover:text-cyan-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300 lg:w-auto"
    >
      <Pencil size={16} />
      Edit Profile
    </button>
  </div>
</section>

);
}
