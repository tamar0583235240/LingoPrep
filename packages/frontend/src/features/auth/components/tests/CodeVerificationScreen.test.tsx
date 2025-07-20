import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CodeVerificationScreen from "../CodeVerificationScreen";

// Mocks for the mutation hooks
const mockGenerateCode = jest.fn();
const mockValidateCode = jest.fn();

jest.mock("../../../../shared/api/verifyCodeApi", () => ({
  useGenerateCodeMutation: () => [mockGenerateCode],
  useValidateCodeMutation: () => [mockValidateCode],
}));

describe("CodeVerificationScreen", () => {
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    mockOnSuccess.mockClear();
    mockGenerateCode.mockReset();
    mockValidateCode.mockReset();
  });

  it("מציג שדות קלט וכפתורי שליחה", async () => {
    mockGenerateCode.mockReturnValue({
      unwrap: () => Promise.resolve({ isSent: true }),
    });

    const { container } = render(
      <CodeVerificationScreen email="test@example.com" onSuccess={mockOnSuccess} />
    );

    expect(screen.getByText("הזן את קוד האימות שנשלח למייל שלך")).toBeInTheDocument();
    expect(screen.getByText("לא קיבלת קוד? שלח מחדש")).toBeInTheDocument();
    expect(screen.getByText("אשר קוד")).toBeInTheDocument();

    const input = container.querySelector('input[type="password"]');
    expect(input).toBeInTheDocument();

    fireEvent.click(screen.getByText("לא קיבלת קוד? שלח מחדש"));

    await waitFor(() => {
      expect(screen.getByText("קוד נשלח לאימייל שלך.")).toBeInTheDocument();
    });
  });

  it("מאפשר להקליד קוד ואימות עובר בהצלחה", async () => {
    mockValidateCode.mockReturnValue({
      unwrap: () => Promise.resolve({ valid: true, message: "הקוד תקין." }),
    });

    const { container } = render(
      <CodeVerificationScreen email="test@example.com" onSuccess={mockOnSuccess} />
    );

    const input = container.querySelector('input[type="password"]')!;
    const button = screen.getByText("אשר קוד");

    fireEvent.change(input, { target: { value: "123456" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("הקוד תקין.")).toBeInTheDocument();
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it("shows error message for code with invalid length", async () => {
    const { container } = render(
      <CodeVerificationScreen email="test@example.com" onSuccess={mockOnSuccess} />
    );

    const input = container.querySelector('input[type="password"]')!;
    const button = screen.getByText("אשר קוד");

    fireEvent.change(input, { target: { value: "123" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("נא להזין קוד בן 6 ספרות.")).toBeInTheDocument();
    });
  });

  it("shows error on generateAndSendCode failure", async () => {
    mockGenerateCode.mockReturnValue({
      unwrap: () => Promise.reject(new Error("Mock failure")),
    });

    // First render with empty email to avoid useEffect side effect
    const { rerender } = render(
      <CodeVerificationScreen email="" onSuccess={mockOnSuccess} />
    );

    // Trigger actual email after initial render
    rerender(
      <CodeVerificationScreen email="test@example.com" onSuccess={mockOnSuccess} />
    );

    // Manually click resend
    fireEvent.click(screen.getByText("לא קיבלת קוד? שלח מחדש"));

    await waitFor(() => {
      expect(screen.getByText("שגיאה בשליחת הקוד. נא לנסות שנית.")).toBeInTheDocument();
    });
  });

  it("shows message when email is empty", async () => {
    render(<CodeVerificationScreen email="" onSuccess={mockOnSuccess} />);

    await waitFor(() => {
      expect(screen.getByText("נא להזין אימייל תקין.")).toBeInTheDocument();
    });
  });

  it("toggles code visibility", async () => {
    const { container } = render(
      <CodeVerificationScreen email="test@example.com" onSuccess={mockOnSuccess} />
    );

    const inputBefore = container.querySelector('input[type="password"]');
    expect(inputBefore).toBeInTheDocument();

    const toggleButton = container.querySelector("span");
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton!);

    const inputAfter = container.querySelector('input[type="text"]');
    expect(inputAfter).toBeInTheDocument();
  });
});