import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Index("resources_pkey", ["id"], { unique: true })
@Entity("resources", { schema: "public" })
export class Resources {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "title" })
  title: string;

  @Column("text", { name: "type" })
  type: string;

  @Column("text", { name: "description" })
  description: string;

  @Column("text", { name: "file_url" })
  fileUrl: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @ManyToOne(() => Users, (users) => users.resources)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
