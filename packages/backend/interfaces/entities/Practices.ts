import { Column, Entity, Index } from "typeorm";

@Index("practices_pkey", ["id"], { unique: true })
@Index("practices_sequence_number_key", ["sequenceNumber"], { unique: true })
@Index("idx_practices_sequence", ["sequenceNumber"], {})
@Entity("practices", { schema: "public" })
export class Practices {
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
