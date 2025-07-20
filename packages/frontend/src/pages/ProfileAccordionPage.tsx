import { FaPen } from "react-icons/fa";
import { Accordion } from "../shared/ui/Accordion";
import EditProfilePage from "./my-profile";
// import { WorkExperienceTab } from "../features/profile/components/WorkExperienceTab";
import { WorkExperienceTab } from "../features/profile/components/WorkExperienceTab";
const ProfileAccordionPage = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        <FaPen className="inline mr-2" /> עריכת פרופיל
      </h1>

      <Accordion title="פרטים כלליים">
        <EditProfilePage />
      </Accordion>

      {/* דוגמא, צריך להוריד */}
      {/* <Accordion title="ניסיון תעסוקתי">
        <WorkExperienceTab />
      </Accordion> */}

    </div>
  );
};

export default ProfileAccordionPage;
