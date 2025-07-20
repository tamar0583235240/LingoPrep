import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Answer } from '../types/Answer';
import { Question } from '../types/Question';

interface AnswerState {
  data: Answer[];
  loading: boolean;
}

const initialState: AnswerState = {
  data: [],
  loading: false,
};



interface QuestionState {
  dataQ: Question | null;
  loading: boolean;
}

const initialStateQ: QuestionState = {
  dataQ: null,
  loading: false,
};

const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {
    getAnswerByUserId(state, action: PayloadAction<Answer>) {
      const index = state.data.findIndex(answer => answer.user_id === action.payload.user_id);
      if (index !== -1)
        state.data[index] = action.payload;
      else
        state.data.push(action.payload);
    },
  },
});

const questionSlice = createSlice({
  name: 'question',
  initialState: initialStateQ,
  reducers: {
    getQuestionById(state, action: PayloadAction<Question>) {
      state.dataQ = action.payload;
    }
  },
});
export const  { getAnswerByUserId } = answerSlice.actions;
export const  { getQuestionById } = questionSlice.actions;
export const answerReducer = answerSlice.reducer;
export const questionReducer = questionSlice.reducer;
