// import { Users } from "../../../../../backend/src/interfaces/entities/Users";
import {User} from "../../../../../backend/src/interfaces/User";
export interface user extends User {
  isSelected?: boolean; // שדה פנימי לצרכי UI בלבד
}
export interface UserFormFields {
  firstName: string;
  lastName: string;
  email: string;
  phone: string; // הפוך ל-string חובה, גם אם ריק
  password: string;
  role: 'student' | 'manager';
}
// תוספת לצורך תגובת השרת בהעלאת קובץ
export interface UploadResponse {
  message: string;
  successCount: number;
  skippedCount: number;
  skippedUsers: {
    email?: string;
    first_name?: string;
    last_name?: string;
    reason: string;
  }[];
// }export interface User {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   password: string;
//   role: 'student' | 'manager';
//   isActive: boolean;
//   createdAt?: Date;
//   isSelected?: boolean; // שדה UI בלבד
}
