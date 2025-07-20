import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("interview_materials_sub_pkey", ["id"], { unique: true })
@Entity("interview_materials_sub", { schema: "public" })
export class InterviewMaterialsSub {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "title" })
  title: string;

  @Column("text", { name: "thumbnail" })
  thumbnail: string;

  @Column("text", { name: "short_description", nullable: true })
  shortDescription: string | null;

<<<<<<< HEAD
  @Column("text", { name: "file_url" })
  fileUrl: string;
=======
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
>>>>>>> f459e50e8a6f6d800c0cb3a76c28fffdc787329b
}
