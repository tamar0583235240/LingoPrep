import { Column, Entity, Index, ManyToMany, OneToMany } from "typeorm";
import { Answers } from "./Answers";
import { Categories } from "./Categories";

@Index("questions_pkey", ["id"], { unique: true })
@Entity("questions", { schema: "public" })
export class Questions {
  @Column("uuid", { primary: true, name: "id" })
  id!: string;

  @Column("text", { name: "title" })
  title!: string;

  @Column("text", { name: "content" })
<<<<<<< HEAD
  content!: string;
=======
  content: string;
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568

  @Column("text", { name: "tips" })
  tips!: string;

  @Column("text", { name: "ai_guidance" })
  aiGuidance!: string;

  @Column("boolean", { name: "is_active", default: () => "true" })
  isActive!: boolean;

  @Column("text", { name: "options", nullable: true, array: true })
  options!: string[] | null;

  @Column("text", { name: "question_type", nullable: true })
  questionType!: string | null;

  @Column("text", { name: "options", nullable: true, array: true })
  options: string[] | null;

  @Column("text", { name: "question_type", nullable: true })
  questionType: string | null;

  @OneToMany(() => Answers, (answers) => answers.question)
<<<<<<< HEAD
  answers!: Answers[];

  @ManyToMany(() => Categories, (categories) => categories.questions)
  categories!: Categories[];
=======
  answers: Answers[];

  @ManyToMany(() => Categories, (categories) => categories.questions)
  categories: Categories[];
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
}
