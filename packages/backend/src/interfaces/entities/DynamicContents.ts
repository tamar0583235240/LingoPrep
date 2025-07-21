import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("dynamic_contents_pkey", ["id"], { unique: true })
@Index("dynamic_contents_key_name_key", ["keyName"], { unique: true })
@Entity("dynamic_contents", { schema: "public" })
export class DynamicContents {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
<<<<<<< HEAD
  id!: number;

  @Column("character varying", { name: "key_name", unique: true, length: 255 })
  keyName!: string;

  @Column("text", { name: "content" })
  content!: string;

  @Column("text", { name: "description", nullable: true })
  description!: string | null;
=======
  id: number;

  @Column("character varying", { name: "key_name", unique: true, length: 255 })
  keyName: string;

  @Column("text", { name: "content" })
  content: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "now()",
  })
<<<<<<< HEAD
  updatedAt!: Date | null;
=======
  updatedAt: Date | null;
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
}
