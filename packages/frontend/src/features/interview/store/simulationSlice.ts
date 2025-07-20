import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { interviewType } from "../types/questionType";
import { InitialState } from "../types/initialState";

// מצב התחלתי
const initialState: InitialState = {
  questions: [],
  currentIndex: 0,
  loading: false,
  currentAnswerId: "", //מזהה תשובה נוכחית
  currentCategoryId: "",
  currentUserId: "00000000-0000-0000-0000-000000000000", //מזהה משתמש נוכחי
};

// יצירת הסלייס
const simulationSlice = createSlice({
  name: "simulation",
  initialState,
  reducers: {
    // עדכון כל השאלות
    setQuestions(state, action: PayloadAction<interviewType[]>) {
      state.questions = action.payload;
    },
    // answeredQuestions(
    //   state,
    //   action: PayloadAction<{ index: number; answer: string; answerId?: string }>
    // ) {
    //   const { index, answer, answerId } = action.payload;
    //   if (state.questions[index]) {
    //     state.questions[index].answer = answer;
    //     state.questions[index].answered = true;
    //     if (answerId) {
    //       state.currentAnswerId = answerId;
    //     }
    //   }
    // },
    setCurrentAnswerId(state, action: PayloadAction<string | null>) {
      state.currentAnswerId = action.payload ?? "";
    },

    setCurrentCategoryId(state, action: PayloadAction<string | null>) {
      state.currentCategoryId = action.payload ?? "";
    },

    setCurrentUserId(state, action: PayloadAction<string | null>) {
      state.currentUserId = action.payload ?? "";
    },

    // resetQuestion(state, action: PayloadAction<number>) {
    //   const index = action.payload;
    //   if (state.questions[index]) {
    //     state.questions[index].answer = "";
    //     state.questions[index].answered = false;
    //   }
    // },

    // nextQuestion(state) {
    //   if (state.currentIndex < state.questions.length - 1) {
    //     state.currentIndex++;
    //   }
    // },

    // prevQuestion(state) {
    //   if (state.currentIndex > 0) {
    //     state.currentIndex--;
    //   }
    // },

    // קפיצה לשאלה ספציפית
    goToQuestion(state, action: PayloadAction<number>) {
      state.currentIndex = action.payload;
    }
  },
});

// יצוא פעולות
export const {
  setQuestions,
  // answeredQuestions,
  // resetQuestion,
  // nextQuestion,
  // prevQuestion,
  goToQuestion,
  setCurrentAnswerId,
  setCurrentUserId,
  setCurrentCategoryId
} = simulationSlice.actions;

// יצוא ברירת מחדל של הרידוסר
export default simulationSlice.reducer;


