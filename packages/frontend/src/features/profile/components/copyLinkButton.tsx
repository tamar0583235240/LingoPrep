import { useState } from "react";
import MessageModal from "../../../shared/ui/messageModal"
import { CopyIcon } from "lucide-react";
const CopyLinkButton = ({ slug }: { slug: string }) => {
    const [showMessage, setShowMessage] = useState(false);
    const handleCopy = () => {
        const url = `${window.location.origin}/u/${slug}`;
        navigator.clipboard.writeText(url);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
    };

    return (<>
        <button onClick={handleCopy}
            className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors">
            <CopyIcon />
            <span>העתק קישור לפרופיל ציבורי</span>
        </button>
        {showMessage && (
            <MessageModal
                title=""
                message="הקישור לפרופיל הציבורי שלך הועתק ללוח."
                onClose={() => setShowMessage(false)}
            />
        )}
    </>

    );
};
export default CopyLinkButton;