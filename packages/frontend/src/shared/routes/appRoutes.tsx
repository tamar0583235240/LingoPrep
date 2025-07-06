import { Routes, Route } from "react-router-dom";
import { RoleProtectedRoute } from "../components/roleProtectedRoute";
import HomePage from "../../pages/homePage";
import { RecordingsList } from "../../features/recordings/components/recordingsList";
import { SearchComponents } from "../../features/recordings/components/searchComponents";
import { FilteringComponents } from "../../features/recordings/components/filteringComponents";
import { SortComponents } from "../../features/recordings/components/sortComponents"
import { AdminQuestions } from "../../features/admin/components/adminQuestions";
import ForgotPassword from "../../features/auth/components/ForgotPassword";
import LoginForm from "../../features/auth/components/LoginForm";
import SignupForm from "../../features/auth/components/SignupForm";
import DashboardLayout from "../ui/DashboardLayout";
import ResetPassword from "../../features/auth/components/ResetPassword";
import RemindersPage from "../../pages/remindersPage";

export default function AppRoutes() {
  return (
    <div dir="rtl">
      <Routes>
        {/* Routes without sidebar */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* Routes with sidebar */}

        <Route path="/login" element={<p>login</p>} />
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/simulation"
            element={
              <RoleProtectedRoute allowedRoles={['student']}>
                <p>Simulation</p>
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RoleProtectedRoute allowedRoles={['student']}>
                <p>Dashboard</p>
              </RoleProtectedRoute>
            }
          />
          <Route path="/recordings" element={<RecordingsList allowedRoles={["student"]} />} />
          <Route path="/shared" element={<RoleProtectedRoute allowedRoles={["student"]}><p>SharedRecordings</p></RoleProtectedRoute>} />
          <Route path="/resources" element={<RoleProtectedRoute allowedRoles={["student"]}><p>Resources</p></RoleProtectedRoute>} />
          <Route path="/reminders" element={<RoleProtectedRoute allowedRoles={["student"]}><RemindersPage/></RoleProtectedRoute>} />

          <Route
            path="/interviewMaterialsHub"
            element={
              <RoleProtectedRoute allowedRoles={['student']}>
                <p>InterviewMaterialsHub</p>
              </RoleProtectedRoute>
            }
          />
          <Route path="/admin/questions" element={
            <AdminQuestions allowedRoles={["admin"]}>
              <p>AdminQuestions</p>
            </AdminQuestions>
          } />
          <Route path="/admin/users" element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <p>AdminUsers</p>
            </RoleProtectedRoute>
          } />
          <Route path="/admin/resources" element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <p>AdminResources</p>
            </RoleProtectedRoute>
          } />
        </Route>
      </Routes>
    </div>
  );
}







