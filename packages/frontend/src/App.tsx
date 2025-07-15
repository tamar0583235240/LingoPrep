import React, { useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./shared/routes/appRoutes";

import "./App.css";
import { MessageModalProvider } from "./shared/ui/MessageModalContext";
import { loginStart, loginSuccess, logout } from './features/auth/store/authSlice';
import { useRefreshTokenMutation } from './shared/api/authApi';

import { useAppDispatch } from "./shared/hooks/reduxHooks";

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
      </BrowserRouter>
    </MessageModalProvider>
  );
}

export default App;


// --------------------------------------------------
// import React from 'react';
// import { Provider } from 'react-redux';
// import { setupListeners } from '@reduxjs/toolkit/query';
// import { configureStore } from '@reduxjs/toolkit';

// import { api } from './shared/api/api';
// import SharedRecordings from './features/shared-recordings/components/SharedRecordings';

// import './App.css';

// // הגדרת החנות (store)
// const store = configureStore({
//   reducer: {
//     [api.reducerPath]: api.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(api.middleware),
// });

// setupListeners(store.dispatch);

// function App() {
//   const userId = 'user1';

//   return (
//     <Provider store={store}>
//       <div className="App">
//         <header className="App-header">
//           <h1>Project base viewer</h1>
//         </header>

//         <main>
//           <SharedRecordings userId={userId} />
//         </main>
//       </div>
//     </Provider>
//   );
// }

// export default App;

