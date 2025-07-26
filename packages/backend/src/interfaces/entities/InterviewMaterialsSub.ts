import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("interview_materials_sub_pkey", ["id"], { unique: true })
@Entity("interview_materials_sub", { schema: "public" })
export class InterviewMaterialsSub {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "title", nullable: true })
  title: string;

  @Column("text", { name: "thumbnail", nullable: true })
  thumbnail: string;

  @Column("text", { name: "short_description", nullable: true })
  shortDescription: string | null;


  fileUrl!: string;


  @Column("text", { name: "original_file_name", nullable: true })
  originalFileName: string;

  @Column("integer", {
    name: "downloads_count",
    nullable: true,
    default: () => "0",
  })
  downloadsCount!: number | null;
}
