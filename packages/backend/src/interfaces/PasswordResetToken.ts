export interface PasswordResetToken {
  id: string;           
  user_id: string;     
  token: string;
  expires_at: Date;
}

