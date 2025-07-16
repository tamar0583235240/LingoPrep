<<<<<<< HEAD
import { Column, Entity, Index, OneToMany, OneToOne } from "typeorm";
import { Answers } from "./Answers";
import { QuestionAnswersCount } from "./QuestionAnswersCount";
=======
import { Column, Entity, Index, OneToMany } from "typeorm";
import { Answers } from "./Answers";
>>>>>>> Activity-Monitoring

@Index("questions_pkey", ["id"], { unique: true })
@Entity("questions", { schema: "public" })
export class Questions {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "title" })
  title: string;

  @Column("text", { name: "content" })
  content: string;

  @Column("text", { name: "category", nullable: true })
  category: string | null;

  @Column("text", { name: "tips", nullable: true })
  tips: string | null;

  @Column("text", { name: "ai_guidance", nullable: true })
  aiGuidance: string | null;

  @Column("boolean", { name: "is_active", default: () => "true" })
  isActive: boolean;

  @OneToMany(() => Answers, (answers) => answers.question)
  answers: Answers[];
<<<<<<< HEAD

  @OneToOne(
    () => QuestionAnswersCount,
    (questionAnswersCount) => questionAnswersCount.question
  )
  questionAnswersCount: QuestionAnswersCount;
=======
>>>>>>> Activity-Monitoring
}
