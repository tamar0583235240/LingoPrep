import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ForgotPassword from "../ForgotPassword";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { setupStore } from "../../../../shared/store/store";

function renderWithProviders(ui: React.ReactElement) {
  const store = setupStore();
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
}

describe("ForgotPassword", () => {
  test("renders email input and submit button", () => {
    renderWithProviders(<ForgotPassword />);
    expect(screen.getByLabelText(/אימייל/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /שלח קישור לאיפוס סיסמה/i })
    ).toBeInTheDocument();
  });

  test("validates invalid email input", async () => {
    renderWithProviders(<ForgotPassword />);

    const emailInput = screen.getByLabelText(/אימייל/i);
    const submitButton = screen.getByRole("button", {
      name: /שלח קישור לאיפוס סיסמה/i,
    });

    fireEvent.change(emailInput, { target: { value: "not-an-email" } });
    fireEvent.click(submitButton);

    // מחכים שהטקסט של שגיאת האימייל יופיע
    await waitFor(() =>
      expect(screen.getByText(/אימייל לא תקין/i)).toBeInTheDocument()
    );
  });

  test("sends request when email is valid", async () => {
    renderWithProviders(<ForgotPassword />);

    const emailInput = screen.getByLabelText(/אימייל/i);
    const submitButton = screen.getByRole("button", {
      name: /שלח קישור לאיפוס סיסמה/i,
    });

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.click(submitButton);

    // מחכים להודעה שהבקשה הצליחה להישלח
    await waitFor(() =>
      expect(
        screen.getByText(/אם user@example.com קיים במערכת – נשלחה אליו הודעה/i)
      ).toBeInTheDocument()
    );
  });
});
