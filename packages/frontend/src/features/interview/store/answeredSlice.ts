import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AnsweredAnswer = {
  id: string; 
  question: {
    id: string;
    text?: string;
  };
};

type AnsweredState = {
  answeredAnswers: AnsweredAnswer[];
};

const initialState: AnsweredState = {
  answeredAnswers: [],
};

const answeredSlice = createSlice({
  name: "answered",
  initialState,
  reducers: {
    setAnsweredAnswers: (state, action: PayloadAction<AnsweredAnswer[]>) => {
      state.answeredAnswers = action.payload;
    },

    addAnsweredAnswer: (state, action: PayloadAction<AnsweredAnswer>) => {
      const alreadyExists = state.answeredAnswers.some(
        (a) => a.question.id === action.payload.question.id
      );
      if (!alreadyExists) {
        state.answeredAnswers.push(action.payload);
      }
    },

    clearAnswers: (state) => {
      state.answeredAnswers = [];
    },
  },
});

export const { setAnsweredAnswers, addAnsweredAnswer, clearAnswers } =
  answeredSlice.actions;

export default answeredSlice.reducer;