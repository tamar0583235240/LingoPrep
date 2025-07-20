// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import {store} from './shared/store/store';  // נתיב אל ה־store שלך
import App from './App';

test('renders loading text', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByText(/טוען.../i)).toBeInTheDocument();
});


