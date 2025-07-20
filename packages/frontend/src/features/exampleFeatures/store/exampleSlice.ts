import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { exampleType } from '../types/exampleType';

interface ExampleState {
  data: exampleType[];
  loading: boolean;
}

const initialState: ExampleState = {
  data: [],
  loading: false,
};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<exampleType[]>) {
      state.data = action.payload;
    },
    addItem(state, action: PayloadAction<exampleType>) {
      state.data.push(action.payload);
    },
    deleteItem(state, action: PayloadAction<number>) {
      state.data = state.data.filter(items => items.exampleField1 !== action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setItems, addItem, deleteItem, setLoading } = exampleSlice.actions;
export default exampleSlice.reducer;
