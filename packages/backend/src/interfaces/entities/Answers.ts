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
import { SharedRecordings } from "./SharedRecordings";

@Index("answers_pkey", ["id"], { unique: true })
@Entity("answers", { schema: "public" })
export class Answers {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
<<<<<<< HEAD
  id!: string;
=======
  id: string;
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568

  @Column("text", { name: "file_url" })
  fileUrl!: string;

  @Column("text", { name: "answer_file_name", nullable: true })
  answerFileName!: string | null;

  @Column("text", { name: "answer_file_name", nullable: true })
  answerFileName: string | null;

  @Column("timestamp without time zone", {
    name: "submitted_at",
    default: () => "now()",
  })
  submittedAt!: Date;

<<<<<<< HEAD
  @Column("integer", { name: "amount_feedbacks", nullable: true })
  amountFeedbacks!: number | null;
=======
  @Column("integer", {
    name: "amount_feedbacks",
    nullable: true,
    default: () => "0",
  })
  amountFeedbacks: number | null;
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568

  @OneToMany(() => AiInsights, (aiInsights) => aiInsights.answer)
  aiInsights!: AiInsights[];

  @ManyToOne(() => Questions, (questions) => questions.answers, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "question_id", referencedColumnName: "id" }])
  question!: Questions;

  @ManyToOne(() => Users, (users) => users.answers, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user!: Users;

  @OneToMany(
    () => SharedRecordings,
    (sharedRecordings) => sharedRecordings.answer
  )
  sharedRecordings!: SharedRecordings[];
}
