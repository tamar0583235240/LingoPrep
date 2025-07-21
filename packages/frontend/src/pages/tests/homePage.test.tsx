import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from "../homePage";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

// Mock useNavigate
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: jest.fn(),
    // אפשר להוסיף mocks נוספים אם צריך
  };
});

const mockStore = configureStore([]);

describe("HomePage", () => {
  it("מציג כותרת, תיאור, כפתור ותיבות summary", () => {
    const store = mockStore({
      auth: { isAdmin: false, user: { first_name: "דוגמה" } }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/הדרך הבטוחה/)).toBeInTheDocument();
    expect(
      screen.getByText(/מערכת חדשנית וידידותית לתרגול ראיונות עבודה/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /התחלת סימולציה/i })
    ).toBeInTheDocument();
    expect(screen.getByText("מעקב התקדמות")).toBeInTheDocument();
    expect(screen.getByText("ניתוח AI חכם")).toBeInTheDocument();
    expect(screen.getByText("סימולציות מציאותיות")).toBeInTheDocument();
  });

  it("בלחיצה על כפתור סימולציה מתבצע ניווט", async () => {
    const store = mockStore({
      auth: { isAdmin: false, user: { first_name: "דוגמה" } }
    });
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );

    const simButton = screen.getByRole("button", { name: /התחלת סימולציה/i });
    await userEvent.click(simButton);

    expect(navigate).toHaveBeenCalledWith("/simulation");
  });
});