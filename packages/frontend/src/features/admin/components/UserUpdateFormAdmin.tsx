import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';
import { user } from '../types/userType';
import { userSchema, UserFormFields } from '../validation/userSchema';
import { ChevronDown } from "lucide-react";
interface Props {
  user: user;
  onSubmit: (data: Partial<user>) => Promise<void>;
}
const UserUpdateForm: React.FC<Props> = ({ user, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormFields>({
    defaultValues: {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone: user.phone ?? '',
      password: user.password ?? undefined,
      role: user.role === 'manager' ? 'manager' : 'student',
    },
    resolver: yupResolver(userSchema),
    mode: 'onChange',
  });
  const submitAndClose: SubmitHandler<UserFormFields> = async (data) => {
    const preparedData: Partial<user> = {
      ...user,
      ...data,
      phone: data.phone === '' ? undefined : data.phone,
    };
    await onSubmit(preparedData);
    Swal.close();
  };
  return (
    <form
      onSubmit={handleSubmit(submitAndClose)}
      className="flex flex-col gap-2 w-80 mx-auto"
      dir="rtl"
    >
      <input
        {...register('firstName')}
        placeholder="שם פרטי"
        className="text-right border border-gray-300 rounded px-3 py-2"
      />
      {errors.firstName && (
        <span className="text-red-600 text-sm">{errors.firstName.message}</span>
      )}
      <input
        {...register('lastName')}
        placeholder="שם משפחה"
        className="text-right border border-gray-300 rounded px-3 py-2"
      />
      {errors.lastName && (
        <span className="text-red-600 text-sm">{errors.lastName.message}</span>
      )}
      <input
        {...register('email')}
        placeholder="אימייל"
        className="text-right border border-gray-300 rounded px-3 py-2"
      />
      {errors.email && (
        <span className="text-red-600 text-sm">{errors.email.message}</span>
      )}
      <input
        {...register('phone')}
        placeholder="טלפון"
        className="text-right border border-gray-300 rounded px-3 py-2"
      />
      {errors.phone && (
        <span className="text-red-600 text-sm">{errors.phone.message}</span>
      )}
      <input
        {...register('password')}
        type="text"
        placeholder="סיסמא"
        className="text-right border border-gray-300 rounded px-3 py-2"
      />
      {errors.password && (
        <span className="text-red-600 text-sm">{errors.password.message}</span>
      )}
      <div className="relative">
        <select
          {...register('role')}
          className="text-right text-gray-400 border border-gray-300 rounded px-3 py-2 pr-10 w-full bg-white appearance-none"
          defaultValue=""
        >
          <option value="" disabled hidden>
            בחר תפקיד
          </option>
          <option className="text-black" value="student">
            תלמיד
          </option>
          <option className="text-black" value="manager">
            מנהל
          </option>
        </select>
        <ChevronDown
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          size={18}
        />
      </div>
      {errors.role && (
        <span className="text-red-600 text-sm">{errors.role.message}</span>
      )}
      <button
        type="submit"
        className="bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition"
      >
        שמירה
      </button>
    </form>
  );
};
export default UserUpdateForm;