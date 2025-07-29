import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store/store";
import {
  useGetUnreadNotificationsQuery,
  useMarkNotificationAsSeenMutation,
} from "../services/notificationsApi";
import { MdInfo } from "react-icons/md";

const NewNotificationToast = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const { data: notifications = [], refetch } = useGetUnreadNotificationsQuery(
    undefined,
    { skip: !token || !userId }
  );

  const [markNotificationAsSeen] = useMarkNotificationAsSeenMutation();

  const shownToasts = useRef<Set<string>>(new Set());

  useEffect(() => {
    const showAndMarkNotifications = async () => {
      const newNotifs = notifications.filter(
        (n: any) => !shownToasts.current.has(n.id)
      );

      for (const notif of newNotifs) {
        toast.info(
          "נוספה הקלטה חדשה",
          {
            toastId: `notif-${notif.id}`,
            progressClassName: "bg-primary",
            icon: <MdInfo className="text-primary text-xl" />,
          }
        );

        shownToasts.current.add(notif.id);

        try {
          await markNotificationAsSeen(notif.id).unwrap();
        } catch (err) {
          console.error(`Failed to mark notification ${notif.id} as seen`, err);
        }
      }
    };

    if (notifications.length > 0) {
      showAndMarkNotifications();
    }
  }, [notifications, markNotificationAsSeen]);

  useEffect(() => {
    if (!token || !userId) return;

    const interval = setInterval(() => {
      refetch();
    }, 15000);

    return () => clearInterval(interval);
  }, [refetch, token, userId]);

  return null;
};

export default NewNotificationToast;
