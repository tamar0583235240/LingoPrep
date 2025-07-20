import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  firstName: string;
  role: string;
}

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: { firstName: "דוגמה", role: "student" }, // אפשר גם null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
