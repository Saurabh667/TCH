import { useEffect, useState } from "react";
import { X, Save, UserRound, Users, Code2 } from "lucide-react";

const initialFormState = (profile, application) => ({
  full_name: profile?.full_name || "",
  phone: profile?.phone || "",
  department: profile?.department || "",
  year_of_study: profile?.year_of_study || "",
  reason_to_join: application?.reason_to_join || "",
  areas_of_interest: Array.isArray(application?.areas_of_interest)
    ? application.areas_of_interest.join(", ")
    : "",
  skills: Array.isArray(application?.skills)
    ? application.skills.join(", ")
    : "",
  github_url: application?.github_url || "",
  linkedin_url: application?.linkedin_url || "",
  preferred_team: application?.preferred_team || "",
});

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/15 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500";

const labelClass =
  "block text-sm font-semibold text-slate-700 dark:text-slate-300";

export default function EditProfileModal({
  isOpen,
  onClose,
  profile,
  application,
  onSave,
  saving = false,
}) {
  const [form, setForm] = useState(() =>
    initialFormState(profile, application)
  );

  useEffect(() => {
    if (isOpen) {
      setForm(initialFormState(profile, application));
    }
  }, [isOpen, profile, application]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape" && !saving) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, saving, onClose]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      full_name: form.full_name.trim(),
      phone: form.phone.trim(),
      department: form.department.trim(),
      year_of_study: form.year_of_study
        ? Number(form.year_of_study)
        : null,
      reason_to_join: form.reason_to_join.trim(),
      areas_of_interest: form.areas_of_interest
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      skills: form.skills
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      github_url: form.github_url.trim(),
      linkedin_url: form.linkedin_url.trim(),
      preferred_team: form.preferred_team,
    };

    onSave(payload);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-profile-title"
        className="flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-[#0b1422] sm:rounded-3xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5 dark:border-slate-800 sm:px-7">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-400">
              <UserRound size={22} />
            </div>

            <div>
              <h2
                id="edit-profile-title"
                className="text-xl font-bold text-slate-950 dark:text-white"
              >
                Edit Profile
              </h2>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Update your personal and club information
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Close edit profile"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <X size={21} />
          </button>
        </div>

        {/* Form */}
        <form
          id="edit-profile-form"
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-7"
        >
          {/* Personal information */}
          <div className="mb-8">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <UserRound size={17} className="text-cyan-600 dark:text-cyan-400" />
              Personal Information
            </h3>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className={labelClass}>
                Full Name
                <input
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  required
                  maxLength={150}
                  autoComplete="name"
                  className={inputClass}
                  placeholder="Enter your full name"
                />
              </label>

              <label className={labelClass}>
                Email Address
                <input
                  value={profile?.email || ""}
                  readOnly
                  className={`${inputClass} cursor-not-allowed opacity-70`}
                />
                <span className="mt-1 block text-xs font-normal text-slate-500">
                  Email cannot be changed here.
                </span>
              </label>

              <label className={labelClass}>
                Phone Number
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  type="tel"
                  maxLength={15}
                  autoComplete="tel"
                  className={inputClass}
                  placeholder="Enter your phone number"
                />
              </label>

              <label className={labelClass}>
                Department
                <input
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  className={inputClass}
                  placeholder="Enter your department"
                />
              </label>

              <label className={labelClass}>
                Year of Study
                <select
                  name="year_of_study"
                  value={form.year_of_study}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </label>
            </div>
          </div>

          {/* Club information */}
          <div className="mb-5 border-t border-slate-200 pt-7 dark:border-slate-800">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <Users size={17} className="text-cyan-600 dark:text-cyan-400" />
              Club Information
            </h3>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className={labelClass}>
                Preferred Team
                <select
                  name="preferred_team"
                  value={form.preferred_team}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select a team</option>
                  <option value="tech">Tech Team</option>
                  <option value="event_management">
                    Event Management Team
                  </option>
                  <option value="content_creation">
                    Content Creation Team
                  </option>
                  <option value="undecided">Not Decided Yet</option>
                </select>
                <span className="mt-1 block text-xs font-normal text-slate-500">
                  This is your preference, not an official team assignment.
                </span>
              </label>

              <label className={labelClass}>
                Skills
                <input
                  name="skills"
                  value={form.skills}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Python, React, Django"
                />
                <span className="mt-1 block text-xs font-normal text-slate-500">
                  Separate skills with commas.
                </span>
              </label>

              <label className={`${labelClass} sm:col-span-2`}>
                Areas of Interest
                <input
                  name="areas_of_interest"
                  value={form.areas_of_interest}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Web Development, AI, Open Source"
                />
                <span className="mt-1 block text-xs font-normal text-slate-500">
                  Separate interests with commas.
                </span>
              </label>

              <label className={labelClass}>
                GitHub Profile
                <input
                  name="github_url"
                  type="url"
                  value={form.github_url}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="https://github.com/username"
                />
              </label>

              <label className={labelClass}>
                LinkedIn Profile
                <input
                  name="linkedin_url"
                  type="url"
                  value={form.linkedin_url}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="https://linkedin.com/in/username"
                />
              </label>

              <label className={`${labelClass} sm:col-span-2`}>
                Why do you want to join TCH?
                <textarea
                  name="reason_to_join"
                  value={form.reason_to_join}
                  onChange={handleChange}
                  rows={4}
                  maxLength={3000}
                  className={`${inputClass} resize-y`}
                  placeholder="Share your motivation and what you hope to contribute..."
                />
              </label>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-5 py-4 dark:border-slate-800 sm:flex-row sm:justify-end sm:px-7">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="edit-profile-form"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-600 dark:hover:bg-cyan-500"
          >
            {saving ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  );
}
