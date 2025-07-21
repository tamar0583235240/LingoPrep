import React from "react";
import { render, screen } from "@testing-library/react";
import { RoleProtectedRoute } from "../roleProtectedRoute";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../../features/auth/store/authSlice";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { User } from "../../../features/auth/types/types";

const mockManager: User = {
  id: "1",
  first_name: "משתמש",
  last_name: "כלשהו",
  email: "test@example.com",
  role: "manager",
  createdAt: new Date().toISOString(),
  isActive: true,
  slug: "test-slug",
};

const mockStudent: User = {
  ...mockManager,
  role: "student",
};

function renderWithStore(user: User | null, allowedRoles: string[], childrenText: string) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user,
        token: null,
        loggedIn: !!user,
        loading: false,
        error: null,
        isAdmin: user?.role === "manager",
      },
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <RoleProtectedRoute allowedRoles={allowedRoles}>
                <div>{childrenText}</div>
              </RoleProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}

describe("RoleProtectedRoute", () => {
  test("מציג את התוכן כאשר המשתמש מחובר ויש לו הרשאה מתאימה", () => {
    renderWithStore(mockManager, ["manager", "student"], "תוכן מוגן");
    expect(screen.getByText("תוכן מוגן")).toBeInTheDocument();
  });

  test("מפנה ל /login כאשר המשתמש לא מחובר", () => {
    renderWithStore(null, ["manager"], "תוכן מוגן");
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  test("מפנה ל /login כאשר למשתמש אין הרשאה מתאימה", () => {
    renderWithStore(mockStudent, ["manager"], "תוכן מוגן");
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
});
