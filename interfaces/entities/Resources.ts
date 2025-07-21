import { Column, Entity, Index } from "typeorm";

@Index("resources_pkey", ["id"], { unique: true })
@Entity("resources", { schema: "public" })
export class Resources {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "title" })
  title: string;

  @Column("text", { name: "type" })
  type: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("text", { name: "file_url" })
  fileUrl: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;
}
