import React from 'react'

import { useState } from "react"
import { useAddReminderMutation, useRemoveReminderMutation } from '../features/feedback/services/feedbackApi'
import FeedbackCardManager from "../features/feedback/components/FeedbackCardManager"
import { Grid } from "../shared/ui/grid"
import FeedbackChart from '../features/feedback/components/FeedbackChart'
import { useGetAllFeedbacksQuery } from '../features/feedback/services/feedbackApi'
import ExportFeedbacksToExcel from '../features/feedback/components/exportFeedbacksToExcel'

const FeedbackInManager = () => {
    const { data, isLoading, isError, } = useGetAllFeedbacksQuery()
    console.log(data);

    const [reminders, setReminders] = useState<Set<string>>(new Set())
    const [addReminder] = useAddReminderMutation();
    const [removeReminder] = useRemoveReminderMutation();

    const toggleReminder = async (feedbackId: string, userId: string) => {
        if (reminders.has(feedbackId)) {
            await removeReminder({ feedbackId });
            setReminders((prev) => {
                const newReminders = new Set(prev);
                newReminders.delete(feedbackId);
                return newReminders;
            });
        } else {
            await addReminder({ feedbackId: feedbackId, user_id: userId });
            setReminders((prev) => {
                const newReminders = new Set(prev);
                newReminders.add(feedbackId);
                return newReminders;
            });
        }
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
                        {data?.map((feedback) =>
                            feedback.user_id ? (
                                <FeedbackCardManager
                                    key={feedback.id}
                                    feedback={feedback}
                                    isReminder={reminders.has(feedback.id)}
                                    onToggleReminder={() => toggleReminder(feedback.id, feedback.user_id as string)}
                                />
                            ) : null
                        )}
                    </Grid>
                </div>
            </div>
        </>
    )
}


export default FeedbackInManager

