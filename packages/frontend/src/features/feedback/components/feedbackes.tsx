// בס"ד


import { useState } from "react"
import { MessageCircle, ChevronDown, ChevronUp, User, Calendar } from "lucide-react"
import { useGetFeedbacksBySharedRecordingIdQuery } from "../services/feedbackApi"
import { Users } from "../types/UsersType"
import { Button } from "../../../shared/ui/button"
import { CardSimple } from "../../../shared/ui/card"
import { GridContainer } from "../../../shared/ui/GridContainer"
import { IconWrapper } from "../../../shared/ui/IconWrapper"
import { SummaryBox } from "../../../shared/ui/SummaryBox"
import { Heading1, Paragraph } from "../../../shared/ui/typography"

// import { useState } from "react";
// import "./feedbackes.css";
// import { useGetFeedbacksBySharedRecordingIdQuery } from "../services/feedbackApi";
// import { Users } from "../types/UsersType";
import { feedbackType } from "../types/feedbackType";



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
  } = useGetFeedbacksBySharedRecordingIdQuery(sharedRecordingId);

  const [flagShow, setFlagShow] = useState<boolean>(false);

  function getUserName(userId: string): string {
    const user = usersList.find((user) => user.id === userId);
    return user ? `${user.first_name} ${user.last_name}` : "Unknown User";
  }

  function showFeedbacks(): void {
    console.log(feedbacks);
    setFlagShow(!flagShow);
    console.log(error);
  }

  return (
    <div className="recordes-container">
      <button className="feedback-toggle-btn" onClick={showFeedbacks}>
        פידבקים ({feedbacks?.length})
        <span className={`arrow ${flagShow ? "open" : ""}`}>▼</span>
      </button>
      {error && <p>שגיאה בטעינת הפידבקים</p>}
      {flagShow && (
        <div className="feedback-list">
          {feedbacks?.map((f: feedbackType) => (
            <section key={f.id} className="feedback-item">
              <div className="feedback-header">
                <h4 className="feedback-from">
                  {getUserName(f.given_by_user_id)}
                </h4>
                <h4 className="feedback-date">
                  {f.created_at &&
                    new Date(f.created_at).toLocaleDateString()}
                </h4>
              </div>
              <p className="feedback-content">{f.comment}</p>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

