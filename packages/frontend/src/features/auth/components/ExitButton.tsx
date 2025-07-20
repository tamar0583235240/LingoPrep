import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store/store";
import { useLogoutMutation } from "../../../shared/api/authApi";
import { Button } from "../../../shared/ui/button";
import { useNavigate } from "react-router-dom";

export const ExitButton = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }


  const handleLogout = async () => {
    try {
      await logout(user).unwrap();
      navigate("/login");
    } catch (err) {
      console.error("שגיאה בהתנתקות:", err);
    }
  };

  return (
    <Button onClick={handleLogout} disabled={isLoading}>
      {isLoading ? "מתנתק..." : "התנתק"}
    </Button>
  );
};

// export default LogoutButton;
