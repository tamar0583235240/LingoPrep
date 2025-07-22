import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { PracticeQuestions } from "./PracticeQuestions";

@Index("hints_pkey", ["id"], { unique: true })
@Entity("hints", { schema: "public" })
export class Hints {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("text", { name: "content" })
  content: string;

  @Column("boolean", {
    name: "generated_by_ai",
    nullable: true,
    default: () => "false",
  })
  generatedByAi: boolean | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToOne(
    () => PracticeQuestions,
    (practiceQuestions) => practiceQuestions.hints,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "question_id", referencedColumnName: "id" }])
  question: PracticeQuestions;
}
