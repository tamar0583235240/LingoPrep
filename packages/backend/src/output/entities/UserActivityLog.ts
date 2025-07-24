import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("user_activity_log_pkey", ["id"], { unique: true })
@Entity("user_activity_log", { schema: "public" })
export class UserActivityLog {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "user_id" })
  userId: number;

  @Column("character varying", { name: "event_type", length: 50 })
  eventType: string;

  @Column("timestamp without time zone", {
    name: "event_timestamp",
    nullable: true,
    default: () => "now()",
  })
  eventTimestamp: Date | null;

  @Column("text", { name: "metric" })
  metric: string;
}
