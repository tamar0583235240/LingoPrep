import LoginForm from "../features/auth/components/LoginForm";
import { useSelector } from "react-redux";
import { RootState } from "../shared/store/store";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    // <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    //   <div className="max-w-xl w-full flex flex-col items-center space-y-6" >
    //     {/* <img src={logo} alt="Logo" className="w-28 h-28" /> */}
    //     <h1 className="text-3xl font-bold">ברוכה הבאה למערכת</h1>
    //     <p className="text-gray-600">התחברי כדי להמשיך</p>
    //     <LoginForm />
    //   </div>
    // </div>
    <LoginForm />
  );
};

export default LoginPage;
