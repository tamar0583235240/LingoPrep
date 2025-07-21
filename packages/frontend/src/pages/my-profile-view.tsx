import { useSelector } from "react-redux";
import { RootState } from "../shared/store/store";
import { useNavigate } from "react-router-dom";
import { FaBehance, FaCodepen, FaDev, FaDribbble, FaExternalLinkAlt, FaFileAlt, FaFilePdf, FaGithub, FaGlobe, FaLinkedin, FaMedium, FaStackOverflow, FaUserCircle } from "react-icons/fa";
import { ExternalLink, Profile } from "../features/profile/types/profileTypes";
import { useGetProfileByIdQuery } from "../features/profile/services/profileApi";
import CopyLinkButton from "../features/profile/components/copyLinkButton";
const MyProfileViewPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  // Fetch profile data from RTK Query using useGetProfileByIdQuery
  const { data: profile, error, isLoading } = useGetProfileByIdQuery(user?.id ?? "", {
    skip: !user, // Skip the query if no user
  });
  // If no user exists, return null immediately (do not render the profile view)
  if (!user) return <p>לא נמצא פרופיל.</p>;
  const getIconForLink = (url: string) => {
    if (url.includes("linkedin.com")) return <FaLinkedin />;
    if (url.includes("github.com")) return <FaGithub />;
    if (url.includes("stackoverflow.com")) return <FaStackOverflow />;
    if (url.includes("dev.to")) return <FaDev />;
    if (url.includes("medium.com")) return <FaMedium />;
    if (url.includes("behance.net")) return <FaBehance />;
    if (url.includes("dribbble.com")) return <FaDribbble />;
    if (url.includes("codepen.io")) return <FaCodepen />;
    if (url.includes("notion.so")) return <FaFileAlt />;
    if (url.includes("drive.google.com") || url.endsWith(".pdf")) return <FaFilePdf />;
    if (url.startsWith("http")) return <FaGlobe />;
    return <FaExternalLinkAlt />;
  };
  const getFullName = (profile: Profile) => `${profile.first_name} ${profile.last_name}`;
  // Conditional rendering based on the loading, error, or profile state
  if (isLoading) return <p>טוען פרופיל...</p>;
  if (error) return <p className="text-red-500">שגיאה בטעינת פרופיל.</p>;
  if (!profile) return <p>לא נמצא פרופיל.</p>;
  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center">
      {profile.image_url ? (
        <img
          src={profile.image_url}
          alt={getFullName(profile)}
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
      ) : (
        <FaUserCircle className="w-24 h-24 text-gray-300 mb-4" />
      )}
      <h2 className="text-xl font-semibold mb-1">{getFullName(profile)}</h2>
      <p className="text-sm text-gray-500">{profile.location}</p>
      <p className="text-sm text-gray-600 mt-2">
        <span className="font-medium">סטטוס:</span> {profile.status}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-medium">סוג משרה:</span> {profile.preferred_job_type}
      </p>
      {Array.isArray(profile.external_links) && profile.external_links.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {profile.external_links.map((link: ExternalLink, i: number) => {
            const url = typeof link === "string" ? link : link.url;
            const label = typeof link === "string" ? link : link.label || url;
            return (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-primary hover:text-primary/80 transition ltr"
              >
                {getIconForLink(url)}
                <span>{label}</span>
              </a>
            );
          })}
        </div>
      )}
      <button
        onClick={() => navigate("/my-profile/edit")}
        className="mt-6 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
      >
        ערוך פרופיל
      </button>
      <CopyLinkButton slug={user.slug} />
    </div>
  );
};
export default MyProfileViewPage;






