import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { Hints } from "./Hints";
import { Topics } from "./Topics";
import { UserPracticeAnswers } from "./UserPracticeAnswers";

@Index("practice_questions_pkey", ["id"], { unique: true })
@Entity("practice_questions", { schema: "public" })
export class PracticeQuestions {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("text", { name: "difficulty" })
  difficulty: string;

  @Column("text", { name: "type" })
  type: string;

  @Column("text", { name: "content" })
  content: string;

  @Column("boolean", {
    name: "generated_by_ai",
    nullable: true,
    default: () => "false",
  })
  generatedByAi: boolean | null;

  @Column("uuid", { name: "created_by", nullable: true })
  createdBy: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @OneToMany(() => Hints, (hints) => hints.question)
  hints: Hints[];

  @ManyToMany(() => Topics, (topics) => topics.practiceQuestions)
  @JoinTable({
    name: "question_topics",
    joinColumns: [{ name: "question_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "topic_id", referencedColumnName: "id" }],
    schema: "public",
  })
  topics: Topics[];

  @OneToMany(
    () => UserPracticeAnswers,
    (userPracticeAnswers) => userPracticeAnswers.question
  )
  userPracticeAnswers: UserPracticeAnswers[];
}
