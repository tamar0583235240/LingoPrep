export interface Answer {
  id: string; // uuid
  user_id: string; // uuid
  question_id: string; // uuid
  file_url: string; // uuid
  answer_file_name: string; // text
  submitted_at: Date; // timestamp
  amount_feedbacks?: number; // feedback count (optional)
}

export interface RecordingState {
  isRecording: boolean;
  isPaused: boolean;
  recordingTime: number;
  audioBlob: Blob | null;
  fileName: string;
}

export interface AudioRecorderProps {
  userId?: string;
  questionId?: string;
  onFinish?: (audioUrl: string, fileName: string) => void;
  onSaveSuccess?: (answerId: string) => void;
}