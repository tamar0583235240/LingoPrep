import React, { useState } from 'react';
// import { GoogleLoginButton } from './googleLoginButton';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { login } from '../api/api';

function LoginForm({ onLoginSuccess }: { onLoginSuccess: (token: string, userId: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, seterror] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password, rememberMe)
      .then((res) => {
        console.log(res);
        onLoginSuccess(res.token, res.user.id);
      })
      .catch(() => {
        seterror(true);
      });
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-900 space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white">התחברות</h2>

        <Input
          type="email"
          placeholder="אימייל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label className="flex items-center justify-center space-x-2 gap-1 text-sm text-gray-700 dark:text-gray-300">
          <Input
            type="checkbox"
            className="w-4 h-4"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span>זכור אותי</span>
        </label>

        {error && (
          <p className="text-red-500 text-sm text-center">אימייל או סיסמה לא נכונים</p>
        )}

        <Button type="submit" className="w-full">
          התחבר
        </Button>
      </form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm text-gray-500 dark:text-gray-400">
          <span className="bg-white dark:bg-gray-900 px-2">או התחברות עם</span>
        </div>
      </div>
      <div className="flex justify-center">
        <GoogleLoginButton onSuccess={onLoginSuccess} />
      </div> */}
    </div>
  );
}

export default LoginForm;
