import React from 'react';
import { feedbackType } from '../../feedback/types/feedbackType';
import FeedbackSection from './FeedbackSection';

interface Props {
  userName: string;
  questionTitle: string;
  date: string;
  audioUrl: string;
  aiSummary: string;
  onSubmitFeedback: (comment: string, rating: number, feedbackId?: string) => void;
  onBack: () => void;
  recordingId: string;
  userId: string; 
  feedback?: feedbackType | null; 
  feedbackRating?: number;  
    feedbackComment?: string; 
}

export default function SharedRecordingDetails({
  userName,
  questionTitle,
  date,
  audioUrl,
  aiSummary,
  onSubmitFeedback,
  onBack,
  recordingId,
  userId, 
  feedback,
  feedbackRating = 0, 
  feedbackComment
}: Props) {
  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow">

      <button
  onClick={onBack}
  className="mb-6 text-sm font-medium text-[#00B894] border border-[#00B894] px-4 py-1 rounded-full hover:bg-[#00B894] hover:text-white transition"
>
  ← חזרה לרשימה
</button>

      <h2 className="text-xl font-bold mb-2 text-center text-primary-dark">משתף: {userName}</h2>
<p className="text-sm text-gray-600 mb-1 text-center">שאלה: {questionTitle}</p>
<p className="text-sm text-gray-600 mb-3 text-center">תאריך: {new Date(date).toLocaleDateString()}</p>

      {/* <h2 className="text-xl font-bold mb-2">משתף: {userName}</h2>
      <p className="text-sm text-gray-600 mb-1">שאלה: {questionTitle}</p>
      <p className="text-sm text-gray-600 mb-3">תאריך: {new Date(date).toLocaleDateString()}</p> */}
      <audio controls className="mb-4 w-full">
        <source src={audioUrl} type="audio/mpeg" />
        הדפדפן שלך לא תומך בהשמעת אודיו.
      </audio>
      <div className="mb-3">
        {/* <h3 className="font-medium mb-1">תובנות AI:</h3> */}
        <h3 className="font-medium mb-1 text-center">תובנות AI:</h3>

        <p className="text-gray-700 text-center">{aiSummary}</p>
      </div>
      {feedbackComment && (
  <div className="mb-3">
    <h3 className="font-medium mb-1 text-center">הפידבק הקודם שלך:</h3>
    <p className="text-gray-700 whitespace-pre-line text-center">{feedbackComment}</p>
    
  </div>
)}

{typeof feedbackRating === 'number' && (
  <div className="mb-3 flex items-center space-x-1 rtl:space-x-reverse text-yellow-400 text-xl justify-center">
    {[1, 2, 3, 4, 5].map((star) => (
      <span key={star}>
        {feedbackRating >= star ? '★' : '☆'}
      </span>
    ))}
  </div>
)}

      <FeedbackSection
        recordingId={recordingId}
        userId={userId} 
          feedbackRating={feedbackRating} 
        onSubmitted={onSubmitFeedback}
      />
    
    </div>
  );
}
