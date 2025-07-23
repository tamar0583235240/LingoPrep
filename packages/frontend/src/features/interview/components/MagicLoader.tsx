import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const typingText = "מנתח תשובה...";

export default function MagicLoader() {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(typingText.slice(0, index + 1));
      index++;
      if (index >= typingText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <Loader2 className="animate-spin w-12 h-12 text-[--color-primary] mb-2" />
      <span className="text-base text-gray-700">{displayedText}</span>
    </div>
  );
}