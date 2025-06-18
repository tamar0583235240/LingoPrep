import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { AiInsights } from "./AiInsights";
import { Questions } from "./Questions";
import { Users } from "./Users";
import { Feedback } from "./Feedback";
import { SharedRecordings } from "./SharedRecordings";

@Index("answers_pkey", ["id"], { unique: true })
@Entity("answers", { schema: "public" })
export class Answers {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "file_url" })
  fileUrl: string;

  @Column("timestamp without time zone", {
    name: "submitted_at",
    default: () => "now()",
  })
  submittedAt: Date;

  @Column("character varying", {
    name: "answer_file_name",
    nullable: true,
    length: 255,
  })
  answerFileName: string | null;

  @OneToMany(() => AiInsights, (aiInsights) => aiInsights.answer)
  aiInsights: AiInsights[];

  @ManyToOne(() => Questions, (questions) => questions.answers, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "question_id", referencedColumnName: "id" }])
  question: Questions;

  @ManyToOne(() => Users, (users) => users.answers, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(() => Feedback, (feedback) => feedback.answerCode)
  feedbacks: Feedback[];

  @OneToMany(
    () => SharedRecordings,
    (sharedRecordings) => sharedRecordings.answer
  )
  sharedRecordings: SharedRecordings[];
}
