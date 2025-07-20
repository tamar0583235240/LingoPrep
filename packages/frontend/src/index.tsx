import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/shared/style/globals.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './shared/store/store';
<<<<<<< HEAD
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './shared/store/store';

=======
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
>>>>>>> d4bd717e771642befbf637205599dcde848ed652

root.render(
  <React.StrictMode>
    <Provider store={store}>
<<<<<<< HEAD
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
=======
      
      <App />
>>>>>>> d4bd717e771642befbf637205599dcde848ed652
    </Provider>
  </React.StrictMode>
);

<<<<<<< HEAD
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
=======
reportWebVitals();
>>>>>>> d4bd717e771642befbf637205599dcde848ed652
