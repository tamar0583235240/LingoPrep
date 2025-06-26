import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Answers } from "./Answers";
import { Users } from "./Users";
import { SharedRecordings } from "./SharedRecordings";

@Index("feedback_pkey", ["id"], { unique: true })
@Entity("feedback", { schema: "public" })
export class Feedback {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "comment" })
  comment: string;

  @Column("integer", { name: "rating", nullable: true })
  rating: number | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @Column("text", { name: "answercode", nullable: true })
  answercode: string | null;

  @ManyToOne(() => Answers, (answers) => answers.feedbacks)
  @JoinColumn([{ name: "answer_code", referencedColumnName: "id" }])
  answerCode: Answers;

  @ManyToOne(() => Users, (users) => users.feedbacks, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "given_by_user_id", referencedColumnName: "id" }])
  givenByUser: Users;

  @ManyToOne(
    () => SharedRecordings,
    (sharedRecordings) => sharedRecordings.feedbacks,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "shared_recording_id", referencedColumnName: "id" }])
  sharedRecording: SharedRecordings;
}
