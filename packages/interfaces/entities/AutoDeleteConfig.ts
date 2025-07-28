import { Column, Entity, Index } from "typeorm";

@Index("auto_delete_config_pkey", ["id"], { unique: true })
@Entity("auto_delete_config", { schema: "public" })
export class AutoDeleteConfig {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("boolean", { name: "is_enabled", default: () => "false" })
  isEnabled: boolean;

  @Column("integer", { name: "retention_days", default: () => "30" })
  retentionDays: number;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @Column("text", { name: "name", nullable: true })
  name: string | null;
}
