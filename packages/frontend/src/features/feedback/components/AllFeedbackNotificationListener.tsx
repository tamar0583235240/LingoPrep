import { useEffect, useRef } from "react";
import { useGetAllFeedbacksQuery } from "../services/feedbackApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store/store";
import { toast } from "react-toastify";
import { feedbackType } from "../types/feedbackType";
import { useGetUsersQueryAdmin } from "../../../shared/api/adminApi";
import { MdInfo } from "react-icons/md"; 

export const FeedbackNotificationListener = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const { data: feedbacks = [], refetch } = useGetAllFeedbacksQuery(
    user?.id ?? "",
    {
      skip: !user?.id,
      refetchOnMountOrArgChange: true,
      pollingInterval: 5000,
    }
  );

  const {
    data: users = [],
    isLoading: usersLoading,
    isError: usersError,
  } = useGetUsersQueryAdmin();

  const seenIdsRef = useRef<Set<string>>(
    new Set(JSON.parse(localStorage.getItem("seenFeedbackIds") || "[]"))
  );

  useEffect(() => {
    if (!feedbacks.length || usersLoading || usersError) return;

    const newFeedbacks = feedbacks.filter(
      (f: feedbackType) => !seenIdsRef.current.has(f.id)
    );

    if (newFeedbacks.length > 0) {
      const groupedByUser: Record<string, feedbackType[]> = {};
      newFeedbacks.forEach((f) => {
        const giverId = f.given_by_user_id || "unknown";
        if (!groupedByUser[giverId]) groupedByUser[giverId] = [];
        groupedByUser[giverId].push(f);
        seenIdsRef.current.add(f.id);
      });

      Object.entries(groupedByUser).forEach(([giverId, feedbacks]) => {
        const giver = users.find((u: any) => u.id === giverId);

        const giverName =
          giver && typeof giver === "object"
            ? `${giver["first_name"] ?? ""} ${giver["last_name"] ?? ""}`.trim() ||
              "משתמש לא ידוע"
            : "משתמש לא ידוע";
        toast.info(`קיבלת ${feedbacks.length} פידבקים חדשים מ${getUserName(giver)}`, {
          progressClassName: "bg-primary",
          icon: <MdInfo className="text-primary text-xl" />,
        });
      });

      localStorage.setItem(
        "seenFeedbackIds",
        JSON.stringify(Array.from(seenIdsRef.current))
      );
    }
  }, [feedbacks, users, usersLoading, usersError]);

  return null;
};

function getUserName(user: any): string {
  if (!user || typeof user !== "object") return "משתמש לא ידוע";
  const first = user["firstName"] ?? "";
  const last = user["lastName"] ?? "";
  return `${first} ${last}`.trim() || "משתמש לא ידוע";
}
