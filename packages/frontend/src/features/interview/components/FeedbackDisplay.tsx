export default function FeedbackDisplay({ analysis }: { analysis: string }) {
  return (
    <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl shadow-md border max-w-xl mx-auto mt-6 animate-fade-in">
      <h2 className="text-xl font-bold text-green-800 mb-4">תובנות AI</h2>
      <div className="space-y-4 text-gray-700">
        <pre className="whitespace-pre-line font-sans leading-relaxed">{analysis}</pre>
      </div>
    </div>
  );
}