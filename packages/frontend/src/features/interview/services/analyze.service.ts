export const analyzeInterview = async (file: File, answerId: string) => {
  console.log('[AI][FE] analyzeInterview called. File:', file, 'answerId:', answerId);
  const formData = new FormData();
  formData.append('audio', file);    
  formData.append('answerId', answerId);
  try {
    const res = await fetch('/api/insights/analyze', {
      method: 'POST',
      body: formData,
    });
    console.log('[AI][FE] fetch /api/insights/analyze status:', res.status);
    if (!res.ok) {
      const errText = await res.text();
      console.error('[AI][FE] Error response:', errText);
      throw new Error('שגיאה בניתוח הקלטה');
    }
    const data = await res.json();
    console.log('[AI][FE] analyzeInterview result:', data);
    return data;
  } catch (err) {
    console.error('[AI][FE] analyzeInterview exception:', err);
    throw err;
  }
};






