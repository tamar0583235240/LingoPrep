import { useSelector } from 'react-redux';
import { RootState } from '../shared/store/store';
import { Navigate } from 'react-router-dom';
import LoginForm from '../features/auth/components/LoginForm';
import SignupForm from '../features/auth/components/SignupForm';
import { useState } from 'react';

const AuthRedirectPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [showSignup, setShowSignup] = useState(false);

  if (user) {
    // אם המשתמש מחובר – הפניה אוטומטית לדף הבית
    return <Navigate to="/home" />;
  }

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>{showSignup ? 'הרשמה' : 'התחברות'}</h2>
      {showSignup ? <SignupForm /> : <LoginForm />}
      <button onClick={() => setShowSignup(!showSignup)} style={{ marginTop: '1rem' }}>
        {showSignup ? 'יש לך חשבון? התחבר' : 'אין לך חשבון? הרשם'}
      </button>
    </div>
  );
};

export default AuthRedirectPage;
