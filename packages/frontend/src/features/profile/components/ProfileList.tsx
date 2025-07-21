import { useSelector } from "react-redux";
import { useGetProfilesQuery } from "../services/profileApi";
import {
  FaUserCircle,
  FaExternalLinkAlt,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaStackOverflow,
  FaDev,
  FaMedium,
  FaBehance,
  FaDribbble,
  FaCodepen,
  FaFilePdf,
  FaBookOpen,
} from "react-icons/fa";
import { RootState } from "../../../shared/store/store";
import { Profile } from "../types/profileTypes";
/* ---------- helper that returns the matching icon ---------- */
const getIconForLink = (url: string) => {
  const u = url.toLowerCase();
  if (u.includes("github.com")) return <FaGithub />;
  if (u.includes("linkedin.com")) return <FaLinkedin />;
  if (u.includes("stackoverflow.com")) return <FaStackOverflow />;
  if (u.includes("dev.to")) return <FaDev />;
  if (u.includes("medium.com")) return <FaMedium />;
  if (u.includes("behance.net")) return <FaBehance />;
  if (u.includes("dribbble.com")) return <FaDribbble />;
  if (u.includes("codepen.io")) return <FaCodepen />;
  if (u.includes("notion.so")) return <FaBookOpen />;
  if (u.includes("drive.google.com") || u.endsWith(".pdf")) return <FaFilePdf />;
  if (u.startsWith("http")) return <FaGlobe />;
  return <FaExternalLinkAlt />;
};
const ProfileList = () => {
  const user     = useSelector((state: RootState) => state.auth.user);
  const isAdmin  = "manager".includes((user?.role ?? "").toLowerCase().trim());
  const { data: profiles, error, isLoading } = useGetProfilesQuery();
  if (isLoading) return <div>טוען פרופילים…</div>;
  if (error)     return <div>שגיאה בטעינת פרופילים</div>;
  if (!profiles || profiles.length === 0) return <div>לא נמצאו פרופילים</div>;
  const shownProfiles = profiles.filter((p) => (isAdmin ? true : p.is_public));
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {shownProfiles.length ? (
        shownProfiles.map((profile: Profile) => {
          const fullName = `${profile.first_name} ${profile.last_name}`;
          return (
            <div
              key={profile.id}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center"
            >
              <p className="self-start text-right text-sm text-gray-500">
                {profile.is_public ? "פרופיל ציבורי" : "פרופיל פרטי"}
              </p>
              {profile.image_url ? (
                <img
                  src={profile.image_url}
                  alt={fullName}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
              ) : (
                <FaUserCircle className="w-24 h-24 text-gray-300 mb-4" />
              )}
              <h2 className="text-xl font-semibold mb-1">{fullName}</h2>
              <p className="text-sm text-gray-500">{profile.location}</p>
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-medium">סטטוס:</span> {profile.status}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">סוג משרה מועדף:</span>{" "}
                {profile.preferred_job_type}
              </p>
              {/* ---------- links section (only if present) ---------- */}
              {Array.isArray(profile.external_links) &&
                profile.external_links.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-3 mt-4">
                    {profile.external_links.map((link, idx) => {
                      const url   = typeof link === "string" ? link : link.url;
                      const label =
                        typeof link === "string"
                          ? url.replace(/^https?:\/\//, "") // fallback label
                          : link.label || url;
                      return (
                        <a
                          key={idx}
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-primary hover:text-primary/80 transition"
                        >
                          {getIconForLink(url)}
                          <span className="break-all">{label}</span>
                        </a>
                      );
                    })}
                  </div>
                )}
            </div>
          );
        })
      ) : (
        !isAdmin && (
          <div className="col-span-full text-center text-gray-500 mt-8">
            לא נמצאו משתמשים ציבוריים.
          </div>
        )
      )}
    </div>
  );
};
export default ProfileList;