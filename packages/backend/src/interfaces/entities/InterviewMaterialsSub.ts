import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("interview_materials_sub_pkey", ["id"], { unique: true })
@Entity("interview_materials_sub", { schema: "public" })
export class InterviewMaterialsSub {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

<<<<<<< HEAD
  @Column("text", { name: "title" })
  title: string;

  @Column("text", { name: "thumbnail" })
=======
  @Column("text", { name: "title", nullable: true })
  title: string;

  @Column("text", { name: "thumbnail", nullable: true })
>>>>>>> d4bd717e771642befbf637205599dcde848ed652
  thumbnail: string;

  @Column("text", { name: "short_description", nullable: true })
  shortDescription: string | null;
<<<<<<< HEAD
=======

  @Column("text", { name: "file_url" })
  fileUrl: string;

  @Column("text", { name: "original_file_name", nullable: true })
  originalFileName: string;

  @Column("integer", {
    name: "downloads_count",
    nullable: true,
    default: () => "0",
  })
  downloadsCount: number | null;
>>>>>>> d4bd717e771642befbf637205599dcde848ed652
}
