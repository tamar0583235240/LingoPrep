import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/homePage";
import { RecordingsList } from "../../features/recordings/components/recordingsList";
import { SearchComponents } from "../../features/recordings/components/searchComponents";
import { RoleProtectedRoute } from "../components/roleProtectedRoute";

import { FilteringComponents } from "../../features/recordings/components/filteringComponents";
import { SortComponents } from "../../features/recordings/components/sortComponents";
import { AdminQuestions } from "../../features/admin/components/adminQuestions";
import AdminUser from '../../pages/AdminUser';
import ForgotPassword from "../../features/auth/components/ForgotPassword";
import SignupForm from "../../features/auth/components/SignupForm";
import Dashboard from '../../pages/dashboard';
import DashboardLayout from "../ui/DashboardLayout";
import ResetPassword from "../../features/auth/components/ResetPassword";
import { useSelector } from "react-redux";
import { RootState } from "../../shared/store/store";  // תתאים את הנתיב ל־store שלך
import LandingPage from "../../pages/LandingPage";
import LoginPage from "../../pages/LoginPage";
import ProfilePage from "../../pages/ProfilePage";
import MyProfileViewPage from "../../pages/my-profile-view";
import ProfileAccordionPage from "../../pages/ProfileAccordionPage";
import InterviewMaterials from "../../pages/InterviewMaterials";
import SettingsPage from "../../pages/SettingsPage";
import ProfileList from "../../features/profile/components/ProfileList";
import InterviewMaterialPage from "../../features/knowledge-base/components/interviewMaterialPage";
import { WorkExperienceTab } from "../../features/profile/components/WorkExperienceTab";
import DynamicContentPage from "../../pages/DynamicContentPage";
import { PublicProfilePage } from "../../pages/PublicProfilePage";
import InterviewPage from "../../pages/InterviewPage";
import InterviewMaterialsHub from "../../pages/InterviewMaterialsHub";
import NotAuthorizedPage from "../components/NotAuthorizedPage";
import SharedRecordingsPage from "../../pages/SharedRecordingsPage";
import { AutoDeleteSettings } from "../../features/admin/components/AutoDeleteSettings";
import { ReminderBell } from "../ui/RemindersSidebar";
import PracticeQuestionsUser from "../../pages/PracticeQuestionsUser";

export default function AppRoutes() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLogin = !!user;
  return (
    <div dir="rtl">
      <Routes>
        {/* Routes without sidebar */}
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/reset-password"
          element={
            <ResetPassword />
          }
        />
        {/* Routes with header */}
        <Route element={<DashboardLayout />}>
          <Route
            path="/home"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <HomePage />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <ProfilePage />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/my-profile"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <MyProfileViewPage />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/my-profile/edit"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <ProfileAccordionPage />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <SettingsPage />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/simulation"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <InterviewPage />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <Dashboard />
              </RoleProtectedRoute>
            }
          />
          <Route path="/recordings" element={<RecordingsList allowedRoles={["student", "manager"]} />} />
          {/* <Route path="/shared" element={<RoleProtectedRoute allowedRoles={["student"]}><p>SharedRecordings</p></RoleProtectedRoute>} /> */}

          <Route
            path="/shared"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <SharedRecordingsPage />
              </RoleProtectedRoute>
            }
          />
          <Route path="/resources" element={<RoleProtectedRoute allowedRoles={["student", "manager"]}><p>Resources</p></RoleProtectedRoute>} />

          <Route
            path="/interviewMaterialsHub"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <InterviewMaterialsHub />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/profiles"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <ProfileList />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/practiceQuestionsUser"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <PracticeQuestionsUser />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/manager/questions"
            element={
              <RoleProtectedRoute allowedRoles={["manager"]}>
                <AdminQuestions allowedRoles={["manager"]}>
                  <p>AdminQuestions</p>
                </AdminQuestions>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/manager/users"
            element={
              <RoleProtectedRoute allowedRoles={["manager"]}>
                <AdminUser />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/manager/resources"

            element={
              <RoleProtectedRoute allowedRoles={["manager"]}>
                <p>InterviewMaterialsHub</p>
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/admin/questions"
            element={
              <RoleProtectedRoute allowedRoles={["manager"]}>
                <AdminQuestions allowedRoles={["manager"]}>
                  <p>AdminQuestions</p>
                </AdminQuestions>
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <RoleProtectedRoute allowedRoles={["manager"]}>
                <AdminUser />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/admin/resources"
            element={
              <RoleProtectedRoute allowedRoles={["manager"]}>
                <p>AdminResources</p>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/manager/interview-materials"
            element={
              <RoleProtectedRoute allowedRoles={["manager"]}>
                <InterviewMaterialPage />
              </RoleProtectedRoute>
            }
          />


<Route
  path="/auto-delete-config"
  element={
    <RoleProtectedRoute allowedRoles={["manager"]}>
      <AutoDeleteSettings />
    </RoleProtectedRoute>
  }
/>

<Route
  path="/reminders"
  element={
    <RoleProtectedRoute allowedRoles={["manager"]}>
      <ReminderBell />
    </RoleProtectedRoute>
  }
/>




          <Route
            path="/personal-projects"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                {/* <ProjectsList userId={user?.id ?? ""} /> */}
                <p>ProjectsList</p>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/work-experience"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <WorkExperienceTab />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/admin/dynamic-content"
            element={
              <RoleProtectedRoute allowedRoles={["manager"]}>
                <DynamicContentPage />
              </RoleProtectedRoute>
            }
          />
        </Route>
        <Route path="/not-authorized" element={<NotAuthorizedPage />} />
        <Route path="/u/:slug" element={<PublicProfilePage />} />
      </Routes>
    </div>
  );
}







