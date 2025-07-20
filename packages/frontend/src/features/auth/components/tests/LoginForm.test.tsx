// LoginForm.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../LoginForm';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import CodeVerificationScreen from './CodeVerificationScreen';
import { setupStore } from '../../../../shared/store/store';
function renderWithProviders(ui: React.ReactElement) {
  const store = setupStore(); 
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </Provider>
  );
}

describe('LoginForm', () => {
  test('מציג את שדות האימייל והסיסמה וכפתור התחברות', () => {
    renderWithProviders(<LoginForm />);
    
    expect(screen.getByPlaceholderText('אימייל')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('סיסמה')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /התחבר/i })).toBeInTheDocument();
  });

  test('מאפשר למלא אימייל וסיסמה', () => {
    renderWithProviders(<LoginForm />);

    const emailInput = screen.getByPlaceholderText('אימייל');
    const passwordInput = screen.getByPlaceholderText('סיסמה');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    expect((emailInput as HTMLInputElement).value).toBe('test@example.com');
    expect((passwordInput as HTMLInputElement).value).toBe('123456');
  });
});
