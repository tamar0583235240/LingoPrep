import { Column, Entity, Index } from "typeorm";

@Index("user_reminder_settings_pkey", ["id"], { unique: true })
@Index("user_reminder_settings_user_id_type_key", ["type", "userId"], {
  unique: true,
})
@Index("idx_user_reminder_settings_user_type", ["type", "userId"], {})
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

  @Column("integer", { name: "last_seen_sequence", nullable: true })
  lastSeenSequence: number | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;
}
