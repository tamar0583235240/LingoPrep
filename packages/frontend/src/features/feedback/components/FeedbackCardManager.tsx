"use client"

import * as React from "react"
import { ChevronDown, ChevronUp, User, Calendar, Star, Paperclip, Bell } from "lucide-react"
import { cn } from "../../../shared/utils/cn"
import { IconWrapper } from "../../../shared/ui/IconWrapper"

interface FeedbackItem {
  id: string
  user_id?: string | null
  general_experience_rating?: number
  liked_most?: string
  suggestion_for_improver?: string
  relevance_rating?: number
  tips_quality_rating?: number
  ai_analysis_usefulness_r?: number
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
  username?: string
}

interface FeedbackCardProps {
  feedback: FeedbackItem
  className?: string
  isReminder?: boolean
  onToggleReminder?: (feedbackId: string) => void
}

const statusColors = {
  pending: "bg-accent text-white",
  "in-progress": "bg-secondary text-white",
  completed: "bg-success text-white",
  rejected: "bg-danger text-white",
}

const statusLabels = {
  pending: "ממתין",
  "in-progress": "בטיפול",
  completed: "הושלם",
  rejected: "נדחה",
}

// Function to get the main content to display
const getMainContent = (feedback: FeedbackItem) => {
  if (feedback.suggestion_for_improver) return feedback.suggestion_for_improver
  if (feedback.liked_most) return feedback.liked_most
  if (feedback.feature_idea) return feedback.feature_idea
  if (feedback.confidence_contribution) return feedback.confidence_contribution
  return "פידבק ללא תוכן טקסטואלי"
}

