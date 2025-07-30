import React, { useEffect, useState } from 'react';
import { GridContainer } from '../../../shared/ui/GridContainer';


interface PopularQuestion {
  id: string;
  question: string;
  popularity: number;
}

const PopularQuestions = () => {
  const [questions, setQuestions] = useState<PopularQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoaded, setInitialLoaded] = useState(false);

  const fetchQuestions = async (customLimit: number, customOffset: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/monitoring/questions/popular?limit=${customLimit}&offset=${customOffset}`, {
      credentials: 'include',
    });

      const data: PopularQuestion[] = await response.json();
      setQuestions(prev => {
        const existingIds = new Set(prev.map(q => q.id));
        const uniqueNew = data.filter(q => !existingIds.has(q.id));
        return [...prev, ...uniqueNew];
      });
      setOffset(customOffset + customLimit);
      if (data.length < customLimit) setHasMore(false);
    } catch (error) {
      console.error('שגיאה בטעינת שאלות פופולריות:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialLoaded) {
      setInitialLoaded(true);
      fetchQuestions(7, 0);
    }
  }, []);

  const handleLoadMore = () => {
    fetchQuestions(5, offset);
  };

  return (
    <GridContainer maxWidth="lg" className="text-right">
<h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">שאלות פופולריות</h2>

<ul className="list-none p-0 space-y-4">
  {questions.map(q => (
    <li key={q.id} className="border-b border-gray-300 pb-2">
      <strong className="text-lg text-gray-800">{q.question}</strong><br />
      <span className="text-sm text-gray-500">פופולריות: {q.popularity}</span>
    </li>
  ))}
</ul>

{hasMore && (
<button
  onClick={handleLoadMore}
  disabled={loading}
  className="bg-[#00b894] hover:bg-[#00a383] text-white font-semibold px-4 py-2 rounded shadow transition">
  {/* <PlusIcon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" /> */}
  {loading ? 'טוען...' : 'טען עוד שאלות'}
</button>


)}
      {!hasMore && questions.length > 0 && (
        <p className="text-gray-500 mt-4">לא נמצאו שאלות נוספות</p>
      )}
    </GridContainer>
  );
};

export default PopularQuestions;
