// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import 'cross-fetch/polyfill';



jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

jest.mock('sweetalert2-react-content', () => {
  return jest.fn(() => ({
    fire: jest.fn(),
  }));
});

