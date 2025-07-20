export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  role: 'student' | 'manager';
  createdAt: string;
  isActive: boolean;
  slug: string;
}

export interface ForgotPasswordForm {
  email: string;
}

export interface ResetPasswordForm {
  token: string;
  password: string;
}

export type ResetFormData = {
  password: string;
  confirm: string;
};
