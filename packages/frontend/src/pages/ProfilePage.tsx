import { useSelector } from "react-redux";
import { RootState } from "../shared/store/store";
// import { WorkExperienceTab } from "../features/profile/components/WorkExperienceTab";
const ProfilePage = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return <p>אין משתמש מחובר</p>;

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-center mb-6">פרופיל משתמש</h1>
      <div className="space-y-4">
        <ProfileField label="שם פרטי" value={user.first_name} />
        <ProfileField label="שם משפחה" value={user.last_name} />
        <ProfileField label="אימייל" value={user.email} />
        <ProfileField label="טלפון" value={user.phone || "לא הוזן"} />
        <ProfileField
          label="תפקיד"
          value={user.role === "manager" ? "מנהל" : "משתמש רגיל"}
        />
      </div>
    </div>
  );   

};

const ProfileField = ({ label, value }: { label: string; value: string }) => (
  <div className="flex gap-2 border-b pb-1">
    <span className="font-medium text-gray-600 whitespace-nowrap">
      {label}:
    </span>
    <span className="text-gray-800 break-words">{value}</span>
  </div>
);

export default ProfilePage;
