// backend/src/interfaces/entities/Tips.ts
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tips", { schema: "public" })
export class Tips {
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
