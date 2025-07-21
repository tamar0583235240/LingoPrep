import * as yup from 'yup';
// מגדירים schema רגיל
export const userSchema = yup.object({
  firstName: yup.string().required('שדה חובה'),
  lastName: yup.string().required('שדה חובה'),
  email: yup.string().email('מייל לא תקין').required('שדה חובה'),
  phone: yup.string().required('שדה חובה').matches(/^\d*$/, 'רק ספרות'),
  password: yup.string()
    .matches(/^(?=.*[A-Za-z\u0590-\u05FF])(?=.*\d)[A-Za-z\u0590-\u05FF\d]{6,}$/, 'סיסמה חייבת לכלול אותיות (עברית או אנגלית) ומספרים, לפחות 6 תווים')
    .required('שדה חובה'),
  role: yup.mixed<'student' | 'manager'>()
    .oneOf(['student', 'manager'], 'יש לבחור תפקיד')
    .required('שדה חובה'),
});
// ואז מייצאים טיפוס מהסכמה
export type UserFormFields = yup.InferType<typeof userSchema>;
