export interface FeedbackInManager {
  id: string
  user_id?: string | null
  general_experience_rating?: number
  liked_most?: string
  suggestion_for_improver?: string
  relevance_rating?: number
  tips_quality_rating?: number
  ai_analysis_usefulness_rating?: number
  extra_simulation_topic?: string
  content_usability_rating?: number
  missing_content_type?: string
  self_learning?: string
  confidence_contribution?: string
  feature_idea?: string
  system_description_to_fi?: string
  file_upload_path?: string
  is_anonymous: boolean
  treatment_status?: "pending" | "in-progress" | "completed" | "rejected"
  createdat: string
  // This would come from a user lookup
  username?: string
}
