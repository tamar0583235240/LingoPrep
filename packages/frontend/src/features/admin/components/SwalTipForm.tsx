// SwalTipForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  defaultValue?: string;
  onSubmit: (content: string) => void;
}

const SwalTipForm: React.FC<Props> = ({ defaultValue = '', onSubmit }) => {
  const { register, handleSubmit } = useForm<{ content: string }>({
    defaultValues: { content: defaultValue }
  });

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data.content))} className="flex flex-col gap-2">
      <textarea
        {...register('content', { required: 'שדה חובה' })}
        placeholder="תוכן הטיפ"
        className="border p-2 rounded text-right"
      />
      <button type="submit" className="bg-primary text-white py-2 rounded hover:bg-primary/90">
        שמירה
      </button>
    </form>
  );
};

export default SwalTipForm;
