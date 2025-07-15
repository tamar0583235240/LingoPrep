import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Index("work_experiences_pkey", ["id"], { unique: true })
@Entity("work_experiences", { schema: "public" })
export class WorkExperiences {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("text", { name: "company_name" })
  companyName: string;

  @Column("text", { name: "position" })
  position: string;

  @Column("text", { name: "description" })
  description: string;

  @Column("date", { name: "start_date" })
  startDate: string;

  @Column("date", { name: "end_date", nullable: true })
  endDate: string | null;

  @Column("boolean", {
    name: "is_public",
    nullable: true,
    default: () => "false",
  })
  isPublic: boolean | null;

  @Column("timestamp with time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp with time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @ManyToOne(() => Users, (users) => users.workExperiences, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
