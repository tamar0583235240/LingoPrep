import { JSX, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface Props {
  children: JSX.Element;
  allowedRoles: string[];
}

export function RoleProtectedRoute({ children, allowedRoles }: Props): JSX.Element | null {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("משתמש לא מחובר");
      navigate("/login", { replace: true });
    } else if (
      allowedRoles.length > 0 &&
      !allowedRoles.includes(user.role)
    ) {
      console.log("אין הרשאה");
      navigate("/not-authorized", { replace: true });
    }
  }, [user, allowedRoles, navigate]);

  if (!user || !allowedRoles.includes(user.role)) {
    return null; // או spinner או redirect אם רוצים
  }

  console.log("הרשאה מאושרת, מציג תוכן");
  return children;
}
