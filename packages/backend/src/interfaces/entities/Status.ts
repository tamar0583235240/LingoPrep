import { Column, Entity, Index } from "typeorm";

@Index("status_pkey", ["userId"], { unique: true })
@Entity("status", { schema: "public" })
export class Status {
  @Column("uuid", { primary: true, name: "user_id" })
  userId: string;

  @Column("bool", { name: "answered", nullable: true, array: true })
  answered: boolean[] | null;
}
