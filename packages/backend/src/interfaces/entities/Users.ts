import { Column, Entity, Index, OneToMany, OneToOne } from "typeorm";
import { ContentReports } from "./ContentReports";
import { ExperienceThanks } from "./ExperienceThanks";
import { InterviewExperiences } from "./InterviewExperiences";
import { Answers } from "./Answers";
import { Feedback } from "./Feedback";
import { PasswordResetTokens } from "./PasswordResetTokens";
import { Profiles } from "./Profiles";
import { Resources } from "./Resources";
import { SharedRecordings } from "./SharedRecordings";
import { WorkExperiences } from "./WorkExperiences";
import { UserReminderSettings } from "./UserReminderSettings";
@Index("users_email_key", ["email"], { unique: true })
@Index("users_pkey", ["id"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "first_name" })
  first_name: string;

  @Column("text", { name: "last_name" })
  last_name: string;

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

  @OneToMany(() => ContentReports, (contentReports) => contentReports.user)
  contentReports: ContentReports[];

  @OneToMany(
    () => ExperienceThanks,
    (experienceThanks) => experienceThanks.user
  )
  experienceThanks: ExperienceThanks[];

  @OneToMany(
    () => InterviewExperiences,
    (interviewExperiences) => interviewExperiences.user
  )
  interviewExperiences: InterviewExperiences[];

  @OneToMany(() => Answers, (answers) => answers.user)
  answers: Answers[];

  @OneToMany(() => Feedback, (feedback) => feedback.givenByUser)
  feedbacks: Feedback[];

  @OneToMany(
    () => PasswordResetTokens,
    (passwordResetTokens) => passwordResetTokens.user
  )
  passwordResetTokens: PasswordResetTokens[];

 @OneToOne(() => Profiles, (profiles) => profiles.user, {
  nullable: true,
})
profiles: Profiles | null;


  @OneToMany(() => Resources, (resources) => resources.user)
  resources: Resources[];

  @OneToMany(
    () => SharedRecordings,
    (sharedRecordings) => sharedRecordings.owner
  )
  sharedRecordings: SharedRecordings[];

  @OneToMany(() => WorkExperiences, (workExperiences) => workExperiences.user)
  workExperiences: WorkExperiences[];

  @OneToMany(() => UserReminderSettings, (setting) => setting.user)
userReminderSettings: UserReminderSettings[];
}
