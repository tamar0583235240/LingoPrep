import { loginWithGoogle } from "../api/api";
import { Chrome } from 'lucide-react';
import { Button } from "../ui/button";

export const GoogleLoginButton = ({ onSuccess }: { onSuccess: (token: string, userId: string) => void }) => {
  const handleLogin = () => {
    const redirectUri = chrome.identity.getRedirectURL();
    const clientId = '953970619581-k1a6eb1lg0eh0j6ea46rktpelhvfnd3d.apps.googleusercontent.com';
    const scope = "openid email profile";
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scope)}`;

    chrome.identity.launchWebAuthFlow(
      {
        url: authUrl,
        interactive: true
      },
      function (redirectUrl) {
        if (chrome.runtime.lastError || !redirectUrl) {
          console.error("Login failed:", chrome.runtime.lastError);
          return;
        }

        const params = new URLSearchParams(new URL(redirectUrl).hash.substring(1));
        const accessToken = params.get("access_token");
        if (accessToken) {
          console.log("Access Token:", accessToken);
          loginWithGoogle(accessToken).then((response) => {
            if (response.status === 200) {
              const userId = response.data.user.id;
              console.log("User ID:", userId);
              onSuccess(accessToken, userId);
            } else {
              console.error("Login failed with status:", response.status);
            }
          }).catch((error) => {
            console.error("Error during login:", error);
          });
        }
      }
    );
  };

  return (
    <Button  onClick={handleLogin}>
      Google
      <Chrome />
    </Button>
  );
};
