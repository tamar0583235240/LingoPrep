export default function FeedbackDisplay({ analysis }: { analysis: string }) {
  return (
    <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
      <h2 className="text-xl font-bold text-green-800 mb-4">ניתוח תשובה</h2>
      <div className="space-y-4 text-gray-700">
        <pre className="whitespace-pre-wrap font-sans leading-relaxed">{analysis}</pre>
      </div>
    </div>
  );
}