import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Answers } from "./Answers";

@Index("ai_insights_pkey", ["id"], { unique: true })
@Entity("ai_insights", { schema: "public" })
export class AiInsights {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "summary", nullable: true })
  summary: string | null;

  @Column("integer", { name: "rating", nullable: true })
  rating: number | null;

  @Column("text", { name: "strengths", nullable: true })
  strengths: string | null;

  @Column("text", { name: "improvements", nullable: true })
  improvements: string | null;

  @ManyToOne(() => Answers, (answers) => answers.aiInsights, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "answer_id", referencedColumnName: "id" }])
  answer: Answers;
}
