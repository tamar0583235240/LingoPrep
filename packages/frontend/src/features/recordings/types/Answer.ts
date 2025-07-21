export interface Answer {
<<<<<<< HEAD
  id: string; // uuid
  user_id: string; // uuid
  question_id: string; // uuid
  file_url: string; // uuid
  answer_file_name: string; // text
  submitted_at: Date; // timestamp
  amount_feedbacks: number;
=======
    id: string
    user_id: string
    question_id: string
    file_url: string,
    answer_file_name:string,
    submitted_at: Date
    amount_feedbacks:number
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
