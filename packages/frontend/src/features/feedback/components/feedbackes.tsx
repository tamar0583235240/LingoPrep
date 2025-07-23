// בס"ד
import { useState } from "react"
import {   useGetAllFeedbacksQuery,  useGetFeedbackAveragesQuery,useGetFeedbackesBysharedRecordingIdQuery } from "../services/FeedbackApi"
import { MessageCircle, ChevronDown, ChevronUp, User, Calendar } from "lucide-react"
import { Users } from "../types/UsersType"
import { FeedbackType } from "../types/FeedbackType"

import "./feedbackes.css"

export const Feedbackes = ({
  props,
}: {
  props: { sharedRecordingId: string; usersList: Users[] };
}) => {
  const { sharedRecordingId, usersList } = props;
  const {
    data: feedbacks,
    isLoading,
    error,
  } = useGetFeedbackesBysharedRecordingIdQuery(sharedRecordingId);

  const [flagShow, setFlagShow] = useState<boolean>(false);

  function getUserName(userId: string): string {
    const user = usersList.find((user) => user.id === userId);
    return user ? `${user.first_name} ${user.last_name}` : "משתמש לא ידוע";
  }

  function showFeedbacks(): void {
    setFlagShow(!flagShow);
  }

  return (
    <div className="recordes-container">
      <button className="feedback-toggle-btn" onClick={showFeedbacks}>
        פידבקים ({feedbacks?.length || 0})
        <span className={`arrow ${flagShow ? "open" : ""}`}>▼</span>
      </button>

      {error && <p>שגיאה בטעינת הפידבקים</p>}

      {flagShow && (
        <div className="feedback-list">
          {feedbacks && feedbacks.length > 0 ? (
            feedbacks.map((f: FeedbackType) => (
              <section key={f.id} className="feedback-item">
                <div className="feedback-header">
                  <h4 className="feedback-from">{getUserName(f.given_by_user_id)}</h4>
                  <h4 className="feedback-date">
                    {f.created_dat &&
                      new Date(f.created_dat).toLocaleDateString('he-IL')}
                  </h4>
                </div>
                <p className="feedback-content">{f.comment}</p>
              </section>
            ))
          ) : (
            <p>אין פידבקים להצגה</p>
          )}
        </div>
      )}
    </div>
  );
};
