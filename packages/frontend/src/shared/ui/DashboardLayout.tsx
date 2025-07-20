<<<<<<< HEAD
import { Outlet, useLocation } from "react-router-dom";
import HomeButton from "../components/HomeButton";
import UserMenu from "../components/UserMenu";

const DashboardLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  return (
    <div className="flex h-screen">
      <div className="fixed top-4 left-6 flex items-center gap-2 z-50">
        <HomeButton />
        <UserMenu />
      </div>
      <main className="flex-1 p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
=======
// import { Outlet } from "react-router-dom";
// import SidebarNavigation from "./sidebar";

// const DashboardLayout = () => {
//   return (
//     <div className="flex h-screen">
//       <SidebarNavigation />
//       <main className="flex-1 p-4 overflow-auto">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default DashboardLayout;
>>>>>>> 14ad18fed386adbd7cb367985a58061b67a011bb
