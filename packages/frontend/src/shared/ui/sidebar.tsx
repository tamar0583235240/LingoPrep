import * as FaIcons from "react-icons/fa";
import { useLocation, NavLink } from "react-router-dom";
import { cn } from "../utils/cn";
import React from "react";
import { ExitButton } from "../../features/auth/components/ExitButton";

const FaGraduationCap = FaIcons.FaGraduationCap as unknown as React.FC;


interface NavItem {
  label: string;
  href: string;
  isSectionTitle?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Simulation", href: "/simulation" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "My Recordings", href: "/recordings" },
  { label: "Shared Recordings", href: "/shared" },
  { label: "Resources", href: "/resources" },
  { label: "Admin", href: "", isSectionTitle: true },
  { label: "Manage Questions", href: "/admin/questions" },
  { label: "Manage Tips & Practices", href: "/admin/reminders" },
  { label: "Manage Users", href: "/admin/users" },
  { label: "Manage Resources", href: "/admin/resources" },
  { label: "Manage Dynamic Content", href: "/admin/dynamic-content" }, // ← הוספה חדשה

];

const SidebarNavigation = () => {
  const location = useLocation();

  return (
    <aside
      className="w-64 h-screen bg-white shadow-md p-4 flex flex-col text-right"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-center justify-start gap-2 mb-6">
        <div className="bg-primary text-white p-2 rounded-md">
          <FaGraduationCap />
        </div>
        <h1 className="text-xl font-bold text-text-main">Interview Pro</h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {navItems.map(({ label, href, isSectionTitle }) =>
          isSectionTitle ? (
            <div
              key={label}
              className="pl-4 pr-2 py-2 text-text-secondary text-sm font-semibold"
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
                  isActive || location.pathname === href
                    ? "bg-primary text-white"
                    : "text-text-main hover:bg-primary/10"
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
