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


  @Column("text", { name: "file_url" })
  fileUrl: string;

  @Column("text", { name: "original_file_name", nullable: true })
  originalFileName: string;

// removed merge conflict markers
  @Column("text", { name: "file_url" })
  @Column("text", { name: "file_url" })
  fileUrl: string;

  @Column("integer", {
    name: "downloads_count",
    nullable: true,
    default: () => "0",
  })
  downloadsCount: number | null;
}
