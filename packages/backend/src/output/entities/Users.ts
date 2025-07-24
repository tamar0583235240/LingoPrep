import { Column, Entity, Index, OneToMany } from "typeorm";
import { Answers } from "./Answers";
import { Feedback } from "./Feedback";
import { PasswordResetTokens } from "./PasswordResetTokens";
import { Resources } from "./Resources";
import { SharedRecordings } from "./SharedRecordings";
import { UserReminderSettings } from "./UserReminderSettings";
import { UserSessions } from "./UserSessions";

@Index("users_email_key", ["email"], { unique: true })
@Index("users_pkey", ["id"], { unique: true })
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

  @Column("enum", {
    name: "role",
    enum: ["student", "manager"],
    default: "'student'",
  })
  role: "student" | "manager";

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @Column("boolean", { name: "is_active", default: () => "true" })
  isActive: boolean;

  @Column("text", { name: "password", nullable: true })
  password: string | null;

  @OneToMany(() => Answers, (answers) => answers.user)
  answers: Answers[];

  @OneToMany(() => Feedback, (feedback) => feedback.givenByUser)
  feedbacks: Feedback[];

  @OneToMany(() => PasswordResetTokens, (tokens) => tokens.user)
  passwordResetTokens: PasswordResetTokens[];

  @OneToMany(() => Resources, (resources) => resources.user)
  resources: Resources[];

  @OneToMany(() => SharedRecordings, (recordings) => recordings.owner)
  sharedRecordings: SharedRecordings[];

  @OneToMany(() => UserReminderSettings, (settings) => settings.user)
  userReminderSettings: UserReminderSettings[];

  @OneToMany(() => UserSessions, (sessions) => sessions.user)
  userSessions: UserSessions[];
}
