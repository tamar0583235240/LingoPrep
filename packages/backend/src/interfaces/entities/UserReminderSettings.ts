// import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
// import { Users } from "./Users"; // נתיב לפי המקום של Users

// @Index("user_reminder_settings_pkey", ["id"], { unique: true })
// @Index("user_reminder_settings_user_id_type_key", ["type", "userId"], {
//   unique: true,
// })
// @Index("idx_user_reminder_settings_user_type", ["type", "userId"], {})
// @Entity("user_reminder_settings", { schema: "public" })
// export class UserReminderSettings {
//   @Column("uuid", {
//     primary: true,
//     name: "id",
//     default: () => "gen_random_uuid()",
//   })
//   id: string;

//   @Column("uuid", { name: "user_id", unique: true })
//   userId: string;

//   @Column("enum", { name: "type", unique: true, enum: ["practice", "tip"] })
//   type: "practice" | "tip";

//   @Column("enum", {
//     name: "frequency",
//     nullable: true,
//     enum: ["daily", "every_2_days", "every_3_days", "weekly"],
//   })
//   frequency: "daily" | "every_2_days" | "every_3_days" | "weekly" | null;

//   @Column("boolean", { name: "is_enabled", default: () => "true" })
//   isEnabled: boolean;

//   @Column("integer", { name: "last_seen_sequence", nullable: true })
//   lastSeenSequence: number | null;

//   @Column("timestamp without time zone", {
//     name: "created_at",
//     nullable: true,
//     default: () => "now()",
//   })
//   createdAt: Date | null;

//   @Column("timestamp without time zone", {
//     name: "last_sent_at",
//     nullable: true,
//   })
//   lastSentAt: Date | null;

//   @ManyToOne(() => Users, (user) => user.userReminderSettings)
// @JoinColumn({ name: "user_id" })
// user: Users;
// }



import {
  Entity,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("user_reminder_settings_pkey", ["id"], { unique: true })
@Index("user_reminder_settings_user_id_type_key", ["type", "userId"], { unique: true })
@Index("idx_user_reminder_settings_user_type", ["type", "userId"])
@Entity("user_reminder_settings", { schema: "public" })
export class UserReminderSettings {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "user_id" })
  userId: string;

  @Column("enum", { name: "type", enum: ["practice", "tip"] })
  type: "practice" | "tip";

  @Column("enum", {
    name: "frequency",
    nullable: true,
    enum: ["daily", "every_2_days", "every_3_days", "weekly"],
  })
  frequency: "daily" | "every_2_days" | "every_3_days" | "weekly" | null;

  @Column("boolean", { name: "is_enabled", default: () => "true" })
  isEnabled: boolean;

  @Column("integer", { name: "last_seen_sequence", nullable: true })
  lastSeenSequence: number | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", {
    name: "last_sent_at",
    nullable: true,
  })
  lastSentAt: Date | null;

  @ManyToOne(() => Users, (user) => user.userReminderSettings)
  // @JoinColumn({ name: "user_id" })
  user: Users;
}
