
export default function FeedbackDisplay({ analysis }: { analysis: string }) {
  return (
    <div className="p-6 bg-white shadow-md rounded-xl border max-w-xl mx-auto mt-6 animate-fade-in">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">תובנות AI:</h2>
      <p className="text-gray-700 whitespace-pre-line leading-relaxed">{analysis}</p>
    </div>
  );
}