import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { aiInsightsType } from '../types/aiInsightsType';

interface AiInsightsState {
  data: aiInsightsType[];
  loading: boolean;
}

const initialState: AiInsightsState = {
  data: [],
  loading: false,
};

const aiInsightsSlice = createSlice({
  name: 'aiInsights',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<aiInsightsType[]>) {
      state.data = action.payload;
    },
    addItem(state, action: PayloadAction<aiInsightsType>) {
      state.data.push(action.payload);
    },
    deleteItem(state, action: PayloadAction<number>) {
      state.data = state.data.filter(item => Number(item.id) !== action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setItems, addItem, deleteItem, setLoading } = aiInsightsSlice.actions;
export default aiInsightsSlice.reducer;
