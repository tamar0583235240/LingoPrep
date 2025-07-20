import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignupForm from "../SignupForm";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../../shared/store/store"; 

// Mock fetch
global.fetch = jest.fn();

describe("SignupForm", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  const renderForm = () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignupForm />
        </BrowserRouter>
      </Provider>
    );

  it("מציג את טופס ההרשמה", () => {
    renderForm();
    expect(screen.getByPlaceholderText("שם פרטי")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("סיסמה")).toBeInTheDocument();
    expect(screen.getByText("הרשם")).toBeInTheDocument();
  });

  it("מאפשר למלא את השדות", () => {
    renderForm();
    fireEvent.change(screen.getByPlaceholderText("שם פרטי"), {
      target: { value: "שרה" },
    });
    fireEvent.change(screen.getByPlaceholderText("אימייל"), {
      target: { value: "sara@example.com" },
    });
    expect(screen.getByDisplayValue("שרה")).toBeInTheDocument();
    expect(screen.getByDisplayValue("sara@example.com")).toBeInTheDocument();
  });

  it("מציג הודעת שגיאה אם השרת מחזיר שגיאה", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "כתובת אימייל כבר קיימת" }),
    });

    renderForm();
    fireEvent.change(screen.getByPlaceholderText("שם פרטי"), {
      target: { value: "רבקה" },
    });
    fireEvent.change(screen.getByPlaceholderText("שם משפחה"), {
      target: { value: "כהן" },
    });
    fireEvent.change(screen.getByPlaceholderText("אימייל"), {
      target: { value: "rivka@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("סיסמה"), {
      target: { value: "12345678" },
    });

    fireEvent.click(screen.getByText("הרשם"));

    await waitFor(() => {
      expect(screen.getByText("כתובת אימייל כבר קיימת")).toBeInTheDocument();
    });
  });

  it("עובר למסך אימות אם ההרשמה הצליחה", async () => {
    // סימולציה של בקשת הרשמה מוצלחת
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    render(<SignupForm />);

    fireEvent.change(screen.getByPlaceholderText("שם פרטי"), {
      target: { value: "דינה" },
    });
    fireEvent.change(screen.getByPlaceholderText("שם משפחה"), {
      target: { value: "לוי" },
    });
    fireEvent.change(screen.getByPlaceholderText("אימייל"), {
      target: { value: "dina@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("סיסמה"), {
      target: { value: "12345678" },
    });

    fireEvent.click(screen.getByText("הרשם"));

    await waitFor(() => {
      expect(screen.getByText(/קוד אימות נשלח למייל/)).toBeInTheDocument();
      expect(screen.getByText("אמת קוד")).toBeInTheDocument();
    });
  });
});
