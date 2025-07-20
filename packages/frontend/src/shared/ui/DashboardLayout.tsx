import { Outlet } from "react-router-dom";
import SidebarNavigation from "./sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <SidebarNavigation />
      <main className="flex-1 p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
