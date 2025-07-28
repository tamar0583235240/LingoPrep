import React from 'react';
import { useForm } from 'react-hook-form';
import { user } from '../types/userType';
interface Props {
  user: user;
  onSubmit: (data: Partial<user>) => void;
}
const UserForm: React.FC<Props> = ({ user, onSubmit }) => {
  const { register, handleSubmit } = useForm<Partial<user>>({
    defaultValues: user,
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <input {...register('first_name')} placeholder="שם פרטי" className="input text-right" />
      <input {...register('last_name')} placeholder="שם משפחה" className="input text-right" />
      <input {...register('email')} placeholder="אימייל" className="input text-right" />
      <input {...register('phone')} placeholder="טלפון" className="input text-right" />
      <button
        type="submit"
        className="bg-primary-dark text-white py-2 rounded-md hover:bg-primary-dark/90 transition"
      >
        שמור
      </button>
    </form>
  );
};
export default UserForm;