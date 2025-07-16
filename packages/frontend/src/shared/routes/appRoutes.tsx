import { Routes, Route } from "react-router-dom";
import { RoleProtectedRoute } from "../components/roleProtectedRoute";
import HomePage from "../../pages/homePage";
import { RecordingsList } from "../../features/recordings/components/recordingsList";
import { AdminQuestions } from "../../features/admin/components/adminQuestions";
import AdminUser from '../../pages/AdminUser';
import ForgotPassword from "../../features/auth/components/ForgotPassword";
import LoginForm from "../../features/auth/components/LoginForm";
import SignupForm from "../../features/auth/components/SignupForm";
import DashboardLayout from "../ui/DashboardLayout";
import ResetPassword from "../../features/auth/components/ResetPassword";
import NotAuthorizedPage from "../components/NotAuthorizedPage";
import DynamicContentPage from "../../pages/DynamicContentPage";
import Dashboard from "../../pages/dashboard"
import PracticeQuestionsPage from '../../pages/PracticeQuestionsPage';

export default function AppRoutes() {
  return (
    <div dir="rtl">
      <Routes>
        {/* Routes ללא סיידבר */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Routes עם סיידבר */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/simulation"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <p>Simulation</p>
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
            element={<RecordingsList allowedRoles={["student", "manager"]} />}
          />

          <Route
            path="/shared"
            element={
              <RoleProtectedRoute allowedRoles={["student", "manager"]}>
                <p>SharedRecordings</p>
              </RoleProtectedRoute>
            }
          />

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
            path="/admin/dynamic-content"
            element={
              <RoleProtectedRoute allowedRoles={["manager"]}>
                <DynamicContentPage />
              </RoleProtectedRoute>
            }
          />
        </Route>

        <Route
          path="/practice-questions"
          element={
            <RoleProtectedRoute allowedRoles={["student", "manager"]}>
              <PracticeQuestionsPage />
            </RoleProtectedRoute>
          }
        />

        <Route path="/not-authorized" element={<NotAuthorizedPage />} />
      </Routes>
    </div>
  );
}