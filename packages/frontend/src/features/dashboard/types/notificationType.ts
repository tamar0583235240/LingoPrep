export interface Notification {
  id: string;
  user_id: string;
  type: string;
  message: string;
  is_seen: boolean;
  created_at: string;
}