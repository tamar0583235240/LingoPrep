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

  @Column("text", { name: "search_text_cleaned", nullable: true })
  searchTextCleaned: string | null;

  @Column("tsvector", { name: "document_with_weights", nullable: true })
  documentWithWeights: string | null;

  @Column("text", { name: "file_url", nullable: true })
  fileUrl: string | null;

  @Column("integer", {
    name: "downloads_count",
    nullable: true,
    default: () => "0",
  })
  downloadsCount: number | null;
}
