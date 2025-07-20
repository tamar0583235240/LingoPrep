<<<<<<< HEAD
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";
=======
import { Column, Entity, Index } from "typeorm";
>>>>>>> d4bd717e771642befbf637205599dcde848ed652

@Index("resources_pkey", ["id"], { unique: true })
@Entity("resources", { schema: "public" })
export class Resources {
  @Column("uuid", { primary: true, name: "id" })
  id: string;
<<<<<<< HEAD
  id: string;

  @Column("text", { name: "title" })
  title: string;
  title: string;

  @Column("text", { name: "type" })
  type: string;
  type: string;

  @Column("text", { name: "description" })
  description: string;
  description: string;

  @Column("text", { name: "file_url" })
  fileUrl: string;
  fileUrl: string;
=======

  @Column("text", { name: "title" })
  title: string;

  @Column("text", { name: "type" })
  type: string;

  @Column("text", { name: "description" })
  description: string;

  @Column("text", { name: "file_url" })
  fileUrl: string;
>>>>>>> d4bd717e771642befbf637205599dcde848ed652

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;
<<<<<<< HEAD

  @ManyToOne(() => Users, (users) => users.resources)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
=======
>>>>>>> d4bd717e771642befbf637205599dcde848ed652
}
