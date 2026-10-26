import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  RefreshCw,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import toast from "react-hot-toast";

import ProfileHeader from "../components/profile/ProfileHeader";
import PersonalInfo from "../components/profile/PersonalInfo";
import ClubInfo from "../components/profile/ClubInfo";
import EditProfileModal from "../components/profile/EditProfileModal";

import {
  getMyProfile,
  updateMyProfile,
  getMyApplication,
  createMyApplication,
  updateMyApplication,
} from "../services/profileService";

export default function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [application, setApplication] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingPicture, setSavingPicture] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const loadProfile = useCallback(async () => {
    setLoading(true);

    try {
      const [profileData, applicationData] = await Promise.all([
        getMyProfile(),
        getMyApplication(),
      ]);

      setProfile(profileData);

      setApplication(
        applicationData?.has_application
          ? applicationData.application
          : null
      );
    } catch (error) {
      toast.error(error.message || "Unable to load your profile.");

      if (
        error.message?.toLowerCase().includes("log in") ||
        error.message?.toLowerCase().includes("session has expired")
      ) {
        navigate("/login", { replace: true });
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleSaveProfile = async (formData) => {
    setSaving(true);

    try {
      // Update personal information.
      const updatedProfile = await updateMyProfile({
        full_name: formData.full_name,
        phone: formData.phone,
        department: formData.department,
        year_of_study: formData.year_of_study,
      });

      setProfile((previous) => ({
        ...previous,
        ...updatedProfile,
      }));

      // Update club application information.
      const applicationPayload = {
        reason_to_join: formData.reason_to_join,
        areas_of_interest: formData.areas_of_interest,
        skills: formData.skills,
        github_url: formData.github_url,
        linkedin_url: formData.linkedin_url,
        preferred_team: formData.preferred_team,
      };

      let updatedApplication;

      if (application) {
        const response = await updateMyApplication(applicationPayload);
        updatedApplication = response.application;
      } else {
        const response = await createMyApplication(applicationPayload);
        updatedApplication = response.application;
      }

      setApplication(updatedApplication);
      setIsEditOpen(false);

      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(error.message || "Unable to update your profile.");
    } finally {
      setSaving(false);
    }
  };

  const handlePictureChange = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be 5 MB or less.");
      return;
    }

    setSavingPicture(true);

    try {
      const formData = new FormData();
      formData.append("profile_picture", file);

      const updatedProfile = await updateMyProfile(formData);

      setProfile((previous) => ({
        ...previous,
        ...updatedProfile,
      }));

      toast.success("Profile picture updated.");
    } catch (error) {
      toast.error(
        error.message || "Unable to update the profile picture."
      );
    } finally {
      setSavingPicture(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    sessionStorage.removeItem("access");
    sessionStorage.removeItem("refresh");

    window.dispatchEvent(new Event("auth-change"));

    toast.success("Logged out successfully.");
    navigate("/login", { replace: true });
  };

  if (loading) {
    return (
      <main className="grid min-h-[70vh] place-items-center bg-slate-100 px-4 dark:bg-[#060c17]">
        <div className="flex flex-col items-center gap-4 text-center">
          <RefreshCw
            size={32}
            className="animate-spin text-cyan-600 dark:text-cyan-400"
          />

          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Loading your profile...
          </p>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="grid min-h-[70vh] place-items-center bg-slate-100 px-4 dark:bg-[#060c17]">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-[#0b1422]">
          <UserRound
            size={42}
            className="mx-auto text-slate-400"
          />

          <h1 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
            Unable to load profile
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Please check your login session and try again.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={loadProfile}
              className="rounded-xl bg-cyan-700 px-5 py-3 text-sm font-bold text-white hover:bg-cyan-800"
            >
              Try Again
            </button>

            <Link
              to="/login"
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 dark:border-slate-700 dark:text-slate-200"
            >
              Login
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 transition-colors duration-300 dark:bg-[#060c17] dark:text-white sm:px-6 sm:py-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              to="/"
              className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-400"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>

            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-100 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-400">
                <UserRound size={25} />
              </div>

              <div>
                <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
                  My Profile
                </h1>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Manage your personal details and club information.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={loadProfile}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-700 dark:border-slate-700 dark:bg-[#0b1422] dark:text-slate-200 dark:hover:border-cyan-400"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {/* Profile header */}
        <ProfileHeader
          profile={profile}
          onEdit={() => setIsEditOpen(true)}
          onPictureChange={handlePictureChange}
          savingPicture={savingPicture}
        />

        {/* Information sections */}
        <div className="mt-6 grid gap-6">
          <PersonalInfo profile={profile} />

          <ClubInfo application={application} />
        </div>

        {/* Account information */}
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#0b1422] sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900 dark:text-white">
                  Account & Security
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Your account is associated with your verified email and
                  unique student ID.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-red-200 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50 dark:border-red-400/20 dark:text-red-400 dark:hover:bg-red-400/10"
            >
              Logout
            </button>
          </div>
        </section>
      </div>

      {/* Edit modal */}
      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        profile={profile}
        application={application}
        onSave={handleSaveProfile}
        saving={saving}
      />
    </main>
  );
}
