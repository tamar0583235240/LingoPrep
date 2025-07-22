export interface Answer {
    id: string
    user_id: string
    question_id: string
    file_url: string,
    answer_file_name:string,
    submitted_at: Date
    amount_feedbacks:number
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