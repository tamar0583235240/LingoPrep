import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { useState, useRef, useEffect } from "react";
import { logout } from "../../features/auth/store/authSlice";

import { FaUserCircle, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;
  

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-[--color-primary] border border-[--color-primary] bg-transparent hover:bg-[--color-surface] hover:text-[--color-primary-dark] transition rounded-full p-2"
      >
        <FaUserCircle size={24} />
        <span className="inline">{user.first_name}</span>
      </button>

      {open && (
        <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded shadow-md w-48 z-50">
          <button
            onClick={() => {
              navigate("/profile");
              setOpen(false);
            }}
            className="flex items-center gap-2 space-x-2 w-full text-right px-4 py-2 text-sm hover:bg-gray-100"
          >
            <FaUser />
            <span>פרופיל</span>
          </button>

          <button
            onClick={() => {
              navigate("/settings");
              setOpen(false);
            }}
            className="flex items-center gap-2 space-x-2 w-full text-right px-4 py-2 text-sm hover:bg-gray-100"
          >
            <FaCog />
            <span>הגדרות</span>
          </button>

          <button
            onClick={() => dispatch(logout())}
            className="flex items-center gap-2 space-x-2 w-full text-right px-4 py-2 text-sm hover:bg-gray-100"
          >
            <FaSignOutAlt />
            <span>התנתקות</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
