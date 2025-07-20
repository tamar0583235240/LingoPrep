import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Feedback } from "./Feedback";
<<<<<<< HEAD
import { Answers } from "./Answer";
=======
import { Answers } from "./Answers";
>>>>>>> d4bd717e771642befbf637205599dcde848ed652
import { Users } from "./Users";

@Index("shared_recordings_pkey", ["id"], { unique: true })
@Entity("shared_recordings", { schema: "public" })
export class SharedRecordings {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "shared_with", array: true })
  sharedWith: string[];

  @OneToMany(() => Feedback, (feedback) => feedback.sharedRecording)
  feedbacks: Feedback[];

  @ManyToOne(() => Answers, (answers) => answers.sharedRecordings, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "answer_id", referencedColumnName: "id" }])
  answer: Answers;

  @ManyToOne(() => Users, (users) => users.sharedRecordings, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "owner_id", referencedColumnName: "id" }])
  owner: Users;
}
