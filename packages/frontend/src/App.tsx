import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';

import { store } from './shared/store/store';
import { useAppDispatch } from './shared/hooks/reduxHooks';
import { loginStart, loginSuccess, logout } from './features/auth/store/authSlice';
import { useRefreshTokenMutation } from './shared/api/authApi';
import AppRoutes from './shared/routes/appRoutes';
import { MessageModalProvider } from './shared/ui/MessageModalContext';

function AppWrapper() {
  const dispatch = useAppDispatch();
  const [refreshTokenTrigger] = useRefreshTokenMutation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(loginStart());

    refreshTokenTrigger()
      .unwrap()
      .then((res) => {
        console.log('הצלחה!', res);
        dispatch(loginSuccess({ token: res.token, user: res.user }));
      })
      .catch((err) => {
        console.log('נכשל ברענון הטוקן', err);
        dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>טוען...</p>;

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function App() {
  const clientId = '412263291390-jkirnvmjnk6qbera6qcdq3k6cotqk9o7.apps.googleusercontent.com';

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <MessageModalProvider>
          <AppWrapper />
        </MessageModalProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
