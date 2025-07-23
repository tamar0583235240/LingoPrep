import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";
import { SharedRecordings } from "./SharedRecordings";

@Index("feedbacktype_pkey", ["id"], { unique: true })
@Entity("feedbacktype", { schema: "public" })
export class Feedbacktype {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "comment", nullable: true })
  comment: string | null;

  @Column("integer", { name: "rating", nullable: true })
  rating: number | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @ManyToOne(() => Users, (users) => users.feedbacktypes)
  @JoinColumn([{ name: "given_by_user_id", referencedColumnName: "id" }])
  givenByUser: Users;

  @ManyToOne(
    () => SharedRecordings,
    (sharedRecordings) => sharedRecordings.feedbacktypes
  )
  @JoinColumn([{ name: "shared_recording_id", referencedColumnName: "id" }])
  sharedRecording: SharedRecordings;
}
