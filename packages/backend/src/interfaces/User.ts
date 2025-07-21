import { Answers } from "./entities/Answers";
import { ContentReports } from "./entities/ContentReports";
import { ExperienceThanks } from "./entities/ExperienceThanks";
import { Feedback } from "./entities/Feedback";
import { InterviewExperiences } from "./entities/InterviewExperiences";
import { PasswordResetTokens } from "./entities/PasswordResetTokens";
import { Resources } from "./entities/Resources";
import { SharedRecordings } from "./entities/SharedRecordings";
import { UserActivity } from "./entities/UserActivity";
import { UserReminderSettings } from "./entities/UserReminderSettings";
import { UserSessions } from "./entities/UserSessions";
import { WorkExperiences } from "./entities/WorkExperiences";
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  role: string;
  createdAt: Date;
  isActive: boolean;
  password: string | null;
  slug: string | null;

  contentReports: ContentReports[];
  experienceThanks: ExperienceThanks[];
  interviewExperiences: InterviewExperiences[];
  answers: Answers[];
  feedbacks: Feedback[];
  passwordResetTokens: PasswordResetTokens[];
  resources: Resources[];
  sharedRecordings: SharedRecordings[];
  userActivities: UserActivity[];
  userReminderSettings: any[]; // ולא userReminderSetting
  userSessions: UserSessions[];
  workExperiences: WorkExperiences[];
  // userReminderSettings: null; // או אובייקט, תלוי מה מצופה
}
