<<<<<<< HEAD
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Answers } from "./Answer";
import { Categories } from "./Categories";
=======
import { Column, Entity, Index, OneToMany } from "typeorm";
import { Answers } from "./Answers";
>>>>>>> d4bd717e771642befbf637205599dcde848ed652

@Index("questions_pkey", ["id"], { unique: true })
@Entity("questions", { schema: "public" })
export class Questions {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "title" })
  title: string;

  @Column("text", { name: "content" })
  content: string;

  @Column("text", { name: "category" })
  category: string;

  @Column("text", { name: "tips" })
  tips: string;

  @Column("text", { name: "ai_guidance" })
  aiGuidance: string;

  @Column("boolean", { name: "is_active", default: () => "true" })
  isActive: boolean;

<<<<<<< HEAD
  @Column("text", { name: "options", nullable: true, array: true })
  options: string[] | null;

  @Column("text", { name: "question_type", nullable: true })
  questionType: string | null;

  @OneToMany(() => Answers, (answers) => answers.question)
  answers: Answers[];

  @ManyToOne(() => Categories, (categories) => categories.questions)
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category_2: Categories;
=======
  @OneToMany(() => Answers, (answers) => answers.question)
  answers: Answers[];
>>>>>>> d4bd717e771642befbf637205599dcde848ed652
}
