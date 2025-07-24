import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Answer, RecordingState } from '../types/Answer';

interface RecordingSliceState {
  answers: Answer[];
  currentRecording: Omit<RecordingState, 'audioBlob'>; 
  showRecordingModal: boolean;
  showSuccessMessage: boolean;
  loading: boolean;
}

const initialState: RecordingSliceState = {
  answers: [],
  currentRecording: {
    isRecording: false,
    isPaused: false,
    recordingTime: 0,
    fileName: '',
  },
  showRecordingModal: false,
  showSuccessMessage: false,
  loading: false,
};

const recordingSlice = createSlice({
  name: 'recording',
  initialState,
  reducers: {
    setAnswers(state, action: PayloadAction<Answer[]>) {
      state.answers = action.payload;
    },
    addAnswer(state, action: PayloadAction<Answer>) {
      state.answers.push(action.payload);
    },
    deleteAnswer(state, action: PayloadAction<string>) {
      state.answers = state.answers.filter(answer => answer.id !== action.payload);
    },
    setRecordingState(state, action: PayloadAction<Partial<Omit<RecordingState, 'audioBlob'>>>) {
      state.currentRecording = { ...state.currentRecording, ...action.payload };
    },
    setShowRecordingModal(state, action: PayloadAction<boolean>) {
      state.showRecordingModal = action.payload;
    },
    setShowSuccessMessage(state, action: PayloadAction<boolean>) {
      state.showSuccessMessage = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    resetRecording(state) {
      state.currentRecording = initialState.currentRecording;
      state.showRecordingModal = false;
      state.showSuccessMessage = false;
    },
  },
});

export const {
  setAnswers,
  addAnswer,
  deleteAnswer,
  setRecordingState,
  setShowRecordingModal,
  setShowSuccessMessage,
  setLoading,
  resetRecording,
} = recordingSlice.actions;

export default recordingSlice.reducer;