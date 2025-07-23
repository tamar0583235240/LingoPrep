import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { InterviewExperiences } from "./InterviewExperiences";
import { Users } from "./Users";

@Index("Experience_Thanks_pkey", ["id"], { unique: true })
@Entity("Experience_Thanks", { schema: "public" })
export class ExperienceThanks {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToOne(
    () => InterviewExperiences,
    (interviewExperiences) => interviewExperiences.experienceThanks,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "experience_id", referencedColumnName: "id" }])
  experience: InterviewExperiences;

  @ManyToOne(() => Users, (users) => users.experienceThanks, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
