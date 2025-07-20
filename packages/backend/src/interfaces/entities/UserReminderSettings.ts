import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Index("user_reminder_settings_pkey", ["id"], { unique: true })
@Index("user_reminder_settings_user_id_type_key", ["type", "userId"], {
  unique: true,
})
@Entity("user_reminder_settings", { schema: "public" })
export class UserReminderSettings {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "user_id", unique: true })
  userId: string;

  @Column("enum", { name: "type", unique: true, enum: ["practice", "tip"] })
  type: "practice" | "tip";

  @Column("enum", {
    name: "frequency",
    enum: ["daily", "every_2_days", "every_3_days", "weekly"],
  })
  frequency: "daily" | "every_2_days" | "every_3_days" | "weekly";

  @Column("boolean", { name: "is_enabled", default: () => "true" })
  isEnabled: boolean;

  @Column("timestamp without time zone", {
    name: "last_sent_at",
    nullable: true,
    default: () => "now()",
  })
  lastSentAt: Date | null;

  @Column("uuid", { name: "tip_id", nullable: true })
  tipId: string | null;

  @ManyToOne(() => Users, (users) => users.userReminderSettings, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
