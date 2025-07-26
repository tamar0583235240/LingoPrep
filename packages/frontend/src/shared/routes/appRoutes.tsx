import { Routes, Route } from "react-router-dom";
import { RoleProtectedRoute } from "../components/roleProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

// Pages
import HomePage from "../../pages/homePage";
import InterviewPage from "../../pages/InterviewPage";
import LoginPage from "../../pages/LoginPage";
import ProfilePage from "../../pages/ProfilePage";
import SettingsPage from "../../pages/SettingsPage";
import MyProfileViewPage from "../../pages/my-profile-view";
import ProfileAccordionPage from "../../pages/ProfileAccordionPage";
import AdminUser from '../../pages/AdminUser';
import Dashboard from '../../pages/dashboard';
import LandingPage from "../../pages/LandingPage";
import InterviewMaterialsHub from "../../pages/InterviewMaterialsHub";
import DynamicContentPage from "../../pages/DynamicContentPage";
import { PublicProfilePage } from "../../pages/PublicProfilePage";

// Components
import AudioRecorder from "../../features/recordings/components/AudioRecorder";
import { RecordingsList } from "../../features/recordings/components/recordingsList";
import { AdminQuestions } from "../../features/admin/components/adminQuestions";
import ForgotPassword from "../../features/auth/components/ForgotPassword";
import SignupForm from "../../features/auth/components/SignupForm";
import DashboardLayout from "../ui/DashboardLayout";
import ResetPassword from "../../features/auth/components/ResetPassword";
import ProfileList from "../../features/profile/components/ProfileList";
import { WorkExperienceTab } from "../../features/profile/components/WorkExperienceTab";
import InterviewMaterialPage from "../../features/knowledge-base/components/interviewMaterialPage";
import NotAuthorizedPage from "../components/NotAuthorizedPage";

export default function AppRoutes() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div dir="rtl">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/not-authorized" element={<NotAuthorizedPage />} />
        <Route path="/u/:slug" element={<PublicProfilePage />} />

        {/* Protected routes with DashboardLayout */}
        <Route element={<DashboardLayout />}>
          {/* Main routes */}
          <Route
            path="/home"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <HomePage />
              </RoleProtectedRoute>
            }
          />
          
          {/* User Profile routes */}
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
          
          {/* Interview routes */}
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
          <Route
            path="/recordings"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <RecordingsList allowedRoles={["student", "manager"]} />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/shared"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <p>SharedRecordings</p>
              </RoleProtectedRoute>
            }
          />
          
          {/* Materials routes */}
          <Route
            path="/resources"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <p>Resources</p>
              </RoleProtectedRoute>
            }
          />
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
          
          {/* Manager routes */}
          <Route
            path="/manager/questions"
            element={
              <RoleProtectedRoute allowedRoles={["manager"]}>
                <AdminQuestions allowedRoles={["manager"]}>
                  <></>
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
                <p>Manager Resources</p>
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
          
          {/* Profile related routes */}
          <Route
            path="/personal-projects"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
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
          
          {/* Admin routes */}
          <Route
            path="/admin/dynamic-content"
            element={
              <RoleProtectedRoute allowedRoles={["manager"]}>
                <DynamicContentPage />
              </RoleProtectedRoute>
            }
          />
          
          <Route
            path="/admin/questions"
            element={
              <RoleProtectedRoute allowedRoles={["manager"]}>
                <AdminQuestions allowedRoles={["manager"]}>
                  <></>
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
        </Route>
      </Routes>
    </div>
  );
}
