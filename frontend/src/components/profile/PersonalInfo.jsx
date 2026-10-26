
import { Mail, Phone, GraduationCap, Building2, CalendarDays } from "lucide-react";

const fields = [
  {
    key: "email",
    label: "Email Address",
    icon: Mail,
  },
  {
    key: "phone",
    label: "Phone Number",
    icon: Phone,
  },
  {
    key: "department",
    label: "Department",
    icon: Building2,
  },
  {
    key: "year_of_study",
    label: "Year of Study",
    icon: CalendarDays,
  },
];

export default function PersonalInfo({ profile }) {
  const yearLabels = {
    1: "1st Year",
    2: "2nd Year",
    3: "3rd Year",
    4: "4th Year",
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#0b1422] sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-400">
          <GraduationCap size={22} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">
            Personal Information
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Your personal and academic details
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Full name */}
        <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <GraduationCap size={16} />
            <span className="text-xs font-semibold">Full Name</span>
          </div>

          <p className="mt-2 break-words font-semibold text-slate-900 dark:text-white">
            {profile?.full_name || "Not provided"}
          </p>
        </div>

        {/* Remaining details */}
        {fields.map((field) => {
          const Icon = field.icon;
          let value = profile?.[field.key];

          if (field.key === "year_of_study" && value) {
            value = yearLabels[value] || `Year ${value}`;
          }

          return (
            <div
              key={field.key}
              className="min-w-0 rounded-xl border border-slate-200 p-4 dark:border-slate-700"
            >
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Icon size={16} />

                <span className="text-xs font-semibold">
                  {field.label}
                </span>
              </div>

              <p className="mt-2 break-words font-semibold text-slate-900 dark:text-white">
                {value || "Not provided"}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
