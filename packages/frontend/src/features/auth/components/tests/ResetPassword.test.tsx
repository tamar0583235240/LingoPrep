import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ResetPassword from "../ResetPassword";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { setupStore } from "../../../../shared/store/store";
import * as api from "../../../../shared/api/passwordApi";

function renderWithProviders(ui: React.ReactElement, search = "?token=abc123") {
  window.history.pushState({}, "Test page", search);
  const store = setupStore();
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
}

describe("ResetPassword", () => {
  test("renders new password and confirm password fields", () => {
    renderWithProviders(<ResetPassword />);
    expect(screen.getByLabelText("סיסמה חדשה:")).toBeInTheDocument();
    expect(screen.getByLabelText("אימות סיסמה:")).toBeInTheDocument();
  });

  test("validates short password", async () => {
    renderWithProviders(<ResetPassword />);
    fireEvent.change(screen.getByLabelText("סיסמה חדשה:"), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByLabelText("אימות סיסמה:"), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button"));

    await screen.findByText("לפחות 6 תווים");
  });

  test("validates password mismatch", async () => {
    renderWithProviders(<ResetPassword />);
    fireEvent.change(screen.getByLabelText("סיסמה חדשה:"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByLabelText("אימות סיסמה:"), {
      target: { value: "abcdef" },
    });
    fireEvent.click(screen.getByRole("button"));

    await screen.findByText("הסיסמאות אינן תואמות");
  });

  test("shows success message after successful reset", async () => {
    const spy = jest.spyOn(api, "useResetPasswordMutation").mockReturnValue([
      async () => { },
      { isLoading: false, isSuccess: true, isError: false, error: null },
    ] as any);

    renderWithProviders(<ResetPassword />);
    fireEvent.change(screen.getByLabelText("סיסמה חדשה:"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByLabelText("אימות סיסמה:"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText("הסיסמה אופסה בהצלחה!")).toBeInTheDocument();
    });

    spy.mockRestore();
  });
});
