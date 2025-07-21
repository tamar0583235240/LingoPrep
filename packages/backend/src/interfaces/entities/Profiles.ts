import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { Users } from "./Users";

@Index("profiles_pkey", ["id"], { unique: true })
@Index("profiles_user_id_key", ["userId"], { unique: true })
@Entity("profiles", { schema: "public" })
export class Profiles {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "user_id", unique: true })
  userId: string;

  @Column("text", { name: "image_url", nullable: true })
  imageUrl: string | null;

  @Column("text", { name: "location", nullable: true })
  location: string | null;

  @Column("jsonb", { name: "external_links", nullable: true })
  externalLinks: object | null;

  @Column("text", {
    name: "status",
    nullable: true,
    default: () => "'Available'",
  })
  status: string | null;

  @Column("text", {
    name: "preferred_job_type",
    nullable: true,
    default: () => "'Any'",
  })
  preferredJobType: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @Column("boolean", {
    name: "is_public",
    nullable: true,
    default: () => "false",
  })
  isPublic: boolean | null;

  @OneToOne(() => Users, (users) => users.profiles, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
