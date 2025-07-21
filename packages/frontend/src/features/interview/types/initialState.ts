
import { interviewType } from "./questionType";

export interface InitialState {
  questions: interviewType[];
  currentIndex: number;
  loading: boolean;
  currentAnswerId: string; // חדש: מזהה תשובה נוכחית,
  currentCategoryId: string; // חדש: מזהה קטגוריה נוכחית
  currentUserId: string; // חדש: מזהה משתמש נוכחי
<<<<<<< HEAD
}
=======
}
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
