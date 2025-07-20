import React from "react";
import * as XLSX from "xlsx";
import { useGetAllFeedbacksQuery } from "../services/feedbackApi";
import { Button } from "../../../shared/ui/button";

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
    // This would come from a user lookup
    username?: string
}

const ExportFeedbacksToExcel = () => {
  const { data, isLoading, isError } = useGetAllFeedbacksQuery();

  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("אין נתונים לייצוא");
      return;
    }
    console.log(data);
    
    const formattedData = data.map((fb) => ({
      "מספר מזהה": fb.id,
      "מזהה משתמש": fb.user_id ?? "",
      "אנונימי": fb.is_anonymous ? "כן" : "לא",
      "דירוג כללי": fb.general_experience_rating ?? "",
      "מה אהבת": fb.liked_most ?? "",
      "שיפור": fb.suggestion_for_improver ?? "",
      "דירוג רלוונטיות": fb.relevance_rating ?? "",
      "דירוג איכות טיפים": fb.tips_quality_rating ?? "",
      "שימושיות ניתוח AI": fb.ai_analysis_usefulness_rating ?? "",
      "נושא סימולציה נוסף": fb.extra_simulation_topic ?? "",
      "דירוג שימושיות תוכן": fb.content_usability_rating ?? "",
      "תוכן חסר": fb.missing_content_type ?? "",
      "למידה עצמית": fb.self_learning ?? "",
      "תרומת הביטחון": fb.confidence_contribution ?? "",
      "רעיון לפיצ'ר": fb.feature_idea ?? "",
      "תיאור המערכת לחבר": fb.system_description_to_fi ?? "",
      "קובץ מצורף": fb.file_upload_path ?? "",
      "סטטוס טיפול": fb.treatment_status,
      "תאריך יצירה": new Date(fb.createdat).toLocaleString("he-IL"),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "פידבקים");
    XLSX.writeFile(workbook, "feedbacks.xlsx");
  };

  if (isLoading) return null;
  if (isError) return null;

  return (
    <Button 
      onClick={handleExport}
      variant="primary-dark"
      size="md"
      className="ml-8"
      icon={
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
          />
        </svg>
      }
      iconPosition="left"
    >
      שמירה בקובץ Excel
    </Button>
  );
};

export default ExportFeedbacksToExcel;
