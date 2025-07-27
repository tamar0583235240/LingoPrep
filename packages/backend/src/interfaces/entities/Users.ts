import { Column, Entity, Index, OneToMany, OneToOne } from "typeorm";
import { ContentReports } from "./ContentReports";
import { ExperienceThanks } from "./ExperienceThanks";
import { InterviewExperiences } from "./InterviewExperiences";
import { Answers } from "./Answers";
import { Feedback } from "./Feedback";
import { PasswordResetTokens } from "./PasswordResetTokens";
import { Resources } from "./Resources";
import { SharedRecordings } from "./SharedRecordings";
import { Feedbacktype } from "./Feedbacktype";
import { Profiles } from "./Profiles";
import { UserReminderSettings } from "./UserReminderSettings";
import { UserSessions } from "./UserSessions";
import { WorkExperiences } from "./WorkExperiences";
import { UserActivity } from "./UserActivity";

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

  @Column("text", { name: "password", nullable: true })
  password: string | null;

  @Column("text", { name: "slug", nullable: true, unique: true })
  slug: string | null;

  @OneToMany(() => ContentReports, (contentReports) => contentReports.user)
  contentReports: ContentReports[];

  @OneToMany(() => ExperienceThanks, (experienceThanks) => experienceThanks.user)
  experienceThanks: ExperienceThanks[];

  @OneToMany(() => InterviewExperiences, (interviewExperiences) => interviewExperiences.user)
  interviewExperiences: InterviewExperiences[];

  @OneToMany(() => Answers, (answers) => answers.user)
  answers: Answers[];

  @OneToMany(() => Feedback, (feedback) => feedback.givenByUser)
  feedbacks: Feedback[];

  @OneToMany(() => Feedbacktype, (feedbacktype) => feedbacktype.givenByUser)
  feedbacktypes: Feedbacktype[];

  @OneToMany(() => PasswordResetTokens, (passwordResetTokens) => passwordResetTokens.user)
  passwordResetTokens: PasswordResetTokens[];

  @OneToMany(() => Resources, (resources) => resources.user)
  resources: Resources[];

  @OneToOne(() => Profiles, (profiles) => profiles.user)
  profiles: Profiles;

  @OneToMany(() => SharedRecordings, (sharedRecordings) => sharedRecordings.owner)
  sharedRecordings: SharedRecordings[];

  @OneToMany(() => UserActivity, (userActivity) => userActivity.user)
  userActivities: UserActivity[];

  @OneToMany(() => UserReminderSettings, (userReminderSettings) => userReminderSettings.user)
  userReminderSettings: UserReminderSettings[];

  @OneToMany(() => UserSessions, (userSessions) => userSessions.user)
  userSessions: UserSessions[];

  @OneToMany(() => WorkExperiences, (workExperiences) => workExperiences.user)
  workExperiences: WorkExperiences[];
}
