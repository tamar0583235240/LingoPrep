import { Column, Entity, Index } from "typeorm";

@Index("tips_pkey", ["id"], { unique: true })
@Index("idx_tips_sequence", ["sequenceNumber"], {})
@Index("tips_sequence_number_key", ["sequenceNumber"], { unique: true })
@Entity("tips", { schema: "public" })
export class Tips {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("text", { name: "content" })
  content: string;

  @Column("integer", { name: "sequence_number", unique: true })
  sequenceNumber: number;
}
