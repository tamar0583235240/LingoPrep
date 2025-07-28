const processHebrewText = (text: string): string => {
  console.log("process");
  
  if (!text) return '';
    console.log("after");

  // הסרת ניקוד, סימני פיסוק
  const cleanedText = text
    .normalize('NFD')
    .replace(/[\u0591-\u05C7]/g, '') // ניקוד
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()״׳"'()?]/g, ' ') // הפכי סימני פיסוק לרווח
    .trim();

  const prefixes = ['ו', 'ב', 'כ', 'ל', 'מ', 'ש'];

  const processedWords = cleanedText
    .split(/\s+/)
    .map(word => {
      if (word.length <= 3) return word;

      // הסרת תחילית אחת אם יש
      if (prefixes.includes(word[0])) {
        return word.slice(1);
      }
      return word;
    })
    .filter(Boolean)

return processedWords.map(w => `${w}:*`).join(' | ');
}
export default processHebrewText