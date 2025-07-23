export type NotificationType = {
  message: string;
  type: "success" | "error";
  icon?: React.ReactNode;
} | null;