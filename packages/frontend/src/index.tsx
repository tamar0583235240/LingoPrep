import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/shared/style/globals.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from '../src/shared/store/store'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';




const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode> 
);

reportWebVitals();
