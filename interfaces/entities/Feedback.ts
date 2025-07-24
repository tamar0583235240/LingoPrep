import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";
import { SharedRecordings } from "./SharedRecordings";

@Index("feedback_pkey", ["id"], { unique: true })
@Entity("feedback", { schema: "public" })
export class Feedback {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "comment", nullable: true })
  comment: string | null;

  @Column("integer", { name: "rating", nullable: true })
  rating: number | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("text", { name: "answer_code", nullable: true })
  answerCode: string | null;

  @ManyToOne(() => Users, (users) => users.feedbacks, { onDelete: "SET NULL" })
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
