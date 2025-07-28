import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Feedbacktype } from "./Feedbacktype";
import { Users } from "./Users";

@Index("shared_recording_pkey", ["id"], { unique: true })
@Entity("shared_recordings", { schema: "public" })
export class SharedRecordings {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "username", nullable: true })
  username: string | null;

  @Column("text", { name: "questiontitle", nullable: true })
  questiontitle: string | null;

  @Column("timestamp without time zone", { name: "date", nullable: true })
  date: Date | null;

  @Column("text", { name: "audiourl", nullable: true })
  audiourl: string | null;

  @Column("text", { name: "aisummary", nullable: true })
  aisummary: string | null;

  @Column("text", { name: "sharedwith", nullable: true, array: true })
  sharedwith: string[] | null;

  @OneToMany(() => Feedbacktype, (feedbacktype) => feedbacktype.sharedRecording)
  feedbacktypes: Feedbacktype[];

  @ManyToOne(() => Users, (users) => users.sharedRecordings)
  @JoinColumn([{ name: "owner_id", referencedColumnName: "id" }])
  owner: Users;
}
