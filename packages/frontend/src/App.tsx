import React, { useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./shared/routes/appRoutes";

import "./App.css";
import { MessageModalProvider } from "./shared/ui/MessageModalContext";
import { loginStart, loginSuccess, logout } from './features/auth/store/authSlice';
import { useRefreshTokenMutation } from './shared/api/authApi';

import { useAppDispatch } from "./shared/hooks/reduxHooks";
import { InterviewExperiencesList } from './features/interviewExperiences/components/interviewExperiencesList';
import { QuestionStatsChart } from './features/dashboard/components/QuestionStatsChart';

function App() {
  const dispatch = useAppDispatch();
  const [refreshTokenTrigger] = useRefreshTokenMutation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(loginStart());

    refreshTokenTrigger()
      .unwrap()
      .then((res) => {
        console.log("הצלחה!", res);
        dispatch(loginSuccess({ token: res.token, user: res.user }));
      })
      .catch((err) => {
        console.log("נכשל ברענון הטוקן", err);
        dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>טוען...</p>;

  return (
    <MessageModalProvider>
      <BrowserRouter>
        <AppRoutes />
        <InterviewExperiencesList></InterviewExperiencesList>
        {/* <div className="p-4"> */}
          <QuestionStatsChart total={100} completed={2} />
        {/* </div> */}
      </BrowserRouter>
    </MessageModalProvider>
  );
}

export default App;
