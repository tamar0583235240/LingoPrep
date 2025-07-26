export interface UploadAnswerDto {
  userId: string;
  questionId: string;
  fileUrl: string;
  amountFeedbacks?: number;  // אופציונלי עם ? 
  answerFileName: string;
}
