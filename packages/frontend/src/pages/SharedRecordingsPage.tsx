import React, { useState } from 'react';
import { useGetSharedRecordingsQuery } from '../features/shared-recordings/services/sharedRecordingsApi';
import SharedRecordingCard from '../features/shared-recordings/components/SharedRecordingCard';
import SharedRecordingDetails from '../features/shared-recordings/components/SharedRecordingDetails';
import { SharedRecording } from '../features/shared-recordings/types/types';
import { useCreateFeedbackMutation } from '../features/feedback/services/feedbackApi';

import { useSelector } from 'react-redux';
import { RootState } from '../shared/store/store';
import toast from 'react-hot-toast';

export default function SharedRecordingsPage() {

  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id;
  const userRole = user?.role;
  if (!userId || !userRole) {
    return <p>לא נמצאו הקלטות משותפות</p>;
  }
  const { data, isLoading, error, refetch } = useGetSharedRecordingsQuery(
    { role: userRole, userId },
    { skip: false }
  );


  const [selectedRecordingId, setSelectedRecordingId] = useState<string | null>(null);


  const [createFeedback] = useCreateFeedbackMutation();

  const selectedRecording = data?.find((rec: SharedRecording) => rec.id === selectedRecordingId);

  if (isLoading) return <p>טוען...</p>;
  if (error) return <p>שגיאה בטעינת נתונים</p>;
  console.log("UserID:", userId);
  console.log("Shared Data:", data);
  console.log("🎧 הקלטות ששיתפו איתי:", data);
  console.log("🔑 userId:", userId);
  console.log("shared recordings:", data?.map(d => d.id));
  console.log("🔁 SHARED RECORDINGS", data?.map(d => d.id));

  if (!userId) return <p>לא נמצאו הקלטות משותxxx</p>;

  // if (!data || data.length === 0) return <p>אין הקלטות משותפות</p>;
  if (!data || data.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center text-[#00B894] mt-10">
      <span className="text-4xl mb-2">🎧</span>
      <p className="text-lg font-semibold">אין הקלטות משותפות</p>
    </div>
  );
}

  return (
    <div className="max-w-3xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-[#00876E]">
        ההקלטות ששיתפו איתי
      </h1>


      {selectedRecording ? (
        <SharedRecordingDetails
          userName={selectedRecording.userName}
          questionTitle={selectedRecording.questionTitle}
          date={selectedRecording.date}
          audioUrl={selectedRecording.audioUrl}
          aiSummary={selectedRecording.aiSummary}
          recordingId={selectedRecording.id}
          feedbackComment={selectedRecording.feedbackComment}
          feedbackRating={selectedRecording.feedbackRating}
          onBack={() => setSelectedRecordingId(null)}
          userId={userId}
          onSubmitFeedback={async (comment, rating) => {
            try {
              await createFeedback({
                sharedRecordingId: selectedRecording.id,
                givenByUserId: userId,
                comment,
                rating,
              }).unwrap();
              await refetch();
             alert(' נשלח בהצלחה! 🎉');
              setSelectedRecordingId(null);
            } catch (err) {
            alert('אירעה שגיאה בשליחת הפידבק');
              console.error(err);
            }
          }}
        />
      ) : (
        <div className="grid gap-4">
          {data?.map((rec: SharedRecording) => (
            <SharedRecordingCard
              key={rec.id}
              id={rec.id}
              sharedBy={rec.userName}
              sharedAt={rec.date}
              feedbackRating={rec.feedbackRating}
              onClick={() => setSelectedRecordingId(rec.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
