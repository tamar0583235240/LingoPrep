import { Column, Entity, Index, JoinTable, ManyToMany } from "typeorm";
import { Questions } from "./Questions";

@Index("categories_pkey", ["id"], { unique: true })
@Entity("categories", { schema: "public" })
export class Categories {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("text", { name: "name" })
  name: string;

  @ManyToMany(() => Questions, (questions) => questions.categories)
  @JoinTable({
    name: "question_categories",
    joinColumns: [{ name: "category_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "question_id", referencedColumnName: "id" }],
    schema: "public",
  })
  questions: Questions[];
}
