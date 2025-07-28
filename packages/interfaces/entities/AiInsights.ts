import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Answers } from "./Answers";

@Index("ai_insights_pkey", ["id"], { unique: true })
@Entity("ai_insights", { schema: "public" })
export class AiInsights {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "summary" })
  summary: string;

  @Column("integer", { name: "rating" })
  rating: number;

  @Column("text", { name: "strengths" })
  strengths: string;

  @Column("text", { name: "improvements" })
  improvements: string;

  @ManyToOne(() => Answers, (answers) => answers.aiInsights, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "answer_id", referencedColumnName: "id" }])
  answer: Answers;
}
