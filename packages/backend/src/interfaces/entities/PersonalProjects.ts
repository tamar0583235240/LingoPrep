import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("personal_projects_pkey", ["id"], { unique: true })
@Entity("personal_projects", { schema: "public" })
export class PersonalProjects {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("uuid", { name: "user_id" })
  userId: string;

  @Column("text", { name: "title" })
  title: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("text", { name: "demo_url", nullable: true })
  demoUrl: string | null;

  @Column("text", { name: "code_url", nullable: true })
  codeUrl: string | null;

  @Column("text", { name: "thumbnail_url", nullable: true })
  thumbnailUrl: string | null;

  @Column("text", { name: "tags", nullable: true, array: true })
  tags: string[] | null;

  @Column("text", {
    name: "status",
    nullable: true,
    default: () => "'in_progress'",
  })
  status: string | null;

  @Column("boolean", {
    name: "is_public",
    nullable: true,
    default: () => "false",
  })
  isPublic: boolean | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "now()",
  })
  updatedAt: Date | null;
}
