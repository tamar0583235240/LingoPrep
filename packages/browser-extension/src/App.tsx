import { useEffect, useState } from "react";
import LoginForm from "./components/loginForm";
import { OverlayPopup } from "./components/overlayPopup";
import { refreshToken } from "./api/api";
import { Button } from "./ui/button";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const webUrl = import.meta.env.WEB_URL || 'http://localhost:3000/';

  const handleLoginSuccess = (token: string, userId: string) => {
    setIsLoggedIn(true);
    setToken(token);
    setUserId(userId);
    console.log("login success", token);
  }

  useEffect(() => {
    const checkLogin = async () => {
      const data = await refreshToken();
      if (data && data.token) {
        setIsLoggedIn(true);
        setToken(data.token);
        setUserId(data.user.id);
      }
    };
    checkLogin();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center  bg-[--color-background] p-4 space-y-4">
      {isLoggedIn && token && userId ? (
        <OverlayPopup token={token} userId={userId} />
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}
      <Button className="justify-center" onClick={() => window.open(webUrl, '_blank')}>
        <span>התחברות למערכת הראשית</span>
      </Button>
    </div>
  );
};

export default App;