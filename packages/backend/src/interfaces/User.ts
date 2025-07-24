import { Answers } from "./entities/Answers";
import { Feedback } from "./entities/Feedback";
import { PasswordResetTokens } from "./entities/PasswordResetTokens";
import { Resources } from "./entities/Resources";
import { SharedRecordings } from "./entities/SharedRecordings";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  role: string;
  createdAt: Date;
  isActive: boolean;
  password: string;
  answers?: Answers[]; // אם אתה טוען גם את הקשרים
  feedbacks?: Feedback[];
  passwordResetTokens?: PasswordResetTokens[];
  resources?: Resources[];
  sharedRecordings?: SharedRecordings[];
}
// =======

// export interface User {
//     id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string|undefined;
//     role: 'student' | 'manager';
//     createdAt: Date;
//     isActive: boolean;
//     password: string;
// }
// >>>>>>> Activity-Monitoring
