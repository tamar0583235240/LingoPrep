import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SharedRecording } from "../types/types";

interface SharedRecordingState {
  selected: SharedRecording | null;
}

const initialState: SharedRecordingState = {
  selected: null,
};

const sharedRecordingSlice = createSlice({
  name: "sharedRecording",
  initialState,
  reducers: {
    setSelectedRecording(state, action: PayloadAction<SharedRecording>) {
      state.selected = action.payload;
    },
    clearSelectedRecording(state) {
      state.selected = null;
    },
  },
});

export const { setSelectedRecording, clearSelectedRecording } = sharedRecordingSlice.actions;
export const sharedRecordingReducer = sharedRecordingSlice.reducer;
