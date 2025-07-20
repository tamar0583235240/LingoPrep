import { Column, Entity, Index } from "typeorm";

@Index("tips_pkey", ["id"], { unique: true })
@Entity("tips", { schema: "public" })
export class Tips {
<<<<<<< HEAD
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
=======
  @Column("uuid", { primary: true, name: "id" })
>>>>>>> d4bd717e771642befbf637205599dcde848ed652
  id: string;

  @Column("text", { name: "content" })
  content: string;
}
