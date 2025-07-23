export interface PracticeTasks {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  startDatetime: Date;
  durationMinutes: number;
  category: string;
  reminderMinutesBefore: number | null;
  status: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface PracticeTaskInput {
  user_id: string;
  title: string;
  description?: string | null;
  start_datetime: string;
  duration_minutes: number;
  category: string;
  reminder_minutes_before?: number | null;
  status: string;
}
