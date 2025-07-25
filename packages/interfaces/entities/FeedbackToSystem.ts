import { Column, Entity, Index } from "typeorm";
@Index("feedback_to_system_pkey", ["id"], { unique: true })
@Entity("feedback_to_system", { schema: "public" })
export class FeedbackToSystem {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("integer", { name: "general_experience_rating", nullable: true })
  generalExperienceRating: number | null;

  @Column("text", { name: "liked_most", nullable: true })
  likedMost: string | null;

  @Column("text", { name: "suggestion_for_improvement", nullable: true })
  suggestionForImprovement: string | null;

  @Column("integer", { name: "relevance_rating", nullable: true })
  relevanceRating: number | null;

  @Column("integer", { name: "tips_quality_rating", nullable: true })
  tipsQualityRating: number | null;

  @Column("integer", { name: "ai_analysis_usefulness_rating", nullable: true })
  aiAnalysisUsefulnessRating: number | null;

  @Column("text", { name: "extra_simulation_topic", nullable: true })
  extraSimulationTopic: string | null;

  @Column("integer", { name: "content_usability_rating", nullable: true })
  contentUsabilityRating: number | null;

  @Column("text", { name: "missing_content_type", nullable: true })
  missingContentType: string | null;

  @Column("text", { name: "self_learning", nullable: true })
  selfLearning: string | null;

  @Column("text", { name: "confidence_contribution", nullable: true })
  confidenceContribution: string | null;

  @Column("text", { name: "feature_idea", nullable: true })
  featureIdea: string | null;

  @Column("text", { name: "system_description_to_friend", nullable: true })
  systemDescriptionToFriend: string | null;

  @Column("text", { name: "file_upload_path", nullable: true })
  fileUploadPath: string | null;

  @Column("boolean", {
    name: "is_anonymous",
    nullable: true,
    default: () => "false",
  })
  isAnonymous: boolean | null;

  @Column("uuid", { name: "user_id", nullable: true })
  userId: string | null;

  @Column("enum", {
    name: "treatment_status",
    enum: ["Tested", "In treatment", "Treated"],
    default: () => "'Tested'",
  })
  treatmentStatus: "Tested" | "In treatment" | "Treated";

  @Column("date", { name: "createdat", default: () => "CURRENT_DATE" })
  createdat: string;
}
