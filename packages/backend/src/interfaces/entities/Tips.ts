import { Column, Entity, Index } from "typeorm";

@Index("tips_pkey", ["id"], { unique: true })
@Entity("tips", { schema: "public" })
export class Tips {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "content" })
  content: string;

  @Column("enum", {
    name: "frequency",
    nullable: true,
    enum: ["daily", "weekly", "monthly"],
  })
  frequency: "daily" | "weekly" | "monthly" | null;

  @Column("timestamp without time zone", {
    name: "last_sent_at",
    nullable: true,
  })
  lastSentAt: Date | null;
}
