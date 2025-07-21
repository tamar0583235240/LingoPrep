import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserMenu from "../UserMenu";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../../features/auth/store/authSlice";
import { MemoryRouter } from "react-router-dom";
import type { User } from "../../../features/auth/types/types";

// ⚙️ mock ל־useLogoutMutation
const mockLogout = jest.fn(() => {
  const promise = Promise.resolve({ data: undefined });
  return Object.assign(promise, {
    unwrap: () => promise,
  });
});

// jest.mock("../../../shared/api/authApi", () => ({
//   useLogoutMutation: () => [mockLogout],
// }));
jest.mock("../../../shared/api/authApi", () => ({
  useLogoutMutation: () => [mockLogout],
  authApi: {
    endpoints: {
      refreshToken: {
        matchPending: () => false,
        matchFulfilled: () => false,
        matchRejected: () => false,
      },
    },
  },
}));
// 🧪 משתמש מדומה שעומד בטיפוס החדש של User
const mockUser: User = {
  id: "1",
  first_name: "רבקי",
  last_name: "כהן",
  email: "rivky@example.com",
  phone: "0541234567",
  role: "student", // או "manager" – לפי מה שמוגדר אצלך במערכת
  createdAt: new Date().toISOString(), // כי createdAt הוא string
  isActive: true,
  slug: "rivky-cohen", // הוספת שדה slag
};

// 🧪 רנדרינג עם store
function renderWithStore(user: User | null) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user,
        token: user ? "token" : null,
        loggedIn: !!user,
        loading: false,
        error: null,
        isAdmin: user?.role === "manager",
      },
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <UserMenu />
      </MemoryRouter>
    </Provider>
  );
}

describe("UserMenu", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("מציג את שם המשתמש וכפתור התפריט", () => {
    renderWithStore(mockUser);
    expect(screen.getByText("רבקי")).toBeInTheDocument();
  });

  test("פותח וסוגר את התפריט בלחיצה", () => {
    renderWithStore(mockUser);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByText("פרופיל")).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.queryByText("פרופיל")).not.toBeInTheDocument();
  });

  test("מבצע logout בלחיצה על התפריט", async () => {
    renderWithStore(mockUser);
    fireEvent.click(screen.getByRole("button")); // פותח תפריט
    fireEvent.click(screen.getByText("התנתקות"));

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalledTimes(1);
    });
  });
});
