<<<<<<< HEAD
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './shared/routes/appRoutes';
import './App.css';
import { MessageModalProvider } from './shared/ui/MessageModalContext';
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

>>>>>>> d4bd717e771642befbf637205599dcde848ed652

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
<<<<<<< HEAD
    <MessageModalProvider>  
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <h1>Project base viewer</h1>
          </header>
          <main>
            <AppRoutes />
          </main>
        </div>
      </BrowserRouter>
=======
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
>>>>>>> d4bd717e771642befbf637205599dcde848ed652
    </MessageModalProvider>

       </Provider>
           </GoogleOAuthProvider>
  );
}
<<<<<<< HEAD

export default App;
=======
export default App;
>>>>>>> d4bd717e771642befbf637205599dcde848ed652