// Function to get a short title
const getTitle = (feedback: FeedbackItem) => {
  const content = getMainContent(feedback)
  return content.length > 50 ? content.substring(0, 50) + "..." : content
}

 const FeedbackCardManager: React.FC<FeedbackCardProps> = ({ feedback, className, isReminder, onToggleReminder }) => {
  const [isExpanded, setIsExpanded] = React.useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const displayName = feedback.is_anonymous
  ? "משתמש אנונימי"
  : feedback.username || `משתמש ${feedback.user_id?.substring(0, 8)}`


  return (
    <div
      className={cn(
        "bg-white border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200",
        className,
      )}
      dir="rtl"
    >
      {/* Header - Always Visible */}
      <div className="p-4 cursor-pointer select-none" onClick={toggleExpanded}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <IconWrapper size="sm" color="primary-dark">
              <User className="w-4 h-4" />
            </IconWrapper>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-text-main text-sm truncate">{displayName}</h3>
                {feedback.general_experience_rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-accent fill-accent" />
                    <span className="text-xs text-text-secondary">{feedback.general_experience_rating}/5</span>
                  </div>
                )}
              </div>

              <p className="text-sm text-text-secondary truncate">{getTitle(feedback)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Bell Reminder Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onToggleReminder?.(feedback.id)
              }}
              className={cn(
                "p-2 rounded-full transition-all duration-200 hover:scale-110",
                isReminder
                  ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                  : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600",
              )}
              title={isReminder ? "הסר מתזכורות" : "הוסף לתזכורות"}
            >
              <Bell className={cn("w-4 h-4", isReminder && "fill-current")} />
            </button>

            {feedback.treatment_status && (
              <span
                className={cn("px-2 py-1 rounded-full text-xs font-medium", statusColors[feedback.treatment_status])}
              >
                {statusLabels[feedback.treatment_status]}
              </span>
            )}

            <button className="p-1 hover:bg-muted rounded-full transition-colors">
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-text-secondary" />
              ) : (
                <ChevronDown className="w-4 h-4 text-text-secondary" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-border">
          <div className="p-4 space-y-4">
            {/* Main Content */}
            <div>
              <h4 className="font-medium text-text-main mb-2">תוכן עיקרי:</h4>
              <p className="text-sm text-text-secondary leading-relaxed">{getMainContent(feedback)}</p>
            </div>

            {/* Ratings Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {feedback.general_experience_rating && (
                <div className="text-center p-2 bg-muted rounded">
                  <div className="text-xs text-text-secondary mb-1">חוויה כללית</div>
                  <div className="font-semibold text-text-main">{feedback.general_experience_rating}/5</div>
                </div>
              )}

              {feedback.relevance_rating && (
                <div className="text-center p-2 bg-muted rounded">
                  <div className="text-xs text-text-secondary mb-1">רלוונטיות</div>
                  <div className="font-semibold text-text-main">{feedback.relevance_rating}/5</div>
                </div>
              )}

              {feedback.tips_quality_rating && (
                <div className="text-center p-2 bg-muted rounded">
                  <div className="text-xs text-text-secondary mb-1">איכות טיפים</div>
                  <div className="font-semibold text-text-main">{feedback.tips_quality_rating}/5</div>
                </div>
              )}

              {feedback.content_usability_rating && (
                <div className="text-center p-2 bg-muted rounded">
                  <div className="text-xs text-text-secondary mb-1">שימושיות תוכן</div>
                  <div className="font-semibold text-text-main">{feedback.content_usability_rating}/5</div>
                </div>
              )}

              {feedback.ai_analysis_usefulness_r && (
                <div className="text-center p-2 bg-muted rounded">
                  <div className="text-xs text-text-secondary mb-1">ניתוח AI</div>
                  <div className="font-semibold text-text-main">{feedback.ai_analysis_usefulness_r}/5</div>
                </div>
              )}
            </div>

            {/* Additional Text Fields */}
            <div className="space-y-3">
              {feedback.liked_most && feedback.liked_most !== getMainContent(feedback) && (
                <div>
                  <h5 className="font-medium text-text-main text-sm mb-1">מה אהבת הכי הרבה:</h5>
                  <p className="text-sm text-text-secondary">{feedback.liked_most}</p>
                </div>
              )}

              {feedback.suggestion_for_improver && feedback.suggestion_for_improver !== getMainContent(feedback) && (
                <div>
                  <h5 className="font-medium text-text-main text-sm mb-1">הצעות לשיפור:</h5>
                  <p className="text-sm text-text-secondary">{feedback.suggestion_for_improver}</p>
                </div>
              )}

              {feedback.feature_idea && feedback.feature_idea !== getMainContent(feedback) && (
                <div>
                  <h5 className="font-medium text-text-main text-sm mb-1">רעיונות לתכונות:</h5>
                  <p className="text-sm text-text-secondary">{feedback.feature_idea}</p>
                </div>
              )}

              {feedback.missing_content_type && (
                <div>
                  <h5 className="font-medium text-text-main text-sm mb-1">סוג תוכן חסר:</h5>
                  <p className="text-sm text-text-secondary">{feedback.missing_content_type}</p>
                </div>
              )}

              {feedback.self_learning && (
                <div>
                  <h5 className="font-medium text-text-main text-sm mb-1">למידה עצמית:</h5>
                  <p className="text-sm text-text-secondary">{feedback.self_learning}</p>
                </div>
              )}

              {feedback.confidence_contribution && feedback.confidence_contribution !== getMainContent(feedback) && (
                <div>
                  <h5 className="font-medium text-text-main text-sm mb-1">תרומה לביטחון:</h5>
                  <p className="text-sm text-text-secondary">{feedback.confidence_contribution}</p>
                </div>
              )}

              {feedback.extra_simulation_topic && (
                <div>
                  <h5 className="font-medium text-text-main text-sm mb-1">נושא סימולציה נוסף:</h5>
                  <p className="text-sm text-text-secondary">{feedback.extra_simulation_topic}</p>
                </div>
              )}

              {feedback.system_description_to_fi && (
                <div>
                  <h5 className="font-medium text-text-main text-sm mb-1">תיאור מערכת:</h5>
                  <p className="text-sm text-text-secondary">{feedback.system_description_to_fi}</p>
                </div>
              )}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-text-secondary" />
                <span className="text-sm text-text-secondary">תאריך:</span>
                <span className="text-sm font-medium text-text-main">{feedback.createdat}</span>
              </div>

              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-text-secondary" />
                <span className="text-sm text-text-secondary">אנונימי:</span>
                <span className="text-sm font-medium text-text-main">{feedback.is_anonymous ? "כן" : "לא"}</span>
              </div>
            </div>

            {/* File Attachment */}
            {feedback.file_upload_path && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Paperclip className="w-4 h-4 text-text-secondary" />
                  <span className="text-sm font-medium text-text-main">קובץ מצורף:</span>
                </div>
                <div className="px-3 py-1 bg-muted rounded-full text-xs text-text-secondary hover:bg-gray-200 cursor-pointer transition-colors inline-block">
                  {feedback.file_upload_path.split("/").pop()}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
export default FeedbackCardManager