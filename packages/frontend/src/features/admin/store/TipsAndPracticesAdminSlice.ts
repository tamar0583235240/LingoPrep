import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tip } from '../types/Tips';
import { Practice } from '../types/Practices';

interface AdminTipsAndPracticesState {
  tips: Tip[];
  practices: Practice[];
  loading: boolean;
}

const initialState: AdminTipsAndPracticesState = {
  tips: [],
  practices: [],
  loading: false,
};

const adminTipsAndPracticesSlice = createSlice({
  name: 'adminTipsAndPractices',
  initialState,
  reducers: {
    // טיפים
    getAllTips: (state, action: PayloadAction<Tip[]>) => {
      state.tips = action.payload;
      state.loading = false;
    },
    deleteTipById: (state, action: PayloadAction<Tip[]>) => {
      state.tips = action.payload;
      state.loading = false;
    },

    // תרגולים
    getAllPractices: (state, action: PayloadAction<Practice[]>) => {
      state.practices = action.payload;
      state.loading = false;
    },
    deletePracticeById: (state, action: PayloadAction<Practice[]>) => {
      state.practices = action.payload;
      state.loading = false;
    },
  },
});

export const { getAllTips, deleteTipById, getAllPractices, deletePracticeById } = adminTipsAndPracticesSlice.actions;
export const adminTipsAndPracticesReducer = adminTipsAndPracticesSlice.reducer;
