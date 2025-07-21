import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { PracticeQuestions } from "./PracticeQuestions";

@Index("user_practice_answers_pkey", ["id"], { unique: true })
@Entity("user_practice_answers", { schema: "public" })
export class UserPracticeAnswers {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("uuid", { name: "user_id" })
  userId: string;

  @Column("text", {
    name: "status",
    nullable: true,
    default: () => "'not_started'",
  })
  status: string | null;

  @Column("text", { name: "answer", nullable: true })
  answer: string | null;

  @Column("text", { name: "code_language", nullable: true })
  codeLanguage: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @ManyToOne(
    () => PracticeQuestions,
    (practiceQuestions) => practiceQuestions.userPracticeAnswers,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "question_id", referencedColumnName: "id" }])
  question: PracticeQuestions;
}
