
import { interviewType } from "./questionType";

export interface InitialState {
  questions: interviewType[];
  currentIndex: number;
  loading: boolean;
  currentAnswerId: string; // חדש: מזהה תשובה נוכחית,
  currentCategoryId: string; // חדש: מזהה קטגוריה נוכחית
  currentUserId: string; // חדש: מזהה משתמש נוכחי
}