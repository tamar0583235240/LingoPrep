import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  useGetUnreadNotificationsQuery,
  useMarkAllNotificationsAsSeenMutation,
} from "../services/notificationsApi";

const NewNotificationToast = () => {
  const { data: notifications = [], refetch } = useGetUnreadNotificationsQuery();
  const [markAllSeen] = useMarkAllNotificationsAsSeenMutation();

  useEffect(() => {
    if (notifications.length > 0) {
      notifications.forEach((notif) => toast.info(notif.message));
      markAllSeen();
    }
  }, [notifications]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10000);
    return () => clearInterval(interval);
  }, [refetch]);

  return null;
};

export default NewNotificationToast;
