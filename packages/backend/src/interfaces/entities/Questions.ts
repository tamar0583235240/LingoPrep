import { Column, Entity, Index, ManyToMany, OneToMany } from "typeorm";

@Index("questions_pkey", ["id"], { unique: true })
@Entity("questions", { schema: "public" })
export class Questions {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "title" })
  title: string;

  @Column("text", { name: "content" })
  content: string;

  @Column("text", { name: "tips" })
  tips: string;

  @Column("text", { name: "ai_guidance" })
  ai_guidance: string;

  @Column("boolean", { name: "is_active", default: () => "true" })
  is_active: boolean;

}
