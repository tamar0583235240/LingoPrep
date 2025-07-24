import { Column, Entity, Index } from "typeorm";

@Index("tips_pkey", ["id"], { unique: true })
@Entity("tips", { schema: "public" })
export class Tips {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "content" })
  content: string;
}
