import { Column, Entity, Index, OneToMany } from "typeorm";
import { Answers } from "./Answers";
import { Feedback } from "./Feedback";
import { PasswordResetTokens } from "./PasswordResetTokens";
import { SharedRecordings } from "./SharedRecordings";

// נוספים מ-HEAD
import { ContentReports } from "./ContentReports";
import { ExperienceThanks } from "./ExperienceThanks";
import { InterviewExperiences } from "./InterviewExperiences";
import { Resources } from "./Resources";
import { UserActivity } from "./UserActivity";
import { UserReminderSettings } from "./UserReminderSettings";
import { UserSessions } from "./UserSessions";
import { WorkExperiences } from "./WorkExperiences";

@Index("users_email_key", ["email"], { unique: true })
@Index("users_pkey", ["id"], { unique: true })
@Index("users_slug_key", ["slug"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "first_name" })
  firstName: string;

  @Column("text", { name: "last_name" })
  lastName: string;

  @Column("text", { name: "email", unique: true })
  email: string;

  @Column("text", { name: "phone", nullable: true })
  phone: string | null;

  @Column("text", { name: "role" })
  role: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @Column("boolean", { name: "is_active", default: () => "true" })
  isActive: boolean;

  @Column("text", { name: "password", nullable: true }) // יתמוך גם ב-null כמו ב-HEAD
  password: string | null;

  @Column("text", { name: "slug", nullable: true, unique: true })
  slug: string | null;

  @OneToMany(() => Answers, (answers) => answers.user)
  answers: Answers[];

  @OneToMany(() => Feedback, (feedback) => feedback.givenByUser)
  feedbacks: Feedback[];

  @OneToMany(() => PasswordResetTokens, (tokens) => tokens.user)
  passwordResetTokens: PasswordResetTokens[];

  @OneToMany(() => SharedRecordings, (recording) => recording.owner)
  sharedRecordings: SharedRecordings[];

  // --- יחסים נוספים ---
  @OneToMany(() => ContentReports, (contentReports) => contentReports.user)
  contentReports: ContentReports[];

  @OneToMany(() => ExperienceThanks, (expThanks) => expThanks.user)
  experienceThanks: ExperienceThanks[];

  @OneToMany(() => InterviewExperiences, (interviews) => interviews.user)
  interviewExperiences: InterviewExperiences[];

  @OneToMany(() => Resources, (resources) => resources.user)
  resources: Resources[];

  @OneToMany(() => UserActivity, (activity) => activity.user)
  userActivities: UserActivity[];

  @OneToMany(() => UserReminderSettings, (settings) => settings.user)
  userReminderSettings: UserReminderSettings[];

  @OneToMany(() => UserSessions, (sessions) => sessions.user)
  userSessions: UserSessions[];

  @OneToMany(() => WorkExperiences, (workExp) => workExp.user)
  workExperiences: WorkExperiences[];
}
