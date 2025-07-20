import React from 'react'

import { useState } from "react"
import FeedbackCardManager from "../features/feedback/components/FeedbackCardManager"
import { Grid } from "../shared/ui/grid"
import FeedbackChart from '../features/feedback/components/FeedbackChart'
import { useGetAllFeedbacksQuery } from '../features/feedback/services/feedbackApi'
import ExportFeedbacksToExcel from '../features/feedback/components/exportFeedbacksToExcel'

const sampleFeedbacks = [
    {
        id: "1",
        user_id: "user-123",
        username: "יוסי כהן", // From user lookup
        general_experience_rating: 5,
        relevance_rating: 5,
        tips_quality_rating: 4,
        content_usability_rating: 5,
        liked_most: "השירות המהיר והמקצועי של צוות התמיכה",
        suggestion_for_improver: "אולי להוסיף צ'אט בזמן אמת",
        is_anonymous: false,
        treatment_status: "completed" as const,
        createdat: "2024-01-15",
        file_upload_path: "/uploads/screenshot_123.png",
    },
    {
        id: "2",
        user_id: "user-456",
        username: "שרה לוי",
        general_experience_rating: 4,
        relevance_rating: 5,
        content_usability_rating: 3,
        suggestion_for_improver: "הוספת אפשרות לסינון מתקדם בעמוד הראשי",
        feature_idea: "מערכת התראות מותאמת אישית",
        is_anonymous: false,
        treatment_status: "in-progress" as const,
        createdat: "2024-01-14",
    },
    {
        id: "3",
        user_id: null,
        general_experience_rating: 3,
        relevance_rating: 4,
        confidence_contribution: "שמתי לב שהאתר טוען לאט יותר מהרגיל בשעות הערב",
        is_anonymous: true,
        treatment_status: "pending" as const,
        createdat: "2024-01-13",
    },
]
const FeedbackInManager = () => {
    const { data, isLoading, isError, } = useGetAllFeedbacksQuery()
    console.log(data);

    const [reminders, setReminders] = useState<Set<string>>(new Set())

    const toggleReminder = (feedbackId: string) => {
        setReminders((prev) => {
            const newReminders = new Set(prev)
            if (newReminders.has(feedbackId)) {
                newReminders.delete(feedbackId)
            } else {
                newReminders.add(feedbackId)
            }
            return newReminders
        })
    }
    return (
        <>
            <FeedbackChart />
            <div className="min-h-screen bg-muted py-8">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-text-main text-center" dir="rtl">
                            ניהול פידבקים
                        </h1>
                        <p className="text-text-secondary text-center mt-2" dir="rtl">
                            צפייה וניהול כל הפידבקים שהתקבלו מהמשתמשים
                        </p>
                        {reminders.size > 0 && (
                            <div className="text-center mt-4">
                                <span
                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800"
                                    dir="rtl"
                                >
                                    {reminders.size} תזכורות פעילות
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="mb-4 text-left" dir="rtl">
                        <ExportFeedbacksToExcel />
                    </div>
                    <Grid cols={2} className="gap-4">
                        {data?.map((feedback) => (
                            <FeedbackCardManager
                                key={feedback.id}
                                feedback={feedback}
                                isReminder={reminders.has(feedback.id)}
                                onToggleReminder={toggleReminder}
                            />
                        ))}
                    </Grid>
                </div>
            </div>
        </>
    )
}


export default FeedbackInManager

