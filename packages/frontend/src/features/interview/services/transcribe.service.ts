export const transcribeAudio = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('audio', file);

  const response = await fetch('/api/transcribe', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('אירעה שגיאה בהעלאת ההקלטה');
  }

  const data = await response.json();
  return data.transcript; // תמלול שמוחזר מהשרת
<<<<<<< HEAD
};
=======
};
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
