// import { useSelector } from "react-redux";
import * as FaIcons from "react-icons/fa";
import { useLocation, NavLink } from "react-router-dom";
import { cn } from "../utils/cn";
import { useSelector } from "react-redux";
import React from "react";
import { ExitButton } from "../../features/auth/components/ExitButton";
import { ReminderBell } from "./RemindersSidebar";
import { RootState } from '../../shared/store/store';

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
  { label: "מרכז חומרי ראיונות", href: "/interviewMaterialsHub" },
  { label: "תרגול מקצועי", href: "/practiceQuestionsUser" },
  { label: "פרופילים", href: "/profiles" },
  { label: "מנהל", href: "", isSectionTitle: true, adminOnly: true },
  { label: "ניהול שאלות", href: "/manager/questions", adminOnly: true },
  { label: "ניהול משתמשים", href: "/manager/users", adminOnly: true },
  { label: "ניהול משאבים", href: "/manager/resources", adminOnly: true },
  { label: "ניהול חומרים", href: "/manager/interview-materials", adminOnly: true, },

  { label: "ניהול הקלטות", href: "/auto-delete-config", adminOnly: true },

];

const SidebarNavigation = () => {
  const location = useLocation();

  const isAdmin = useSelector((state: RootState) =>
    (state.auth.user?.role ?? "").toLowerCase().includes("manager")
  );

  return (
    <aside
      className="w-64 h-screen bg-white shadow-md p-4 flex flex-col text-right fixed top-0 right-0 overflow-y-auto"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-center justify-start gap-2 mb-6">
        <div className="bg-primary text-white p-2 rounded-md">
          <FaGraduationCap />
        </div>
        <h1 className="text-xl font-bold text-text-main">Interview Pro</h1>
        {isAdmin && <ReminderBell />}
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

      <ExitButton />
    </aside>
  );
};

export default SidebarNavigation;
