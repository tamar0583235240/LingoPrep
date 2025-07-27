import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { MdInfo } from "react-icons/md";
import { useSelector } from "react-redux";
import { useGetAllCertificateNotificationsQuery } from "../services/notificationApi";
import { RootState } from "../../../shared/store/store";

export const NotificationListener = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isManager = user?.role === "manager";

  const { data: notifications = [], isLoading, isError } = useGetAllCertificateNotificationsQuery(undefined, {
    pollingInterval: 5000,
  });

  const seenIdsRef = useRef<Set<string>>(new Set(
    JSON.parse(localStorage.getItem("seenCertificateNotificationIds") || "[]")
  ));

  useEffect(() => {
    console.log("NotificationListener mounted");
    console.log("isManager:", isManager);
    console.log("notifications:", notifications);
    console.log("seen:", seenIdsRef.current);

    if (!isManager || isLoading || isError) return;

    const newNotifs = notifications.filter(n => !seenIdsRef.current.has(n.id));

    newNotifs.forEach(n => {
      toast.info(n.message, {
        icon: <MdInfo className="text-primary text-xl" />,
        progressClassName: 'bg-primary',
      });
      seenIdsRef.current.add(n.id);
    });

    if (newNotifs.length > 0) {
      localStorage.setItem(
        "seenCertificateNotificationIds",
        JSON.stringify(Array.from(seenIdsRef.current))
      );
    }
  }, [notifications, isLoading, isError, isManager]);

  return null;
};
