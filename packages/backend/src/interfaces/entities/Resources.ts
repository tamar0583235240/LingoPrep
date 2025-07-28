
import { Column, Entity, Index } from "typeorm";
import { Users } from "./Users";
import { ManyToOne } from "typeorm";
@Index("resources_pkey", ["id"], { unique: true })
@Entity("resources", { schema: "public" })
export class Resources {

@ManyToOne(() => Users, (user) => user.resources, {
  nullable: true, 
  onDelete: 'SET NULL', 
})
@Column({ name: "user_id", nullable: true })
user: Users | null;

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
}
