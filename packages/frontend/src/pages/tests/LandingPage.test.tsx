import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LandingPage from "../LandingPage";
import { Provider } from "react-redux";
import { MemoryRouter, useNavigate } from "react-router-dom";
import configureStore from "redux-mock-store";

// Mock useNavigate
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: jest.fn(),
  };
});

const mockStore = configureStore([]);

describe("LandingPage", () => {
  it("מציג טקסט, תיאור וכפתור התחברות", () => {
    const store = mockStore({ auth: { user: null } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LandingPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("תתכונני. תתנסי. תצליחי.")).toBeInTheDocument();
    expect(
      screen.getByText("מערכת חכמה להכנה אישית לראיון עבודה.")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /התחבר למערכת/i })
    ).toBeInTheDocument();
  });

  it("בלחיצה על כפתור התחברות קורא ל-navigate", async () => {
    const store = mockStore({ auth: { user: null } });
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LandingPage />
        </MemoryRouter>
      </Provider>
    );

    const button = screen.getByRole("button", { name: /התחבר למערכת/i });
    await userEvent.click(button);

    expect(navigate).toHaveBeenCalledWith("/login");
  });
});