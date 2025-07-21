import { FaGraduationCap } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { cn } from "../utils/cn";
<<<<<<< HEAD

export interface NavItem {
=======
import { useSelector } from "react-redux";
import React from "react";

const FaGraduationCap = FaIcons.FaGraduationCap as unknown as React.FC;

interface NavItem {
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
  label: string;
  href: string;
  isSectionTitle?: boolean;
  adminOnly?: boolean;
}

<<<<<<< HEAD
interface SidebarProps {
  navItems: NavItem[];
  currentPath: string;
}
=======
const navItems: NavItem[] = [
  { label: "סימולציה", href: "/simulation" },
  { label: "לוח בקרה", href: "/dashboard" },
  { label: "ההקלטות שלי", href: "/recordings" },
  { label: "הקלטות משותפות", href: "/shared" },
  { label: "משאבים", href: "/resources" },
  { label: "פרופילים", href: "/profiles" },
  { label: "מנהל", href: "", isSectionTitle: true, adminOnly: true },
  { label: "ניהול שאלות", href: "/manager/questions", adminOnly: true },
  { label: "ניהול משתמשים", href: "/manager/users", adminOnly: true },
  { label: "ניהול משאבים", href: "/manager/resources", adminOnly: true },
  { label: "ניהול חומרים", href: "/manager/interview-materials", adminOnly: true, },
  { label: "מרכז חומרי ראיונות", href: "/interviewMaterialsHub", adminOnly: true },
];

const SidebarNavigation = () => {
  const location = useLocation();
  const isAdmin = useSelector(
    (state: { auth: { isAdmin: boolean } }) => state.auth.isAdmin
  );
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568

const Sidebar = ({ navItems, currentPath }: SidebarProps) => {
  return (
    <aside
<<<<<<< HEAD
      className="fixed right-0 top-0 w-64 h-screen bg-white shadow-md p-4 flex flex-col text-right z-40 border-l border-border"
      dir="rtl"
    >
      <div className="flex items-center justify-end gap-2 mb-8">
        <div className="bg-primary text-white p-2 rounded-full flex items-center justify-center">
          <MdMail size={22} />
        </div>
        <h1 className="text-xl font-bold text-text-main">Interview Pro</h1>
      </div>
      <nav className="flex-1 flex flex-col gap-2 overflow-y-auto pr-1 custom-scrollbar">
        {navItems.map(({ label, href, isSectionTitle }) =>
          isSectionTitle ? (
            <div
              key={label}
              className="pl-4 pr-2 py-2 text-text-secondary text-xs font-semibold mt-4 mb-1 tracking-wide"
            >
              {label}
            </div>
          ) : (
            <NavLink
              key={label}
              to={href}
              className={({ isActive }) =>
                cn(
                  "block px-4 py-2 rounded-md text-sm font-medium transition",
                  isActive || currentPath === href
                    ? "bg-primary text-white shadow"
                    : "text-text-main hover:bg-primary/10"
                )
              }
            >
              {label}
            </NavLink>
          )
        )}
=======
      className="w-64 h-screen bg-white shadow-md p-4 flex flex-col text-right fixed top-0 right-0 overflow-y-auto"
      dir="rtl"
    >
      <div className="flex items-center justify-start gap-2 mb-6">
        <div className="bg-primary text-white p-2 rounded-md">
          <FaGraduationCap />
        </div>
        <h1 className="text-xl font-bold text-text-main">Interview Pro</h1>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems
          .filter((item) => !item.adminOnly || (item.adminOnly && isAdmin))
          .map(({ label, href, isSectionTitle }) =>
            isSectionTitle ? (
              <div
                key={label}
                className="pl-4 pr-2 py-6 text-text-secondary text-lg font-semibold "
              >
                {label}
              </div>
            ) : (
              <NavLink
                key={label}
                to={href}
                className={({ isActive }) =>
                  cn(
                    "block px-4 py-3 rounded-md text-l font-medium transition",
                    isActive || location.pathname === href
                      ? "bg-primary text-white"
                      : "hover:bg-primary/10"
                  )
                }
              >
                {label}
              </NavLink>
            )
          )}
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
      </nav>
    </aside>
  );
};

export default Sidebar;



// import * as FaIcons from "react-icons/fa";
// import { useLocation, NavLink } from "react-router-dom";
// import { cn } from "../utils/cn";
// import React from "react";
// import { ExitButton } from "../../features/auth/components/ExitButton";

// const FaGraduationCap = FaIcons.FaGraduationCap as unknown as React.FC;


// interface NavItem {
//   label: string;
//   href: string;
//   isSectionTitle?: boolean;
// }

// const navItems: NavItem[] = [
//   { label: "Home", href: "/" },
//   { label: "Simulation", href: "/simulation" },
//   { label: "Dashboard", href: "/dashboard" },
//   { label: "My Recordings", href: "/recordings" },
//   { label: "Shared Recordings", href: "/shared" },
//   { label: "Resources", href: "/resources" },
//   { label: "Admin", href: "", isSectionTitle: true },
//   { label: "Manage Questions", href: "/admin/questions" },
//   { label: "Manage Users", href: "/admin/users" },
//   { label: "Manage Resources", href: "/admin/resources" },
// ];

// const SidebarNavigation = () => {
//   const location = useLocation();

//   return (
//     <aside
//       className="w-64 h-screen bg-white shadow-md p-4 flex flex-col text-right"
//       dir="rtl"
//     >
//       {/* Header */}
//       <div className="flex items-center justify-start gap-2 mb-6">
//         <div className="bg-primary text-white p-2 rounded-md">
//           <FaGraduationCap />
//         </div>
//         <h1 className="text-xl font-bold text-text-main">Interview Pro</h1>
//       </div>

//       {/* Navigation */}
//       <nav className="flex flex-col gap-2">
//         {navItems.map(({ label, href, isSectionTitle }) =>
//           isSectionTitle ? (
//             <div
//               key={label}
//               className="pl-4 pr-2 py-2 text-text-secondary text-sm font-semibold"
//             >
//               {label}
//             </div>
//           ) : (
//             <NavLink
//               key={label}
//               to={href}
//               className={({ isActive }) =>
//                 cn(
//                   "block px-4 py-2 rounded-md text-sm font-medium transition",
//                   isActive || location.pathname === href
//                     ? "bg-primary text-white"
//                     : "text-text-main hover:bg-primary/10"
//                 )
//               }
//             >
//               {label}
//             </NavLink>
//           )
//         )}
//       </nav>
    
//       <ExitButton />
//     </aside>
//   );
// };

// export default SidebarNavigation;