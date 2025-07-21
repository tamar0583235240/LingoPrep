// analyze.service.ts
export const analyzeInterview = async (file: File) => {
  const formData = new FormData();
  formData.append('audio', file);

  const res = await fetch('/api/analyze', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('שגיאה בניתוח הקלטה');
  return await res.json();
<<<<<<< HEAD
};
=======
};
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
