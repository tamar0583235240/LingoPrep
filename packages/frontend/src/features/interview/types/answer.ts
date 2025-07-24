export interface AnswerResponse {
  id: string;
  userId: string;
  questionId: string;
  fileUrl: string;
  answerFileName: string;
  submittedAt: string;
  amountFeedbacks: number;
}