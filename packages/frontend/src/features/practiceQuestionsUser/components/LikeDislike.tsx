import { useEffect, useState } from "react";
import { useVoteQuestionMutation, useGetQuestionVotesQuery } from "../../../shared/api/runCodeApi";

interface Props {
  questionId: string;
  userId: string;
}


export const LikeDislike = ({ questionId, userId }: Props) => {
  const { data, refetch } = useGetQuestionVotesQuery(questionId);
  const [voteQuestion] = useVoteQuestionMutation();

  const [userVote, setUserVote] = useState<"like" | "dislike" | null>(null);

  useEffect(() => {
    refetch(); // רענון מצב לייקים כשנטען
  }, [questionId, refetch]);

  const handleVote = async (liked: boolean) => {
    try {
      await voteQuestion({ userId, questionId, liked }).unwrap();
      setUserVote(liked ? "like" : "dislike");
      refetch(); // רענון אחרי הצבעה
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <div className="flex gap-4 mt-1">
      <button
        onClick={() => handleVote(true)}
        className={`flex items-center gap-1 ${
          userVote === "like" ? "text-green-700 font-bold" : "text-green-600"
        } hover:text-green-800 transition-colors`}
      >
        👍 <span className="text-black">{data?.likes || 0}</span>
      </button>
      <button
        onClick={() => handleVote(false)}
        className={`flex items-center gap-1 ${
          userVote === "dislike" ? "text-red-700 font-bold" : "text-red-600"
        } hover:text-red-800 transition-colors`}
      >
        👎 <span className="text-black">{data?.dislikes || 0}</span>
      </button>
    </div>
  );
};
