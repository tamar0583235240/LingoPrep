import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ContentReports } from "./ContentReports";
import { ExperienceThanks } from "./ExperienceThanks";
import { Users } from "./Users";

@Index("Interview_Experiences_pkey", ["id"], { unique: true })
@Entity("Interview_Experiences", { schema: "public" })
export class InterviewExperiences {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("character varying", { name: "company_name" })
  companyName: string;

  @Column("character varying", { name: "position" })
  position: string;

  @Column("date", { name: "interview_date", nullable: true })
  interviewDate: string | null;

  @Column("text", { name: "tips", nullable: true })
  tips: string | null;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("boolean", { name: "hired", nullable: true })
  hired: boolean | null;

  @Column("integer", { name: "rating", nullable: true })
  rating: number | null;

  @Column("boolean", {
    name: "anonymous",
    nullable: true,
    default: () => "true",
  })
  anonymous: boolean | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("text", { name: "questions", nullable: true })
  questions: string | null;

  @OneToMany(
    () => ContentReports,
    (contentReports) => contentReports.experience
  )
  contentReports: ContentReports[];

  @OneToMany(
    () => ExperienceThanks,
    (experienceThanks) => experienceThanks.experience
  )
  experienceThanks: ExperienceThanks[];

  @ManyToOne(() => Users, (users) => users.interviewExperiences, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
