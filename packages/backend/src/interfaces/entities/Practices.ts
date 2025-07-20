import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("practices", { schema: "public" })
export class Practices {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { name: "content" })
  content: string;

  @Column("timestamp", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;
}
