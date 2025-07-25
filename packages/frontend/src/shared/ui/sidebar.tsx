import * as FaIcons from "react-icons/fa";
import { useLocation, NavLink } from "react-router-dom";
import { cn } from "../utils/cn";
import { useSelector } from "react-redux";
import React from "react";

const FaGraduationCap = FaIcons.FaGraduationCap as unknown as React.FC;

interface NavItem {
  label: string;
  href: string;
  isSectionTitle?: boolean;
  adminOnly?: boolean;
}

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

  return (
    <aside
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
      </nav>
    </aside>
  );
};

export default SidebarNavigation;
