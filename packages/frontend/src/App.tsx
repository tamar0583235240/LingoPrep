<<<<<<< HEAD
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './shared/routes/appRoutes';
import './App.css';
import { MessageModalProvider } from './shared/ui/MessageModalContext';

function App() {
  return (
    <MessageModalProvider>  
      <BrowserRouter>
        <div className="App">
          {/* <header className="App-header">
            <h1>Project base viewer</h1>
          </header> */}
          <main>
            <AppRoutes />
          </main>
        </div>
      </BrowserRouter>
    </MessageModalProvider>

=======

import './App.css';
import { MessageModalProvider } from './shared/ui/MessageModalContext';
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./shared/routes/appRoutes";
import { Provider } from 'react-redux';
import { store } from './shared/store/store';
import { useAppDispatch } from './shared/hooks/reduxHooks';
import { loginStart, loginSuccess, logout } from './features/auth/store/authSlice';
import { useRefreshTokenMutation } from './shared/api/authApi';
import { GoogleOAuthProvider } from '@react-oauth/google';


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
 const clientId = '412263291390-jkirnvmjnk6qbera6qcdq3k6cotqk9o7.apps.googleusercontent.com';
 
  return (
    <GoogleOAuthProvider clientId={clientId}>
    <Provider store={store}>
        
     <MessageModalProvider>
      <>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
       {/* <EditInterviewMaterialsSubForm
  id="some-id"
  defaultValues={{ title: "", short_description: "" }}
  onSuccess={() => console.log("Saved!")}
  onCancel={() => console.log("Cancelled")}
  /> */}
   </>
    </MessageModalProvider>

       </Provider>
           </GoogleOAuthProvider>
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
  );
}
export default App;