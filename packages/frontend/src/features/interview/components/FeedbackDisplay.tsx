<<<<<<< HEAD
export default function FeedbackDisplay({ analysis }: { analysis: string }) {
  return (
    <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
      <h2 className="text-xl font-bold text-green-800 mb-4">ניתוח תשובה</h2>
      <div className="space-y-4 text-gray-700">
        <pre className="whitespace-pre-wrap font-sans leading-relaxed">{analysis}</pre>
      </div>
=======

export default function FeedbackDisplay({ analysis }: { analysis: string }) {
  return (
    <div className="p-6 bg-white shadow-md rounded-xl border max-w-xl mx-auto mt-6 animate-fade-in">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">תובנות AI:</h2>
      <p className="text-gray-700 whitespace-pre-line leading-relaxed">{analysis}</p>
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
    </div>
  );
}