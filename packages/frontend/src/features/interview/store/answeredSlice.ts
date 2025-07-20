import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// טיפוס לתשובה שנענתה
export type AnsweredAnswer = {
  id: string; // מזהה התשובה (יכול להיות מזהה שרת)
  question: {
    id: string;
    text?: string;
    // אפשר להוסיף עוד שדות אם צריך
  };
};

// טיפוס ל-state
type AnsweredState = {
  answeredAnswers: AnsweredAnswer[];
};

// מצב התחלתי
const initialState: AnsweredState = {
  answeredAnswers: [],
};

// יצירת ה-slice
const answeredSlice = createSlice({
  name: "answered",
  initialState,
  reducers: {
    // החלפת כל רשימת התשובות
    setAnsweredAnswers: (state, action: PayloadAction<AnsweredAnswer[]>) => {
      state.answeredAnswers = action.payload;
    },

    // הוספת תשובה חדשה רק אם לא קיימת כבר
    addAnsweredAnswer: (state, action: PayloadAction<AnsweredAnswer>) => {
      const alreadyExists = state.answeredAnswers.some(
        (a) => a.question.id === action.payload.question.id
      );
      if (!alreadyExists) {
        state.answeredAnswers.push(action.payload);
      }
    },

    // איפוס הרשימה
    clearAnswers: (state) => {
      state.answeredAnswers = [];
    },
  },
});

export const { setAnsweredAnswers, addAnsweredAnswer, clearAnswers } =
  answeredSlice.actions;

export default answeredSlice.reducer;