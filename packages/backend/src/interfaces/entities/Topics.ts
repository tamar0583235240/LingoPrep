import { Column, Entity, Index, ManyToMany } from "typeorm";
import { PracticeQuestions } from "./PracticeQuestions";

@Index("topics_pkey", ["id"], { unique: true })
@Index("topics_name_key", ["name"], { unique: true })
@Entity("topics", { schema: "public" })
export class Topics {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("text", { name: "name", unique: true })
  name: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToMany(
    () => PracticeQuestions,
    (practiceQuestions) => practiceQuestions.topics
  )
  practiceQuestions: PracticeQuestions[];
}
