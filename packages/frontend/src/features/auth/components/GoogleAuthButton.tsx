import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../store/authSlice";
import { useAuthWithGoogleMutation } from "../../../shared/api/userApi";

const clientId = "412263291390-jkirnvmjnk6qbera6qcdq3k6cotqk9o7.apps.googleusercontent.com";

const GoogleAuthButton = () => {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authWithGoogle] = useAuthWithGoogleMutation();

  const onSuccess = async (response: any) => {
    try {
      const credential = response.credential;
      if (!credential) throw new Error("לא התקבל טוקן מזהה מ-Google");

      const res = await authWithGoogle(credential).unwrap();


      localStorage.setItem("auth", JSON.stringify({ token: res.token, user: res.user }));

      dispatch(loginSuccess({ user: res.user, token: res.token }));
      navigate("/");


    } catch (error: any) {
      dispatch(loginFailure(error?.data?.message || "שגיאה בהתחברות עם Google"));
      MySwal.fire({
        title: "שגיאה",
        text: "התחברות נכשלה",
        icon: "error",
        confirmButtonText: "אישור",
      });
    }
  };

  const onError = () => {
    MySwal.fire({
      title: "שגיאה",
      text: "לא ניתן להתחבר עם חשבון Google",
      icon: "error",
      confirmButtonText: "אישור",
    });
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        useOneTap 
        width="100%"
        shape="pill"
        text="signin_with"
        locale="he"
        theme="outline"
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthButton;
