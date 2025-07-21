import { useState, useEffect } from 'react';
import {
  useGetDynamicContentsQuery,
  useUpdateDynamicContentMutation,
} from '../../../shared/api/dynamicContentApi';

export const useDynamicContents = () => {
  const { data, isLoading, isError } = useGetDynamicContentsQuery();
  const [updateContent] = useUpdateDynamicContentMutation();
  const [error, setError] = useState<string | null>(null);

  const updateContentById = async (id: number, content: string) => {
    try {
      const updated = await updateContent({ id, content }).unwrap();
      return updated;
    } catch (err) {
      setError('שגיאה בעדכון התוכן');
    }
  };

  return {
    contents: data || [],
    loading: isLoading,
    error: isError ? 'שגיאה בטעינת התכנים' : error,
    updateContentById,
  };
};
