import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question } from '../../recordings/types/Question';


interface AdminQuestionState {
    questions: Question[];
    loading: boolean;
  }

const initialState: AdminQuestionState = {
    questions:[],
    loading: false
}
const adminQuestionSlice = createSlice({
    name: 'adminQuestion',
    initialState,
    reducers: {
        getAllQuestions: (state, action) => {
            state.questions = action.payload;
            state.loading = false;
        },
        deleteQuestionById: (state, action) => {
            state.questions = action.payload;
            state.loading = false;
        }
    }
})

export const { getAllQuestions , deleteQuestionById} = adminQuestionSlice.actions;
export const  adminQuestionReducer = adminQuestionSlice.reducer;
