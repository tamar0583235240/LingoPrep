import { Column, Entity, Index } from "typeorm";

@Index("question_pkey", ["id"], { unique: true })
@Entity("question", { schema: "public" })
export class Question {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "title" })
  title: string;
}
