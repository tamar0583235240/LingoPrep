import { Column, Entity, Index, ManyToMany, OneToMany } from "typeorm";
import { Answers } from "./Answers";
import { Categories } from "./Categories";

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
  aiGuidance: string;

  @Column("boolean", { name: "is_active", default: () => "true" })
  isActive: boolean;

  @OneToMany(() => Answers, (answers) => answers.question)
  answers: Answers[];

  @ManyToMany(() => Categories, (categories) => categories.questions)
  categories: Categories[];
}
