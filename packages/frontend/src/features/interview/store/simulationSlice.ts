import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { interviewType } from "../types/questionType";
import { InitialState } from "../types/initialState";



const initialState: InitialState = {
  questions: [],
  currentIndex: 0,
  loading: false,
  currentAnswerId: "", 
  currentCategoryId: "",
  currentUserId: " ", 
};

const simulationSlice = createSlice({
  name: "simulation",
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<interviewType[]>) {
      state.questions = action.payload;
    },
   
    setCurrentAnswerId(state, action: PayloadAction<string | null>) {
      state.currentAnswerId = action.payload ?? "";
    },

    setCurrentCategoryId(state, action: PayloadAction<string | null>) {
      state.currentCategoryId = action.payload ?? "";
    },

    setCurrentUserId(state, action: PayloadAction<string | null>) {
      state.currentUserId = action.payload ?? "";
    },

    goToQuestion(state, action: PayloadAction<number>) {
      state.currentIndex = action.payload;
    }
  },
});

export const {
  setQuestions,

  goToQuestion,
  setCurrentAnswerId,
  setCurrentUserId,
  setCurrentCategoryId
} = simulationSlice.actions;

export default simulationSlice.reducer;