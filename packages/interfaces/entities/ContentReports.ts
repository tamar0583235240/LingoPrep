import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { InterviewExperiences } from "./InterviewExperiences";
import { Users } from "./Users";

@Index("Content_Reports_pkey", ["id"], { unique: true })
@Entity("Content_Reports", { schema: "public" })
export class ContentReports {
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
    (interviewExperiences) => interviewExperiences.contentReports,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "experience_id", referencedColumnName: "id" }])
  experience: InterviewExperiences;

  @ManyToOne(() => Users, (users) => users.contentReports, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
